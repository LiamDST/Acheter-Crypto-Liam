import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, TrendingUp, Lightbulb } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useTranslation, Trans } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead />
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('about.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <Trans i18nKey="about.description">
              Nous révolutionnons l'investissement en cryptomonnaies en rendant accessible à tous
              une expertise pointue et des outils d'analyse sophistiqués. Découvrez nos{' '}
              <Link to="/solutions" className="text-blue-600 hover:text-blue-800">solutions d'investissement</Link>{' '}
              et notre <Link to="/knowledge" className="text-blue-600 hover:text-blue-800">centre de formation</Link>.
            </Trans>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 
            transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 rounded-xl mr-4 
                transition-transform duration-300 group-hover:scale-110">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 
                transition-colors duration-300 group-hover:text-blue-600">{t('about.mission.title')}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <Trans i18nKey="about.mission.description">
                Démocratiser l'accès aux investissements en cryptomonnaies en fournissant des{' '}
                <Link to="/market" className="text-blue-600 hover:text-blue-800">outils professionnels</Link>{' '}
                et une <Link to="/knowledge/crypto" className="text-blue-600 hover:text-blue-800">éducation de qualité</Link>,
                permettant à chacun de prendre des décisions éclairées et de réussir dans l'univers crypto.
              </Trans>
            </p>
          </div>

          <Link to="/team" className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 
            transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-purple-100 rounded-xl mr-4 
                transition-transform duration-300 group-hover:scale-110">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 
                transition-colors duration-300 group-hover:text-purple-600">{t('about.team.title')}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {t('about.team.description')}
            </p>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            <Link to="/values" className="hover:text-blue-600 transition-colors">{t('about.values.title')}</Link>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 
              transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-start">
                <div className="p-3 bg-green-100 rounded-xl mr-4 
                  transition-transform duration-300 group-hover:scale-110">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 
                    transition-colors duration-300 group-hover:text-green-600">{t('about.values.excellence.title')}</h3>
                  <p className="text-gray-600">
                    <Trans i18nKey="about.values.excellence.description">
                      Nous visons l'excellence dans chaque aspect de notre service, de{' '}
                      <Link to="/market" className="text-blue-600 hover:text-blue-800">l'analyse technique</Link>{' '}
                      à <Link to="/support" className="text-blue-600 hover:text-blue-800">l'accompagnement client</Link>.
                    </Trans>
                  </p>
                </div>
              </div>
            </div>
            <div className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 
              transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-start">
                <div className="p-3 bg-yellow-100 rounded-xl mr-4 
                  transition-transform duration-300 group-hover:scale-110">
                  <Lightbulb className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 
                    transition-colors duration-300 group-hover:text-yellow-600">{t('about.values.innovation.title')}</h3>
                  <p className="text-gray-600">
                    <Trans i18nKey="about.values.innovation.description">
                      Nous développons constamment de nouveaux outils et méthodes pour rester
                      à la pointe de l'investissement crypto. Découvrez nos{' '}
                      <Link to="/solutions#custom" className="text-blue-600 hover:text-blue-800">algorithmes personnalisés</Link>.
                    </Trans>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-20">
          <Link
            to="/appointment"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white 
              bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 
              hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 
              shadow-lg hover:shadow-xl"
          >
            {t('about.appointment')}
          </Link>
        </div>
        </div>
      </div>
    </>
  );
}