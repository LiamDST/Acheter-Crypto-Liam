import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import ModuleProgressBar from './ModuleProgressBar';
import { progressService } from '../lib/progressService';

interface LessonNavigationProps {
  currentModuleId: string;
  onStartQuiz?: () => void;
  showQuizButton?: boolean;
}

interface Module {
  id: string;
  title: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
}

// Mapping des anciens IDs de module vers les nouvelles URLs
const moduleIdToUrlMap: Record<string, string> = {
  'module-1': '/formation/comprendre-la-crypto/fondamentaux-blockchain',
  'module-2': '/formation/comprendre-la-crypto/principes-decentralisation',
  'module-3': '/formation/comprendre-la-crypto/cryptographie-securite',
  'module-4': '/formation/comprendre-la-crypto/types-blockchain',
  'module-5': '/formation/comprendre-la-crypto/bitcoin-histoire',
  'module-6': '/formation/comprendre-la-crypto/ethereum-smart-contracts',
  'module-7': '/formation/comprendre-la-crypto/types-tokens',
  'module-8': '/formation/comprendre-la-crypto/securite-wallets',
  'module-9': '/formation/comprendre-la-crypto/indicateurs-techniques',
  'module-10': '/formation/comprendre-la-crypto/analyse-graphiques',
  'module-11': '/formation/comprendre-la-crypto/patterns-trading',
  'module-12': '/formation/comprendre-la-crypto/gestion-risque',
  'module-13': '/formation/comprendre-la-crypto/protocoles-defi',
  'module-14': '/formation/comprendre-la-crypto/yield-farming',
  'module-15': '/formation/comprendre-la-crypto/pools-liquidite',
  'module-16': '/formation/comprendre-la-crypto/stablecoins',
  'module-17': '/formation/comprendre-la-crypto/securisation-wallets',
  'module-18': '/formation/comprendre-la-crypto/arnaques-crypto',
  'module-19': '/formation/comprendre-la-crypto/gestion-portfolio',
  'module-20': '/formation/comprendre-la-crypto/strategies-avancees',
};

// Mapping inverse pour obtenir l'ID du module à partir de l'URL
const urlToModuleIdMap: Record<string, string> = Object.entries(moduleIdToUrlMap).reduce(
  (acc, [moduleId, url]) => {
    acc[url] = moduleId;
    return acc;
  },
  {} as Record<string, string>
);

export default function LessonNavigation({ 
  currentModuleId,
  onStartQuiz,
  showQuizButton = true
}: LessonNavigationProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchModules();
    updateCurrentModuleProgress();
  }, [currentModuleId]);

  const fetchModules = async () => {
    try {
      setLoading(true);
      
      // Fetch modules from database
      const { data: modulesData, error: modulesError } = await supabase
        .from('modules')
        .select('*')
        .order('order', { ascending: true });
        
      if (modulesError) throw modulesError;
      
      // Fetch user progress
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // If not authenticated, just show modules without progress
        const formattedModules = modulesData.map(module => ({
          id: module.id,
          title: module.title,
          status: module.id === 'module-1' ? 'not_started' : 'not_started',
          progress: 0
        }));
        
        setModules(formattedModules);
        setLoading(false);
        return;
      }
      
      // Fetch user progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', session.user.id);
        
      if (progressError) throw progressError;
      
      // Combine modules with progress data
      const formattedModules = modulesData.map(module => {
        const progress = progressData?.find(p => p.module_id === module.id);
        
        return {
          id: module.id,
          title: module.title,
          status: progress?.status || 'not_started',
          progress: progress?.progress_percentage || 0
        };
      });
      
      setModules(formattedModules);
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update the current module's progress to "in_progress" if it's not already completed
  const updateCurrentModuleProgress = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const userId = session.user.id;
      
      // Convert URL path to module ID if needed
      let moduleId = currentModuleId;
      if (currentModuleId.startsWith('/')) {
        moduleId = urlToModuleIdMap[currentModuleId] || currentModuleId;
      }
      
      // Get current module progress
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .maybeSingle();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking progress:', error);
        return;
      }
      
      // If module is not started or no record exists, mark as in_progress
      if (!data || data.status === 'not_started') {
        await progressService.startModule(userId, moduleId);
      }
    } catch (error) {
      console.error('Error updating module progress:', error);
    }
  };

  const getCurrentModuleIndex = () => {
    return modules.findIndex(m => m.id === currentModuleId);
  };

  const getPreviousModule = () => {
    const currentIndex = getCurrentModuleIndex();
    return currentIndex > 0 ? modules[currentIndex - 1] : null;
  };

  const getNextModule = () => {
    const currentIndex = getCurrentModuleIndex();
    return currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;
  };

  const getModuleUrl = (moduleId: string) => {
    return moduleIdToUrlMap[moduleId] || `/knowledge/crypto/${moduleId}`;
  };

  const previousModule = getPreviousModule();
  const nextModule = getNextModule();

  if (loading || modules.length === 0) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress bar */}
      <ModuleProgressBar 
        modules={modules} 
        currentModuleId={currentModuleId} 
      />
      
      {/* Navigation buttons */}
      <div className="grid grid-cols-2 gap-4">
        {previousModule ? (
          <Link
            to={getModuleUrl(previousModule.id)}
            className="flex items-center justify-center px-4 py-3 rounded-xl bg-gray-100
              text-gray-700 font-medium transition-all duration-200 hover:bg-gray-200
              text-sm sm:text-base sm:px-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="whitespace-nowrap">Leçon précédente</span>
          </Link>
        ) : (
          <Link
            to="/formation/comprendre-la-crypto"
            className="flex items-center justify-center px-4 py-3 rounded-xl bg-gray-100
              text-gray-700 font-medium transition-all duration-200 hover:bg-gray-200
              text-sm sm:text-base sm:px-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="whitespace-nowrap">Toutes les leçons</span>
          </Link>
        )}
        
        {showQuizButton ? (
          <button
            onClick={onStartQuiz}
            className="flex items-center justify-center px-4 py-3 rounded-xl 
              bg-gradient-to-r from-blue-600 to-purple-600 text-white
              font-medium transition-all duration-200 hover:from-blue-700 
              hover:to-purple-700 transform hover:-translate-y-1
              text-sm sm:text-base sm:px-6"
          >
            <span className="whitespace-nowrap">Passer au quiz</span>
            <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0" />
          </button>
        ) : nextModule ? (
          <Link
            to={getModuleUrl(nextModule.id)}
            className="flex items-center justify-center px-4 py-3 rounded-xl 
              bg-gradient-to-r from-blue-600 to-purple-600 text-white
              font-medium transition-all duration-200 hover:from-blue-700 
              hover:to-purple-700 transform hover:-translate-y-1
              text-sm sm:text-base sm:px-6"
          >
            <span className="whitespace-nowrap">Leçon suivante</span>
            <ArrowRight className="h-5 w-5 ml-2 flex-shrink-0" />
          </Link>
        ) : (
          <Link
            to="/formation/certificat-reussite"
            className="flex items-center justify-center px-4 py-3 rounded-xl 
              bg-gradient-to-r from-green-600 to-teal-600 text-white
              font-medium transition-all duration-200 hover:from-green-700 
              hover:to-teal-700 transform hover:-translate-y-1
              text-sm sm:text-base sm:px-6"
          >
            <BookOpen className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="whitespace-nowrap">Terminer la formation</span>
          </Link>
        )}
      </div>
    </div>
  );
}