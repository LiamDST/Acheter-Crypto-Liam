/*
  # Add INSERT policy for trades table

  1. Security
    - Add policy for authenticated users to insert their own trades
    - Users can only insert trades where user_id matches their auth.uid()

  This fixes the RLS violation error when users try to add new trades on the dashboard.
*/

CREATE POLICY "Users can insert their own trades"
  ON trades
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);