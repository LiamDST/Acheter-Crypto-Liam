import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  Calendar, 
  Clock, 
  ArrowRight, 
  BarChart2,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import ProgressTracker from '../components/ProgressTracker';
import SEOHead from '../components/SEOHead';
import { progressService } from '../lib/progressService';

export default function ProgressDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextLesson, setNextLesson] = useState<{
    module_id: string;
    module_name: string;
    status: string;
  } | null>(null);
  const [stats, setStats] = useState<{
    totalModules: number;
    completedModules: number;
    inProgressModules: number;
    notStartedModules: number;
    overallPercentage: number;
    lastActivity: string | null;
  } | null>(null);
  const [streakDays, setStreakDays] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Vous devez être connecté pour accéder à cette page');
        setLoading(false);
        return;
      }

      // Get progress stats
      const progressStats = await progressService.getProgressStats();
      if (!progressStats) {
        setLoading(false);
        return;
      }
      
      setStats(progressStats);
      
      // Get next module to study
      const nextModuleData = await progressService.getNextModule();
      setNextLesson(nextModuleData);
      
      // Calculate streak (this is a simplified version - in a real app you'd track daily logins)
      // For demo purposes, we'll generate a random streak between 1-14 days
      setStreakDays(Math.floor(Math.random() * 14) + 1);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Une erreur est survenue lors du chargement de vos données');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 p-6 rounded-xl text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Suivi de Progression"
        description="Suivez votre progression dans la formation crypto, consultez vos statistiques d'apprentissage et reprenez là où vous vous êtes arrêté."
        canonicalUrl="https://alyah-knowledge.com/progress"
        noIndex
      />
      
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Votre Progression</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Suivez votre parcours d'apprentissage et reprenez là où vous vous êtes arrêté
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-xl mr-3">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Progression</h3>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stats?.completedModules || 0}/{stats?.totalModules || 20}</p>
                  <p className="text-sm text-gray-500">Leçons complétées</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">{stats?.overallPercentage || 0}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 rounded-xl mr-3">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Série actuelle</h3>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{streakDays}</p>
                  <p className="text-sm text-gray-500">Jours consécutifs</p>
                </div>
                <div className="flex">
                  {[...Array(Math.min(7, streakDays))].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-3 h-3 rounded-full bg-green-500 ml-1"
                      style={{ opacity: 0.5 + (i * 0.5 / 7) }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-xl mr-3">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Dernière activité</h3>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {stats?.lastActivity ? formatDate(stats.lastActivity) : 'Aucune activité'}
                </p>
                <p className="text-sm text-gray-500">
                  {stats?.lastActivity 
                    ? `Il y a ${Math.round((Date.now() - new Date(stats.lastActivity).getTime()) / (1000 * 60 * 60 * 24))} jours` 
                    : 'Commencez dès maintenant'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-orange-100 rounded-xl mr-3">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Temps estimé</h3>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {stats && stats.totalModules - stats.completedModules > 0 
                    ? `${(stats.totalModules - stats.completedModules) * 15} minutes` 
                    : 'Formation terminée'}
                </p>
                <p className="text-sm text-gray-500">
                  {stats && stats.totalModules - stats.completedModules > 0 
                    ? 'Pour terminer la formation' 
                    : 'Félicitations !'}
                </p>
              </div>
            </div>
          </div>

          {/* Continue learning card */}
          {nextLesson && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2">Continuez votre apprentissage</h3>
                  <p className="text-white/80 mb-4">
                    Reprenez là où vous vous êtes arrêté
                  </p>
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${
                      nextLesson.status === 'in_progress' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}>
                      {nextLesson.status === 'in_progress' 
                        ? <Clock className="h-5 w-5 text-white" />
                        : <BookOpen className="h-5 w-5 text-white" />
                      }
                    </div>
                    <span className="ml-2 font-medium">{nextLesson.module_name}</span>
                  </div>
                </div>
                <Link
                  to={`/knowledge/crypto/${nextLesson.module_id}`}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl 
                    font-medium transition-all duration-300 hover:bg-gray-100 transform 
                    hover:-translate-y-1 shadow-lg"
                >
                  {nextLesson.status === 'in_progress' ? 'Continuer' : 'Commencer'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          )}

          {/* Detailed progress tracker */}
          <ProgressTracker showDetailedView={true} />

          {/* Achievements section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vos réalisations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 
                transition-all duration-300 hover:shadow-md ${stats && stats.completedModules >= 1 ? '' : 'opacity-50'}`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-xl mr-3 ${
                    stats && stats.completedModules >= 1 ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <CheckCircle className={`h-6 w-6 ${
                      stats && stats.completedModules >= 1 ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">Premier pas</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Terminer votre première leçon
                </p>
                {stats && stats.completedModules >= 1 && (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    Obtenu le {stats.lastActivity ? formatDate(stats.lastActivity) : 'récemment'}
                  </div>
                )}
              </div>
              
              <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 
                transition-all duration-300 hover:shadow-md ${stats && stats.completedModules >= 5 ? '' : 'opacity-50'}`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-xl mr-3 ${
                    stats && stats.completedModules >= 5 ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <BarChart2 className={`h-6 w-6 ${
                      stats && stats.completedModules >= 5 ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">Explorateur</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Terminer 5 leçons de la formation
                </p>
                {stats && stats.completedModules >= 5 && (
                  <div className="mt-2 text-xs text-blue-600 font-medium">
                    {stats.completedModules}/5 leçons complétées
                  </div>
                )}
              </div>
              
              <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 
                transition-all duration-300 hover:shadow-md ${stats && stats.completedModules >= 20 ? '' : 'opacity-50'}`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-xl mr-3 ${
                    stats && stats.completedModules >= 20 ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <Award className={`h-6 w-6 ${
                      stats && stats.completedModules >= 20 ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">Expert Crypto</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Terminer l'intégralité de la formation
                </p>
                {stats && stats.completedModules >= 20 && (
                  <div className="mt-2 text-xs text-purple-600 font-medium">
                    Félicitations ! Formation complétée
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommandations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link 
                to="/articles"
                className="flex items-start p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="p-3 bg-blue-100 rounded-xl mr-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Articles recommandés</h3>
                  <p className="text-sm text-gray-600">
                    Approfondissez vos connaissances avec nos articles spécialisés
                  </p>
                  <div className="mt-2 text-blue-600 text-sm font-medium flex items-center">
                    Voir les articles
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/dictionary"
                className="flex items-start p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
              >
                <div className="p-3 bg-purple-100 rounded-xl mr-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Dictionnaire crypto</h3>
                  <p className="text-sm text-gray-600">
                    Consultez notre glossaire des termes techniques
                  </p>
                  <div className="mt-2 text-purple-600 text-sm font-medium flex items-center">
                    Explorer le dictionnaire
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}