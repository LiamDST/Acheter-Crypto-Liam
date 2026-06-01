import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Shield, Eye, Clock, Lock } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function CryptoScams() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-19');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Arnaques Crypto | Identifier et Éviter les Fraudes"
        description="Apprenez à reconnaître les escroqueries courantes dans l’univers des cryptomonnaies et protégez vos investissements."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/arnaques-crypto"
      />

      <CourseSchema
        name="Les Arnaques en Crypto"
        description="Apprenez à identifier et éviter les arnaques courantes dans l'écosystème crypto. Module premium de formation crypto."
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
          bg-gradient-to-br from-red-600 to-orange-600 text-white mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Les Arnaques en Crypto
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Apprenez à identifier et éviter les arnaques courantes dans l'écosystème crypto
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
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                L'écosystème crypto attire malheureusement de nombreux escrocs qui utilisent 
                des techniques sophistiquées pour tromper les investisseurs. Comprendre ces 
                arnaques est essentiel pour protéger ses investissements.
              </p>
            </div>

            {/* Types d'arnaques */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              Les types d'arnaques courants
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pump and Dump</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Manipulation des prix</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Faux signaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Groupes Telegram</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rug Pulls</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Faux projets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Liquidité retirée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Équipe anonyme</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Techniques de phishing */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Eye className="h-6 w-6 text-purple-600" />
              Les techniques de phishing
            </h2>

            <div className="bg-purple-50 p-6 rounded-xl mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sites frauduleux</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Faux exchanges</li>
                    <li>• Clones de wallets</li>
                    <li>• Pages de connexion imitées</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Emails malveillants</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Fausses promotions</li>
                    <li>• Urgence fictive</li>
                    <li>• Demandes de vérification</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Arnaques sur les réseaux sociaux */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
              Arnaques sur les réseaux sociaux
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Giveaways</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Faux cadeaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Comptes imités</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Envois requis</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Faux signaux</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Influenceurs payés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Groupes privés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Promesses irréalistes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Romance scams</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Manipulation émotionnelle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Faux profils</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Demandes d'argent</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Signes d'alerte */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              Les signes d'alerte
            </h2>

            <div className="bg-yellow-50 p-6 rounded-xl mb-12">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Promesses irréalistes</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Rendements garantis</li>
                    <li>• Gains rapides</li>
                    <li>• Zéro risque</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Pression à l'achat</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Offres limitées</li>
                    <li>• Urgence artificielle</li>
                    <li>• FOMO induit</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Manque de transparence</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Équipe anonyme</li>
                    <li>• Documentation floue</li>
                    <li>• Code non vérifié</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Protection */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-green-600" />
              Comment se protéger
            </h2>

            <div className="bg-green-50 p-6 rounded-xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">DYOR</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Recherche approfondie</li>
                    <li>• Vérification des sources</li>
                    <li>• Analyse critique</li>
                    <li>• Consultation communautaire</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Bonnes pratiques</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Utilisation de wallets sécurisés</li>
                    <li>• Double vérification des adresses</li>
                    <li>• Méfiance des offres trop belles</li>
                    <li>• Diversification des investissements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Que faire si on est victime */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lock className="h-6 w-6 text-blue-600" />
              Que faire si on est victime
            </h2>

            <div className="bg-blue-50 p-6 rounded-xl mb-12">
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>Sécuriser immédiatement ses comptes et wallets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>Documenter tous les détails de l'arnaque</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>Contacter les autorités compétentes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">4.</span>
                  <span>Alerter la communauté</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">5.</span>
                  <span>Contacter son établissement bancaire si nécessaire</span>
                </li>
              </ol>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-red-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                La vigilance et l'éducation sont les meilleures défenses contre les arnaques 
                dans l'écosystème crypto. En connaissant les techniques courantes et en 
                appliquant les bonnes pratiques de sécurité, vous pouvez considérablement 
                réduire les risques d'être victime d'une arnaque.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons la gestion de portfolio et les 
                stratégies d'investissement à long terme.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-17"
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
            nextModuleId="module-19"
            currentModuleId="module-18"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}