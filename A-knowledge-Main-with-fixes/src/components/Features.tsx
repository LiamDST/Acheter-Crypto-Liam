import React from 'react';
import { Shield, LineChart, Lock, HelpCircle, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function Features() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  const getCurrentLang = () => {
    const pathLang = location.pathname.match(/^\/(fr|en)/)?.[1];
    return pathLang || (i18n.language?.startsWith('fr') ? 'fr' : 'en');
  };
  
  const currentLang = getCurrentLang();

  const features = [
    {
      icon: Shield,
      title: t('features.security.title'),
      description: t('features.security.description'),
    },
    {
      icon: LineChart,
      title: t('features.analysis.title'),
      description: t('features.analysis.description'),
    },
    {
      icon: Lock,
      title: t('features.management.title'),
      description: t('features.management.description'),
    },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {t('features.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-white rounded-2xl p-8 text-center
                  transition-all duration-300 hover:shadow-xl hover:-translate-y-2
                  border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-white
                  rounded-2xl transition-opacity opacity-0 group-hover:opacity-100" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl
                    bg-violet-100 text-violet-600 mb-6 mx-auto
                    transition-transform group-hover:scale-110 duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-violet-600
                    transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-900
                    transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Getting Started Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <HelpCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t('features.newToCrypto.title')}</h2>
            </div>
            
            <p className="text-lg text-gray-600 mb-8">
              {t('features.newToCrypto.description')}
            </p>

            <Link
              to={`/${currentLang}/create-account`}
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white 
                bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl
                transition-all duration-200 hover:from-blue-700 hover:to-purple-700 
                transform hover:-translate-y-1 shadow-lg"
            >
              {t('features.newToCrypto.createAccountSafely')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}