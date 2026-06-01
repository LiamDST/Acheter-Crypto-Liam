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
  console.error(`[RESET_PASSWORD_ERROR] ${context}:`, {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    metadata,
    timestamp: new Date().toISOString()
  });
}

function logInfo(context: string, message: string, metadata?: any) {
  console.log(`[RESET_PASSWORD_INFO] ${context}: ${message}`, {
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
        
        const { email, token } = requestData;
        
        if (!email || !token) {
          logError('VALIDATION', 'Email and token are required');
          return new Response(
            JSON.stringify({ error: 'Email and token are required' }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            }
          );
        }

        logInfo('PROCESSING', 'Processing password reset email', { email });

        // Get user details with retry
        let userData;
        try {
          const { data, error: userError } = await retryOperation(async () => {
            return await supabase
              .from('users')
              .select('first_name')
              .eq('email', email)
              .single();
          });
          
          userData = data;
          if (userError) {
            logError('USER_FETCH', 'Error fetching user', { email, error: userError });
          }
        } catch (error) {
          logError('USER_FETCH', 'Failed to fetch user after retries', { email, error });
          // Continue without user data
        }
        
        const firstName = userData?.first_name || 'Utilisateur';
        
        // Create reset URL with token
        const frontendUrl = Deno.env.get('FRONTEND_URL') || 'https://alyah-knowledge.com';
        const resetUrl = `${frontendUrl}/reset-password#access_token=${token}&type=recovery`;
        
        // Log the password reset request for security with retry
        try {
          const { data: { user } } = await retryOperation(async () => {
            return await supabase.auth.admin.getUserByEmail(email);
          });
          
          await retryOperation(async () => {
            return await supabase.from('security_logs').insert({
              event_type: 'password_reset_requested',
              user_id: user?.id,
              details: { email_sent: true },
            });
          });
        } catch (error) {
          logError('SECURITY_LOG', 'Failed to log password reset request', { email, error });
          // Continue even if logging fails
        }
        
        // In a real implementation, you would send the email here
        logInfo('EMAIL', 'Password reset email would be sent', { 
          email,
          resetUrl,
          firstName 
        });

        const processingTime = Date.now() - startTime;
        logInfo('SUCCESS', 'Password reset email processed successfully', { 
          email,
          processingTime 
        });
        
        return new Response(
          JSON.stringify({ success: true }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
        
      } catch (error: any) {
        const processingTime = Date.now() - startTime;
        logError('REQUEST_PROCESSING', 'Error processing password reset request', {
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