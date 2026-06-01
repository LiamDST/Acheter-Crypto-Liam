import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ModuleProgressBarProps {
  modules: {
    id: string;
    title: string;
    status: 'not_started' | 'in_progress' | 'completed';
    progress: number;
  }[];
  currentModuleId?: string;
  compact?: boolean;
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

export default function ModuleProgressBar({ 
  modules, 
  currentModuleId,
  compact = false
}: ModuleProgressBarProps) {
  // Find the index of the current module
  const currentIndex = currentModuleId 
    ? modules.findIndex(m => m.id === currentModuleId)
    : -1;

  const getModuleUrl = (moduleId: string) => {
    return moduleIdToUrlMap[moduleId] || `/knowledge/crypto/${moduleId}`;
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        {modules.map((module, index) => (
          <div 
            key={module.id}
            className={`h-full ${
              module.status === 'completed' 
                ? 'bg-green-500' 
                : module.status === 'in_progress' 
                ? 'bg-blue-500'
                : 'bg-gray-300'
            } transition-all duration-300`}
            style={{ 
              width: `${100 / modules.length}%`,
              opacity: currentIndex === index ? 1 : 0.7
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full mb-8">
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
        
        {/* Module indicators */}
        <div className="relative z-10 flex justify-between">
          {modules.map((module, index) => {
            const isCurrent = currentModuleId === module.id;
            
            return (
              <Link
                key={module.id}
                to={getModuleUrl(module.id)}
                className={`flex flex-col items-center ${
                  index === 0 ? 'ml-0' : index === modules.length - 1 ? 'mr-0' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  module.status === 'completed' 
                    ? 'bg-green-500 text-white' 
                    : module.status === 'in_progress'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                } ${isCurrent ? 'ring-4 ring-blue-200' : ''}`}>
                  {module.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : module.status === 'in_progress' ? (
                    <Clock className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>
                
                {!compact && (
                  <span className={`mt-2 text-xs font-medium ${
                    isCurrent ? 'text-blue-600' : 'text-gray-500'
                  } text-center max-w-[80px] truncate`}>
                    {module.title}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}