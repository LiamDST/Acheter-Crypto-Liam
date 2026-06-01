import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import Stripe from 'npm:stripe@13.7.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, stripe-signature",
};

// Configuration
const FUNCTION_TIMEOUT = 25000; // 25 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Utility function for structured logging
function logError(context: string, error: any, metadata?: any) {
  console.error(`[PAYMENT_WEBHOOK_ERROR] ${context}:`, {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    metadata,
    timestamp: new Date().toISOString()
  });
}

function logInfo(context: string, message: string, metadata?: any) {
  console.log(`[PAYMENT_WEBHOOK_INFO] ${context}: ${message}`, {
    metadata,
    timestamp: new Date().toISOString()
  });
}

// Utility function for retrying operations
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = MAX_RETRIES,
  delay: number = RETRY_DELAY
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      logInfo('RETRY', `Attempt ${attempt} failed, retrying in ${delay}ms`, { error: lastError.message });
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
  
  throw lastError!;
}

Deno.serve(async (req: Request) => {
  const startTime = Date.now();
  
  try {
    // Set up timeout for the entire function
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Function timeout')), FUNCTION_TIMEOUT);
    });
    
    const processRequest = async () => {
      try {
        // Handle CORS preflight requests
        if (req.method === "OPTIONS") {
          logInfo('CORS', 'Handling OPTIONS request');
          return new Response(null, {
            status: 200,
            headers: corsHeaders,
          });
        }
        
        // Validate environment variables
        const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
        const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET');
        const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
        const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        
        if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
          logError('CONFIG', 'Missing Stripe environment variables');
          return new Response(
            JSON.stringify({ error: 'Server configuration error' }),
            {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
          logError('CONFIG', 'Missing Supabase environment variables');
          return new Response(
            JSON.stringify({ error: 'Server configuration error' }),
            {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
        
        // Initialize Stripe and Supabase
        const stripe = new Stripe(STRIPE_SECRET_KEY, {
          apiVersion: '2023-10-16',
          timeout: 20000, // 20 second timeout
        });
        
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        });

        logInfo('INIT', 'Services initialized successfully');
        
        // Get the signature from the headers
        const signature = req.headers.get('stripe-signature');
        if (!signature) {
          logError('SIGNATURE', 'No signature provided');
          return new Response(
            JSON.stringify({ error: 'No signature provided' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
        
        // Get the raw body with timeout
        const body = await Promise.race([
          req.text(),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Request body timeout')), 10000)
          )
        ]);

        logInfo('BODY', 'Request body received', { bodyLength: body.length });
        
        // Verify the webhook signature
        let event;
        try {
          event = await retryOperation(async () => {
            return stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
          });
          
          logInfo('SIGNATURE', 'Webhook signature verified successfully', { 
            eventType: event.type,
            eventId: event.id 
          });
        } catch (err: any) {
          logError('SIGNATURE_VERIFICATION', 'Webhook signature verification failed', { 
            error: err.message,
            signatureLength: signature.length 
          });
          return new Response(
            JSON.stringify({ error: 'Invalid signature' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
        
        // Process the event asynchronously
        EdgeRuntime.waitUntil(
          processWebhookEvent(event, stripe, supabase).catch(error => {
            logError('EVENT_PROCESSING', 'Failed to process webhook event asynchronously', {
              eventType: event.type,
              eventId: event.id,
              error: error.message
            });
          })
        );

        const processingTime = Date.now() - startTime;
        logInfo('SUCCESS', 'Webhook processed successfully', { 
          processingTime,
          eventType: event.type 
        });
        
        return new Response(
          JSON.stringify({ received: true }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
        
      } catch (error: any) {
        const processingTime = Date.now() - startTime;
        logError('REQUEST_PROCESSING', 'Error processing webhook request', {
          error: error.message,
          processingTime
        });
        
        return new Response(
          JSON.stringify({ 
            error: 'Internal server error',
            timestamp: new Date().toISOString()
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    };

    // Race between processing and timeout
    return await Promise.race([processRequest(), timeoutPromise]);
    
  } catch (error: any) {
    const processingTime = Date.now() - startTime;
    logError('FUNCTION', 'Function-level error', {
      error: error.message,
      processingTime
    });
    
    return new Response(
      JSON.stringify({ 
        error: 'Function timeout or critical error',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function processWebhookEvent(event: any, stripe: Stripe, supabase: any) {
  const eventStartTime = Date.now();
  
  try {
    logInfo('EVENT_START', 'Processing webhook event', { 
      eventType: event.type,
      eventId: event.id 
    });

    // Handle the event based on its type
    switch (event.type) {
      case 'checkout.session.completed':
        await retryOperation(() => handleCheckoutSessionCompleted(event.data.object, supabase));
        break;
        
      case 'invoice.payment_succeeded':
        await retryOperation(() => handleInvoicePaymentSucceeded(event.data.object, stripe, supabase));
        break;
        
      case 'customer.subscription.deleted':
        await retryOperation(() => handleSubscriptionDeleted(event.data.object, supabase));
        break;
        
      default:
        logInfo('EVENT_SKIP', 'Unhandled event type', { eventType: event.type });
    }

    const processingTime = Date.now() - eventStartTime;
    logInfo('EVENT_COMPLETE', 'Event processed successfully', { 
      eventType: event.type,
      processingTime 
    });
    
  } catch (error: any) {
    const processingTime = Date.now() - eventStartTime;
    logError('EVENT_PROCESSING', 'Error processing webhook event', {
      eventType: event.type,
      eventId: event.id,
      error: error.message,
      processingTime
    });
    throw error;
  }
}

async function handleCheckoutSessionCompleted(session: any, supabase: any) {
  try {
    // Extract metadata with validation
    const userId = session.metadata?.userId;
    const planType = session.metadata?.planType;
    
    if (!userId || !planType) {
      throw new Error('Missing required metadata in checkout session');
    }

    logInfo('CHECKOUT_SESSION', 'Processing checkout session completion', {
      sessionId: session.id,
      userId,
      planType
    });
    
    // Calculate subscription dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // Default to 30 days
    
    // Determine plan details
    const planDetails = {
      formation: { name: 'Formation seule', amount: 249.99, includesSignals: false },
      formationSignaux: { name: 'Formation + Signaux', amount: 349.99, includesSignals: true }
    };
    
    const plan = planDetails[planType as keyof typeof planDetails] || planDetails.formation;
    
    // Create subscription record
    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_type: planType,
        plan_name: plan.name,
        amount: plan.amount,
        status: 'active',
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        auto_renew: true,
        includes_signals: plan.includesSignals,
      });
        
    if (subscriptionError) {
      logError('SUBSCRIPTION_CREATE', 'Error creating subscription', {
        userId,
        sessionId: session.id,
        error: subscriptionError
      });
      throw new Error(`Failed to create subscription: ${subscriptionError.message}`);
    }
    
    // Create invoice record
    const { error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        user_id: userId,
        amount: plan.amount,
        status: 'paid',
        payment_method: 'Carte bancaire',
        invoice_url: session.invoice_pdf,
      });
        
    if (invoiceError) {
      logError('INVOICE_CREATE', 'Error creating invoice', {
        userId,
        sessionId: session.id,
        error: invoiceError
      });
      // Don't throw here, invoice creation is not critical
    }
    
    // Create notification for user
    try {
      await supabase.from('notifications').insert({
        user_id: userId,
        title: 'Paiement confirmé',
        message: `Votre abonnement ${plan.name} a été activé avec succès. Merci pour votre confiance !`,
        type: 'success',
      });
    } catch (error) {
      logError('NOTIFICATION_CREATE', 'Error creating notification', {
        userId,
        error
      });
      // Don't throw, notification is not critical
    }
    
    logInfo('CHECKOUT_SUCCESS', 'Checkout session processed successfully', {
      userId,
      sessionId: session.id,
      planType
    });
    
  } catch (error: any) {
    logError('CHECKOUT_PROCESSING', 'Error processing checkout session', {
      sessionId: session.id,
      error: error.message
    });
    throw error;
  }
}

async function handleInvoicePaymentSucceeded(invoice: any, stripe: Stripe, supabase: any) {
  try {
    if (!invoice.subscription) {
      logInfo('INVOICE_SKIP', 'Invoice not associated with subscription', {
        invoiceId: invoice.id
      });
      return;
    }

    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    const userId = subscription.metadata?.userId;
    
    if (!userId) {
      // Try to find the user from the customer ID
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_customer_id', invoice.customer)
        .eq('stripe_subscription_id', invoice.subscription)
        .single();
        
      if (subscriptionError || !subscriptionData) {
        logError('USER_LOOKUP', 'Could not find user for invoice', {
          invoiceId: invoice.id,
          customerId: invoice.customer,
          error: subscriptionError
        });
        return;
      }
      
      await processInvoiceForUser(subscriptionData.user_id, invoice, supabase);
    } else {
      await processInvoiceForUser(userId, invoice, supabase);
    }
    
  } catch (error: any) {
    logError('INVOICE_PROCESSING', 'Error processing invoice payment', {
      invoiceId: invoice.id,
      error: error.message
    });
    throw error;
  }
}

async function processInvoiceForUser(userId: string, invoice: any, supabase: any) {
  try {
    // Update the invoice record
    const { error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        user_id: userId,
        amount: invoice.amount_paid / 100,
        status: 'paid',
        payment_method: 'Carte bancaire',
        invoice_url: invoice.hosted_invoice_url,
      });
        
    if (invoiceError) {
      logError('INVOICE_RECORD', 'Error creating invoice record', {
        userId,
        invoiceId: invoice.id,
        error: invoiceError
      });
    }
    
    // Create notification
    try {
      await supabase.from('notifications').insert({
        user_id: userId,
        title: 'Paiement renouvelé',
        message: 'Votre abonnement a été renouvelé avec succès. Merci pour votre confiance !',
        type: 'success',
      });
    } catch (error) {
      logError('NOTIFICATION_CREATE', 'Error creating renewal notification', {
        userId,
        error
      });
    }

    logInfo('INVOICE_SUCCESS', 'Invoice processed successfully', {
      userId,
      invoiceId: invoice.id
    });
    
  } catch (error: any) {
    logError('INVOICE_USER_PROCESSING', 'Error processing invoice for user', {
      userId,
      invoiceId: invoice.id,
      error: error.message
    });
    throw error;
  }
}

async function handleSubscriptionDeleted(subscription: any, supabase: any) {
  try {
    const userId = subscription.metadata?.userId;
    
    if (!userId) {
      // Try to find the user from the subscription ID
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_subscription_id', subscription.id)
        .single();
        
      if (subscriptionError || !subscriptionData) {
        logError('USER_LOOKUP', 'Could not find user for subscription deletion', {
          subscriptionId: subscription.id,
          error: subscriptionError
        });
        return;
      }
      
      await processSubscriptionDeletion(subscriptionData.user_id, subscription, supabase);
    } else {
      await processSubscriptionDeletion(userId, subscription, supabase);
    }
    
  } catch (error: any) {
    logError('SUBSCRIPTION_DELETION', 'Error processing subscription deletion', {
      subscriptionId: subscription.id,
      error: error.message
    });
    throw error;
  }
}

async function processSubscriptionDeletion(userId: string, subscription: any, supabase: any) {
  try {
    // Update the subscription status
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('stripe_subscription_id', subscription.id);
      
    if (updateError) {
      logError('SUBSCRIPTION_UPDATE', 'Error updating subscription status', {
        userId,
        subscriptionId: subscription.id,
        error: updateError
      });
    }
    
    // Create notification
    try {
      await supabase.from('notifications').insert({
        user_id: userId,
        title: 'Abonnement annulé',
        message: 'Votre abonnement a été annulé. Nous espérons vous revoir bientôt !',
        type: 'info',
      });
    } catch (error) {
      logError('NOTIFICATION_CREATE', 'Error creating cancellation notification', {
        userId,
        error
      });
    }

    logInfo('SUBSCRIPTION_DELETION_SUCCESS', 'Subscription deletion processed successfully', {
      userId,
      subscriptionId: subscription.id
    });
    
  } catch (error: any) {
    logError('SUBSCRIPTION_DELETION_PROCESSING', 'Error processing subscription deletion for user', {
      userId,
      subscriptionId: subscription.id,
      error: error.message
    });
    throw error;
  }
}