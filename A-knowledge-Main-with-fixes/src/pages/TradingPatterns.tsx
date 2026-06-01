import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LineChart, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function TradingPatterns() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-12');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Patterns de Trading Crypto | Repérer les Figures Clés"
        description="Apprenez à identifier les figures chartistes pour anticiper les mouvements du marché et trader efficacement."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/patterns-trading"
      />

      <CourseSchema
        name="Les Patterns de Trading"
        description="Identifiez et exploitez les figures chartistes pour améliorer vos trades. Module premium de formation crypto."
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
          bg-gradient-to-br from-orange-600 to-amber-600 text-white mb-6">
          <LineChart className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Les Patterns de Trading
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Identifiez et exploitez les figures chartistes pour améliorer vos trades
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
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                Les <strong>patterns de trading</strong> sont des configurations graphiques qui se 
                répètent régulièrement sur les marchés. Leur identification permet d'anticiper 
                les mouvements de prix et de prendre des positions avec un meilleur ratio 
                risque/récompense.
              </p>
            </div>

            {/* Patterns de continuation */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
              Les patterns de continuation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Triangles</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Triangle ascendant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Triangle descendant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Triangle symétrique</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Drapeaux et fanions</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Drapeau haussier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Drapeau baissier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Fanions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Patterns de retournement */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingDown className="h-6 w-6 text-red-600" />
              Les patterns de retournement
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Doubles formations</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Double top</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Double bottom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Niveaux clés</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Têtes et épaules</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Tête et épaules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Tête et épaules inversé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Ligne de cou</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Autres patterns</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Triple top/bottom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Diamant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Rectangle</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Patterns en chandeliers */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <LineChart className="h-6 w-6 text-blue-600" />
              Les patterns en chandeliers japonais
            </h2>

            <div className="bg-blue-50 p-6 rounded-xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Patterns haussiers</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Marteau</li>
                    <li>• Étoile du matin</li>
                    <li>• Avalement haussier</li>
                    <li>• Harami haussier</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Patterns baissiers</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Étoile filante</li>
                    <li>• Étoile du soir</li>
                    <li>• Avalement baissier</li>
                    <li>• Harami baissier</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Trading des patterns */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
              Comment trader les patterns
            </h2>

            <div className="bg-green-50 p-6 rounded-xl mb-12">
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-green-600">1.</span>
                  <span>Identification du pattern sur le graphique</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-green-600">2.</span>
                  <span>Confirmation avec les indicateurs techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-green-600">3.</span>
                  <span>Définition des points d'entrée et de sortie</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-green-600">4.</span>
                  <span>Placement des stop-loss et take-profit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-green-600">5.</span>
                  <span>Gestion de la position</span>
                </li>
              </ol>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-orange-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                Les patterns de trading sont des outils puissants pour l'analyse technique, 
                mais ils doivent être utilisés en conjonction avec d'autres indicateurs et 
                une bonne gestion du risque. La pratique et l'expérience sont essentielles 
                pour les identifier et les trader efficacement.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons la gestion du risque et du capital, 
                des aspects cruciaux pour réussir en trading.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-10"
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
            nextModuleId="module-12"
            currentModuleId="module-11"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}