import { market } from "@/data/site";

export function MarketTicker() {
  const items = [...market, ...market, ...market];
  return (
    <div className="relative overflow-hidden border-y border-line bg-white py-4 text-ink">
      <div className="market-marquee flex w-max items-center gap-3 px-4">
        {items.map((item, index) => (
          <div key={`${item.asset}-${index}`} className="group flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2 text-sm shadow-sm transition hover:border-gold/50">
            <span className={item.positive ? "h-2 w-2 rounded-full bg-emerald-500" : "h-2 w-2 rounded-full bg-red-500"} />
            <strong className="tracking-[-0.02em] text-black">{item.asset}</strong>
            <span className="text-muted">{item.price}</span>
            <span className={item.positive ? "rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700" : "rounded-full bg-red-50 px-2 py-0.5 text-red-700"}>{item.change}</span>
            <span className="h-6 w-14 overflow-hidden rounded-full opacity-75 transition group-hover:opacity-100">
              <svg viewBox="0 0 56 24" className="h-full w-full">
                <path d={item.positive ? "M2 18 C12 17 12 10 22 12 S36 18 54 5" : "M2 6 C14 10 18 4 28 10 S42 20 54 17"} fill="none" stroke={item.positive ? "#059669" : "#dc2626"} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
