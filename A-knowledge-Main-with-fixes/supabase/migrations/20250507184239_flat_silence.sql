-- Create feedback table if it doesn't exist
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  message text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
DO $$
BEGIN
  -- Check if the insert policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'feedback'
    AND policyname = 'Users can insert feedback'
  ) THEN
    -- Create the insert policy if it doesn't exist
    CREATE POLICY "Users can insert feedback"
      ON feedback
      FOR INSERT
      TO authenticated
      WITH CHECK ((user_id = auth.uid()) OR (user_id IS NULL));
  END IF;

  -- Check if the select policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'feedback'
    AND policyname = 'Admin can view all feedback'
  ) THEN
    -- Create the select policy if it doesn't exist
    CREATE POLICY "Admin can view all feedback"
      ON feedback
      FOR SELECT
      TO service_role
      USING (true);
  END IF;
END
$$;

-- Create indexes if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE schemaname = 'public' 
    AND tablename = 'feedback' 
    AND indexname = 'idx_feedback_user_id'
  ) THEN
    CREATE INDEX idx_feedback_user_id ON feedback(user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE schemaname = 'public' 
    AND tablename = 'feedback' 
    AND indexname = 'idx_feedback_rating'
  ) THEN
    CREATE INDEX idx_feedback_rating ON feedback(rating);
  END IF;
END
$$;

-- Add comment
COMMENT ON TABLE feedback IS 'User feedback and ratings for the platform';