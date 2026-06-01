import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { CreditCard, Lock, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { createPaymentIntent } from '../lib/stripe';

interface StripeCheckoutFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  planType?: string;
}


export default function StripeCheckoutForm({ 
  amount, 
  onSuccess, 
  onError, 
  planType = 'formation' 
}: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');

  // Create payment intent when component mounts
  React.useEffect(() => {
    const initializePayment = async () => {
      try {
        const { client_secret } = await createPaymentIntent(amount * 100); // Convert to cents
        setClientSecret(client_secret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        onError('Erreur lors de l\'initialisation du paiement');
      }
    };

    if (amount > 0) {
      initializePayment();
    }
  }, [amount, onError]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      onError('Stripe n\'est pas encore chargé. Veuillez réessayer.');
      return;
    }


    setLoading(true);

    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Vous devez être connecté pour effectuer un paiement.');
      }

      // Confirm payment using Payment Element
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });

      if (confirmError) {
        throw new Error(confirmError.message || 'Erreur lors du paiement');
      }

      // If we reach here without error, payment was successful
      onSuccess();

    } catch (error) {
      console.error('Payment error:', error);
      onError(error instanceof Error ? error.message : 'Une erreur est survenue lors du paiement');
    } finally {
      setLoading(false);
    }
  };

  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="flex items-center mb-3">
          <CreditCard className="h-5 w-5 text-gray-600 mr-2" />
          <h3 className="font-medium text-gray-900">Informations de paiement</h3>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <PaymentElement />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl flex items-start">
        <Lock className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Paiement sécurisé</p>
          <p>Vos informations de paiement sont protégées par le chiffrement SSL et traitées de manière sécurisée par Stripe.</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 px-6 rounded-xl font-medium text-white
          transition-all duration-200 flex items-center justify-center
          ${loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1'
          }`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
            Traitement en cours...
          </>
        ) : (
          <>
            <Lock className="h-5 w-5 mr-2" />
            Payer {(amount).toFixed(2)}€
          </>
        )}
      </button>
    </form>
  );
}