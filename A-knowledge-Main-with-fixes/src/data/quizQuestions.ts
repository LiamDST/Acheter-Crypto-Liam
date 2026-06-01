// Quiz questions for all modules of blockchain formation

// MODULE 1: Les Fondamentaux de la Blockchain
export const module1Questions = [
  {
    text: "Quelle est la principale caractéristique de la blockchain qui la différencie des bases de données traditionnelles ?",
    options: [
      "Elle est centralisée et contrôlée par une entité unique",
      "Elle est décentralisée et immuable",
      "Elle nécessite un serveur pour stocker les transactions",
      "Elle ne peut enregistrer que des transactions financières"
    ],
    correctAnswer: 1,
    explanation: "La blockchain est un registre distribué où les transactions sont immuables et validées par un réseau décentralisé."
  },
  {
    text: "Quel est le rôle du mécanisme de consensus dans la blockchain ?",
    options: [
      "Assurer que toutes les transactions soient validées de manière sécurisée",
      "Augmenter la vitesse des transactions sans vérification",
      "Permettre uniquement aux banques de valider les transactions",
      "Effacer les transactions en cas d'erreur"
    ],
    correctAnswer: 0,
    explanation: "Le consensus permet de garantir la sécurité et la validité des transactions sans autorité centrale."
  },
  {
    text: "Quelle affirmation est correcte concernant la relation entre la blockchain et le Bitcoin ?",
    options: [
      "Le Bitcoin est une technologie qui a permis de créer la blockchain",
      "La blockchain est un protocole utilisé exclusivement par le Bitcoin",
      "Le Bitcoin est une application utilisant la technologie blockchain",
      "La blockchain ne peut être utilisée que pour des paiements numériques"
    ],
    correctAnswer: 2,
    explanation: "La blockchain est la technologie sous-jacente qui permet à Bitcoin et de nombreuses autres applications d'exister."
  }
];

// MODULE 2: Les Principes de la Décentralisation
export const module2Questions = [
  {
    text: "Quel est l'avantage principal de la décentralisation dans la blockchain ?",
    options: [
      "Réduction des coûts de transaction uniquement",
      "Élimination du besoin d'internet",
      "Suppression des points de défaillance uniques",
      "Accélération automatique des transactions"
    ],
    correctAnswer: 2,
    explanation: "La décentralisation élimine les points de défaillance uniques en distribuant le contrôle sur plusieurs nœuds."
  },
  {
    text: "Qu'est-ce qu'un nœud dans un réseau blockchain ?",
    options: [
      "Un serveur central qui contrôle toutes les transactions",
      "Un ordinateur qui maintient une copie de la blockchain",
      "Un algorithme de chiffrement",
      "Une transaction individuelle"
    ],
    correctAnswer: 1,
    explanation: "Un nœud est un ordinateur participant au réseau qui maintient une copie de la blockchain et valide les transactions."
  },
  {
    text: "Comment la décentralisation affecte-t-elle la confiance dans le système ?",
    options: [
      "Elle nécessite plus de confiance envers les autorités",
      "Elle élimine complètement le besoin de confiance",
      "Elle remplace la confiance en des tiers par la confiance en des algorithmes",
      "Elle n'a aucun impact sur la confiance"
    ],
    correctAnswer: 2,
    explanation: "La décentralisation remplace la confiance en des institutions centrales par la confiance en des protocoles cryptographiques et des algorithmes de consensus."
  }
];

// MODULE 3: La Cryptographie et la Sécurité
export const module3Questions = [
  {
    text: "Quel rôle joue la fonction de hachage dans la blockchain ?",
    options: [
      "Créer des mots de passe pour les utilisateurs",
      "Générer une empreinte unique pour chaque bloc",
      "Chiffrer les transactions pour les rendre illisibles",
      "Créer de nouveaux bitcoins"
    ],
    correctAnswer: 1,
    explanation: "Les fonctions de hachage créent une empreinte numérique unique pour chaque bloc, garantissant l'intégrité de la chaîne."
  },
  {
    text: "Qu'est-ce que la cryptographie asymétrique dans le contexte blockchain ?",
    options: [
      "Un système utilisant une seule clé pour chiffrer et déchiffrer",
      "Un système utilisant une paire de clés : publique et privée",
      "Un système qui ne nécessite aucune clé",
      "Un système réservé aux mineurs"
    ],
    correctAnswer: 1,
    explanation: "La cryptographie asymétrique utilise une paire de clés : la clé publique pour recevoir des fonds et la clé privée pour les dépenser."
  },
  {
    text: "Pourquoi est-il crucial de garder sa clé privée secrète ?",
    options: [
      "Pour accélérer les transactions",
      "Pour réduire les frais de transaction",
      "Pour maintenir le contrôle exclusif sur ses cryptomonnaies",
      "Pour améliorer la vitesse du réseau"
    ],
    correctAnswer: 2,
    explanation: "La clé privée donne un contrôle total sur les fonds associés. Quiconque la possède peut dépenser les cryptomonnaies."
  }
];

