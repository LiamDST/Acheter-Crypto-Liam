"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { RotateCw, TrendingDown, TrendingUp } from "lucide-react";
import { AnimatedCryptoBackground } from "@/components/backgrounds/AnimatedCryptoBackground";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Sparkline } from "@/components/market/Sparkline";
import { cn } from "@/lib/utils";

type CryptoData = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  image: string;
  sparkline_in_7d?: { price: number[] };
};

const formatMarketCap = (marketCap: number) => {
  if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
  if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
  if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
  return `$${marketCap.toLocaleString("fr-FR")}`;
};

const formatPrice = (price: number) => {
  if (price >= 1000) return price.toLocaleString("fr-FR", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  if (price >= 1) return price.toLocaleString("fr-FR", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  return price.toLocaleString("fr-FR", { style: "currency", currency: "USD", maximumFractionDigits: 6 });
};

export function MarketClient() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMarket = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h%2C7d"
      );
      if (!response.ok) throw new Error("Impossible de charger le marché. Réessayez.");
      const data: CryptoData[] = await response.json();
      setCryptos(data);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarket();
    const interval = setInterval(fetchMarket, 60000);
    return () => clearInterval(interval);
  }, []);

  const lastUpdateLabel = useMemo(() => (lastUpdate ? lastUpdate.toLocaleString("fr-FR") : "—"), [lastUpdate]);

  if (loading) {
    return (
      <main className="relative page-section">
        <AnimatedCryptoBackground variant="page" intensity="low" />
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse space-y-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-16 rounded-2xl border border-line bg-white/80" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="relative page-section">
        <AnimatedCryptoBackground variant="page" intensity="low" />
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-red-600">{error}</p>
          <Button onClick={fetchMarket} className="mt-4" variant="light">
            Réessayer
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative page-section">
      <AnimatedCryptoBackground variant="page" intensity="low" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge tone="success">Marché en temps réel</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Marché des Cryptomonnaies</h1>
            <p className="mt-3 text-sm text-muted">Dernière mise à jour : {lastUpdateLabel}</p>
          </div>
          <Button onClick={fetchMarket} variant="light" className={cn(isRefreshing && "pointer-events-none opacity-60")}>
            <RotateCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            Actualiser
          </Button>
        </div>

        <Card className="overflow-hidden p-0">
          <div className="sm:hidden divide-y divide-line">
            {cryptos.map((crypto) => {
              const change24h = crypto.price_change_percentage_24h ?? 0;
              const change7d = crypto.price_change_percentage_7d_in_currency ?? 0;
              return (
                <div key={crypto.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image src={crypto.image} alt={crypto.name} width={36} height={36} className="h-9 w-9 rounded-full" />
                      <div>
                        <p className="text-sm font-semibold">{crypto.name}</p>
                        <p className="text-xs text-muted">{crypto.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatPrice(crypto.current_price)}</p>
                      <div className={cn("mt-1 inline-flex items-center text-xs", change24h >= 0 ? "text-green-600" : "text-red-600")}>
                        {change24h >= 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                        {Math.abs(change24h).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Sparkline data={crypto.sparkline_in_7d?.price ?? []} isPositive={change7d >= 0} />
                    <div className="text-right text-xs text-muted">Cap. Marché {formatMarketCap(crypto.market_cap)}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full">
              <thead>
                <tr className="bg-cream/70 text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-6 py-4">Crypto</th>
                  <th className="px-6 py-4 text-right">Prix</th>
                  <th className="px-6 py-4 text-right">24h %</th>
                  <th className="px-6 py-4 text-right">7j %</th>
                  <th className="px-6 py-4 text-center">7 jours</th>
                  <th className="px-6 py-4 text-right">Cap. Marché</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-sm">
                {cryptos.map((crypto) => {
                  const change24h = crypto.price_change_percentage_24h ?? 0;
                  const change7d = crypto.price_change_percentage_7d_in_currency ?? 0;
                  return (
                    <tr key={crypto.id} className="transition hover:bg-cream/40">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image src={crypto.image} alt={crypto.name} width={32} height={32} className="h-8 w-8 rounded-full" />
                          <div>
                            <p className="font-semibold">{crypto.name}</p>
                            <p className="text-xs text-muted">{crypto.symbol.toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold">{formatPrice(crypto.current_price)}</td>
                      <td className={cn("px-6 py-4 text-right font-semibold", change24h >= 0 ? "text-green-600" : "text-red-600")}>
                        {change24h >= 0 ? <TrendingUp className="mr-1 inline h-4 w-4" /> : <TrendingDown className="mr-1 inline h-4 w-4" />}
                        {Math.abs(change24h).toFixed(2)}%
                      </td>
                      <td className={cn("px-6 py-4 text-right font-semibold", change7d >= 0 ? "text-green-600" : "text-red-600")}>
                        {change7d >= 0 ? <TrendingUp className="mr-1 inline h-4 w-4" /> : <TrendingDown className="mr-1 inline h-4 w-4" />}
                        {Math.abs(change7d).toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="mx-auto w-28">
                          <Sparkline data={crypto.sparkline_in_7d?.price ?? []} isPositive={change7d >= 0} />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold">{formatMarketCap(crypto.market_cap)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  );
}
