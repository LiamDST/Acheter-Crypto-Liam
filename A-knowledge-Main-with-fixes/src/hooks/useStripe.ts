import { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
        
        if (!stripePublicKey) {
          throw new Error('Stripe public key not found');
        }

        const stripeInstance = await loadStripe(stripePublicKey);
        setStripe(stripeInstance);
      } catch (err) {
        console.error('Error loading Stripe:', err);
        setError(err instanceof Error ? err.message : 'Failed to load Stripe');
      } finally {
        setLoading(false);
      }
    };

    initializeStripe();
  }, []);

  return { stripe, loading, error };
}