# Acheter Crypto Pro

Projet Next.js prêt à ouvrir dans VS Code pour une plateforme SaaS crypto premium.

## Ce qui est inclus

- Next.js App Router + TypeScript
- Tailwind CSS
- Framer Motion
- Background animé Bitcoin / Ethereum + chandeliers + trading bars
- Effets 3D CSS pour le hero
- Pages publiques : Accueil, Formations, Signaux, Analyses, Pricing
- Pages détail : Formation, Signal, Analyse
- Dashboard membre
- Admin complet disponible sur `/admin`, absent de la navigation publique et protégé par connexion dédiée
- Structure Supabase et Stripe prête à connecter
- Routes API Stripe : checkout, portail client, webhook
- Schéma SQL Supabase dans `supabase/schema.sql`

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

Puis ouvrir :

```txt
http://localhost:3000
```

## Routes principales

```txt
/                 Accueil avec hero crypto 3D CSS
/formations       Catalogue de formations
/formations/[slug] Détail formation
/signaux          Tableau de signaux trading
/signaux/[id]     Détail signal
/analyses         Analyses crypto
/analyses/[slug]  Détail analyse
/pricing          Abonnements et Stripe checkout
/dashboard        Espace membre
/admin            Back-office complet protégé
/admin/login      Connexion admin
/login            Connexion
/register         Inscription
```

## Admin `/admin`

Le back-office contient :

- Vue globale
- Utilisateurs
- Contenus
- Paiements
- Signaux
- Support
- Sécurité
- Réglages

L’admin n’est pas affiché dans la barre de navigation. Il reste accessible uniquement par URL directe sur `/admin`.

La route `/admin` est protégée par middleware côté serveur avec cookie HTTP-only signé. Sans session valide, l’utilisateur est redirigé vers `/admin/login`.

Exemple local à mettre dans `.env.local` puis à changer avant toute mise en ligne :

```env
ADMIN_EMAIL=admin@acheter-crypto.fr
ADMIN_PASSWORD=admin123
ADMIN_SESSION_SECRET=change-me-local-admin-session-secret
```

En production, utilisez un mot de passe fort et une valeur longue/aléatoire pour `ADMIN_SESSION_SECRET`.

## Variables d’environnement

Copiez `.env.example` vers `.env.local`, puis remplissez :

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRICE_1_MONTH=
STRIPE_PRICE_6_MONTHS=
STRIPE_PRICE_12_MONTHS=
STRIPE_PRICE_SIGNALS_1_MONTH=
STRIPE_PRICE_SIGNALS_6_MONTHS=
STRIPE_PRICE_SIGNALS_12_MONTHS=
STRIPE_PRICE_SIGNALS_OPTION=

RESEND_API_KEY=
OPENAI_API_KEY=
```

Ne mettez jamais `.env.local` sur GitHub.

## Supabase

1. Créez un projet Supabase.
2. Ouvrez SQL Editor.
3. Collez `supabase/schema.sql`.
4. Ajoutez éventuellement `supabase/seed.sql`.
5. Configurez les clés dans `.env.local`.

## Stripe

1. Créez les produits/prix dans Stripe pour les abonnements: 1 mois `19,99 €/mois`, 6 mois `14,99 €/mois`, 12 mois `9,99 €/mois`.
2. Créez les price IDs de l’option Signaux Trading par durée: `+10 €/mois`, `+8 €/mois`, `+5 €/mois`.
3. Copiez les price IDs dans `.env.local`.
4. Gardez `STRIPE_PRICE_SIGNALS_OPTION` comme fallback temporaire si les trois variables dédiées ne sont pas encore renseignées.
5. Lancez le site.
6. La route `/api/stripe/checkout` crée une session Checkout.
7. La route `/api/stripe/webhook` est prête à activer premium après paiement.

## Background crypto

Composants :

```txt
components/backgrounds/AnimatedCryptoBackground.tsx
components/backgrounds/TradingBarsBackground.tsx
components/backgrounds/CryptoHeroScene.tsx
components/backgrounds/MarketTicker.tsx
```

La 3D est volontairement en CSS pour rester légère et facile à déployer. Vous pourrez remplacer `CryptoHeroScene` par React Three Fiber si vous voulez une vraie scène 3D WebGL plus tard.

## Prochaines étapes recommandées

1. Connecter Supabase Auth.
2. Protéger `/dashboard` et `/admin`.
3. Relier les pages aux tables Supabase.
4. Activer Stripe Checkout + Webhook.
5. Ajouter l’envoi email via Resend/Brevo.
6. Ajouter Telegram/Discord pour les alertes signaux.
7. Ajouter un éditeur riche côté admin.
