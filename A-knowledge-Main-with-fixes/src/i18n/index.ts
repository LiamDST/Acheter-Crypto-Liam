import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      about: {
        title: "À propos d'Alyah Knowledge",
        description: "Nous révolutionnons l'investissement en cryptomonnaies en rendant accessible à tous une expertise pointue et des outils d'analyse sophistiqués. Découvrez nos <1>solutions d'investissement</1> et notre <3>centre de formation</3>.",
        mission: {
          title: "Notre Mission",
          description: "Démocratiser l'accès aux investissements en cryptomonnaies en fournissant des <1>outils professionnels</1> et une <3>éducation de qualité</3>, permettant à chacun de prendre des décisions éclairées et de réussir dans l'univers crypto."
        },
        team: {
          title: "Notre Équipe",
          description: "Une équipe d'experts passionnés combinant des années d'expérience en trading, technologie blockchain et analyse financière pour vous offrir le meilleur accompagnement possible."
        },
        values: {
          title: "Nos Valeurs",
          excellence: {
            title: "Excellence",
            description: "Nous visons l'excellence dans chaque aspect de notre service, de <1>l'analyse technique</1> à <3>l'accompagnement client</3>."
          },
          innovation: {
            title: "Innovation",
            description: "Nous développons constamment de nouveaux outils et méthodes pour rester à la pointe de l'investissement crypto. Découvrez nos <1>algorithmes personnalisés</1>."
          }
        },
        appointment: "Prendre rendez-vous avec nos experts"
      },
      market: {
        title: "Marché des Cryptomonnaies",
        lastUpdate: "Dernière mise à jour :",
        refresh: "Actualiser",
        retry: "Réessayer",
        error: "Erreur lors de la récupération des données",
        crypto: "Crypto",
        price: "Prix",
        change24h: "24h %",
        change7d: "7j %",
        marketCap: "Cap. Marché",
        chart7d: "7 jours"
      },
      cryptoEducation: {
        title: "Formation Cryptomonnaies",
        description: "Découvrez notre programme complet pour comprendre et maîtriser l'univers des cryptomonnaies, de la blockchain et de la finance décentralisée.",
        learningPath: {
          title: "Parcours d'Apprentissage",
          description: "Notre formation est conçue pour vous accompagner pas à pas dans la compréhension des cryptomonnaies. Que vous soyez débutant ou investisseur expérimenté, vous trouverez des contenus adaptés à votre niveau.",
          modules: "5 Modules",
          lessons: "20+ Leçons",
          exercises: "Exercices Pratiques",
          support: "Support Personnalisé"
        },
        modules: {
          blockchain: {
            title: "Les Fondamentaux de la Blockchain",
            description: "Comprendre les bases de la technologie blockchain et son fonctionnement",
            topics: [
              "Qu'est-ce que la blockchain ?",
              "Les principes de la décentralisation",
              "La cryptographie et la sécurité",
              "Les différents types de blockchain"
            ]
          },
          cryptocurrencies: {
            title: "Les Cryptomonnaies",
            description: "Explorer l'univers des cryptomonnaies et leurs cas d'utilisation",
            topics: [
              "Bitcoin et son histoire",
              "Ethereum et les smart contracts",
              "Les différents types de tokens",
              "Les wallets et la sécurité"
            ]
          },
          technicalAnalysis: {
            title: "Analyse Technique",
            description: "Maîtriser les outils d'analyse technique pour le trading",
            topics: [
              "Les indicateurs techniques",
              "L'analyse des graphiques",
              "Les patterns de trading",
              "La gestion du risque"
            ]
          },
          defi: {
            title: "DeFi et Finance Décentralisée",
            description: "Découvrir les innovations de la finance décentralisée",
            topics: [
              "Les protocoles DeFi",
              "Le yield farming",
              "Les pools de liquidité",
              "Les stablecoins"
            ]
          },
          security: {
            title: "Sécurité et Bonnes Pratiques",
            description: "Protéger ses investissements et éviter les arnaques",
            topics: [
              "La sécurisation des wallets",
              "Les arnaques courantes",
              "La gestion de portfolio",
              "Les stratégies avancées"
            ]
          }
        },
        startModule: "Commencer ce module",
        unlockModule: "Débloquer ce module",
        cta: {
          title: "Prêt à commencer votre formation ?",
          description: "Rejoignez notre communauté d'apprenants et développez vos compétences dans l'univers passionnant des cryptomonnaies.",
          button: "Débloquer tous les modules"
        }
      },
      // Breadcrumb navigation
      breadcrumb: {
        home: 'Accueil',
        about: 'À propos',
        team: 'Équipe',
        support: 'Support',
        values: 'Valeurs',
        solutions: 'Solutions',
        market: 'Marché',
        dictionary: 'Dictionnaire',
        articles: 'Articles',
        training: 'Formation',
        understandCrypto: 'Comprendre la crypto'
      },
      // Navigation et header  
      nav: {
        home: 'Accueil',
        solutions: 'Nos solutions', 
        signals: 'Signaux Trading',
        training: 'Formation',
        about: 'À propos',
        book_appointment: 'Prendre rendez-vous',
        search: 'Rechercher...',
        noResults: 'Aucun résultat trouvé',
        openMenu: 'Ouvrir le menu',
        closeMenu: 'Fermer le menu',
        dashboard: 'Tableau de bord',
        // Sous-menus
        trainingOnly: 'Formation seule',
        trainingOnlyDesc: 'Accès complet à la formation crypto',
        trainingOnlyPrice: '249,99€/mois',
        trainingSignals: 'Formation + Signaux',
        trainingSignalsDesc: 'Formation complète et signaux de trading',
        trainingSignalsPrice: '349,99€/mois',
        popular: 'Populaire',
        recommended: 'Recommandé',
        understandCrypto: 'Comprendre la crypto',
        understandCryptoDesc: 'Guide complet sur la blockchain et les cryptomonnaies',
        realTimeMarket: 'Marché en temps réel',
        realTimeMarketDesc: 'Suivez les cours des cryptomonnaies en direct',
        articles: 'Articles',
        articlesDesc: 'Nos derniers articles et analyses',
        cryptoDictionary: 'Dictionnaire crypto',
        cryptoDictionaryDesc: 'Définitions des termes crypto essentiels'
      },
      // Authentification
      auth: {
        login: 'Se connecter',
        profile: 'Profil',
        signIn: 'Se connecter',
        signUp: 'S\'inscrire',
        register: 'Inscription',
        loginTitle: 'Connexion',
        registerTitle: 'Inscription',
        loginSubtitle: 'Connectez-vous à votre compte',
        registerSubtitle: 'Créez votre compte',
        email: 'Adresse e-mail',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        firstName: 'Prénom',
        lastName: 'Nom',
        phone: 'Téléphone',
        acceptTerms: 'J\'accepte les',
        termsOfService: 'conditions d\'utilisation',
        and: 'et la',
        privacyPolicy: 'politique de confidentialité',
        alreadyHaveAccount: 'Vous avez déjà un compte ?',
        noAccountYet: 'Pas encore de compte ?',
        authenticationFailed: 'Échec de l\'authentification',
        backToHome: 'Retour à l\'accueil',
        completingAuthentication: 'Finalisation de l\'authentification',
        pleaseWait: 'Veuillez patienter pendant que nous finalisisons votre connexion...',
        dontHaveAccount: 'Vous n\'avez pas de compte ?',
        forgotPassword: 'Mot de passe oublié ?',
        resetPassword: 'Réinitialiser le mot de passe',
        backToLogin: 'Retour à la connexion',
        sendResetLink: 'Envoyer le lien de réinitialisation',
        loginWith: 'Se connecter avec',
        registerWith: 'S\'inscrire avec',
        google: 'Google',
        or: 'ou',
        validationRequired: 'Ce champ est requis',
        validationEmail: 'Veuillez entrer une adresse e-mail valide',
        validationPassword: 'Le mot de passe doit contenir au moins 8 caractères',
        validationPasswordMatch: 'Les mots de passe ne correspondent pas',
        validationTerms: 'Vous devez accepter les conditions',
        loginSuccess: 'Connexion réussie !',
        loginError: 'Erreur de connexion',
        registerSuccess: 'Inscription réussie !',
        registerError: 'Erreur lors de l\'inscription',
        logout: 'Se déconnecter',
        // Additional auth translations for AuthButton
        verificationEmailError: 'Erreur lors de l\'envoi de l\'email de vérification',
        genericError: 'Une erreur est survenue',
        verificationCodeError: 'Code de vérification incorrect',
        googleSignInError: 'Une erreur est survenue lors de la connexion avec Google',
        emailRequiredError: 'Veuillez saisir votre adresse email',
        passwordResetEmailError: 'Une erreur est survenue lors de l\'envoi de l\'email de réinitialisation',
        emailSent: 'Email envoyé',
        resetEmailSentMessage: 'Si un compte existe avec cette adresse email, vous recevrez un lien pour réinitialiser votre mot de passe.',
        passwordResetTitle: 'Réinitialisation du mot de passe',
        passwordResetInstructions: 'Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
        sendingInProgress: 'Envoi en cours...',
        sendResetLinkButton: 'Envoyer le lien de réinitialisation',
        verificationCodeSentMessage: 'Un code de vérification a été envoyé à votre adresse email.',
        verificationCodeLabel: 'Code de vérification',
        verificationCodePlaceholder: 'Entrez le code',
        verifyButton: 'Vérifier',
        showPassword: 'Afficher le mot de passe',
        hidePassword: 'Masquer le mot de passe',
        loading: 'Chargement...',
        signingInProgress: 'Connexion en cours...',
        continueWithGoogle: 'Continuer avec Google',
        alreadyRegistered: 'Déjà inscrit ? Connectez-vous',
        notYetRegistered: 'Pas encore inscrit ? Créez un compte',
        userMenu: 'Menu de {{name}}',
        userMenuFallback: 'Menu de l\'utilisateur',
        profileLabel: 'profile',
        dashboard: 'Tableau de bord',
        settings: 'Paramètres',
        signOut: 'Se déconnecter',
        signInAction: 'Se connecter'
      },
      // Modales génériques
      modal: {
        close: 'Fermer',
        closeAria: 'Fermer'
      },
      // Checkout et paiement
      checkout: {
        finalizeSubscription: 'Finaliser votre abonnement',
        monthlyBilling: 'Facturation mensuelle',
        recurringPayment: 'Paiement récurrent',
        subscriptionDetails: 'Détails de l\'abonnement',
        paymentMethod: 'Méthode de paiement',
        cardNumber: 'Numéro de carte',
        expiryDate: 'Date d\'expiration',
        cvc: 'CVC',
        cardholderName: 'Nom du porteur',
        billingAddress: 'Adresse de facturation',
        completePayment: 'Finaliser le paiement',
        processing: 'Traitement en cours...',
        paymentSuccess: 'Paiement réussi',
        paymentError: 'Erreur de paiement',
        cancel: 'Annuler',
        securePayment: 'Paiement sécurisé',
        total: 'Total'
      },
      // Modale d'accès aux leçons
      lessonAccessModal: {
        freeLessonTitle: 'Accès à la leçon gratuite',
        premiumContentTitle: 'Contenu Premium',
        freeLessonDescription: 'Inscrivez-vous gratuitement pour accéder à {{lessonTitle}} et commencez votre parcours d\'apprentissage.',
        premiumContentDescription: 'Cette leçon est réservée aux membres avec un abonnement actif. Découvrez nos offres pour accéder à l\'intégralité de la formation.',
        createAccountButton: 'Créer un compte gratuit',
        discoverSubscriptionsButton: 'Découvrir les abonnements',
        viewSubscriptionsButton: 'Voir les abonnements',
        laterButton: 'Plus tard'
      },
      // Modales d'abonnement
      subscription: {
        chooseOffer: 'Choisissez votre offre',
        trainingOnly: 'Formation seule',
        trainingOnlyDesc: 'Accès complet à notre formation crypto',
        trainingOnlyPrice: '249,99€',
        perMonth: '/mois',
        trainingSignals: 'Formation + Signaux',
        trainingSignalsDesc: 'Formation + signaux de trading en temps réel',
        trainingSignalsPrice: '349,99€',
        mostPopular: 'Le plus populaire',
        selectPlan: 'Choisir ce plan',
        loginRequired: 'Connexion requise',
        loginRequiredDesc: 'Vous devez être connecté pour vous abonner',
        loginButton: 'Se connecter',
        registerButton: 'Créer un compte',
        alreadySubscribed: 'Déjà abonné',
        alreadySubscribedDesc: 'Vous avez déjà un abonnement actif',
        goToDashboard: 'Aller au tableau de bord',
        features: 'Fonctionnalités incluses',
        feature1: 'Formation complète',
        feature2: 'Support premium',
        feature3: 'Mises à jour régulières',
        feature4: 'Signaux de trading',
        feature5: 'Analyses expertes',
        feature6: 'Communauté VIP',
        payWithCard: 'Payer par carte',
        payWithPaypal: 'Payer avec PayPal',
        processing: 'Traitement...',
        close: 'Fermer',
        whatIncluded: 'Qu\'est-ce qui est inclus ?',
        fullAccess: 'Accès complet à la formation',
        premiumSupport: 'Support premium',
        regularUpdates: 'Mises à jour régulières',
        tradingSignalsAccess: 'Accès aux signaux de trading',
        expertAnalysis: 'Analyses d\'experts',
        vipCommunity: 'Communauté VIP',
        monthlyPayment: 'Paiement mensuel',
        noCommitment: 'Sans engagement',
        cancelAnytime: 'Résiliable à tout moment'
      },
      // Page Paramètres
      settingsPage: {
        title: 'Paramètres du compte',
        personalInfo: 'Informations personnelles',
        personalInfoDesc: 'Gérez vos informations personnelles et préférences',
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Adresse e-mail',
        phone: 'Téléphone',
        language: 'Langue',
        french: 'Français',
        english: 'Anglais',
        subscriptionInfo: 'Informations d\'abonnement',
        subscriptionInfoDesc: 'Gérez votre abonnement et facturation',
        currentPlan: 'Plan actuel',
        nextBilling: 'Prochaine facturation',
        amount: 'Montant',
        status: 'Statut',
        active: 'Actif',
        inactive: 'Inactif',
        manageBilling: 'Gérer la facturation',
        cancelSubscription: 'Annuler l\'abonnement',
        security: 'Sécurité',
        securityDesc: 'Paramètres de sécurité de votre compte',
        changePassword: 'Changer le mot de passe',
        currentPassword: 'Mot de passe actuel',
        newPassword: 'Nouveau mot de passe',
        confirmNewPassword: 'Confirmer le nouveau mot de passe',
        updatePassword: 'Mettre à jour le mot de passe',
        twoFactorAuth: 'Authentification à deux facteurs',
        enableTwoFactor: 'Activer l\'authentification à deux facteurs',
        notifications: 'Notifications',
        notificationsDesc: 'Gérez vos préférences de notification',
        emailNotifications: 'Notifications par e-mail',
        tradingSignals: 'Signaux de trading',
        marketUpdates: 'Mises à jour du marché',
        educationalContent: 'Contenu éducatif',
        accountUpdates: 'Mises à jour du compte',
        pushNotifications: 'Notifications push',
        enablePush: 'Activer les notifications push',
        privacy: 'Confidentialité',
        privacyDesc: 'Contrôlez la confidentialité de votre compte',
        profileVisibility: 'Visibilité du profil',
        dataSharing: 'Partage de données',
        allowDataSharing: 'Autoriser le partage anonyme des données d\'usage',
        deleteAccount: 'Supprimer le compte',
        dangerZone: 'Zone de danger',
        dangerZoneDesc: 'Actions irréversibles concernant votre compte',
        deleteAccountWarning: 'Cette action est irréversible. Toutes vos données seront définitivement supprimées.',
        deleteAccountButton: 'Supprimer définitivement mon compte',
        save: 'Enregistrer',
        cancel: 'Annuler',
        saved: 'Enregistré',
        saving: 'Enregistrement...',
        error: 'Erreur',
        success: 'Succès',
        updateSuccess: 'Paramètres mis à jour avec succès',
        updateError: 'Erreur lors de la mise à jour',
        passwordUpdateSuccess: 'Mot de passe mis à jour avec succès',
        passwordUpdateError: 'Erreur lors de la mise à jour du mot de passe',
        validationRequired: 'Ce champ est requis',
        validationEmail: 'Adresse e-mail invalide',
        validationPassword: 'Le mot de passe doit contenir au moins 8 caractères',
        validationPasswordMatch: 'Les mots de passe ne correspondent pas',
        confirmDeleteTitle: 'Confirmer la suppression',
        confirmDeleteMessage: 'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',
        confirmDelete: 'Oui, supprimer mon compte',
        close: 'Fermer'
      },
      // Hero section
      hero: {
        title: 'Expert en Trading Crypto &',
        titleHighlight: 'Formation Investissement',
        subtitle: 'Optimisez vos investissements en cryptomonnaies avec nos analyses expertes et notre accompagnement personnalisé',
        discoverSolutions: 'Découvrir Nos Solutions',
        tradingTraining: 'Formation Trading'
      },
      // Features section
      features: {
        title: 'Solutions d\'Investissement Crypto Innovantes',
        security: {
          title: 'Sécurité Maximale des Investissements Crypto',
          description: 'Protection avancée de vos actifs avec authentification multi-facteurs et protocoles de sécurité renforcés'
        },
        analysis: {
          title: 'Analyse et Suivi des Marchés Crypto en Temps Réel',
          description: 'Surveillance continue des marchés et signaux de trading optimisés pour maximiser vos performances'
        },
        management: {
          title: 'Gestion Décentralisée de Portefeuille Crypto',
          description: 'Contrôle total de vos actifs avec une approche décentralisée et transparente'
        },
        newToCrypto: {
          title: 'Nouveau dans la crypto ?',
          description: 'Vous débutez dans l\'univers des cryptomonnaies ou vous n\'avez pas encore de portefeuille ? Pas de souci : notre équipe est là pour vous guider pas à pas, afin de vous permettre d\'investir sereinement, sans stress ni mauvaises surprises.',
          createAccountSafely: 'Découvrir comment créer un compte en toute sécurité'
        }
      },
      // WhyChooseUs section
      whyChooseUs: {
        title: 'Pourquoi Nous Choisir ?',
        subtitle: 'Découvrez ce qui fait notre différence et pourquoi des investisseurs nous font confiance pour les guider dans l\'univers des cryptomonnaies.',
        completeTraining: {
          title: 'Formation Complète',
          content: 'Notre formation complète vous guide pas à pas dans l\'univers des cryptomonnaies, de la blockchain aux stratégies d\'investissement avancées.'
        },
        marketExpertise: {
          title: 'Une Expertise dans un Marché Complexe',
          content: 'Notre mission est de vous guider dans un secteur en constante évolution, en vous offrant des recommandations basées sur une analyse approfondie et un savoir-faire éprouvé.'
        },
        scamProtection: {
          title: 'Protection Contre les Arnaques',
          content: 'Une sélection rigoureuse des projets et une méthodologie transparente pour éviter les pièges courants et vous orienter vers des opportunités fiables.'
        },
        depthAnalysis: {
          title: 'Analyse Approfondie',
          content: 'Une étude quotidienne des fondamentaux des projets et une stratégie adaptative pour exploiter les meilleures opportunités du marché.'
        },
        startAdventure: 'Commencer l\'aventure'
      },
      // Values page
      values: {
        title: 'Nos Valeurs',
        description: 'Découvrez les valeurs fondamentales qui guident nos actions et façonnent notre vision de l\'investissement en cryptomonnaies.',
        meetTeam: 'Rencontrez notre équipe',
        expertsPassionate: 'd\'experts passionnés',
        accessibility: {
          title: 'Accessibilité',
          description: 'Nous nous engageons à rendre l\'investissement en cryptomonnaies accessible à tous, en proposant des solutions adaptées à chaque profil d\'investisseur et en simplifiant les concepts complexes. Découvrez nos <a href=\'/solutions\'>solutions d\'investissement</a> sur mesure.'
        },
        education: {
          title: 'Éducation',
          description: 'Notre mission est d\'éduquer et d\'accompagner nos clients dans leur parcours d\'investissement, en fournissant des ressources pédagogiques de qualité et un support personnalisé. Explorez notre <a href=\'/knowledge\'>centre de formation</a> et nos <a href=\'/articles\'>articles éducatifs</a>.'
        },
        environment: {
          title: 'Environnement',
          description: 'Nous sommes conscients de l\'impact environnemental du secteur crypto et privilégions les solutions et partenaires engagés dans une démarche écoresponsable. Consultez notre <a href=\'/about\'>vision</a> pour en savoir plus sur notre engagement.'
        },
        confidentiality: {
          title: 'Confidentialité',
          description: 'La protection des données et la confidentialité de nos clients sont au cœur de nos préoccupations. Nous appliquons les plus hauts standards de sécurité et de protection des informations. Découvrez notre <a href=\'/support\'>support client</a> dédié.'
        },
        ourCommitment: 'Notre Engagement',
        commitmentText: 'Chez Alyah Knowledge, nous croyons que l\'investissement en cryptomonnaies doit être accessible, éducatif et responsable. Nos valeurs guident chacune de nos actions et nous permettent de construire une relation de confiance durable avec nos clients.',
        bookAppointment: 'Prenez rendez-vous',
        expertAdvice: 'avec nos experts pour en savoir plus',
        discoverSolutions: 'Découvrir nos solutions d\'investissement'
      },
      // Support page
      support: {
        title: 'Assistance',
        description: 'Contactez l\'équipe d\'Alyah Knowledge pour toute question ou assistance. Nous sommes là pour vous aider.',
        pageTitle: 'Assistance',
        pageSubtitle: 'Notre équipe est là pour vous aider. Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.',
        form: {
          nameLabel: 'Nom complet',
          namePlaceholder: 'Votre nom',
          emailLabel: 'Email',
          emailPlaceholder: 'votre@email.com',
          subjectLabel: 'Sujet',
          subjectPlaceholder: 'Le sujet de votre message',
          messageLabel: 'Message',
          messagePlaceholder: 'Décrivez votre demande en détail...',
          submitButton: 'Envoyer le message',
          submitting: 'Envoi en cours...'
        },
        messages: {
          success: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
          error: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.'
        },
        email: {
          subject: 'Nouvelle demande d\'assistance Alyah: {{subject}}'
        }
      },
      // FAQ page
      faq: {
        title: 'Questions Fréquentes sur l\'Investissement Crypto',
        description: 'Trouvez rapidement des réponses à vos questions sur l\'investissement crypto et nos services.',
        personalizedAssistance: 'Pour une assistance personnalisée,',
        bookAppointment: 'prenez rendez-vous',
        withExperts: 'avec nos experts',
        notFoundAnswer: 'Vous n\'avez pas trouvé la réponse à votre question ?',
        contactSupport: 'Contactez le support',
        bookAppointmentBtn: 'Prendre rendez-vous',
        items: {
          q1: {
            question: 'Qu\'est-ce qu\'Alyah Knowledge ?',
            answer: 'Alyah Knowledge est une plateforme experte en investissement crypto qui combine formation, signaux de trading et accompagnement personnalisé. Notre mission est de rendre l\'investissement en cryptomonnaies accessible, sécurisé et performant pour tous. Découvrez notre histoire et notre vision sur notre <a href="/about" class="text-blue-600 hover:text-blue-800">page À propos</a>.'
          },
          q2: {
            question: 'Comment commencer à investir avec Alyah Knowledge ?',
            answer: 'Pour débuter, nous recommandons de consulter nos <a href="/solutions#monthly" class="text-blue-600 hover:text-blue-800">offres d\'abonnement</a>, en commençant par notre formule 1 mois qui inclut une formation de base et des signaux de trading sur les principales cryptomonnaies. Vous pouvez également <a href="/appointment" class="text-blue-600 hover:text-blue-800">prendre rendez-vous</a> pour une consultation personnalisée avec nos experts.'
          },
          q3: {
            question: 'Comment fonctionne votre formation trading ?',
            answer: 'Notre <a href="/knowledge/crypto" class="text-blue-600 hover:text-blue-800">formation trading</a> combine des ressources en ligne, des webinaires interactifs et un accompagnement personnalisé. Vous progressez à votre rythme avec des modules structurés, des exercices pratiques, et un accès à notre communauté d\'apprentissage. Consultez notre <a href="/knowledge" class="text-blue-600 hover:text-blue-800">centre de ressources</a> pour plus d\'informations.'
          },
          q4: {
            question: 'Quels sont vos différents services ?',
            answer: 'Nous proposons une gamme complète de services incluant des <a href="/solutions" class="text-blue-600 hover:text-blue-800">signaux de trading optimisés</a>, des formations en trading crypto, des analyses de marché détaillées, et un accompagnement personnalisé. Découvrez nos <a href="/solutions#custom" class="text-blue-600 hover:text-blue-800">solutions sur mesure</a> adaptées à tous les niveaux.'
          },
          q5: {
            question: 'Comment suivre l\'évolution du marché crypto ?',
            answer: 'Vous pouvez suivre l\'évolution du marché en temps réel sur notre <a href="/market" class="text-blue-600 hover:text-blue-800">page Marché</a>. Nous proposons également des analyses régulières dans notre section <a href="/articles" class="text-blue-600 hover:text-blue-800">Articles</a> pour vous tenir informé des dernières tendances.'
          },
          q6: {
            question: 'Qui sont les experts derrière Alyah Knowledge ?',
            answer: 'Notre <a href="/team" class="text-blue-600 hover:text-blue-800">équipe d\'experts</a> est composée de professionnels passionnés du trading crypto, dirigée par Jordan Chekroun, CEO et fondateur. Chaque membre apporte son expertise unique pour vous offrir le meilleur accompagnement possible.'
          },
          q7: {
            question: 'Comment contacter le support ?',
            answer: 'Notre équipe support est disponible via notre <a href="/support" class="text-blue-600 hover:text-blue-800">page d\'assistance</a>. Les abonnés premium bénéficient d\'un support prioritaire 24/7 et d\'un accès direct à nos experts. N\'hésitez pas à nous contacter pour toute question.'
          },
          q8: {
            question: 'Quelles cryptomonnaies sont couvertes ?',
            answer: 'Nous couvrons les principales cryptomonnaies comme Bitcoin et Ethereum, ainsi qu\'une sélection d\'altcoins prometteurs. Consultez notre <a href="/market" class="text-blue-600 hover:text-blue-800">page Marché</a> pour voir les cryptomonnaies que nous suivons actuellement.'
          }
        }
      },
      // Footer
      footer: {
        support: 'Assistance',
        values: 'Nos valeurs',
        privacy_policy: 'Politique de Confidentialité',
        terms_of_use: 'Conditions d\'Utilisation',
        corporate_policy: 'Politique d\'Entreprise',
        articles: 'Articles',
        glossary: 'Dictionnaire',
        assistance: 'Assistance',
        faq: 'FAQ',
        privacy: 'Confidentialité',
        terms: 'Conditions d\'utilisation',
        termsOfService: 'Conditions d\'Utilisation',
        companyPolicy: 'Politique d\'Entreprise',
        dictionary: 'Dictionnaire',
        copyright: 'Copyright © {year} Alyah Knowledge Investissement. Tous droits réservés.'
      },
      // Cookie consent
      cookie: {
        title: 'Cookies & Confidentialité',
        message: 'Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic de notre site. En continuant à naviguer, vous acceptez notre utilisation des cookies.',
        deny: 'Refuser',
        accept: 'Accepter'
      },
      // Page d\'accueil
      home: {
        hero: {
          title: 'Expert en Trading Crypto & Formation Investissement',
          description: 'Optimisez vos investissements en cryptomonnaies avec nos analyses expertes et notre accompagnement personnalisé',
          button: 'Découvrir Nos Solutions'
        },
        why_choose_us: {
          title: 'Pourquoi Nous Choisir ?',
          description: 'Découvrez ce qui fait notre différence et pourquoi des investisseurs nous font confiance pour les guider dans l\'univers des cryptomonnaies.',
          complete_training: {
            title: 'Formation Complète'
          },
          expert_market: {
            title: 'Une Expertise dans un Marché Complexe'
          },
          scam_protection: {
            title: 'Protection Contre les Arnaques'
          },
          deep_analysis: {
            title: 'Analyse Approfondie'
          }
        },
        new_crypto: {
          title: 'Nouveau dans la crypto ?',
          description: 'Vous êtes au bon endroit. Apprenez pas à pas les fondamentaux des cryptomonnaies avec notre formation complète.'
        }
      },
      // Solutions page
      solutions: {
        title: 'Nos Solutions d\'Investissement',
        description: 'Découvrez nos solutions sur mesure pour investir intelligemment dans les cryptomonnaies, adaptées à vos objectifs et votre expérience.',
        plans: {
          title: 'Nos Formules d\'Abonnement',
          description: 'Choisissez la formule qui correspond le mieux à vos besoins et objectifs d\'investissement'
        },
        plan: {
          training_only: {
            name: 'Formation seule'
          },
          training_signals: {
            name: 'Formation + Signaux'
          },
          subscribe: 'Souscrire maintenant'
        },
        // FAQ section
        faq: {
          items: {
            security: {
              question: 'Comment sécuriser mes investissements en cryptomonnaie ?',
              answer: 'Chez Alyah Knowledge, nous utilisons des protocoles de sécurité avancés et une infrastructure robuste pour protéger vos investissements. Nous recommandons l\'authentification à deux facteurs, le stockage sécurisé des clés privées, et nous vous formons aux meilleures pratiques de sécurité.'
            },
            signals: {
              question: 'Quels sont les avantages des signaux de trading Alyah Knowledge ?',
              answer: 'Nos signaux de trading sont générés par des algorithmes sophistiqués et validés par des experts. Ils incluent des points d\'entrée et de sortie précis, des niveaux de stop-loss, et sont accompagnés d\'analyses détaillées pour maximiser vos chances de succès.'
            },
            beginners: {
              question: 'Comment débuter l\'investissement en cryptomonnaies ?',
              answer: 'Pour débuter, nous recommandons notre plan Formation seule qui inclut une formation complète, des ressources pédagogiques, et un accompagnement personnalisé pour comprendre les fondamentaux du marché.'
            },
            plans: {
              question: 'Quelle est la différence entre vos différents plans ?',
              answer: 'Notre plan Formation seule vous donne accès à l\'ensemble de notre contenu éducatif, tandis que le plan Formation + Signaux ajoute l\'accès à nos signaux de trading sur l\'ensemble des cryptomonnaies disponibles, sans limitation.'
            },
            support: {
              question: 'Proposez-vous un accompagnement personnalisé ?',
              answer: 'Oui, tous nos plans incluent un accompagnement adapté à vos besoins. Le plan Formation seule comprend un support par email, tandis que le plan Formation + Signaux offre un support prioritaire.'
            }
          }
        },
        // Security features section
        features: {
          security: {
            title: 'Sécurité Maximale',
            description: 'Vos investissements sont sécurisés grâce à notre infrastructure robuste et nos protocoles de sécurité avancés.'
          },
          performance: {
            title: 'Performance Optimisée',
            description: 'Notre algorithme analyse en continu les marchés pour identifier les meilleures opportunités d\'investissement.'
          },
          control: {
            title: 'Contrôle Total',
            description: 'Gardez le contrôle total de vos actifs tout en bénéficiant de notre expertise et de nos outils.'
          }
        },
        // Subscription plans details
        subscriptions: {
          formationSeule: {
            title: 'Formation seule',
            price: '249,99€',
            period: '/mois',
            description: 'Pour apprendre à votre rythme',
            buttonText: 'Souscrire maintenant',
            features: {
              fullAccess: {
                text: 'Accès complet à la formation crypto : ',
                highlight: 'Tous les modules'
              },
              resources: {
                text: 'Ressources pédagogiques : ',
                highlight: 'Vidéos et PDF'
              },
              community: {
                text: 'Accès à la communauté : ',
                highlight: 'Forum et discussions'
              },
              support: {
                text: 'Support : ',
                highlight: 'Email standard'
              },
              updates: {
                text: 'Mises à jour : ',
                highlight: 'Accès aux nouveaux contenus'
              },
              tradingSignals: {
                text: 'Signaux de trading',
                highlight: 'Non inclus'
              }
            }
          },
          formationEtSignaux: {
            name: 'Formation + Signaux',
            title: 'Formation + Signaux',
            price: '349,99€',
            period: '/mois',
            description: 'Pour apprendre et agir immédiatement',
            buttonText: 'Souscrire maintenant',
            recommended: 'Recommandé',
            features: {
              included: {
                text: 'Tout ce qui est inclus dans : ',
                highlight: 'Formation seule'
              },
              tradingSignals: {
                text: 'Signaux de trading : ',
                highlight: 'Toutes les cryptos'
              },
              marketCoverage: {
                text: 'Couverture du marché : ',
                highlight: 'Sans limitation'
              },
              prioritySupport: {
                text: 'Support : ',
                highlight: 'Prioritaire'
              },
              marketAnalysis: {
                text: 'Analyses de marché : ',
                highlight: 'Hebdomadaires'
              },
              advancedStrategies: {
                text: 'Stratégies avancées : ',
                highlight: 'Accès complet'
              }
            },
            marketCoverage: {
              title: 'Couverture complète du marché :'
            }
          }
        },
        subscribeAriaLabel: 'Souscrire à {{planName}}'
      },
      // Signaux Trading page
      signauxTrading: {
        title: 'Transmission des Signaux Trading Crypto',
        subtitle: 'Optimisez vos performances avec nos signaux de trading générés par algorithme et validés par des experts.',
        howItWorks: {
          title: 'Comment fonctionnent nos signaux ?',
          subtitle: 'Un processus simple et efficace en 4 étapes',
          steps: {
            generation: {
              title: 'Génération du Signal',
              description: 'Notre algorithme analyse le marché et génère un signal en temps réel.'
            },
            transmission: {
              title: 'Transmission Instantanée',
              description: 'Le signal est immédiatement envoyé à votre espace utilisateur.'
            },
            notification: {
              title: 'Notification Email',
              description: 'Vous recevez un email contenant tous les détails du signal.'
            },
            execution: {
              title: 'Exécution automatique',
              description: 'Votre ordre est automatiquement exécuté selon vos paramètres',
              note: 'L\'exécution automatique nécessite d\'avoir relié un signal webhook à l\'échangeur visé. Sans cette configuration, le signal reçu devra être exécuté manuellement en accédant à l\'échangeur pour passer le trade.'
            }
          }
        },
        mobileReception: {
          title: 'Réception des signaux sur votre mobile',
          inbox: 'Boîte de réception',
          edit: 'Modifier',
          features: {
            realTime: {
              title: 'Signaux en temps réel',
              description: 'Recevez les alertes sur votre mobile à l\'instant où nos algorithmes détectent une opportunité profitable'
            },
            completeDetails: {
              title: 'Détails complets',
              description: 'Chaque signal inclut le prix d\'entrée, les niveaux de stop-loss et de take-profit pour une gestion des risques optimale'
            },
            performance: {
              title: 'Suivi de performance',
              description: 'Consultez l\'historique de vos transactions et recevez des notifications sur les profits réalisés'
            }
          },
          instantNotifications: 'Notifications instantanées pour ne manquer aucune opportunité'
        },
        performance: {
          title: 'Suivi de performance et résultats',
          transactionHistory: 'Historique des transactions',
          statistics: 'Statistiques et performance',
          stats: {
            totalSignals: 'Total signaux',
            successRate: 'Taux de réussite',
            averageGain: 'Gain moyen',
            totalPerformance: 'Performance totale'
          },
          months: {
            jan: 'Jan',
            feb: 'Fév',
            mar: 'Mar',
            apr: 'Avr',
            may: 'Mai',
            jun: 'Jun'
          },
          actionTypes: {
            buy: 'ACHAT',
            sell: 'VENTE'
          },
          takeProfit: 'Take profit',
          stopLoss: 'Stop loss'
        },
        newToCrypto: {
          title: 'Nouveau dans la crypto ?',
          description: 'Vous débutez dans l\'univers des cryptomonnaies ou vous n\'avez pas encore de portefeuille ? Pas de souci : notre équipe est là pour vous guider pas à pas, afin de vous permettre d\'investir sereinement, sans stress ni mauvaises surprises.',
          cta: 'Découvrir comment créer un compte en toute sécurité'
        },
        finalCta: {
          title: 'Prêt à optimiser vos investissements crypto ?',
          description: 'Rejoignez notre communauté d\'investisseurs et recevez nos signaux de trading dès aujourd\'hui',
          startNow: 'Commencer maintenant',
          contactUs: 'Nous contacter'
        }
      },
      // Appointment page
      appointment: {
        title: 'Prendre rendez-vous',
        subtitle: 'Réservez une consultation personnalisée avec notre expert',
        confirmation: {
          title: 'Rendez-vous confirmé !',
          message: 'Merci pour votre demande. Vous recevrez bientôt un email de confirmation.'
        },
        calendar: {
          days: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          availableSlots: 'Horaires disponibles pour le {{date}}'
        },
        form: {
          firstName: 'Prénom',
          lastName: 'Nom',
          email: 'Email',
          phone: 'Téléphone',
          message: 'Message (facultatif)',
          phoneNumber: 'Numéro',
          confirmAppointment: 'Confirmer le rendez-vous',
          sending: 'Envoi en cours...',
          required: '*'
        },
        validation: {
          firstNameRequired: 'Le prénom est requis',
          lastNameRequired: 'Le nom est requis',
          emailRequired: 'L\'email est requis',
          emailInvalid: 'Email invalide',
          phoneRequired: 'Le téléphone est requis',
          dateRequired: 'Veuillez sélectionner une date',
          timeRequired: 'Veuillez sélectionner un horaire',
          submitError: 'Une erreur est survenue lors de l\'envoi du formulaire.'
        }
      },
      // Team page
      team: {
        // Page meta
        title: 'Notre Équipe',
        description: 'Découvrez l\'équipe d\'experts passionnés d\'Alyah Knowledge',
        
        // Values
        values: {
          integrity: 'Intégrité',
          excellence: 'Excellence',
          innovation: 'Innovation',
          transparency: 'Transparence',
          trust: 'Confiance',
          performance: 'Performance',
          expertise: 'Expertise',
          benevolence: 'Bienveillance',
          engagement: 'Engagement',
          collaboration: 'Collaboration',
          adaptability: 'Adaptabilité',
          resilience: 'Résilience',
          proactivity: 'Proactivité',
          authenticity: 'Authenticité',
          responsibility: 'Responsabilité',
          creativity: 'Créativité',
          determination: 'Détermination',
          passion: 'Passion',
          ambition: 'Ambition',
          leadership: 'Leadership',
          synergy: 'Synergie',
          dynamism: 'Dynamisme',
          perseverance: 'Persévérance',
          vision: 'Vision',
          audacity: 'Audace',
          ethics: 'Éthique',
          agility: 'Agilité',
          cohesion: 'Cohésion',
          growth: 'Croissance',
          professionalExcellence: 'Excellence Pro'
        },
        
        // Jordan Chekroun section
        jordan: {
          name: 'Jordan Chekroun',
          title: 'CEO & Fondateur d\'Alyah Knowledge',
          shortBio: 'Juriste de formation, développeur par passion, et expert en trading de cryptomonnaies. Ma vision : rendre l\'investissement en cryptomonnaies accessible, sécurisé et performant.',
          journey: {
            title: 'Mon Parcours',
            paragraph1: 'Profondément convaincu du potentiel exceptionnel de la blockchain, je suis persuadé qu\'il est essentiel d\'en comprendre clairement les mécanismes afin que chacun puisse mesurer les opportunités et participer activement à cet écosystème en pleine expansion.',
            paragraph2: 'Animé par une curiosité intense et un goût prononcé pour l\'innovation, j\'ai élargi mes compétences juridiques en apprenant à coder et à concevoir des algorithmes sophistiqués de trading. Mon objectif était clair : créer une solution fiable, mathématiquement solide, adaptée à la volatilité extrême des marchés crypto, tout en transmettant mon savoir à travers une formation accessible à tous, permettant à chacun d\'évoluer sereinement et de profiter au maximum des opportunités de ce secteur.',
            paragraph3: 'Cette approche découle directement d\'expériences personnelles marquantes. À mes débuts, confronté à un retournement brutal et inattendu du marché, j\'ai perdu une part significative de mon investissement en seulement quelques heures. À l\'inverse, j\'ai également connu des succès rapides et des gains importants en anticipant avec précision les mouvements du marché. Ces expériences contrastées m\'ont enseigné l\'importance capitale d\'une gestion rigoureuse des risques et d\'une méthodologie clairement structurée.',
            paragraph4: 'Chez Alyah Knowledge, chaque aspect de notre stratégie est pensé pour anticiper et maîtriser au mieux les risques inhérents au marché crypto. Nous proposons à nos investisseurs un accompagnement transparent, une technologie éprouvée, et une pédagogie continue pour évoluer sereinement dans un environnement complexe et volatil.',
            paragraph5: 'En tant que CEO, je privilégie un leadership fondé sur la bienveillance, l\'intégrité et l\'excellence opérationnelle. Je suis convaincu qu\'une analyse approfondie combinée à une stratégie méthodique constitue la clé d\'un investissement réussi sur le long terme.',
            paragraph6: 'Mon ambition avec Alyah Knowledge est double : d\'une part, démocratiser cette passionnante technologie afin que chacun puisse comprendre les enjeux et s\'y engager pleinement, et d\'autre part, permettre aux investisseurs, débutants comme expérimentés, de générer des profits en diversifiant leurs portefeuilles avec des actifs numériques prometteurs, et ainsi devenir acteurs à part entière de ce nouvel écosystème financier qui ne cesse de se structurer et de croître.'
          }
        },
        
        // Yoann Hadjadj section
        yoann: {
          name: 'Yoann Hadjadj',
          title: 'Associé, Responsable Management et Gestion des Flux Financiers',
          bio: {
            paragraph1: 'Je m\'appelle Yoann Hadjadj, et je suis passionné par l\'alliance entre expertise opérationnelle, leadership et innovation. Mon parcours, à la fois diversifié et enrichissant, m\'a permis de développer une capacité à m\'adapter et à exceller dans des environnements exigeants et en constante évolution.',
            paragraph2: 'Diplômé d\'une licence et animé par une curiosité insatiable, j\'ai construit mon expertise à travers des formations variées et complémentaires : management d\'équipe, coaching des vendeurs, gestion des risques psychosociaux, maîtrise des procédures des flux financiers, certification HACCP et stratégies avancées en management des ventes. Ces compétences m\'ont permis d\'adopter une approche holistique et méthodique, adaptée à des secteurs dynamiques et compétitifs.',
            paragraph3: 'Avec plus de 15 ans d\'expérience dans le secteur de la restauration, je dirige aujourd\'hui un grand groupe, où je supervise un chiffre d\'affaires annuel de plus de 7,5 millions d\'euros. À la tête d\'une équipe de plus de 80 collaborateurs, j\'ai appris à concilier rigueur managériale, optimisation des processus et performance financière. Mon approche du leadership repose sur la bienveillance et la capacité à fédérer les talents, ce qui, je crois, contribue à la réussite opérationnelle et stratégique de l\'entreprise.',
            paragraph4: 'Depuis plus de cinq ans, je m\'intéresse de près à l\'univers des cryptomonnaies et de la blockchain. Fasciné par le potentiel disruptif de cette technologie, j\'ai entrepris une exploration approfondie et méthodique de ce marché en pleine effervescence. Loin de me contenter d\'une simple curiosité, je me suis formé avec rigueur, étudiant les mécanismes complexes des cryptomonnaies, analysant les tendances du marché, évaluant les risques et identifiant les opportunités.',
            paragraph5: 'Au fil des années, j\'ai audité de nombreuses entreprises et projets, prenant le temps de comprendre leurs rouages, leurs forces et leurs faiblesses. Cette démarche m\'a permis de développer une expertise solide et de m\'entourer de deux experts reconnus dans le domaine. Ensemble, nous explorons les opportunités offertes par ce secteur innovant, en y appliquant les principes de rigueur, de stratégie et de gestion qui ont guidé mon parcours.',
            paragraph6: 'En tant qu\'Associé Responsable Management et Gestion des Flux Financiers, je mets à profit ma maîtrise des flux financiers et ma capacité à manager des équipes pluridisciplinaires pour contribuer à la réussite des projets que j\'accompagne. Je crois fermement en l\'importance de l\'intégrité et de l\'innovation, et je m\'efforce d\'anticiper les défis pour transformer les obstacles en opportunités.'
          }
        },
        
        // Julien Ribardière section
        julien: {
          name: 'Julien Ribardière',
          title: 'Associé, Community Manager & Expert en Veille Médiatique',
          bio: {
            paragraph1: 'Avec plus de 20 ans d\'expérience dans le digital et la communication, j\'ai toujours choisi de m\'investir dans des projets porteurs de sens, guidés par des valeurs fortes telles que la bienveillance, la transparence et le sérieux. Aujourd\'hui, je suis fier de faire partie d\'Alyah Knowledge, une entreprise qui incarne ces principes et avec laquelle je partage une vision commune.',
            paragraph2: 'En tant que Community Manager et Expert en Veille Médiatique, mon rôle est de veiller à ce que chaque communication reflète fidèlement la réalité de notre entreprise. Je crois fermement que la transparence, le partage honnête et la présentation équilibrée de nos atouts comme de nos défis sont essentiels pour bâtir une relation de confiance avec nos clients et investisseurs.',
            paragraph3: 'Mon expertise en stratégies de contenu et en campagnes publicitaires ciblées (Facebook, X, Instagram, TikTok, etc.) me permet de créer des interactions engageantes et impactantes. Mais ce qui me motive avant tout, c\'est la recherche constante de l\'excellence. Je n\'hésite jamais à solliciter des feedbacks pour améliorer en continu nos processus et nos résultats, toujours dans un esprit d\'écoute et de collaboration.',
            paragraph4: 'Chez Alyah Knowledge, je m\'engage à construire une communication claire, sincère et alignée avec nos valeurs. Mon objectif est de créer un dialogue ouvert et authentique avec notre communauté, afin de renforcer la confiance en notre projet.',
            testimonial: 'Avoir Julien Ribardière à nos côtés est une véritable chance pour Alyah Knowledge. Son expertise, son éthique professionnelle et son engagement envers l\'excellence font de lui un atout indispensable pour notre croissance et notre succès.'
          }
        },
        
        // Vision section
        vision: {
          title: 'Notre Vision Commune',
          security: {
            title: 'Sécurité & Conformité',
            description: 'Une approche rigoureuse combinant expertise juridique et technologique.'
          },
          performance: {
            title: 'Performance & Innovation',
            description: 'Des stratégies innovantes pour des performances optimales.'
          },
          trust: {
            title: 'Transparence & Confiance',
            description: 'Une communication claire et authentique avec notre communauté.'
          }
        }
      },
      
      // Payment and subscription components
      payment: {
        // SubscriptionCard
        recommended: 'Recommandé',
        perMonth: '/mois',
        subscribeNow: 'Souscrire maintenant',
        subscriptionPlans: {
          formationSeule: {
            name: 'Formation seule',
            price: '249,99€',
            description: 'Pour apprendre à votre rythme',
            features: {
              fullAccess: {
                text: 'Accès complet à la formation crypto : ',
                highlight: 'Tous les modules'
              },
              resources: {
                text: 'Ressources pédagogiques : ',
                highlight: 'Vidéos et PDF'
              },
              community: {
                text: 'Accès à la communauté : ',
                highlight: 'Forum et discussions'
              },
              support: {
                text: 'Support : ',
                highlight: 'Email standard'
              },
              updates: {
                text: 'Mises à jour : ',
                highlight: 'Accès aux nouveaux contenus'
              },
              tradingSignals: {
                text: 'Signaux de trading',
                highlight: 'Non inclus'
              }
            }
          },
          formationEtSignaux: {
            name: 'Formation + Signaux',
            price: '349,99€',
            description: 'Pour apprendre et agir immédiatement',
            buttonText: 'Souscrire maintenant',
            recommended: 'Recommandé',
            features: {
              included: {
                text: 'Tout ce qui est inclus dans : ',
                highlight: 'Formation seule'
              },
              tradingSignals: {
                text: 'Signaux de trading : ',
                highlight: 'Toutes les cryptos'
              },
              marketCoverage: {
                text: 'Couverture du marché : ',
                highlight: 'Sans limitation'
              },
              prioritySupport: {
                text: 'Support : ',
                highlight: 'Prioritaire'
              },
              marketAnalysis: {
                text: 'Analyses de marché : ',
                highlight: 'Hebdomadaires'
              },
              advancedStrategies: {
                text: 'Stratégies avancées : ',
                highlight: 'Accès complet'
              }
            },
            marketCoverage: {
              title: 'Couverture complète du marché :'
            }
          }
        },
        subscribeAriaLabel: 'Souscrire à {{planName}}',
        includesAccess: 'Tous nos abonnements incluent un accès complet à notre plateforme d\'apprentissage, des mises à jour régulières et un support client dédié.',
        cancellationPolicy: 'Vous pouvez annuler votre abonnement à tout moment. Des conditions générales s\'appliquent.',
        // PaymentSection
        paymentMethods: {
          card: {
            name: 'Carte bancaire',
            description: 'Paiement sécurisé par carte Visa ou Mastercard'
          },
          crypto: {
            name: 'USDT',
            description: 'Paiement en stablecoin USDT (Tether)'
          }
        },
        comingSoon: 'Bientôt disponible',
        payAmount: 'Payer {{amount}}',
        processing: 'Traitement en cours...', 
        loginRequired: 'Veuillez vous connecter pour continuer',
        paymentError: 'Une erreur est survenue lors du paiement',
        usdtPaymentError: 'Une erreur est survenue lors du paiement USDT',
        // UserSubscriptionInfo
        subscription: {
          title: 'Abonnement',
          yourSubscription: 'Votre abonnement',
          noActiveSubscription: 'Vous n\'avez pas d\'abonnement actif. Découvrez nos offres pour accéder à l\'ensemble de nos contenus premium.',
          viewSubscriptions: 'Voir les abonnements',
          status: 'Statut',
          active: 'Actif',
          amount: 'Montant',
          startDate: 'Date de début',
          nextRenewal: 'Prochain renouvellement',
          autoRenewal: 'Renouvellement automatique',
          enabled: 'activé',
          disabled: 'désactivé',
          planNames: {
            formationSeule: 'Formation seule',
            formationEtSignaux: 'Formation + Signaux'
          },
          error: 'Une erreur est survenue lors de la récupération de votre abonnement.',
          defaultName: 'Abonnement'
        }
      },
      
      // Messages d\'erreur globaux et pages d\'erreur
      errors: {
        generic: 'Une erreur s\'est produite',
        networkError: 'Erreur de connexion réseau',
        serverError: 'Erreur du serveur',
        unauthorized: 'Accès non autorisé',
        forbidden: 'Accès interdit',
        notFound: 'Page non trouvée',
        validation: 'Erreur de validation',
        tryAgain: 'Veuillez réessayer',
        goHome: 'Retour à l\'accueil',
        contactSupport: 'Contacter le support',
        loadingError: 'Erreur de chargement',
        loadingErrorMessage: 'Une erreur s\'est produite lors du chargement de l\'application.',
        reloadPage: 'Recharger la page',
        errorDetailsLabel: 'Détails de l\'erreur (dev uniquement)',
        pageNotFoundTitle: 'Page non trouvée',
        pageNotFoundMessage: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
        home: 'Accueil',
        dictionary: 'Dictionnaire',
        articles: 'Articles',
        popularResources: 'Ressources populaires',
        completeTraining: 'Formation crypto complète',
        realTimeMarket: 'Marché en temps réel',
        whatIsBitcoin: 'Qu\'est-ce que Bitcoin ?',
        tradingSignals: 'Signaux de trading'
      },
      // Mission component (Histoire et Vision)
      mission: {
        title: 'L\'Histoire et la Vision d\'Alyah Knowledge dans l\'Investissement Crypto',
        paragraph1: 'Le nom « Alyah Knowledge Crypto Investissement » symbolise une véritable ascension vers la maîtrise des nouvelles technologies financières. Le terme « Alyah » évoque l\'idée de montée, d\'élévation, illustrant la progression vers de nouveaux sommets tant sur le plan financier que sur celui de la compréhension.',
        paragraph2: 'L\'avènement de la technologie blockchain et des cryptomonnaies représente une révolution majeure dans le monde de l\'investissement. Cette technologie, bien que porteuse d\'énormes opportunités, requiert du temps, de la rigueur et un investissement personnel conséquent pour être véritablement maîtrisée.',
        missionTitle: 'Notre Mission dans l\'Écosystème Crypto',
        missionText: 'Alyah Knowledge se positionne comme un accompagnateur de confiance, un véritable GPS qui guide les investisseurs dans leurs choix, en minimisant les risques et en leur apportant des conseils éclairés. Nous aidons chacun à naviguer dans cet univers complexe et en perpétuelle évolution, en combinant expertise et pédagogie.',
        conclusion: 'Notre projet incarne à la fois l\'aspiration à une montée en compétence et en richesse, et la conviction qu\'une véritable réussite passe par l\'alliance de la connaissance et de l\'investissement en temps et en argent.'
      },
      createAccount: {
        seo: {
          title: 'Créer un Compte Alyah Knowledge | Formation et Trading',
          description: 'Inscrivez-vous gratuitement pour accéder à nos formations crypto, outils de trading et analyses de marché exclusives.'
        },
        backToSignals: 'Retour aux signaux trading',
        title: 'Créer votre compte crypto en toute sécurité',
        importantInfo: {
          title: 'Information importante',
          description: 'Alyah Knowledge est une plateforme dédiée à l\'accompagnement et à la formation des investisseurs en cryptomonnaies. Nous ne proposons pas de cryptomonnaies et n\'avons aucun partenariat avec des plateformes d\'échange. Notre rôle est uniquement de vous guider dans votre parcours d\'investissement.'
        },
        steps: {
          title: 'Les étapes pour débuter',
          step1: {
            title: '1. Choisir une plateforme d\'échange sécurisée',
            item1: 'Vérifiez la réputation et l\'historique de la plateforme',
            item2: 'Assurez-vous qu\'elle est réglementée dans votre pays',
            item3: 'Comparez les frais de transaction',
            item4: 'Évaluez la facilité d\'utilisation de l\'interface'
          },
          step2: {
            title: '2. Créer et sécuriser votre compte',
            item1: 'Utilisez une adresse email dédiée',
            item2: 'Créez un mot de passe fort et unique',
            item3: 'Activez l\'authentification à deux facteurs (2FA)',
            item4: 'Conservez vos identifiants en lieu sûr'
          },
          step3: {
            title: '3. Vérifier votre identité (KYC)',
            item1: 'Préparez vos documents d\'identité',
            item2: 'Suivez la procédure de vérification',
            item3: 'Attendez la validation de votre compte'
          }
        },
        help: {
          title: 'Besoin d\'aide ?',
          description: 'Notre équipe est là pour vous accompagner à chaque étape de votre parcours. N\'hésitez pas à nous contacter pour toute question ou conseil personnalisé.',
          contactButton: 'Contacter notre support'
        }
      }
    }
  },
  en: {
    translation: {
      about: {
        title: "About Alyah Knowledge",
        description: "We are revolutionizing cryptocurrency investment by making cutting-edge expertise and sophisticated analysis tools accessible to everyone. Discover our <1>investment solutions</1> and our <3>training center</3>.",
        mission: {
          title: "Our Mission",
          description: "To democratize access to cryptocurrency investments by providing <1>professional tools</1> and <3>quality education</3>, enabling everyone to make informed decisions and succeed in the crypto universe."
        },
        team: {
          title: "Our Team",
          description: "A team of passionate experts combining years of experience in trading, blockchain technology, and financial analysis to offer you the best possible support."
        },
        values: {
          title: "Our Values",
          excellence: {
            title: "Excellence",
            description: "We aim for excellence in every aspect of our service, from <1>technical analysis</1> to <3>customer support</3>."
          },
          innovation: {
            title: "Innovation",
            description: "We are constantly developing new tools and methods to stay at the forefront of crypto investment. Discover our <1>custom algorithms</1>."
          }
        },
        appointment: "Book an appointment with our experts"
      },
      market: {
        title: "Cryptocurrency Market",
        lastUpdate: "Last updated:",
        refresh: "Refresh",
        retry: "Retry",
        error: "Error fetching data",
        crypto: "Crypto",
        price: "Price",
        change24h: "24h %",
        change7d: "7d %",
        marketCap: "Market Cap",
        chart7d: "7 days"
      },
      cryptoEducation: {
        title: "Cryptocurrency Training",
        description: "Discover our complete program to understand and master the world of cryptocurrencies, blockchain, and decentralized finance.",
        learningPath: {
          title: "Learning Path",
          description: "Our training is designed to guide you step by step in understanding cryptocurrencies. Whether you are a beginner or an experienced investor, you will find content adapted to your level.",
          modules: "5 Modules",
          lessons: "20+ Lessons",
          exercises: "Practical Exercises",
          support: "Personalized Support"
        },
        modules: {
          blockchain: {
            title: "Blockchain Fundamentals",
            description: "Understand the basics of blockchain technology and how it works",
            topics: [
              "What is blockchain?",
              "The principles of decentralization",
              "Cryptography and security",
              "The different types of blockchain"
            ]
          },
          cryptocurrencies: {
            title: "Cryptocurrencies",
            description: "Explore the world of cryptocurrencies and their use cases",
            topics: [
              "Bitcoin and its history",
              "Ethereum and smart contracts",
              "The different types of tokens",
              "Wallets and security"
            ]
          },
          technicalAnalysis: {
            title: "Technical Analysis",
            description: "Master the tools of technical analysis for trading",
            topics: [
              "Technical indicators",
              "Chart analysis",
              "Trading patterns",
              "Risk management"
            ]
          },
          defi: {
            title: "DeFi and Decentralized Finance",
            description: "Discover the innovations of decentralized finance",
            topics: [
              "DeFi protocols",
              "Yield farming",
              "Liquidity pools",
              "Stablecoins"
            ]
          },
          security: {
            title: "Security and Best Practices",
            description: "Protect your investments and avoid scams",
            topics: [
              "Securing wallets",
              "Common scams",
              "Portfolio management",
              "Advanced strategies"
            ]
          }
        },
        startModule: "Start this module",
        unlockModule: "Unlock this module",
        cta: {
          title: "Ready to start your training?",
          description: "Join our community of learners and develop your skills in the exciting world of cryptocurrencies.",
          button: "Unlock all modules"
        }
      },
      // Breadcrumb navigation
      breadcrumb: {
        home: 'Home',
        about: 'About',
        team: 'Team',
        support: 'Support',
        values: 'Values',
        solutions: 'Solutions',
        market: 'Market',
        dictionary: 'Dictionary',
        articles: 'Articles',
        training: 'Training',
        understandCrypto: 'Understand Crypto'
      },
      // Navigation and header
      nav: {
        home: 'Home',
        solutions: 'Our Solutions',
        signals: 'Trading Signals',
        training: 'Training',
        about: 'About',
        book_appointment: 'Book Appointment',
        search: 'Search...', 
        noResults: 'No results found',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        dashboard: 'Dashboard',
        // Submenus
        trainingOnly: 'Training Only',
        trainingOnlyDesc: 'Full access to crypto training',
        trainingOnlyPrice: '€249.99/month',
        trainingSignals: 'Training + Signals',
        trainingSignalsDesc: 'Complete training and trading signals',
        trainingSignalsPrice: '€349.99/month',
        popular: 'Popular',
        recommended: 'Recommended',
        understandCrypto: 'Understand Crypto',
        understandCryptoDesc: 'Complete guide on blockchain and cryptocurrencies',
        realTimeMarket: 'Real-time Market',
        realTimeMarketDesc: 'Follow cryptocurrency prices live',
        articles: 'Articles',
        articlesDesc: 'Our latest articles and analyses',
        cryptoDictionary: 'Crypto Dictionary',
        cryptoDictionaryDesc: 'Definitions of essential crypto terms'
      },
      // Authentication
      auth: {
        login: 'Sign In',
        profile: 'Profile',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        register: 'Register',
        loginTitle: 'Login',
        registerTitle: 'Registration',
        loginSubtitle: 'Sign in to your account',
        registerSubtitle: 'Create your account',
        email: 'Email address',
        password: 'Password',
        confirmPassword: 'Confirm password',
        firstName: 'First name',
        lastName: 'Last name',
        phone: 'Phone',
        acceptTerms: 'I accept the',
        termsOfService: 'terms of service',
        and: 'and the',
        privacyPolicy: 'privacy policy',
        alreadyHaveAccount: 'Already have an account?',
        noAccountYet: 'Don\'t have an account yet?',
        authenticationFailed: 'Authentication Failed',
        backToHome: 'Back to Home',
        completingAuthentication: 'Completing Authentication',
        pleaseWait: 'Please wait while we complete your sign-in...',
        dontHaveAccount: 'Don\'t have an account?',
        forgotPassword: 'Forgot password?',
        resetPassword: 'Reset password',
        backToLogin: 'Back to login',
        sendResetLink: 'Send reset link',
        loginWith: 'Sign in with',
        registerWith: 'Sign up with',
        google: 'Google',
        or: 'or',
        validationRequired: 'This field is required',
        validationEmail: 'Please enter a valid email address',
        validationPassword: 'Password must contain at least 8 characters',
        validationPasswordMatch: 'Passwords do not match',
        validationTerms: 'You must accept the terms',
        loginSuccess: 'Login successful!',
        loginError: 'Login error',
        registerSuccess: 'Registration successful!',
        registerError: 'Registration error',
        logout: 'Logout',
        // Additional auth translations for AuthButton
        verificationEmailError: 'Error sending verification email',
        genericError: 'An error occurred',
        verificationCodeError: 'Incorrect verification code',
        googleSignInError: 'An error occurred during Google sign-in',
        emailRequiredError: 'Please enter your email address',
        passwordResetEmailError: 'An error occurred while sending the password reset email',
        emailSent: 'Email Sent',
        resetEmailSentMessage: 'If an account exists with this email address, you will receive a link to reset your password.',
        passwordResetTitle: 'Password Reset',
        passwordResetInstructions: 'Enter your email address and we will send you a link to reset your password.',
        sendingInProgress: 'Sending...', 
        sendResetLinkButton: 'Send Reset Link',
        verificationCodeSentMessage: 'A verification code has been sent to your email address.',
        verificationCodeLabel: 'Verification Code',
        verificationCodePlaceholder: 'Enter the code',
        verifyButton: 'Verify',
        showPassword: 'Show password',
        hidePassword: 'Hide password',
        loading: 'Loading...', 
        signingInProgress: 'Signing in...', 
        continueWithGoogle: 'Continue with Google',
        alreadyRegistered: 'Already registered? Sign in',
        notYetRegistered: 'Not registered yet? Create an account',
        userMenu: 'Menu for {{name}}',
        userMenuFallback: 'User menu',
        profileLabel: 'profile',
        dashboard: 'Dashboard',
        settings: 'Settings',
        signOut: 'Sign Out',
        signInAction: 'Sign In'
      },
      // Generic modals
      modal: {
        close: 'Close',
        closeAria: 'Close'
      },
      // Checkout and payment
      checkout: {
        finalizeSubscription: 'Finalize your subscription',
        monthlyBilling: 'Monthly billing',
        recurringPayment: 'Recurring payment',
        subscriptionDetails: 'Subscription details',
        paymentMethod: 'Payment method',
        cardNumber: 'Card number',
        expiryDate: 'Expiry date',
        cvc: 'CVC',
        cardholderName: 'Cardholder name',
        billingAddress: 'Billing address',
        completePayment: 'Complete payment',
        processing: 'Processing...', 
        paymentSuccess: 'Payment successful',
        paymentError: 'Payment error',
        cancel: 'Cancel',
        securePayment: 'Secure payment',
        total: 'Total'
      },
      // Lesson access modal
      lessonAccessModal: {
        freeLessonTitle: 'Free lesson access',
        premiumContentTitle: 'Premium Content',
        freeLessonDescription: 'Sign up for free to access {{lessonTitle}} and start your learning journey.',
        premiumContentDescription: 'This lesson is reserved for members with an active subscription. Discover our offers to access the complete training.',
        createAccountButton: 'Create free account',
        discoverSubscriptionsButton: 'Discover subscriptions',
        viewSubscriptionsButton: 'View subscriptions',
        laterButton: 'Later'
      },
      // Subscription modals
      subscription: {
        chooseOffer: 'Choose your offer',
        trainingOnly: 'Training Only',
        trainingOnlyDesc: 'Full access to our crypto training',
        trainingOnlyPrice: '€249.99',
        perMonth: '/month',
        trainingSignals: 'Training + Signals',
        trainingSignalsDesc: 'Training + real-time trading signals',
        trainingSignalsPrice: '€349.99',
        mostPopular: 'Most popular',
        selectPlan: 'Select this plan',
        loginRequired: 'Login required',
        loginRequiredDesc: 'You must be logged in to subscribe',
        loginButton: 'Sign in',
        registerButton: 'Create account',
        alreadySubscribed: 'Already subscribed',
        alreadySubscribedDesc: 'You already have an active subscription',
        goToDashboard: 'Go to dashboard',
        features: 'Included features',
        feature1: 'Complete training',
        feature2: 'Premium support',
        feature3: 'Regular updates',
        feature4: 'Trading signals',
        feature5: 'Expert analysis',
        feature6: 'VIP community',
        payWithCard: 'Pay with card',
        payWithPaypal: 'Pay with PayPal',
        processing: 'Processing...', 
        close: 'Close',
        whatIncluded: 'What\'s included?',
        fullAccess: 'Full access to training',
        premiumSupport: 'Premium support',
        regularUpdates: 'Regular updates',
        tradingSignalsAccess: 'Access to trading signals',
        expertAnalysis: 'Expert analysis',
        vipCommunity: 'VIP community',
        monthlyPayment: 'Monthly payment',
        noCommitment: 'No commitment',
        cancelAnytime: 'Cancel anytime'
      },
      // Settings page
      settingsPage: {
        title: 'Account Settings',
        personalInfo: 'Personal Information',
        personalInfoDesc: 'Manage your personal information and preferences',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email address',
        phone: 'Phone',
        language: 'Language',
        french: 'French',
        english: 'English',
        subscriptionInfo: 'Subscription Information',
        subscriptionInfoDesc: 'Manage your subscription and billing',
        currentPlan: 'Current plan',
        nextBilling: 'Next billing',
        amount: 'Amount',
        status: 'Status',
        active: 'Active',
        inactive: 'Inactive',
        manageBilling: 'Manage billing',
        cancelSubscription: 'Cancel subscription',
        security: 'Security',
        securityDesc: 'Your account security settings',
        changePassword: 'Change password',
        currentPassword: 'Current password',
        newPassword: 'New password',
        confirmNewPassword: 'Confirm new password',
        updatePassword: 'Update password',
        twoFactorAuth: 'Two-factor authentication',
        enableTwoFactor: 'Enable two-factor authentication',
        notifications: 'Notifications',
        notificationsDesc: 'Manage your notification preferences',
        emailNotifications: 'Email notifications',
        tradingSignals: 'Trading signals',
        marketUpdates: 'Market updates',
        educationalContent: 'Educational content',
        accountUpdates: 'Account updates',
        pushNotifications: 'Push notifications',
        enablePush: 'Enable push notifications',
        privacy: 'Privacy',
        privacyDesc: 'Control your account privacy',
        profileVisibility: 'Profile visibility',
        dataSharing: 'Data sharing',
        allowDataSharing: 'Allow anonymous usage data sharing',
        deleteAccount: 'Delete account',
        dangerZone: 'Danger zone',
        dangerZoneDesc: 'Irreversible actions concerning your account',
        deleteAccountWarning: 'This action is irreversible. All your data will be permanently deleted.',
        deleteAccountButton: 'Permanently delete my account',
        save: 'Save',
        cancel: 'Cancel',
        saved: 'Saved',
        saving: 'Saving...', 
        error: 'Error',
        success: 'Success',
        updateSuccess: 'Settings updated successfully',
        updateError: 'Error updating settings',
        passwordUpdateSuccess: 'Password updated successfully',
        passwordUpdateError: 'Error updating password',
        validationRequired: 'This field is required',
        validationEmail: 'Invalid email address',
        validationPassword: 'Password must contain at least 8 characters',
        validationPasswordMatch: 'Passwords do not match',
        confirmDeleteTitle: 'Confirm deletion',
        confirmDeleteMessage: 'Are you sure you want to delete your account? This action is irreversible.',
        confirmDelete: 'Yes, delete my account',
        close: 'Close'
      },
      // Hero section
      hero: {
        title: 'Crypto Trading Expert & Investment Training',
        subtitle: 'Optimize your cryptocurrency investments with our expert analysis and personalized support',
        discoverSolutions: 'Discover Our Solutions',
        tradingTraining: 'Trading Training'
      },
      // Features section
      features: {
        title: 'Innovative Crypto Investment Solutions',
        security: {
          title: 'Maximum Security for Crypto Investments',
          description: 'Advanced protection of your assets with multi-factor authentication and enhanced security protocols'
        },
        analysis: {
          title: 'Real-Time Crypto Market Analysis and Tracking',
          description: 'Continuous market surveillance and optimized trading signals to maximize your performance'
        },
        management: {
          title: 'Decentralized Crypto Portfolio Management',
          description: 'Total control of your assets with a decentralized and transparent approach'
        },
        newToCrypto: {
          title: 'New to crypto?',
          description: 'Are you new to the cryptocurrency world or don\'t have a wallet yet? No problem: our team is here to guide you step by step, allowing you to invest serenely, without stress or unpleasant surprises.',
          createAccountSafely: 'Discover how to create an account safely'
        }
      },
      // WhyChooseUs section
      whyChooseUs: {
        title: 'Why Choose Us?',
        subtitle: 'Discover what makes our difference and why investors trust us to guide them in the cryptocurrency universe.',
        completeTraining: {
          title: 'Complete Training',
          content: 'Our comprehensive training guides you step by step through the cryptocurrency universe, from blockchain to advanced investment strategies.'
        },
        marketExpertise: {
          title: 'Expertise in a Complex Market',
          content: 'Our mission is to guide you in a constantly evolving sector, offering you recommendations based on in-depth analysis and proven expertise.'
        },
        scamProtection: {
          title: 'Protection Against Scams',
          content: 'Rigorous project selection and transparent methodology to avoid common pitfalls and guide you towards reliable opportunities.'
        },
        depthAnalysis: {
          title: 'In-Depth Analysis',
          content: 'Daily study of project fundamentals and adaptive strategy to exploit the best market opportunities.'
        },
        startAdventure: 'Start the adventure'
      },
      // Values page
      values: {
        title: 'Our Values',
        description: 'Discover the fundamental values that guide our actions and shape our vision of cryptocurrency investment.',
        meetTeam: 'Meet our team',
        expertsPassionate: 'of passionate experts',
        accessibility: {
          title: 'Accessibility',
          description: 'We are committed to making cryptocurrency investment accessible to everyone, by offering solutions adapted to each investor profile and simplifying complex concepts. Discover our <a href=\'/solutions\'>tailored investment solutions</a>.'
        },
        education: {
          title: 'Education',
          description: 'Our mission is to educate and support our clients in their investment journey, by providing quality educational resources and personalized support. Explore our <a href=\'/knowledge\'>training center</a> and our <a href=\'/articles\'>educational articles</a>.'
        },
        environment: {
          title: 'Environment',
          description: 'We are aware of the environmental impact of the crypto sector and favor solutions and partners committed to an eco-responsible approach. Check our <a href=\'/about\'>vision</a> to learn more about our commitment.'
        },
        confidentiality: {
          title: 'Confidentiality',
          description: 'Data protection and client confidentiality are at the heart of our concerns. We apply the highest standards of security and information protection. Discover our dedicated <a href=\'/support\'>client support</a>.'
        },
        ourCommitment: 'Our Commitment',
        commitmentText: 'At Alyah Knowledge, we believe that cryptocurrency investment should be accessible, educational and responsible. Our values guide each of our actions and allow us to build a lasting relationship of trust with our clients.',
        bookAppointment: 'Book an appointment',
        expertAdvice: 'with our experts to learn more',
        discoverSolutions: 'Discover our investment solutions'
      },
      // Support page
      support: {
        title: 'Support',
        description: 'Contact the Alyah Knowledge team for any questions or assistance. We are here to help you.',
        pageTitle: 'Support',
        pageSubtitle: 'Our team is here to help you. Fill out the form below and we will respond to you as soon as possible.',
        form: {
          nameLabel: 'Full Name',
          namePlaceholder: 'Your name',
          emailLabel: 'Email',
          emailPlaceholder: 'your@email.com',
          subjectLabel: 'Subject',
          subjectPlaceholder: 'The subject of your message',
          messageLabel: 'Message',
          messagePlaceholder: 'Describe your request in detail...', 
          submitButton: 'Send Message',
          submitting: 'Sending...' 
        },
        messages: {
          success: 'Your message has been sent successfully. We will respond to you as soon as possible.',
          error: 'An error occurred while sending the message. Please try again later.'
        },
        email: {
          subject: 'New Alyah support request: {{subject}}'
        }
      },
      // FAQ page
      faq: {
        title: 'Frequently Asked Questions about Crypto Investment',
        description: 'Quickly find answers to your questions about crypto investment and our services.',
        personalizedAssistance: 'For personalized assistance,',
        bookAppointment: 'book an appointment',
        withExperts: 'with our experts',
        notFoundAnswer: 'Didn\'t find the answer to your question?',
        contactSupport: 'Contact Support',
        bookAppointmentBtn: 'Book Appointment',
        items: {
          q1: {
            question: 'What is Alyah Knowledge?',
            answer: 'Alyah Knowledge is an expert crypto investment platform that combines training, trading signals and personalized support. Our mission is to make cryptocurrency investment accessible, secure and profitable for everyone. Discover our story and vision on our <a href="/about" class="text-blue-600 hover:text-blue-800">About page</a>.'
          },
          q2: {
            question: 'How to start investing with Alyah Knowledge?',
            answer: 'To get started, we recommend checking our <a href="/solutions#monthly" class="text-blue-600 hover:text-blue-800">subscription offers</a>, starting with our 1-month package that includes basic training and trading signals on major cryptocurrencies. You can also <a href="/appointment" class="text-blue-600 hover:text-blue-800">book an appointment</a> for a personalized consultation with our experts.'
          },
          q3: {
            question: 'How does your trading training work?',
            answer: 'Our <a href="/knowledge/crypto" class="text-blue-600 hover:text-blue-800">trading training</a> combines online resources, interactive webinars and personalized support. You progress at your own pace with structured modules, practical exercises, and access to our learning community. Check our <a href="/knowledge" class="text-blue-600 hover:text-blue-800">resource center</a> for more information.'
          },
          q4: {
            question: 'What are your different services?',
            answer: 'We offer a complete range of services including <a href="/solutions" class="text-blue-600 hover:text-blue-800">optimized trading signals</a>, crypto trading training, detailed market analysis, and personalized support. Discover our <a href="/solutions#custom" class="text-blue-600 hover:text-blue-800">tailor-made solutions</a> adapted to all levels.'
          },
          q5: {
            question: 'How to track crypto market evolution?',
            answer: 'You can follow market evolution in real-time on our <a href="/market" class="text-blue-600 hover:text-blue-800">Market page</a>. We also provide regular analysis in our <a href="/articles" class="text-blue-600 hover:text-blue-800">Articles</a> section to keep you informed of the latest trends.'
          },
          q6: {
            question: 'Who are the experts behind Alyah Knowledge?',
            answer: 'Our <a href="/team" class="text-blue-600 hover:text-blue-800">expert team</a> is composed of passionate crypto trading professionals, led by Jordan Chekroun, CEO and founder. Each member brings their unique expertise to provide you with the best possible support.'
          },
          q7: {
            question: 'How to contact support?',
            answer: 'Our support team is available via our <a href="/support" class="text-blue-600 hover:text-blue-800">assistance page</a>. Premium subscribers benefit from 24/7 priority support and direct access to our experts. Don\'t hesitate to contact us for any questions.'
          },
          q8: {
            question: 'Which cryptocurrencies are covered?',
            answer: 'We cover major cryptocurrencies like Bitcoin and Ethereum, as well as a selection of promising altcoins. Check our <a href="/market" class="text-blue-600 hover:text-blue-800">Market page</a> to see the cryptocurrencies we currently track.'
          }
        }
      },
      // Footer
      footer: {
        support: 'Support',
        values: 'Our values',
        privacy_policy: 'Privacy Policy',
        terms_of_use: 'Terms of Use',
        corporate_policy: 'Corporate Policy',
        articles: 'Articles',
        glossary: 'Dictionary',
        assistance: 'Support',
        faq: 'FAQ',
        privacy: 'Privacy',
        privacyPolicy: 'Privacy Policy',
        terms: 'Terms of use',
        termsOfService: 'Terms of Service',
        companyPolicy: 'Company Policy',
        dictionary: 'Dictionary',
        copyright: 'Copyright © {year} Alyah Knowledge Investment. All rights reserved.'
      },
      // Cookie consent
      cookie: {
        title: 'Cookies & Privacy',
        message: 'We use cookies to improve your experience and analyze our site traffic. By continuing to browse, you accept our use of cookies.',
        deny: 'Deny',
        accept: 'Accept'
      },
      // Home page
      home: {
        hero: {
          title: 'Crypto Trading Expert & Investment Training',
          description: 'Optimize your cryptocurrency investments with our expert analysis and personalized support',
          button: 'Discover Our Solutions'
        },
        why_choose_us: {
          title: 'Why Choose Us?',
          description: 'Discover what makes our difference and why investors trust us to guide them in the cryptocurrency universe.',
          complete_training: {
            title: 'Complete Training'
          },
          expert_market: {
            title: 'Expertise in a Complex Market'
          },
          scam_protection: {
            title: 'Protection Against Scams'
          },
          deep_analysis: {
            title: 'In-Depth Analysis'
          }
        },
        new_crypto: {
          title: 'New to crypto?',
          description: 'You\'re in the right place. Learn step by step the fundamentals of cryptocurrencies with our comprehensive training.'
        }
      },
      // Solutions page
      solutions: {
        title: 'Our Investment Solutions',
        description: 'Discover our tailor-made solutions to invest intelligently in cryptocurrencies, adapted to your objectives and experience.',
        plans: {
          title: 'Our Subscription Plans',
          description: 'Choose the plan that best matches your investment needs and objectives'
        },
        plan: {
          training_only: {
            name: 'Training Only'
          },
          training_signals: {
            name: 'Training + Signals'
          },
          subscribe: 'Subscribe Now'
        },
        // FAQ section
        faq: {
          items: {
            security: {
              question: 'How to secure my cryptocurrency investments?',
              answer: 'At Alyah Knowledge, we use advanced security protocols and robust infrastructure to protect your investments. We recommend two-factor authentication, secure private key storage, and we train you in security best practices.'
            },
            signals: {
              question: 'What are the advantages of Alyah Knowledge trading signals?',
              answer: 'Our trading signals are generated by sophisticated algorithms and validated by experts. They include precise entry and exit points, stop-loss levels, and are accompanied by detailed analysis to maximize your chances of success.'
            },
            beginners: {
              question: 'How to start investing in cryptocurrencies?',
              answer: 'To get started, we recommend our Training Only plan which includes comprehensive training, educational resources, and personalized support to understand market fundamentals.'
            },
            plans: {
              question: 'What is the difference between your different plans?',
              answer: 'Our Training Only plan gives you access to all our educational content, while the Training + Signals plan adds access to our trading signals on all available cryptocurrencies, without limitation.'
            },
            support: {
              question: 'Do you offer personalized support?',
              answer: 'Yes, all our plans include support adapted to your needs. The Training Only plan includes email support, while the Training + Signals plan offers priority support.'
            }
          }
        },
        // Security features section
        features: {
          security: {
            title: 'Maximum Security',
            description: 'Your investments are secured through our robust infrastructure and advanced security protocols.'
          },
          performance: {
            title: 'Optimized Performance',
            description: 'Our algorithm continuously analyzes markets to identify the best investment opportunities.'
          },
          control: {
            title: 'Total Control',
            description: 'Keep total control of your assets while benefiting from our expertise and tools.'
          }
        },
        // Subscription plans details
        subscriptions: {
          formationSeule: {
            title: 'Training Only',
            price: '€249.99',
            period: '/month',
            description: 'Learn at your own pace',
            buttonText: 'Subscribe Now',
            features: {
              fullAccess: {
                text: 'Full access to crypto training: ',
                highlight: 'All modules'
              },
              resources: {
                text: 'Educational resources: ',
                highlight: 'Videos and PDFs'
              },
              community: {
                text: 'Community access: ',
                highlight: 'Forum and discussions'
              },
              support: {
                text: 'Support: ',
                highlight: 'Standard email'
              },
              updates: {
                text: 'Updates: ',
                highlight: 'Access to new content'
              },
              tradingSignals: {
                text: 'Trading signals',
                highlight: 'Not included'
              }
            }
          },
          formationEtSignaux: {
            name: 'Training + Signals',
            title: 'Training + Signals',
            price: '€349.99',
            period: '/month',
            description: 'Learn and act immediately',
            buttonText: 'Subscribe Now',
            recommended: 'Recommended',
            features: {
              included: {
                text: 'Everything included in: ',
                highlight: 'Training Only'
              },
              tradingSignals: {
                text: 'Trading signals: ',
                highlight: 'All cryptos'
              },
              marketCoverage: {
                text: 'Market coverage: ',
                highlight: 'Unlimited'
              },
              prioritySupport: {
                text: 'Support: ',
                highlight: 'Priority'
              },
              marketAnalysis: {
                text: 'Market analysis: ',
                highlight: 'Weekly'
              },
              advancedStrategies: {
                text: 'Advanced strategies: ',
                highlight: 'Full access'
              }
            },
            marketCoverage: {
              title: 'Complete market coverage:'
            }
          }
        },
        subscribeAriaLabel: 'Subscribe to {{planName}}'
      },
      // Trading Signals page
      signauxTrading: {
        title: 'Crypto Trading Signals Transmission',
        subtitle: 'Optimize your performance with our algorithm-generated trading signals validated by experts.',
        howItWorks: {
          title: 'How do our signals work?',
          subtitle: 'A simple and efficient 4-step process',
          steps: {
            generation: {
              title: 'Signal Generation',
              description: 'Our algorithm analyzes the market and generates a signal in real-time.'
            },
            transmission: {
              title: 'Instant Transmission',
              description: 'The signal is immediately sent to your user space.'
            },
            notification: {
              title: 'Email Notification',
              description: 'You receive an email containing all signal details.'
            },
            execution: {
              title: 'Automatic Execution',
              description: 'Your order is automatically executed according to your parameters',
              note: 'Automatic execution requires linking a signal webhook to the target exchange. Without this configuration, the received signal must be executed manually by accessing the exchange to place the trade.'
            }
          }
        },
        mobileReception: {
          title: 'Receiving signals on your mobile',
          inbox: 'Inbox',
          edit: 'Edit',
          features: {
            realTime: {
              title: 'Real-time signals',
              description: 'Receive alerts on your mobile the instant our algorithms detect a profitable opportunity'
            },
            completeDetails: {
              title: 'Complete details',
              description: 'Each signal includes entry price, stop-loss and take-profit levels for optimal risk management'
            },
            performance: {
              title: 'Performance tracking',
              description: 'View your transaction history and receive notifications on realized profits'
            }
          },
          instantNotifications: 'Instant notifications to never miss an opportunity'
        },
        performance: {
          title: 'Performance tracking and results',
          transactionHistory: 'Transaction history',
          statistics: 'Statistics and performance',
          stats: {
            totalSignals: 'Total signals',
            successRate: 'Success rate',
            averageGain: 'Average gain',
            totalPerformance: 'Total performance'
          },
          months: {
            jan: 'Jan',
            feb: 'Feb',
            mar: 'Mar',
            apr: 'Apr',
            may: 'May',
            jun: 'Jun'
          },
          actionTypes: {
            buy: 'BUY',
            sell: 'SELL'
          },
          takeProfit: 'Take profit',
          stopLoss: 'Stop loss'
        },
        newToCrypto: {
          title: 'New to crypto?',
          description: 'Are you new to the cryptocurrency world or don\'t have a portfolio yet? No worries: our team is here to guide you step by step, allowing you to invest serenely, without stress or unpleasant surprises.',
          cta: 'Learn how to create an account safely'
        },
        finalCta: {
          title: 'Ready to optimize your crypto investments?',
          description: 'Join our investor community and receive our trading signals today',
          startNow: 'Start now',
          contactUs: 'Contact us'
        }
      },
      // Appointment page
      appointment: {
        title: 'Book an Appointment',
        subtitle: 'Schedule a personalized consultation with our expert',
        confirmation: {
          title: 'Appointment confirmed!',
          message: 'Thank you for your request. You will soon receive a confirmation email.'
        },
        calendar: {
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          availableSlots: 'Available slots for {{date}}'
        },
        form: {
          firstName: 'First Name',
          lastName: 'Last name',
          email: 'Email',
          phone: 'Phone',
          message: 'Message (optional)',
          phoneNumber: 'Number',
          confirmAppointment: 'Confirm Appointment',
          sending: 'Sending...', 
          required: '*'
        },
        validation: {
          firstNameRequired: 'First name is required',
          lastNameRequired: 'Last name is required',
          emailRequired: 'Email is required',
          emailInvalid: 'Invalid email',
          phoneRequired: 'Phone is required',
          dateRequired: 'Please select a date',
          timeRequired: 'Please select a time',
          submitError: 'An error occurred while sending the form.'
        }
      },
      
      // Payment and subscription components
      payment: {
        // SubscriptionCard
        recommended: 'Recommended',
        perMonth: '/month',
        subscribeNow: 'Subscribe Now',
        subscriptionPlans: {
          formationSeule: {
            name: 'Training Only',
            price: '€249.99',
            description: 'Learn at your own pace',
            features: {
              fullAccess: {
                text: 'Full access to crypto training: ',
                highlight: 'All modules'
              },
              resources: {
                text: 'Educational resources: ',
                highlight: 'Videos and PDFs'
              },
              community: {
                text: 'Community access: ',
                highlight: 'Forum and discussions'
              },
              support: {
                text: 'Support: ',
                highlight: 'Standard email'
              },
              updates: {
                text: 'Updates: ',
                highlight: 'Access to new content'
              },
              tradingSignals: {
                text: 'Trading signals',
                highlight: 'Not included'
              }
            }
          },
          formationEtSignaux: {
            name: 'Training + Signals',
            title: 'Training + Signals',
            price: '€349.99',
            period: '/month',
            description: 'Learn and act immediately',
            buttonText: 'Subscribe Now',
            recommended: 'Recommended',
            features: {
              included: {
                text: 'Everything included in: ',
                highlight: 'Training Only'
              },
              tradingSignals: {
                text: 'Trading signals: ',
                highlight: 'All cryptos'
              },
              marketCoverage: {
                text: 'Market coverage: ',
                highlight: 'Unlimited'
              },
              prioritySupport: {
                text: 'Support: ',
                highlight: 'Priority'
              },
              marketAnalysis: {
                text: 'Market analysis: ',
                highlight: 'Weekly'
              },
              advancedStrategies: {
                text: 'Advanced strategies: ',
                highlight: 'Full access'
              }
            },
            marketCoverage: {
              title: 'Complete market coverage:'
            }
          }
        },
        subscribeAriaLabel: 'Subscribe to {{planName}}',
        includesAccess: 'All our subscriptions include complete access to our learning platform, regular updates and dedicated customer support.',
        cancellationPolicy: 'You can cancel your subscription at any time. Terms and conditions apply.',
        // PaymentSection
        paymentMethods: {
          card: {
            name: 'Credit Card',
            description: 'Secure payment by Visa or Mastercard'
          },
          crypto: {
            name: 'USDT',
            description: 'Payment in USDT (Tether) stablecoin'
          }
        },
        comingSoon: 'Coming soon',
        payAmount: 'Pay {{amount}}',
        processing: 'Processing...', 
        loginRequired: 'Please log in to continue',
        paymentError: 'An error occurred during payment',
        usdtPaymentError: 'An error occurred during USDT payment',
        // UserSubscriptionInfo
        subscription: {
          title: 'Subscription',
          yourSubscription: 'Your subscription',
          noActiveSubscription: 'You don\'t have an active subscription. Discover our offers to access all our premium content.',
          viewSubscriptions: 'View subscriptions',
          status: 'Status',
          active: 'Active',
          amount: 'Amount',
          startDate: 'Start date',
          nextRenewal: 'Next renewal',
          autoRenewal: 'Auto renewal',
          enabled: 'enabled',
          disabled: 'disabled',
          planNames: {
            formationSeule: 'Training Only',
            formationEtSignaux: 'Training + Signals'
          },
          error: 'An error occurred while retrieving your subscription.',
          defaultName: 'Subscription'
        }
      },
      
      // Team page
      team: {
        // Page meta
        title: 'Our Team',
        description: 'Meet the team of passionate experts from Alyah Knowledge',
        
        // Values
        values: {
          integrity: 'Integrity',
          excellence: 'Excellence',
          innovation: 'Innovation',
          transparency: 'Transparency',
          trust: 'Trust',
          performance: 'Performance',
          expertise: 'Expertise',
          benevolence: 'Benevolence',
          engagement: 'Engagement',
          collaboration: 'Collaboration',
          adaptability: 'Adaptability',
          resilience: 'Resilience',
          proactivity: 'Proactivity',
          authenticity: 'Authenticity',
          responsibility: 'Responsibility',
          creativity: 'Creativity',
          determination: 'Determination',
          passion: 'Passion',
          ambition: 'Ambition',
          leadership: 'Leadership',
          synergy: 'Synergy',
          dynamism: 'Dynamism',
          perseverance: 'Perseverance',
          vision: 'Vision',
          audacity: 'Audacity',
          ethics: 'Ethics',
          agility: 'Agility',
          cohesion: 'Cohesion',
          growth: 'Growth',
          professionalExcellence: 'Professional Excellence'
        },
        
        // Jordan Chekroun section
        jordan: {
          name: 'Jordan Chekroun',
          title: 'CEO & Founder of Alyah Knowledge',
          shortBio: 'Legal background by training, developer by passion, and expert in cryptocurrency trading. My vision: make cryptocurrency investment accessible, secure and profitable.',
          journey: {
            title: 'My Journey',
            paragraph1: 'Deeply convinced of the exceptional potential of blockchain, I am convinced that it is essential to clearly understand its mechanisms so that everyone can assess the opportunities and actively participate in this rapidly expanding ecosystem.',
            paragraph2: 'Driven by intense curiosity and a pronounced taste for innovation, I expanded my legal skills by learning to code and design sophisticated trading algorithms. My goal was clear: to create a reliable, mathematically sound solution, adapted to the extreme volatility of crypto markets, while transmitting my knowledge through training accessible to all, allowing everyone to evolve serenely and make the most of the opportunities in this sector.',
            paragraph3: 'This approach stems directly from significant personal experiences. At the beginning, faced with a brutal and unexpected market reversal, I lost a significant part of my investment in just a few hours. Conversely, I have also experienced rapid successes and significant gains by accurately anticipating market movements. These contrasting experiences taught me the paramount importance of rigorous risk management and a clearly structured methodology.',
            paragraph4: 'At Alyah Knowledge, every aspect of our strategy is designed to anticipate and best control the risks inherent in the crypto market. We offer our investors transparent support, proven technology, and continuous education to evolve serenely in a complex and volatile environment.',
            paragraph5: 'As CEO, I favor leadership based on benevolence, integrity and operational excellence. I am convinced that in-depth analysis combined with a methodical strategy is the key to successful long-term investment.',
            paragraph6: 'My ambition with Alyah Knowledge is twofold: on one hand, to democratize this exciting technology so that everyone can understand the stakes and fully engage in it, and on the other hand, to allow investors, beginners as well as experienced, to generate profits by diversifying their portfolios with promising digital assets, and thus become full players in this new financial ecosystem that continues to structure and grow.'
          }
        },
        
        // Yoann Hadjadj section
        yoann: {
          name: 'Yoann Hadjadj',
          title: 'Partner, Management and Financial Flow Manager',
          bio: {
            paragraph1: 'My name is Yoann Hadjadj, and I am passionate about the alliance between operational expertise, leadership and innovation. My journey, both diverse and enriching, has allowed me to develop an ability to adapt and excel in demanding and constantly evolving environments.',
            paragraph2: 'Graduate with a bachelor\'s degree and driven by insatiable curiosity, I have built my expertise through various and complementary training: team management, sales coaching, psychosocial risk management, mastery of financial flow procedures, HACCP certification and advanced sales management strategies. These skills have allowed me to adopt a holistic and methodical approach, adapted to dynamic and competitive sectors.',
            paragraph3: 'With more than 15 years of experience in the restaurant sector, I now head a large group, where I supervise an annual turnover of more than 7.5 million euros. Leading a team of more than 80 employees, I have learned to balance managerial rigor, process optimization and financial performance. My approach to leadership is based on benevolence and the ability to unite talents, which, I believe, contributes to the operational and strategic success of the company.',
            paragraph4: 'For more than five years, I have been closely interested in the world of cryptocurrencies and blockchain. Fascinated by the disruptive potential of this technology, I have undertaken an in-depth and methodical exploration of this booming market. Far from being content with simple curiosity, I trained rigorously, studying the complex mechanisms of cryptocurrencies, analyzing market trends, assessing risks and identifying opportunities.',
            paragraph5: 'Over the years, I have audited numerous companies and projects, taking the time to understand their workings, their strengths and their weaknesses. This approach has allowed me to develop solid expertise and surround myself with two recognized experts in the field. Together, we explore the opportunities offered by this innovative sector, applying the principles of rigor, strategy and management that have guided my journey.',
            paragraph6: 'As Partner Manager and Financial Flow Manager, I leverage my mastery of financial flows and my ability to manage multidisciplinary teams to contribute to the success of the projects I support. I firmly believe in the importance of integrity and innovation, and I strive to anticipate challenges to transform obstacles into opportunities.'
          }
        },
        
        // Julien Ribardière section
        julien: {
          name: 'Julien Ribardière',
          title: 'Partner, Community Manager & Media Watch Expert',
          bio: {
            paragraph1: 'With more than 20 years of experience in digital and communication, I have always chosen to invest in meaningful projects, guided by strong values such as benevolence, transparency and seriousness. Today, I am proud to be part of Alyah Knowledge, a company that embodies these principles and with which I share a common vision.',
            paragraph2: 'As Community Manager and Media Watch Expert, my role is to ensure that each communication faithfully reflects the reality of our company. I firmly believe that transparency, honest sharing and balanced presentation of our assets as well as our challenges are essential to build a relationship of trust with our clients and investors.',
            paragraph3: 'My expertise in content strategies and targeted advertising campaigns (Facebook, X, Instagram, TikTok, etc.) allows me to create engaging and impactful interactions. But what motivates me above all is the constant search for excellence. I never hesitate to seek feedback to continuously improve our processes and results, always in a spirit of listening and collaboration.',
            paragraph4: 'At Alyah Knowledge, I am committed to building clear, sincere communication aligned with our values. My goal is to create an open and authentic dialogue with our community, in order to strengthen trust in our project.',
            testimonial: 'Having Julien Ribardière by our side is a real asset for Alyah Knowledge. His expertise, professional ethics and commitment to excellence make him an indispensable asset for our growth and our success.'
          }
        },
        
        // Vision section
        vision: {
          title: 'Our Common Vision',
          security: {
            title: 'Security & Compliance',
            description: 'A rigorous approach combining legal and technological expertise.'
          },
          performance: {
            title: 'Performance & Innovation',
            description: 'Innovative strategies for optimal performance.'
          },
          trust: {
            title: 'Transparency & Trust',
            description: 'Clear and authentic communication with our community.'
          }
        }
      },
      
      // Global error messages and error pages
      errors: {
        generic: 'An error occurred',
        networkError: 'Network connection error',
        serverError: 'Server error',
        unauthorized: 'Unauthorized access',
        forbidden: 'Access forbidden',
        notFound: 'Page not found',
        validation: 'Validation error',
        tryAgain: 'Please try again',
        goHome: 'Go home',
        contactSupport: 'Contact support',
        loadingError: 'Loading Error',
        loadingErrorMessage: 'An error occurred while loading the application.',
        reloadPage: 'Reload Page',
        errorDetailsLabel: 'Error details (dev only)',
        pageNotFoundTitle: 'Page not found',
        pageNotFoundMessage: 'The page you are looking for does not exist or has been moved.',
        home: 'Home',
        dictionary: 'Dictionary',
        articles: 'Articles',
        popularResources: 'Popular Resources',
        completeTraining: 'Complete crypto training',
        realTimeMarket: 'Real-time market',
        whatIsBitcoin: 'What is Bitcoin?',
        tradingSignals: 'Trading signals'
      },
      // Mission component (History and Vision)
      mission: {
        title: "The History and Vision of Alyah Knowledge in Crypto Investment",
        paragraph1: "The name 'Alyah Knowledge Crypto Investment' symbolizes a true ascension towards mastering new financial technologies. The term 'Alyah' evokes the idea of rise, elevation, illustrating the progression towards new heights both financially and in terms of understanding.",
        paragraph2: "The advent of blockchain technology and cryptocurrencies represents a major revolution in the investment world. This technology, while offering enormous opportunities, requires time, rigor and considerable personal investment to be truly mastered.",
        missionTitle: "Our Mission in the Crypto Ecosystem",
        missionText: "Alyah Knowledge positions itself as a trusted companion, a true GPS that guides investors in their choices, minimizing risks and providing them with informed advice. We help everyone navigate this complex and constantly evolving universe, combining expertise and education.",
        conclusion: "Our project embodies both the aspiration for growth in skills and wealth, and the conviction that true success comes from the alliance of knowledge and investment in time and money."
      },
      createAccount: {
        seo: {
          title: 'Create an Alyah Knowledge Account | Training and Trading',
          description: 'Sign up for free to access our crypto training, trading tools and exclusive market analysis.'
        },
        backToSignals: 'Back to trading signals',
        title: 'Create your crypto account safely',
        importantInfo: {
          title: 'Important information',
          description: 'Alyah Knowledge is a platform dedicated to supporting and training cryptocurrency investors. We do not offer cryptocurrencies and have no partnership with trading platforms. Our role is solely to guide you in your investment journey.'
        },
        steps: {
          title: 'Steps to get started',
          step1: {
            title: '1. Choose a secure trading platform',
            item1: 'Check the platform\'s reputation and history',
            item2: 'Make sure it is regulated in your country',
            item3: 'Compare transaction fees',
            item4: 'Evaluate the ease of use of the interface'
          },
          step2: {
            title: '2. Create and secure your account',
            item1: 'Use a dedicated email address',
            item2: 'Create a strong and unique password',
            item3: 'Enable two-factor authentication (2FA)',
            item4: 'Keep your credentials in a safe place'
          },
          step3: {
            title: '3. Verify your identity (KYC)',
            item1: 'Prepare your identity documents',
            item2: 'Follow the verification procedure',
            item3: 'Wait for your account validation'
          }
        },
        help: {
          title: 'Need help?',
          description: 'Our team is here to support you at every step of your journey. Feel free to contact us for any questions or personalized advice.',
          contactButton: 'Contact our support'
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export function setLanguage(lang: 'fr' | 'en') {
  i18n.changeLanguage(lang);
  localStorage.setItem('language', lang);
}

export default i18n;
