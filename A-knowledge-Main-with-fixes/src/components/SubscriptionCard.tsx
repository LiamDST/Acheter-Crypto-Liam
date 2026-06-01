import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { stripeProducts } from '../lib/stripe-config';

interface SubscriptionCardProps {
  plan: keyof typeof stripeProducts;
  highlighted?: boolean;
  onSelect: (plan: keyof typeof stripeProducts) => void;
}

export default function SubscriptionCard({ plan, highlighted = false, onSelect }: SubscriptionCardProps) {
  const { t } = useTranslation();
  const product = stripeProducts[plan];
  const price = t(`payment.subscriptionPlans.${plan}.price`);
  
  const features = plan === 'formationSeule' 
    ? [
        { text: t('payment.subscriptionPlans.formationSeule.features.fullAccess.text'), highlight: t('payment.subscriptionPlans.formationSeule.features.fullAccess.highlight'), enabled: true },
        { text: t('payment.subscriptionPlans.formationSeule.features.resources.text'), highlight: t('payment.subscriptionPlans.formationSeule.features.resources.highlight'), enabled: true },
        { text: t('payment.subscriptionPlans.formationSeule.features.community.text'), highlight: t('payment.subscriptionPlans.formationSeule.features.community.highlight'), enabled: true },
        { text: t('payment.subscriptionPlans.formationSeule.features.support.text'), highlight: t('payment.subscriptionPlans.formationSeule.features.support.highlight'), enabled: true },
        { text: t('payment.subscriptionPlans.formationSeule.features.updates.text'), highlight: t('payment.subscriptionPlans.formationSeule.features.updates.highlight'), enabled: true },
        { text: t('payment.subscriptionPlans.formationSeule.features.tradingSignals.text'), highlight: t('payment.subscriptionPlans.formationSeule.features.tradingSignals.highlight'), enabled: false }
      ]
    : [
        { text: t('payment.subscriptionPlans.formationEtSignaux.features.included.text'), highlight: t('payment.subscriptionPlans.formationEtSignaux.features.included.highlight'), enabled: true },
        { text: t('payment.subscriptionPlans.formationEtSignaux.features.tradingSignals.text'), highlight: t('payment.subscriptionPlans.formationEtSignaux.features.tradingSignals.highlight'), enabled: true },
        { text: t('payment.subscriptionPlans.formationEtSignaux.features.marketCoverage.text'), highlight: t('payment.subscriptionPlans.formationEtSignaux.features.marketCoverage.highlight'), enabled: true },
        { text: t('payment.subscriptionPlans.formationEtSignaux.features.prioritySupport.text'), highlight: t('payment.subscriptionPlans.formationEtSignaux.features.prioritySupport.highlight'), enabled: true },
        { text: t('payment.subscriptionPlans.formationEtSignaux.features.marketAnalysis.text'), highlight: t('payment.subscriptionPlans.formationEtSignaux.features.marketAnalysis.highlight'), enabled: true },
        { text: t('payment.subscriptionPlans.formationEtSignaux.features.advancedStrategies.text'), highlight: t('payment.subscriptionPlans.formationEtSignaux.features.advancedStrategies.highlight'), enabled: true }
      ];

  return (
    <div
      className={`group relative bg-white rounded-2xl p-8
        transition-all duration-300 hover:shadow-xl hover:-translate-y-2
        flex flex-col h-[700px] border border-gray-100
        ${highlighted ? 'ring-2 ring-indigo-500/20 shadow-lg' : 'shadow-sm'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-white
        rounded-2xl transition-opacity opacity-0 group-hover:opacity-100" />

      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold
            tracking-wide uppercase bg-gradient-to-r from-blue-600 to-purple-600 text-white 
            shadow-lg">
            {t('payment.recommended')}
          </span>
        </div>
      )}

      <div className="relative flex-1">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-violet-600
            transition-colors duration-300">
            {t(`payment.subscriptionPlans.${plan}.name`)}
          </h2>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline">
            <span className={`text-4xl font-bold ${
              highlighted 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                : 'text-gray-900 group-hover:text-violet-600'
            } transition-colors duration-300`}>
              {price}
            </span>
            <span className="text-gray-600 ml-2">{t('payment.perMonth')}</span>
          </div>
          <p className="text-gray-600 mt-2 group-hover:text-violet-600
            transition-colors duration-300">
            {t(`payment.subscriptionPlans.${plan}.description`)}
          </p>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className={`flex items-start group-hover:transform 
              group-hover:translate-x-1 transition-transform duration-200
              ${!feature.enabled ? 'text-gray-400' : ''}`}>
              {!feature.enabled ? (
                <X className="h-6 w-6 text-gray-400 flex-shrink-0 mr-3" aria-hidden="true" />
              ) : (
                <Check className="h-6 w-6 text-green-500 flex-shrink-0 mr-3 
                  group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
              )}
              <span>
                <span className="text-gray-600">{feature.text}</span>
                <span className={`font-medium ${!feature.enabled ? 'text-gray-400' : 'text-gray-900'}`}>
                  {feature.highlight}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-auto">
        <button
          onClick={() => onSelect(plan)}
          className={`relative w-full py-3 px-6 rounded-xl font-medium 
            transition-all duration-300 flex items-center justify-center
            shadow-lg overflow-hidden ${
            highlighted
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              : 'bg-white border-2 border-violet-600 text-violet-600'
          }`}
          aria-label={t('payment.subscribeAriaLabel', { planName: t(`payment.subscriptionPlans.${plan}.name`) })}
        >
          {!highlighted && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          <span className={`relative z-10 flex items-center ${
            !highlighted ? 'group-hover:text-white' : ''
          }`}>
            {t('payment.subscribeNow')}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
  );
}