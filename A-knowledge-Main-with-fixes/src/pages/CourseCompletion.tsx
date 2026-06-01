import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, BookOpen, ArrowRight, Sparkles, Star } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function CourseCompletion() {
  return (
    <>
      <SEOHead
        title="Certificat de Réussite | Formation Crypto Alyah Knowledge"
        description="Félicitations pour votre parcours ! Téléchargez votre certificat de réussite et poursuivez votre progression dans le trading crypto."
        canonicalUrl="https://alyah-knowledge.com/formation/certificat-reussite"
        noIndex
      />
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 text-center">
            {/* Confetti animation */}
            <div className="fixed inset-0 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-10%`,
                    animationDelay: `${Math.random() * 3}s`,
                    backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                  }}
                />
              ))}
            </div>

            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-12 w-12 text-white" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Félicitations ! 🎉
            </h1>
            
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Vous avez terminé avec succès la formation complète sur les cryptomonnaies et le trading ! 
              C'est une étape importante dans votre parcours d'investisseur.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
                Et maintenant ?
              </h2>
              <p className="text-gray-700 mb-4">
                Votre voyage ne fait que commencer ! Vous disposez maintenant des connaissances nécessaires pour naviguer 
                sereinement dans l'univers des cryptomonnaies. Nous vous remercions sincèrement d'avoir suivi cette 
                formation avec sérieux et engagement.
              </p>
              <p className="text-gray-700">
                N'oubliez pas que le marché crypto évolue constamment. Restez à jour avec nos articles, 
                nos signaux de trading et nos analyses de marché pour optimiser vos investissements.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/comprendre-les-cryptomonnaies"
                className="px-6 py-3 rounded-xl bg-white border-2 border-gray-200 
                  text-gray-700 font-medium hover:border-blue-500 transition-all 
                  duration-200 flex items-center justify-center"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Centre de ressources
              </Link>
              
              <Link
                to="/articles"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                  text-white font-medium hover:from-blue-700 hover:to-purple-700 
                  transition-all duration-200 transform hover:-translate-y-1 
                  flex items-center justify-center"
              >
                Découvrir nos articles
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}