import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bitcoin, Clock, Wallet, Globe, DollarSign } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function BitcoinHistory() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-6');
    }
  };

  const content = (
    <>
      <SEOHead
        title="Histoire du Bitcoin | Origines et Évolution de la Crypto"
        description="Explorez la création du Bitcoin, son évolution et son impact sur l’économie numérique dans ce module de formation crypto."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/bitcoin-histoire"
      />

      <CourseSchema
        name="Bitcoin et son Histoire"
        description="Découvrez l'origine et l'évolution de la première cryptomonnaie. Module premium de formation crypto."
        isAccessibleForFree={false}
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/bitcoin-histoire"
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
          bg-gradient-to-br from-yellow-600 to-orange-600 text-white mb-6">
          <Bitcoin className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bitcoin et son Histoire
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Découvrez l'origine et l'évolution de la première cryptomonnaie
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
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                Le <strong>Bitcoin</strong> est né en 2008 avec la publication d'un livre blanc par 
                Satoshi Nakamoto. Cette innovation a marqué le début d'une révolution financière 
                en introduisant la première monnaie numérique décentralisée.
              </p>
            </div>

            {/* Les origines */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Globe className="h-6 w-6 text-yellow-600" />
              Les origines du Bitcoin
            </h2>

            <p className="text-gray-700 mb-8">
              Le 31 octobre 2008, Satoshi Nakamoto publie le livre blanc "Bitcoin: A Peer-to-Peer 
              Electronic Cash System". Ce document décrit un système révolutionnaire permettant 
              d'effectuer des transactions électroniques sans intermédiaire de confiance.
            </p>

            {/* Image illustrative */}
            <div className="relative h-80 mb-12 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80"
                alt="Bitcoin et blockchain"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-sm">
                Représentation artistique du Bitcoin et de sa technologie blockchain
              </div>
            </div>

            {/* Chronologie */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Clock className="h-6 w-6 text-orange-600" />
              Chronologie des événements clés
            </h2>

            <div className="space-y-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">2008-2009</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0" />
                    <span>Publication du livre blanc Bitcoin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0" />
                    <span>Création du premier bloc (Genesis Block)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2 flex-shrink-0" />
                    <span>Première transaction Bitcoin</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">2010-2013</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Première transaction commerciale (Pizza Bitcoin)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Création des premiers exchanges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                    <span>Premier bull run majeur</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Caractéristiques uniques */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Wallet className="h-6 w-6 text-blue-600" />
              Caractéristiques uniques
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Aspects techniques</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Offre limitée à 21 millions</li>
                  <li>• Halving tous les 4 ans</li>
                  <li>• Preuve de travail (PoW)</li>
                  <li>• Réseau décentralisé</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Innovations</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Premier système de paiement décentralisé</li>
                  <li>• Solution au problème de la double dépense</li>
                  <li>• Création de la technologie blockchain</li>
                  <li>• Consensus distribué</li>
                </ul>
              </div>
            </div>

            {/* Impact économique */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-600" />
              Impact économique
            </h2>

            <div className="bg-green-50 p-6 rounded-xl mb-12">
              <div className="space-y-4 text-gray-700">
                <p>
                  Le Bitcoin a eu un impact majeur sur l'économie mondiale :
                </p>
                <ul className="space-y-2">
                  <li>• Création d'une nouvelle classe d'actifs</li>
                  <li>• Démocratisation de l'investissement</li>
                  <li>• Remise en question du système financier traditionnel</li>
                  <li>• Adoption croissante par les institutions</li>
                </ul>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-yellow-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                Le Bitcoin a ouvert la voie à une nouvelle ère financière en démontrant la 
                viabilité d'un système monétaire décentralisé. Son histoire continue d'influencer 
                l'évolution du secteur des cryptomonnaies et de la finance en général.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons Ethereum et les smart contracts, 
                la prochaine évolution majeure après Bitcoin.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-4"
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
            nextModuleId="module-6"
            currentModuleId="module-5"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}