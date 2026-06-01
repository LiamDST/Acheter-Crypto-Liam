/*
  # Ajout des colonnes pour le contenu anglais

  1. Nouvelles colonnes pour les articles
    - `title_en` (text, nullable) - Titre en anglais
    - `summary_en` (text, nullable) - Résumé en anglais  
    - `content_en` (text, nullable) - Contenu en anglais

  2. Nouvelles colonnes pour les termes du dictionnaire
    - `term_en` (text, nullable) - Terme en anglais
    - `definition_en` (text, nullable) - Définition en anglais

  3. Index pour améliorer les performances
    - Index sur title_en pour les recherches
    - Index sur term_en pour les recherches

  Ces colonnes permettront de stocker le contenu en anglais tout en gardant
  le contenu français existant intact. Le contenu anglais est optionnel.
*/

-- Ajouter les colonnes anglaises à la table articles
DO $$
BEGIN
  -- Ajouter title_en si elle n'existe pas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'articles' AND column_name = 'title_en'
  ) THEN
    ALTER TABLE articles ADD COLUMN title_en TEXT;
  END IF;

  -- Ajouter summary_en si elle n'existe pas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'articles' AND column_name = 'summary_en'
  ) THEN
    ALTER TABLE articles ADD COLUMN summary_en TEXT;
  END IF;

  -- Ajouter content_en si elle n'existe pas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'articles' AND column_name = 'content_en'
  ) THEN
    ALTER TABLE articles ADD COLUMN content_en TEXT;
  END IF;
END $$;

-- Ajouter les colonnes anglaises à la table dictionary_terms
DO $$
BEGIN
  -- Ajouter term_en si elle n'existe pas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'dictionary_terms' AND column_name = 'term_en'
  ) THEN
    ALTER TABLE dictionary_terms ADD COLUMN term_en TEXT;
  END IF;

  -- Ajouter definition_en si elle n'existe pas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'dictionary_terms' AND column_name = 'definition_en'
  ) THEN
    ALTER TABLE dictionary_terms ADD COLUMN definition_en TEXT;
  END IF;
END $$;

-- Créer des index pour améliorer les performances de recherche
CREATE INDEX IF NOT EXISTS idx_articles_title_en ON articles(title_en) WHERE title_en IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_articles_content_en ON articles USING gin(to_tsvector('english', content_en)) WHERE content_en IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_dictionary_terms_term_en ON dictionary_terms(term_en) WHERE term_en IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_dictionary_terms_definition_en ON dictionary_terms USING gin(to_tsvector('english', definition_en)) WHERE definition_en IS NOT NULL;

-- Ajouter des commentaires pour documenter les nouvelles colonnes
COMMENT ON COLUMN articles.title_en IS 'Titre de l''article en anglais pour le SEO multilingue';
COMMENT ON COLUMN articles.summary_en IS 'Résumé de l''article en anglais pour le SEO multilingue';
COMMENT ON COLUMN articles.content_en IS 'Contenu complet de l''article en anglais pour le SEO multilingue';
COMMENT ON COLUMN dictionary_terms.term_en IS 'Terme en anglais pour le dictionnaire multilingue';
COMMENT ON COLUMN dictionary_terms.definition_en IS 'Définition en anglais pour le dictionnaire multilingue';