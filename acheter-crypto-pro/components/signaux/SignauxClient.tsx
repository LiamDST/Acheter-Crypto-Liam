"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BookOpen, Check,
  ChevronRight, Lock, ShieldCheck, Target,
  TrendingDown, TrendingUp, X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { signals } from "@/data/site";
import { cn } from "@/lib/utils";

const IS_AUTHENTICATED = false;

const ASSET_FILTERS = ["Tous", "BTC", "ETH", "SOL", "LINK"] as const;

const STATUS_STYLE: Record<string, string> = {
  Actif:        "bg-emerald-50 text-emerald-700 border-emerald-200",
  Surveillance: "bg-amber-50 text-amber-700 border-amber-200",
  Clôturé:      "bg-zinc-100 text-zinc-500 border-zinc-200",
};
const RISK_STYLE: Record<string, string> = {
  Faible: "bg-emerald-50 text-emerald-700",
  Modéré: "bg-amber-50 text-amber-700",
  Élevé:  "bg-red-50 text-red-700",
};

type Signal = (typeof signals)[number] & { premium?: boolean };

/* ─────────────────────────────────────────────────────────
   Diagram vertical de niveaux de prix
───────────────────────────────────────────────────────── */
function PriceDiagram({ signal }: { signal: Signal }) {
  const isLong = signal.direction === "Long";

  // Zone verte = gain potentiel, zone rouge = perte potentielle
  // On représente 70 % de la barre pour la zone favorable, 30 % pour le stop
  return (
    <div className="flex items-center gap-4">
      {/* Barre verticale */}
      <div className="relative flex h-36 w-6 flex-shrink-0 flex-col overflow-hidden rounded-full">
        {isLong ? (
          <>
            <div className="flex-[7] bg-emerald-100" />
            <div className="h-0.5 w-full bg-ink/20" />
            <div className="flex-[3] bg-red-100" />
          </>
        ) : (
          <>
            <div className="flex-[3] bg-red-100" />
            <div className="h-0.5 w-full bg-ink/20" />
            <div className="flex-[7] bg-emerald-100" />
          </>
        )}
        {/* Trait d'entrée au milieu */}
        <div className="absolute top-[70%] h-1 w-full bg-ink/60" style={{ top: "70%" }} />
      </div>

      {/* Labels */}
      <div className="flex h-36 flex-col justify-between text-sm">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Objectif</p>
          <p className="mt-0.5 font-bold text-emerald-600">{signal.target}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Entrée</p>
          <p className="mt-0.5 font-bold text-ink">{signal.entry}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-red-600">Stop</p>
          <p className="mt-0.5 font-bold text-red-600">{signal.stop}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Modal de détail
───────────────────────────────────────────────────────── */
function DetailModal({ signal, onClose }: { signal: Signal; onClose: () => void }) {
  const isLong = signal.direction === "Long";

  // Fermer sur Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const CHECKLIST = [
    "Vérifier le contexte global du marché avant d'entrer",
    "Définir précisément la taille de sa position à l'avance",
    "Ne pas déplacer le stop une fois en position",
    "Ne pas investir plus que ce qu'on accepte de perdre",
  ];

  const GLOSSARY = [
    { term: "Entrée", def: "Le prix auquel prendre position. Entrer trop loin de ce niveau change le R/R." },
    { term: "Objectif", def: "Le prix cible de prise de profit. Ce n'est pas une garantie, c'est un repère." },
    { term: "Stop", def: "Le niveau qui invalide l'idée de trade. Sortir ici limite la perte au montant prévu." },
    { term: `R/R ${signal.rr}`, def: `Pour 1€ risqué, le potentiel de gain est de ${signal.rr}€. Un R/R > 2 est généralement considéré acceptable.` },
    { term: "Confiance", def: "Score interne basé sur la confluence d'indicateurs techniques. Ne constitue pas une prédiction." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 px-4 pb-4 backdrop-blur-sm sm:items-center sm:pb-0"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: "spring", damping: 28, stiffness: 340 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className={cn(
          "flex items-center justify-between px-6 py-5",
          isLong ? "border-l-4 border-l-emerald-500" : "border-l-4 border-l-red-500"
        )}>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold tracking-tight text-ink">{signal.asset}</span>
            <span className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold",
              isLong ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            )}>
              {isLong ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {signal.direction}
            </span>
            <span className={cn("rounded-md border px-2 py-0.5 text-xs font-medium", STATUS_STYLE[signal.status])}>
              {signal.status}
            </span>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-muted transition hover:bg-cream">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="max-h-[75vh] overflow-y-auto px-6 pb-6">

          {/* Méta */}
          <p className="text-xs text-muted">{signal.horizon} · mis à jour {signal.update.toLowerCase()}</p>

          {/* Diagram + stats */}
          <div className="mt-5 grid gap-6 sm:grid-cols-[auto_1fr]">
            <PriceDiagram signal={signal} />

            <div className="flex flex-col gap-4">
              {/* Confiance */}
              <div className="rounded-xl border border-line bg-cream p-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted">Confiance</span>
                  <strong className="text-ink">{signal.confidence}%</strong>
                </div>
                <ProgressBar value={signal.confidence} />
              </div>

              {/* Métriques */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-line bg-cream p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">R/R</p>
                  <p className="mt-1 text-lg font-bold text-ink">{signal.rr}</p>
                </div>
                <div className="rounded-xl border border-line bg-cream p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Risque</p>
                  <p className={cn("mt-1 text-sm font-bold", RISK_STYLE[signal.risk]?.includes("emerald") ? "text-emerald-700" : signal.risk === "Modéré" ? "text-amber-700" : "text-red-700")}>{signal.risk}</p>
                </div>
                <div className="rounded-xl border border-line bg-cream p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Horizon</p>
                  <p className="mt-1 text-sm font-bold text-ink">{signal.horizon}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lexique */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Comprendre ce signal</p>
            <div className="grid gap-2">
              {GLOSSARY.map(({ term, def }) => (
                <div key={term} className="flex gap-3 rounded-xl bg-cream p-3">
                  <span className="mt-0.5 min-w-[72px] text-xs font-bold text-ink">{term}</span>
                  <span className="text-xs leading-5 text-muted">{def}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Avant d&apos;agir</p>
            <div className="grid gap-2">
              {CHECKLIST.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-line bg-white p-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span className="text-sm text-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-800">
            Ce signal est fourni à des fins pédagogiques. Il ne constitue pas un conseil en investissement.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Carte signal
───────────────────────────────────────────────────────── */
function SignalCard({ signal, onSelect }: { signal: Signal; onSelect: () => void }) {
  const isLong   = signal.direction === "Long";
  const isLocked = !!(signal as { premium?: boolean }).premium && !IS_AUTHENTICATED;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="relative"
    >
      <div className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-md",
        isLong ? "border-l-[3px] border-l-emerald-500" : "border-l-[3px] border-l-red-500"
      )}>
        {/* Overlay Premium */}
        {isLocked && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/75 backdrop-blur-[6px]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink">
              <Lock className="h-4 w-4 text-white" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-ink">Signal Premium</p>
              <p className="mt-0.5 text-xs text-muted">Accessible avec un abonnement</p>
            </div>
            <Button href="/pricing" variant="accent" className="gap-1.5 text-xs px-4 py-2 h-auto">
              Voir les offres <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}

        <div className={cn("p-5", isLocked && "blur-[3px] select-none")}>
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-2xl font-bold tracking-tight text-ink">{signal.asset}</p>
              <p className="mt-0.5 text-xs text-muted">{signal.horizon} · {signal.update.toLowerCase()}</p>
            </div>
            <span className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold",
              isLong ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            )}>
              {isLong ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {signal.direction}
            </span>
          </div>

          {/* Chiffres clés */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "Entrée",   value: signal.entry,  color: "text-ink" },
              { label: "Objectif", value: signal.target, color: "text-emerald-600" },
              { label: "Stop",     value: signal.stop,   color: "text-red-600" },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p>
                <p className={cn("mt-1 text-base font-bold", color)}>{value}</p>
              </div>
            ))}
          </div>

          {/* Confiance */}
          <div className="mt-5">
            <div className="mb-1.5 flex justify-between text-xs">
              <span className="text-muted">Confiance</span>
              <span className="font-bold text-ink">{signal.confidence}%</span>
            </div>
            <ProgressBar value={signal.confidence} />
          </div>

          {/* Footer */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
            <span className={cn("rounded-md border px-2 py-0.5 text-xs font-medium", STATUS_STYLE[signal.status])}>
              {signal.status}
            </span>
            <span className={cn("rounded-md px-2 py-0.5 text-xs font-medium", RISK_STYLE[signal.risk])}>
              Risque {signal.risk}
            </span>
            <span className="ml-auto text-xs font-semibold text-ink">R/R {signal.rr}</span>
          </div>

          {/* Bouton détail */}
          {!isLocked && (
            <button
              onClick={onSelect}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-line bg-cream py-2 text-xs font-semibold text-ink transition hover:bg-white"
            >
              Voir le détail <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Section "Comment ça marche"
───────────────────────────────────────────────────────── */
function HowItWorks() {
  const items = [
    {
      icon: Target,
      title: "Qu'est-ce qu'un signal ?",
      body: "Un signal est une opportunité identifiée sur un actif. Il indique un prix d'entrée, un objectif de profit et un niveau de stop-loss. C'est un repère, pas une garantie.",
    },
    {
      icon: BookOpen,
      title: "Comment l'utiliser ?",
      body: "Lisez l'entrée, le stop et l'objectif. Calculez combien vous pouvez perdre si le stop est atteint et décidez si ce montant est acceptable avant d'agir. Ne modifiez jamais le stop après l'entrée.",
    },
    {
      icon: ShieldCheck,
      title: "Le ratio R/R, c'est quoi ?",
      body: "R/R = Risque/Récompense. Un R/R de 2 signifie que pour 1 € risqué, le potentiel de gain est 2 €. Un R/R > 2 est généralement considéré comme acceptable en trading.",
    },
  ];

  return (
    <section className="border-b border-line bg-cream/50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">Comment ça marche</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-ink">
                <Icon className="h-4 w-4 text-white" />
              </div>
              <p className="text-sm font-semibold text-ink">{title}</p>
              <p className="mt-2 text-xs leading-5 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Page principale
───────────────────────────────────────────────────────── */
export function SignauxClient() {
  const [asset, setAsset]           = useState<(typeof ASSET_FILTERS)[number]>("Tous");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (signals as Signal[]).filter((s) => asset === "Tous" || s.asset === asset),
    [asset]
  );

  const selectedSignal = selectedId ? (signals as Signal[]).find((s) => s.id === selectedId) : null;
  const activeCount    = signals.filter((s) => s.status === "Actif").length;

  return (
    <main>
      {/* Modal détail */}
      <AnimatePresence>
        {selectedSignal && (
          <DetailModal signal={selectedSignal} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="px-4 pt-16 pb-10 md:px-8 md:pt-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Signaux</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink md:text-6xl">
            Des signaux clairs.<br />
            <span className="text-muted">Pas de bruit.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted">
            Chaque signal affiche l&apos;entrée, l&apos;objectif, le stop et le niveau de risque. Cliquez sur un signal pour voir l&apos;analyse complète.
          </p>

          <div className="mt-7 flex flex-wrap gap-5 text-sm">
            <span className="flex items-center gap-2 font-medium text-ink">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              {activeCount} signal{activeCount > 1 ? "s" : ""} actif{activeCount > 1 ? "s" : ""}
            </span>
            <span className="text-muted">Données pédagogiques · pas de conseil financier</span>
          </div>

          {!IS_AUTHENTICATED && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue/20 bg-blue/5 px-5 py-3">
              <p className="text-sm text-muted">
                <strong className="text-ink">Accès complet</strong> — débloquez les signaux premium avec un abonnement.
              </p>
              <Button href="/pricing" variant="accent" className="text-xs">
                Voir les offres <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Explainer ── */}
      <HowItWorks />

      {/* ── Filtres sticky ── */}
      <div className="sticky top-[65px] z-30 border-b border-line bg-surface/90 px-4 py-3 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-5xl gap-1.5">
          {ASSET_FILTERS.map((tab) => (
            <button
              key={tab}
              onClick={() => setAsset(tab)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-semibold transition",
                asset === tab ? "bg-ink text-white" : "text-muted hover:bg-cream hover:text-ink"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grille ── */}
      <section className="px-4 py-10 md:px-8">
        <div className="mx-auto max-w-5xl">
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-muted">Aucun signal pour ce filtre.</p>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid gap-5 sm:grid-cols-2">
                {filtered.map((signal) => (
                  <SignalCard
                    key={signal.id}
                    signal={signal}
                    onSelect={() => setSelectedId(signal.id)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-5xl rounded-xl border border-amber-100 bg-amber-50 px-6 py-4 text-sm leading-7 text-amber-800">
          Les signaux sont fournis à des fins pédagogiques uniquement. Ils ne constituent pas un conseil financier et ne garantissent aucun résultat.
        </div>
      </section>
    </main>
  );
}