// MODULE 4: Les Différents Types de Blockchain
export const module4Questions = [
  {
    text: "Quelle est la principale différence entre une blockchain publique et privée ?",
    options: [
      "La blockchain publique est plus rapide",
      "La blockchain publique est accessible à tous, la privée est restreinte",
      "La blockchain privée utilise plus d'énergie",
      "Il n'y a aucune différence technique"
    ],
    correctAnswer: 1,
    explanation: "Les blockchains publiques sont ouvertes à tous, tandis que les privées restreignent l'accès à certains participants autorisés."
  },
  {
    text: "Qu'est-ce qu'une blockchain hybride ?",
    options: [
      "Une blockchain qui utilise deux cryptomonnaies",
      "Une combinaison d'éléments publics et privés",
      "Une blockchain qui fonctionne uniquement hors ligne",
      "Une blockchain sans mécanisme de consensus"
    ],
    correctAnswer: 1,
    explanation: "Une blockchain hybride combine des caractéristiques des blockchains publiques et privées selon les besoins."
  },
  {
    text: "Quel type de blockchain convient le mieux aux entreprises pour des applications internes ?",
    options: [
      "Blockchain publique",
      "Blockchain privée ou consortium",
      "Blockchain hybride uniquement",
      "Aucune blockchain n'est adaptée"
    ],
    correctAnswer: 1,
    explanation: "Les blockchains privées ou de consortium offrent plus de contrôle et de confidentialité pour les applications d'entreprise."
  }
];

// MODULE 5: Bitcoin et son Histoire
export const module5Questions = [
  {
    text: "Qui est considéré comme le créateur de Bitcoin ?",
    options: [
      "Vitalik Buterin",
      "Satoshi Nakamoto",
      "Charlie Lee",
      "Gavin Andresen"
    ],
    correctAnswer: 1,
    explanation: "Satoshi Nakamoto est le pseudonyme utilisé par le créateur ou groupe de créateurs de Bitcoin."
  },
  {
    text: "En quelle année le premier bloc Bitcoin (bloc Genesis) a-t-il été miné ?",
    options: [
      "2008",
      "2009",
      "2010",
      "2011"
    ],
    correctAnswer: 1,
    explanation: "Le bloc Genesis de Bitcoin a été miné le 3 janvier 2009, marquant le début du réseau Bitcoin."
  },
  {
    text: "Quel était l'objectif principal de Bitcoin selon le livre blanc original ?",
    options: [
      "Remplacer complètement les banques",
      "Créer un système de paiement électronique peer-to-peer",
      "Permettre le trading haute fréquence",
      "Faciliter les contrats intelligents"
    ],
    correctAnswer: 1,
    explanation: "Le livre blanc de Bitcoin décrit un système de paiement électronique peer-to-peer sans intermédiaire de confiance."
  }
];

