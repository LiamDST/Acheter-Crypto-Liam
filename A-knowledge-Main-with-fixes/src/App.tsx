import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import StripeProvider from './components/StripeProvider';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Solutions from './components/Solutions';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import Modal from './components/Modal';
import { AuthModalContent } from './components/AuthButton';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import LanguageRouter from './components/LanguageRouter';
import { addAuthModalListener, AuthEventDetail } from './lib/authEvents';
import OrganizationSchema from './components/OrganizationSchema';
import WebsiteSchema from './components/WebsiteSchema';
import Breadcrumb from './components/Breadcrumb';
import SEOHead from './components/SEOHead';
import ErrorBoundary from './components/ErrorBoundary';
import AuthWrapper from './components/AuthWrapper';
import FloatingLanguageToggle from './components/FloatingLanguageToggle';

// Lazy load pages
const Market = lazy(() => import('./pages/Market'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/Team'));
const Support = lazy(() => import('./pages/Support'));
const Values = lazy(() => import('./pages/Values'));
const SolutionsPage = lazy(() => import('./pages/Solutions'));
const Appointment = lazy(() => import('./pages/Appointment'));
const Knowledge = lazy(() => import('./pages/Knowledge'));
const Articles = lazy(() => import('./pages/Articles'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const SignauxTrading = lazy(() => import('./pages/SignauxTrading'));
const CreateAccount = lazy(() => import('./pages/CreateAccount'));
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'));
const CryptoEducation = lazy(() => import('./pages/CryptoEducation'));
const BlockchainFundamentals = lazy(() => import('./pages/BlockchainFundamentals'));
const DecentralizationPrinciples = lazy(() => import('./pages/DecentralizationPrinciples'));
const CryptographySecurity = lazy(() => import('./pages/CryptographySecurity'));
const BlockchainTypes = lazy(() => import('./pages/BlockchainTypes'));
const BitcoinHistory = lazy(() => import('./pages/BitcoinHistory'));
const EthereumSmartContracts = lazy(() => import('./pages/EthereumSmartContracts'));
const TokenTypes = lazy(() => import('./pages/TokenTypes'));
const WalletsSecurity = lazy(() => import('./pages/WalletsSecurity'));
const TechnicalAnalysis = lazy(() => import('./pages/TechnicalAnalysis'));
const ChartAnalysis = lazy(() => import('./pages/ChartAnalysis'));
const TradingPatterns = lazy(() => import('./pages/TradingPatterns'));
const RiskManagement = lazy(() => import('./pages/RiskManagement'));
const DefiProtocols = lazy(() => import('./pages/DefiProtocols'));
const YieldFarming = lazy(() => import('./pages/YieldFarming'));
const LiquidityPools = lazy(() => import('./pages/LiquidityPools'));
const Stablecoins = lazy(() => import('./pages/Stablecoins'));
const WalletSecurity = lazy(() => import('./pages/WalletSecurity'));
const CryptoScams = lazy(() => import('./pages/CryptoScams'));
const PortfolioManagement = lazy(() => import('./pages/PortfolioManagement'));
const AdvancedTrading = lazy(() => import('./pages/AdvancedTrading'));
const CourseCompletion = lazy(() => import('./pages/CourseCompletion'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Settings = lazy(() => import('./pages/Settings'));
const CompanyPolicy = lazy(() => import('./pages/CompanyPolicy'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Dictionary = lazy(() => import('./pages/Dictionary'));
const DictionaryTerm = lazy(() => import('./pages/DictionaryTerm'));
const NotFound = lazy(() => import('./components/NotFound'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Legacy redirect components
const LegacyArticleRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/fr/articles/${slug}`} replace />;
};

const LegacyDictionaryRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/fr/dictionnaire-crypto/${slug}`} replace />;
};

function Home() {
  return (
    <div>
      <SEOHead path="/" />
      <OrganizationSchema />
      <Hero />
      <WhyChooseUs />
      <Features />
      <Solutions />
    </div>
  );
}

function App() {
  const { t } = useTranslation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Function to handle auth modal opening
  const handleAuthClick = (signUp = false) => {
    setIsSignUp(signUp);
    setShowAuthModal(true);
  };

  // Listen for custom auth modal events
  useEffect(() => {
    const removeListener = addAuthModalListener((event: CustomEvent<AuthEventDetail>) => {
      setIsSignUp(event.detail.isSignUp || false);
      setShowAuthModal(true);
    });
    
    return () => removeListener();
  }, []);

  return (
    <HelmetProvider>
      <StripeProvider>
      <Router>
        <ErrorBoundary>
          <AuthWrapper>
            <WebsiteSchema />
            <ScrollToTop />
            <div className="min-h-screen bg-white flex flex-col">
              <Header onAuthClick={() => handleAuthClick(false)} />
              <main className="flex-1 pt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <Breadcrumb />
                </div>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                {/* Redirect root to default language */}
                <Route path="/" element={<Navigate to="/fr" replace />} />
                
                {/* Language-prefixed routes */}
                <Route path="/:lang" element={
                  <LanguageRouter>
                    <Home />
                  </LanguageRouter>
                } />
                <Route path="/:lang/marche-cryptomonnaies-temps-reel" element={
                  <LanguageRouter><Market /></LanguageRouter>
                } />
                <Route path="/:lang/about" element={
                  <LanguageRouter><About /></LanguageRouter>
                } />
                <Route path="/:lang/team" element={
                  <LanguageRouter><Team /></LanguageRouter>
                } />
                <Route path="/:lang/support" element={
                  <LanguageRouter><Support /></LanguageRouter>
                } />
                <Route path="/:lang/values" element={
                  <LanguageRouter><Values /></LanguageRouter>
                } />
                <Route path="/:lang/solutions" element={
                  <LanguageRouter><SolutionsPage /></LanguageRouter>
                } />
                <Route path="/:lang/solutions/formation-cryptomonnaie/tarification" element={
                  <LanguageRouter><SolutionsPage /></LanguageRouter>
                } />
                <Route path="/:lang/signaux-trading" element={
                  <LanguageRouter><SignauxTrading /></LanguageRouter>
                } />
                <Route path="/:lang/create-account" element={
                  <LanguageRouter><CreateAccount /></LanguageRouter>
                } />
                <Route path="/:lang/checkout/success" element={
                  <LanguageRouter><CheckoutSuccess /></LanguageRouter>
                } />
                <Route path="/:lang/appointment" element={
                  <LanguageRouter><Appointment /></LanguageRouter>
                } />
                <Route path="/:lang/comprendre-les-cryptomonnaies" element={
                  <LanguageRouter><Knowledge /></LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto" element={
                  <LanguageRouter><CryptoEducation /></LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/fondamentaux-blockchain" element={
                  <LanguageRouter>
                    <ProtectedRoute>
                      <BlockchainFundamentals />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/principes-decentralisation" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <DecentralizationPrinciples />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/cryptographie-securite" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <CryptographySecurity />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/types-blockchain" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <BlockchainTypes />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/bitcoin-histoire" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <BitcoinHistory />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/ethereum-smart-contracts" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <EthereumSmartContracts />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/types-tokens" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <TokenTypes />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/securite-wallets" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <WalletsSecurity />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/indicateurs-techniques" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <TechnicalAnalysis />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/analyse-graphiques" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <ChartAnalysis />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/patterns-trading" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <TradingPatterns />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/gestion-risque" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <RiskManagement />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/protocoles-defi" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <DefiProtocols />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/yield-farming" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <YieldFarming />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/pools-liquidite" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <LiquidityPools />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/stablecoins" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <Stablecoins />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/securisation-wallets" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <WalletSecurity />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/arnaques-crypto" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <CryptoScams />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/gestion-portfolio" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <PortfolioManagement />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/comprendre-la-crypto/strategies-avancees" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <AdvancedTrading />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/formation/certificat-reussite" element={
                  <LanguageRouter>
                    <ProtectedRoute requireSubscription={true}>
                      <CourseCompletion />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/articles" element={
                  <LanguageRouter><Articles /></LanguageRouter>
                } />
                <Route path="/:lang/articles/:slug" element={
                  <LanguageRouter><ArticleDetail /></LanguageRouter>
                } />
                <Route path="/:lang/dictionnaire-crypto" element={
                  <LanguageRouter><Dictionary /></LanguageRouter>
                } />
                <Route path="/:lang/dictionnaire-crypto/:slug" element={
                  <LanguageRouter><DictionaryTerm /></LanguageRouter>
                } />
                <Route path="/:lang/politique-entreprise" element={
                  <LanguageRouter><CompanyPolicy /></LanguageRouter>
                } />
                <Route path="/:lang/faq" element={
                  <LanguageRouter><FAQ /></LanguageRouter>
                } />
                <Route path="/:lang/politique-de-confidentialite" element={
                  <LanguageRouter><PrivacyPolicy /></LanguageRouter>
                } />
                <Route path="/:lang/conditions-utilisation" element={
                  <LanguageRouter><TermsOfService /></LanguageRouter>
                } />
                <Route path="/:lang/reset-password" element={
                  <LanguageRouter><ResetPassword /></LanguageRouter>
                } />
                <Route path="/:lang/settings" element={
                  <LanguageRouter>
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                <Route path="/:lang/dashboard" element={
                  <LanguageRouter>
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  </LanguageRouter>
                } />
                
                {/* Legacy routes redirects */}
                <Route path="/formation/comprendre-la-crypto" element={<Navigate to="/fr/formation/comprendre-la-crypto" replace />} />
                <Route path="/formation/comprendre-la-crypto/fondamentaux-blockchain" element={<Navigate to="/fr/formation/comprendre-la-crypto/fondamentaux-blockchain" replace />} />
                <Route path="/formation/comprendre-la-crypto/principes-decentralisation" element={<Navigate to="/fr/formation/comprendre-la-crypto/principes-decentralisation" replace />} />
                <Route path="/formation/comprendre-la-crypto/cryptographie-securite" element={<Navigate to="/fr/formation/comprendre-la-crypto/cryptographie-securite" replace />} />
                <Route path="/formation/comprendre-la-crypto/types-blockchain" element={<Navigate to="/fr/formation/comprendre-la-crypto/types-blockchain" replace />} />
                <Route path="/formation/comprendre-la-crypto/bitcoin-histoire" element={<Navigate to="/fr/formation/comprendre-la-crypto/bitcoin-histoire" replace />} />
                <Route path="/formation/comprendre-la-crypto/ethereum-smart-contracts" element={<Navigate to="/fr/formation/comprendre-la-crypto/ethereum-smart-contracts" replace />} />
                <Route path="/formation/comprendre-la-crypto/types-tokens" element={<Navigate to="/fr/formation/comprendre-la-crypto/types-tokens" replace />} />
                <Route path="/formation/comprendre-la-crypto/securite-wallets" element={<Navigate to="/fr/formation/comprendre-la-crypto/securite-wallets" replace />} />
                <Route path="/formation/comprendre-la-crypto/indicateurs-techniques" element={<Navigate to="/fr/formation/comprendre-la-crypto/indicateurs-techniques" replace />} />
                <Route path="/formation/comprendre-la-crypto/analyse-graphiques" element={<Navigate to="/fr/formation/comprendre-la-crypto/analyse-graphiques" replace />} />
                <Route path="/formation/comprendre-la-crypto/patterns-trading" element={<Navigate to="/fr/formation/comprendre-la-crypto/patterns-trading" replace />} />
                <Route path="/formation/comprendre-la-crypto/gestion-risque" element={<Navigate to="/fr/formation/comprendre-la-crypto/gestion-risque" replace />} />
                <Route path="/formation/comprendre-la-crypto/protocoles-defi" element={<Navigate to="/fr/formation/comprendre-la-crypto/protocoles-defi" replace />} />
                <Route path="/formation/comprendre-la-crypto/yield-farming" element={<Navigate to="/fr/formation/comprendre-la-crypto/yield-farming" replace />} />
                <Route path="/formation/comprendre-la-crypto/pools-liquidite" element={<Navigate to="/fr/formation/comprendre-la-crypto/pools-liquidite" replace />} />
                <Route path="/formation/comprendre-la-crypto/stablecoins" element={<Navigate to="/fr/formation/comprendre-la-crypto/stablecoins" replace />} />
                <Route path="/formation/comprendre-la-crypto/securisation-wallets" element={<Navigate to="/fr/formation/comprendre-la-crypto/securisation-wallets" replace />} />
                <Route path="/formation/comprendre-la-crypto/arnaques-crypto" element={<Navigate to="/fr/formation/comprendre-la-crypto/arnaques-crypto" replace />} />
                <Route path="/formation/comprendre-la-crypto/gestion-portfolio" element={<Navigate to="/fr/formation/comprendre-la-crypto/gestion-portfolio" replace />} />
                <Route path="/formation/comprendre-la-crypto/strategies-avancees" element={<Navigate to="/fr/formation/comprendre-la-crypto/strategies-avancees" replace />} />
                <Route path="/marche-cryptomonnaies-temps-reel" element={<Navigate to="/fr/marche-cryptomonnaies-temps-reel" replace />} />
                <Route path="/about" element={<Navigate to="/fr/about" replace />} />
                <Route path="/team" element={<Navigate to="/fr/team" replace />} />
                <Route path="/support" element={<Navigate to="/fr/support" replace />} />
                <Route path="/values" element={<Navigate to="/fr/values" replace />} />
                <Route path="/solutions" element={<Navigate to="/fr/solutions" replace />} />
                <Route path="/signaux-trading" element={<Navigate to="/fr/signaux-trading" replace />} />
                <Route path="/create-account" element={<Navigate to="/fr/create-account" replace />} />
                <Route path="/appointment" element={<Navigate to="/fr/appointment" replace />} />
                <Route path="/comprendre-les-cryptomonnaies" element={<Navigate to="/fr/comprendre-les-cryptomonnaies" replace />} />
                <Route path="/formation/comprendre-la-crypto" element={<Navigate to="/fr/formation/comprendre-la-crypto" replace />} />
                <Route path="/articles" element={<Navigate to="/fr/articles" replace />} />
                <Route path="/articles/:slug" element={<LegacyArticleRedirect />} />
                <Route path="/dictionnaire-crypto" element={<Navigate to="/fr/dictionnaire-crypto" replace />} />
                <Route path="/dictionnaire-crypto/:slug" element={<LegacyDictionaryRedirect />} />
                <Route path="/politique-entreprise" element={<Navigate to="/fr/politique-entreprise" replace />} />
                <Route path="/faq" element={<Navigate to="/fr/faq" replace />} />
                <Route path="/politique-de-confidentialite" element={<Navigate to="/fr/politique-de-confidentialite" replace />} />
                <Route path="/conditions-utilisation" element={<Navigate to="/fr/conditions-utilisation" replace />} />
                <Route path="/reset-password" element={<Navigate to="/fr/reset-password" replace />} />
                <Route path="/settings" element={<Navigate to="/fr/settings" replace />} />
                <Route path="/dashboard" element={<Navigate to="/fr/dashboard" replace />} />
                <Route path="/knowledge" element={<Navigate to="/fr/comprendre-les-cryptomonnaies" replace />} />
                <Route path="/knowledge/crypto" element={<Navigate to="/fr/formation/comprendre-la-crypto" replace />} />
                <Route path="/knowledge/crypto/module-1" element={<Navigate to="/fr/formation/comprendre-la-crypto/fondamentaux-blockchain" replace />} />
                <Route path="/knowledge/crypto/module-2" element={<Navigate to="/fr/formation/comprendre-la-crypto/principes-decentralisation" replace />} />
                <Route path="/knowledge/crypto/module-3" element={<Navigate to="/fr/formation/comprendre-la-crypto/cryptographie-securite" replace />} />
                <Route path="/knowledge/crypto/module-4" element={<Navigate to="/fr/formation/comprendre-la-crypto/types-blockchain" replace />} />
                <Route path="/knowledge/crypto/module-5" element={<Navigate to="/fr/formation/comprendre-la-crypto/bitcoin-histoire" replace />} />
                <Route path="/knowledge/crypto/module-6" element={<Navigate to="/fr/formation/comprendre-la-crypto/ethereum-smart-contracts" replace />} />
                <Route path="/knowledge/crypto/module-7" element={<Navigate to="/fr/formation/comprendre-la-crypto/types-tokens" replace />} />
                <Route path="/knowledge/crypto/module-8" element={<Navigate to="/fr/formation/comprendre-la-crypto/securite-wallets" replace />} />
                <Route path="/knowledge/crypto/module-9" element={<Navigate to="/fr/formation/comprendre-la-crypto/indicateurs-techniques" replace />} />
                <Route path="/knowledge/crypto/module-10" element={<Navigate to="/fr/formation/comprendre-la-crypto/analyse-graphiques" replace />} />
                <Route path="/knowledge/crypto/module-11" element={<Navigate to="/fr/formation/comprendre-la-crypto/patterns-trading" replace />} />
                <Route path="/knowledge/crypto/module-12" element={<Navigate to="/fr/formation/comprendre-la-crypto/gestion-risque" replace />} />
                <Route path="/knowledge/crypto/module-13" element={<Navigate to="/fr/formation/comprendre-la-crypto/protocoles-defi" replace />} />
                <Route path="/knowledge/crypto/module-14" element={<Navigate to="/fr/formation/comprendre-la-crypto/yield-farming" replace />} />
                <Route path="/knowledge/crypto/module-15" element={<Navigate to="/fr/formation/comprendre-la-crypto/pools-liquidite" replace />} />
                <Route path="/knowledge/crypto/module-16" element={<Navigate to="/fr/formation/comprendre-la-crypto/stablecoins" replace />} />
                <Route path="/knowledge/crypto/module-17" element={<Navigate to="/fr/formation/comprendre-la-crypto/securisation-wallets" replace />} />
                <Route path="/knowledge/crypto/module-18" element={<Navigate to="/fr/formation/comprendre-la-crypto/arnaques-crypto" replace />} />
                <Route path="/knowledge/crypto/module-19" element={<Navigate to="/fr/formation/comprendre-la-crypto/gestion-portfolio" replace />} />
                <Route path="/knowledge/crypto/module-20" element={<Navigate to="/fr/formation/comprendre-la-crypto/strategies-avancees" replace />} />
                <Route path="/market" element={<Navigate to="/fr/marche-cryptomonnaies-temps-reel" replace />} />
                <Route path="/dictionary" element={<Navigate to="/fr/dictionnaire-crypto" replace />} />
                <Route path="/dictionary/:slug" element={<Navigate to="/fr/dictionnaire-crypto/:slug" replace />} />
                
                {/* Auth callback route */}
                <Route path="/auth/callback" element={<AuthCallback />} />
                
                {/* Route 404 - DOIT être en dernier */}
                <Route path="*" element={<LanguageRouter><NotFound /></LanguageRouter>} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <CookieConsent />
            
            {/* Floating Language Toggle for Desktop */}
            <div className="hidden lg:block">
              <FloatingLanguageToggle />
            </div>

            <Modal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
              title={isSignUp ? t('auth.registerTitle') : t('auth.loginTitle')}
              subtitle={isSignUp ? t('auth.registerSubtitle') : t('auth.loginSubtitle')}
            >
              <AuthModalContent
                isSignUp={isSignUp}
                setIsSignUp={setIsSignUp}
                onClose={() => setShowAuthModal(false)}
              />
            </Modal>
          </div>
          </AuthWrapper>
        </ErrorBoundary>
      </Router>
      </StripeProvider>
    </HelmetProvider>
  );
}

export default App;