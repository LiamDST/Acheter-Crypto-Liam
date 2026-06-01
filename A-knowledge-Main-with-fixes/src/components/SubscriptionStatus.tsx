import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, AlertCircle, Calendar, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface SubscriptionStatusProps {
  compact?: boolean;
  className?: string;
}

export default function SubscriptionStatus({ compact = false, className = '' }: SubscriptionStatusProps) {
  const location = useLocation();
  const currentLang = location.pathname.match(/^\/(fr|en)/)?.[1] || 'fr';
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        setLoading(true);
        
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setLoading(false);
          return;
        }
        
        // Fetch subscription data
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
          
        if (subscriptionError && subscriptionError.code !== 'PGRST116') {
          throw subscriptionError;
        }
        
        setSubscription(subscriptionData);
      } catch (error) {
        console.error('Error fetching subscription:', error);
        setError('Une erreur est survenue lors de la récupération de votre abonnement.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubscription();
  }, []);

  if (loading) {
    return (
      <div className={`animate-pulse h-10 bg-gray-200 rounded ${className}`}></div>
    );
  }

  if (error) {
    return (
      <div className={`text-red-600 text-sm flex items-center ${className}`}>
        <AlertCircle className="h-4 w-4 mr-1" />
        {error}
      </div>
    );
  }

  if (!subscription) {
    if (compact) {
      return (
        <Link
          to={`/${currentLang}/solutions`}
          className={`text-sm text-blue-600 hover:text-blue-800 flex items-center ${className}`}
        >
          Découvrir nos abonnements
          <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      );
    }
    
    return (
      <div className={`bg-yellow-50 p-3 rounded-lg flex items-center ${className}`}>
        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
        <div>
          <p className="text-sm text-yellow-800">
            Vous n'avez pas d'abonnement actif.{' '}
            <Link to={`/${currentLang}/solutions`} className="font-medium underline">
              Découvrir nos offres
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (compact) {
    return (
      <div className={`flex items-center ${className}`}>
        <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
        <span className="text-sm text-gray-700">
          {subscription.plan_name || (subscription.includes_signals ? 'Formation + Signaux' : 'Formation seule')}
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-green-50 p-3 rounded-lg ${className}`}>
      <div className="flex items-center">
        <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-green-800">
            Abonnement actif : {subscription.plan_name || (subscription.includes_signals ? 'Formation + Signaux' : 'Formation seule')}
          </p>
          <p className="text-xs text-green-700 flex items-center mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            Renouvellement le {formatDate(subscription.end_date)}
          </p>
        </div>
      </div>
    </div>
  );
}