// MODULE 6: Ethereum et les Smart Contracts
export const module6Questions = [
  {
    text: "Quelle est la principale innovation d'Ethereum par rapport à Bitcoin ?",
    options: [
      "Des transactions plus rapides",
      "Les contrats intelligents (smart contracts)",
      "Des frais plus bas",
      "Une meilleure sécurité"
    ],
    correctAnswer: 1,
    explanation: "Ethereum a introduit les smart contracts, permettant d'exécuter du code programmable sur la blockchain."
  },
  {
    text: "Qu'est-ce que l'EVM (Ethereum Virtual Machine) ?",
    options: [
      "Un portefeuille Ethereum",
      "L'environnement d'exécution des smart contracts",
      "Un type de cryptomonnaie",
      "Un algorithme de minage"
    ],
    correctAnswer: 1,
    explanation: "L'EVM est la machine virtuelle qui exécute les smart contracts sur le réseau Ethereum."
  },
  {
    text: "Qu'est-ce que le 'gas' dans Ethereum ?",
    options: [
      "Un type de token",
      "L'unité de mesure du coût de calcul",
      "Un algorithme de consensus",
      "Un portefeuille spécialisé"
    ],
    correctAnswer: 1,
    explanation: "Le gas mesure la quantité de travail computationnel nécessaire pour exécuter des opérations sur Ethereum."
  }
];

// MODULE 7: Les Différents Types de Tokens
export const module7Questions = [
  {
    text: "Quelle est la différence entre un coin et un token ?",
    options: [
      "Il n'y a aucune différence",
      "Un coin a sa propre blockchain, un token utilise une blockchain existante",
      "Un token est toujours plus cher qu'un coin",
      "Un coin ne peut pas être échangé"
    ],
    correctAnswer: 1,
    explanation: "Les coins ont leur propre blockchain (Bitcoin, Ethereum), tandis que les tokens sont construits sur des blockchains existantes."
  },
  {
    text: "Qu'est-ce qu'un token utilitaire ?",
    options: [
      "Un token qui donne droit à des dividendes",
      "Un token qui représente un actif physique",
      "Un token qui donne accès à un produit ou service",
      "Un token sans utilité particulière"
    ],
    correctAnswer: 2,
    explanation: "Les tokens utilitaires donnent accès à des produits ou services spécifiques au sein d'un écosystème."
  },
  {
    text: "Que représente un token non fongible (NFT) ?",
    options: [
      "Un actif numérique unique et non interchangeable",
      "Une cryptomonnaie comme Bitcoin",
      "Un token divisible en parties égales",
      "Un contrat d'assurance"
    ],
    correctAnswer: 0,
    explanation: "Les NFT représentent des actifs numériques uniques qui ne peuvent pas être remplacés par un autre identique."
  }
];

// MODULE 8: Sécurité des Wallets
export const module8Questions = [
  {
    text: "Quelle est la différence principale entre un wallet chaud et un wallet froid ?",
    options: [
      "La température de fonctionnement",
      "La connexion à internet",
      "Le type de cryptomonnaie supporté",
      "La vitesse de transaction"
    ],
    correctAnswer: 1,
    explanation: "Les wallets chauds sont connectés à internet, les wallets froids sont hors ligne pour plus de sécurité."
  },
  {
    text: "Qu'est-ce qu'une phrase de récupération (seed phrase) ?",
    options: [
      "Le mot de passe du wallet",
      "Une série de mots permettant de restaurer un wallet",
      "L'adresse publique du wallet",
      "Le nom d'utilisateur du wallet"
    ],
    correctAnswer: 1,
    explanation: "La seed phrase est une série de mots (généralement 12 ou 24) qui permet de restaurer complètement un wallet."
  },
  {
    text: "Quel type de wallet offre la meilleure sécurité pour le stockage long terme ?",
    options: [
      "Wallet en ligne",
      "Application mobile",
      "Hardware wallet (portefeuille physique)",
      "Portefeuille d'exchange"
    ],
    correctAnswer: 2,
    explanation: "Les hardware wallets offrent la meilleure sécurité car ils gardent les clés privées hors ligne."
  }
];

// MODULE 9: Les Indicateurs Techniques
export const module9Questions = [
  {
    text: "Qu'est-ce que la moyenne mobile simple (SMA) ?",
    options: [
      "Le prix moyen sur une période donnée",
      "Le volume moyen des transactions",
      "La volatilité moyenne du marché",
      "Le nombre moyen de traders"
    ],
    correctAnswer: 0,
    explanation: "La SMA calcule la moyenne arithmétique des prix de clôture sur une période déterminée."
  },
  {
    text: "Que mesure l'indicateur RSI (Relative Strength Index) ?",
    options: [
      "La force relative d'une cryptomonnaie par rapport à Bitcoin",
      "La vitesse et l'ampleur des changements de prix",
      "Le volume des transactions",
      "La capitalisation boursière"
    ],
    correctAnswer: 1,
    explanation: "Le RSI mesure la vitesse et l'ampleur des changements de prix pour identifier les conditions de surachat ou survente."
  },
  {
    text: "Que signifie un RSI supérieur à 70 ?",
    options: [
      "L'actif est sous-évalué",
      "L'actif est en situation de survente",
      "L'actif est potentiellement en situation de surachat",
      "L'actif va certainement monter"
    ],
    correctAnswer: 2,
    explanation: "Un RSI > 70 suggère généralement une situation de surachat, indiquant une possible correction à la baisse."
  }
];

