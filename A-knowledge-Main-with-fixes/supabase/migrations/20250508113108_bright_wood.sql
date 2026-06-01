-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  "order" integer NOT NULL,
  is_free boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create module_content table
CREATE TABLE IF NOT EXISTS module_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id text REFERENCES modules(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  video_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create updated_at triggers
CREATE TRIGGER update_modules_updated_at
  BEFORE UPDATE ON modules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_module_content_updated_at
  BEFORE UPDATE ON module_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_content ENABLE ROW LEVEL SECURITY;

-- Create policies for modules table
CREATE POLICY "Authenticated users can view free modules"
  ON modules
  FOR SELECT
  TO authenticated
  USING (is_free = true);

CREATE POLICY "Users with active subscriptions can view all modules"
  ON modules
  FOR SELECT
  TO authenticated
  USING (
    is_free = true OR 
    EXISTS (
      SELECT 1 FROM subscriptions
      WHERE user_id = auth.uid()
      AND status = 'active'
      AND start_date <= now()
      AND end_date > now()
    )
  );

CREATE POLICY "Service role can manage all modules"
  ON modules
  FOR ALL
  TO service_role
  USING (true);

-- Create policies for module_content table
CREATE POLICY "Authenticated users can view content of free modules"
  ON module_content
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM modules
      WHERE modules.id = module_content.module_id
      AND modules.is_free = true
    )
  );

CREATE POLICY "Users with active subscriptions can view all module content"
  ON module_content
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM modules
      WHERE modules.id = module_content.module_id
      AND (
        modules.is_free = true OR
        EXISTS (
          SELECT 1 FROM subscriptions
          WHERE user_id = auth.uid()
          AND status = 'active'
          AND start_date <= now()
          AND end_date > now()
        )
      )
    )
  );

CREATE POLICY "Service role can manage all module content"
  ON module_content
  FOR ALL
  TO service_role
  USING (true);

-- Create indexes
CREATE INDEX idx_modules_is_free ON modules(is_free);
CREATE INDEX idx_modules_order ON modules("order");
CREATE INDEX idx_module_content_module_id ON module_content(module_id);

-- Insert sample data for module 1 (free)
INSERT INTO modules (id, title, description, "order", is_free)
VALUES ('module-1', 'Les Fondamentaux de la Blockchain', 'Comprendre les bases de la technologie blockchain et son fonctionnement', 1, true);

-- Insert sample data for other modules (premium)
INSERT INTO modules (id, title, description, "order", is_free)
VALUES 
  ('module-2', 'Les Principes de la Décentralisation', 'Comprendre les fondements et les avantages de la décentralisation dans la blockchain', 2, false),
  ('module-3', 'La Cryptographie et la Sécurité', 'Découvrez les mécanismes de sécurité qui protègent la blockchain et vos transactions', 3, false),
  ('module-4', 'Les Différents Types de Blockchain', 'Explorez les différentes architectures blockchain et leurs cas d''utilisation', 4, false),
  ('module-5', 'Bitcoin et son Histoire', 'Découvrez l''origine et l''évolution de la première cryptomonnaie', 5, false);

-- Create a function to check if a user has access to a module
CREATE OR REPLACE FUNCTION public.user_has_module_access(module_id text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_module_free boolean;
  has_active_subscription boolean;
BEGIN
  -- Check if the module is free
  SELECT is_free INTO is_module_free
  FROM modules
  WHERE id = module_id;
  
  -- If module is free, user has access
  IF is_module_free THEN
    RETURN true;
  END IF;
  
  -- Check if user has an active subscription
  SELECT EXISTS (
    SELECT 1
    FROM subscriptions
    WHERE user_id = auth.uid()
    AND status = 'active'
    AND start_date <= now()
    AND end_date > now()
  ) INTO has_active_subscription;
  
  RETURN has_active_subscription;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.user_has_module_access TO authenticated;

-- Add comment
COMMENT ON FUNCTION public.user_has_module_access IS 'Checks if the current user has access to a specific module based on subscription status';