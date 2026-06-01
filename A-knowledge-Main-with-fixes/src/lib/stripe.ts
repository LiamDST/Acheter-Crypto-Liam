import { supabase } from './supabaseClient';
import { stripeProducts } from './stripe-config';
import i18n from '../i18n';
import { stripePromise } from './stripeClient';

export async function createPaymentIntent(amount: number, currency = 'eur') {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        amount,
        currency
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create payment intent');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription', promoCode: string = '') {
  try {
    // Get the current URL to construct success and cancel URLs
    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/checkout/success?success=true`;
    const cancelUrl = `${baseUrl}/solutions`;

    // Call the Supabase Edge Function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
      },
      body: JSON.stringify({
        price_id: priceId,
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: mode,
        promotion_code: promoCode
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function redirectToCheckout(sessionId: string) {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
}

export async function getUserSubscription() {
  try {
    const { data: subscription, error } = await supabase
      .from('stripe_user_subscriptions')
      .select('*')
      .maybeSingle(); // Changed from .single() to .maybeSingle() to handle no subscription case

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return subscription;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
}

export async function getUserOrders() {
  try {
    const { data: orders, error } = await supabase
      .from('stripe_user_orders')
      .select('*')
      .order('order_date', { ascending: false });

    if (error) {
      throw error;
    }

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export function getPlanNameFromPriceId(priceId: string) {
  for (const [key, product] of Object.entries(stripeProducts)) {
    if (product.priceId === priceId) {
      const i18nKey = `payment.subscriptionPlans.${key}.name`;
      return i18n.t(i18nKey, { defaultValue: product.name || 'Abonnement' });
    }
  }
  return i18n.t('payment.subscription.defaultName', { defaultValue: 'Abonnement' });
}