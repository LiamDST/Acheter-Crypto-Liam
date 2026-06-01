/*
  # Security Fixes for Functions

  1. Changes
    - Fix search_path for update_updated_at_column function
    - Set SECURITY INVOKER for functions
    - Create update_updated_at_column function if it doesn't exist
*/

-- Fix search_path for update_updated_at_column function if it exists
DO $$
BEGIN
  -- Check if the function exists before trying to alter it
  IF EXISTS (
    SELECT 1 
    FROM pg_proc 
    WHERE proname = 'update_updated_at_column'
    AND pg_function_is_visible(oid)
  ) THEN
    ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
    
    -- Set security settings for the function
    ALTER FUNCTION public.update_updated_at_column() SECURITY INVOKER;
    
    -- Add a comment to document the security changes
    COMMENT ON FUNCTION public.update_updated_at_column() IS 'Trigger function to update the updated_at column. Security fixed: search_path set to public.';
  ELSE
    RAISE NOTICE 'Function update_updated_at_column does not exist, will create it.';
  END IF;
END
$$;

-- Create a secure function to update timestamps with fixed search_path if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_proc 
    WHERE proname = 'update_updated_at_column'
    AND pg_function_is_visible(oid)
  ) THEN
    -- Create the function with a different delimiter to avoid nesting issues
    EXECUTE '
    CREATE OR REPLACE FUNCTION public.update_updated_at_column()
    RETURNS TRIGGER AS $func$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW;
    END;
    $func$ LANGUAGE plpgsql;
    ';
    
    -- Set security settings for the function
    ALTER FUNCTION public.update_updated_at_column() SECURITY INVOKER;
    ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
    
    -- Add a comment to document the security changes
    COMMENT ON FUNCTION public.update_updated_at_column() IS 'Trigger function to update the updated_at column. Security fixed: search_path set to public.';
    
    RAISE NOTICE 'Created update_updated_at_column function with secure settings.';
  END IF;
END
$$;