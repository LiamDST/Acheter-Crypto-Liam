import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Droplets, Calculator, LineChart, Clock, AlertTriangle } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function LiquidityPools() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-16');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Pools de Liquidité | Fonctionnement et Rendements DeFi"
        description="Apprenez comment les pools de liquidité alimentent les plateformes DeFi et comment en tirer des revenus passifs."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/pools-liquidite"
      />

      <CourseSchema
        name="Les Pools de Liquidité"
        description="Comprendre le fonctionnement et les mécanismes des pools de liquidité en DeFi. Module premium de formation crypto."
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
          bg-gradient-to-br from-cyan-600 to-blue-600 text-white mb-6">
          <Droplets className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Les Pools de Liquidité
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Comprendre le fonctionnement et les mécanismes des pools de liquidité en DeFi
        </p>
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full
          bg-gray-100 text-gray-600 text-sm">
          <Clock className="w-4 h-4 mr-2" />
          Temps de lecture : 18 minutes
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                Les <strong>pools de liquidité</strong> sont au cœur du fonctionnement des 
                échanges décentralisés (DEX) et du yield farming. Ils permettent aux utilisateurs 
                de fournir des actifs pour faciliter les échanges et gagner des récompenses.
              </p>
            </div>

            {/* Fonctionnement de base */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Droplets className="h-6 w-6 text-cyan-600" />
              Fonctionnement de base
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Structure</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-600 mt-2 flex-shrink-0" />
                    <span>Paires de tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-600 mt-2 flex-shrink-0" />
                    <span>Ratio constant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-600 mt-2 flex-shrink-0" />
                    <span>LP tokens</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mécanisme AMM</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Formule x * y = k</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Prix dynamique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Arbitrage</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Formules et calculs */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="h-6 w-6 text-purple-600" />
              Formules et calculs
            </h2>

            <div className="bg-purple-50 p-6 rounded-xl mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Prix des tokens</h3>
                  <p className="text-gray-700">Prix = Quantité token A / Quantité token B</p>
                  <ul className="mt-2 space-y-2 text-gray-700">
                    <li>• Impact prix</li>
                    <li>• Slippage</li>
                    <li>• Profondeur du pool</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Parts de pool</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Calcul des LP tokens</li>
                    <li>• Proportion du pool</li>
                    <li>• Distribution des frais</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Types de pools */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <LineChart className="h-6 w-6 text-green-600" />
              Les différents types de pools
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">50/50</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Ratio égal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Standard Uniswap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Usage général</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stableswap</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Courbe modifiée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Moins de slippage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Stablecoins</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weighted</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Ratio personnalisé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Balancer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Multi-tokens</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Impermanent Loss */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              L'Impermanent Loss
            </h2>

            <div className="bg-red-50 p-6 rounded-xl mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Définition</h3>
                  <p className="text-gray-700">
                    Perte temporaire due à la variation de prix des tokens dans le pool par 
                    rapport au holding simple.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Calcul</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Formule de calcul</li>
                    <li>• Exemples pratiques</li>
                    <li>• Stratégies de mitigation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Protection</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Choix des paires</li>
                    <li>• Durée d'investissement</li>
                    <li>• Compensation par les frais</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Stratégies */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <LineChart className="h-6 w-6 text-blue-600" />
              Stratégies d'investissement
            </h2>

            <div className="bg-blue-50 p-6 rounded-xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Choix des pools</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Volume de trading</li>
                    <li>• Volatilité des tokens</li>
                    <li>• APR/APY</li>
                    <li>• Risques du protocole</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Gestion active</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Rééquilibrage</li>
                    <li>• Suivi des rendements</li>
                    <li>• Retrait stratégique</li>
                    <li>• Diversification</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-cyan-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                Les pools de liquidité sont un élément fondamental de la DeFi, permettant 
                des échanges décentralisés efficaces et offrant des opportunités de rendement. 
                Une bonne compréhension de leur fonctionnement et des risques associés est 
                essentielle pour une participation réussie.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons les stablecoins et leur rôle 
                crucial dans l'écosystème DeFi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-14"
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
            nextModuleId="module-16"
            currentModuleId="module-15"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}