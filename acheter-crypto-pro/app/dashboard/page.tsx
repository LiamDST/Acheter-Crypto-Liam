"use client";
import { useMemo, useState } from "react";
import { ArrowRight, Bell, BookOpen, Crown, FileText, ShieldCheck, UserRound } from "lucide-react";
import { AnimatedCryptoBackground } from "@/components/backgrounds/AnimatedCryptoBackground";
import { MarketTrendPanel } from "@/components/market/MarketTrendPanel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { analyses, courses, signals } from "@/data/site";
import { cn } from "@/lib/utils";

const watchlist = [
  { asset: "BTC", allocation: 42, alert: "Résistance 70 900 €" },
  { asset: "ETH", allocation: 28, alert: "Support 3 040 €" },
  { asset: "SOL", allocation: 18, alert: "Zone risque élevé" },
  { asset: "LINK", allocation: 12, alert: "Breakout à surveiller" },
];

const routine = [
  { label: "Lire l’analyse du jour", href: "/analyses" },
  { label: "Vérifier les signaux actifs", href: "/signaux" },
  { label: "Reprendre la formation en cours", href: "/formations" },
];

export default function DashboardPage() {
  const firstName = "Alex";
  const [activeAsset, setActiveAsset] = useState("BTC");
  const current = watchlist.find((item) => item.asset === activeAsset) || watchlist[0];

  const featuredCourse = useMemo(() => {
    const inProgress = courses
      .filter((course) => course.progress > 0 && course.progress < 100)
      .sort((a, b) => b.progress - a.progress);
    return inProgress[0] || courses[0];
  }, []);

  const activeSignals = useMemo(
    () => signals.filter((signal) => signal.status === "Actif"),
    []
  );
  const avgConfidence = useMemo(() => {
    if (!activeSignals.length) return 0;
    return Math.round(
      activeSignals.reduce((total, signal) => total + signal.confidence, 0) /
        activeSignals.length
    );
  }, [activeSignals]);

  const avgCourseProgress = useMemo(
    () => Math.round(courses.reduce((total, course) => total + course.progress, 0) / courses.length),
    []
  );

  const linkedAnalyses = useMemo(
    () => analyses.filter((analysis) => analysis.tag === activeAsset || analysis.tag === "ALT").slice(0, 3),
    [activeAsset]
  );

  const linkedSignals = useMemo(
    () => signals.filter((signal) => signal.asset === activeAsset || signal.status === "Actif").slice(0, 3),
    [activeAsset]
  );

  return (
    <main className="relative page-section">
      <AnimatedCryptoBackground variant="dashboard" intensity="low" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge tone="success" icon={Crown}>
              Premium actif
            </Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">
              Bonjour {firstName}, voici votre espace membre.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Tout est organisé pour aller droit au but: votre progression, vos signaux,
              vos analyses et les actions à faire maintenant.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="light">
              <UserRound className="h-4 w-4" />
              Mon profil
            </Button>
            <Button href={`/formations/${featuredCourse.slug}`}>
              Reprendre
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card hover={false}>
            <p className="text-sm text-muted">Progression moyenne</p>
            <p className="mt-2 text-3xl font-semibold">{avgCourseProgress}%</p>
            <ProgressBar value={avgCourseProgress} className="mt-4" />
          </Card>
          <Card hover={false}>
            <p className="text-sm text-muted">Signaux actifs</p>
            <p className="mt-2 text-3xl font-semibold">{activeSignals.length}</p>
            <p className="mt-2 text-xs text-muted">Repères opérationnels en cours</p>
          </Card>
          <Card hover={false}>
            <p className="text-sm text-muted">Confiance moyenne</p>
            <p className="mt-2 text-3xl font-semibold">{avgConfidence}%</p>
            <p className="mt-2 text-xs text-muted">Sur vos signaux actifs</p>
          </Card>
          <Card hover={false}>
            <p className="text-sm text-muted">Niveau membre</p>
            <p className="mt-2 text-3xl font-semibold">Premium</p>
            <p className="mt-2 text-xs text-muted">Accès complet formations + analyses</p>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <MarketTrendPanel
            symbols={["BTC", "ETH", "SOL", "LINK"]}
            defaultSymbol={activeAsset}
            title="Contexte marché favori"
            subtitle="Données temps réel CoinGecko pour valider rapidement votre contexte."
          />

          <Card hover={false}>
            <Badge tone="success" icon={BookOpen}>
              Formation en cours
            </Badge>
            <h2 className="mt-4 text-2xl font-semibold">{featuredCourse.title}</h2>
            <p className="mt-1 text-sm text-muted">
              {featuredCourse.lessons} leçons · {featuredCourse.duration}
            </p>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm">
                <span>Progression</span>
                <strong>{featuredCourse.progress}%</strong>
              </div>
              <ProgressBar value={featuredCourse.progress} />
            </div>
            <p className="mt-4 text-sm text-muted">
              Continuez à votre rythme. Le prochain module est déjà prêt.
            </p>
            <Button href={`/formations/${featuredCourse.slug}`} className="mt-5" variant="light">
              Reprendre la leçon
            </Button>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Card hover={false}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Routine du jour</h2>
              <Badge tone="success">{routine.length} actions</Badge>
            </div>
            <div className="grid gap-3">
              {routine.map((item, index) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg border border-line bg-cream p-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-blue text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  <Button href={item.href} variant="ghost" className="px-2 py-1 text-xs">
                    Ouvrir
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card hover={false}>
            <h2 className="text-2xl font-semibold">Favoris et allocation</h2>
            <p className="mt-2 text-sm text-muted">{current.alert}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {watchlist.map((item) => (
                <button
                  key={item.asset}
                  onClick={() => setActiveAsset(item.asset)}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-semibold",
                    activeAsset === item.asset
                      ? "border-blue bg-blue text-white"
                      : "border-line bg-white hover:bg-cream"
                  )}
                >
                  {item.asset}
                </button>
              ))}
            </div>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm">
                <span>Allocation</span>
                <strong>{current.allocation}%</strong>
              </div>
              <ProgressBar value={current.allocation} />
            </div>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Card hover={false}>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <h3 className="text-xl font-semibold">Signaux liés à {activeAsset}</h3>
            </div>
            <div className="mt-4 grid gap-3">
              {linkedSignals.map((signal) => (
                <div key={signal.id} className="rounded-lg border border-line bg-cream p-3 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <strong>
                      {signal.asset} · {signal.direction}
                    </strong>
                    <Badge
                      tone={
                        signal.status === "Actif"
                          ? "success"
                          : signal.status === "Clôturé"
                            ? "neutral"
                            : "warning"
                      }
                    >
                      {signal.status}
                    </Badge>
                  </div>
                  <p className="mt-2 text-muted">
                    Entrée {signal.entry} · Objectif {signal.target} · Stop {signal.stop}
                  </p>
                </div>
              ))}
            </div>
            <Button href="/signaux" className="mt-4" variant="light">
              Voir tous les signaux
            </Button>
          </Card>

          <Card hover={false}>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <h3 className="text-xl font-semibold">Analyses liées à {activeAsset}</h3>
            </div>
            <div className="mt-4 grid gap-3">
              {linkedAnalyses.map((analysis) => (
                <div key={analysis.slug} className="rounded-lg border border-line bg-cream p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <strong>{analysis.tag}</strong>
                    <span className="text-xs text-muted">{analysis.readTime}</span>
                  </div>
                  <p className="mt-1 font-medium">{analysis.title}</p>
                  <p className="mt-1 text-muted">{analysis.summary}</p>
                </div>
              ))}
            </div>
            <Button href="/analyses" className="mt-4" variant="light">
              Voir toutes les analyses
            </Button>
          </Card>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Card hover={false}>
            <ShieldCheck className="h-5 w-5" />
            <h4 className="mt-3 font-semibold">Compte sécurisé</h4>
            <p className="mt-1 text-sm text-muted">
              Vos accès membre sont protégés et contrôlés.
            </p>
          </Card>
          <Card hover={false}>
            <Crown className="h-5 w-5" />
            <h4 className="mt-3 font-semibold">Abonnement actif</h4>
            <p className="mt-1 text-sm text-muted">
              Votre formule premium est active et opérationnelle.
            </p>
          </Card>
          <Card hover={false}>
            <UserRound className="h-5 w-5" />
            <h4 className="mt-3 font-semibold">Support membre</h4>
            <p className="mt-1 text-sm text-muted">
              Besoin d’aide ? Vos demandes sont traitées en priorité.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
