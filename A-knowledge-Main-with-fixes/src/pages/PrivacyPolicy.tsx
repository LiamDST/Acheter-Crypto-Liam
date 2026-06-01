import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Cookie } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import SEOHead from '../components/SEOHead';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Politique de Confidentialité Alyah Knowledge"
        description="Découvrez comment Alyah Knowledge protège vos données personnelles conformément aux réglementations en vigueur."
        canonicalUrl="https://alyah-knowledge.com/politique-de-confidentialite"
      />
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 
            transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour à l'accueil
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-gray-900">Politique de Confidentialité</h1>
              <Shield className="h-12 w-12 text-blue-600" />
            </div>

            <div className="text-sm text-gray-600 mb-8">
              Dernière mise à jour : 18 mars 2025
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed">
                Bienvenue sur <strong>Alyah Knowledge</strong>. Nous accordons une grande importance 
                à la confidentialité de vos données et nous engageons à les protéger conformément 
                aux lois et réglementations en vigueur.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                <Lock className="h-6 w-6 text-blue-600" />
                1. Données collectées
              </h2>

              <h3 className="text-xl font-bold text-gray-900 mb-4">1.1 Données que vous nous fournissez</h3>
              <p className="text-gray-600 mb-6">
                Nous collectons des informations personnelles lorsque vous créez un compte sur notre site, 
                vous inscrivez à notre newsletter ou recevez des signaux de trading...
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">1.2 Données collectées automatiquement</h3>
              <p className="text-gray-600 mb-6">
                Lorsque vous naviguez sur notre site, certaines informations sont collectées automatiquement...
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">2. Conservation des données</h2>
              <p className="text-gray-600 mb-6">
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour vous fournir 
                nos services et respecter nos obligations légales...
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                3. Utilisation des données et bases légales
              </h2>
              <p className="text-gray-600 mb-6">
                Nous utilisons vos informations afin de vous fournir nos services et vous envoyer les 
                signaux de trading que vous avez demandés...
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-8">
                <h3 className="font-bold text-gray-900 mb-4">Bases légales du traitement :</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span><strong>Exécution du contrat</strong> : gestion de votre compte et services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span><strong>Consentement</strong> : newsletters et marketing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span><strong>Intérêt légitime</strong> : analyse et amélioration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span><strong>Obligation légale</strong> : lutte contre la fraude</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                4. Partage et transfert international des données
              </h2>
              <p className="text-gray-600 mb-6">
                Nous ne vendons ni ne louons vos données personnelles à des tiers...
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">5. Sécurité des données</h2>
              <p className="text-gray-600 mb-6">
                Nous mettons en place des mesures techniques et organisationnelles pour assurer la 
                sécurité de vos données personnelles...
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                6. Vos droits selon votre pays de résidence
              </h2>
              <p className="text-gray-600 mb-6">
                Conformément aux réglementations en vigueur, vous disposez de plusieurs droits 
                concernant vos données personnelles...
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                <Cookie className="h-6 w-6 text-blue-600" />
                7. Cookies et technologies similaires
              </h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 my-6">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type de cookie
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fonction
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Cookies nécessaires
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Assurent le bon fonctionnement du site et la sécurité.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Cookies analytiques
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Aident à comprendre comment les utilisateurs interagissent avec le site.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Cookies publicitaires
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Permettent d'afficher des annonces ciblées selon votre activité.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                8. Modifications de la politique de confidentialité
              </h2>
              <p className="text-gray-600 mb-6">
                Nous pouvons être amenés à mettre à jour cette politique de confidentialité...
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">9. Contact</h2>
              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <p className="text-gray-600 mb-4">
                  Si vous avez des questions concernant cette politique de confidentialité, 
                  vous pouvez nous contacter via les informations suivantes :
                </p>
                <div className="space-y-2">
                  <p>
                    📧 <strong>Email</strong> : <a href={`mailto:${siteConfig.contact.email}`} 
                    className="text-blue-600 hover:text-blue-800">{siteConfig.contact.email}</a>
                  </p>
                  <p>
                    📱 <strong>Instagram</strong> : <a href={siteConfig.socialLinks.instagram} 
                    target="_blank\" rel="noopener noreferrer\" className="text-blue-600 hover:text-blue-800">
                      alyah.knowledge
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}