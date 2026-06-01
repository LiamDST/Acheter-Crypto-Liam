import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLanguage } from '../i18n';

interface FloatingLanguageToggleProps {
  className?: string;
}

export default function FloatingLanguageToggle({ className }: FloatingLanguageToggleProps) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const current = (i18n.language || 'fr').startsWith('fr') ? 'fr' : 'en';

  // Handle scroll behavior - hide/show button based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show button when scrolling up or at top, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [lastScrollY]);

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
        fixed bottom-6 right-6 z-50
        flex items-center gap-3 px-4 py-3 
        bg-white/90 backdrop-blur-md border border-gray-200/50
        rounded-full shadow-lg hover:shadow-xl
        text-gray-700 hover:text-blue-600 hover:border-blue-300
        transition-all duration-300 ease-out
        transform hover:scale-105 active:scale-95
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
        ${isAnimating ? 'pointer-events-none' : ''}
        ${className || ''}
      `}
      aria-label={current === 'fr' ? 'Switch to English' : 'Passer en français'}
      title={current === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      {/* Globe icon with rotation animation */}
      <Globe2 
        className={`h-5 w-5 transition-all duration-500 ease-out ${
          isAnimating ? 'rotate-180 scale-110' : ''
        } ${current === 'fr' ? 'text-blue-600' : 'text-green-600'}`} 
      />
      
      {/* Language indicator */}
      <span className={`text-sm font-medium transition-all duration-300 ease-out ${
        isAnimating ? 'opacity-70' : ''
      }`}>
        {current === 'fr' ? 'FR' : 'EN'}
      </span>
      
      {/* Toggle switch visual indicator */}
      <span
        className="inline-block w-10 h-6 rounded-full bg-gray-100 relative overflow-hidden shadow-inner"
        aria-hidden="true"
      >
        <span
          className={`
            absolute top-0.5 h-5 w-5 rounded-full bg-gradient-to-r shadow-sm
            transition-all duration-700 ease-out transform
            ${current === 'fr' 
              ? 'left-0.5 from-blue-500 to-blue-600' 
              : 'left-4.5 from-green-500 to-green-600'
            }
            ${isAnimating ? 'scale-110' : 'scale-100'}
          `}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
          }}
        />
      </span>
      
      {/* Ripple effect on click */}
      <span 
        className={`absolute inset-0 rounded-full bg-blue-400/20 scale-0 
          ${isAnimating ? 'animate-ping scale-150' : ''}`}
        aria-hidden="true"
      />
    </button>
  );
}