// MODULE 10: L'Analyse des Graphiques
export const module10Questions = [
  {
    text: "Qu'est-ce qu'un chandelier japonais (candlestick) ?",
    options: [
      "Un type de wallet",
      "Une représentation graphique des prix (ouverture, fermeture, haut, bas)",
      "Un indicateur technique",
      "Une stratégie de trading"
    ],
    correctAnswer: 1,
    explanation: "Un chandelier japonais affiche l'ouverture, la fermeture, le plus haut et le plus bas d'une période donnée."
  },
  {
    text: "Que représente une bougie verte/blanche dans un graphique ?",
    options: [
      "Le prix de clôture est inférieur au prix d'ouverture",
      "Le prix de clôture est supérieur au prix d'ouverture",
      "Le volume est en hausse",
      "Il n'y a eu aucune transaction"
    ],
    correctAnswer: 1,
    explanation: "Une bougie verte/blanche indique que le prix de clôture est supérieur au prix d'ouverture (hausse)."
  },
  {
    text: "Qu'est-ce qu'un niveau de support ?",
    options: [
      "Un niveau où le prix a tendance à rebondir vers le haut",
      "Un niveau où le prix a tendance à chuter",
      "Le prix moyen sur 24h",
      "Le volume minimum de transaction"
    ],
    correctAnswer: 0,
    explanation: "Un support est un niveau de prix où la demande est suffisamment forte pour empêcher une baisse supplémentaire."
  }
];

// MODULE 11: Les Patterns de Trading
export const module11Questions = [
  {
    text: "Qu'est-ce qu'un pattern 'Tête et Épaules' ?",
    options: [
      "Un pattern de continuation haussier",
      "Un pattern de retournement baissier",
      "Un indicateur de volume",
      "Une stratégie de DCA"
    ],
    correctAnswer: 1,
    explanation: "Le pattern tête et épaules est généralement un signal de retournement baissier après une tendance haussière."
  },
  {
    text: "Que signifie un pattern de 'Double Bottom' ?",
    options: [
      "Signal de retournement haussier potentiel",
      "Signal de continuation baissière",
      "Indication de volatilité élevée",
      "Pattern de consolidation"
    ],
    correctAnswer: 0,
    explanation: "Un double bottom suggère généralement une fin de tendance baissière et un possible retournement haussier."
  },
  {
    text: "Qu'est-ce qu'un triangle ascendant ?",
    options: [
      "Un pattern généralement haussier avec résistance horizontale et support ascendant",
      "Un pattern toujours baissier",
      "Un indicateur de volume",
      "Une stratégie de diversification"
    ],
    correctAnswer: 0,
    explanation: "Le triangle ascendant combine une résistance horizontale avec des creux de plus en plus hauts, suggérant une pression acheteuse."
  }
];

// MODULE 12: La Gestion du Risque
export const module12Questions = [
  {
    text: "Qu'est-ce que la règle des 2% en gestion du risque ?",
    options: [
      "Investir seulement 2% de ses revenus",
      "Ne jamais risquer plus de 2% de son capital par trade",
      "Prendre des profits à 2% de gain",
      "Trader seulement 2% du temps"
    ],
    correctAnswer: 1,
    explanation: "La règle des 2% stipule de ne jamais risquer plus de 2% de son capital total sur un seul trade."
  },
  {
    text: "Qu'est-ce qu'un stop-loss ?",
    options: [
      "Un ordre pour prendre des profits",
      "Un ordre pour limiter les pertes",
      "Une stratégie d'achat",
      "Un indicateur technique"
    ],
    correctAnswer: 1,
    explanation: "Un stop-loss est un ordre de vente automatique qui se déclenche quand le prix atteint un niveau prédéfini pour limiter les pertes."
  },
  {
    text: "Pourquoi la diversification est-elle importante ?",
    options: [
      "Pour augmenter les profits",
      "Pour réduire le risque global du portefeuille",
      "Pour simplifier la gestion",
      "Pour éviter les taxes"
    ],
    correctAnswer: 1,
    explanation: "La diversification répartit le risque sur plusieurs actifs, réduisant l'impact d'une mauvaise performance d'un seul actif."
  }
];

