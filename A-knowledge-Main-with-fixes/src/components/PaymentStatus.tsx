import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { getUserSubscription } from '../lib/stripe';

interface PaymentStatusProps {
  className?: string;
}

export default function PaymentStatus({ className = '' }: PaymentStatusProps) {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      const subscriptionData = await getUserSubscription();
      setSubscription(subscriptionData);
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError('Erreur lors de la récupération du statut d\'abonnement');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'canceled':
      case 'incomplete_expired':
      case 'unpaid':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'past_due':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'trialing':
      case 'incomplete':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'canceled':
      case 'incomplete_expired':
      case 'unpaid':
        return 'text-red-600';
      case 'past_due':
        return 'text-yellow-600';
      case 'trialing':
      case 'incomplete':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className={`animate-pulse h-6 bg-gray-200 rounded ${className}`}></div>
    );
  }

  if (error) {
    return (
      <div className={`text-red-600 text-sm ${className}`}>
        {error}
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className={`text-gray-600 text-sm ${className}`}>
        Aucun abonnement actif
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {getStatusIcon(subscription.subscription_status)}
      <span className={`text-sm font-medium ${getStatusColor(subscription.subscription_status)}`}>
        {subscription.subscription_status === 'active' ? 'Abonnement actif' : 'Abonnement inactif'}
      </span>
    </div>
  );
}