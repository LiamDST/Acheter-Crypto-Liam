import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Configuration
const FUNCTION_TIMEOUT = 25000; // 25 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Utility function for structured logging
function logError(context: string, error: any, metadata?: any) {
  console.error(`[SAMPLE_DATA_ERROR] ${context}:`, {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    metadata,
    timestamp: new Date().toISOString()
  });
}

function logInfo(context: string, message: string, metadata?: any) {
  console.log(`[SAMPLE_DATA_INFO] ${context}: ${message}`, {
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
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        
        if (!supabaseUrl || !supabaseServiceKey) {
          logError('CONFIG', 'Missing required environment variables');
          return new Response(
            JSON.stringify({ error: 'Server configuration error' }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 500,
            }
          );
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey, {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        });
        
        logInfo('INIT', 'Supabase client initialized');

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
        } catch (error) {
          logError('BODY_PARSE', 'Failed to parse request body', { error });
          return new Response(
            JSON.stringify({ error: 'Invalid request body' }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            }
          );
        }
        
        const { userId } = requestData;
        
        if (!userId) {
          logError('VALIDATION', 'User ID is required');
          return new Response(
            JSON.stringify({ error: 'User ID is required' }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            }
          );
        }

        logInfo('PROCESSING', 'Starting sample data creation', { userId });

        // Create sample data with error handling for each operation
        await createSampleDataSafely(userId, supabase);

        const processingTime = Date.now() - startTime;
        logInfo('SUCCESS', 'Sample data created successfully', { 
          userId,
          processingTime 
        });
        
        return new Response(
          JSON.stringify({ 
            success: true,
            message: 'Sample data created successfully'
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
        
      } catch (error: any) {
        const processingTime = Date.now() - startTime;
        logError('REQUEST_PROCESSING', 'Error processing sample data request', {
          error: error.message,
          processingTime
        });
        
        return new Response(
          JSON.stringify({ 
            error: 'Internal server error',
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
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
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

async function createSampleDataSafely(userId: string, supabase: any) {
  const operations = [
    { name: 'invoices', operation: () => createSampleInvoices(userId, supabase) },
    { name: 'trades', operation: () => createSampleTrades(userId, supabase) },
    { name: 'progress', operation: () => createSampleProgress(userId, supabase) },
    { name: 'notifications', operation: () => createSampleNotifications(userId, supabase) },
    { name: 'preferences', operation: () => createSamplePreferences(userId, supabase) },
    { name: 'subscription', operation: () => createSampleSubscription(userId, supabase) }
  ];

  for (const { name, operation } of operations) {
    try {
      await retryOperation(operation);
      logInfo('SAMPLE_DATA', `${name} created successfully`, { userId });
    } catch (error: any) {
      logError('SAMPLE_DATA', `Failed to create ${name}`, {
        userId,
        error: error.message
      });
      // Continue with other operations even if one fails
    }
  }
}

async function createSampleInvoices(userId: string, supabase: any) {
  const invoices = [
    {
      user_id: userId,
      amount: 75,
      status: 'paid',
      created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      payment_method: 'Carte bancaire',
      invoice_url: 'https://example.com/invoice1.pdf'
    },
    {
      user_id: userId,
      amount: 75,
      status: 'paid',
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      payment_method: 'Carte bancaire',
      invoice_url: 'https://example.com/invoice2.pdf'
    },
    {
      user_id: userId,
      amount: 75,
      status: 'pending',
      created_at: new Date().toISOString(),
      payment_method: 'Carte bancaire'
    }
  ];
  
  const { error } = await supabase.from('invoices').insert(invoices);
  if (error) throw error;
}

async function createSampleTrades(userId: string, supabase: any) {
  const trades = [
    {
      user_id: userId,
      type: 'buy',
      pair: 'BTC/USDT',
      entry_price: 68500,
      target_price: 70500,
      stop_loss: 67200,
      status: 'completed',
      created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      completed_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      profit_loss: 2.8
    },
    {
      user_id: userId,
      type: 'sell',
      pair: 'ETH/USDT',
      entry_price: 3450,
      target_price: 3380,
      stop_loss: 3520,
      status: 'completed',
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      completed_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      profit_loss: -1.2
    },
    {
      user_id: userId,
      type: 'buy',
      pair: 'SOL/USDT',
      entry_price: 140,
      target_price: 148,
      stop_loss: 136,
      status: 'active',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
  
  const { error } = await supabase.from('trades').insert(trades);
  if (error) throw error;
}

async function createSampleProgress(userId: string, supabase: any) {
  const courseProgress = [
    {
      user_id: userId,
      module_id: 'module-1',
      module_name: 'Les Fondamentaux de la Blockchain',
      status: 'completed',
      progress_percentage: 100,
      last_activity: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: userId,
      module_id: 'module-2',
      module_name: 'Les Principes de la Décentralisation',
      status: 'completed',
      progress_percentage: 100,
      last_activity: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: userId,
      module_id: 'module-3',
      module_name: 'La Cryptographie et la Sécurité',
      status: 'in_progress',
      progress_percentage: 60,
      last_activity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
  
  const { error } = await supabase.from('user_progress').insert(courseProgress);
  if (error) throw error;
}

async function createSampleNotifications(userId: string, supabase: any) {
  const notifications = [
    {
      user_id: userId,
      title: 'Nouveau signal de trading',
      message: 'Un nouveau signal de trading BTC/USDT a été généré. Consultez votre tableau de bord pour plus de détails.',
      type: 'info',
      is_read: true,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: userId,
      title: 'Abonnement renouvelé',
      message: 'Votre abonnement mensuel a été renouvelé avec succès. Merci pour votre confiance !',
      type: 'success',
      is_read: true,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_id: userId,
      title: 'Nouveau module disponible',
      message: 'Le module "Stratégies Avancées de Trading" est maintenant disponible dans votre formation.',
      type: 'info',
      is_read: false,
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
  
  const { error } = await supabase.from('notifications').insert(notifications);
  if (error) throw error;
}

async function createSamplePreferences(userId: string, supabase: any) {
  const preferences = {
    user_id: userId,
    email_notifications: true,
    trade_alerts: true,
    marketing_emails: false,
    dark_mode: false,
    updated_at: new Date().toISOString()
  };
  
  const { error } = await supabase.from('user_preferences').upsert(preferences);
  if (error) throw error;
}

async function createSampleSubscription(userId: string, supabase: any) {
  const subscription = {
    user_id: userId,
    plan_type: 'formation',
    amount: 249.99,
    status: 'active',
    start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    auto_renew: true,
    stripe_customer_id: 'cus_sample123',
    stripe_subscription_id: 'sub_sample123'
  };
  
  const { error } = await supabase.from('subscriptions').upsert(subscription);
  if (error) throw error;
}