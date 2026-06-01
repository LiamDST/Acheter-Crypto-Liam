"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { AnimatedCryptoBackground } from "@/components/backgrounds/AnimatedCryptoBackground";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <main className="relative grid min-h-[78vh] place-items-center px-4 py-16 md:px-6">
      <AnimatedCryptoBackground variant="page" intensity="medium" />
      <Card className="w-full max-w-md">
        <Badge tone="neutral" icon={Mail}>Réinitialisation</Badge>

        {sent ? (
          <>
            <h1 className="mt-5 text-3xl font-semibold">Vérifiez votre boîte mail</h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              Un lien de réinitialisation a été envoyé à <span className="font-semibold text-ink">{email}</span>. Vérifiez aussi vos spams si nécessaire.
            </p>
            <div className="mt-6">
              <Button href="/login" variant="light" className="w-full"><ArrowLeft className="h-4 w-4" /> Retour à la connexion</Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="mt-5 text-3xl font-semibold">Mot de passe oublié ?</h1>
            <p className="mt-3 text-sm leading-7 text-muted">Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
            <form
              className="mt-6 grid gap-3"
              onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
            >
              <label className="text-sm font-medium">
                Email
                <input
                  type="email"
                  required
                  className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 outline-none focus:border-blue"
                  placeholder="vous@exemple.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <Button type="submit" className="mt-3 w-full">Envoyer le lien <ArrowRight className="h-4 w-4" /></Button>
            </form>
            <p className="mt-4 text-center text-xs text-muted">
              <Link href="/login" className="inline-flex items-center gap-1 font-semibold text-ink hover:underline"><ArrowLeft className="h-3 w-3" /> Retour à la connexion</Link>
            </p>
          </>
        )}
      </Card>
    </main>
  );
}
