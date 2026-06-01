import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
};

// Configuration
const FUNCTION_TIMEOUT = 25000; // 25 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Utility function for structured logging
function logError(context: string, error: any, metadata?: any) {
  console.error(`[STRIPE_CHECKOUT_ERROR] ${context}:`, {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    metadata,
    timestamp: new Date().toISOString()
  });
}

function logInfo(context: string, message: string, metadata?: any) {
  console.log(`[STRIPE_CHECKOUT_INFO] ${context}: ${message}`, {
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

// Helper function to create responses with CORS headers
function corsResponse(body: string | object | null, status = 200) {
  // For 204 No Content, don't include Content-Type or body
  if (status === 204) {
    return new Response(null, { status, headers: corsHeaders });
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

// Initialize services with proper error handling
function initializeServices() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY');

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are missing');
  }

  if (!stripeSecret) {
    throw new Error('STRIPE_SECRET_KEY environment variable is missing');
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const stripe = new Stripe(stripeSecret, {
    appInfo: {
      name: 'Alyah Knowledge Checkout',
      version: '1.0.0',
    },
    timeout: 20000, // 20 second timeout
  });

  return { supabase, stripe };
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
        if (req.method === 'OPTIONS') {
          logInfo('CORS', 'Handling OPTIONS request');
          return corsResponse(null, 204);
        }

        if (req.method !== 'POST') {
          logError('METHOD', 'Invalid method', { method: req.method });
          return corsResponse({ error: 'Method not allowed' }, 405);
        }

        // Initialize services
        const { supabase, stripe } = initializeServices();
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
          return corsResponse({ error: 'Invalid request body' }, 400);
        }

        const { price_id, success_url, cancel_url, mode, promotion_code } = requestData;

        // Validate parameters
        const error = validateParameters(
          { price_id, success_url, cancel_url, mode },
          {
            cancel_url: 'string',
            price_id: 'string',
            success_url: 'string',
            mode: { values: ['payment', 'subscription'] },
          },
        );

        if (error) {
          logError('VALIDATION', 'Parameter validation failed', { error, requestData });
          return corsResponse({ error }, 400);
        }

        // Get and validate user
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
          logError('AUTH', 'No authorization header provided');
          return corsResponse({ error: 'Authorization header required' }, 401);
        }

        const token = authHeader.replace('Bearer ', '');
        
        const { data: { user }, error: getUserError } = await retryOperation(async () => {
          return await supabase.auth.getUser(token);
        });

        if (getUserError) {
          logError('USER_AUTH', 'Failed to authenticate user', { error: getUserError });
          return corsResponse({ error: 'Failed to authenticate user' }, 401);
        }

        if (!user) {
          logError('USER_NOT_FOUND', 'User not found');
          return corsResponse({ error: 'User not found' }, 404);
        }

        logInfo('USER_AUTH', 'User authenticated successfully', { userId: user.id });

        // Get or create customer
        const customerId = await retryOperation(() => getOrCreateCustomer(user, supabase, stripe));
        logInfo('CUSTOMER', 'Customer resolved', { customerId, userId: user.id });

        // Create checkout session options with safe defaults
        const sessionOptions: Stripe.Checkout.SessionCreateParams = {
          customer: customerId,
          payment_method_types: ['card'],
          line_items: [
            {
              price: price_id,
              quantity: 1,
            },
          ],
          mode,
          success_url,
          cancel_url,
          allow_promotion_codes: true,
          metadata: {
            userId: user.id,
            planType: price_id.includes('formation') && !price_id.includes('signaux') ? 'formation' : 'formationSignaux'
          }
        };

        // Handle promotion code if provided
        if (promotion_code && promotion_code.trim()) {
          try {
            await handlePromotionCode(promotion_code, sessionOptions, stripe);
          } catch (promoError) {
            logError('PROMOTION_CODE', 'Error processing promotion code', { 
              promotion_code,
              error: promoError 
            });
            // Continue without promotion code rather than failing
          }
        }

        // Create Checkout Session with retry
        const session = await retryOperation(async () => {
          return await stripe.checkout.sessions.create(sessionOptions);
        });

        if (!session.url) {
          throw new Error('Stripe session created but no URL returned');
        }

        const processingTime = Date.now() - startTime;
        logInfo('CHECKOUT_SUCCESS', 'Checkout session created successfully', {
          sessionId: session.id,
          userId: user.id,
          processingTime
        });

        return corsResponse({ sessionId: session.id, url: session.url });

      } catch (error: any) {
        const processingTime = Date.now() - startTime;
        logError('REQUEST_PROCESSING', 'Error processing checkout request', {
          error: error.message,
          processingTime
        });
        
        return corsResponse({ 
          error: 'Internal server error',
          timestamp: new Date().toISOString()
        }, 500);
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
    
    return corsResponse({ 
      error: 'Function timeout or critical error',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

async function getOrCreateCustomer(user: any, supabase: any, stripe: Stripe): Promise<string> {
  try {
    // Check if customer mapping exists
    const { data: customer, error: getCustomerError } = await supabase
      .from('stripe_customers')
      .select('customer_id')
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .maybeSingle();

    if (getCustomerError) {
      logError('CUSTOMER_FETCH', 'Failed to fetch customer information', {
        userId: user.id,
        error: getCustomerError
      });
      throw new Error('Failed to fetch customer information from database');
    }

    if (customer?.customer_id) {
      logInfo('CUSTOMER_EXISTS', 'Using existing customer', {
        customerId: customer.customer_id,
        userId: user.id
      });
      return customer.customer_id;
    }

    // Create new customer in Stripe
    const newCustomer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id,
      },
    });

    logInfo('CUSTOMER_CREATED', 'Created new Stripe customer', {
      customerId: newCustomer.id,
      userId: user.id
    });

    // Save customer mapping to database
    const { error: createCustomerError } = await supabase.from('stripe_customers').insert({
      user_id: user.id,
      customer_id: newCustomer.id,
      email: user.email,
    });

    if (createCustomerError) {
      logError('CUSTOMER_MAPPING', 'Failed to save customer mapping', {
        customerId: newCustomer.id,
        userId: user.id,
        error: createCustomerError
      });

      // Clean up Stripe customer if database insert fails
      try {
        await stripe.customers.del(newCustomer.id);
        logInfo('CLEANUP', 'Cleaned up Stripe customer after database error', {
          customerId: newCustomer.id
        });
      } catch (deleteError) {
        logError('CLEANUP', 'Failed to clean up Stripe customer', {
          customerId: newCustomer.id,
          error: deleteError
        });
      }

      throw new Error('Failed to create customer mapping in database');
    }

    return newCustomer.id;
    
  } catch (error: any) {
    logError('CUSTOMER_RESOLUTION', 'Error resolving customer', {
      userId: user.id,
      error: error.message
    });
    throw error;
  }
}

async function handlePromotionCode(
  promotion_code: string, 
  sessionOptions: Stripe.Checkout.SessionCreateParams, 
  stripe: Stripe
) {
  try {
    logInfo('PROMOTION_CODE', 'Processing promotion code', { promotion_code });
    
    // Try to find the promotion code in Stripe
    const promotionCodes = await stripe.promotionCodes.list({
      code: promotion_code,
      active: true,
      limit: 1,
    });
    
    if (promotionCodes.data.length > 0) {
      sessionOptions.discounts = [
        {
          promotion_code: promotionCodes.data[0].id,
        },
      ];
      logInfo('PROMOTION_APPLIED', 'Applied promotion code to checkout session', {
        promotion_code,
        promotionCodeId: promotionCodes.data[0].id
      });
    } else {
      // Try to find the coupon directly
      logInfo('COUPON_SEARCH', 'Promotion code not found, searching for coupon', { promotion_code });
      
      const coupons = await stripe.coupons.list({ limit: 100 });
      
      const coupon = coupons.data.find(c => 
        c.id === promotion_code || 
        c.name === promotion_code || 
        c.id.toLowerCase() === promotion_code.toLowerCase()
      );
      
      if (coupon) {
        sessionOptions.discounts = [
          {
            coupon: coupon.id,
          },
        ];
        logInfo('COUPON_APPLIED', 'Applied coupon directly to checkout session', {
          promotion_code,
          couponId: coupon.id
        });
      } else {
        logInfo('PROMOTION_NOT_FOUND', 'Neither promotion code nor coupon found', {
          promotion_code,
          availableCoupons: coupons.data.length
        });
      }
    }
  } catch (error: any) {
    logError('PROMOTION_CODE_PROCESSING', 'Error processing promotion code', {
      promotion_code,
      error: error.message
    });
    throw error;
  }
}

type ExpectedType = 'string' | { values: string[] };
type Expectations<T> = { [K in keyof T]: ExpectedType };

function validateParameters<T extends Record<string, any>>(
  values: T, 
  expected: Expectations<T>
): string | undefined {
  try {
    for (const parameter in values) {
      const expectation = expected[parameter];
      const value = values[parameter];

      if (expectation === 'string') {
        if (value == null) {
          return `Missing required parameter ${parameter}`;
        }
        if (typeof value !== 'string') {
          return `Expected parameter ${parameter} to be a string got ${JSON.stringify(value)}`;
        }
        if (value.trim() === '') {
          return `Parameter ${parameter} cannot be empty`;
        }
      } else {
        if (!expectation.values.includes(value)) {
          return `Expected parameter ${parameter} to be one of ${expectation.values.join(', ')}`;
        }
      }
    }

    return undefined;
  } catch (error: any) {
    logError('VALIDATION', 'Error during parameter validation', { error: error.message });
    return 'Parameter validation failed';
  }
}