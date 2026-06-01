"use client";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, Clock, Lock, RefreshCw, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { analyses, signals } from "@/data/site";
import { MarketAsset, fetchMarketBySymbols, formatMarketCap, formatUsdPrice } from "@/lib/market-data";
import { cn } from "@/lib/utils";

const IS_AUTHENTICATED = false;

const trackedSymbols = ["BTC", "ETH", "SOL", "LINK"];

type Candle = { open: number; close: number; high: number; low: number; volume: number };

function buildCandles(series: number[], candleCount = 28): Candle[] {
  if (!series || series.length < 8) return [];
  const chunkSize = Math.max(2, Math.floor(series.length / candleCount));
  const candles: Candle[] = [];
  for (let i = 0; i < series.length; i += chunkSize) {
    const chunk = series.slice(i, i + chunkSize);
    if (chunk.length < 2) continue;
    const open = chunk[0];
    const close = chunk[chunk.length - 1];
    const high = Math.max(...chunk);
    const low = Math.min(...chunk);
    const volume = chunk.reduce((sum, value, idx) => {
      if (idx === 0) return sum;
      return sum + Math.abs(value - chunk[idx - 1]);
    }, 0);
    candles.push({ open, close, high, low, volume });
  }
  return candles;
}

function MiniChart({ data }: { data: number[] }) {
  const candles = buildCandles(data);
  if (!candles.length) return <div className="h-56 rounded-xl border border-line bg-cream animate-pulse" />;

  const width = 980;
  const height = 320;
  const chartTop = 16;
  const chartBottom = 230;
  const volumeTop = 248;
  const volumeBottom = 305;
  const chartLeft = 16;
  const chartRight = 900;
  const priceLabelX = 914;

  const highs = candles.map((c) => c.high);
  const lows  = candles.map((c) => c.low);
  const maxPrice = Math.max(...highs);
  const minPrice = Math.min(...lows);
  const priceRange = maxPrice - minPrice || 1;
  const maxVolume = Math.max(...candles.map((c) => c.volume)) || 1;
  const candleSpace = (chartRight - chartLeft) / candles.length;
  const bodyWidth = Math.max(4, candleSpace * 0.56);

  const priceY = (v: number) => chartBottom - ((v - minPrice) / priceRange) * (chartBottom - chartTop);
  const volumeY = (v: number) => volumeBottom - (v / maxVolume) * (volumeBottom - volumeTop);

  const last = candles[candles.length - 1];
  const lastPriceY = priceY(last.close);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full rounded-xl border border-line bg-white" role="img" aria-label="Graphique bougies">
      {[0, 0.25, 0.5, 0.75, 1].map((r) => (
        <line key={r} x1={chartLeft} y1={chartTop + r * (chartBottom - chartTop)} x2={chartRight} y2={chartTop + r * (chartBottom - chartTop)} stroke="#f0f2f5" strokeWidth="1" />
      ))}
      {candles.map((c, i) => {
        const x = chartLeft + i * candleSpace + candleSpace * 0.5;
        const openY = priceY(c.open);
        const closeY = priceY(c.close);
        const bull = c.close >= c.open;
        const color = bull ? "#16a34a" : "#dc2626";
        const bodyTop = Math.min(openY, closeY);
        const bodyH = Math.max(2, Math.abs(openY - closeY));
        return (
          <g key={i}>
            <line x1={x} y1={priceY(c.high)} x2={x} y2={priceY(c.low)} stroke={color} strokeWidth="1.5" />
            <rect x={x - bodyWidth / 2} y={bodyTop} width={bodyWidth} height={bodyH} fill={bull ? "#22c55e" : "#ef4444"} stroke={color} strokeWidth="1" />
            <rect key={`v-${i}`} x={x - bodyWidth / 2} y={volumeY(c.volume)} width={bodyWidth} height={Math.max(1, volumeBottom - volumeY(c.volume))} fill={bull ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"} />
          </g>
        );
      })}
      <line x1={chartLeft} y1={lastPriceY} x2={chartRight} y2={lastPriceY} stroke="#2563eb" strokeWidth="1" strokeDasharray="5 4" />
      <rect x={priceLabelX} y={lastPriceY - 11} width={62} height={22} rx={5} fill="#2563eb" />
      <text x={priceLabelX + 31} y={lastPriceY + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">{formatUsdPrice(last.close)}</text>
      <line x1={chartLeft} y1={volumeTop} x2={chartRight} y2={volumeTop} stroke="#e9edf3" strokeWidth="1" />
    </svg>
  );
}

export function AnalysesClient() {
  const [selectedSymbol, setSelectedSymbol] = useState("BTC");
  const [rows, setRows] = useState<MarketAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState("");

  async function loadMarket() {
    try {
      setRefreshing(true);
      const data = await fetchMarketBySymbols(trackedSymbols);
      setRows(data);
      setUpdatedAt(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement.");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMarket();
    const timer = setInterval(loadMarket, 60000);
    return () => clearInterval(timer);
  }, []);

  const selected = useMemo(
    () => rows.find((r) => r.symbol === selectedSymbol) ?? rows[0],
    [rows, selectedSymbol]
  );

  const change24hPositive = selected ? selected.change24h >= 0 : true;
  const change7dPositive = selected ? selected.change7d >= 0 : true;

  return (
    <main>
      {/* Hero */}
      <section className="px-4 pt-16 pb-10 md:px-8 md:pt-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Ressources</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink md:text-5xl">
            Suivre le marché<br />
            <span className="text-muted">sans s&apos;y perdre.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted">
            Les prix en direct, les grandes analyses de la semaine, et des repères pour comprendre ce qui se passe — même si vous débutez.
          </p>
        </div>
      </section>

      {/* Graphique live */}
      <section className="px-4 pb-10 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            {/* Header du bloc */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
              <div className="flex flex-wrap gap-2">
                {trackedSymbols.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => setSelectedSymbol(sym)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-sm font-semibold transition",
                      selectedSymbol === sym
                        ? "border-ink bg-ink text-white"
                        : "border-line bg-white text-muted hover:bg-cream"
                    )}
                  >
                    {sym}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {updatedAt && (
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    <Clock className="h-3.5 w-3.5" /> Mis à jour à {updatedAt}
                  </span>
                )}
                <button
                  onClick={loadMarket}
                  className={cn("flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-muted transition hover:bg-cream", refreshing && "opacity-60")}
                >
                  <RefreshCw className={cn("h-3.5 w-3.5", refreshing && "animate-spin")} />
                  Actualiser
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-[1fr_220px]">
              {/* Chart */}
              <div className="p-5">
                {loading && <div className="h-56 animate-pulse rounded-xl bg-cream" />}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      {error}
                    </div>
                  </div>
                )}
                {!loading && !error && selected && <MiniChart data={selected.sparkline} />}
              </div>

              {/* Métriques */}
              <div className="flex flex-col gap-3 border-t border-line p-5 md:border-t-0 md:border-l">
                <div>
                  <p className="text-2xl font-bold text-ink">{selected?.symbol ?? "—"}</p>
                  <p className="text-sm text-muted">{selected?.name ?? ""}</p>
                </div>

                <div className="rounded-xl bg-cream px-4 py-3">
                  <p className="text-xs text-muted">Prix actuel</p>
                  <p className="mt-1 text-xl font-bold text-ink">
                    {selected ? formatUsdPrice(selected.price) : "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-cream px-4 py-3">
                  <p className="text-xs text-muted">Hier (24h)</p>
                  <p className={cn("mt-1 flex items-center gap-1 text-base font-semibold", change24hPositive ? "text-emerald-600" : "text-red-600")}>
                    {change24hPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {selected ? `${change24hPositive ? "+" : ""}${selected.change24h.toFixed(2)}%` : "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-cream px-4 py-3">
                  <p className="text-xs text-muted">Cette semaine (7j)</p>
                  <p className={cn("mt-1 flex items-center gap-1 text-base font-semibold", change7dPositive ? "text-emerald-600" : "text-red-600")}>
                    {change7dPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {selected ? `${change7dPositive ? "+" : ""}${selected.change7d.toFixed(2)}%` : "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-cream px-4 py-3">
                  <p className="text-xs text-muted">Capitalisation</p>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {selected ? formatMarketCap(selected.marketCap) : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-muted">
            Ces données sont indicatives. Elles ne constituent pas un conseil en investissement.
          </p>
        </div>
      </section>

      {/* Analyses / Articles */}
      <section className="px-4 pb-10 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-ink">Analyses de la semaine</h2>
            {!IS_AUTHENTICATED && (
              <span className="text-sm text-muted">
                1 analyse gratuite · reste premium
              </span>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {analyses.map((article, i) => {
              const isLocked = article.premium && !IS_AUTHENTICATED;
              return (
                <div
                  key={article.slug}
                  className={cn(
                    "relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:shadow-md",
                    isLocked && "opacity-90"
                  )}
                >
                  {/* Top colour strip */}
                  <div className={cn(
                    "h-1 w-full",
                    article.tag === "BTC" ? "bg-amber-400" : article.tag === "ETH" ? "bg-blue" : "bg-violet-500"
                  )} />

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={article.premium ? "premium" : "success"}>
                        {article.premium ? "Premium" : "Gratuit"}
                      </Badge>
                      <span className="text-xs text-muted">{article.tag}</span>
                      <span className="text-xs text-muted/60">·</span>
                      <span className="text-xs text-muted">{article.readTime}</span>
                    </div>

                    <h3 className="mt-3 text-base font-semibold leading-snug text-ink">
                      {article.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                      {article.summary}
                    </p>

                    <div className="mt-4">
                      {isLocked ? (
                        <div className="flex items-center gap-2 rounded-lg border border-line bg-cream px-4 py-2.5 text-sm text-muted">
                          <Lock className="h-4 w-4 shrink-0" />
                          <span>Débloquer avec Premium</span>
                          <Button href="/pricing" variant="accent" className="ml-auto !px-3 !py-1 text-xs">
                            Voir les offres
                          </Button>
                        </div>
                      ) : (
                        <Button href={`/analyses/${article.slug}`} variant="light" className="w-full justify-center">
                          Lire l&apos;analyse
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Signaux récents */}
      <section className="bg-cream px-4 py-12 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-ink">Signaux récents</h2>
              <p className="mt-1 text-sm text-muted">Un aperçu des derniers signaux actifs</p>
            </div>
            <Button href="/signaux" variant="light">
              Voir tous les signaux
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {signals.slice(0, 4).map((signal) => {
              const isLong = signal.direction === "Long";
              const isLocked = signal.premium && !IS_AUTHENTICATED;
              return (
                <div
                  key={signal.id}
                  className={cn(
                    "relative flex items-center gap-4 overflow-hidden rounded-xl border-l-[3px] border border-line bg-white px-4 py-3 shadow-sm",
                    isLong ? "border-l-emerald-500" : "border-l-red-500"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-ink">{signal.asset}</span>
                      <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", isLong ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700")}>
                        {signal.direction}
                      </span>
                      <span className="ml-auto text-xs text-muted">{signal.update}</span>
                    </div>
                    {isLocked ? (
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                        <Lock className="h-3 w-3" />
                        Détail réservé aux membres Premium
                      </div>
                    ) : (
                      <p className="mt-1 text-xs text-muted">
                        Entrée {signal.entry} · Objectif {signal.target} · R/R {signal.rr}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 pt-8 md:px-8">
        <div className="mx-auto max-w-5xl rounded-xl border border-amber-100 bg-amber-50 px-6 py-4 text-sm leading-7 text-amber-800">
          Les analyses et signaux présentés ici sont à visée éducative et informative. Ils ne constituent pas des conseils en investissement. Investir en cryptomonnaies comporte des risques de perte en capital.
        </div>
      </section>
    </main>
  );
}
