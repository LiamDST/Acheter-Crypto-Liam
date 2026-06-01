import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ArrowRight, Check, Mail, Tag, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { createCheckoutSession } from '../lib/stripe';
import { stripeProducts } from '../lib/stripe-config';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: keyof typeof stripeProducts;
}

export default function CheckoutModal({ isOpen, onClose, plan }: CheckoutModalProps) {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);
  
  const product = stripeProducts[plan];
  const price = plan === 'formationSeule' ? '249,99€' : '349,99€';

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };
    
    if (isOpen) {
      checkAuth();
    }
  }, [isOpen]);

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      setError(null);
      
      if (!isAuthenticated) {
        setError("Veuillez vous connecter pour continuer");
        return;
      }
      
      // Create checkout session
      const checkoutUrl = await createCheckoutSession(
        product.priceId, 
        product.mode as 'payment' | 'subscription',
        promoCode
      );
      
      // Redirect to Checkout
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('Erreur de paiement:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors du paiement');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl 
        animate-fade-in-up relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={t('modal.closeAria')}
        >
          <X className="h-5 w-5 text-gray-500" aria-hidden="true" />
        </button>

        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Finaliser votre abonnement
            </h2>
            <div className="flex items-center gap-2 text-blue-600">
              <Check className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">{t(`payment.subscriptionPlans.${plan}.name`)} - {price}/mois</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 flex items-center text-red-600 text-sm">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mr-2" />
              <p>{error}</p>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <h3 className="font-medium text-gray-900 mb-2 text-sm">Détails de l'abonnement</h3>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Abonnement mensuel</span>
              <span className="font-medium text-gray-900">{price}</span>
            </div>
            
            {showPromoInput && (
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
            )}
            
            {!showPromoInput && (
              <button
                type="button"
                onClick={() => setShowPromoInput(true)}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center focus:outline-none focus:underline mt-2"
              >
                <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
                Vous avez un code promo ?
              </button>
            )}
          </div>

          {!isAuthenticated && loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : !isAuthenticated ? (
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Connexion requise</h3>
              <p className="text-gray-600 mb-4">
                Veuillez vous connecter ou créer un compte pour continuer votre abonnement.
              </p>
              <button
                onClick={() => {
                  // Trigger auth modal
                  const event = new CustomEvent('openAuthModal', { detail: { isSignUp: false } });
                  window.dispatchEvent(event);
                  onClose();
                }}
                className="w-full py-2 px-4 rounded-xl text-white text-sm font-medium bg-gradient-to-r 
                  from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                  transition-all duration-200 transform hover:-translate-y-1"
              >
                Se connecter
              </button>
              <button
                onClick={() => {
                  // Trigger auth modal with signup
                  const event = new CustomEvent('openAuthModal', { detail: { isSignUp: true } });
                  window.dispatchEvent(event);
                  onClose();
                }}
                className="w-full mt-2 py-2 px-4 rounded-xl text-gray-700 text-sm font-medium 
                  border border-gray-300 hover:bg-gray-50 
                  transition-all duration-200"
              >
                Créer un compte
              </button>
            </div>
          ) : (
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className={`w-full py-3 px-6 rounded-xl font-medium text-white
                transition-all duration-200 flex items-center justify-center
                ${checkoutLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1'
                }`}
            >
              {checkoutLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                  Redirection en cours...
                </>
              ) : (
                <>
                  Procéder au paiement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}