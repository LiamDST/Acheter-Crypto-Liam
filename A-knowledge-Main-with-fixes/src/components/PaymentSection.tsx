import React, { useState } from 'react';
import { CreditCard, Wallet, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createCheckoutSession } from '../lib/stripe';
import { getProductByPlan } from '../lib/stripe-config';
import { supabase } from '../lib/supabaseClient';

interface PaymentSectionProps {
  amount: string;
  onPaymentComplete: () => void;
  plan?: string;
  promoCode?: string;
}

// Convert amount to numeric format for Stripe and PayPal
const getNumericAmount = (amount: string): number => {
  return parseFloat(amount.replace(/[^0-9,]/g, '').replace(',', '.')) * 100;
};


const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_live_51RGIX3HzOQ9ME26OMpOQTH49UCpc0e9IRxouMtADZDPONL6CqwoqDwklmTswz2L2vuGCgYnzorILdowIIq4kBnVp00s41nlLvJ';

export default function PaymentSection({ amount, onPaymentComplete, plan = 'formation', promoCode = '' }: PaymentSectionProps) {
  const { t } = useTranslation();
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  // Check if user is authenticated
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  };

  // Initialize Stripe checkout
  const initializeStripeCheckout = async () => {
    try {
      setLoading(true);
      setPaymentStatus('processing');
      setError(null);

      // Vérifier l'authentification
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        setError(t('payment.loginRequired'));
        setPaymentStatus('error');
        setLoading(false);
        return;
      }

      // Get product configuration based on plan
      const product = getProductByPlan(plan);
      
      // Create checkout session
      const checkoutUrl = await createCheckoutSession(
        product.priceId, 
        product.mode as 'payment' | 'subscription',
        promoCode
      );
      
      // Redirect to Checkout
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('Erreur de paiement Stripe:', err);
      setError(err instanceof Error ? err.message : t('payment.paymentError'));
      setPaymentStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Handle USDT payment
  const handleUsdtPayment = async () => {
    try {
      setLoading(true);
      setPaymentStatus('processing');
      setError(null);

      // Simulate USDT payment process
      setTimeout(() => {
        setPaymentStatus('success');
        setLoading(false);
        setTimeout(() => {
          onPaymentComplete();
        }, 2000);
      }, 2000);
    } catch (err) {
      console.error('Erreur durant le paiement USDT:', err);
      setError(err instanceof Error ? err.message : t('payment.usdtPaymentError'));
      setPaymentStatus('error');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-red-50 rounded-lg flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2" />
          <p>{error}</p>
        </div>
      )}
      
      <div className="space-y-4">
        {[
          {
            id: 'card',
            name: t('payment.paymentMethods.card.name'),
            icon: CreditCard,
            description: t('payment.paymentMethods.card.description'),
            available: true
          },
          {
            id: 'crypto',
            name: t('payment.paymentMethods.crypto.name'),
            icon: Wallet,
            description: t('payment.paymentMethods.crypto.description'),
            available: false
          }
        ].map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            disabled={!method.available || loading}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedMethod === method.id
                ? 'border-blue-500 bg-blue-50 shadow-sm transform scale-[1.02]'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <method.icon className="w-6 h-6 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
              {!method.available && (
                <span className="text-xs text-gray-500">{t('payment.comingSoon')}</span>
              )}
            </div>
          </button>
        ))}

        <button
          onClick={selectedMethod === 'card' ? initializeStripeCheckout : handleUsdtPayment}
          disabled={loading || ![
            { id: 'card', available: true },
            { id: 'crypto', available: false }
          ].find(m => m.id === selectedMethod)?.available}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md transform hover:-translate-y-0.5'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('payment.processing')}
            </span>
          ) : (
            t('payment.payAmount', { amount })
          )}
        </button>
      </div>
    </div>
  );
}