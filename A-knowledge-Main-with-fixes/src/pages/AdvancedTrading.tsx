import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, LineChart, Target, Clock, AlertTriangle } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function AdvancedTrading() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/course-completion');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Stratégies Avancées de Trading Crypto | Formation Premium"
        description="Apprenez des techniques de trading avancées pour optimiser vos performances et maîtriser le risque sur les marchés crypto."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/strategies-avancees"
      />

      <CourseSchema
        name="Stratégies Avancées de Trading"
        description="Maîtrisez les techniques avancées pour optimiser vos performances de trading. Module premium de formation crypto."
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
          bg-gradient-to-br from-purple-600 to-pink-600 text-white mb-6">
          <TrendingUp className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Stratégies Avancées de Trading
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Maîtrisez les techniques avancées pour optimiser vos performances de trading
        </p>
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full
          bg-gray-100 text-gray-600 text-sm">
          <Clock className="w-4 h-4 mr-2" />
          Temps de lecture : 25 minutes
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                Les <strong>stratégies avancées de trading</strong> combinent analyse technique, 
                gestion du risque sophistiquée et compréhension approfondie des marchés pour 
                maximiser les opportunités tout en minimisant les risques.
              </p>
            </div>

            {/* Stratégies de swing trading */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <LineChart className="h-6 w-6 text-purple-600" />
              Stratégies de swing trading
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyse multi-timeframes</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Confirmation des tendances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Points de retournement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Zones de confluence</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Divergences avancées</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Divergences cachées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Divergences multiples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Confirmation par volume</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Stratégies de breakout */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Target className="h-6 w-6 text-green-600" />
              Stratégies de breakout
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Breakout avec volume</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Confirmation volumétrique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Niveaux clés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Momentum</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Faux breakouts</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Trading en contre-tendance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Gestion du risque</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Breakout avec pullback</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Retests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Points d'entrée optimaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Confirmation de tendance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Stratégies de mean reversion */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <LineChart className="h-6 w-6 text-blue-600" />
              Stratégies de mean reversion
            </h2>

            <div className="bg-blue-50 p-6 rounded-xl mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Indicateurs statistiques</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Bandes de Bollinger avancées</li>
                    <li>• RSI avec filtres</li>
                    <li>• Écart-type et z-score</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Points d'entrée</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Surextension</li>
                    <li>• Divergences</li>
                    <li>• Confirmation de retournement</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Gestion des positions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Scaling in/out</li>
                    <li>• Stop loss dynamique</li>
                    <li>• Take profit adaptatif</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Gestion avancée du risque */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              Gestion avancée du risque
            </h2>

            <div className="bg-red-50 p-6 rounded-xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Position sizing dynamique</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Ajustement selon la volatilité</li>
                    <li>• Kelly Criterion</li>
                    <li>• Anti-martingale</li>
                    <li>• Gestion du capital optimal</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Stop loss avancé</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Stop loss volatilité</li>
                    <li>• Stop loss temps</li>
                    <li>• Stop loss composite</li>
                    <li>• Break-even automatique</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                Les stratégies avancées de trading nécessitent une compréhension approfondie 
                des marchés et une excellente maîtrise de la gestion du risque. La combinaison 
                de différentes approches et l'adaptation constante aux conditions du marché 
                sont essentielles pour réussir sur le long terme.
              </p>
              <p className="text-gray-700">
                Félicitations ! Vous avez terminé tous les modules de notre formation. 
                Il est maintenant temps de mettre en pratique ces connaissances et de 
                développer votre propre stratégie d'investissement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-19"
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
            nextModuleId="module-21"
            currentModuleId="module-20"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}