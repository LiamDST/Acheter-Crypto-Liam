insert into public.courses (slug, title, description, level, is_premium, status) values
('bitcoin-ethereum', 'Comprendre Bitcoin et Ethereum', 'Les fondamentaux pour comprendre les actifs majeurs.', 'Débutant', false, 'published'),
('analyse-technique', 'Analyse technique appliquée', 'Tendances, supports, résistances et gestion du risque.', 'Intermédiaire', true, 'published');

insert into public.signals (asset, direction, entry, target, stop, risk, confidence, status, rationale) values
('BTC', 'Long', '66 800 €', '70 900 €', '64 950 €', 'Modéré', 78, 'active', 'Structure constructive au-dessus du support.'),
('ETH', 'Long', '3 180 €', '3 420 €', '3 040 €', 'Faible', 71, 'watching', 'Reprise progressive mais validation technique attendue.');

insert into public.analyses (slug, title, summary, tag, status, is_premium) values
('bitcoin-resistance-majeure', 'Bitcoin : structure haussière sous résistance majeure', 'Le marché conserve une dynamique constructive.', 'BTC', 'published', true),
('ethereum-flux-institutionnels', 'Ethereum : reprise progressive des flux institutionnels', 'Les signaux fondamentaux s’améliorent.', 'ETH', 'published', false);
