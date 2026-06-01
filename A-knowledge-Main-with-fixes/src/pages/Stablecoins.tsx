import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Shield, Ban as Bank, Clock, AlertTriangle } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function Stablecoins() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-17');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Stablecoins | Comprendre les Cryptomonnaies Stables"
        description="Analysez le rôle des stablecoins et leur utilité pour sécuriser vos transactions et vos investissements crypto."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/stablecoins"
      />

      <CourseSchema
        name="Les Stablecoins"
        description="Découvrez le rôle crucial des stablecoins dans l'écosystème crypto. Module premium de formation crypto."
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
          bg-gradient-to-br from-green-600 to-teal-600 text-white mb-6">
          <DollarSign className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Les Stablecoins
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Découvrez le rôle crucial des stablecoins dans l'écosystème crypto
        </p>
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full
          bg-gray-100 text-gray-600 text-sm">
          <Clock className="w-4 h-4 mr-2" />
          Temps de lecture : 15 minutes
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                Les <strong>stablecoins</strong> sont des cryptomonnaies conçues pour maintenir 
                une valeur stable, généralement indexée sur une monnaie fiduciaire comme le 
                dollar américain. Ils jouent un rôle essentiel dans l'écosystème crypto en 
                offrant stabilité et liquidité.
              </p>
            </div>

            {/* Types de stablecoins */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-600" />
              Les différents types de stablecoins
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Collatéralisés Fiat</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>USDT (Tether)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>USDC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>BUSD</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Collatéralisés Crypto</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>DAI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>MakerDAO</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Sur-collatéralisation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Algorithmiques</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Mécanismes automatiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Expansion/Contraction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Plus risqués</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mécanismes de stabilité */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-blue-600" />
              Mécanismes de stabilité
            </h2>

            <div className="bg-blue-50 p-6 rounded-xl mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Collatéralisation</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Réserves en monnaie fiduciaire</li>
                    <li>• Actifs cryptographiques</li>
                    <li>• Ratio de collatéralisation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Arbitrage</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Mécanisme de mint/burn</li>
                    <li>• Équilibre de l'offre</li>
                    <li>• Maintien du peg</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Utilisation dans la DeFi */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Bank className="h-6 w-6 text-purple-600" />
              Utilisation dans la DeFi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trading</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Paires de trading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Liquidité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Arbitrage</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lending</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Collatéral stable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Prêts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Yield farming</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Risques et considérations */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              Risques et considérations
            </h2>

            <div className="bg-red-50 p-6 rounded-xl mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Risques de dépeg</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Perte de parité</li>
                    <li>• Crises de confiance</li>
                    <li>• Exemples historiques</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Risques réglementaires</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Supervision gouvernementale</li>
                    <li>• Exigences de réserves</li>
                    <li>• Conformité</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Risques techniques</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Smart contracts</li>
                    <li>• Attaques</li>
                    <li>• Bugs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sélection et utilisation */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-green-600" />
              Sélection et utilisation
            </h2>

            <div className="bg-green-50 p-6 rounded-xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Critères de sélection</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Capitalisation</li>
                    <li>• Liquidité</li>
                    <li>• Historique</li>
                    <li>• Transparence</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Bonnes pratiques</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Diversification</li>
                    <li>• Monitoring</li>
                    <li>• Gestion des risques</li>
                    <li>• Plan de sortie</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                Les stablecoins sont devenus un élément fondamental de l'écosystème crypto, 
                offrant stabilité et liquidité essentielles au fonctionnement de la DeFi. 
                Comprendre leurs mécanismes et leurs risques est crucial pour une utilisation 
                sûre et efficace.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons la sécurisation des wallets et 
                les meilleures pratiques pour protéger vos actifs cryptographiques.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-15"
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
            nextModuleId="module-17"
            currentModuleId="module-16"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}