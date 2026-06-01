import { BarChart3, Bell, BookOpen, Brain, Crown, Database, Euro, Gauge, GraduationCap, LineChart, ShieldCheck, Signal, Star, TrendingUp, UserRound, WalletCards } from "lucide-react";

export const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/formations", label: "Formations" },
  { href: "/marche-cryptomonnaies-temps-reel", label: "Marchés" },
  { href: "/signaux", label: "Signaux" },
  { href: "/analyses", label: "Ressources" },
  { href: "/wallet", label: "Portefeuille" },
  { href: "/pricing", label: "Abonnements" }
];

export const chartData = [
  { name: "Jan", value: 42, btc: 40 },
  { name: "Fév", value: 49, btc: 46 },
  { name: "Mar", value: 57, btc: 52 },
  { name: "Avr", value: 55, btc: 56 },
  { name: "Mai", value: 68, btc: 61 },
  { name: "Juin", value: 74, btc: 66 },
  { name: "Juil", value: 81, btc: 72 }
];

export const market = [
  { asset: "BTC", price: "66 800 €", change: "+2,8%", positive: true },
  { asset: "ETH", price: "3 180 €", change: "+1,9%", positive: true },
  { asset: "SOL", price: "154 €", change: "-0,7%", positive: false },
  { asset: "LINK", price: "16,20 €", change: "+4,2%", positive: true },
  { asset: "TOTAL3", price: "684 Md€", change: "+1,1%", positive: true }
];

export const courses = [
  {
    slug: "bitcoin-ethereum",
    title: "Comprendre Bitcoin et Ethereum",
    level: "Débutant",
    category: "Fondamentaux",
    type: "Vidéo",
    progress: 72,
    premium: false,
    lessons: 18,
    duration: "3h20",
    tag: "Fondamentaux",
    description: "Les fondamentaux pour comprendre les actifs majeurs sans jargon inutile.",
    modules: ["Bitcoin", "Ethereum", "Wallets", "Sécurité", "Quiz final"]
  },
  {
    slug: "analyse-technique",
    title: "Analyse technique appliquée",
    level: "Intermédiaire",
    category: "Trading",
    type: "Atelier",
    progress: 38,
    premium: true,
    lessons: 24,
    duration: "5h10",
    tag: "Trading",
    description: "Tendances, supports, résistances, invalidations et gestion du risque.",
    modules: ["Tendance", "Supports", "Volume", "Risk management", "Plan de trade"]
  },
  {
    slug: "strategie-long-terme",
    title: "Construire une stratégie long terme",
    level: "Avancé",
    category: "Investissement",
    type: "Parcours",
    progress: 12,
    premium: true,
    lessons: 16,
    duration: "4h05",
    tag: "Investissement",
    description: "Plan d’investissement, psychologie, allocation et suivi de portefeuille.",
    modules: ["Allocation", "DCA", "Psychologie", "Cycles", "Suivi"]
  },
  {
    slug: "defi-layer-2",
    title: "DeFi, Layer 2 et narratives crypto",
    level: "Avancé",
    category: "Marché",
    type: "Masterclass",
    progress: 0,
    premium: true,
    lessons: 20,
    duration: "4h45",
    tag: "Narratives",
    description: "Identifier les secteurs porteurs sans se laisser piéger par le bruit de marché.",
    modules: ["DeFi", "Layer 2", "Narratives", "Risques", "Portfolio"]
  }
];

export const signals = [
  { id: "btc-long-01", asset: "BTC", direction: "Long", entry: "66 800 €", target: "70 900 €", stop: "64 950 €", risk: "Modéré", status: "Actif", confidence: 78, rr: "2.1", horizon: "Swing", update: "Il y a 12 min", premium: true },
  { id: "eth-long-01", asset: "ETH", direction: "Long", entry: "3 180 €", target: "3 420 €", stop: "3 040 €", risk: "Faible", status: "Surveillance", confidence: 71, rr: "1.7", horizon: "Court terme", update: "Il y a 38 min", premium: true },
  { id: "sol-short-01", asset: "SOL", direction: "Short", entry: "154 €", target: "142 €", stop: "160 €", risk: "Élevé", status: "Clôturé", confidence: 64, rr: "2.0", horizon: "Scalp", update: "Hier", premium: true },
  { id: "link-long-01", asset: "LINK", direction: "Long", entry: "16,20 €", target: "18,10 €", stop: "15,35 €", risk: "Modéré", status: "Actif", confidence: 75, rr: "2.2", horizon: "Swing", update: "Il y a 2 h", premium: false }
];

