import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FAQ from '../components/FAQ';
import SEOHead from '../components/SEOHead';
import FAQSchema from '../components/FAQSchema';


export default function FAQPage() {
  const { t } = useTranslation();
  const location = useLocation();
  
  const getCurrentLang = () => {
    const pathLang = location.pathname.match(/^\/(fr|en)/)?.[1];
    return pathLang || 'fr';
  };
  
  const currentLang = getCurrentLang();
  
  const getFaqItems = () => {
    return [
      {
        question: t('faq.items.q1.question'),
        answer: t('faq.items.q1.answer').replace('/about', `/${currentLang}/about`)
      },
      {
        question: t('faq.items.q2.question'),
        answer: t('faq.items.q2.answer').replace('/solutions#monthly', `/${currentLang}/solutions#monthly`).replace('/appointment', `/${currentLang}/appointment`)
      },
      {
        question: t('faq.items.q3.question'),
        answer: t('faq.items.q3.answer').replace('/knowledge/crypto', `/${currentLang}/knowledge/crypto`).replace('/knowledge', `/${currentLang}/knowledge`)
      },
      {
        question: t('faq.items.q4.question'),
        answer: t('faq.items.q4.answer').replace('/solutions', `/${currentLang}/solutions`).replace('/solutions#custom', `/${currentLang}/solutions#custom`)
      },
      {
        question: t('faq.items.q5.question'),
        answer: t('faq.items.q5.answer').replace('/market', `/${currentLang}/market`).replace('/articles', `/${currentLang}/articles`)
      },
      {
        question: t('faq.items.q6.question'),
        answer: t('faq.items.q6.answer').replace('/team', `/${currentLang}/team`)
      },
      {
        question: t('faq.items.q7.question'),
        answer: t('faq.items.q7.answer').replace('/support', `/${currentLang}/support`)
      },
      {
        question: t('faq.items.q8.question'),
        answer: t('faq.items.q8.answer').replace('/market', `/${currentLang}/market`)
      }
    ];
  };
  
  const faqItems = getFaqItems();
  
  return (
    <>
      <SEOHead 
        title={`${t('faq.title')} | Alyah Knowledge`}
        description={t('faq.description')}
      />
      <FAQSchema items={faqItems} />
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('faq.description')} {t('faq.personalizedAssistance')} <Link to={`/${currentLang}/appointment`} className="text-blue-600 hover:text-blue-800">{t('faq.bookAppointment')}</Link> {t('faq.withExperts')}.
          </p>
        </div>

        <FAQ items={faqItems} />

        <div className="mt-16 mb-20 text-center">
          <p className="text-gray-600 mb-8">
            {t('faq.notFoundAnswer')}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to={`/${currentLang}/support`}
              className="px-6 py-3 bg-white text-gray-700 rounded-xl border-2 border-gray-200 
                hover:border-blue-500 transition-all duration-200"
            >
              {t('faq.contactSupport')}
            </Link>
            <Link
              to={`/${currentLang}/appointment`}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              {t('faq.bookAppointmentBtn')}
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}