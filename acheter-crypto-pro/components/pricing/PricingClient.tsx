"use client";
import { useState } from "react";
import { ArrowRight, Bell, Check, ChevronDown, ChevronUp, Lock, Mail, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { pricing } from "@/data/site";
import { cn } from "@/lib/utils";

const PLAN_NAMES: Record<number, string> = {
  1:  "Je découvre",
  6:  "J'apprends",
  12: "Je maîtrise",
};

const PLAN_SUB: Record<number, string> = {
  1:  "Sans engagement, pour tester la plateforme",
  6:  "L'équilibre idéal pour vraiment progresser",
  12: "Pour ceux qui veulent aller loin",
};

const FAQ = [
  {
    q: "Je peux annuler quand je veux ?",
    a: "Oui, à tout moment depuis votre espace membre. Aucun frais, aucune question. L'accès reste actif jusqu'à la fin de la période payée.",
  },
  {
    q: "Le paiement est sécurisé ?",
    a: "Oui. On utilise Stripe, la même technologie que Shopify ou Amazon. Vos coordonnées bancaires ne nous sont jamais transmises.",
  },
  {
    q: "Est-ce que j'ai accès à tout dès l'inscription ?",
    a: "Oui. L'accès est activé automatiquement dans les secondes qui suivent le paiement. Pas d'attente, pas de validation manuelle.",
  },
  {
    q: "C'est quoi la différence avec le plan gratuit ?",
    a: "Le plan gratuit donne accès à la première leçon de chaque formation et à un signal en lecture. Le premium débloque toutes les formations, les signaux complets, les analyses hebdomadaires et le support.",
  },
  {
    q: "Les signaux par email, ça marche comment ?",
    a: "Dès qu'un signal est validé par notre équipe, vous recevez un email avec le nom de l'actif, le prix d'entrée recommandé, l'objectif de sortie et le stop-loss. Vous n'avez pas besoin de surveiller la plateforme en permanence — on vous prévient. L'option est désactivable à tout moment depuis votre espace membre.",
  },
];

const INCLUDED = [
  "Toutes les formations premium",
  "Signaux de trading avec détail complet",
  "Analyses de marché hebdomadaires",
  "Dashboard membre personnel",
  "Watchlist personnalisée",
  "Support réactif par email",
];

const SIGNAL_ADDON_PRICE = 5;

export function PricingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [withSignals, setWithSignals] = useState(false);

  const monthly = pricing.find((p) => p.durationMonths === 1)!;
  const semi = pricing.find((p) => p.durationMonths === 6)!;
  const annual = pricing.find((p) => p.durationMonths === 12)!;

  const savingsSemi = Math.round((1 - semi.baseMonthly / monthly.baseMonthly) * 100);
  const savingsAnnual = Math.round((1 - annual.baseMonthly / monthly.baseMonthly) * 100);

  return (
    <main>
      {/* Hero */}
      <section className="px-4 pt-16 pb-10 md:px-8 md:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Abonnements</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Commencez gratuitement.<br />
            <span className="text-muted">Payez seulement si ça vous aide.</span>
          </h1>
          <p className="mt-5 text-base leading-8 text-muted">
            La première leçon de chaque formation est gratuite. Si vous voulez continuer, un abonnement débloque tout — sans surprise.
          </p>
        </div>
      </section>

      {/* Option Signaux */}
      <section className="px-4 pb-4 md:px-8">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => setWithSignals((v) => !v)}
            className={cn(
              "group flex w-full items-start gap-4 rounded-2xl border-2 p-5 text-left transition",
              withSignals
                ? "border-blue bg-blue/5"
                : "border-line bg-white hover:border-blue/40"
            )}
          >
            {/* Toggle visuel */}
            <div className={cn(
              "mt-0.5 flex h-6 w-11 shrink-0 items-center rounded-full border-2 transition-colors",
              withSignals ? "border-blue bg-blue" : "border-line bg-cream"
            )}>
              <div className={cn(
                "h-4 w-4 rounded-full bg-white shadow transition-transform",
                withSignals ? "translate-x-[22px]" : "translate-x-0.5"
              )} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Bell className={cn("h-4 w-4 shrink-0", withSignals ? "text-blue" : "text-muted")} />
                <span className="text-sm font-bold text-ink">
                  Option Signaux par email
                </span>
                <span className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-bold",
                  withSignals ? "bg-blue text-white" : "bg-cream text-muted"
                )}>
                  +5 €/mois
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-muted">
                On vous envoie un email dès qu&apos;un signal est actif — avec le prix d&apos;entrée recommandé, l&apos;objectif et le stop. Vous n&apos;avez plus à surveiller le marché en permanence.
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
                <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email instantané à chaque signal</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" /> Entrée, objectif et stop inclus</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" /> Désactivable à tout moment</span>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="px-4 pb-12 md:px-8">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {[monthly, semi, annual].map((plan) => {
            const name = PLAN_NAMES[plan.durationMonths];
            const sub = PLAN_SUB[plan.durationMonths];
            const isPopular = plan.featured;
            const savings = plan.durationMonths === 6 ? savingsSemi : plan.durationMonths === 12 ? savingsAnnual : 0;
            const basePrice = plan.baseMonthly;
            const displayPrice = withSignals ? basePrice + SIGNAL_ADDON_PRICE : basePrice;
            const total = (displayPrice * plan.durationMonths).toFixed(0);

            return (
              <div
                key={plan.slug}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-white p-7 shadow-sm transition",
                  isPopular
                    ? "border-blue ring-2 ring-blue/20 shadow-md"
                    : "border-line"
                )}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-blue px-4 py-1 text-xs font-bold text-white shadow">
                      Le plus choisi
                    </span>
                  </div>
                )}

                {savings > 0 && (
                  <div className="mb-4 inline-flex self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    −{savings}% par rapport au mois
                  </div>
                )}

                <p className="text-sm font-semibold uppercase tracking-widest text-muted">
                  {plan.durationMonths === 1 ? "1 mois" : plan.durationMonths === 6 ? "6 mois" : "12 mois"}
                </p>
                <h2 className="mt-1 text-2xl font-bold text-ink">{name}</h2>
                <p className="mt-1 text-sm leading-6 text-muted">{sub}</p>

                <div className="mt-6">
                  <span className="text-5xl font-bold text-ink">
                    {displayPrice.toFixed(2).replace(".", ",")} €
                  </span>
                  <span className="ml-1 text-sm text-muted">/mois</span>
                </div>

                {withSignals && (
                  <p className="mt-1 text-xs text-blue font-medium">
                    dont 5 € pour les signaux email
                  </p>
                )}

                {plan.durationMonths > 1 && (
                  <p className="mt-1 text-xs text-muted">
                    Soit {total} € facturés en une fois pour {plan.durationMonths} mois
                  </p>
                )}

                <form action="/api/stripe/checkout" method="POST" className="mt-6">
                  <input type="hidden" name="plan" value={plan.slug} />
                  <input type="hidden" name="signals" value={String(withSignals)} />
                  <Button
                    type="submit"
                    className={cn(
                      "w-full justify-center",
                      isPopular ? "!bg-blue !text-white hover:!bg-blue/90" : ""
                    )}
                    variant={isPopular ? "accent" : "dark"}
                  >
                    Commencer
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>

                <ul className="mt-7 space-y-3">
                  {INCLUDED.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {feat}
                    </li>
                  ))}
                  {withSignals && (
                    <li className="flex items-start gap-2.5 rounded-lg bg-blue/5 px-3 py-2 text-sm text-blue">
                      <Bell className="mt-0.5 h-4 w-4 shrink-0" />
                      Signaux trading par email
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Trust bar */}
        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-6 text-sm text-muted">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Paiement sécurisé Stripe
          </span>
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue" />
            Accès immédiat après paiement
          </span>
          <span className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted" />
            Annulation sans frais
          </span>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="bg-ink px-4 py-16 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Ce que vous débloquez</p>
              <h2 className="mt-3 text-3xl font-semibold leading-snug text-white">
                Tout ce qu&apos;il vous faut<br />pour vraiment comprendre la crypto.
              </h2>
              <p className="mt-4 text-base leading-8 text-white/60">
                Un abonnement unique, pas de niveaux confus. Tous les plans Premium donnent accès à exactement la même chose — la différence, c&apos;est la durée (et le tarif qui va avec).
              </p>
            </div>

            <ul className="grid gap-3">
              {[
                { label: "Formations complètes", desc: "Du débutant à l'avancé, à votre rythme" },
                { label: "Signaux de trading", desc: "Avec entrée, objectif, stop et explication" },
                { label: "Analyses hebdomadaires", desc: "Ce qui se passe sur le marché, en clair" },
                { label: "Dashboard personnel", desc: "Votre progression et vos favoris" },
                { label: "Support par email", desc: "Une réponse sous 24h en semaine" },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-semibold text-ink">Questions fréquentes</h2>
          <ul className="mt-8 space-y-2">
            {FAQ.map((item, i) => (
              <li key={i} className="overflow-hidden rounded-xl border border-line bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-ink"
                >
                  {item.q}
                  {openFaq === i
                    ? <ChevronUp className="h-4 w-4 shrink-0 text-muted" />
                    : <ChevronDown className="h-4 w-4 shrink-0 text-muted" />
                  }
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm leading-7 text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-4 pb-20 md:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-line bg-cream px-8 py-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted">Pas encore convaincu ?</p>
          <h3 className="mt-3 text-2xl font-semibold text-ink">Commencez par le gratuit.</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Créez votre compte, accédez à la première leçon de chaque formation. Aucune carte bancaire requise.
          </p>
          <Button href="/register" variant="accent" className="mt-6">
            Créer un compte gratuit
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="px-4 pb-10 md:px-8">
        <div className="mx-auto max-w-5xl rounded-xl border border-amber-100 bg-amber-50 px-6 py-4 text-sm leading-7 text-amber-800">
          Les abonnements donnent accès à des contenus éducatifs. Ils ne constituent pas un conseil en investissement. Investir en cryptomonnaies comporte des risques de perte en capital.
        </div>
      </section>
    </main>
  );
}
