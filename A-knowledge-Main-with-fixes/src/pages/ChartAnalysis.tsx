import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LineChart, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function ChartAnalysis() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-11');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Analyse Graphique Crypto | Lire les Mouvements du Marché"
        description="Apprenez à interpréter les graphiques de prix pour identifier tendances et opportunités de trading sur les cryptomonnaies."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/analyse-graphiques"
      />

      <CourseSchema
        name="L'Analyse des Graphiques"
        description="Maîtrisez la lecture et l'interprétation des graphiques pour le trading crypto. Module premium de formation crypto."
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
          <LineChart className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          L'Analyse des Graphiques
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Maîtrisez la lecture et l'interprétation des graphiques pour le trading crypto
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
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                L'<strong>analyse graphique</strong> est un élément fondamental du trading. Elle permet 
                d'identifier les tendances, les supports, les résistances et les figures chartistes 
                qui aident à prendre des décisions de trading éclairées.
              </p>
            </div>

            {/* Types de graphiques */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <LineChart className="h-6 w-6 text-green-600" />
              Les différents types de graphiques
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Graphique en ligne</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Simple et clair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Prix de clôture uniquement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Vue d'ensemble rapide</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chandeliers japonais</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Information complète</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Figures de retournement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Analyse psychologique</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Graphique en barres</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>OHLC complet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Moins visuel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Analyse technique avancée</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Analyse des tendances */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              L'analyse des tendances
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowLeft className="h-5 w-5 rotate-45 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Tendance haussière</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li>• Hauts et bas de plus en plus hauts</li>
                  <li>• Momentum positif</li>
                  <li>• Volumes en augmentation</li>
                  <li>• Cassures de résistances</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowLeft className="h-5 w-5 rotate-[135deg] text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Tendance baissière</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li>• Hauts et bas de plus en plus bas</li>
                  <li>• Momentum négatif</li>
                  <li>• Volumes en augmentation</li>
                  <li>• Cassures de supports</li>
                </ul>
              </div>
            </div>

            {/* Supports et résistances */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <LineChart className="h-6 w-6 text-purple-600" />
              Supports et résistances
            </h2>

            <div className="bg-purple-50 p-6 rounded-xl mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Supports</h3>
                  <p className="text-gray-700">Niveaux de prix où la demande est suffisamment forte pour arrêter la baisse.</p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• Zones d'achat potentielles</li>
                    <li>• Points de rebond</li>
                    <li>• Niveaux psychologiques</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Résistances</h3>
                  <p className="text-gray-700">Niveaux de prix où l'offre est suffisamment forte pour arrêter la hausse.</p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• Zones de vente potentielles</li>
                    <li>• Points de retournement</li>
                    <li>• Niveaux historiques</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timeframes */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Clock className="h-6 w-6 text-orange-600" />
              Les différents timeframes
            </h2>

            <div className="bg-orange-50 p-6 rounded-xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Court terme</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 1 minute à 1 heure</li>
                    <li>• Trading intraday</li>
                    <li>• Scalping</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Moyen terme</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 4 heures à 1 jour</li>
                    <li>• Swing trading</li>
                    <li>• Tendances intermédiaires</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Long terme</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 1 semaine et plus</li>
                    <li>• Position trading</li>
                    <li>• Tendances majeures</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Volume et liquidité */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <LineChart className="h-6 w-6 text-red-600" />
              Volume et liquidité
            </h2>

            <div className="bg-red-50 p-6 rounded-xl mb-12">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Importance du volume</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Confirmation des mouvements</li>
                    <li>• Validation des cassures</li>
                    <li>• Indication de la force du marché</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Analyse de la liquidité</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Profondeur du marché</li>
                    <li>• Spread bid-ask</li>
                    <li>• Impact sur les prix</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                L'analyse graphique est un outil essentiel pour tout trader. La combinaison 
                de différents timeframes, l'étude des volumes et la compréhension des supports 
                et résistances permettent de prendre des décisions de trading plus éclairées.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons les patterns de trading les plus 
                courants et leur interprétation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-9"
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
            nextModuleId="module-11"
            currentModuleId="module-10"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}