import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Lock } from 'lucide-react';

interface SubscriptionCheckProps {
  children: React.ReactNode;
  moduleId?: string;
  redirectTo?: string;
  requireAuth?: boolean;
}

export default function SubscriptionCheck({
  children,
  moduleId = '',
  redirectTo,
  requireAuth = true
}: SubscriptionCheckProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentLang = location.pathname.match(/^\/(fr|en)/)?.[1] || 'fr';
  const finalRedirectTo = redirectTo || `/${currentLang}/solutions`;
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  // Free module - blockchain introduction
  const isFreeModule = moduleId === 'module-1';

  useEffect(() => {
    const checkAccess = async () => {
      try {
        setLoading(true);
        
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        const isUserAuthenticated = !!session;
        setIsAuthenticated(isUserAuthenticated);
        
        if (!isUserAuthenticated) {
          // If authentication is required and user is not authenticated
          if (requireAuth) {
            navigate('/');
            return;
          }
          
          setHasAccess(false);
          setLoading(false);
          return;
        }
        
        // If it's the free module and user is authenticated, grant access
        if (isFreeModule) {
          setHasAccess(true);
          setLoading(false);
          return;
        }
        
        // Check if user has active subscription
        const { data: subscriptions, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('status', 'active')
          .lt('start_date', new Date().toISOString())
          .gt('end_date', new Date().toISOString())
          .limit(1);
          
        if (error) {
          console.error('Error checking subscription:', error);
          setHasAccess(false);
        } else {
          setHasAccess(subscriptions && subscriptions.length > 0);
        }
      } catch (error) {
        console.error('Error in access check:', error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAccess();
  }, [moduleId, navigate, isFreeModule, requireAuth]);

  const handleSubscribeClick = () => {
    navigate(finalRedirectTo);
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If user is not authenticated and authentication is required
  if (!isAuthenticated && requireAuth) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Contenu réservé aux membres
        </h3>
        <p className="text-gray-600 mb-6">
          Inscrivez-vous gratuitement pour accéder à la première leçon : « Qu'est-ce que la blockchain ? » 
          et commencez à découvrir l'univers des cryptomonnaies.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl 
            hover:from-blue-700 hover:to-purple-700 transition-colors"
        >
          S'inscrire gratuitement
        </button>
      </div>
    );
  }

  // If it's a free module or user has access, render children
  if (isFreeModule || hasAccess) {
    return <>{children}</>;
  }

  // If user is authenticated but doesn't have access to premium content
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Lock className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Contenu Premium
      </h3>
      <p className="text-gray-600 mb-6">
        Ce module est réservé aux membres avec un abonnement actif. 
        Découvrez nos offres d'abonnement pour accéder à l'intégralité de nos formations.
      </p>
      <button
        onClick={handleSubscribeClick}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl 
          hover:from-blue-700 hover:to-purple-700 transition-colors"
      >
        Découvrir nos abonnements
      </button>
    </div>
  );
}