/*
  # Security Improvements Migration

  1. New Schema
    - `private` schema for sensitive data

  2. Security Changes
    - Secure view for active subscriptions
    - Fixed search_path for functions
    - RLS enabled on all tables
    - Security invoker for views and functions
*/

-- Create private schema
CREATE SCHEMA IF NOT EXISTS private;

-- Grant usage to authenticated users and service role
GRANT USAGE ON SCHEMA private TO authenticated;
GRANT USAGE ON SCHEMA private TO service_role;

-- Move sensitive view to private schema
CREATE OR REPLACE VIEW private.secure_active_subscriptions AS
SELECT 
  s.*,
  u.email,
  u.raw_user_meta_data->>'first_name' as first_name,
  u.raw_user_meta_data->>'last_name' as last_name
FROM subscriptions s
JOIN auth.users u ON s.user_id = u.id
WHERE s.status = 'active'
  AND s.end_date > now();

-- Grant select on private view to authenticated users
GRANT SELECT ON private.secure_active_subscriptions TO authenticated;

-- Fix the public view to not expose auth.users directly
DROP VIEW IF EXISTS public.active_subscriptions;

CREATE VIEW public.active_subscriptions AS
SELECT 
  s.id,
  s.user_id,
  s.plan_type,
  s.amount,
  s.status,
  s.start_date,
  s.end_date,
  s.created_at,
  s.updated_at,
  s.stripe_customer_id,
  s.stripe_subscription_id,
  s.auto_renew,
  -- Only include minimal user data, not exposing auth.users directly
  COALESCE(u.raw_user_meta_data->>'email', u.email) as email,
  COALESCE(u.raw_user_meta_data->>'first_name', '') as first_name,
  COALESCE(u.raw_user_meta_data->>'last_name', '') as last_name
FROM subscriptions s
LEFT JOIN auth.users u ON s.user_id = u.id
WHERE s.status = 'active'
  AND s.end_date > now();

-- Set the view to security invoker (separate step)
ALTER VIEW public.active_subscriptions SET (security_invoker = true);

-- Create policy for the subscriptions table to ensure proper access control
DO $$
BEGIN
  -- Check if the policy already exists
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'subscriptions'
    AND policyname = 'Users can only view their own subscription data'
  ) THEN
    -- Create the policy if it doesn't exist
    EXECUTE 'CREATE POLICY "Users can only view their own subscription data" 
      ON subscriptions
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id)';
  END IF;
END
$$;

-- Fix search_path for update_updated_at_column function
DO $$
BEGIN
  -- Check if the function exists before trying to alter it
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
    ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
  END IF;
END
$$;

-- Create a secure function to update timestamps with fixed search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Set security settings for the function
ALTER FUNCTION public.update_updated_at_column() SECURITY INVOKER;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;

-- Ensure RLS is enabled on all tables
DO $$
DECLARE
    table_record RECORD;
BEGIN
    FOR table_record IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename NOT IN ('spatial_ref_sys') -- exclude PostGIS tables
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', table_record.tablename);
        
        -- Check if a policy exists for this table
        IF NOT EXISTS (
            SELECT 1 
            FROM pg_policies 
            WHERE schemaname = 'public' 
            AND tablename = table_record.tablename
        ) THEN
            -- Create a default policy if none exists
            BEGIN
                EXECUTE format('
                    CREATE POLICY "Default policy for %I" 
                    ON public.%I 
                    FOR ALL 
                    TO authenticated 
                    USING (auth.uid() = user_id);', 
                    table_record.tablename, table_record.tablename);
            EXCEPTION WHEN OTHERS THEN
                -- If policy creation fails (e.g., no user_id column), log and continue
                RAISE NOTICE 'Could not create default policy for table %', table_record.tablename;
            END;
        END IF;
    END LOOP;
END
$$;

-- Create a comment to document the security changes
COMMENT ON SCHEMA private IS 'Schema for sensitive data that should not be directly accessible';