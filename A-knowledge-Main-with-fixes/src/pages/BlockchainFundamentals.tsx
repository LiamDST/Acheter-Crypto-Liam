import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Shield, Network, Lock, Cpu, Clock } from 'lucide-react';
import ModuleQuiz from '../components/ModuleQuiz';
import { checkModuleAccess } from '../lib/moduleAccess';
import SEOHead from '../components/SEOHead';
import CourseSchema from '../components/CourseSchema';

export default function BlockchainFundamentals() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (score: number) => {
    if (score === 3) {
      navigate('/fr/formation/comprendre-la-crypto/principes-decentralisation');
    }
  };

  const content = (
    <>
      <SEOHead 
        title="Les Fondamentaux de la Blockchain"
        description="Comprendre les bases de la technologie blockchain et son fonctionnement. Module gratuit de notre formation crypto."
        canonicalUrl="https://alyah-knowledge.com/formation/comprendre-la-crypto/fondamentaux-blockchain"
      />
      
      <CourseSchema
        name="Les Fondamentaux de la Blockchain"
        description="Comprendre les bases de la technologie blockchain et son fonctionnement. Module gratuit de formation crypto."
        isAccessibleForFree={true}
        cssSelector=".bg-white.rounded-2xl.shadow-sm"
      />
      
      {/* Navigation */}
      <Link
        to="/fr/formation/comprendre-la-crypto"
        className="inline-flex items-center text-gray-600 hover:text-blue-600 
          transition-colors duration-200 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Retour aux modules
      </Link>

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl
          bg-gradient-to-br from-blue-600 to-purple-600 text-white mb-6">
          <Brain className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Les Fondamentaux de la Blockchain
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Comprendre les bases de la technologie blockchain et son fonctionnement
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
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl mb-12">
              <p className="text-gray-700 leading-relaxed">
                La <strong>blockchain</strong> est une technologie révolutionnaire qui a transformé le monde numérique 
                en offrant un système sécurisé, décentralisé et transparent pour enregistrer des 
                transactions. Elle est surtout connue pour être la base des cryptomonnaies comme le 
                Bitcoin, mais ses applications vont bien au-delà.
              </p>
            </div>

            {/* Définition */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lock className="h-6 w-6 text-blue-600" />
              Définition de la Blockchain
            </h2>
            <p className="text-gray-700 mb-8">
              La <strong>blockchain</strong> est un registre numérique décentralisé qui enregistre des transactions de manière transparente et 
              immuable. Contrairement aux bases de données traditionnelles qui sont centralisées, 
              la blockchain est répartie sur un réseau d'ordinateurs (appelés <strong>nœuds</strong>) 
              qui travaillent ensemble pour valider et enregistrer les transactions.
            </p>

            {/* Image de la blockchain */}
            <div className="relative h-80 mb-12 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1644088379091-d574269d422f?auto=format&fit=crop&q=80"
                alt="Blockchain Network Visualization"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-sm">
                Visualisation d'un réseau blockchain et ses interconnexions
              </div>
            </div>

            {/* Pourquoi la blockchain */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Network className="h-6 w-6 text-orange-600" />
              Pourquoi la blockchain a-t-elle été créée ?
            </h2>

            <p className="text-gray-700 mb-6">
              Avant d'expliquer le fonctionnement de la blockchain, il est essentiel de comprendre pourquoi cette technologie a vu le jour.
            </p>

            <p className="text-gray-700 mb-6">
              Prenons un exemple simple : une personne souhaite envoyer de l'argent à une autre.
              Dans le <strong>système financier traditionnel</strong>, il est impossible de faire ce transfert directement entre deux individus via Internet sans passer par un <strong>intermédiaire</strong>, comme une banque ou un service de paiement.
            </p>

            <p className="text-gray-700 mb-6">
              Lorsqu'une personne effectue un <strong>virement bancaire</strong>, plusieurs étapes se déroulent :
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>La banque vérifie que le compte de l'émetteur dispose des fonds nécessaires.</li>
              <li>Elle valide la transaction et transfère l'argent au compte du destinataire.</li>
              <li>L'opération est inscrite dans le registre comptable de la banque.</li>
            </ul>

            <p className="text-gray-700 mb-6">
              Le rôle de la banque est donc central. C'est un <strong>tiers de confiance</strong> qui garantit la validité des transactions. Cependant, ce système présente plusieurs inconvénients :
            </p>

            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Dépendance</strong> aux institutions financières qui contrôlent l'accès aux services bancaires.</li>
              <li>Frais de transaction parfois élevés.</li>
              <li>Délais de traitement qui peuvent ralentir les transactions.</li>
              <li>Risque de centralisation et de manipulation des données.</li>
            </ul>

            <p className="text-gray-700 mb-6">
              C'est précisément pour répondre à ces problèmes que la <strong>blockchain</strong> a été créée.
            </p>

            <p className="text-gray-700 mb-8">
              Elle permet de réaliser des transactions de manière <strong>sécurisée</strong>, <strong>transparente</strong> et <strong>sans intermédiaire</strong>, tout en éliminant les risques liés à la centralisation des données.
            </p>

            {/* Fonctionnement */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Cpu className="h-6 w-6 text-purple-600" />
              Comment fonctionne la Blockchain ?
            </h2>

            <p className="text-gray-700 mb-6">
              La blockchain est un <strong>registre numérique décentralisé</strong> qui enregistre toutes les transactions effectuées sur un réseau.
              Elle fonctionne comme un grand livre comptable, mais au lieu d'être contrôlé par une seule entité, il est partagé entre de nombreux participants appelés <strong>nœuds</strong>.
            </p>

            <p className="text-gray-700 mb-6">
              Chaque transaction effectuée sur la blockchain est inscrite dans un <strong>bloc de données</strong>, qui est ensuite ajouté à une chaîne de blocs. Ce processus suit plusieurs étapes :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Enregistrement et Validation</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span><strong>Enregistrement</strong> de la transaction sur le réseau</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span><strong>Regroupement</strong> des transactions dans un bloc</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span><strong>Validation</strong> par les mineurs ou validateurs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mécanismes de Consensus</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span><strong>Proof of Work (PoW)</strong> : Résolution de problèmes cryptographiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span><strong>Proof of Stake (PoS)</strong> : Mise en jeu de cryptomonnaies</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Différence Blockchain vs Bitcoin */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Network className="h-6 w-6 text-blue-600" />
              Différence entre la Blockchain et le Bitcoin
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">La Blockchain</h3>
                <p className="text-gray-700">
                  Une <strong>technologie</strong>, un protocole informatique qui permet de stocker et de sécuriser des transactions de manière décentralisée.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Le Bitcoin</h3>
                <p className="text-gray-700">
                  Une <strong>application</strong> de la blockchain, une cryptomonnaie qui utilise cette technologie pour exister et fonctionner.
                </p>
              </div>
            </div>

            {/* Avantages */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-green-600" />
              Pourquoi la blockchain est-elle révolutionnaire ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="flex items-start gap-4 p-6 bg-green-50 rounded-xl">
                <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sécurité et Immuabilité</h3>
                  <p className="text-gray-700">
                    Une fois une transaction enregistrée, elle ne peut plus être modifiée ni supprimée.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl">
                <Network className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Décentralisation</h3>
                  <p className="text-gray-700">
                    Les données sont réparties sur des milliers d'ordinateurs à travers le monde.
                  </p>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                La blockchain est une technologie qui a le potentiel de révolutionner de nombreux 
                secteurs en offrant <strong>sécurité</strong>, <strong>transparence</strong> et <strong>décentralisation</strong>. Son adoption 
                croissante laisse entrevoir un avenir où les transactions seront plus sécurisées, 
                efficaces et accessibles à tous.
              </p>
              <p className="text-gray-700">
                Dans les prochains modules, nous aborderons des sujets plus avancés comme les 
                principes de la décentralisation, la cryptographie et la sécurité, ainsi que les 
                différents types de blockchain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <Link
          to="/fr/formation/comprendre-la-crypto"
          className="flex items-center justify-center px-4 py-3 rounded-xl bg-gray-100
            text-gray-700 font-medium transition-all duration-200 hover:bg-gray-200
            text-sm sm:text-base sm:px-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2 flex-shrink-0" />
          <span className="whitespace-nowrap">Retour aux modules</span>
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
            nextModuleId="module-2"
            currentModuleId="module-1"
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
}