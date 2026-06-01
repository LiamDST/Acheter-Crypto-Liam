import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, Check, Mail, Tag } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { createCheckoutSession } from '../lib/stripe';
import { getProductByPlan } from '../lib/stripe-config';
import PaymentSection from './PaymentSection';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    title: string;
    price: string;
    period: string;
    plan: string;
  };
}

const screenshots = [
  "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1644088379091-d574269d422f?auto=format&fit=crop&q=80"
];

export default function SubscriptionModal({ isOpen, onClose, plan }: SubscriptionModalProps) {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  // Determine the plan type based on the title
  const getPlanType = () => {
    return plan.plan || 'formation';
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };
    checkAuth();

    const timer = setInterval(() => {
      setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      setIsAuthenticated(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) throw error;
      setIsAuthenticated(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur d\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    setPaymentComplete(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="subscription-modal-title">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl 
        animate-fade-in-up flex flex-col md:flex-row relative max-h-[90vh] md:max-h-[600px]">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={t('modal.closeAria')}
        >
          <X className="h-4 w-4 text-gray-500" aria-hidden="true" />
        </button>

        {/* Left Side - Form or Payment */}
        <div className="w-full md:w-1/2 p-4 overflow-y-auto">
          <div className="mb-4">
            <h2 id="subscription-modal-title" className="text-lg font-bold text-gray-900 mb-2">
              {isAuthenticated ? t('checkout.paymentMethod') : (showLogin ? t('auth.loginTitle') : t('auth.registerTitle'))}
            </h2>
            <div className="flex items-center gap-2 text-blue-600">
              <Check className="h-4 w-4" aria-hidden="true" />
              <span className="text-xs">{plan.title} - {plan.price}{plan.period}</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm" role="alert">
              {error}
            </div>
          )}

          {isAuthenticated ? (
            <PaymentSection 
              amount={plan.price} 
              onPaymentComplete={handlePaymentComplete}
              plan={getPlanType()}
              promoCode={promoCode}
            />
          ) : showLogin ? (
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label htmlFor="login-email" className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="votre@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-xs font-medium text-gray-700 mb-1">Mot de passe</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 rounded-xl text-white text-sm font-medium bg-gradient-to-r 
                  from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                  transition-all duration-200 transform hover:-translate-y-1 flex items-center 
                  justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" aria-hidden="true" />
                    <span>Connexion en cours...</span>
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-600">
                Pas encore de compte ?{' '}
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
                >
                  S'inscrire
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="signup-firstname" className="block text-xs font-medium text-gray-700 mb-1">Prénom</label>
                  <input
                    id="signup-firstname"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 
                      focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="signup-lastname" className="block text-xs font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    id="signup-lastname"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 
                      focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="votre@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-xs font-medium text-gray-700 mb-1">Mot de passe</label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="8 caractères minimum"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 rounded-xl text-white text-sm font-medium bg-gradient-to-r 
                  from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                  transition-all duration-200 transform hover:-translate-y-1 flex items-center 
                  justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" aria-hidden="true" />
                    <span>Inscription en cours...</span>
                  </>
                ) : (
                  <>
                    Créer mon compte
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-600">
                Déjà un compte ?{' '}
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
                >
                  Se connecter
                </button>
              </p>
            </form>
          )}

          {isAuthenticated && (
            <div className="mt-4">
              {showPromoInput ? (
                <div className="mt-3">
                  <label htmlFor="promo-code" className="block text-xs font-medium text-gray-700 mb-1">Code promo</label>
                  <div className="flex">
                    <input
                      id="promo-code"
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm rounded-l-xl border border-gray-300 focus:ring-2 
                        focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Entrez votre code"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 bg-blue-600 text-white rounded-r-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => setShowPromoInput(false)}
                    >
                      Appliquer
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPromoInput(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center focus:outline-none focus:underline"
                >
                  <Tag className="h-4 w-4 mr-1" aria-hidden="true" />
                  Vous avez un code promo ?
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Right Side - Process Explanation */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 overflow-y-auto">
          {paymentComplete ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Merci pour votre abonnement !</h3>
              <p className="text-gray-600 mb-4">
                Votre paiement a été traité avec succès. Vous recevrez une confirmation par email.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  <h3 className="text-sm font-bold text-gray-900">
                    {plan.title === 'Formation seule' 
                      ? 'Accès complet à la formation crypto' 
                      : 'Formation + Signaux de trading'}
                  </h3>
                </div>
                <p className="text-xs text-gray-600">
                  {plan.title === 'Formation seule'
                    ? 'Apprenez à votre rythme avec notre formation complète et nos ressources pédagogiques.'
                    : 'Apprenez et agissez immédiatement avec nos signaux de trading sur toutes les cryptos disponibles.'}
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-1 text-xs">Ce que vous obtenez</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-500" aria-hidden="true" />
                      Accès à tous les modules de formation
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-green-500" aria-hidden="true" />
                      Ressources pédagogiques complètes
                    </li>
                    {plan.title === 'Formation + Signaux' && (
                      <>
                        <li className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-green-500" aria-hidden="true" />
                          Signaux de trading sur toutes les cryptos
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-green-500" aria-hidden="true" />
                          Support prioritaire
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 mb-4">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-gray-900 text-xs">Satisfaction client</h4>
                  <span className="text-lg font-bold text-green-600">+95%</span>
                </div>
                <p className="text-[10px] text-gray-600">
                  * Basé sur les retours de nos clients
                </p>
              </div>

              <div className="relative h-20 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                {screenshots.map((screenshot, index) => (
                  <img
                    key={screenshot}
                    src={screenshot}
                    alt={`Interface de trading ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000
                      ${index === currentScreenshot ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-2 flex justify-center space-x-1">
                  {screenshots.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1 h-1 rounded-full transition-all duration-300 
                        ${index === currentScreenshot ? 'bg-white w-3' : 'bg-white/60'}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}