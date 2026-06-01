// Configuration centralisée du site Alyah Knowledge
export const siteConfig = {
  organization: {
    name: "Alyah Knowledge",
    legalName: "Alyah Knowledge",
    url: "https://alyah-knowledge.com/",
    logo: "https://zythhpgukkgavtgsudqe.supabase.co/storage/v1/object/public/images-public/alyah-knowledge-formation-crypto-trading.png",
    description: "Apprenez la blockchain, les cryptos et le trading grâce à des ressources claires, fiables et conçues pour tous les niveaux.",
    foundingDate: "2024",
    founderName: "Jordan Chekroun",
    addressCountry: "FR",
    areaServedName: "France",
    knowsAbout: [
      "Cryptomonnaies",
      "Blockchain",
      "Trading",
      "Bitcoin",
      "Ethereum",
      "DeFi",
      "Formation financière"
    ],
    serviceType: [
      "Formation en cryptomonnaies",
      "Signaux de trading",
      "Analyses de marché",
      "Accompagnement personnalisé"
    ],
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/alyah-knowledge/",
    x: "https://x.com/JCrypto83280",
    youtube: "https://www.youtube.com/@AlyahKnowledge",
    instagram: "https://www.instagram.com/alyah.knowledge/",
    threads: "https://www.threads.net/@crypto_strategie_",
    tiktok: "http://www.tiktok.com/@jo_la_crypto",
    telegram: "https://t.me/alyah_knowledge",
  },
  contact: {
    email: "contact@alyah-knowledge.com",
    supportUrl: "https://alyah-knowledge.com/support/",
    availableLanguages: ["fr", "en"],
  },
  seo: {
    twitterHandle: "@AlyahKnowledge",
    defaultImage: "https://alyah-knowledge.com/og-image.jpg",
    favicon: "https://alyah-knowledge.com/favicon.png",
  },
  pages: {
    '/': {
      title: 'Alyah Knowledge – Formation & Trading Crypto',
      description:
        'Apprenez la blockchain, les cryptos et le trading grâce à des ressources claires et fiables.',
      canonical: 'https://alyah-knowledge.com/'
    },
    '/about': {
      title: "À propos d'Alyah Knowledge",
      description:
        "Découvrez la mission d’Alyah Knowledge : rendre la blockchain et le trading accessibles à tous.",
      canonical: 'https://alyah-knowledge.com/about'
    },
    '/faq': {
      title: 'FAQ Alyah Knowledge',
      description:
        'Réponses aux questions fréquentes sur nos services, formations et investissement crypto.',
      canonical: 'https://alyah-knowledge.com/faq'
    },
    '/articles': {
      title: 'Articles Crypto et Blockchain',
      description:
        'Analyses et conseils sur les cryptomonnaies, la blockchain et le trading par Alyah Knowledge.',
      canonical: 'https://alyah-knowledge.com/articles'
    },
    '/knowledge': {
      title: 'Comprendre les Cryptomonnaies',
      description:
        'Ressources éducatives pour maîtriser les cryptomonnaies et suivre le marché en temps réel.',
      canonical: 'https://alyah-knowledge.com/comprendre-les-cryptomonnaies'
    },
    '/dictionary': {
      title: 'Dictionnaire Crypto',
      description:
        'Définitions claires des termes et concepts de la cryptomonnaie et de la blockchain.',
      canonical: 'https://alyah-knowledge.com/dictionnaire-crypto'
    },
    '/solutions': {
      title: 'Solutions Crypto Alyah Knowledge',
      description:
        'Signaux de trading, formations et accompagnement pour investir dans les cryptomonnaies.',
      canonical: 'https://alyah-knowledge.com/solutions'
    },
    '/team': {
      title: 'Équipe Alyah Knowledge | Experts Crypto & Trading',
      description:
        'Rencontrez l\'équipe Alyah Knowledge, des passionnés de blockchain et de trading dédiés à votre réussite financière.',
      canonical: 'https://alyah-knowledge.com/team'
    }
  }
};

// Utilitaire pour obtenir tous les liens sociaux sous forme de tableau
export const getSocialLinksArray = () => {
  return Object.values(siteConfig.socialLinks);
};

// Utilitaire pour obtenir les données de contact
export const getContactInfo = () => {
  return siteConfig.contact;
};

// Utilitaire pour obtenir les informations de l'organisation
export const getOrganizationInfo = () => {
  return siteConfig.organization;
};