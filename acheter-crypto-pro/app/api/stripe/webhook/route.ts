import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !signature || !secret) {
    return NextResponse.json({ error: "Webhook Stripe non configuré." }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      // TODO: récupérer customer/subscription et activer premium dans Supabase.
    }

    if (event.type === "invoice.payment_failed") {
      // TODO: marquer le paiement comme échoué et déclencher une relance.
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur webhook";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
