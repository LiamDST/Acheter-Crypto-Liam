import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export function getPriceId(plan: string, signals: boolean) {
  const base: Record<string, string | undefined> = {
    "1-month": process.env.STRIPE_PRICE_1_MONTH,
    "6-months": process.env.STRIPE_PRICE_6_MONTHS,
    "12-months": process.env.STRIPE_PRICE_12_MONTHS
  };
  const signalsByPlan: Record<string, string | undefined> = {
    "1-month": process.env.STRIPE_PRICE_SIGNALS_1_MONTH ?? process.env.STRIPE_PRICE_SIGNALS_OPTION,
    "6-months": process.env.STRIPE_PRICE_SIGNALS_6_MONTHS ?? process.env.STRIPE_PRICE_SIGNALS_OPTION,
    "12-months": process.env.STRIPE_PRICE_SIGNALS_12_MONTHS ?? process.env.STRIPE_PRICE_SIGNALS_OPTION
  };
  const price = base[plan];
  const signalPrice = signals ? signalsByPlan[plan] : undefined;
  return { price, signalPrice };
}
