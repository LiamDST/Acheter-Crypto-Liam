"use client";
import Image from "next/image";
import { useRef } from "react";

const CRYPTOS = [
  { symbol: "BTC", name: "Bitcoin",   label: "La référence",            logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
  { symbol: "ETH", name: "Ethereum",  label: "Contrats intelligents",   logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
  { symbol: "SOL", name: "Solana",    label: "Rapidité & scalabilité",  logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
  { symbol: "BNB", name: "BNB",       label: "Écosystème DeFi",         logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png" },
  { symbol: "MATIC", name: "Polygon", label: "Layer 2 Ethereum",        logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png" },
  { symbol: "AVAX", name: "Avalanche",label: "Finance décentralisée",   logo: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png" },
  { symbol: "ADA",  name: "Cardano",  label: "Blockchain académique",   logo: "https://assets.coingecko.com/coins/images/975/small/cardano.png" },
  { symbol: "XRP",  name: "XRP",      label: "Paiements rapides",       logo: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png" },
  { symbol: "ARB",  name: "Arbitrum", label: "L2 haute performance",    logo: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg" },
  { symbol: "OP",   name: "Optimism", label: "Optimistic rollup",       logo: "https://assets.coingecko.com/coins/images/25244/small/Optimism.png" },
  { symbol: "ATOM", name: "Cosmos",   label: "Internet des blockchains",logo: "https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png" },
  { symbol: "DOT",  name: "Polkadot", label: "Interopérabilité",        logo: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png" },
  { symbol: "LINK", name: "Chainlink",label: "Oracles décentralisés",   logo: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png" },
  { symbol: "LTC",  name: "Litecoin", label: "Paiements quotidiens",    logo: "https://assets.coingecko.com/coins/images/2/small/litecoin.png" },
];

const ITEMS = [...CRYPTOS, ...CRYPTOS];

export function CryptoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative overflow-hidden py-2"
      onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused"; }}
      onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; }}
    >
      <div
        ref={trackRef}
        className="flex gap-4 px-4"
        style={{ animation: "carousel-scroll 40s linear infinite", width: "max-content" }}
      >
        {ITEMS.map((crypto, i) => (
          <div key={i} className="flex w-44 flex-shrink-0 items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-sm select-none">
            <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-cream">
              <Image
                src={crypto.logo}
                alt={crypto.name}
                width={36}
                height={36}
                className="h-full w-full object-contain"
                unoptimized
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-ink">{crypto.symbol}</p>
              <p className="truncate text-xs text-muted">{crypto.label}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
