"use client";
import { useState } from "react";
import { ArrowRight, Crown, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { AnimatedCryptoBackground } from "@/components/backgrounds/AnimatedCryptoBackground";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PasswordStrength } from "@/components/ui/PasswordStrength";

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative grid min-h-[78vh] place-items-center px-4 py-16 md:px-6">
      <AnimatedCryptoBackground variant="page" intensity="medium" />
      <Card className="w-full max-w-md">
        <Badge tone="premium" icon={Crown}>Compte gratuit</Badge>
        <h1 className="mt-5 text-4xl font-semibold">Créer un compte</h1>
        <p className="mt-3 text-sm leading-7 text-muted">Commencez gratuitement. Vous pourrez passer en premium plus tard, à votre rythme.</p>
        <div className="mt-4 rounded-lg border border-line bg-cream p-3 text-xs text-muted">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Vos données sont utilisées uniquement pour sécuriser votre compte.</span>
        </div>
        <form className="mt-6 grid gap-3">
          <label className="text-sm font-medium">
            Prénom
            <input className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 outline-none focus:border-blue" placeholder="Votre prénom" />
          </label>
          <label className="text-sm font-medium">
            Nom
            <input className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 outline-none focus:border-blue" placeholder="Votre nom" />
          </label>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink" aria-label={showPassword ? "Masquer" : "Afficher"}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <PasswordStrength password={password} />
          </label>
          <Button type="submit" className="mt-3 w-full">Créer mon espace <ArrowRight className="h-4 w-4" /></Button>
          <Button type="button" variant="light" className="w-full">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-line text-xs font-bold">G</span>
            Continuer avec Google
          </Button>
          <Button type="button" variant="light" className="w-full" onClick={() => console.log("Apple OAuth — à implémenter")}>
            <span className="text-base leading-none"></span>
            Continuer avec Apple
          </Button>
        </form>
        <p className="mt-4 text-center text-xs text-muted">Déjà un compte ? <a href="/login" className="font-semibold text-ink hover:underline">Se connecter</a></p>
      </Card>
    </main>
  );
}
