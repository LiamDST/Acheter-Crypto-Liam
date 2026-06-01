import React from 'react';
import { Shield, LineChart, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FAQ from '../components/FAQ';
import SubscriptionPlans from '../components/SubscriptionPlans';
import SEOHead from '../components/SEOHead';


export default function Solutions() {
  const { t } = useTranslation();

  // Create FAQ items from translations
  const faqItems = [
    {
      question: t('solutions.faq.items.security.question'),
      answer: t('solutions.faq.items.security.answer')
    },
    {
      question: t('solutions.faq.items.signals.question'),
      answer: t('solutions.faq.items.signals.answer')
    },
    {
      question: t('solutions.faq.items.beginners.question'),
      answer: t('solutions.faq.items.beginners.answer')
    },
    {
      question: t('solutions.faq.items.plans.question'),
      answer: t('solutions.faq.items.plans.answer')
    },
    {
      question: t('solutions.faq.items.support.question'),
      answer: t('solutions.faq.items.support.answer')
    }
  ];

  return (
    <>
      <SEOHead />
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('solutions.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('solutions.description')}
          </p>
        </div>

        {/* Subscription Plans Component */}
        <SubscriptionPlans />

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100
            transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-3 bg-blue-100 rounded-xl inline-block mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('solutions.features.security.title')}</h3>
            <p className="text-gray-600">
              {t('solutions.features.security.description')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100
            transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-3 bg-purple-100 rounded-xl inline-block mb-4">
              <LineChart className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('solutions.features.performance.title')}</h3>
            <p className="text-gray-600">
              {t('solutions.features.performance.description')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100
            transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-3 bg-green-100 rounded-xl inline-block mb-4">
              <Lock className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('solutions.features.control.title')}</h3>
            <p className="text-gray-600">
              {t('solutions.features.control.description')}
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ items={faqItems} />
      </div>
    </div>
    </>
  );
}