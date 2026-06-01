import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Heart, Leaf, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';


export default function Values() {
  const { t } = useTranslation();
  const location = useLocation();
  
  const getCurrentLang = () => {
    const pathLang = location.pathname.match(/^\/(fr|en)/)?.[1];
    return pathLang || 'fr';
  };
  
  const currentLang = getCurrentLang();
  
  const values = [
    {
      title: t('values.accessibility.title'),
      icon: BookOpen,
      description: t('values.accessibility.description').replace('/solutions', `/${currentLang}/solutions`).replace('/knowledge', `/${currentLang}/knowledge`).replace('/articles', `/${currentLang}/articles`),
      color: "blue"
    },
    {
      title: t('values.education.title'),
      icon: Heart,
      description: t('values.education.description').replace('/knowledge', `/${currentLang}/knowledge`).replace('/articles', `/${currentLang}/articles`),
      color: "purple"
    },
    {
      title: t('values.environment.title'),
      icon: Leaf,
      description: t('values.environment.description').replace('/about', `/${currentLang}/about`),
      color: "green"
    },
    {
      title: t('values.confidentiality.title'),
      icon: Lock,
      description: t('values.confidentiality.description').replace('/support', `/${currentLang}/support`),
      color: "orange"
    }
  ];
  
  const renderDescription = (description: string) => {
    return <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />;
  };

  return (
    <>
      <SEOHead
        title={`${t('values.title')} | Alyah Knowledge`}
        description={t('values.description')}
      />
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('values.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('values.description')} <Link to={`/${currentLang}/team`} className="text-blue-600 hover:text-blue-800">{t('values.meetTeam')}</Link> {t('values.expertsPassionate')}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 
                  transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-4 rounded-xl mr-4 bg-${value.color}-100 
                    transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`h-8 w-8 text-${value.color}-600`} />
                  </div>
                  <h2 className={`text-2xl font-bold text-gray-900 
                    transition-colors duration-300 group-hover:text-${value.color}-600`}>
                    {value.title}
                  </h2>
                </div>
                {renderDescription(value.description)}
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('values.ourCommitment')}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t('values.commitmentText')}
              <Link to={`/${currentLang}/appointment`} className="text-blue-600 hover:text-blue-800 ml-2">
                {t('values.bookAppointment')}
              </Link> {t('values.expertAdvice')}.
            </p>
          </div>
        </div>

        <div className="text-center mb-20">
          <Link
            to={`/${currentLang}/solutions`}
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white 
              bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 
              hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 
              shadow-lg hover:shadow-xl"
          >
            {t('values.discoverSolutions')}
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}