import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, TrendingUp, Wallet, Clock, AlertTriangle, Shield } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function YieldFarming() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-15');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Yield Farming Crypto | Générer des Revenus Passifs"
        description="Comprenez les mécanismes du yield farming et apprenez à maximiser vos rendements sur les protocoles DeFi."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/yield-farming"
      />

      <CourseSchema
        name="Le Yield Farming"
        description="Optimisez vos rendements avec les stratégies de yield farming en DeFi. Module premium de formation crypto."
        isAccessibleForFree={false} // This is already false, no change needed here.
        cssSelector=".bg-white.rounded-2xl.shadow-sm"
      />
      
      {/* Navigation */}
      <Link
        to="/knowledge/crypto"
        className="inline-flex items-center text-gray-600 hover:text-blue-600 
          transition-colors duration-200 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Retour aux modules
      </Link>

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl
          bg-gradient-to-br from-green-600 to-emerald-600 text-white mb-6">
          <DollarSign className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Le Yield Farming
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Optimisez vos rendements avec les stratégies de yield farming en DeFi
        </p>
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full
          bg-gray-100 text-gray-600 text-sm">
          <Clock className="w-4 h-4 mr-2" />
          Temps de lecture : 20 minutes
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                Le <strong>yield farming</strong> est une stratégie d'investissement DeFi qui 
                consiste à maximiser les rendements en fournissant des liquidités à différents 
                protocoles. Cette pratique permet d'obtenir des récompenses sous forme de tokens 
                de gouvernance et de frais de transaction.
              </p>
            </div>

            {/* Principes de base */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
              Les principes de base
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Liquidité</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Fourniture de tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Paires de trading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>LP tokens</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Récompenses</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Tokens de gouvernance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Frais de trading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Bonus incitatifs</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Stratégies de yield farming */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Wallet className="h-6 w-6 text-purple-600" />
              Les stratégies de yield farming
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Liquidity Mining</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Pools de liquidité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Récompenses en tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>APY variable</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lending</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Prêts de tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Intérêts composés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Tokens d'intérêt</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Staking</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Verrouillage de tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Récompenses fixes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Gouvernance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Optimisation des rendements */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              Optimisation des rendements
            </h2>

            <div className="bg-blue-50 p-6 rounded-xl mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Diversification</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Répartition entre différents protocoles</li>
                    <li>• Mix de stratégies</li>
                    <li>• Gestion des risques</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Composabilité</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Utilisation de plusieurs protocoles</li>
                    <li>• Effet de levier</li>
                    <li>• Optimisation des gas fees</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Calcul des rendements */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-600" />
              Calcul des rendements
            </h2>

            <div className="bg-green-50 p-6 rounded-xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">APY vs APR</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• APR : rendement annuel simple</li>
                    <li>• APY : rendement composé</li>
                    <li>• Impact de la fréquence</li>
                    <li>• Volatilité des récompenses</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Facteurs à considérer</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Frais de transaction</li>
                    <li>• Impermanent loss</li>
                    <li>• Prix des tokens</li>
                    <li>• Durée de lock</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Risques */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              Risques du yield farming
            </h2>

            <div className="bg-red-50 p-6 rounded-xl mb-12">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-red-600">1.</span>
                  <span>Impermanent loss dans les pools de liquidité</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-red-600">2.</span>
                  <span>Risques de smart contracts et hacks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-red-600">3.</span>
                  <span>Volatilité des tokens de récompense</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-red-600">4.</span>
                  <span>Risques de liquidation avec effet de levier</span>
                </li>
              </ul>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                Le yield farming offre des opportunités intéressantes de rendement dans 
                l'écosystème DeFi, mais nécessite une bonne compréhension des mécanismes 
                et des risques. Une approche diversifiée et prudente est recommandée pour 
                optimiser ses investissements.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons en détail le fonctionnement des 
                pools de liquidité et leur rôle dans l'écosystème DeFi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-13"
          className="flex items-center justify-center px-4 py-3 rounded-xl bg-gray-100
            text-gray-700 font-medium transition-all duration-200 hover:bg-gray-200
            text-sm sm:text-base sm:px-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2 flex-shrink-0" />
          <span className="whitespace-nowrap">Module précédent</span>
        </Link>
        <button
          onClick={() => setShowQuiz(true)}
          className="flex items-center justify-center px-4 py-3 rounded-xl 
            bg-gradient-to-r from-blue-600 to-purple-600 text-white
            font-medium transition-all duration-200 hover:from-blue-700 
            hover:to-purple-700 transform hover:-translate-y-1
            text-sm sm:text-base sm:px-6"
        >
          <span className="whitespace-nowrap">Module suivant</span>
          <ArrowLeft className="h-5 w-5 ml-2 rotate-180 flex-shrink-0" />
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {showQuiz ? (
          <ModuleQuiz
            onComplete={handleQuizComplete}
            onRetry={() => setShowQuiz(false)}
            onBack={() => setShowQuiz(false)}
            nextModuleId="module-15"
            currentModuleId="module-14"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}