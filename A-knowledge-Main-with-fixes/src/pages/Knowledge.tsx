import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LineChart, Rows as Browser, Lock, Tag } from 'lucide-react';
import FAQ from '../components/FAQ';
import { supabase } from '../lib/supabaseClient';
import SEOHead from '../components/SEOHead';

const faqItems = [
  {
    question: "Comment fonctionne la formation trading d'Alyah Knowledge ?",
    answer: "Notre formation combine des ressources éducatives en ligne, des webinaires interactifs, et un accompagnement personnalisé. Vous progressez à votre rythme avec des modules structurés, des exercices pratiques, et un accès à notre communauté d'apprentissage."
  },
  {
    question: "Quel niveau est requis pour suivre vos formations ?",
    answer: "Nos formations s'adaptent à tous les niveaux, du débutant à l'expert. Nous commençons par les fondamentaux de la blockchain et du trading, puis progressons vers des stratégies plus avancées selon votre niveau et vos objectifs."
  },
  {
    question: "Quels sont les sujets couverts dans vos formations ?",
    answer: "Nos formations couvrent l'analyse technique, l'analyse fondamentale, la gestion des risques, la psychologie du trading, les stratégies d'investissement, et l'utilisation des outils de trading avancés."
  },
  {
    question: "Comment accéder aux ressources éducatives ?",
    answer: "Toutes nos ressources éducatives sont accessibles en ligne via notre plateforme sécurisée. Vous pouvez y accéder 24/7 depuis n'importe quel appareil connecté à internet."
  }
];

export default function Knowledge() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <SEOHead />
      
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Comprendre les Cryptomonnaies</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explorez nos ressources éducatives et suivez le marché des cryptomonnaies en temps réel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Link
              to="/marche-cryptomonnaies-temps-reel"
              className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div className="p-4 bg-blue-100 rounded-xl mr-4 
                  transition-transform duration-300 group-hover:scale-110">
                  <LineChart className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 
                  transition-colors duration-300 group-hover:text-blue-600">
                  Marché en temps réel
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Suivez les cours des cryptomonnaies en direct, analysez les tendances
                et prenez des décisions éclairées.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Prix en temps réel</li>
                <li>• Variations sur 24h et 7j</li>
                <li>• Graphiques d'évolution</li>
                <li>• Capitalisation du marché</li>
              </ul>
            </Link>

            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 
              transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-purple-100 rounded-xl mr-4 
                  transition-transform duration-300 group-hover:scale-110">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 
                  transition-colors duration-300 group-hover:text-purple-600">
                  Formation Crypto
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Découvrez les fondamentaux de la blockchain et des cryptomonnaies
                à travers nos guides détaillés.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Introduction à la blockchain</li>
                <li>• Fonctionnement des cryptomonnaies</li>
                <li>• Stratégies d'investissement</li>
                <li>• Analyses techniques et fondamentales</li>
              </ul>
              
              <Link
                to="/formation/comprendre-la-crypto"
                className="inline-flex items-center mt-4 text-purple-600 hover:text-purple-800 transition-colors"
              >
                Accéder à la formation
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <Link
              to="/articles"
              className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div className="p-4 bg-green-100 rounded-xl mr-4 
                  transition-transform duration-300 group-hover:scale-110">
                  <Browser className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 
                  transition-colors duration-300 group-hover:text-green-600">
                  Articles
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Consultez nos derniers articles sur les cryptomonnaies, la blockchain
                et les tendances du marché.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Analyses de marché</li>
                <li>• Guides pratiques</li>
                <li>• Actualités crypto</li>
                <li>• Conseils d'experts</li>
              </ul>
            </Link>

            <Link
              to="/dictionnaire-crypto"
              className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div className="p-4 bg-orange-100 rounded-xl mr-4 
                  transition-transform duration-300 group-hover:scale-110">
                  <Tag className="h-8 w-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 
                  transition-colors duration-300 group-hover:text-orange-600">
                  Dictionnaire Crypto
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Explorez notre dictionnaire complet des termes et concepts de la cryptomonnaie
                et de la blockchain.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Définitions claires</li>
                <li>• Termes techniques</li>
                <li>• Concepts fondamentaux</li>
                <li>• Catégories thématiques</li>
              </ul>
            </Link>
          </div>
        </div>
        <FAQ items={faqItems} />
      </div>
    </>
  );
}