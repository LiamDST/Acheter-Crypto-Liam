import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Award } from 'lucide-react';
import { progressService } from '../../lib/progressService';

export default function ProgressWidget() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    totalModules: number;
    completedModules: number;
    inProgressModules: number;
    notStartedModules: number;
    overallPercentage: number;
    lastActivity: string | null;
  } | null>(null);
  const [nextModule, setNextModule] = useState<{
    module_id: string;
    module_name: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch progress stats
      const progressStats = await progressService.getProgressStats();
      setStats(progressStats);
      
      // Fetch next module to study
      const nextModuleData = await progressService.getNextModule();
      setNextModule(nextModuleData);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mapping des anciens IDs de module vers les nouvelles URLs
  const getModuleUrl = (moduleId: string) => {
    const moduleMap: Record<string, string> = {
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
    
    return moduleMap[moduleId] || `/knowledge/crypto/${moduleId}`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
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

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-gray-900">Progression de la formation</h3>
        <Link to="/progress" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
          Voir en détail
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progression globale</span>
          <span className="text-sm font-medium text-gray-700">{stats.overallPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${stats.overallPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{stats.completedModules} modules terminés</span>
          <span>{stats.totalModules - stats.completedModules} restants</span>
        </div>
      </div>
      
      {nextModule && (
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <h4 className="font-medium text-gray-900 text-sm mb-2">Continuer l'apprentissage</h4>
          <Link 
            to={getModuleUrl(nextModule.module_id)}
            className="flex justify-between items-center"
          >
            <span className="text-blue-700">{nextModule.module_name}</span>
            <ChevronRight className="h-4 w-4 text-blue-600" />
          </Link>
        </div>
      )}
      
      {stats.overallPercentage === 100 && (
        <div className="bg-green-50 rounded-xl p-4 flex items-center">
          <Award className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-700 text-sm">Formation complétée !</span>
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-blue-600">{stats.completedModules}</div>
          <div className="text-xs text-gray-500">Terminés</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-orange-600">{stats.inProgressModules}</div>
          <div className="text-xs text-gray-500">En cours</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-600">{stats.notStartedModules}</div>
          <div className="text-xs text-gray-500">À faire</div>
        </div>
      </div>
    </div>
  );
}