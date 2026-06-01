import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabaseClient';
import { Calendar, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function UserSubscriptionInfo() {
  const { t, i18n } = useTranslation();
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
        setError(t('payment.subscription.error'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubscription();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-xl text-red-600">
        <AlertCircle className="h-5 w-5 inline-block mr-2" />
        {error}
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">{t('payment.subscription.title')}</h3>
        <p className="text-gray-600 mb-4">
          {t('payment.subscription.noActiveSubscription')}
        </p>
        <Link
          to={`/${currentLang}/solutions`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          {t('payment.subscription.viewSubscriptions')}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">{t('payment.subscription.yourSubscription')}</h3>
      
      <div className="flex items-center mb-4">
        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
        <span className="font-medium text-gray-900">
          {subscription.plan_name || (subscription.includes_signals ? t('payment.subscription.planNames.formationEtSignaux') : t('payment.subscription.planNames.formationSeule'))}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex justify-between">
          <span>{t('payment.subscription.status')}</span>
          <span className="font-medium text-green-600">{t('payment.subscription.active')}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('payment.subscription.amount')}</span>
          <span>{subscription.amount}€ {t('payment.perMonth')}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('payment.subscription.startDate')}</span>
          <span>{formatDate(subscription.start_date)}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('payment.subscription.nextRenewal')}</span>
          <span>{formatDate(subscription.end_date)}</span>
        </div>
      </div>
      
      <div className="flex items-center text-xs text-gray-500">
        <Calendar className="h-3 w-3 mr-1" />
        {t('payment.subscription.autoRenewal')} {subscription.auto_renew ? t('payment.subscription.enabled') : t('payment.subscription.disabled')}
      </div>
    </div>
  );
}