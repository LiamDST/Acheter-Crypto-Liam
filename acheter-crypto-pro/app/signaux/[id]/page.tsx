import { notFound } from "next/navigation";
import { Bell, Check, ShieldAlert, Star } from "lucide-react";
import { signals } from "@/data/site";
import { TradingBarsBackground } from "@/components/backgrounds/TradingBarsBackground";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MiniChart } from "@/components/ui/MiniChart";

type Props = { params: { id: string } };

export default function SignalDetailPage({ params }: Props) {
  const signal = signals.find((item) => item.id === params.id);
  if (!signal) return notFound();
  return (
    <main className="relative page-section">
      <TradingBarsBackground className="opacity-50" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
        <section>
          <Badge tone="premium" icon={Star}>{signal.asset} · {signal.horizon}</Badge>
          <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">Signal {signal.asset} {signal.direction}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">Fiche complète avec plan de trade, niveaux clés, ratio risk/reward, invalidation, historique des mises à jour et notification premium.</p>
          <Card className="mt-8"><MiniChart className="h-80 w-full" /></Card>
          <div className="mt-5 grid gap-5 md:grid-cols-3"><Card><p className="text-sm text-muted">Entrée</p><p className="mt-2 text-3xl font-semibold">{signal.entry}</p></Card><Card><p className="text-sm text-muted">Objectif</p><p className="mt-2 text-3xl font-semibold">{signal.target}</p></Card><Card><p className="text-sm text-muted">Stop loss</p><p className="mt-2 text-3xl font-semibold">{signal.stop}</p></Card></div>
          <Card className="mt-5"><h2 className="text-2xl font-semibold">Justification pédagogique</h2><p className="mt-4 leading-8 text-muted">Le scénario repose sur une zone de support défendue, un momentum qui se reconstruit et une invalidation claire sous le stop. L’objectif principal reste conditionné à une clôture propre au-dessus de la résistance locale.</p></Card>
        </section>
        <aside className="h-fit lg:sticky lg:top-24"><Card><Badge tone={signal.status === "Actif" ? "success" : "warning"}>{signal.status}</Badge><h2 className="mt-5 text-2xl font-semibold">Confiance</h2><div className="mt-4"><ProgressBar value={signal.confidence} /><p className="mt-2 text-sm font-semibold">{signal.confidence}%</p></div><div className="mt-6 grid gap-3 text-sm"><div className="flex items-center justify-between rounded-2xl bg-cream p-4"><span>Risque</span><strong>{signal.risk}</strong></div><div className="flex items-center justify-between rounded-2xl bg-cream p-4"><span>Risk/reward</span><strong>{signal.rr}</strong></div><div className="flex items-center justify-between rounded-2xl bg-cream p-4"><span>Update</span><strong>{signal.update}</strong></div></div><Button className="mt-6 w-full"><Bell className="h-4 w-4" /> Me notifier</Button><Button variant="light" className="mt-3 w-full"><ShieldAlert className="h-4 w-4" /> Voir l’invalidation</Button></Card></aside>
      </div>
    </main>
  );
}
