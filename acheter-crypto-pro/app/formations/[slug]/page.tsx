"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Download, Lock, Play, Star } from "lucide-react";
import { courses } from "@/data/site";
import { AnimatedCryptoBackground } from "@/components/backgrounds/AnimatedCryptoBackground";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PremiumLockModal } from "@/components/ui/PremiumLockModal";

type Props = { params: { slug: string } };

export default function CourseDetailPage({ params }: Props) {
  const [showModal, setShowModal] = useState(false);
  const course = courses.find((item) => item.slug === params.slug);
  if (!course) return notFound();

  function handleModuleClick(index: number) {
    if (index > 0 && course!.premium) {
      setShowModal(true);
    }
  }

  return (
    <main className="relative page-section">
      {showModal && <PremiumLockModal onClose={() => setShowModal(false)} />}
      <AnimatedCryptoBackground variant="page" intensity="low" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
        <section>
          <Badge tone={course.premium ? "premium" : "success"} icon={course.premium ? Lock : Check}>
            {course.premium ? "Formation premium" : "Formation gratuite"}
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">{course.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{course.description}</p>
          <Card className="mt-8 overflow-hidden p-0">
            <div className="grid min-h-[360px] place-items-center bg-cream">
              <div className="text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-lg bg-blue text-white"><Play className="h-8 w-8" /></div>
                <p className="mt-5 text-xl font-semibold">Player vidéo premium</p>
                <p className="mt-2 text-sm text-muted">Résumé, chapitre, notes et quiz intégrés.</p>
              </div>
            </div>
          </Card>
          <Card className="mt-6">
            <h2 className="text-2xl font-semibold">Modules du parcours</h2>
            <div className="mt-6 grid gap-3">
              {course.modules.map((module, index) => {
                const isLocked = index > 0 && course.premium;
                return (
                  <button
                    key={module}
                    onClick={() => handleModuleClick(index)}
                    className="flex w-full items-center gap-3 rounded-lg border border-line bg-cream p-4 text-left transition-colors hover:bg-white"
                  >
                    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-md bg-blue text-xs font-bold text-white">{index + 1}</span>
                    <span className="flex-1 font-medium">{module}</span>
                    {isLocked ? (
                      <Lock className="ml-auto h-4 w-4 flex-shrink-0 text-muted" />
                    ) : (
                      <Badge className="ml-auto">{index < 2 ? "Terminé" : "À faire"}</Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
        </section>
        <aside className="h-fit lg:sticky lg:top-24">
          <Card>
            <Badge tone="premium" icon={Star}>{course.tag}</Badge>
            <h2 className="mt-5 text-2xl font-semibold">Votre progression</h2>
            <p className="mt-2 text-sm text-muted">{course.lessons} leçons · {course.duration}</p>
            <div className="mt-6">
              <ProgressBar value={course.progress} />
              <p className="mt-2 text-sm font-semibold">{course.progress}% complété</p>
            </div>
            <Button href={`/lesson/${course.slug}-0`} className="mt-6 w-full">Continuer <ArrowRight className="h-4 w-4" /></Button>
            <Button variant="light" className="mt-3 w-full"><Download className="h-4 w-4" /> Ressources PDF</Button>
          </Card>
        </aside>
      </div>
    </main>
  );
}
