import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, stripe-signature",
};

// Configuration
const FUNCTION_TIMEOUT = 25000; // 25 seconds (Supabase Edge Functions have 30s limit)
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Utility function for structured logging
function logError(context: string, error: any, metadata?: any) {
  console.error(`[STRIPE_WEBHOOK_ERROR] ${context}:`, {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    metadata,
    timestamp: new Date().toISOString()
  });
}

function logInfo(context: string, message: string, metadata?: any) {
  console.log(`[STRIPE_WEBHOOK_INFO] ${context}: ${message}`, {
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

// Initialize Stripe and Supabase with error handling
function initializeServices() {
  const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!stripeSecret) {
    throw new Error('STRIPE_SECRET_KEY environment variable is required');
  }
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase environment variables are required');
  }
  
  const stripe = new Stripe(stripeSecret, {
    appInfo: {
      name: 'Alyah Knowledge Webhook',
      version: '1.0.0',
    },
    timeout: 20000, // 20 second timeout for Stripe API calls
  });
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  
  return { stripe, supabase };
}

Deno.serve(async (req) => {
  const startTime = Date.now();
  
  try {
    // Set up timeout for the entire function
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Function timeout')), FUNCTION_TIMEOUT);
    });
    
    const processRequest = async () => {
      try {
        // Handle OPTIONS request for CORS preflight
        if (req.method === 'OPTIONS') {
          logInfo('CORS', 'Handling OPTIONS request');
          return new Response(null, { 
            status: 204,
            headers: corsHeaders 
          });
        }

        if (req.method !== 'POST') {
          logError('METHOD', 'Invalid method', { method: req.method });
          return new Response('Method not allowed', { 
            status: 405,
            headers: corsHeaders 
          });
        }

        // Initialize services
        const { stripe, supabase } = initializeServices();
        logInfo('INIT', 'Services initialized successfully');

        // Get the signature from the header
        const signature = req.headers.get('stripe-signature');
        const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

        if (!signature) {
          logError('SIGNATURE', 'No signature found in headers');
          return new Response('No signature found', { 
            status: 400,
            headers: corsHeaders 
          });
        }

        if (!stripeWebhookSecret) {
          logError('CONFIG', 'Webhook secret not configured');
          return new Response('Webhook secret not configured', { 
            status: 500,
            headers: corsHeaders 
          });
        }

        // Get the raw body with timeout
        const body = await Promise.race([
          req.text(),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Request body timeout')), 10000)
          )
        ]);

        logInfo('BODY', 'Request body received', { bodyLength: body.length });

        // Verify the webhook signature with retry
        let event: Stripe.Event;
        try {
          event = await retryOperation(async () => {
            return await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
          });
          
          logInfo('SIGNATURE', 'Webhook signature verified successfully', { 
            eventType: event.type,
            eventId: event.id 
          });
        } catch (error: any) {
          logError('SIGNATURE_VERIFICATION', 'Webhook signature verification failed', { 
            error: error.message,
            signatureLength: signature.length 
          });
          return new Response(`Webhook signature verification failed: ${error.message}`, { 
            status: 400,
            headers: corsHeaders 
          });
        }

        // Process the event asynchronously to avoid blocking the response
        EdgeRuntime.waitUntil(
          handleEvent(event, stripe, supabase).catch(error => {
            logError('EVENT_PROCESSING', 'Failed to process event asynchronously', {
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

        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      } catch (error: any) {
        const processingTime = Date.now() - startTime;
        logError('REQUEST_PROCESSING', 'Error processing webhook request', {
          error: error.message,
          processingTime
        });
        
        return new Response(JSON.stringify({ 
          error: 'Internal server error',
          timestamp: new Date().toISOString()
        }), {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
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
    
    return new Response(JSON.stringify({ 
      error: 'Function timeout or critical error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});

async function handleEvent(event: Stripe.Event, stripe: Stripe, supabase: any) {
  const eventStartTime = Date.now();
  
  try {
    logInfo('EVENT_START', 'Processing event', { 
      eventType: event.type,
      eventId: event.id 
    });

    const stripeData = event?.data?.object ?? {};

    if (!stripeData) {
      logError('EVENT_DATA', 'No data object in event', { eventId: event.id });
      return;
    }

    if (!('customer' in stripeData)) {
      logInfo('EVENT_SKIP', 'No customer in event data', { eventType: event.type });
      return;
    }

    // For one time payments, we only listen for the checkout.session.completed event
    if (event.type === 'payment_intent.succeeded' && event.data.object.invoice === null) {
      logInfo('EVENT_SKIP', 'Skipping payment_intent.succeeded without invoice');
      return;
    }

    const { customer: customerId } = stripeData;

    if (!customerId || typeof customerId !== 'string') {
      logError('CUSTOMER_ID', 'Invalid customer ID', { 
        customerId,
        eventType: event.type,
        eventId: event.id 
      });
      return;
    }

    let isSubscription = true;

    if (event.type === 'checkout.session.completed') {
      const { mode } = stripeData as Stripe.Checkout.Session;
      isSubscription = mode === 'subscription';
      
      logInfo('CHECKOUT', `Processing ${isSubscription ? 'subscription' : 'one-time payment'} checkout session`, {
        sessionId: (stripeData as Stripe.Checkout.Session).id,
        mode
      });
    }

    const { mode, payment_status } = stripeData as Stripe.Checkout.Session;

    if (isSubscription) {
      logInfo('SUBSCRIPTION_SYNC', 'Starting subscription sync', { customerId });
      await retryOperation(() => syncCustomerFromStripe(customerId, stripe, supabase));
    } else if (mode === 'payment' && payment_status === 'paid') {
      logInfo('PAYMENT_PROCESSING', 'Processing one-time payment', { customerId });
      await retryOperation(() => processOneTimePayment(stripeData as Stripe.Checkout.Session, supabase));
    }

    const processingTime = Date.now() - eventStartTime;
    logInfo('EVENT_COMPLETE', 'Event processed successfully', { 
      eventType: event.type,
      processingTime 
    });

  } catch (error: any) {
    const processingTime = Date.now() - eventStartTime;
    logError('EVENT_PROCESSING', 'Error processing event', {
      eventType: event.type,
      eventId: event.id,
      error: error.message,
      processingTime
    });
    throw error; // Re-throw to be caught by the caller
  }
}

async function processOneTimePayment(session: Stripe.Checkout.Session, supabase: any) {
  try {
    const {
      id: checkout_session_id,
      payment_intent,
      amount_subtotal,
      amount_total,
      currency,
      customer: customerId,
      payment_status
    } = session;

    if (!checkout_session_id || !payment_intent || !customerId) {
      throw new Error('Missing required session data for one-time payment');
    }

    // Insert the order into the stripe_orders table with retry
    const { error: orderError } = await supabase.from('stripe_orders').insert({
      checkout_session_id,
      payment_intent_id: payment_intent,
      customer_id: customerId,
      amount_subtotal: amount_subtotal || 0,
      amount_total: amount_total || 0,
      currency: currency || 'eur',
      payment_status,
      status: 'completed',
    });

    if (orderError) {
      logError('ORDER_INSERT', 'Error inserting order', { 
        orderError,
        checkout_session_id 
      });
      throw new Error(`Failed to insert order: ${orderError.message}`);
    }

    logInfo('PAYMENT_SUCCESS', 'One-time payment processed successfully', { 
      checkout_session_id 
    });
  } catch (error: any) {
    logError('PAYMENT_PROCESSING', 'Error processing one-time payment', {
      sessionId: session.id,
      error: error.message
    });
    throw error;
  }
}

async function syncCustomerFromStripe(customerId: string, stripe: Stripe, supabase: any) {
  try {
    logInfo('CUSTOMER_SYNC', 'Starting customer sync', { customerId });

    // Fetch latest subscription data from Stripe with timeout and retry
    const subscriptions = await retryOperation(async () => {
      return await stripe.subscriptions.list({
        customer: customerId,
        limit: 1,
        status: 'all',
        expand: ['data.default_payment_method'],
      });
    });

    logInfo('STRIPE_API', 'Subscriptions fetched from Stripe', { 
      customerId,
      subscriptionCount: subscriptions.data.length 
    });

    if (subscriptions.data.length === 0) {
      logInfo('NO_SUBSCRIPTIONS', 'No subscriptions found for customer', { customerId });
      
      const { error: noSubError } = await supabase.from('stripe_subscriptions').upsert(
        {
          customer_id: customerId,
          status: 'not_started',
          updated_at: new Date().toISOString()
        },
        {
          onConflict: 'customer_id',
        },
      );

      if (noSubError) {
        logError('DB_UPDATE', 'Error updating subscription status for customer with no subscriptions', {
          customerId,
          error: noSubError
        });
        throw new Error('Failed to update subscription status in database');
      }
      
      return;
    }

    // Process the first (most recent) subscription
    const subscription = subscriptions.data[0];
    
    if (!subscription.id) {
      throw new Error('Invalid subscription data from Stripe');
    }

    logInfo('SUBSCRIPTION_DATA', 'Processing subscription', {
      customerId,
      subscriptionId: subscription.id,
      status: subscription.status
    });

    // Prepare subscription data with safe defaults
    const subscriptionData = {
      customer_id: customerId,
      subscription_id: subscription.id,
      price_id: subscription.items.data[0]?.price?.id || null,
      current_period_start: subscription.current_period_start || null,
      current_period_end: subscription.current_period_end || null,
      cancel_at_period_end: subscription.cancel_at_period_end || false,
      status: subscription.status as any,
      updated_at: new Date().toISOString()
    };

    // Add payment method info if available
    if (subscription.default_payment_method && typeof subscription.default_payment_method !== 'string') {
      subscriptionData.payment_method_brand = subscription.default_payment_method.card?.brand ?? null;
      subscriptionData.payment_method_last4 = subscription.default_payment_method.card?.last4 ?? null;
    }

    // Store subscription state with retry
    const { error: subError } = await retryOperation(async () => {
      return await supabase.from('stripe_subscriptions').upsert(
        subscriptionData,
        {
          onConflict: 'customer_id',
        },
      );
    });

    if (subError) {
      logError('DB_SYNC', 'Error syncing subscription', {
        customerId,
        subscriptionId: subscription.id,
        error: subError
      });
      throw new Error(`Failed to sync subscription in database: ${subError.message}`);
    }
    
    logInfo('CUSTOMER_SYNC_SUCCESS', 'Successfully synced subscription', {
      customerId,
      subscriptionId: subscription.id
    });
    
  } catch (error: any) {
    logError('CUSTOMER_SYNC', 'Failed to sync customer', {
      customerId,
      error: error.message
    });
    throw error;
  }
}