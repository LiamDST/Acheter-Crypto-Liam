import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Wallet, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';

export default function CreateAccount() {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = location.pathname.match(/^\/(fr|en)/)?.[1] || 'fr';

  return (
    <>
      <SEOHead
        title={t('createAccount.seo.title')}
        description={t('createAccount.seo.description')}
        canonicalUrl="https://alyah-knowledge.com/create-account"
        noIndex
      />
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        <Link
          to={`/${currentLang}/signaux-trading`}
          className="inline-flex items-center text-gray-600 hover:text-blue-600
            transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('createAccount.backToSignals')}
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {t('createAccount.title')}
            </h1>

            <div className="prose prose-lg max-w-none">
              <div className="bg-blue-50 p-6 rounded-xl mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                  {t('createAccount.importantInfo.title')}
                </h2>
                <p className="text-gray-700">
                  {t('createAccount.importantInfo.description')}
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-600" />
                {t('createAccount.steps.title')}
              </h2>

              <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-blue-600" />
                    {t('createAccount.steps.step1.title')}
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• {t('createAccount.steps.step1.item1')}</li>
                    <li>• {t('createAccount.steps.step1.item2')}</li>
                    <li>• {t('createAccount.steps.step1.item3')}</li>
                    <li>• {t('createAccount.steps.step1.item4')}</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-purple-600" />
                    {t('createAccount.steps.step2.title')}
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• {t('createAccount.steps.step2.item1')}</li>
                    <li>• {t('createAccount.steps.step2.item2')}</li>
                    <li>• {t('createAccount.steps.step2.item3')}</li>
                    <li>• {t('createAccount.steps.step2.item4')}</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    {t('createAccount.steps.step3.title')}
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• {t('createAccount.steps.step3.item1')}</li>
                    <li>• {t('createAccount.steps.step3.item2')}</li>
                    <li>• {t('createAccount.steps.step3.item3')}</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t('createAccount.help.title')}</h2>
                <p className="text-gray-700 mb-6">
                  {t('createAccount.help.description')}
                </p>
                <Link
                  to={`/${currentLang}/support`}
                  className="inline-flex items-center px-6 py-3 rounded-xl text-white
                    bg-gradient-to-r from-blue-600 to-purple-600 font-medium
                    transition-all duration-200 hover:from-blue-700 hover:to-purple-700
                    transform hover:-translate-y-1"
                >
                  {t('createAccount.help.contactButton')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}