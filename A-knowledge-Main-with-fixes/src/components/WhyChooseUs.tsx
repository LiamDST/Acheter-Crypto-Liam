import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Users, TrendingUp, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Bitcoin, Ethereum } from './CryptoIcons';


export default function WhyChooseUs() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  const getCurrentLang = () => {
    const pathLang = location.pathname.match(/^\/(fr|en)/)?.[1];
    return pathLang || (i18n.language?.startsWith('fr') ? 'fr' : 'en');
  };
  
  const currentLang = getCurrentLang();

  const reasons = [
    {
      title: t('whyChooseUs.completeTraining.title'),
      icon: Users,
      content: t('whyChooseUs.completeTraining.content'),
      color: "indigo",
      highlight: true
    },
    {
      title: t('whyChooseUs.marketExpertise.title'),
      icon: Lightbulb,
      content: t('whyChooseUs.marketExpertise.content'),
      color: "blue"
    },
    {
      title: t('whyChooseUs.scamProtection.title'),
      icon: Shield,
      content: t('whyChooseUs.scamProtection.content'),
      color: "green"
    },
    {
      title: t('whyChooseUs.depthAnalysis.title'),
      icon: TrendingUp,
      content: t('whyChooseUs.depthAnalysis.content'),
      color: "purple"
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Floating Crypto Icons */}
      <div className="absolute -left-16 top-1/4 opacity-5 transform rotate-12">
        <Bitcoin className="w-64 h-64" />
      </div>
      <div className="absolute -right-16 bottom-1/4 opacity-5 transform -rotate-12">
        <Ethereum className="w-64 h-64" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('whyChooseUs.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('whyChooseUs.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 
                  transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-4 rounded-xl mr-4 bg-${reason.color}-100 
                    transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`h-8 w-8 text-${reason.color}-600`} />
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 
                    transition-colors duration-300 group-hover:text-${reason.color}-600`}>
                    {reason.title}
                    {reason.highlight && (
                      <Sparkles className="inline-block h-5 w-5 ml-2 text-indigo-500 animate-pulse" />
                    )}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{reason.content}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to={`/${currentLang}/solutions/formation-cryptomonnaie/tarification`}
            className="inline-flex items-center px-8 py-4 text-lg font-medium
              text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl
              transition-all duration-300 hover:from-blue-700 hover:to-purple-700
              transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            {t('whyChooseUs.startAdventure')}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}