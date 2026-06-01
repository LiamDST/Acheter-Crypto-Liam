import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLanguage } from '../i18n';

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className }: LanguageToggleProps) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const current = (i18n.language || 'fr').startsWith('fr') ? 'fr' : 'en';

  const handleToggle = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const next = current === 'fr' ? 'en' : 'fr';
    
    // Smooth animation before language change
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Update language
    setLanguage(next);
    
    // Update URL smoothly
    const currentPath = location.pathname;
    let newPath;
    
    if (currentPath.startsWith('/fr') || currentPath.startsWith('/en')) {
      newPath = currentPath.replace(/^\/(fr|en)/, `/${next}`);
    } else {
      newPath = `/${next}${currentPath === '/' ? '' : currentPath}`;
    }
    
    navigate(newPath, { replace: true });
    
    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isAnimating}
      className={`
        ${className ?? 
          // Mobile: minimal column layout like AuthButton, Desktop: full toggle
          'sm:inline-flex sm:items-center sm:gap-2 sm:px-3 sm:py-1.5 sm:rounded-full sm:border sm:border-gray-200 sm:bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md'
        }
        transition-all duration-300 ease-out transform hover:scale-105 active:scale-95
        ${isAnimating ? 'pointer-events-none' : ''}
      `}
      aria-label={current === 'fr' ? 'Switch to English' : 'Passer en français'}
      title={current === 'fr' ? 'English' : 'Français'}
    >
      {/* Mobile: Globe with text below (same layout as AuthButton) */}
      <div className="sm:hidden flex flex-col items-center">
        <div className="relative p-2">
          <Globe2 className={`h-5 w-5 transition-all duration-500 ease-out ${
            isAnimating ? 'rotate-180 scale-110' : ''
          } ${current === 'fr' ? 'text-blue-600' : 'text-green-600'}`} />
        </div>
        <span className="text-xs text-gray-600">{current === 'fr' ? 'FR' : 'EN'}</span>
      </div>

      {/* Desktop: Full toggle */}
      <div className="hidden sm:flex sm:items-center sm:gap-2">
        <Globe2 className={`h-4 w-4 transition-all duration-300 ease-out ${isAnimating ? 'rotate-180' : ''}`} />
        <span className={`text-sm font-medium transition-all duration-300 ease-out ${isAnimating ? 'opacity-70' : ''}`}>
          {current === 'fr' ? 'FR' : 'EN'}
        </span>
        <span
          className="ml-1 inline-block w-8 h-5 rounded-full bg-gray-100 relative overflow-hidden shadow-inner"
          aria-hidden="true"
        >
          <span
            className={`
              absolute top-0.5 h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm
              transition-all duration-700 ease-out transform
              ${current === 'fr' ? 'left-0.5' : 'left-3.5'}
              ${isAnimating ? 'scale-110' : 'scale-100'}
            `}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          />
        </span>
      </div>
    </button>
  );
}