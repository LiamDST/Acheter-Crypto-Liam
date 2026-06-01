import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import AuthButton from './AuthButton';
import { supabase } from '../lib/supabaseClient';
import SubscriptionStatus from './SubscriptionStatus';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  onAuthClick: () => void;
}

export default function Header({ onAuthClick }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  // Get current language from URL or fallback to i18n language
  const getCurrentLang = () => {
    const pathLang = location.pathname.match(/^\/(fr|en)/)?.[1];
    return pathLang || (i18n.language?.startsWith('fr') ? 'fr' : 'en');
  };
  
  const currentLang = getCurrentLang();
  
  const navigation = [
    { name: t('nav.home'), href: `/${currentLang}` },
    {
      name: t('nav.solutions'),
      href: `/${currentLang}/solutions`
    },
    {
      name: t('nav.signals'),
      href: `/${currentLang}/signaux-trading`
    },
    {
      name: t('nav.training'),
      href: `/${currentLang}/comprendre-les-cryptomonnaies`,
      submenu: [
        {
          name: t('nav.understandCrypto'),
          description: t('nav.understandCryptoDesc'),
          href: `/${currentLang}/formation/comprendre-la-crypto`
        },
        {
          name: t('nav.realTimeMarket'),
          description: t('nav.realTimeMarketDesc'),
          href: `/${currentLang}/marche-cryptomonnaies-temps-reel`
        },
        {
          name: t('nav.articles'),
          description: t('nav.articlesDesc'),
          href: `/${currentLang}/articles`
        },
        {
          name: t('nav.cryptoDictionary'),
          description: t('nav.cryptoDictionaryDesc'),
          href: `/${currentLang}/dictionnaire-crypto`
        }
      ]
    },
    { name: t('nav.about'), href: `/${currentLang}/about` },
    { name: t('nav.book_appointment'), href: `/${currentLang}/appointment` },
  ];

  const searchableItems = [
    { title: `${t('nav.trainingOnly')} - ${t('nav.trainingOnlyPrice')}`, path: `/${currentLang}/solutions/formation-cryptomonnaie/tarification`, keywords: ['abonnement', 'mensuel', '249', 'formation', 'subscription', 'monthly', 'training'] },
    { title: `${t('nav.trainingSignals')} - ${t('nav.trainingSignalsPrice')}`, path: `/${currentLang}/solutions/formation-cryptomonnaie/tarification`, keywords: ['abonnement', 'signaux', '349', 'populaire', 'subscription', 'signals', 'popular'] },
    { title: t('nav.tradingSignals'), path: `/${currentLang}/signaux-trading`, keywords: ['signaux', 'trading', 'automatique', 'webhook', 'signals', 'automatic'] },
    { title: t('nav.realTimeMarket'), path: `/${currentLang}/marche-cryptomonnaies-temps-reel`, keywords: ['marche', 'prix', 'cours', 'crypto', 'bitcoin', 'ethereum', 'market', 'price', 'real-time'] },
    { title: t('nav.understandCrypto'), path: `/${currentLang}/formation/comprendre-la-crypto`, keywords: ['comprendre', 'crypto', 'blockchain', 'education', 'understand', 'training'] },
    { title: t('nav.training'), path: `/${currentLang}/comprendre-les-cryptomonnaies`, keywords: ['knowledge', 'apprentissage', 'formation', 'education', 'learning', 'training'] },
    { title: t('nav.cryptoDictionary'), path: `/${currentLang}/dictionnaire-crypto`, keywords: ['dictionnaire', 'lexique', 'glossaire', 'termes', 'définitions', 'dictionary', 'terms', 'definitions'] },
    { title: t('nav.about'), path: `/${currentLang}/about`, keywords: ['about', 'propos', 'entreprise', 'histoire', 'company', 'history'] },
    { title: 'Notre équipe', path: `/${currentLang}/team`, keywords: ['equipe', 'team', 'jordan', 'chekroun'] },
    { title: t('footer.assistance'), path: `/${currentLang}/support`, keywords: ['support', 'aide', 'contact', 'assistance', 'help'] },
    { title: t('nav.appointment'), path: `/${currentLang}/appointment`, keywords: ['rendez-vous', 'appointment', 'consultation', 'meeting'] },
    { title: t('nav.dashboard'), path: `/${currentLang}/dashboard`, keywords: ['dashboard', 'tableau', 'bord', 'compte', 'profil', 'account', 'profile'] },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState<string | null>(null);
  const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
  const [knowledgeClicked, setKnowledgeClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [activeIndicator, setActiveIndicator] = useState<{
    width: number;
    left: number;
    visible: boolean;
  }>({ width: 0, left: 0, visible: false });

  // Calculer la position du sous-menu
  const calculateSubmenuPosition = (element: HTMLElement | null) => {
    if (!element) return { top: 0, left: 0 };
    
    const rect = element.getBoundingClientRect();
    return {
      top: rect.bottom + 8, // 8px de marge
      left: rect.left
    };
  };
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
      checkScrollable();
    };
    
    // Check if user is logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    
    checkAuth();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    // Check scrollable on mount and resize
    checkScrollable();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      subscription.unsubscribe();
    };
  }, []);

  // Vérifier si le scroll est nécessaire
  const checkScrollable = () => {
    if (navWrapperRef.current && !isMobile) {
      const wrapper = navWrapperRef.current;
      const container = navContainerRef.current;
      if (container) {
        const hasScrollableContent = container.scrollWidth > wrapper.clientWidth;
        setHasScroll(hasScrollableContent);
        
        // Ajouter/retirer la classe pour les indicateurs visuels
        if (hasScrollableContent) {
          wrapper.classList.add('has-scroll');
        } else {
          wrapper.classList.remove('has-scroll');
        }
      }
    }
  };

  // Handle indicator positioning - Version corrigée pour alignement parfait
  const updateIndicator = (element: HTMLElement | null) => {
    if (!element || !navContainerRef.current || !navWrapperRef.current || isMobile) {
      setActiveIndicator({ width: 0, left: 0, visible: false });
      return;
    }

    const containerRect = navContainerRef.current.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    // Calculer la position exacte relative au conteneur (sans le scroll)
    const elementLeft = elementRect.left - containerRect.left;
    
    setActiveIndicator({
      width: elementRect.width,
      left: elementLeft,
      visible: true
    });

    // Auto-scroll vers l'élément actif si nécessaire
    if (hasScroll) {
      const wrapperWidth = navWrapperRef.current.clientWidth;
      const elementCenter = elementLeft + elementRect.width / 2;
      const wrapperCenter = wrapperWidth / 2;
      const scrollLeft = navWrapperRef.current.scrollLeft;
      
      if (elementCenter < scrollLeft + 100 || 
          elementCenter > scrollLeft + wrapperWidth - 100) {
        const targetScroll = Math.max(0, elementLeft - wrapperCenter + elementRect.width / 2);
        navWrapperRef.current.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  };

  const hideIndicator = () => {
    if (!isMobile) {
      setActiveIndicator(prev => ({ ...prev, visible: false }));
    }
  };

  const getSearchResults = (query: string) => {
    if (!query) return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return searchableItems.filter(item => {
      return item.title.toLowerCase().includes(normalizedQuery) ||
             item.keywords.some(keyword => keyword.includes(normalizedQuery));
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = getSearchResults(searchQuery);
    if (results.length === 1) {
      setSearchQuery('');
      setShowResults(false);
      navigate(results[0].path);
    }
  };

  const handleResultClick = (path: string) => {
    setSearchQuery('');
    setShowResults(false);
    navigate(path);
  };

  const handleSearchFocus = () => {
    if (searchQuery) {
      setShowResults(true);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  const handleSubmenuClick = (path: string) => {
    const [basePath, hash] = path.split('#');
    navigate(path);
    setShowSubmenu(null);
    setIsOpen(false);

    if (location.pathname === basePath && hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Gestion des sous-menus et indicateur
  const handleMouseEnter = (name: string, element: HTMLElement) => {
    if (isMobile) return;
    
    if (submenuTimeout) {
      clearTimeout(submenuTimeout);
      setSubmenuTimeout(null);
    }
    setShowSubmenu(name);
    updateIndicator(element);
    
    // Calculer et définir la position du sous-menu
    const position = calculateSubmenuPosition(element);
    setSubmenuPosition(position);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    
    const timeout = setTimeout(() => {
      setShowSubmenu(null);
      hideIndicator();
    }, 300);
    setSubmenuTimeout(timeout);
  };

  const handleNavItemMouseEnter = (element: HTMLElement) => {
    if (!isMobile && !showSubmenu) {
      updateIndicator(element);
    }
  };

  const handleNavItemMouseLeave = () => {
    if (!isMobile && !showSubmenu) {
      hideIndicator();
    }
  };

  const handleKnowledgeClick = (item: any, e: React.MouseEvent) => {
    if (isMobile && item.submenu) {
      e.preventDefault();
      if (!knowledgeClicked) {
        setKnowledgeClicked(true);
        setShowSubmenu(showSubmenu === item.name ? null : item.name);
      } else {
        navigate(item.href);
        setIsOpen(false);
        setKnowledgeClicked(false);
        setShowSubmenu(null);
      }
    } else {
      if (item.submenu) {
        setShowSubmenu(showSubmenu === item.name ? null : item.name);
      }
      navigate(item.href);
      setIsOpen(false);
    }
  };

  // Ajouter un effet pour recalculer après le rendu
  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollable();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isMobile, navigation]);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center transform hover:scale-105 transition-transform">
              <Logo />
            </Link>
          </div>

          {/* Subscription Status - Only show for authenticated users */}
          <div className="hidden xl:block">
            <SubscriptionStatus compact={true} />
          </div>

          <div className="hidden xl:flex xl:items-center xl:space-x-4 2xl:space-x-6">
            {/* Wrapper avec indicateurs de scroll */}
            <div 
              ref={navWrapperRef}
              className="nav-scroll-wrapper relative flex-1 max-w-2xl"
              onScroll={checkScrollable}
            >
              <div 
                ref={navContainerRef}
                className="nav-container"
                style={{
                  '--indicator-left': `${activeIndicator.left}px`
                } as React.CSSProperties}
              >
                {/* Indicateur unifié avec position exacte */}
                <div 
                  className={`nav-indicator ${activeIndicator.visible ? 'active' : ''}`}
                  style={{
                    width: `${activeIndicator.width}px`,
                    '--indicator-left': `${activeIndicator.left}px`
                  } as React.CSSProperties}
                />
                
                {navigation.map((item) => (
                  <div 
                    key={item.name}
                    className="nav-item force-nowrap scroll-snap-center"
                    onMouseEnter={() => item.submenu && handleMouseEnter(item.name, document.querySelector(`[data-nav-item="${item.name}"]`) as HTMLElement)}
                    onMouseLeave={item.submenu ? handleMouseLeave : undefined}
                  >
                    {item.name === 'Formation' ? (
                      <Link
                        to={item.href}
                        data-nav-item={item.name}
                        className="nav-link text-gray-700 hover:text-blue-600 text-sm font-medium 
                          transition-all duration-300 no-after force-nowrap"
                        onClick={(e) => handleKnowledgeClick(item, e)}
                        onMouseEnter={(e) => handleNavItemMouseEnter(e.currentTarget)}
                        onMouseLeave={handleNavItemMouseLeave}
                        aria-current={location.pathname === item.href ? 'page' : undefined}
                      >
                        {item.name}
                        {item.submenu && (
                          <svg className="ml-1 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </Link>
                    ) : item.submenu ? (
                      <button
                        data-nav-item={item.name}
                        className="nav-link text-gray-700 hover:text-blue-600 text-sm font-medium 
                          transition-all duration-300 no-after force-nowrap"
                        aria-expanded={showSubmenu === item.name}
                        aria-haspopup="true"
                        onMouseEnter={(e) => handleNavItemMouseEnter(e.currentTarget)}
                        onMouseLeave={handleNavItemMouseLeave}
                      >
                        {item.name}
                        <svg className="ml-1 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        data-nav-item={item.name}
                        className="nav-link text-gray-700 hover:text-blue-600 text-sm font-medium 
                          transition-all duration-300 no-after force-nowrap"
                        onMouseEnter={(e) => handleNavItemMouseEnter(e.currentTarget)}
                        onMouseLeave={handleNavItemMouseLeave}
                        aria-current={location.pathname === item.href ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    )}
                    
                    {item.submenu && showSubmenu === item.name && (
                      <div
                        className="nav-submenu bg-white rounded-xl shadow-lg border border-gray-100 
                          overflow-hidden transform opacity-100 scale-100 transition-all duration-200"
                        style={{
                          top: submenuPosition.top,
                          left: submenuPosition.left,
                        }}
                        onMouseEnter={() => !isMobile && handleMouseEnter(item.name, document.querySelector(`[data-nav-item="${item.name}"]`) as HTMLElement)}
                        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                        role="menu"
                      >
                        <div className="p-2">
                          {item.submenu.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={() => handleSubmenuClick(subItem.href)}
                              className="block w-full px-4 py-3 rounded-lg text-left
                                transition-all duration-200 hover:bg-gray-50/80 
                                hover:translate-x-1 focus:outline-none focus:ring-2 
                                focus:ring-blue-500/20 focus:ring-offset-1"
                              role="menuitem"
                            >
                              <div className="submenu-item-container">
                                <div className="submenu-item-content">
                                  <div className="submenu-item-title font-medium text-gray-900 group-hover:text-blue-600
                                    transition-colors duration-200">
                                    {subItem.name}
                                    {subItem.popular && (
                                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs 
                                        font-medium bg-blue-100 text-blue-800 force-nowrap">
{t('nav.popular')}
                                      </span>
                                    )}
                                    {subItem.recommended && (
                                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs 
                                        font-medium bg-green-100 text-green-800 force-nowrap">
{t('nav.recommended')}
                                      </span>
                                    )}
                                  </div>
                                  <div className="submenu-item-description text-sm text-gray-500 mt-1">{subItem.description}</div>
                                </div>
                                {subItem.price && (
                                  <div className="submenu-item-price-section">
                                    <span className="submenu-item-price text-sm font-medium text-blue-600">{subItem.price}</span>
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex-shrink-0">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(e.target.value.length > 0);
                  }}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder={t('nav.search')}
                  className="w-48 px-4 py-2 pl-10 pr-4 rounded-full bg-gray-100 focus:bg-white 
                    border-2 border-transparent focus:border-blue-500 outline-none transition-all 
                    duration-300 group-hover:bg-gray-50"
                  aria-label={t('nav.search')}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 
                  transition-colors group-hover:text-gray-600" aria-hidden="true" />
              </form>

              {showResults && searchQuery && (
                <div className="absolute mt-2 w-64 bg-white rounded-xl shadow-lg border 
                  border-gray-100 overflow-hidden z-50 animate-fade-in-up" role="listbox">
                  {getSearchResults(searchQuery).length > 0 ? (
                    <ul>
                      {getSearchResults(searchQuery).map((result, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleResultClick(result.path)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 
                              hover:bg-blue-50 hover:text-blue-600 transition-colors flex 
                              items-center space-x-2"
                            role="option"
                          >
                            <span>{result.title}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      {t('nav.noResults')}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex-shrink-0 flex items-center space-x-3">
              <AuthButton onClick={onAuthClick} />
            </div>
          </div>

          <div className="xl:hidden flex items-center space-x-3 pr-2">
            <LanguageToggle />
            <AuthButton onClick={onAuthClick} />
            <div className="flex flex-col items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  transition-colors duration-200"
                aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="h-5 w-5 transform rotate-0 transition-transform duration-200" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5 transform rotate-0 transition-transform duration-200" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={`xl:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? 'max-h-screen opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-4">
            <form onSubmit={handleSearch} className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(e.target.value.length > 0);
                }}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                placeholder={t('nav.search')}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-full bg-gray-100 focus:bg-white 
                  border-2 border-transparent focus:border-blue-500 outline-none transition-all"
                aria-label={t('nav.search')}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            </form>

            {showResults && searchQuery && (
              <div className="mb-4 bg-white rounded-xl shadow-lg border border-gray-100 
                overflow-hidden animate-fade-in-up" role="listbox">
                {getSearchResults(searchQuery).length > 0 ? (
                  <ul>
                    {getSearchResults(searchQuery).map((result, index) => (
                      <li key={index}>
                        <button
                          onClick={() => {
                            handleResultClick(result.path);
                            setIsOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 
                            hover:bg-blue-50 hover:text-blue-600 transition-colors flex 
                            items-center space-x-2"
                          role="option"
                        >
                          <span>{result.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    {t('nav.noResults')}
                  </div>
                )}
              </div>
            )}

            {isLoggedIn && (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base 
                  font-medium transition-all duration-200 hover:bg-gray-50 rounded-lg 
                  animate-fade-in-up"
                onClick={() => setIsOpen(false)}
              >
{t('nav.dashboard')}
              </Link>
            )}

            {navigation.map((item) => (
              <React.Fragment key={item.name}>
                {item.name === 'Formation' ? (
                  <button
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base 
                      font-medium transition-all duration-200 hover:bg-gray-50 rounded-lg 
                      animate-fade-in-up w-full text-left"
                    onClick={(e) => handleKnowledgeClick(item, e)}
                    aria-expanded={showSubmenu === item.name}
                    aria-haspopup="true"
                  >
                    {item.name}
                  </button>
                ) : item.submenu ? (
                  <button
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base 
                      font-medium transition-all duration-200 hover:bg-gray-50 rounded-lg 
                      animate-fade-in-up w-full text-left"
                    onClick={() => setShowSubmenu(showSubmenu === item.name ? null : item.name)}
                    aria-expanded={showSubmenu === item.name}
                    aria-haspopup="true"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base 
                      font-medium transition-all duration-200 hover:bg-gray-50 rounded-lg 
                      animate-fade-in-up"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
                {item.submenu && showSubmenu === item.name && (
                  <div className="pl-4 space-y-1" role="menu">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.name}
                        onClick={() => handleSubmenuClick(subItem.href)}
                        className="w-full text-left text-gray-600 block px-3 py-2 text-sm 
                          font-medium transition-all duration-200 hover:bg-gray-50/80 
                          hover:translate-x-1 rounded-lg focus:outline-none focus:ring-2 
                          focus:ring-blue-500/20 focus:ring-offset-1"
                        role="menuitem"
                      >
                        <div className="flex justify-between items-center">
                          <span className="force-nowrap">{subItem.name}</span>
                          {subItem.price && (
                            <span className="text-blue-600 font-medium force-nowrap">{subItem.price}</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 block">{subItem.description}</span>
                        {subItem.popular && (
                          <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs 
                            font-medium bg-blue-100 text-blue-800">
{t('nav.popular')}
                          </span>
                        )}
                        {subItem.recommended && (
                          <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs 
                            font-medium bg-green-100 text-green-800">
{t('nav.recommended')}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}