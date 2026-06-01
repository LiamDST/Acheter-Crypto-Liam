import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, Ban as Bank, Coins, Clock, DollarSign } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function DefiProtocols() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-14');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Protocoles DeFi | Comprendre la Finance Décentralisée"
        description="Explorez les principaux protocoles DeFi, leur fonctionnement et les opportunités d’investissement qu’ils offrent."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/protocoles-defi"
      />

      <CourseSchema
        name="Les Protocoles DeFi"
        description="Découvrez les fondamentaux de la finance décentralisée et ses applications. Module premium de formation crypto."
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
          bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-6">
          <Bank className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Les Protocoles DeFi
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Découvrez les fondamentaux de la finance décentralisée et ses applications
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
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                La <strong>Finance Décentralisée (DeFi)</strong> représente une révolution dans 
                le monde financier en permettant l'accès à des services financiers sans 
                intermédiaires traditionnels. Les protocoles DeFi utilisent les smart contracts 
                pour automatiser les opérations financières.
              </p>
            </div>

            {/* Qu'est-ce que la DeFi ? */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Bank className="h-6 w-6 text-blue-600" />
              Qu'est-ce que la DeFi ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Principes fondamentaux</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Décentralisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Transparence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Accessibilité</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Avantages</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Sans permission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Programmable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Composable</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Types de protocoles DeFi */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Wallet className="h-6 w-6 text-purple-600" />
              Les principaux types de protocoles DeFi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">DEX</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Uniswap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>SushiSwap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>PancakeSwap</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lending</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Aave</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Compound</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>MakerDAO</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Yield</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Yearn Finance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Curve Finance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Convex Finance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Fonctionnement des DEX */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Coins className="h-6 w-6 text-green-600" />
              Fonctionnement des DEX
            </h2>

            <div className="bg-green-50 p-6 rounded-xl mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Automated Market Maker (AMM)</h3>
                  <p className="text-gray-700">Les DEX utilisent des pools de liquidité et des formules mathématiques pour déterminer les prix.</p>
                  <ul className="mt-2 space-y-2 text-gray-700">
                    <li>• Pools de liquidité</li>
                    <li>• Formule x * y = k</li>
                    <li>• Slippage et impact prix</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Fournisseurs de liquidité</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Dépôt de paires de tokens</li>
                    <li>• Récompenses en LP tokens</li>
                    <li>• Partage des frais de trading</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Lending et Borrowing */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-blue-600" />
              Lending et Borrowing
            </h2>

            <div className="bg-blue-50 p-6 rounded-xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Prêts</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Dépôt de collatéral</li>
                    <li>• Taux d'intérêt variables</li>
                    <li>• Tokens d'intérêt (aTokens)</li>
                    <li>• Liquidation automatique</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Emprunts</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Ratio de collatéralisation</li>
                    <li>• Taux d'emprunt</li>
                    <li>• Risques de liquidation</li>
                    <li>• Utilisation du levier</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Risques et considérations */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-red-600" />
              Risques et considérations
            </h2>

            <div className="bg-red-50 p-6 rounded-xl mb-12">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-red-600">1.</span>
                  <span>Risques de smart contracts (bugs, hacks)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-red-600">2.</span>
                  <span>Risques de liquidation dans les protocoles de prêt</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-red-600">3.</span>
                  <span>Impermanent loss dans les pools de liquidité</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-red-600">4.</span>
                  <span>Risques de gouvernance et de centralisation</span>
                </li>
              </ul>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                Les protocoles DeFi représentent une innovation majeure dans le monde de la 
                finance, offrant des services financiers accessibles et transparents. Cependant, 
                il est crucial de bien comprendre les risques et les mécanismes avant de s'y 
                engager.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons le yield farming et les stratégies 
                pour optimiser les rendements en DeFi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-12"
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
            nextModuleId="module-14"
            currentModuleId="module-13"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}