// MODULE 13: Les Protocoles DeFi
export const module13Questions = [
  {
    text: "Que signifie DeFi ?",
    options: [
      "Decentralized Finance (Finance Décentralisée)",
      "Digital Finance",
      "Direct Finance",
      "Default Finance"
    ],
    correctAnswer: 0,
    explanation: "DeFi signifie 'Decentralized Finance', désignant les services financiers construits sur blockchain sans intermédiaires centralisés."
  },
  {
    text: "Qu'est-ce qu'un AMM (Automated Market Maker) ?",
    options: [
      "Un trader automatique",
      "Un protocole permettant l'échange automatique de tokens via des pools de liquidité",
      "Un algorithme de minage",
      "Un type de wallet"
    ],
    correctAnswer: 1,
    explanation: "Un AMM utilise des algorithmes et des pools de liquidité pour permettre l'échange de tokens sans carnet d'ordres traditionnel."
  },
  {
    text: "Qu'est-ce que l'impermanent loss ?",
    options: [
      "La perte définitive de tokens",
      "La différence de valeur entre détenir des tokens et les mettre dans un pool de liquidité",
      "Les frais de transaction",
      "La volatilité du marché"
    ],
    correctAnswer: 1,
    explanation: "L'impermanent loss est la perte temporaire subie par les fournisseurs de liquidité due aux variations de prix des actifs dans le pool."
  }
];

// MODULE 14: Le Yield Farming
export const module14Questions = [
  {
    text: "Qu'est-ce que le yield farming ?",
    options: [
      "L'agriculture de cryptomonnaies",
      "La stratégie de maximiser les rendements en prêtant ou stakant des cryptos",
      "L'achat et vente rapide de tokens",
      "La création de nouveaux tokens"
    ],
    correctAnswer: 1,
    explanation: "Le yield farming consiste à optimiser les rendements en déployant des cryptomonnaies dans différents protocoles DeFi."
  },
  {
    text: "Qu'est-ce que l'APY dans le contexte DeFi ?",
    options: [
      "Annual Percentage Yield (Rendement Annuel en Pourcentage)",
      "Average Price Yearly",
      "Automated Protocol Yield",
      "Asset Protection Yield"
    ],
    correctAnswer: 0,
    explanation: "L'APY indique le rendement annuel d'un investissement en tenant compte de la composition des intérêts."
  },
  {
    text: "Quel est le principal risque du yield farming ?",
    options: [
      "Les frais de transaction élevés",
      "Les risques de smart contracts et d'impermanent loss",
      "La lenteur des transactions",
      "L'absence de régulation"
    ],
    correctAnswer: 1,
    explanation: "Les principaux risques incluent les bugs de smart contracts, l'impermanent loss et les risques de plateforme."
  }
];

// MODULE 15: Les Pools de Liquidité
export const module15Questions = [
  {
    text: "Qu'est-ce qu'un pool de liquidité ?",
    options: [
      "Un portefeuille de cryptomonnaies",
      "Une réserve de tokens permettant les échanges décentralisés",
      "Un groupe de mineurs",
      "Un type de smart contract pour le staking"
    ],
    correctAnswer: 1,
    explanation: "Un pool de liquidité est une réserve de tokens verrouillés dans un smart contract pour faciliter les échanges décentralisés."
  },
  {
    text: "Comment les fournisseurs de liquidité sont-ils rémunérés ?",
    options: [
      "Par des frais de transaction et parfois des tokens de gouvernance",
      "Uniquement par l'appréciation du prix des tokens",
      "Par des intérêts fixes",
      "Ils ne sont pas rémunérés"
    ],
    correctAnswer: 0,
    explanation: "Les LP reçoivent une part des frais de trading et parfois des récompenses additionnelles en tokens du protocole."
  },
  {
    text: "Qu'est-ce qu'un LP token ?",
    options: [
      "Un token de gouvernance",
      "Un token représentant la part d'un utilisateur dans un pool de liquidité",
      "Un token stable",
      "Un token de récompense"
    ],
    correctAnswer: 1,
    explanation: "Les LP tokens représentent la propriété proportionnelle d'un utilisateur dans un pool de liquidité spécifique."
  }
];

