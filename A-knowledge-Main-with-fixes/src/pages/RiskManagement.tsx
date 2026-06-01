import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Calculator, PieChart, Clock, AlertTriangle } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function RiskManagement() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-13');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Gestion du Risque Crypto | Techniques Essentielles"
        description="Maîtrisez les méthodes de gestion du risque pour protéger votre capital lors du trading de cryptomonnaies."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/gestion-risque"
      />

      <CourseSchema
        name="La Gestion du Risque"
        description="Maîtrisez les techniques de gestion du risque pour protéger votre capital. Module premium de formation crypto."
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
          bg-gradient-to-br from-red-600 to-pink-600 text-white mb-6">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          La Gestion du Risque
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Maîtrisez les techniques de gestion du risque pour protéger votre capital
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
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                La <strong>gestion du risque</strong> est l'aspect le plus crucial du trading. 
                Une bonne stratégie de gestion du risque permet de préserver son capital et 
                d'assurer la longévité de son activité de trading, même en cas de pertes.
              </p>
            </div>

            {/* Principes fondamentaux */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-red-600" />
              Les principes fondamentaux
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Protection du capital</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Préservation des fonds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Gestion des pertes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Diversification</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ratio risque/récompense</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Définition des objectifs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Calcul du ratio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Optimisation des trades</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Calcul du risque */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="h-6 w-6 text-purple-600" />
              Le calcul du risque
            </h2>

            <div className="bg-purple-50 p-6 rounded-xl mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Position sizing</h3>
                  <p className="text-gray-700">Formule : Taille de position = (Capital × % Risque) ÷ (Prix d'entrée - Stop loss)</p>
                  <ul className="mt-2 space-y-2 text-gray-700">
                    <li>• Déterminer le pourcentage de risque par trade</li>
                    <li>• Calculer la taille de position optimale</li>
                    <li>• Ajuster selon la volatilité</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Stop loss</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Placement technique</li>
                    <li>• Distance minimale</li>
                    <li>• Ajustement selon la volatilité</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Gestion du portefeuille */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <PieChart className="h-6 w-6 text-green-600" />
              La gestion du portefeuille
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Diversification</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Répartition des actifs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Corrélation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Équilibrage</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Exposition</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Limites par position</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Exposition totale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Gestion du levier</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Suivi</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Journal de trading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Analyse des performances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Ajustements</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Erreurs courantes */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              Les erreurs à éviter
            </h2>

            <div className="bg-yellow-50 p-6 rounded-xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Erreurs émotionnelles</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Trading revenge</li>
                    <li>• Over-trading</li>
                    <li>• FOMO (Fear Of Missing Out)</li>
                    <li>• Biais de confirmation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Erreurs techniques</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Absence de stop loss</li>
                    <li>• Position sizing incorrect</li>
                    <li>• Mauvaise diversification</li>
                    <li>• Levier excessif</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Règles d'or */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-blue-600" />
              Les règles d'or
            </h2>

            <div className="bg-blue-50 p-6 rounded-xl mb-12">
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>Ne jamais risquer plus de 1-2% du capital par trade</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>Toujours utiliser un stop loss</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>Maintenir un ratio risque/récompense minimum de 1:2</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">4.</span>
                  <span>Diversifier son portefeuille</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">5.</span>
                  <span>Tenir un journal de trading</span>
                </li>
              </ol>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-red-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                La gestion du risque est la clé de la survie et du succès en trading. 
                Une approche disciplinée et systématique de la gestion du risque permet 
                de protéger son capital et d'assurer une croissance durable de son 
                portefeuille.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons la finance décentralisée (DeFi) 
                et ses opportunités d'investissement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-11"
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
            nextModuleId="module-13"
            currentModuleId="module-12"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}