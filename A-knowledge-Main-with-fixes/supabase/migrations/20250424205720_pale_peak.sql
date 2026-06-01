/*
  # Create security logs table

  1. New Tables
    - `security_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `event_type` (text)
      - `created_at` (timestamptz)
      - `ip_address` (text, nullable)
      - `user_agent` (text, nullable)
      - `details` (jsonb, nullable)

  2. Security
    - Enable RLS on security_logs table
    - Add policies for:
      - Admin can view all logs
      - System can create logs
*/

-- Create security logs table
CREATE TABLE IF NOT EXISTS security_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text,
  details jsonb,
  
  -- Add constraint to validate event_type
  CONSTRAINT valid_event_type CHECK (
    event_type IN (
      'password_reset_requested',
      'password_reset',
      'login_success',
      'login_failed',
      'account_locked',
      'account_unlocked'
    )
  )
);

-- Enable RLS
ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin can view all security logs"
  ON security_logs
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "System can create security logs"
  ON security_logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_security_logs_user_id ON security_logs(user_id);
CREATE INDEX idx_security_logs_event_type ON security_logs(event_type);
CREATE INDEX idx_security_logs_created_at ON security_logs(created_at);