// MODULE 16: Les Stablecoins
export const module16Questions = [
  {
    text: "Qu'est-ce qu'un stablecoin ?",
    options: [
      "Une cryptomonnaie conçue pour maintenir une valeur stable",
      "Une cryptomonnaie très volatile",
      "Un token de gouvernance",
      "Une cryptomonnaie minée par preuve de travail"
    ],
    correctAnswer: 0,
    explanation: "Les stablecoins sont des cryptomonnaies conçues pour maintenir une valeur stable, souvent indexées sur des devises fiat."
  },
  {
    text: "Quels sont les différents types de stablecoins ?",
    options: [
      "Uniquement adossés à des devises fiat",
      "Fiat-collateralized, crypto-collateralized, et algorithmiques",
      "Seulement algorithmiques",
      "Uniquement adossés à l'or"
    ],
    correctAnswer: 1,
    explanation: "Il existe trois types principaux : adossés au fiat, adossés aux cryptos, et les stablecoins algorithmiques."
  },
  {
    text: "Quel est l'avantage principal des stablecoins en DeFi ?",
    options: [
      "Ils génèrent plus de profits",
      "Ils offrent une stabilité de valeur pour les stratégies DeFi",
      "Ils sont exempts de frais",
      "Ils sont plus rapides à transférer"
    ],
    correctAnswer: 1,
    explanation: "Les stablecoins permettent de participer à la DeFi sans s'exposer à la volatilité des autres cryptomonnaies."
  }
];

// MODULE 17: Sécurisation des Wallets
export const module17Questions = [
  {
    text: "Quelle est la meilleure pratique pour sécuriser sa seed phrase ?",
    options: [
      "La stocker dans un fichier texte sur l'ordinateur",
      "La noter sur papier et la conserver en lieu sûr, hors ligne",
      "La partager avec un proche de confiance",
      "La stocker dans le cloud"
    ],
    correctAnswer: 1,
    explanation: "La seed phrase doit être notée sur support physique et conservée hors ligne, jamais sur des appareils connectés."
  },
  {
    text: "Qu'est-ce que l'authentification à deux facteurs (2FA) ?",
    options: [
      "Un système utilisant deux mots de passe",
      "Une méthode ajoutant une couche de sécurité supplémentaire",
      "Un type de cryptage",
      "Une fonction de backup automatique"
    ],
    correctAnswer: 1,
    explanation: "La 2FA ajoute une couche de sécurité en nécessitant deux méthodes d'authentification différentes."
  },
  {
    text: "Pourquoi éviter de laisser ses cryptos sur un exchange ?",
    options: [
      "Les frais sont plus élevés",
      "Les transactions sont plus lentes",
      "On ne contrôle pas ses clés privées",
      "C'est illégal"
    ],
    correctAnswer: 2,
    explanation: "Sur un exchange, vous ne possédez pas vos clés privées. En cas de problème avec l'exchange, vous pourriez perdre vos fonds."
  }
];

// MODULE 18: Les Arnaques en Crypto
export const module18Questions = [
  {
    text: "Qu'est-ce qu'un rug pull ?",
    options: [
      "Une technique de trading",
      "Quand les développeurs abandonnent soudainement un projet avec les fonds",
      "Un type de wallet",
      "Une stratégie DeFi"
    ],
    correctAnswer: 1,
    explanation: "Un rug pull survient quand les créateurs d'un projet crypto disparaissent avec les fonds des investisseurs."
  },
  {
    text: "Comment identifier un potentiel schéma de Ponzi crypto ?",
    options: [
      "Promesses de rendements très élevés et garantis",
      "Technologie blockchain innovante",
      "Équipe de développement expérimentée",
      "Partenariats avec de grandes entreprises"
    ],
    correctAnswer: 0,
    explanation: "Les schémas de Ponzi promettent souvent des rendements irréalistes et garantis sans risque apparent."
  },
  {
    text: "Qu'est-ce que le phishing dans le contexte crypto ?",
    options: [
      "Une technique de minage",
      "Des tentatives frauduleuses d'obtenir vos clés privées ou mots de passe",
      "Un type de token",
      "Une stratégie de trading"
    ],
    correctAnswer: 1,
    explanation: "Le phishing consiste à tromper les utilisateurs pour qu'ils révèlent leurs informations sensibles comme les clés privées."
  }
];

