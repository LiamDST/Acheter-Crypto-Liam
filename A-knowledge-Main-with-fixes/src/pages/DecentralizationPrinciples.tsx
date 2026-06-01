import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Network, Shield, Lock, Users, Clock } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import { checkModuleAccess } from '../lib/moduleAccess';
import CourseSchema from '../components/CourseSchema';
import SEOHead from '../components/SEOHead';

export default function DecentralizationPrinciples() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        setLoading(true);
        const access = await checkModuleAccess('module-2');
        setHasAccess(access);
      } catch (error) {
        console.error('Error verifying module access:', error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAccess();
  }, []);

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/knowledge/crypto/module-3');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Contenu Premium
          </h3>
          <p className="text-gray-600 mb-6">
            Ce module est réservé aux membres avec un abonnement actif. 
            Découvrez nos offres d'abonnement pour accéder à l'intégralité de nos formations.
          </p>
          <button
            onClick={() => {
              const currentLang = location.pathname.match(/^\/(fr|en)/)?.[1] || 'fr';
              navigate(`/${currentLang}/solutions`);
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl
              hover:from-blue-700 hover:to-purple-700 transition-colors"
          >
            Découvrir nos abonnements
          </button>
        </div>
      </div>
    );
  }

  const content = (
    <>
      <SEOHead
        title="Principes de Décentralisation | Fondements de la Blockchain"
        description="Découvrez comment la décentralisation renforce la sécurité, la transparence et l’autonomie des réseaux blockchain."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/principes-decentralisation"
      />

      <CourseSchema
        name="Les Principes de la Décentralisation"
        description="Comprendre les fondements et les avantages de la décentralisation dans la blockchain. Module premium de formation crypto."
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
          bg-gradient-to-br from-purple-600 to-pink-600 text-white mb-6">
          <Network className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Les Principes de la Décentralisation
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Comprendre les fondements et les avantages de la décentralisation dans la blockchain
        </p>
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full
          bg-gray-100 text-gray-600 text-sm">
          <Clock className="w-4 h-4 mr-2" />
          Temps de lecture : 12 minutes
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                La <strong>décentralisation</strong> est l'un des principes fondamentaux qui distingue la blockchain 
                des systèmes traditionnels. Elle représente un changement de paradigme majeur dans la manière 
                dont nous gérons et sécurisons les données, les transactions et les interactions numériques.
              </p>
            </div>

            {/* Qu'est-ce que la décentralisation ? */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Network className="h-6 w-6 text-purple-600" />
              Qu'est-ce que la décentralisation ?
            </h2>

            <p className="text-gray-700 mb-8">
              La décentralisation dans le contexte de la blockchain signifie qu'aucune entité unique 
              ne contrôle le réseau. Au lieu de cela, le pouvoir et les responsabilités sont distribués 
              entre tous les participants du réseau, créant ainsi un système plus démocratique et résilient.
            </p>

            {/* Image illustrative */}
            <div className="relative h-80 mb-12 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80"
                alt="Réseau décentralisé de noeuds blockchain"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-sm">
                Visualisation d'un réseau décentralisé et de ses interconnexions
              </div>
            </div>

            {/* Les trois piliers de la décentralisation */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-green-600" />
              Les trois piliers de la décentralisation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Architecture</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Distribution des nœuds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Redondance des données</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>Résistance aux pannes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Politique</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Gouvernance distribuée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Prise de décision collective</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>Équité du système</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Logique</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Consensus distribué</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Smart contracts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Automatisation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Avantages de la décentralisation */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lock className="h-6 w-6 text-blue-600" />
              Avantages de la décentralisation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Sécurité renforcée</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Pas de point unique de défaillance</li>
                  <li>• Résistance aux attaques DDoS</li>
                  <li>• Protection contre la censure</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Transparence</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Historique immuable</li>
                  <li>• Auditabilité publique</li>
                  <li>• Traçabilité des transactions</li>
                </ul>
              </div>
            </div>

            {/* Défis de la décentralisation */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Users className="h-6 w-6 text-orange-600" />
              Défis de la décentralisation
            </h2>

            <div className="bg-orange-50 p-6 rounded-xl mb-12">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                  <span><strong>Scalabilité</strong> : La décentralisation peut ralentir les transactions et augmenter les coûts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                  <span><strong>Coordination</strong> : La prise de décision collective peut être plus lente et complexe.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                  <span><strong>Responsabilité</strong> : L'absence d'autorité centrale peut compliquer la résolution des problèmes.</span>
                </li>
              </ul>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                La décentralisation est bien plus qu'une simple caractéristique technique de la blockchain. 
                C'est un changement fondamental dans la manière dont nous organisons les systèmes et les 
                interactions numériques. Malgré ses défis, elle offre des avantages uniques qui la rendent 
                indispensable pour l'avenir des technologies blockchain.
              </p>
              <p className="text-gray-700">
                Dans le prochain module, nous explorerons en détail la cryptographie et la sécurité, 
                des éléments essentiels qui permettent à la décentralisation de fonctionner efficacement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/knowledge/crypto/module-1"
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
            text-sm sm:text-base sm:px-6 w-full"
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
            nextModuleId="module-3"
            currentModuleId="module-2"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}