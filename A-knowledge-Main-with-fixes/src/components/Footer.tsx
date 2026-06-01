import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Youtube, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '../config/siteConfig';

// SVG officiel de Threads par Meta
const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 192 192"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"
    />
  </svg>
);

// SVG personnalisé pour TikTok
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.321 5.562a5.122 5.122 0 0 1-.443-.467 5.318 5.318 0 0 1-1.158-2.9c-.028-.194-.037-.392-.056-.588H13.99v12.928c-.008 1.8-1.471 3.255-3.271 3.255a3.272 3.272 0 0 1-1.507-.367 3.255 3.255 0 0 1-1.764-2.888 3.264 3.264 0 0 1 3.262-3.262c.366 0 .716.06 1.044.171V7.68a7.987 7.987 0 0 0-1.044-.068c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8v-4.372A9.356 9.356 0 0 0 23.999 13V9.326a5.342 5.342 0 0 1-4.678-3.764z"
      fill="currentColor"
    />
  </svg>
);

// Composant pour l'icône Telegram
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

// Configuration des icônes et couleurs pour chaque réseau social
const socialLinksConfig = [
  {
    name: 'X (Twitter)',
    icon: X,
    url: siteConfig.socialLinks.x,
    hoverColor: 'hover:text-gray-900'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: siteConfig.socialLinks.youtube,
    hoverColor: 'hover:text-red-600'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: siteConfig.socialLinks.instagram,
    hoverColor: 'hover:text-pink-600'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: siteConfig.socialLinks.linkedin,
    hoverColor: 'hover:text-blue-700'
  },
  {
    name: 'Threads',
    icon: ThreadsIcon,
    url: siteConfig.socialLinks.threads,
    hoverColor: 'hover:text-black'
  },
  {
    name: 'TikTok',
    icon: TikTokIcon,
    url: siteConfig.socialLinks.tiktok,
    hoverColor: 'hover:text-blue-600'
  },
  {
    name: 'Telegram',
    icon: TelegramIcon,
    url: siteConfig.socialLinks.telegram,
    hoverColor: 'hover:text-blue-500'
  }
];

export default function Footer() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  const getCurrentLang = () => {
    const pathLang = location.pathname.match(/^\/(fr|en)/)?.[1];
    return pathLang || (i18n.language?.startsWith('fr') ? 'fr' : 'en');
  };
  
  const currentLang = getCurrentLang();
  
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="container mx-auto px-4">
        {/* Mobile Footer Links */}
        <div className="flex flex-wrap justify-center gap-3 mb-6 md:hidden">
          <Link
            to={`/${currentLang}/support`}
            className="text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200 px-2 py-1"
          >
            {t('footer.support')}
          </Link>
          <Link
            to={`/${currentLang}/values`}
            className="text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200 px-2 py-1"
          >
            {t('footer.values')}
          </Link>
          <Link
            to={`/${currentLang}/faq`}
            className="text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200 px-2 py-1"
          >
            {t('footer.faq')}
          </Link>
          <Link
            to={`/${currentLang}/politique-de-confidentialite`}
            className="text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200 px-2 py-1"
          >
            {t('footer.privacy')}
          </Link>
          <Link
            to={`/${currentLang}/conditions-utilisation`}
            className="text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200 px-2 py-1"
          >
            {t('footer.terms')}
          </Link>
          <Link
            to={`/${currentLang}/politique-entreprise`}
            className="text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200 px-2 py-1"
          >
            {t('footer.corporate_policy')}
          </Link>
          <Link
            to={`/${currentLang}/articles`}
            className="text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200 px-2 py-1"
          >
            {t('footer.articles')}
          </Link>
          <Link
            to={`/${currentLang}/dictionnaire-crypto`}
            className="text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200 px-2 py-1"
          >
            {t('footer.glossary')}
          </Link>
        </div>

        {/* Desktop Footer Links */}
        <div className="hidden md:flex justify-center space-x-8 mb-6">
          <Link
            to={`/${currentLang}/support`}
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            {t('footer.support')}
          </Link>
          <Link
            to={`/${currentLang}/values`}
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            {t('footer.values')}
          </Link>
          <Link
            to={`/${currentLang}/faq`}
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            {t('footer.faq')}
          </Link>
          <Link
            to={`/${currentLang}/politique-de-confidentialite`}
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            {t('footer.privacy_policy')}
          </Link>
          <Link
            to={`/${currentLang}/conditions-utilisation`}
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            {t('footer.terms_of_use')}
          </Link>
          <Link
            to={`/${currentLang}/politique-entreprise`}
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            {t('footer.corporate_policy')}
          </Link>
          <Link
            to={`/${currentLang}/articles`}
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            {t('footer.articles')}
          </Link>
          <Link
            to={`/${currentLang}/dictionnaire-crypto`}
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            {t('footer.glossary')}
          </Link>
        </div>
        
        <div className="text-center text-gray-600 mb-6 text-sm">
          <p>{t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}</p>
        </div>
        
        <div className="flex justify-center items-center space-x-6">
          {socialLinksConfig.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transform transition-all duration-200 hover:scale-110 text-gray-400 ${social.hoverColor}`}
                aria-label={social.name}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}