// MODULE 19: Gestion de Portfolio
export const module19Questions = [
  {
    text: "Qu'est-ce que la stratégie DCA (Dollar Cost Averaging) ?",
    options: [
      "Acheter tout en une fois au plus bas",
      "Investir une somme fixe régulièrement indépendamment du prix",
      "Vendre quand le prix monte",
      "Trader activement pour maximiser les profits"
    ],
    correctAnswer: 1,
    explanation: "Le DCA consiste à investir un montant fixe à intervalles réguliers, lissant l'impact de la volatilité sur le long terme."
  },
  {
    text: "Qu'est-ce que le rebalancing de portfolio ?",
    options: [
      "Vendre tous ses actifs",
      "Ajuster les proportions des actifs pour maintenir l'allocation cible",
      "Acheter uniquement de nouveaux actifs",
      "Ignorer les changements de prix"
    ],
    correctAnswer: 1,
    explanation: "Le rebalancing consiste à réajuster les proportions des actifs dans le portfolio pour maintenir l'allocation souhaitée."
  },
  {
    text: "Quelle est une bonne pratique pour la répartition d'un portfolio crypto ?",
    options: [
      "Investir tout dans Bitcoin",
      "Diversifier entre différentes cryptos et classes d'actifs",
      "Se concentrer uniquement sur les altcoins",
      "Changer complètement d'allocation chaque semaine"
    ],
    correctAnswer: 1,
    explanation: "La diversification réduit le risque en répartissant les investissements sur différents actifs et secteurs."
  }
];

// MODULE 20: Stratégies Avancées de Trading
export const module20Questions = [
  {
    text: "Qu'est-ce que le trading sur marge ?",
    options: [
      "Trader uniquement avec son propre capital",
      "Emprunter des fonds pour augmenter sa position de trading",
      "Trader uniquement des stablecoins",
      "Une stratégie de long terme"
    ],
    correctAnswer: 1,
    explanation: "Le trading sur marge permet d'emprunter des fonds pour augmenter la taille de ses positions, amplifiant les gains et les pertes."
  },
  {
    text: "Qu'est-ce que l'effet de levier 10x ?",
    options: [
      "Gagner 10 fois plus d'argent",
      "Multiplier sa position par 10 avec du capital emprunté",
      "Trader 10 cryptomonnaies différentes",
      "Attendre 10 jours avant de vendre"
    ],
    correctAnswer: 1,
    explanation: "Un levier 10x signifie que pour 1€ de capital, vous pouvez prendre une position de 10€, multipliant gains et pertes par 10."
  },
  {
    text: "Qu'est-ce que le scalping en trading ?",
    options: [
      "Une stratégie de trading à très court terme pour de petits profits fréquents",
      "Acheter et garder pendant des années",
      "Trader uniquement les week-ends",
      "Une technique d'analyse fondamentale"
    ],
    correctAnswer: 0,
    explanation: "Le scalping consiste à effectuer de nombreux trades rapides pour capturer de petits mouvements de prix."
  }
];

// Fonction utilitaire pour récupérer les questions d'un module
export const getQuestionsByModule = (moduleId: string) => {
  const moduleMap: Record<string, any[]> = {
    'module-1': module1Questions,
    'module-2': module2Questions,
    'module-3': module3Questions,
    'module-4': module4Questions,
    'module-5': module5Questions,
    'module-6': module6Questions,
    'module-7': module7Questions,
    'module-8': module8Questions,
    'module-9': module9Questions,
    'module-10': module10Questions,
    'module-11': module11Questions,
    'module-12': module12Questions,
    'module-13': module13Questions,
    'module-14': module14Questions,
    'module-15': module15Questions,
    'module-16': module16Questions,
    'module-17': module17Questions,
    'module-18': module18Questions,
    'module-19': module19Questions,
    'module-20': module20Questions
  };
  
  return moduleMap[moduleId] || [];
};

