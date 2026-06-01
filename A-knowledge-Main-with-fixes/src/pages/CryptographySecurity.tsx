import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Shield, Key, AlertTriangle, Clock } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function CryptographySecurity() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-4');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Cryptographie et Sécurité | Bases de la Protection Crypto"
        description="Comprenez les principes de cryptographie qui sécurisent la blockchain et apprenez à protéger vos actifs numériques."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/cryptographie-securite"
      />

      <CourseSchema
        name="La Cryptographie et la Sécurité"
        description="Découvrez les mécanismes de sécurité qui protègent la blockchain et vos transactions. Module premium de formation crypto."
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
          bg-gradient-to-br from-green-600 to-emerald-600 text-white mb-6">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          La Cryptographie et la Sécurité
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Découvrez les mécanismes de sécurité qui protègent la blockchain et vos transactions
        </p>
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full
          bg-gray-100 text-gray-600 text-sm">
          <Clock className="w-4 h-4 mr-2" />
          Temps de lecture : 14 minutes
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                La <strong>cryptographie</strong> est le pilier fondamental qui garantit la sécurité 
                et l'intégrité de la blockchain. Elle permet de protéger les transactions, 
                d'authentifier les utilisateurs et d\'assurer la confidentialité des données.
              </p>
            </div>

            {/* Les bases de la cryptographie */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Key className="h-6 w-6 text-green-600" />
              Les bases de la cryptographie blockchain
            </h2>

            <p className="text-gray-700 mb-8">
              La cryptographie dans la blockchain repose sur plusieurs concepts clés qui 
              travaillent ensemble pour créer un système sécurisé et fiable. Ces mécanismes 
              assurent que les transactions sont authentiques, inaltérables et confidentielles.
            </p>

            {/* Image illustrative */}
            <div className="relative h-80 mb-12 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80"
                alt="Visualisation de la cryptographie blockchain"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-sm">
                Représentation des mécanismes cryptographiques de la blockchain
              </div>
            </div>

            {/* Les mécanismes cryptographiques */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-blue-600" />
              Les mécanismes cryptographiques essentiels
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clés cryptographiques</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Clé privée : signature des transactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Clé publique : identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Paire de clés : sécurité complète</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fonctions de hachage</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Empreinte unique des données</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Intégrité des blocs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Chaînage cryptographique</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sécurité des transactions */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lock className="h-6 w-6 text-purple-600" />
              La sécurité des transactions
            </h2>

            <div className="bg-purple-50 p-6 rounded-xl mb-12">
              <h3 className="font-semibold text-gray-900 mb-4">Processus de sécurisation</h3>
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-purple-600">1.</span>
                  <span>Création de la transaction avec les détails nécessaires</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-purple-600">2.</span>
                  <span>Signature avec la clé privée du propriétaire</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-purple-600">3.</span>
                  <span>Vérification par le réseau avec la clé publique</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-purple-600">4.</span>
                  <span>Inclusion dans un bloc après validation</span>
                </li>
              </ol>
            </div>

            {/* Menaces et protections */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              Menaces et protections
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-orange-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Menaces courantes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Attaques à 51%</li>
                  <li>• Double dépense</li>
                  <li>• Vol de clés privées</li>
                  <li>• Attaques Sybil</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Protections</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Consensus distribué</li>
                  <li>• Cryptographie robuste</li>
                  <li>• Stockage sécurisé</li>
                  <li>• Validation par les pairs</li>
                </ul>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                La cryptographie est le fondement de la sécurité blockchain, permettant des 
                transactions sûres et vérifiables. Sa robustesse repose sur des principes 
                mathématiques éprouvés et des protocoles sophistiqués qui travaillent ensemble 
                pour protéger l'intégrité du réseau.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons les différents types de blockchain 
                et leurs cas d'utilisation spécifiques.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-2"
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
            nextModuleId="module-4"
            currentModuleId="module-3"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}