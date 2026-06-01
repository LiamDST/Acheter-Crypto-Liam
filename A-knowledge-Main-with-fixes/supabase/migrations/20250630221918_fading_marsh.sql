/*
  # Fix user_progress RLS policies

  1. Security Updates
    - Add INSERT policy for authenticated users to create their own progress records
    - Add UPDATE policy for authenticated users to update their own progress records
    - Ensure users can only manage their own progress data

  2. Policy Changes
    - Allow authenticated users to insert progress records where user_id matches their auth.uid()
    - Allow authenticated users to update their own progress records
    - Maintain existing SELECT policy for viewing own progress
*/

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can view their own progress" ON user_progress;
DROP POLICY IF EXISTS "Admin can manage all progress" ON user_progress;

-- Create comprehensive RLS policies for user_progress table
CREATE POLICY "Users can view their own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Admin/service role can manage all progress
CREATE POLICY "Admin can manage all progress"
  ON user_progress
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);