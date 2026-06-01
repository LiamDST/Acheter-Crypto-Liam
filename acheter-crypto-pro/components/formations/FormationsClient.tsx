"use client";
import { useState, useMemo } from "react";
import { ArrowRight, BookOpen, Clock, Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { courses } from "@/data/site";
import { cn } from "@/lib/utils";

const LEVEL_TABS = ["Tous", "Débutant", "Intermédiaire", "Avancé"] as const;
const ACCESS_TABS = ["Tous", "Gratuit", "Premium"] as const;

const LEVEL_COLOR: Record<string, string> = {
  Débutant:      "bg-emerald-500",
  Intermédiaire: "bg-blue",
  Avancé:        "bg-violet-500",
};

const CATEGORY_GRADIENT: Record<string, string> = {
  Fondamentaux: "from-emerald-50 to-white",
  Trading:      "from-blue/5 to-white",
  Investissement:"from-amber-50 to-white",
  Marché:       "from-violet-50 to-white",
};

export function FormationsClient() {
  const [level, setLevel] = useState<(typeof LEVEL_TABS)[number]>("Tous");
  const [access, setAccess] = useState<(typeof ACCESS_TABS)[number]>("Tous");

  const filtered = useMemo(
    () =>
      courses.filter((c) => {
        const okLevel  = level  === "Tous" || c.level  === level;
        const okAccess = access === "Tous" || (access === "Premium" ? c.premium : !c.premium);
        return okLevel && okAccess;
      }),
    [level, access]
  );

  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);
  const globalProgress = Math.round(
    courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
  );

  return (
    <main>
      {/* ── Hero ── */}
      <section className="px-4 pt-16 pb-10 md:px-8 md:pt-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Formations</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink md:text-6xl">
            Apprenez à votre rythme.<br />
            <span className="text-muted">Pas sous pression.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted">
            Des parcours structurés du débutant à l&apos;avancé. Chaque formation commence par les fondamentaux et va aussi loin que vous le voulez.
          </p>

          {/* Barre de progression globale */}
          {globalProgress > 0 && (
            <div className="mt-8 inline-flex w-full max-w-sm flex-col gap-2 rounded-xl border border-line bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-ink">Ma progression</span>
                <span className="font-bold text-ink">{globalProgress}%</span>
              </div>
              <ProgressBar value={globalProgress} />
              <p className="text-xs text-muted">
                {inProgress.length} formation{inProgress.length > 1 ? "s" : ""} en cours
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Filtres ── */}
      <section className="sticky top-[65px] z-30 border-b border-line bg-surface/90 px-4 py-3 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          {/* Niveau */}
          <div className="flex gap-1.5">
            {LEVEL_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setLevel(tab)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-semibold transition",
                  level === tab
                    ? "bg-ink text-white"
                    : "text-muted hover:bg-cream hover:text-ink"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Accès */}
          <div className="flex gap-1.5">
            {ACCESS_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setAccess(tab)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-semibold transition",
                  access === tab
                    ? "border-blue bg-blue text-white"
                    : "border-line bg-white text-muted hover:bg-cream"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grille ── */}
      <section className="px-4 py-10 md:px-8">
        <div className="mx-auto max-w-5xl">
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-muted">Aucune formation pour ces filtres.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {filtered.map((course, i) => (
                <motion.article
                  key={course.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-gradient-to-b shadow-sm transition hover:shadow-md",
                    CATEGORY_GRADIENT[course.category] ?? "from-white to-white"
                  )}
                >
                  {/* Barre niveau colorée */}
                  <div className={cn("h-1 w-full", LEVEL_COLOR[course.level] ?? "bg-line")} />

                  <div className="flex flex-1 flex-col p-6">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={course.premium ? "premium" : "success"} icon={course.premium ? Lock : Sparkles}>
                        {course.premium ? "Premium" : "Gratuit"}
                      </Badge>
                      <span className="text-xs font-medium text-muted">{course.level}</span>
                      <span className="text-xs text-muted/60">·</span>
                      <span className="text-xs font-medium text-muted">{course.category}</span>
                    </div>

                    {/* Titre & description */}
                    <h2 className="mt-4 text-xl font-semibold leading-snug text-ink">
                      {course.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-7 text-muted">
                      {course.description}
                    </p>

                    {/* Modules preview */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {course.modules.slice(0, 4).map((mod) => (
                        <span
                          key={mod}
                          className="rounded-md bg-white/80 px-2.5 py-1 text-xs font-medium text-ink shadow-sm ring-1 ring-line"
                        >
                          {mod}
                        </span>
                      ))}
                      {course.modules.length > 4 && (
                        <span className="px-2.5 py-1 text-xs text-muted">
                          +{course.modules.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="mt-5 flex items-center gap-5 text-sm text-muted">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" />
                        {course.lessons} leçons
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </span>
                    </div>

                    {/* Progression si démarrée */}
                    {course.progress > 0 && (
                      <div className="mt-4">
                        <div className="mb-1.5 flex justify-between text-xs text-muted">
                          <span>Progression</span>
                          <strong className="text-ink">{course.progress}%</strong>
                        </div>
                        <ProgressBar value={course.progress} />
                      </div>
                    )}

                    {/* CTA */}
                    <Button
                      href={`/formations/${course.slug}`}
                      variant={course.premium ? "dark" : "accent"}
                      className="mt-6 w-full justify-center"
                    >
                      {course.progress > 0 ? "Continuer" : "Commencer"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Note de bas de page ── */}
      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-5xl rounded-xl border border-amber-100 bg-amber-50 px-6 py-4 text-sm leading-7 text-amber-800">
          Ces formations sont à visée pédagogique. Elles ne constituent pas un conseil en investissement. Investir en crypto comporte des risques de perte en capital.
        </div>
      </section>
    </main>
  );
}
