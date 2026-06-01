import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LineChart, TrendingUp, BarChart2, Clock, AlertTriangle } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function TechnicalAnalysis() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-10');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Indicateurs Techniques Crypto | Bases de l’Analyse"
        description="Découvrez les indicateurs techniques incontournables pour analyser les marchés crypto et affiner vos stratégies."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/indicateurs-techniques"
      />

      <CourseSchema
        name="Les Indicateurs Techniques"
        description="Maîtrisez les outils essentiels de l'analyse technique pour le trading crypto. Module premium de formation crypto."
        isAccessibleForFree={false}
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/indicateurs-techniques"
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
          bg-gradient-to-br from-blue-600 to-cyan-600 text-white mb-6">
          <LineChart className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Les Indicateurs Techniques
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Maîtrisez les outils essentiels de l'analyse technique pour le trading crypto
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
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                Les <strong>indicateurs techniques</strong> sont des outils mathématiques essentiels 
                qui aident les traders à analyser les mouvements de prix et à identifier les 
                opportunités de trading. Ils permettent de prendre des décisions basées sur des 
                données objectives plutôt que sur l'émotion.
              </p>
            </div>

            {/* Indicateurs de tendance */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              Les indicateurs de tendance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Moyennes mobiles</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Simple (SMA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Exponentielle (EMA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Croisements et signaux</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">MACD</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Convergence/Divergence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Histogramme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Signaux de trading</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Indicateurs de momentum */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BarChart2 className="h-6 w-6 text-purple-600" />
              Les indicateurs de momentum
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">RSI</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Surachat/Survente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Divergences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Niveaux clés</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stochastique</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Oscillateur %K</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Signal %D</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Croisements</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ADX</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Force de tendance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>DI+ et DI-</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Seuils critiques</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Indicateurs de volatilité */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              Les indicateurs de volatilité
            </h2>

            <div className="bg-yellow-50 p-6 rounded-xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Bandes de Bollinger</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Bande supérieure (résistance)</li>
                    <li>• Bande médiane (tendance)</li>
                    <li>• Bande inférieure (support)</li>
                    <li>• Squeeze et expansion</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">ATR (Average True Range)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Mesure de la volatilité</li>
                    <li>• Gestion du risque</li>
                    <li>• Stop-loss dynamique</li>
                    <li>• Taille des positions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Utilisation pratique */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <LineChart className="h-6 w-6 text-green-600" />
              Utilisation pratique des indicateurs
            </h2>

            <div className="bg-green-50 p-6 rounded-xl mb-12">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Confirmation des signaux</h3>
                  <p className="text-gray-700">Utilisez plusieurs indicateurs pour confirmer les signaux de trading.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Timeframes</h3>
                  <p className="text-gray-700">Analysez différentes échelles de temps pour une vue complète.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Gestion du risque</h3>
                  <p className="text-gray-700">Définissez des stop-loss et take-profit basés sur les indicateurs.</p>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                Les indicateurs techniques sont des outils puissants pour l'analyse des marchés 
                crypto, mais ils doivent être utilisés en combinaison et avec une bonne 
                compréhension de leurs limites. La pratique et l'expérience sont essentielles 
                pour les utiliser efficacement.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous approfondirons l'analyse des graphiques et 
                l'identification des patterns de trading.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-8"
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
            nextModuleId="module-10"
            currentModuleId="module-9"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}