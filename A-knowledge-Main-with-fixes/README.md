# Alyah Knowledge

Plateforme de formation aux cryptomonnaies et au trading, construite avec React, TypeScript, et Supabase.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- npm 9+

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 🧪 Tests

### Lancer les tests
```bash
npm test
```

### Tests avec interface
```bash
npm run test:ui
```

### Tests avec couverture
```bash
npm run test:coverage
```

## 📦 Scripts disponibles

- `dev` - Démarrer le serveur de développement
- `build` - Build de production
- `lint` - Linter le code
- `test` - Lancer les tests en mode watch
- `test:ui` - Tests avec interface graphique
- `test:coverage` - Tests avec rapport de couverture
- `generate-sitemap` - Générer le sitemap principal
- `generate-dictionary-sitemap` - Générer le sitemap du dictionnaire

## 🏗️ Architecture

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le build
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **React Router** pour la navigation

### Backend
- **Supabase** (Authentication, Database, Edge Functions)
- **Stripe** pour les paiements
- **EmailJS** pour les emails

### Tests
- **Vitest** pour les tests
- **Testing Library** pour les tests de composants
- **jsdom** pour l'environnement DOM

## 🔐 Sécurité

Le projet implémente les bonnes pratiques de sécurité :
- Headers de sécurité via Netlify
- Validation côté client et serveur
- Protection CSRF avec Supabase
- Gestion sécurisée des tokens

## 📁 Structure du projet

```
src/
├── components/     # Composants réutilisables
├── pages/         # Pages de l'application
├── lib/           # Utilitaires et configuration
├── types/         # Types TypeScript
├── test/          # Configuration des tests
└── scripts/       # Scripts de génération

supabase/
├── functions/     # Edge Functions
└── migrations/    # Migrations de base de données
```

## 🌐 Déploiement

L'application est déployée sur **Netlify** avec :
- Build automatique depuis Git
- Headers de sécurité configurés
- Redirections SPA
- Variables d'environnement sécurisées

## 📊 Fonctionnalités

### Formation
- 20 modules de formation crypto
- Quiz interactifs
- Suivi de progression
- Certificat de réussite

### Authentification
- Login/signup par email
- OAuth Google
- Vérification email
- Reset de mot de passe

### Paiements
- Intégration Stripe
- Abonnements récurrents
- Support PayPal
- Webhooks sécurisés

### Contenu
- Articles de blog
- Dictionnaire crypto (800+ termes)
- Marché temps réel
- Signaux de trading

## 🔧 Variables d'environnement

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template
VITE_EMAILJS_SIGNUP_PUBLIC_KEY=your_emailjs_key
```

## 📈 Performance

- Lazy loading des pages
- Code splitting automatique
- Images optimisées
- Cache configuré

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commiter les changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

Assurez-vous que les tests passent :
```bash
npm test
```

## 📄 Licence

Ce projet est privé et propriétaire d'Alyah Knowledge.