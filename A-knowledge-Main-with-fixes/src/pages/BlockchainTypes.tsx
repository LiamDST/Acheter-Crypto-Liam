import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Network, Database, Globe, Lock, Clock } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function BlockchainTypes() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-5');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Types de Blockchain | Public, Privé et Consortium"
        description="Découvrez les différents types de blockchain, leurs usages et leurs avantages dans notre module de formation crypto."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/types-blockchain"
      />

      <CourseSchema
        name="Les Différents Types de Blockchain"
        description="Explorez les différentes architectures blockchain et leurs cas d'utilisation. Module premium de formation crypto."
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
          bg-gradient-to-br from-orange-600 to-red-600 text-white mb-6">
          <Database className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Les Différents Types de Blockchain
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Explorez les différentes architectures blockchain et leurs cas d'utilisation
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
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                Il existe différents types de blockchain, chacun conçu pour répondre à des besoins 
                spécifiques. Comprendre leurs caractéristiques est essentiel pour choisir la 
                solution la plus adaptée à chaque cas d'utilisation.
              </p>
            </div>

            {/* Types principaux */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Network className="h-6 w-6 text-orange-600" />
              Les types principaux de blockchain
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Publiques</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Accessibles à tous</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Totalement décentralisées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Ex: Bitcoin, Ethereum</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privées</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Accès restreint</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Contrôle centralisé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Usage entreprise</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Consortium</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Semi-privées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Consensus partagé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Collaboration B2B</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Caractéristiques spécifiques */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Globe className="h-6 w-6 text-blue-600" />
              Caractéristiques spécifiques
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Blockchains publiques</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Transparence totale</li>
                  <li>• Consensus distribué</li>
                  <li>• Sécurité maximale</li>
                  <li>• Scalabilité limitée</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Blockchains privées</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Performance élevée</li>
                  <li>• Contrôle d'accès</li>
                  <li>• Confidentialité</li>
                  <li>• Évolutivité facile</li>
                </ul>
              </div>
            </div>

            {/* Cas d'utilisation */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lock className="h-6 w-6 text-purple-600" />
              Cas d'utilisation
            </h2>

            <div className="bg-purple-50 p-6 rounded-xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Blockchains publiques</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Cryptomonnaies</li>
                    <li>• DeFi</li>
                    <li>• NFTs</li>
                    <li>• Applications décentralisées</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Blockchains privées</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Gestion de la chaîne logistique</li>
                    <li>• Services financiers</li>
                    <li>• Données médicales</li>
                    <li>• Identité numérique</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-orange-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                Chaque type de blockchain présente ses avantages et ses limites. Le choix 
                dépend des besoins spécifiques du projet : niveau de décentralisation requis, 
                performance nécessaire, confidentialité des données, etc.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons l'histoire du Bitcoin, la première 
                et plus célèbre application de la technologie blockchain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-3"
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
            nextModuleId="module-5"
            currentModuleId="module-4"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}