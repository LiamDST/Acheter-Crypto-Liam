import { notFound } from "next/navigation";
import { Bookmark, Headphones, Lock, Share2 } from "lucide-react";
import { analyses } from "@/data/site";
import { AnimatedCryptoBackground } from "@/components/backgrounds/AnimatedCryptoBackground";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MiniChart } from "@/components/ui/MiniChart";

type Props = { params: { slug: string } };

export default function AnalysisDetailPage({ params }: Props) {
  const analysis = analyses.find((item) => item.slug === params.slug);
  if (!analysis) return notFound();
  return (
    <main className="relative page-section">
      <AnimatedCryptoBackground variant="page" intensity="low" />
      <article className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_320px]">
        <section>
          <Badge tone="premium">{analysis.tag} · {analysis.horizon}</Badge>
          <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">{analysis.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{analysis.summary}</p>
          <Card className="mt-8"><MiniChart className="h-80 w-full" /></Card>
          <Card className="mt-6"><h2 className="text-2xl font-semibold">Résumé exécutif</h2><p className="mt-4 leading-8 text-muted">Le marché reste constructif tant que les niveaux de support sont défendus. La priorité est d’observer la réaction sur résistance, la qualité du volume et la rotation vers les actifs secondaires.</p></Card>
          <div className="mt-6 grid gap-5 md:grid-cols-2"><Card><h3 className="text-xl font-semibold">Scénario haussier</h3><p className="mt-3 leading-7 text-muted">Clôture propre au-dessus de la résistance, retour du volume et continuation sur les objectifs techniques.</p></Card><Card><h3 className="text-xl font-semibold">Scénario baissier</h3><p className="mt-3 leading-7 text-muted">Perte du support local, hausse du risque macro et retour sous les moyennes courtes.</p></Card></div>
          {analysis.premium ? <Card className="mt-6 border-gold/25 bg-gold/10"><Lock className="h-6 w-6 text-gold" /><h3 className="mt-5 text-2xl font-semibold">Section premium verrouillée</h3><p className="mt-3 text-muted">Niveaux précis, plan d’exposition, invalidation, graphiques annotés et stratégie complète accessibles aux membres.</p><Button href="/pricing" className="mt-6">Débloquer l’analyse</Button></Card> : null}
        </section>
        <aside className="h-fit lg:sticky lg:top-24"><Card><h2 className="text-2xl font-semibold">Sommaire</h2><div className="mt-5 grid gap-3 text-sm text-muted"><span>Résumé exécutif</span><span>Niveaux clés</span><span>Scénarios</span><span>Plan premium</span></div><div className="mt-6 flex flex-col gap-3"><Button variant="light"><Headphones className="h-4 w-4" /> Écouter</Button><Button variant="light"><Bookmark className="h-4 w-4" /> Favori</Button><Button variant="light"><Share2 className="h-4 w-4" /> Partager</Button></div></Card></aside>
      </article>
    </main>
  );
}
