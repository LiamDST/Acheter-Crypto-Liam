import { stripeProducts } from '../lib/stripe-config';

/**
 * Get product information by plan type
 */
export function getProductInfo(planType: keyof typeof stripeProducts) {
  return stripeProducts[planType];
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency = 'EUR') {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculate discount amount
 */
export function calculateDiscount(originalPrice: number, discountPercent: number) {
  return originalPrice * (discountPercent / 100);
}

/**
 * Get plan features for display
 */
export function getPlanFeatures(planType: keyof typeof stripeProducts) {
  const baseFeatures = [
    'Accès complet à la formation crypto',
    'Modules vidéos et PDF',
    'Accès à la communauté',
    'Support email standard',
    'Mises à jour gratuites'
  ];

  if (planType === 'formationEtSignaux') {
    return [
      ...baseFeatures,
      'Signaux de trading sur toutes les cryptos',
      'Support prioritaire',
      'Analyses de marché exclusives',
      'Stratégies avancées'
    ];
  }

  return baseFeatures;
}

/**
 * Validate Stripe configuration
 */
export function validateStripeConfig() {
  const requiredEnvVars = [
    'VITE_STRIPE_PUBLIC_KEY',
  ];

  const missing = requiredEnvVars.filter(envVar => !import.meta.env[envVar]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required Stripe environment variables: ${missing.join(', ')}`);
  }

  return true;
}

/**
 * Get subscription status display text
 */
export function getSubscriptionStatusText(status: string) {
  const statusMap: Record<string, string> = {
    'active': 'Actif',
    'canceled': 'Annulé',
    'incomplete': 'Incomplet',
    'incomplete_expired': 'Expiré',
    'past_due': 'En retard',
    'trialing': 'Période d\'essai',
    'unpaid': 'Impayé',
    'paused': 'En pause'
  };

  return statusMap[status] || status;
}

/**
 * Check if subscription is active
 */
export function isSubscriptionActive(subscription: any) {
  if (!subscription) return false;
  
  const now = new Date();
  const endDate = new Date(subscription.end_date);
  
  return subscription.status === 'active' && endDate > now;
}