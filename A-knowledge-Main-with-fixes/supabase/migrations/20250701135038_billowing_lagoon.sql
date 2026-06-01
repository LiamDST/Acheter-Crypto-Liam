-- First, drop dependent views
DROP VIEW IF EXISTS active_subscriptions;
DROP VIEW IF EXISTS subscription_details;
DROP VIEW IF EXISTS private.secure_active_subscriptions;

-- Now we can safely update the enum type
ALTER TYPE subscription_plan_type RENAME TO subscription_plan_type_old;
CREATE TYPE subscription_plan_type AS ENUM ('formation', 'formationSignaux');

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

-- Update existing subscriptions with new details
UPDATE subscriptions
SET 
  plan_name = CASE 
    WHEN plan_type::TEXT = 'formation' THEN 'Formation seule'
    WHEN plan_type::TEXT = 'formationSignaux' THEN 'Formation + Signaux'
    ELSE NULL
  END,
  includes_signals = CASE
    WHEN plan_type::TEXT = 'formationSignaux' THEN TRUE
    ELSE FALSE
  END;

-- Recreate the views that were dropped
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

-- Create a function to automatically update user progress after quiz completion
CREATE OR REPLACE FUNCTION update_user_progress_after_quiz()
RETURNS TRIGGER AS $$
DECLARE
  module_id TEXT;
  module_name TEXT;
  current_progress INT;
  total_modules INT := 20; -- Total number of modules in the course
  progress_increment INT := 5; -- Each module represents 5% of total progress
  user_id UUID;
BEGIN
  -- Extract module_id from the request
  module_id := NEW.module_id;
  user_id := NEW.user_id;
  
  -- Get module name
  SELECT title INTO module_name
  FROM modules
  WHERE id = module_id;
  
  -- Check if a progress record already exists for this module and user
  PERFORM id
  FROM user_progress
  WHERE user_id = NEW.user_id
    AND module_id = module_id;
    
  IF FOUND THEN
    -- Update existing record
    UPDATE user_progress
    SET 
      status = 'completed',
      progress_percentage = 100,
      last_activity = NOW()
    WHERE 
      user_id = NEW.user_id
      AND module_id = module_id;
  ELSE
    -- Create new record
    INSERT INTO user_progress (
      user_id,
      module_id,
      module_name,
      status,
      progress_percentage,
      last_activity
    ) VALUES (
      NEW.user_id,
      module_id,
      module_name,
      'completed',
      100,
      NOW()
    );
  END IF;
  
  -- Calculate overall progress
  SELECT COALESCE(COUNT(*), 0) * progress_increment INTO current_progress
  FROM user_progress
  WHERE user_id = NEW.user_id
    AND status = 'completed';
    
  -- Ensure progress doesn't exceed 100%
  IF current_progress > 100 THEN
    current_progress := 100;
  END IF;
  
  -- Create or update the next module's progress record
  -- Extract module number and calculate next module
  DECLARE
    current_module_num INT;
    next_module_id TEXT;
    next_module_name TEXT;
  BEGIN
    -- Extract module number (assuming format 'module-X')
    current_module_num := CAST(SUBSTRING(module_id FROM 'module-([0-9]+)') AS INT);
    
    -- Calculate next module ID
    IF current_module_num < total_modules THEN
      next_module_id := 'module-' || (current_module_num + 1)::TEXT;
      
      -- Get next module name
      SELECT title INTO next_module_name
      FROM modules
      WHERE id = next_module_id;
      
      -- Check if next module progress record exists
      PERFORM id
      FROM user_progress
      WHERE user_id = NEW.user_id
        AND module_id = next_module_id;
        
      IF NOT FOUND AND next_module_name IS NOT NULL THEN
        -- Create progress record for next module
        INSERT INTO user_progress (
          user_id,
          module_id,
          module_name,
          status,
          progress_percentage,
          last_activity
        ) VALUES (
          NEW.user_id,
          next_module_id,
          next_module_name,
          'not_started',
          0,
          NOW()
        );
      END IF;
    END IF;
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a table to track quiz completions
CREATE TABLE IF NOT EXISTS quiz_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  score INT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure a user can only complete a quiz once (they can retake it, but we'll update the record)
  UNIQUE(user_id, module_id)
);

-- Enable RLS on quiz_completions
ALTER TABLE quiz_completions ENABLE ROW LEVEL SECURITY;

-- Create policies for quiz_completions
CREATE POLICY "Users can insert their own quiz completions"
  ON quiz_completions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own quiz completions"
  ON quiz_completions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own quiz completions"
  ON quiz_completions
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can manage all quiz completions"
  ON quiz_completions
  FOR ALL
  TO service_role
  USING (true);

-- Create trigger to update user progress when a quiz is completed
CREATE TRIGGER update_progress_after_quiz
  AFTER INSERT OR UPDATE ON quiz_completions
  FOR EACH ROW
  EXECUTE FUNCTION update_user_progress_after_quiz();

-- Create indexes for quiz_completions
CREATE INDEX idx_quiz_completions_user_id ON quiz_completions(user_id);
CREATE INDEX idx_quiz_completions_module_id ON quiz_completions(module_id);

-- Add comment
COMMENT ON TABLE quiz_completions IS 'Tracks user quiz completions and automatically updates progress';
COMMENT ON FUNCTION update_user_progress_after_quiz() IS 'Automatically updates user progress when a quiz is completed';