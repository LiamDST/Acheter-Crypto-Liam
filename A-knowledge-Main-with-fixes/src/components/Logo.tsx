import React from 'react';
import { Star } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3" aria-label="Logo Alyah Knowledge">
      <div className="flex flex-col min-w-[120px] sm:min-w-[140px]">
        <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
          Alyah Knowledge
        </h1>
        <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
          Expert Crypto Trading
        </span>
      </div>
      <div className="flex items-center space-x-0.5 sm:space-x-1 flex-shrink-0">
        <Star className="h-5 w-5 sm:h-6 sm:w-6 text-transparent bg-gradient-to-br from-orange-400 to-red-600 bg-clip-text animate-pulse" />
        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-transparent bg-gradient-to-br from-orange-400 to-red-600 bg-clip-text animate-pulse delay-75" />
        <Star className="h-2 w-2 sm:h-3 sm:w-3 text-transparent bg-gradient-to-br from-orange-400 to-red-600 bg-clip-text animate-pulse delay-150" />
      </div>
    </div>
  );
}