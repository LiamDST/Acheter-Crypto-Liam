/*
  # Update Subscription Plan Types

  1. Changes
    - Update subscription_plan_type enum to include new plan types
    - Add new columns to track subscription details
    - Update existing data to match new plan structure
    - Recreate dependent views with new fields

  2. Fix for error: "cannot alter type of a column used by a view or rule"
    - Drop dependent views first
    - Make schema changes
    - Recreate views with updated fields
*/

-- First, drop dependent views
DROP VIEW IF EXISTS active_subscriptions;
DROP VIEW IF EXISTS private.secure_active_subscriptions;

-- Update subscription_plan_type enum to match new plans
ALTER TYPE subscription_plan_type RENAME TO subscription_plan_type_old;
CREATE TYPE subscription_plan_type AS ENUM ('formation', 'formationSignaux', 'monthly', 'semester', 'yearly');

-- Migrate existing data to new enum type
ALTER TABLE subscriptions 
  ALTER COLUMN plan_type TYPE TEXT;

-- Update existing subscriptions to new plan types
UPDATE subscriptions
SET plan_type = CASE
  WHEN plan_type = 'monthly' THEN 'formation'
  WHEN plan_type = 'semester' OR plan_type = 'yearly' THEN 'formationSignaux'
  ELSE plan_type
END;

-- Convert back to enum type
ALTER TABLE subscriptions 
  ALTER COLUMN plan_type TYPE subscription_plan_type USING plan_type::subscription_plan_type;

-- Drop old enum type
DROP TYPE subscription_plan_type_old;

-- Add new columns to track subscription details
ALTER TABLE subscriptions
  ADD COLUMN IF NOT EXISTS plan_name TEXT,
  ADD COLUMN IF NOT EXISTS includes_signals BOOLEAN DEFAULT FALSE;

-- Update existing subscriptions with new details
UPDATE subscriptions
SET 
  plan_name = CASE 
    WHEN plan_type::TEXT = 'formation' THEN 'Formation seule'
    WHEN plan_type::TEXT = 'formationSignaux' THEN 'Formation + Signaux'
    WHEN plan_type::TEXT = 'monthly' THEN 'Formation seule'
    WHEN plan_type::TEXT = 'semester' THEN 'Formation + Signaux'
    WHEN plan_type::TEXT = 'yearly' THEN 'Formation + Signaux'
    ELSE NULL
  END,
  includes_signals = CASE
    WHEN plan_type::TEXT IN ('formationSignaux', 'semester', 'yearly') THEN TRUE
    ELSE FALSE
  END;

-- Recreate the private secure view
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

-- Create a view for subscription details
CREATE OR REPLACE VIEW subscription_details AS
SELECT 
  s.id,
  s.user_id,
  s.plan_type,
  s.plan_name,
  s.includes_signals,
  s.amount,
  s.status,
  s.start_date,
  s.end_date,
  s.created_at,
  s.updated_at,
  s.stripe_customer_id,
  s.stripe_subscription_id,
  s.auto_renew,
  u.email,
  u.raw_user_meta_data->>'first_name' as first_name,
  u.raw_user_meta_data->>'last_name' as last_name
FROM subscriptions s
JOIN auth.users u ON s.user_id = u.id;

-- Set security for the view
ALTER VIEW subscription_details SET (security_invoker = true);
GRANT SELECT ON subscription_details TO authenticated;

-- Recreate active_subscriptions view to include new fields
CREATE OR REPLACE VIEW active_subscriptions AS
SELECT 
  s.id,
  s.user_id,
  s.plan_type,
  s.plan_name,
  s.includes_signals,
  s.amount,
  s.status,
  s.start_date,
  s.end_date,
  s.created_at,
  s.updated_at,
  s.stripe_customer_id,
  s.stripe_subscription_id,
  s.auto_renew,
  COALESCE(u.raw_user_meta_data->>'email', u.email) as email,
  COALESCE(u.raw_user_meta_data->>'first_name', '') as first_name,
  COALESCE(u.raw_user_meta_data->>'last_name', '') as last_name
FROM subscriptions s
LEFT JOIN auth.users u ON s.user_id = u.id
WHERE s.status = 'active'
  AND s.end_date > now();

-- Set security for the view
ALTER VIEW active_subscriptions SET (security_invoker = true);

-- Add comment to document the changes
COMMENT ON TABLE subscriptions IS 'Subscription information with updated plan types for formation and formation+signals';