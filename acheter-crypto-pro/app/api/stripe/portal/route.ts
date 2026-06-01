import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const form = await request.formData();
  const customer = String(form.get("customer") || "");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!stripe || !customer) {
    return NextResponse.json({ error: "Stripe ou customer_id manquant." }, { status: 400 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer,
    return_url: `${siteUrl}/dashboard`
  });

  return NextResponse.redirect(session.url, { status: 303 });
}
