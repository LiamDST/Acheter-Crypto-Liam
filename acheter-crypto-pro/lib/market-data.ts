export type MarketAsset = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  sparkline: number[];
  updatedAt: string;
};

type CoinGeckoMarketRow = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  market_cap: number;
  sparkline_in_7d?: { price: number[] };
  last_updated: string;
};

export const symbolToCoinId: Record<string, string> = {
  BTC:   "bitcoin",
  ETH:   "ethereum",
  SOL:   "solana",
  LINK:  "chainlink",
  XRP:   "ripple",
  BNB:   "binancecoin",
  ADA:   "cardano",
  AVAX:  "avalanche-2",
  MATIC: "matic-network",
  DOT:   "polkadot",
  ATOM:  "cosmos",
  LTC:   "litecoin",
  ARB:   "arbitrum",
  OP:    "optimism",
};

export const marketTabs = [
  { key: "crypto", label: "Crypto", live: true },
  { key: "forex", label: "Forex", live: false },
  { key: "indices", label: "Indices", live: false },
  { key: "commodities", label: "Matières premières", live: false }
] as const;

function mapCoinGeckoRow(row: CoinGeckoMarketRow): MarketAsset {
  return {
    id: row.id,
    symbol: row.symbol.toUpperCase(),
    name: row.name,
    price: row.current_price ?? 0,
    change24h: row.price_change_percentage_24h ?? 0,
    change7d: row.price_change_percentage_7d_in_currency ?? 0,
    marketCap: row.market_cap ?? 0,
    sparkline: row.sparkline_in_7d?.price ?? [],
    updatedAt: row.last_updated
  };
}

export async function fetchMarketBySymbols(
  symbols: string[],
  currency: "usd" | "eur" = "usd"
): Promise<MarketAsset[]> {
  const ids = symbols
    .map((symbol) => symbolToCoinId[symbol.toUpperCase()])
    .filter(Boolean)
    .join(",");

  if (!ids) return [];

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h%2C7d`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("Données marché indisponibles pour le moment.");

  const rows = (await response.json()) as CoinGeckoMarketRow[];
  return rows.map(mapCoinGeckoRow);
}

export function formatEurPrice(value: number) {
  if (value >= 1000) return value.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  if (value >= 1)    return value.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 2 });
  return value.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 6 });
}

export function formatUsdPrice(value: number) {
  if (value >= 1000) {
    return value.toLocaleString("fr-FR", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  }
  if (value >= 1) {
    return value.toLocaleString("fr-FR", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  }
  return value.toLocaleString("fr-FR", { style: "currency", currency: "USD", maximumFractionDigits: 6 });
}

export function formatMarketCap(value: number) {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString("fr-FR")}`;
}