// Configuration pour personnaliser les messages selon le module
export const getModuleSpecificMessages = (moduleId: string) => {
  const messages: Record<string, { title: string; subtitle: string }> = {
    'module-1': {
      title: "🎯 Quiz : Les Fondamentaux de la Blockchain",
      subtitle: "💡 Testez votre compréhension des concepts de base de la blockchain !"
    },
    'module-2': {
      title: "🎯 Quiz : Les Principes de la Décentralisation", 
      subtitle: "💡 Vérifiez vos connaissances sur la décentralisation !"
    },
    'module-3': {
      title: "🎯 Quiz : La Cryptographie et la Sécurité",
      subtitle: "💡 Maîtrisez-vous les aspects sécuritaires de la blockchain ?"
    },
    'module-4': {
      title: "🎯 Quiz : Les Différents Types de Blockchain",
      subtitle: "💡 Distinguez-vous les différents types de blockchain ?"
    },
    'module-5': {
      title: "🎯 Quiz : Bitcoin et son Histoire",
      subtitle: "💡 Connaissez-vous l'histoire et les spécificités de Bitcoin ?"
    },
    'module-6': {
      title: "🎯 Quiz : Ethereum et les Smart Contracts",
      subtitle: "💡 Maîtrisez-vous Ethereum et ses contrats intelligents ?"
    },
    'module-7': {
      title: "🎯 Quiz : Les Différents Types de Tokens",
      subtitle: "💡 Savez-vous différencier les types de tokens ?"
    },
    'module-8': {
      title: "🎯 Quiz : Sécurité des Wallets",
      subtitle: "💡 Êtes-vous prêt à sécuriser vos cryptomonnaies ?"
    },
    'module-9': {
      title: "🎯 Quiz : Les Indicateurs Techniques",
      subtitle: "💡 Maîtrisez-vous les outils d'analyse technique ?"
    },
    'module-10': {
      title: "🎯 Quiz : L'Analyse des Graphiques",
      subtitle: "💡 Savez-vous lire et interpréter les graphiques ?"
    },
    'module-11': {
      title: "🎯 Quiz : Les Patterns de Trading",
      subtitle: "💡 Reconnaissez-vous les configurations graphiques ?"
    },
    'module-12': {
      title: "🎯 Quiz : La Gestion du Risque",
      subtitle: "💡 Savez-vous protéger votre capital ?"
    },
    'module-13': {
      title: "🎯 Quiz : Les Protocoles DeFi",
      subtitle: "💡 Comprenez-vous les fondamentaux de la DeFi ?"
    },
    'module-14': {
      title: "🎯 Quiz : Le Yield Farming",
      subtitle: "💡 Maîtrisez-vous les stratégies de rendement ?"
    },
    'module-15': {
      title: "🎯 Quiz : Les Pools de Liquidité",
      subtitle: "💡 Comprenez-vous le fonctionnement des pools ?"
    },
    'module-16': {
      title: "🎯 Quiz : Les Stablecoins",
      subtitle: "💡 Connaissez-vous les cryptomonnaies stables ?"
    },
    'module-17': {
      title: "🎯 Quiz : Sécurisation des Wallets",
      subtitle: "💡 Savez-vous protéger vos actifs numériques ?"
    },
    'module-18': {
      title: "🎯 Quiz : Les Arnaques en Crypto",
      subtitle: "💡 Êtes-vous capable d'identifier les pièges ?"
    },
    'module-19': {
      title: "🎯 Quiz : Gestion de Portfolio",
      subtitle: "💡 Optimisez-vous correctement votre portefeuille ?"
    },
    'module-20': {
      title: "🎯 Quiz : Stratégies Avancées de Trading",
      subtitle: "💡 Maîtrisez-vous les techniques avancées ?"
    }
  };
  
  return messages[moduleId] || {
    title: "🎯 Quiz : Testez vos connaissances !",
    subtitle: "💡 Répondez aux questions pour valider vos acquis !"
  };
};