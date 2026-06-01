"use client";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { AnimatedCryptoBackground } from "@/components/backgrounds/AnimatedCryptoBackground";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative grid min-h-[78vh] place-items-center px-4 py-16 md:px-6">
      <AnimatedCryptoBackground variant="page" intensity="medium" />
      <Card className="w-full max-w-md">
        <Badge tone="premium" icon={Lock}>Connexion sécurisée</Badge>
        <h1 className="mt-5 text-4xl font-semibold">Accès membre</h1>
        <p className="mt-3 text-sm leading-7 text-muted">Connectez-vous à votre espace membre pour retrouver vos formations, analyses et marchés favoris.</p>
        <div className="mt-4 rounded-lg border border-line bg-cream p-3 text-xs text-muted">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Vos accès restent privés et protégés.</span>
        </div>
        <form className="mt-6 grid gap-3">
          <label className="text-sm font-medium">
            Email
            <input type="email" className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 outline-none focus:border-blue" placeholder="vous@exemple.fr" />
          </label>
          <label className="text-sm font-medium">
            Mot de passe
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-lg border border-line bg-white px-4 py-3 pr-12 outline-none focus:border-blue"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink" aria-label={showPassword ? "Masquer" : "Afficher"}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>
          <Link href="/forgot-password" className="text-left text-xs font-semibold text-muted hover:text-ink">Mot de passe oublié ?</Link>
          <div role="status" className="rounded-lg border border-line bg-cream p-3 text-xs text-muted">En cas d&apos;erreur, un message clair s&apos;affichera ici.</div>
          <Button type="submit" className="mt-3 w-full">Se connecter <ArrowRight className="h-4 w-4" /></Button>
          <Button type="button" variant="light" className="w-full">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-line text-xs font-bold">G</span>
            Continuer avec Google
          </Button>
          <Button type="button" variant="light" className="w-full" onClick={() => console.log("Apple OAuth — à implémenter")}>
            <span className="text-base leading-none"></span>
            Continuer avec Apple
          </Button>
        </form>
        <p className="mt-4 text-center text-xs text-muted">Pas encore de compte ? <Link href="/register" className="font-semibold text-ink hover:underline">Créer un compte</Link></p>
      </Card>
    </main>
  );
}
