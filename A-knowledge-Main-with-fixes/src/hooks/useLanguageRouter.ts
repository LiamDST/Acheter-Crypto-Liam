import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function useLanguageRouter() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = lang || 'fr';

  const navigateWithLang = (path: string, replace = false) => {
    const langPrefix = currentLang === 'fr' ? '/fr' : '/en';
    const fullPath = langPrefix + (path.startsWith('/') ? path : '/' + path);
    navigate(fullPath, { replace });
  };

  const switchLanguage = (newLang: 'fr' | 'en') => {
    const currentPath = location.pathname.replace(/^\/(fr|en)/, '');
    const newPath = `/${newLang}${currentPath}`;
    navigate(newPath, { replace: true });
  };

  return {
    currentLang: currentLang as 'fr' | 'en',
    navigateWithLang,
    switchLanguage
  };
}