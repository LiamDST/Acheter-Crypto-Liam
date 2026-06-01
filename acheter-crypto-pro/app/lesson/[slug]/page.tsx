"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, Clock } from "lucide-react";
import Link from "next/link";
import { courses } from "@/data/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PremiumLockModal } from "@/components/ui/PremiumLockModal";

// Each course module becomes a lesson — slug format: [course-slug]-[module-index]
function resolveLesson(slug: string) {
  const parts = slug.split("-");
  const moduleIndex = parseInt(parts[parts.length - 1], 10);
  const courseSlug = parts.slice(0, -1).join("-");
  const course = courses.find((c) => c.slug === courseSlug);
  if (!course || isNaN(moduleIndex) || moduleIndex < 0 || moduleIndex >= course.modules.length) return null;
  return { course, moduleIndex, moduleName: course.modules[moduleIndex] };
}

const LESSON_CONTENT: Record<string, string[]> = {
  default: [
    "Cette leçon couvre les concepts fondamentaux du module.",
    "Vous apprendrez à analyser les données de marché avec méthode, à éviter les biais courants et à prendre des décisions informées.",
    "Chaque concept est illustré par des exemples concrets tirés des marchés crypto actuels.",
  ],
};

export default function LessonPage({ params }: { params: { slug: string } }) {
  const [showModal, setShowModal] = useState(false);
  const lesson = resolveLesson(params.slug);

  if (!lesson) {
    return (
      <main className="premium-container py-16 text-center">
        <p className="text-muted">Leçon introuvable.</p>
        <Button href="/formations" variant="light" className="mt-6">Retour aux formations</Button>
      </main>
    );
  }

  const { course, moduleIndex, moduleName } = lesson;
  const isFree = moduleIndex === 0 || !course.premium;
  const prevSlug = moduleIndex > 0 ? `${course.slug}-${moduleIndex - 1}` : null;
  const nextSlug = moduleIndex < course.modules.length - 1 ? `${course.slug}-${moduleIndex + 1}` : null;

  return (
    <main className="premium-container py-12">
      {showModal && <PremiumLockModal onClose={() => setShowModal(false)} />}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted" aria-label="Fil d'Ariane">
        <Link href="/formations" className="hover:text-ink">Formations</Link>
        <span>/</span>
        <Link href={`/formations/${course.slug}`} className="hover:text-ink">{course.title}</Link>
        <span>/</span>
        <span className="text-ink">{moduleName}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px]">
        <section>
          <Badge tone={isFree ? "success" : "premium"} icon={isFree ? Check : BookOpen}>
            {isFree ? "Leçon gratuite" : "Leçon premium"}
          </Badge>
          <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">{moduleName}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted">
            <Clock className="h-4 w-4" />
            <span>15 min · Module {moduleIndex + 1} / {course.modules.length}</span>
          </div>

          {isFree ? (
            <Card className="mt-8 prose prose-sm max-w-none">
              <div className="grid gap-4">
                {(LESSON_CONTENT[moduleName] ?? LESSON_CONTENT.default).map((para, i) => (
                  <p key={i} className="text-sm leading-7 text-muted">{para}</p>
                ))}
              </div>
              <div className="mt-8 rounded-xl border border-line bg-cream p-6">
                <p className="text-sm font-semibold">Point clé à retenir</p>
                <p className="mt-2 text-sm text-muted">La compréhension des fondamentaux est la base de toute prise de décision éclairée sur les marchés crypto.</p>
              </div>
            </Card>
          ) : (
            <Card className="mt-8">
              <div className="select-none blur-sm">
                {LESSON_CONTENT.default.map((para, i) => (
                  <p key={i} className="text-sm leading-7 text-muted">{para}</p>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="accent" onClick={() => setShowModal(true)}>Débloquer cette leçon</Button>
              </div>
            </Card>
          )}

          {/* Navigation prev/next */}
          <div className="mt-8 flex items-center justify-between gap-4">
            {prevSlug ? (
              <Button href={`/lesson/${prevSlug}`} variant="light"><ArrowLeft className="h-4 w-4" /> Leçon précédente</Button>
            ) : <div />}
            {nextSlug ? (
              isFree ? (
                <Button href={`/lesson/${nextSlug}`} variant="light">Leçon suivante <ArrowRight className="h-4 w-4" /></Button>
              ) : (
                <Button variant="light" onClick={() => setShowModal(true)}>Leçon suivante <ArrowRight className="h-4 w-4" /></Button>
              )
            ) : null}
          </div>
        </section>

        {/* Sidebar sommaire */}
        <aside className="h-fit lg:sticky lg:top-24">
          <Card>
            <h2 className="text-sm font-semibold">Sommaire</h2>
            <div className="mt-4 grid gap-1">
              {course.modules.map((mod, i) => (
                <div key={mod} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${i === moduleIndex ? "bg-blue/10 font-semibold text-blue" : "text-muted hover:bg-cream"}`}>
                  {i < moduleIndex ? <Check className="h-3 w-3 flex-shrink-0 text-emerald-500" /> : <span className="h-3 w-3 flex-shrink-0 rounded-full border border-line" />}
                  <span className="truncate">{mod}</span>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </main>
  );
}
