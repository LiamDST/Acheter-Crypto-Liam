import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Coins, Clock, DollarSign, Palette, Wallet } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function TokenTypes() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-8');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Types de Tokens Crypto | Utilités et Fonctions"
        description="Explorez les différents types de tokens et leurs applications dans l’écosystème blockchain et DeFi."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/types-tokens"
      />

      <CourseSchema
        name="Les Différents Types de Tokens"
        description="Explorez les différentes catégories de tokens et leurs cas d'utilisation. Module premium de formation crypto."
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
          bg-gradient-to-br from-pink-600 to-purple-600 text-white mb-6">
          <Coins className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Les Différents Types de Tokens
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Explorez les différentes catégories de tokens et leurs cas d'utilisation
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
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                Les <strong>tokens</strong> sont des actifs numériques créés sur des blockchains 
                existantes, principalement Ethereum. Ils peuvent représenter une grande variété 
                d'actifs et de droits, chaque type ayant ses propres caractéristiques et usages.
              </p>
            </div>

            {/* Types principaux de tokens */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Coins className="h-6 w-6 text-pink-600" />
              Les types principaux de tokens
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tokens fongibles (ERC-20)</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-600 mt-2 flex-shrink-0" />
                    <span>Interchangeables entre eux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-600 mt-2 flex-shrink-0" />
                    <span>Divisibles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-600 mt-2 flex-shrink-0" />
                    <span>Ex: USDT, LINK, UNI</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tokens non fongibles (NFT)</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Uniques et non interchangeables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Représentent des actifs uniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Ex: Art numérique, objets de collection</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Cas d'utilisation */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-600" />
              Cas d'utilisation des tokens
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Finance (DeFi)</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Stablecoins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Tokens de gouvernance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Tokens de prêt</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Utilitaires</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Accès aux services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Récompenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Votes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actifs réels</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Immobilier tokenisé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Art et objets de valeur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Actions tokenisées</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Standards de tokens */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Palette className="h-6 w-6 text-blue-600" />
              Standards de tokens
            </h2>

            <div className="bg-blue-50 p-6 rounded-xl mb-12">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">ERC-20</h3>
                  <p className="text-gray-700">Standard pour les tokens fongibles, utilisé pour la majorité des cryptomonnaies sur Ethereum.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">ERC-721</h3>
                  <p className="text-gray-700">Standard pour les NFTs, chaque token est unique et non divisible.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">ERC-1155</h3>
                  <p className="text-gray-700">Standard multi-tokens permettant de gérer à la fois des tokens fongibles et non fongibles.</p>
                </div>
              </div>
            </div>

            {/* Sécurité et bonnes pratiques */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Wallet className="h-6 w-6 text-red-600" />
              Sécurité et bonnes pratiques
            </h2>

            <div className="bg-red-50 p-6 rounded-xl mb-12">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                  <span>Vérifier la légitimité du projet et du contrat</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                  <span>Utiliser des wallets sécurisés</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                  <span>Comprendre les risques de liquidité</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                  <span>Faire attention aux arnaques et aux tokens frauduleux</span>
                </li>
              </ul>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-pink-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                Les tokens représentent une innovation majeure dans l'écosystème blockchain, 
                permettant de tokeniser pratiquement n'importe quel actif ou droit. Leur 
                diversité et leur flexibilité ouvrent de nombreuses possibilités d'application 
                dans différents secteurs.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons la sécurité des wallets et les 
                meilleures pratiques pour protéger vos actifs cryptographiques.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-6"
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
            nextModuleId="module-8"
            currentModuleId="module-7"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}