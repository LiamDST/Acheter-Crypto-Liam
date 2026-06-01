/*
  # Create dictionary_terms table

  1. New Tables
    - `dictionary_terms`
      - `id` (uuid, primary key)
      - `term` (text, unique)
      - `definition` (text)
      - `category` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on dictionary_terms table
    - Add policies for:
      - Everyone can read terms
      - Admin can manage terms
*/

-- Create dictionary_terms table
CREATE TABLE IF NOT EXISTS dictionary_terms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  term text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  definition text NOT NULL,
  category text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create updated_at trigger
CREATE TRIGGER update_dictionary_terms_updated_at
  BEFORE UPDATE ON dictionary_terms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE dictionary_terms ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can read dictionary terms"
  ON dictionary_terms
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can manage dictionary terms"
  ON dictionary_terms
  FOR ALL
  TO service_role
  USING (true);

-- Create indexes
CREATE INDEX idx_dictionary_terms_term ON dictionary_terms(term);
CREATE INDEX idx_dictionary_terms_slug ON dictionary_terms(slug);
CREATE INDEX idx_dictionary_terms_category ON dictionary_terms(category);

-- Insert sample data
INSERT INTO dictionary_terms (term, slug, definition, category)
VALUES 
  ('Blockchain', 'blockchain', 'Technologie de stockage et de transmission d''informations, transparente, sécurisée, et fonctionnant sans organe central de contrôle. Par extension, une blockchain constitue une base de données qui contient l''historique de tous les échanges effectués entre ses utilisateurs depuis sa création.', 'Technologie'),
  ('Bitcoin', 'bitcoin', 'Première cryptomonnaie décentralisée créée en 2009 par une personne ou un groupe de personnes sous le pseudonyme de Satoshi Nakamoto. Le Bitcoin utilise la technologie blockchain et fonctionne sans autorité centrale ni intermédiaires.', 'Cryptomonnaie'),
  ('Ethereum', 'ethereum', 'Plateforme décentralisée qui permet aux développeurs de créer et déployer des applications décentralisées (dApps) utilisant la technologie blockchain. Ethereum a introduit le concept de smart contracts et possède sa propre cryptomonnaie appelée Ether (ETH).', 'Cryptomonnaie'),
  ('Smart Contract', 'smart-contract', 'Programme informatique qui s''exécute automatiquement lorsque des conditions prédéfinies sont remplies. Les smart contracts sont stockés sur une blockchain et permettent d''effectuer des transactions traçables, transparentes et irréversibles sans intermédiaire.', 'Technologie'),
  ('DeFi', 'defi', 'Finance Décentralisée (Decentralized Finance). Écosystème d''applications financières basées sur la blockchain qui visent à recréer et améliorer les services financiers traditionnels sans intermédiaires centralisés.', 'Finance'),
  ('NFT', 'nft', 'Token Non Fongible (Non-Fungible Token). Jeton cryptographique sur une blockchain qui représente un actif unique et non interchangeable, souvent utilisé pour l''art numérique, les objets de collection et autres actifs uniques.', 'Technologie'),
  ('Wallet', 'wallet', 'Portefeuille numérique permettant de stocker, envoyer et recevoir des cryptomonnaies. Il peut être sous forme de logiciel (hot wallet) ou de matériel physique (hardware wallet).', 'Sécurité'),
  ('Mining', 'mining', 'Processus par lequel des transactions sont vérifiées et ajoutées à la blockchain. Le minage implique la résolution de problèmes cryptographiques complexes et est récompensé par des cryptomonnaies nouvellement créées.', 'Technologie'),
  ('Staking', 'staking', 'Processus consistant à verrouiller des cryptomonnaies pour participer au fonctionnement d''un réseau blockchain utilisant le mécanisme de consensus Proof of Stake (PoS). Les participants sont récompensés en fonction de la quantité de cryptomonnaies qu''ils mettent en jeu.', 'Finance'),
  ('Altcoin', 'altcoin', 'Terme désignant toutes les cryptomonnaies alternatives au Bitcoin. Les altcoins peuvent avoir des caractéristiques, des cas d''utilisation ou des technologies différentes du Bitcoin.', 'Cryptomonnaie');