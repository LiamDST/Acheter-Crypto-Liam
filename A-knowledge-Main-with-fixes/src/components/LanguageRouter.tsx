import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LanguageRouterProps {
  children: React.ReactNode;
}

export default function LanguageRouter({ children }: LanguageRouterProps) {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const supportedLanguages = ['fr', 'en'];
    const currentLang = lang || 'fr';

    if (!supportedLanguages.includes(currentLang)) {
      navigate('/fr' + location.pathname, { replace: true });
      return;
    }

    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
      localStorage.setItem('language', currentLang);
    }
  }, [lang, i18n, navigate, location.pathname]);

  return <>{children}</>;
}