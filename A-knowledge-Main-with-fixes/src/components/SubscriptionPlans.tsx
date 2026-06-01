import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../lib/stripeClient';
import SubscriptionCard from './SubscriptionCard';
import CheckoutModal from './CheckoutModal';
import { stripeProducts } from '../lib/stripe-config';

export default function SubscriptionPlans() {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof stripeProducts | null>(null);

  const handlePlanSelect = (plan: keyof typeof stripeProducts) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('solutions.plans.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('solutions.plans.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <SubscriptionCard 
            plan="formationSeule" 
            onSelect={handlePlanSelect} 
          />
          <SubscriptionCard 
            plan="formationEtSignaux" 
            highlighted={true}
            onSelect={handlePlanSelect} 
          />
        </div>

        <div className="text-center text-gray-600 max-w-2xl mx-auto">
          <p className="mb-4">
            {t('payment.includesAccess')}
          </p>
          <p className="text-sm">
            {t('payment.cancellationPolicy')}
          </p>
        </div>
      </div>

      {selectedPlan && (
        <Elements stripe={stripePromise}>
          <CheckoutModal 
            isOpen={!!selectedPlan} 
            onClose={() => setSelectedPlan(null)} 
            plan={selectedPlan} 
          />
        </Elements>
      )}
    </div>
  );
}