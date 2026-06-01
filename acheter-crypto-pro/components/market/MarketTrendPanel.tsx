"use client";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, RefreshCw, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TradingMiniChart } from "@/components/market/TradingMiniChart";
import { MarketAsset, fetchMarketBySymbols, formatMarketCap, formatUsdPrice, marketTabs } from "@/lib/market-data";
import { cn } from "@/lib/utils";

type MarketTrendPanelProps = {
  symbols: string[];
  defaultSymbol?: string;
  title: string;
  subtitle: string;
};

export function MarketTrendPanel({ symbols, defaultSymbol, title, subtitle }: MarketTrendPanelProps) {
  const [activeTab, setActiveTab] = useState<(typeof marketTabs)[number]["key"]>("crypto");
  const [selectedSymbol, setSelectedSymbol] = useState(defaultSymbol ?? symbols[0]);
  const [items, setItems] = useState<MarketAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  async function loadData() {
    try {
      setRefreshing(true);
      const rows = await fetchMarketBySymbols(symbols);
      setItems(rows);
      setLastUpdate(new Date().toLocaleString("fr-FR"));
      setError(null);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Erreur réseau.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 60000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbols.join(",")]);

  useEffect(() => {
    if (!items.find((item) => item.symbol === selectedSymbol) && items[0]) {
      setSelectedSymbol(items[0].symbol);
    }
  }, [items, selectedSymbol]);

  const selected = useMemo(
    () => items.find((item) => item.symbol === selectedSymbol) ?? items[0],
    [items, selectedSymbol]
  );

  return (
    <div className="rounded-xl border border-line bg-cream p-4">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink">{title}</p>
          <p className="mt-1 text-xs text-muted">{subtitle}</p>
        </div>
        <Button onClick={loadData} variant="light" className={cn("px-3 py-2 text-xs", refreshing && "opacity-60")}>
          <RefreshCw className={cn("h-3.5 w-3.5", refreshing && "animate-spin")} />
          Actualiser
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {marketTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "rounded-lg border px-3 py-2 text-xs font-semibold transition",
              activeTab === tab.key ? "border-blue bg-blue text-white" : "border-line bg-white text-muted hover:bg-cream"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab !== "crypto" ? (
        <div className="rounded-lg border border-line bg-white p-4 text-sm text-muted">
          Onglet prêt. Les données {marketTabs.find((tab) => tab.key === activeTab)?.label.toLowerCase()} seront connectées dans la même interface.
        </div>
      ) : null}

      {activeTab === "crypto" ? (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            {symbols.map((symbol) => (
              <button
                key={symbol}
                type="button"
                onClick={() => setSelectedSymbol(symbol)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-semibold transition",
                  selectedSymbol === symbol ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:bg-cream"
                )}
              >
                {symbol}
              </button>
            ))}
          </div>

          {loading ? <div className="h-40 animate-pulse rounded-lg border border-line bg-white" /> : null}

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            </div>
          ) : null}

          {!loading && !error && selected ? (
            <div className="rounded-lg border border-line bg-white p-4">
              <div className="grid gap-3 sm:grid-cols-4">
                <div>
                  <p className="text-xs text-muted">{selected.name}</p>
                  <p className="mt-1 text-2xl font-bold">{formatUsdPrice(selected.price)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">24h</p>
                  <p
                    className={cn(
                      "mt-1 inline-flex items-center gap-1 text-sm font-semibold",
                      selected.change24h >= 0 ? "text-emerald-600" : "text-red-600"
                    )}
                  >
                    {selected.change24h >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {Math.abs(selected.change24h).toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted">7 jours</p>
                  <p
                    className={cn(
                      "mt-1 inline-flex items-center gap-1 text-sm font-semibold",
                      selected.change7d >= 0 ? "text-emerald-600" : "text-red-600"
                    )}
                  >
                    {selected.change7d >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {Math.abs(selected.change7d).toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted">Cap. marché</p>
                  <p className="mt-1 text-sm font-semibold">{formatMarketCap(selected.marketCap)}</p>
                </div>
              </div>
              <TradingMiniChart prices={selected.sparkline} className="mt-4" />
              <div className="mt-3 flex items-center justify-between text-xs text-muted">
                <Badge tone="warning">Scénarios possibles, pas certitudes</Badge>
                <span>Mise à jour: {lastUpdate || "—"}</span>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
