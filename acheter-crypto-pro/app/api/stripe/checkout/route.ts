import { NextResponse } from "next/server";
import { getPriceId, stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const form = await request.formData();
  const plan = String(form.get("plan") || "1-month");
  const signals = String(form.get("signals") || "false") === "true";
  const coupon = String(form.get("coupon") || "").trim();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const { price, signalPrice } = getPriceId(plan, signals);

  if (!stripe || !price) {
    return NextResponse.json({ error: "Stripe n'est pas configuré. Renseignez STRIPE_SECRET_KEY et les STRIPE_PRICE_* dans .env.local." }, { status: 400 });
  }

  const lineItems = [{ price, quantity: 1 }];
  if (signalPrice) lineItems.push({ price: signalPrice, quantity: 1 });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: lineItems,
    allow_promotion_codes: true,
    discounts: coupon ? [{ coupon }] : undefined,
    success_url: `${siteUrl}/dashboard?checkout=success`,
    cancel_url: `${siteUrl}/pricing?checkout=cancelled`,
    metadata: { plan, signals: String(signals) }
  });

  return NextResponse.redirect(session.url || `${siteUrl}/pricing`, { status: 303 });
}
