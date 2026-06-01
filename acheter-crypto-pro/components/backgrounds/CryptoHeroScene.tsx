"use client";
import { motion } from "framer-motion";
import { MiniChart } from "@/components/ui/MiniChart";

export function CryptoHeroScene() {
  const bars = [46, 70, 38, 88, 64, 112, 78, 132, 96, 158, 110, 178, 124, 146];
  return (
    <motion.div initial={{ opacity: 0, y: 30, rotateX: 10 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.8 }} className="relative h-[500px] overflow-hidden rounded-[2.5rem] border border-line bg-white/72 p-6 shadow-hero backdrop-blur-xl [perspective:1200px] sm:h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_26%,rgba(232,214,187,0.52),transparent_33%),linear-gradient(145deg,rgba(255,255,255,.76),rgba(244,239,230,.38))]" />
      <div className="pointer-events-none absolute -right-16 top-12 h-52 w-52 rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute left-6 top-7 z-30 rounded-3xl border border-line bg-white/78 px-4 py-3 text-sm shadow-premium backdrop-blur sm:left-8 sm:top-8">
        <p className="font-semibold">Live market pulse</p>
        <p className="text-xs text-muted">BTC · ETH · Trading bars</p>
      </div>
      <div className="coin-3d absolute left-[38%] top-24 z-10 h-32 w-32 -translate-x-1/2 rounded-full border-[8px] border-[#cfad6d] bg-[radial-gradient(circle_at_30%_25%,#fff7dc,#d8ad50_58%,#8d6a23)] shadow-[0_26px_70px_rgba(80,55,0,0.2)] sm:left-[42%] sm:top-20 sm:h-40 sm:w-40">
        <div className="grid h-full w-full place-items-center text-5xl font-black text-white drop-shadow sm:text-7xl">₿</div>
      </div>
      <div aria-hidden="true" className="eth-crystal absolute right-[17%] top-24 z-20 h-32 w-24 bg-[linear-gradient(145deg,rgba(255,255,255,.92),rgba(242,219,164,.74)_45%,rgba(184,133,39,.42))] shadow-[0_28px_70px_rgba(89,66,22,.18)] sm:right-[18%] sm:top-28 sm:h-36 sm:w-28" />
      <div className="absolute bottom-28 left-6 right-6 z-0 flex h-48 items-end justify-center gap-3 opacity-45 [transform:rotateX(54deg)_rotateZ(-7deg)] [transform-origin:center_bottom] [transform-style:preserve-3d] sm:left-12 sm:right-12 sm:gap-4 sm:opacity-55">
        {bars.map((height, i) => (
          <div key={height + i} className="candle relative w-5 rounded-t-xl bg-gradient-to-t from-ink/55 to-gold shadow-[0_18px_35px_rgba(17,17,17,.12)] sm:w-7" style={{ height, animationDelay: `${i * 0.11}s` }}>
            <div className="absolute inset-x-0 -top-1 h-2 rounded-full bg-white/60" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-5 right-5 z-20 h-36 rounded-[2rem] border border-line bg-white/78 p-4 shadow-premium backdrop-blur sm:left-6 sm:right-6">
        <MiniChart className="h-full w-full" />
      </div>
    </motion.div>
  );
}
