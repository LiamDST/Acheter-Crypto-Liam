import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, Cpu, Lock, Wallet, Clock } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import SEOHead from '../components/SEOHead';
import CourseSchema from '../components/CourseSchema';

export default function EthereumSmartContracts() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-7');
    }
  };

  const content = (
    <>
      <SEOHead 
        title="Ethereum et les Smart Contracts"
        description="Découvrez la révolution des contrats intelligents et la plateforme Ethereum dans notre module de formation crypto."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/ethereum-smart-contracts"
      />
      
      <CourseSchema
        name="Ethereum et les Smart Contracts"
        description="Découvrez la révolution des contrats intelligents et la plateforme Ethereum. Module premium de formation crypto."
        isAccessibleForFree={false}
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
          bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-6">
          <Code className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Ethereum et les Smart Contracts
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Découvrez la révolution des contrats intelligents et la plateforme Ethereum
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
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                <strong>Ethereum</strong> a révolutionné le monde des cryptomonnaies en introduisant 
                les <strong>smart contracts</strong>, des programmes autonomes qui s'exécutent 
                automatiquement lorsque certaines conditions sont remplies. Cette innovation a 
                ouvert la voie à une multitude d'applications décentralisées.
              </p>
            </div>

            {/* Qu'est-ce qu'Ethereum ? */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Wallet className="h-6 w-6 text-blue-600" />
              Qu'est-ce qu'Ethereum ?
            </h2>

            <p className="text-gray-700 mb-8">
              Ethereum est une plateforme blockchain décentralisée qui permet la création et 
              l'exécution de smart contracts. Contrairement à Bitcoin qui se concentre sur les 
              transactions financières, Ethereum est un véritable ordinateur mondial décentralisé.
            </p>

            {/* Image illustrative */}
            <div className="relative h-80 mb-12 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80"
                alt="Smart Contracts et Ethereum"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-sm">
                Visualisation des smart contracts sur la blockchain Ethereum
              </div>
            </div>

            {/* Les Smart Contracts */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Code className="h-6 w-6 text-indigo-600" />
              Les Smart Contracts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Caractéristiques</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Auto-exécutables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Immuables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Transparents</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <span>DeFi (Finance Décentralisée)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <span>NFTs (Tokens Non Fongibles)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <span>DAOs (Organisations Autonomes)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Fonctionnement */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Cpu className="h-6 w-6 text-purple-600" />
              Comment fonctionnent les Smart Contracts ?
            </h2>

            <div className="bg-purple-50 p-6 rounded-xl mb-12">
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-purple-600">1.</span>
                  <span>Le contrat est écrit en Solidity (langage de programmation)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-purple-600">2.</span>
                  <span>Il est déployé sur la blockchain Ethereum</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-purple-600">3.</span>
                  <span>Les conditions du contrat sont définies dans le code</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-purple-600">4.</span>
                  <span>Le contrat s'exécute automatiquement quand les conditions sont remplies</span>
                </li>
              </ol>
            </div>

            {/* Sécurité et Considérations */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lock className="h-6 w-6 text-green-600" />
              Sécurité et Considérations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Avantages</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Automatisation des processus</li>
                  <li>• Réduction des intermédiaires</li>
                  <li>• Transparence totale</li>
                  <li>• Immuabilité des contrats</li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Risques</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Bugs dans le code</li>
                  <li>• Coûts de transaction (Gas)</li>
                  <li>• Vulnérabilités potentielles</li>
                  <li>• Irréversibilité des transactions</li>
                </ul>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                Ethereum et les smart contracts représentent une avancée majeure dans le monde 
                de la blockchain. Ils permettent de créer des applications décentralisées 
                complexes et ouvrent la voie à de nombreuses innovations dans différents secteurs.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons les différents types de tokens qui 
                peuvent être créés sur la blockchain Ethereum.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-5"
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
            nextModuleId="module-7"
            currentModuleId="module-6"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}