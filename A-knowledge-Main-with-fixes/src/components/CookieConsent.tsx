import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

export default function CookieConsent() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-fade-in-up" role="dialog" aria-labelledby="cookie-title">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-sm w-full">
        {/* Header avec bouton fermer */}
        <div className="flex items-center justify-between mb-4">
          <h3 id="cookie-title" className="text-lg font-semibold text-gray-900 flex items-center">
            🍪 {t('cookie.title')}
          </h3>
          <button
            onClick={handleDecline}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Refuser les cookies"
          >
            <X className="h-5 w-5 text-gray-500" aria-hidden="true" />
          </button>
        </div>
        
        {/* Message principal */}
        <p className="text-gray-600 text-sm mb-6">
          {t('cookie.message')}
        </p>
        
        {/* Footer avec logo et boutons */}
        <div className="flex items-center justify-between">
          {/* Logo en bas à gauche */}
          <div className="scale-75 origin-left">
            <Logo />
          </div>
          
          {/* Boutons d'action */}
          <div className="flex items-center space-x-2 -ml-8">
            <button
              onClick={handleDecline}
              className="px-2 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 
                hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 
                focus:ring-gray-400 focus:ring-offset-2"
            >
              {t('cookie.deny')}
            </button>
            <button
              onClick={handleAccept}
              className="px-3 py-2 text-xs font-medium text-white bg-gradient-to-r 
                from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 
                transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none 
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
            >
              {t('cookie.accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}