export const analyses = [
  {
    slug: "bitcoin-resistance-majeure",
    title: "Bitcoin : structure haussière sous résistance majeure",
    tag: "BTC",
    horizon: "Moyen terme",
    confidence: "Élevé",
    premium: true,
    readTime: "7 min",
    summary: "Le marché conserve une dynamique constructive tant que la zone de support reste défendue. La cassure doit être confirmée par volume."
  },
  {
    slug: "ethereum-flux-institutionnels",
    title: "Ethereum : reprise progressive des flux institutionnels",
    tag: "ETH",
    horizon: "Long terme",
    confidence: "Moyen",
    premium: false,
    readTime: "5 min",
    summary: "Les signaux fondamentaux s’améliorent, mais la validation technique reste nécessaire avant d’augmenter l’exposition."
  },
  {
    slug: "altcoins-rotation-sectorielle",
    title: "Altcoins : rotation sectorielle à surveiller",
    tag: "ALT",
    horizon: "Court terme",
    confidence: "Moyen",
    premium: true,
    readTime: "6 min",
    summary: "La rotation pourrait s’intensifier si la dominance Bitcoin ralentit durablement et si les volumes reviennent sur les leaders."
  }
];

export const pricing = [
  { slug: "1-month", name: "1 mois", durationMonths: 1, baseMonthly: 19.99, signalAddOn: 10, price: "19,99 €", monthly: "19,99 €/mois", badge: "Sans engagement", description: "Découvrir la plateforme sans engagement long.", features: ["Formations premium", "Analyses hebdomadaires", "Watchlist", "Dashboard membre"] },
  { slug: "6-months", name: "6 mois", durationMonths: 6, baseMonthly: 14.99, signalAddOn: 8, price: "14,99 €", monthly: "14,99 €/mois", badge: "Populaire", description: "Le meilleur équilibre pour progresser sérieusement.", featured: true, features: ["Tout le plan 1 mois", "Tarif réduit 6 mois", "Accès prioritaire", "Bonus pédagogiques"] },
  { slug: "12-months", name: "12 mois", durationMonths: 12, baseMonthly: 9.99, signalAddOn: 5, price: "9,99 €", monthly: "9,99 €/mois", badge: "Meilleure offre", description: "L’accès complet pour construire une routine durable.", features: ["Tout le plan 6 mois", "Meilleur tarif", "Sessions avancées", "Archives complètes"] }
];

export const adminStats = [
  { label: "Utilisateurs", value: "12 480", icon: UserRound },
  { label: "MRR", value: "48,9 k€", icon: Euro },
  { label: "Conversion", value: "7,8 %", icon: TrendingUp },
  { label: "Tickets ouverts", value: "24", icon: Bell }
];

export const featureCards = [
  { icon: GraduationCap, title: "Learning OS", text: "Parcours crypto guidés, quiz, progression, notes et certificats.", metric: "18 modules", action: "Ouvrir le parcours", tags: ["Débutant", "Quiz", "Roadmap"] },
  { icon: Signal, title: "Signal Center", text: "Signaux avec entrée, objectifs, stop, risque, confiance et historique.", metric: "4 signaux live", action: "Filtrer les signaux", tags: ["BTC", "ETH", "Risk"] },
  { icon: BarChart3, title: "Analytics Studio", text: "Scénarios, niveaux clés, courbes de performance et lecture macro.", metric: "+46% perf.", action: "Comparer les scénarios", tags: ["Bull", "Neutral", "Bear"] },
  { icon: Gauge, title: "Risk Engine", text: "Score risque, sizing, exposition et garde-fous de discipline.", metric: "Score 82/100", action: "Simuler le risque", tags: ["Sizing", "Stop", "Capital"] }
];

export const dashboardStats = [
  { icon: BookOpen, label: "Progression", value: "72%" },
  { icon: Signal, label: "Signaux actifs", value: "8" },
  { icon: Star, label: "Favoris", value: "19" },
  { icon: Crown, label: "Niveau membre", value: "Premium" }
];

export const systemCards = [
  { icon: WalletCards, title: "Portfolio Lab", text: "Allocation, DCA, cash disponible et exposition par actif.", metric: "12 actifs", action: "Tester une allocation" },
  { icon: Database, title: "Data Hub", text: "Données de marché, watchlist, historique et contenus reliés.", metric: "Live-ready", action: "Voir les sources" },
  { icon: ShieldCheck, title: "Secure Access", text: "Accès membre, protection des contenus et sessions serveur.", metric: "HTTP-only", action: "Contrôler les accès" },
  { icon: Brain, title: "Decision Coach", text: "Checklist avant trade, biais émotionnels et routine de décision.", metric: "7 contrôles", action: "Lancer le coach" },
  { icon: LineChart, title: "Performance Desk", text: "Suivi mensuel, drawdown, win rate et évolution du capital.", metric: "+46% YTD", action: "Analyser la courbe" },
  { icon: Crown, title: "Premium Journey", text: "Parcours freemium vers abonnement avec CTA contextuels.", metric: "+18% uplift", action: "Voir le tunnel" }
];
