/*
  # Create subscriptions table

  1. New Tables
    - `subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `plan_type` (enum: monthly, semester, yearly)
      - `amount` (numeric)
      - `status` (enum: active, cancelled, expired)
      - `start_date` (timestamptz)
      - `end_date` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `stripe_customer_id` (text)
      - `stripe_subscription_id` (text)
      - `auto_renew` (boolean)

  2. Security
    - Enable RLS on subscriptions table
    - Add policies for:
      - Users can read their own subscriptions
      - Admin can read all subscriptions
      - System can create/update subscriptions
*/

-- Create enum types
CREATE TYPE subscription_plan_type AS ENUM ('monthly', 'semester', 'yearly');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired');

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_type subscription_plan_type NOT NULL,
  amount numeric NOT NULL,
  status subscription_status NOT NULL DEFAULT 'active',
  start_date timestamptz NOT NULL DEFAULT now(),
  end_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  stripe_customer_id text,
  stripe_subscription_id text,
  auto_renew boolean DEFAULT false,
  
  -- Add constraint to ensure end_date is after start_date
  CONSTRAINT end_date_after_start_date CHECK (end_date > start_date)
);

-- Create updated_at trigger
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all subscriptions"
  ON subscriptions
  FOR ALL
  TO service_role
  USING (true);

-- Create indexes
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);

-- Create view for active subscriptions
CREATE VIEW active_subscriptions AS
SELECT 
  s.*,
  u.email,
  u.raw_user_meta_data->>'first_name' as first_name,
  u.raw_user_meta_data->>'last_name' as last_name
FROM subscriptions s
JOIN auth.users u ON s.user_id = u.id
WHERE s.status = 'active'
  AND s.end_date > now();

-- Grant access to authenticated users
GRANT SELECT ON active_subscriptions TO authenticated;