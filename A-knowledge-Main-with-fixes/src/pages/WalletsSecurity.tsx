import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Key, AlertTriangle, Clock } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function WalletsSecurity() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-9');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Sécurité des Wallets Crypto | Protéger ses Actifs"
        description="Découvrez comment renforcer la sécurité de vos wallets et protéger vos cryptomonnaies contre les menaces."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/securite-wallets"
      />

      <CourseSchema
        name="Sécurité des Wallets"
        description="Apprenez à protéger vos actifs cryptographiques avec les meilleures pratiques de sécurité. Module premium de formation crypto."
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
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sécurité des Wallets
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Apprenez à protéger vos actifs cryptographiques avec les meilleures pratiques de sécurité
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
                La sécurité de vos <strong>wallets crypto</strong> est primordiale pour protéger 
                vos investissements. Comprendre les bonnes pratiques et les risques potentiels 
                vous permettra de garder vos actifs en sécurité.
              </p>
            </div>

            {/* Types de wallets */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lock className="h-6 w-6 text-red-600" />
              Les différents types de wallets
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hot Wallets</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Connectés à Internet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Faciles d'utilisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <span>Plus vulnérables aux attaques</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cold Wallets</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Stockage hors ligne</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Sécurité maximale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Idéal pour le stockage long terme</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bonnes pratiques */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Key className="h-6 w-6 text-green-600" />
              Bonnes pratiques de sécurité
            </h2>

            <div className="bg-green-50 p-6 rounded-xl mb-12">
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-green-600">1.</span>
                  <span>Utilisez un gestionnaire de mots de passe sécurisé</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-green-600">2.</span>
                  <span>Activez l'authentification à deux facteurs (2FA)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-green-600">3.</span>
                  <span>Stockez vos clés privées de manière sécurisée</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-green-600">4.</span>
                  <span>Faites des sauvegardes régulières de vos wallets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-green-600">5.</span>
                  <span>Vérifiez toujours les adresses de destination</span>
                </li>
              </ol>
            </div>

            {/* Menaces courantes */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              Menaces courantes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-orange-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Attaques externes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Phishing</li>
                  <li>• Malwares</li>
                  <li>• Sites frauduleux</li>
                  <li>• Attaques par force brute</li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Erreurs humaines</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Perte des clés privées</li>
                  <li>• Mauvaise sauvegarde</li>
                  <li>• Erreurs de transaction</li>
                  <li>• Partage d'informations sensibles</li>
                </ul>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-red-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                La sécurité de vos wallets crypto est un aspect crucial de votre investissement. 
                Une approche disciplinée et systématique de la gestion du risque permet 
                de protéger son capital et d'assurer une croissance durable de son 
                portefeuille.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons les indicateurs techniques pour 
                l'analyse des marchés crypto.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-7"
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
            nextModuleId="module-9"
            currentModuleId="module-8"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}