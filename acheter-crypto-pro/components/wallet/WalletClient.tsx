"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Euro, DollarSign, Plus, RotateCw, Trash2, Wallet, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────
type CoinData = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
};

type Position = {
  id: string;
  coinId: string;
  symbol: string;
  name: string;
  image: string;
  amount: number; // en unités crypto
};

type Currency = "eur" | "usd";

const STORAGE_KEY = "wallet_positions_v2";
const API_URL = (currency: Currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`;

// ─── Helpers ───────────────────────────────────────────────────────────────
function uid() { return Math.random().toString(36).slice(2, 10); }

function formatFiat(value: number, currency: Currency): string {
  const cur = currency === "eur" ? "EUR" : "USD";
  if (value >= 1000) return value.toLocaleString("fr-FR", { style: "currency", currency: cur, maximumFractionDigits: 0 });
  if (value >= 1)    return value.toLocaleString("fr-FR", { style: "currency", currency: cur, maximumFractionDigits: 2 });
  return value.toLocaleString("fr-FR", { style: "currency", currency: cur, maximumFractionDigits: 4 });
}

function formatCryptoQty(amount: number): string {
  if (amount >= 1000) return amount.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
  if (amount >= 1)    return amount.toLocaleString("fr-FR", { maximumFractionDigits: 4 });
  return amount.toFixed(8).replace(/\.?0+$/, "");
}

// ─── Modal ajout ───────────────────────────────────────────────────────────
function AddModal({
  open, onClose, onAdd,
  coins, currency,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (coin: CoinData, amount: number) => void;
  coins: CoinData[];
  currency: Currency;
}) {
  const [selectedId, setSelectedId] = useState(coins[0]?.id ?? "");
  const [cryptoInput, setCryptoInput] = useState("");
  const [fiatInput, setFiatInput]     = useState("");

  // sync selectedId quand les coins chargent
  useEffect(() => {
    if (!selectedId && coins.length > 0) setSelectedId(coins[0].id);
  }, [coins, selectedId]);

  // fermer avec Escape
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  const selectedCoin = useMemo(() => coins.find((c) => c.id === selectedId), [coins, selectedId]);
  const price = selectedCoin?.current_price ?? 0;

  function handleCryptoChange(val: string) {
    setCryptoInput(val);
    const n = parseFloat(val.replace(",", "."));
    setFiatInput(!isNaN(n) && price > 0 ? (n * price).toFixed(2) : "");
  }

  function handleFiatChange(val: string) {
    setFiatInput(val);
    const n = parseFloat(val.replace(",", "."));
    setCryptoInput(!isNaN(n) && price > 0 ? (n / price).toFixed(8).replace(/\.?0+$/, "") : "");
  }

  function handleSymbolChange(id: string) {
    setSelectedId(id);
    // recalcule si une valeur est déjà présente
    const cNum = parseFloat(cryptoInput.replace(",", "."));
    const coin  = coins.find((c) => c.id === id);
    if (!isNaN(cNum) && coin) setFiatInput((cNum * coin.current_price).toFixed(2));
  }

  function handleAdd() {
    if (!selectedCoin) return;
    const amount = parseFloat(cryptoInput.replace(",", "."));
    if (isNaN(amount) || amount <= 0) return;
    onAdd(selectedCoin, amount);
    setCryptoInput(""); setFiatInput("");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-white p-7 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Ajouter une position</h2>
              <button onClick={onClose} className="rounded-lg p-1.5 text-muted transition hover:bg-cream">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Sélecteur crypto avec image */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted">Cryptomonnaie</label>
                <div className="relative flex items-center gap-3">
                  {selectedCoin && (
                    <Image
                      src={selectedCoin.image}
                      alt={selectedCoin.name}
                      width={28} height={28}
                      className="pointer-events-none absolute left-3 h-7 w-7 rounded-full"
                      unoptimized
                    />
                  )}
                  <select
                    value={selectedId}
                    onChange={(e) => handleSymbolChange(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-line bg-cream py-3 pr-10 text-sm font-semibold text-ink focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
                    style={{ paddingLeft: selectedCoin ? "2.75rem" : "1rem" }}
                  >
                    {coins.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.symbol.toUpperCase()} — {c.name}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">▾</span>
                </div>
              </div>

              {/* Prix en direct */}
              {selectedCoin && price > 0 && (
                <div className="flex items-center justify-between rounded-xl bg-cream px-4 py-2.5 text-xs">
                  <span className="text-muted">Prix en direct</span>
                  <span className="font-semibold text-ink">{formatFiat(price, currency)}</span>
                </div>
              )}

              {/* Input quantité crypto */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted">
                  Quantité de {selectedCoin?.symbol.toUpperCase() ?? "crypto"}
                </label>
                <div className="relative">
                  <input
                    type="number" min="0" step="any" placeholder="Ex : 0.01"
                    value={cryptoInput}
                    onChange={(e) => handleCryptoChange(e.target.value)}
                    className="w-full rounded-xl border border-line bg-cream px-4 py-3 pr-16 text-sm text-ink placeholder-muted/50 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted">
                    {selectedCoin?.symbol.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Séparateur */}
              <div className="relative flex items-center gap-3">
                <div className="h-px flex-1 bg-line" />
                <span className="text-xs font-semibold uppercase text-muted/50">ou</span>
                <div className="h-px flex-1 bg-line" />
              </div>

              {/* Input montant fiat */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted">
                  Montant en {currency.toUpperCase()}
                </label>
                <div className="relative">
                  <input
                    type="number" min="0" step="any" placeholder="Ex : 500"
                    value={fiatInput}
                    onChange={(e) => handleFiatChange(e.target.value)}
                    className="w-full rounded-xl border border-line bg-cream px-4 py-3 pr-14 text-sm text-ink placeholder-muted/50 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted">
                    {currency.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Bouton confirmer */}
              <button
                onClick={handleAdd}
                disabled={!cryptoInput || parseFloat(cryptoInput) <= 0}
                className="w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white transition hover:bg-ink/80 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Ajouter au portefeuille
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Composant principal ───────────────────────────────────────────────────
export function WalletClient() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [coins, setCoins]         = useState<CoinData[]>([]);
  const [loading, setLoading]     = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [currency, setCurrency]   = useState<Currency>("eur");
  const [dialogOpen, setDialogOpen] = useState(false);

  // ── localStorage ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPositions(JSON.parse(saved) as Position[]);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  }, [positions]);

  // ── Fetch coins — même API que MarketClient ──
  const fetchCoins = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL(currency), { cache: "no-store" });
      if (!res.ok) throw new Error("Données marché indisponibles. Réessayez.");
      const data: CoinData[] = await res.json();
      setCoins(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de connexion.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currency]);

  useEffect(() => {
    fetchCoins();
    const timer = setInterval(() => fetchCoins(true), 60_000);
    return () => clearInterval(timer);
  }, [fetchCoins]);

  // ── Map rapide symbol/id -> prix ──
  const priceById = useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of coins) m[c.id] = c.current_price;
    return m;
  }, [coins]);

  const changeById = useMemo(() => {
    const m: Record<string, number> = {};
    for (const c of coins) m[c.id] = c.price_change_percentage_24h ?? 0;
    return m;
  }, [coins]);

  // ── Actions ──
  function addPosition(coin: CoinData, amount: number) {
    setPositions((prev) => {
      const idx = prev.findIndex((p) => p.coinId === coin.id);
      if (idx >= 0) return prev.map((p, i) => i === idx ? { ...p, amount: p.amount + amount } : p);
      return [...prev, {
        id: uid(),
        coinId: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        image: coin.image,
        amount,
      }];
    });
  }

  function removePosition(id: string) {
    setPositions((prev) => prev.filter((p) => p.id !== id));
  }

  // ── Calculs ──
  const totalValue = useMemo(
    () => positions.reduce((s, p) => s + p.amount * (priceById[p.coinId] ?? 0), 0),
    [positions, priceById]
  );

  const totalChange24h = useMemo(() => {
    let now = 0, yesterday = 0;
    for (const p of positions) {
      const price = priceById[p.coinId] ?? 0;
      const ch    = changeById[p.coinId] ?? 0;
      const val   = p.amount * price;
      now       += val;
      yesterday += price > 0 ? val / (1 + ch / 100) : 0;
    }
    return yesterday === 0 ? 0 : ((now - yesterday) / yesterday) * 100;
  }, [positions, priceById, changeById]);

  const totalPositive = totalChange24h >= 0;

  return (
    <div className="min-h-screen bg-[#fbfbfd] px-4 py-8 md:px-6 md:py-12 lg:px-8">
      <div className="mx-auto max-w-[980px] space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col gap-6 pt-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-[40px] font-semibold leading-[1.08] tracking-tight text-ink md:text-[48px]">
              Portefeuille
            </h1>
            <p className="mt-1 text-[17px] font-normal leading-[1.47] text-muted">
              Vos crypto en un coup d&apos;œil, en temps réel.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle devise */}
            <button
              onClick={() => setCurrency((c) => c === "eur" ? "usd" : "eur")}
              className="flex h-9 items-center gap-2 rounded-full bg-cream px-4 text-[14px] font-medium text-ink transition hover:bg-line"
            >
              {currency === "eur" ? <Euro className="h-3.5 w-3.5" /> : <DollarSign className="h-3.5 w-3.5" />}
              {currency.toUpperCase()}
            </button>

            {/* Actualiser */}
            <button
              onClick={() => fetchCoins(true)}
              className={cn("flex h-9 items-center gap-2 rounded-full bg-cream px-4 text-[14px] font-medium text-muted transition hover:bg-line", refreshing && "opacity-50")}
            >
              <RotateCw className={cn("h-3.5 w-3.5", refreshing && "animate-spin")} />
            </button>

            {/* Bouton ajout */}
            <button
              onClick={() => setDialogOpen(true)}
              disabled={coins.length === 0}
              className="flex h-9 items-center gap-2 rounded-full bg-blue px-5 text-[14px] font-medium text-white transition hover:bg-blue/90 disabled:opacity-50"
            >
              <Plus className="h-3.5 w-3.5" />
              Ajouter
            </button>
          </div>
        </div>

        {/* ── Erreur ── */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}{" "}
            <button onClick={() => fetchCoins()} className="underline">Réessayer</button>
          </div>
        )}

        {/* ── Carte total ── */}
        <div className="relative overflow-hidden rounded-[18px] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:p-10">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-normal text-muted">Valeur totale</p>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-[11px] font-medium text-emerald-600">EN DIRECT</span>
              </div>
            </div>

            {loading ? (
              <div className="h-14 w-64 animate-pulse rounded-2xl bg-cream" />
            ) : (
              <p className="text-[44px] font-semibold leading-[1.08] tracking-tight text-ink md:text-[56px]">
                {positions.length > 0 ? formatFiat(totalValue, currency) : "—"}
              </p>
            )}

            {positions.length > 0 && !loading && (
              <div className={cn("flex items-center gap-1 text-[15px] font-medium", totalPositive ? "text-emerald-600" : "text-red-500")}>
                {totalPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {totalPositive ? "+" : ""}{totalChange24h.toFixed(2)}% aujourd&apos;hui
              </div>
            )}

            {positions.length === 0 && !loading && (
              <p className="text-[15px] text-muted">Ajoutez une position pour commencer le suivi.</p>
            )}
          </div>
        </div>

        {/* ── Positions ── */}
        <div className="space-y-3">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-[18px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]" />
            ))
          ) : positions.length === 0 ? (
            <div className="rounded-[18px] bg-white p-16 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-cream p-4">
                  <Wallet className="h-10 w-10 text-muted/40" />
                </div>
                <div>
                  <p className="text-[17px] font-semibold text-ink">Aucune position</p>
                  <p className="mt-1 text-[14px] text-muted">Cliquez sur « Ajouter » pour commencer.</p>
                </div>
              </div>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {positions.map((pos) => {
                const price    = priceById[pos.coinId]  ?? 0;
                const change   = changeById[pos.coinId] ?? 0;
                const value    = pos.amount * price;
                const positive = change >= 0;

                return (
                  <motion.div
                    key={pos.id}
                    layout
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 32, transition: { duration: 0.18 } }}
                    className="group rounded-[18px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:p-6"
                  >
                    <div className="flex items-center justify-between gap-4 md:gap-6">
                      {/* Logo + nom */}
                      <div className="flex flex-1 min-w-0 items-center gap-3 md:gap-4">
                        <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                          <Image
                            src={pos.image}
                            alt={pos.name}
                            width={48} height={48}
                            className="h-12 w-12 rounded-full md:h-14 md:w-14"
                            unoptimized
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-[17px] font-semibold leading-[1.2] text-ink md:text-[19px]">
                            {pos.symbol}
                          </h3>
                          <span className="text-[13px] text-muted md:text-[14px]">{pos.name}</span>
                          <p className="mt-1 font-mono text-[12px] text-muted md:text-[13px]">
                            {formatCryptoQty(pos.amount)} {pos.symbol}
                          </p>
                        </div>
                      </div>

                      {/* Valeur + variation + supprimer */}
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="text-right">
                          {price === 0 ? (
                            <div className="h-6 w-24 animate-pulse rounded-lg bg-cream" />
                          ) : (
                            <>
                              <p className="text-[19px] font-semibold leading-[1.2] text-ink md:text-[21px]">
                                {formatFiat(value, currency)}
                              </p>
                              <p className="mt-0.5 font-mono text-[11px] text-muted md:text-[12px]">
                                {formatFiat(price, currency)} / {pos.symbol}
                              </p>
                            </>
                          )}
                        </div>

                        <div className={cn(
                          "hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium md:flex",
                          positive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-500"
                        )}>
                          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                          {positive ? "+" : ""}{change.toFixed(2)}%
                        </div>

                        <button
                          onClick={() => removePosition(pos.id)}
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                          title="Supprimer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        <p className="pb-4 text-center text-xs text-muted/50">
          Données CoinGecko · actualisées toutes les 60 secondes · à titre indicatif uniquement
        </p>
      </div>

      {/* ── Modal ajout ── */}
      <AddModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={addPosition}
        coins={coins}
        currency={currency}
      />
    </div>
  );
}
