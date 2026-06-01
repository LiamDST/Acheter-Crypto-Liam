import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  BookOpen, 
  Award, 
  ChevronRight, 
  ChevronDown, 
  BarChart2,
  Trophy
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { progressService } from '../lib/progressService';

interface ModuleProgress {
  id: string;
  module_id: string;
  module_name: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress_percentage: number;
  last_activity: string;
  lessons?: LessonProgress[];
  isExpanded?: boolean;
}

interface LessonProgress {
  id: string;
  lesson_id: string;
  lesson_name: string;
  status: 'not_started' | 'in_progress' | 'completed';
  quiz_score?: number | null;
}

interface ProgressTrackerProps {
  userId?: string;
  showDetailedView?: boolean;
  maxModules?: number;
  onModuleClick?: (moduleId: string) => void;
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

export default function ProgressTracker({ 
  userId, 
  showDetailedView = false,
  maxModules,
  onModuleClick
}: ProgressTrackerProps) {
  const [modules, setModules] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overallProgress, setOverallProgress] = useState(0);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchUserProgress();
  }, [userId]);

  const fetchUserProgress = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get progress stats
      const stats = await progressService.getProgressStats(userId);
      if (!stats) {
        setLoading(false);
        return;
      }
      
      setOverallProgress(stats.overallPercentage);

      // Get detailed progress data
      const progressData = await progressService.getUserProgress(userId);
      const quizData = await progressService.getQuizCompletions(userId);
      
      if (!progressData) {
        setLoading(false);
        return;
      }

      // Process and organize the data
      const processedModules = processProgressData(progressData, quizData || []);
      setModules(maxModules ? processedModules.slice(0, maxModules) : processedModules);
    } catch (error) {
      console.error('Error fetching user progress:', error);
      setError('Une erreur est survenue lors du chargement de votre progression');
    } finally {
      setLoading(false);
    }
  };

  const processProgressData = (progressData: any[], quizData: any[]) => {
    // Group by module
    const moduleMap: Record<string, ModuleProgress> = {};
    
    // First, organize progress data by module
    progressData.forEach(item => {
      const moduleId = item.module_id;
      
      if (!moduleMap[moduleId]) {
        moduleMap[moduleId] = {
          id: item.id,
          module_id: item.module_id,
          module_name: item.module_name,
          status: item.status,
          progress_percentage: item.progress_percentage,
          last_activity: item.last_activity,
          lessons: [],
          isExpanded: false
        };
      }
    });
    
    // Add quiz data to the corresponding modules
    quizData.forEach(quiz => {
      const moduleId = quiz.module_id;
      
      if (moduleMap[moduleId]) {
        // If we find a quiz completion, we can consider the module has a lesson completed
        if (!moduleMap[moduleId].lessons) {
          moduleMap[moduleId].lessons = [];
        }
        
        // Create a lesson entry for the quiz
        moduleMap[moduleId].lessons.push({
          id: quiz.id,
          lesson_id: quiz.module_id, // Using module_id as lesson_id for now
          lesson_name: `Leçon ${moduleId.split('-')[1] || ''}`,
          status: 'completed',
          quiz_score: quiz.score
        });
      }
    });
    
    // Convert map to array and sort by module_id
    return Object.values(moduleMap).sort((a, b) => {
      const aNum = parseInt(a.module_id.split('-')[1] || '0');
      const bNum = parseInt(b.module_id.split('-')[1] || '0');
      return aNum - bNum;
    });
  };

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleModuleSelection = (moduleId: string) => {
    if (onModuleClick) {
      onModuleClick(moduleId);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-300" />;
    }
  };

  const getModuleUrl = (moduleId: string) => {
    return moduleIdToUrlMap[moduleId] || `/knowledge/crypto/${moduleId}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-xl text-red-600 text-center">
        {error}
      </div>
    );
  }

  if (modules.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 mb-4">Vous n'avez pas encore commencé la formation</p>
        <Link
          to="/formation/comprendre-la-crypto"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Commencer la formation
        </Link>
      </div>
    );
  }

  // Compact view (for dashboard)
  if (!showDetailedView) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Progression de la formation</h3>
          <Link to="/ma-progression" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
            Voir tous les modules
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progression globale</span>
            <span className="text-sm font-medium text-gray-700">{overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-4">
          {modules.map((module) => (
            <div 
              key={module.module_id}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleModuleSelection(module.module_id)}
            >
              <div className="mr-3">
                {getStatusIcon(module.status)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{module.module_name}</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                      module.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${module.progress_percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="ml-2 text-xs font-medium text-gray-500">
                {module.progress_percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Detailed view (for dedicated progress page)
  return (
    <div className="space-y-8">
      {/* Overall progress card */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="p-4 bg-blue-100 rounded-xl mr-4">
              <Trophy className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Votre progression</h2>
              <p className="text-gray-600">Continuez votre parcours d'apprentissage</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-blue-600">{overallProgress}%</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Modules complétés</p>
              <p className="text-lg font-bold text-gray-900">{modules.filter(m => m.status === 'completed').length}/{modules.length}</p>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${overallProgress}%` }}
          >
            {overallProgress >= 10 && (
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {overallProgress}%
              </span>
            )}
          </div>
        </div>
        
        {overallProgress === 100 ? (
          <div className="bg-green-50 p-4 rounded-xl flex items-start">
            <Award className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-green-800">Félicitations !</p>
              <p className="text-green-700">Vous avez terminé l'intégralité de la formation. Vous pouvez maintenant mettre en pratique vos connaissances.</p>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 p-4 rounded-xl flex items-start">
            <BarChart2 className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-blue-800">Continuez votre progression</p>
              <p className="text-blue-700">Complétez les modules restants pour maîtriser l'ensemble des concepts.</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Modules list */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Modules de formation</h3>
        
        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.module_id} className="border border-gray-200 rounded-xl overflow-hidden">
              <div 
                className={`flex items-center justify-between p-4 cursor-pointer ${
                  module.status === 'completed' 
                    ? 'bg-green-50 hover:bg-green-100' 
                    : module.status === 'in_progress'
                    ? 'bg-blue-50 hover:bg-blue-100'
                    : 'bg-gray-50 hover:bg-gray-100'
                } transition-colors`}
                onClick={() => toggleModuleExpansion(module.module_id)}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    {getStatusIcon(module.status)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{module.module_name}</h4>
                    <p className="text-sm text-gray-600">
                      {module.status === 'completed' 
                        ? 'Terminé' 
                        : module.status === 'in_progress'
                        ? 'En cours'
                        : 'Non commencé'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <span className="text-sm font-medium text-gray-700">{module.progress_percentage}%</span>
                  </div>
                  {expandedModules[module.module_id] ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              
              {expandedModules[module.module_id] && (
                <div className="p-4 bg-white">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ease-out ${
                        module.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                      }`} 
                      style={{ width: `${module.progress_percentage}%` }}
                    ></div>
                  </div>
                  
                  {module.lessons && module.lessons.length > 0 ? (
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center">
                            {getStatusIcon(lesson.status)}
                            <span className="ml-2 text-sm text-gray-700">{lesson.lesson_name}</span>
                          </div>
                          {lesson.quiz_score !== undefined && lesson.quiz_score !== null && (
                            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              Score: {lesson.quiz_score}/3
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Aucune leçon complétée dans ce module</p>
                  )}
                  
                  <div className="mt-4 flex justify-end">
                    <Link
                      to={getModuleUrl(module.module_id)}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      {module.status === 'completed' ? 'Revoir ce module' : 'Continuer ce module'}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}