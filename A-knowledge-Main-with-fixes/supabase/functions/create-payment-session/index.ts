import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import Stripe from 'npm:stripe@13.7.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Configuration
const FUNCTION_TIMEOUT = 25000; // 25 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Utility function for structured logging
function logError(context: string, error: any, metadata?: any) {
  console.error(`[PAYMENT_SESSION_ERROR] ${context}:`, {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    metadata,
    timestamp: new Date().toISOString()
  });
}

function logInfo(context: string, message: string, metadata?: any) {
  console.log(`[PAYMENT_SESSION_INFO] ${context}: ${message}`, {
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

Deno.serve(async (req) => {
  const startTime = Date.now();
  
  try {
    // Set up timeout for the entire function
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Function timeout')), FUNCTION_TIMEOUT);
    });
    
    const processRequest = async () => {
      try {
        // Handle CORS preflight requests
        if (req.method === 'OPTIONS') {
          logInfo('CORS', 'Handling OPTIONS request');
          return new Response(null, {
            status: 204,
            headers: corsHeaders,
          });
        }

        // Validate environment variables
        const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
        const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
        const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const SITE_URL = Deno.env.get('SITE_URL') || 'https://alyah-knowledge.com';

        if (!STRIPE_SECRET_KEY) {
          logError('CONFIG', 'Missing STRIPE_SECRET_KEY environment variable');
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
          httpClient: Stripe.createFetchHttpClient(),
          timeout: 20000, // 20 second timeout
        });

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        });

        logInfo('INIT', 'Services initialized successfully');

        // Parse request body with timeout
        let requestData;
        try {
          const bodyText = await Promise.race([
            req.text(),
            new Promise<never>((_, reject) => 
              setTimeout(() => reject(new Error('Request body timeout')), 5000)
            )
          ]);
          
          requestData = JSON.parse(bodyText);
          logInfo('BODY', 'Request body parsed successfully');
        } catch (error) {
          logError('BODY_PARSE', 'Failed to parse request body', { error });
          return new Response(
            JSON.stringify({ error: 'Invalid request body' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        const { userId, planType, montant } = requestData;

        // Validate required parameters
        if (!userId || !planType || !montant) {
          logError('VALIDATION', 'Missing required parameters', { userId, planType, montant });
          return new Response(
            JSON.stringify({ error: 'Missing required parameters: userId, planType, or montant' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        // Validate amount
        if (typeof montant !== 'number' || montant <= 0) {
          logError('VALIDATION', 'Invalid amount', { montant });
          return new Response(
            JSON.stringify({ error: 'Invalid amount: must be a positive number' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        // Verify user exists with retry
        const { data: userData, error: userError } = await retryOperation(async () => {
          return await supabase.auth.admin.getUserById(userId);
        });

        if (userError || !userData.user) {
          logError('USER_VERIFICATION', 'User not found', { userId, error: userError });
          return new Response(
            JSON.stringify({ error: 'User not found' }),
            {
              status: 404,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        logInfo('USER_VERIFIED', 'User verified successfully', { userId });

        // Determine subscription details based on plan type
        let interval: 'month' | 'year' = 'month';
        let intervalCount = 1;
        let durationDays = 30;

        switch (planType) {
          case 'monthly':
            interval = 'month';
            intervalCount = 1;
            durationDays = 30;
            break;
          case 'semester':
            interval = 'month';
            intervalCount = 6;
            durationDays = 180;
            break;
          case 'yearly':
            interval = 'year';
            intervalCount = 1;
            durationDays = 365;
            break;
          default:
            logError('VALIDATION', 'Invalid plan type', { planType });
            return new Response(
              JSON.stringify({ error: 'Invalid plan type' }),
              {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              }
            );
        }

        // Create Stripe Checkout Session with retry
        const session = await retryOperation(async () => {
          return await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            success_url: `${SITE_URL}/dashboard?success=true`,
            cancel_url: `${SITE_URL}/solutions#${planType}`,
            customer_email: userData.user.email,
            customer_creation: 'always',
            line_items: [
              {
                price_data: {
                  currency: 'eur',
                  product_data: {
                    name: `Formation Trading - ${planType.charAt(0).toUpperCase() + planType.slice(1)}`,
                    description: `Abonnement ${planType}`,
                  },
                  unit_amount: montant,
                  recurring: {
                    interval,
                    interval_count: intervalCount,
                  },
                },
                quantity: 1,
              },
            ],
            metadata: {
              userId,
              planType,
              durationDays: durationDays.toString(),
            },
          });
        });

        if (!session.url) {
          throw new Error('Stripe session created but no URL returned');
        }

        // Log the session creation for audit purposes with retry
        try {
          await retryOperation(async () => {
            return await supabase.from('security_logs').insert({
              event_type: 'payment_initiated',
              user_id: userId,
              details: {
                plan_type: planType,
                amount: montant / 100, // Convert from cents to currency
                session_id: session.id,
              },
            });
          });
        } catch (error) {
          logError('SECURITY_LOG', 'Failed to log payment initiation', { 
            userId,
            sessionId: session.id,
            error 
          });
          // Continue even if logging fails
        }

        const processingTime = Date.now() - startTime;
        logInfo('SUCCESS', 'Payment session created successfully', {
          sessionId: session.id,
          userId,
          processingTime
        });

        return new Response(
          JSON.stringify({ url: session.url }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );

      } catch (error: any) {
        const processingTime = Date.now() - startTime;
        logError('REQUEST_PROCESSING', 'Error processing payment session request', {
          error: error.message,
          processingTime
        });
        
        return new Response(
          JSON.stringify({
            error: 'Internal server error',
            timestamp: new Date().toISOString(),
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
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});