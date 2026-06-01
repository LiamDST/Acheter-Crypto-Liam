import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if we have a current session first
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData.session) {
          // User is already authenticated, redirect to dashboard
          const referrer = document.referrer;
          const currentLang = referrer.includes('/en') ? 'en' : 'fr';
          navigate(`/${currentLang}/dashboard`, { replace: true });
          return;
        }

        // Check for auth tokens in the URL hash (OAuth flow)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const error = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');

        if (error) {
          console.error('OAuth error:', error, errorDescription);
          setError(errorDescription || error);
          setLoading(false);
          return;
        }

        if (accessToken) {
          // Set the session with the tokens from OAuth
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });

          if (sessionError) {
            console.error('Error setting session:', sessionError);
            setError(sessionError.message);
            setLoading(false);
            return;
          }

          if (data.session && data.user) {
            // Clean the URL hash to remove tokens
            window.history.replaceState(null, '', window.location.pathname);
            
            // Get the current language from the referrer or default to French
            const referrer = document.referrer;
            const currentLang = referrer.includes('/en') ? 'en' : 'fr';
            
            // Redirect to dashboard with the current language
            navigate(`/${currentLang}/dashboard`, { replace: true });
          }
        } else {
          // No tokens found, redirect to home
          console.log('No auth tokens found in callback');
          navigate('/', { replace: true });
        }
      } catch (err) {
        console.error('Unexpected error in auth callback:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t('auth.authenticationFailed')}
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
              transition-colors duration-200"
          >
            {t('auth.backToHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {t('auth.completingAuthentication')}
        </h2>
        <p className="text-gray-600">
          {t('auth.pleaseWait')}
        </p>
      </div>
    </div>
  );
}