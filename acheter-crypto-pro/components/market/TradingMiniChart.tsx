"use client";

type Candle = {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
};

function buildCandles(series: number[], target = 24): Candle[] {
  if (!series || series.length < 8) return [];
  const chunk = Math.max(2, Math.floor(series.length / target));
  const candles: Candle[] = [];

  for (let i = 0; i < series.length; i += chunk) {
    const part = series.slice(i, i + chunk);
    if (part.length < 2) continue;
    const open = part[0];
    const close = part[part.length - 1];
    const high = Math.max(...part);
    const low = Math.min(...part);
    const volume = part.reduce((sum, value, idx) => {
      if (idx === 0) return sum;
      return sum + Math.abs(value - part[idx - 1]);
    }, 0);
    candles.push({ open, close, high, low, volume });
  }

  return candles;
}

export function TradingMiniChart({
  prices,
  className = "",
}: {
  prices: number[];
  className?: string;
}) {
  const candles = buildCandles(prices);
  if (!candles.length) {
    return <div className={`h-40 rounded-lg border border-line bg-cream ${className}`} />;
  }

  const width = 760;
  const height = 260;
  const priceTop = 16;
  const priceBottom = 170;
  const volumeTop = 184;
  const volumeBottom = 236;
  const left = 14;
  const right = 736;
  const candleStep = (right - left) / candles.length;
  const bodyWidth = Math.max(3, candleStep * 0.52);

  const maxHigh = Math.max(...candles.map((candle) => candle.high));
  const minLow = Math.min(...candles.map((candle) => candle.low));
  const priceRange = maxHigh - minLow || 1;
  const maxVolume = Math.max(...candles.map((candle) => candle.volume)) || 1;

  const priceY = (value: number) =>
    priceBottom - ((value - minLow) / priceRange) * (priceBottom - priceTop);
  const volumeY = (value: number) =>
    volumeBottom - (value / maxVolume) * (volumeBottom - volumeTop);

  const last = candles[candles.length - 1];
  const lastY = priceY(last.close);
  const bullishLast = last.close >= last.open;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`h-44 w-full rounded-lg border border-line bg-white ${className}`}
      role="img"
      aria-label="Graphique bougies et volume"
    >
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
        const y = priceTop + ratio * (priceBottom - priceTop);
        return (
          <line
            key={`g-h-${ratio}`}
            x1={left}
            y1={y}
            x2={right}
            y2={y}
            stroke="#edf1f5"
            strokeWidth="1"
          />
        );
      })}

      {candles.map((candle, index) => {
        const x = left + index * candleStep + candleStep * 0.5;
        const highY = priceY(candle.high);
        const lowY = priceY(candle.low);
        const openY = priceY(candle.open);
        const closeY = priceY(candle.close);
        const bullish = candle.close >= candle.open;
        const bodyTop = Math.min(openY, closeY);
        const bodyHeight = Math.max(1.8, Math.abs(openY - closeY));
        const stroke = bullish ? "#16a34a" : "#dc2626";
        const fill = bullish ? "#22c55e" : "#ef4444";
        const vy = volumeY(candle.volume);

        return (
          <g key={`c-${index}`}>
            <line x1={x} y1={highY} x2={x} y2={lowY} stroke={stroke} strokeWidth="1.2" />
            <rect
              x={x - bodyWidth / 2}
              y={bodyTop}
              width={bodyWidth}
              height={bodyHeight}
              fill={fill}
              stroke={stroke}
              strokeWidth="0.8"
            />
            <rect
              x={x - bodyWidth / 2}
              y={vy}
              width={bodyWidth}
              height={Math.max(1, volumeBottom - vy)}
              fill={bullish ? "rgba(34,197,94,0.28)" : "rgba(239,68,68,0.28)"}
            />
          </g>
        );
      })}

      <line
        x1={left}
        y1={lastY}
        x2={right}
        y2={lastY}
        stroke={bullishLast ? "#16a34a" : "#dc2626"}
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <line x1={left} y1={volumeTop} x2={right} y2={volumeTop} stroke="#edf1f5" strokeWidth="1" />
      <text x={left} y={volumeTop - 6} fontSize="9" fill="#7d8696">
        Volume
      </text>
    </svg>
  );
}
