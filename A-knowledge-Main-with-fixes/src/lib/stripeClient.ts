import { loadStripe, Stripe } from '@stripe/stripe-js';

// Get Stripe public key from environment
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_live_51RGIX3HzOQ9ME26OMpOQTH49UCpc0e9IRxouMtADZDPONL6CqwoqDwklmTswz2L2vuGCgYnzorILdowIIq4kBnVp00s41nlLvJ';

// Initialize Stripe with enhanced configuration
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY, {
  locale: 'fr',
  apiVersion: '2023-10-16',
});
export { stripePromise };

// Utility function to format currency
export const formatCurrency = (amount: number, currency = 'EUR') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Utility function to convert cents to currency
export const centsToCurrency = (cents: number) => {
  return cents / 100;
};

// Utility function to convert currency to cents
export const currencyToCents = (amount: number) => {
  return Math.round(amount * 100);
};