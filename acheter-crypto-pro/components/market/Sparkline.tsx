"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type SparklineProps = {
  data: number[];
  isPositive: boolean;
  className?: string;
};

export function Sparkline({ data, isPositive, className }: SparklineProps) {
  const id = useId();
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 120;
  const height = 40;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const stroke = isPositive ? "#16a34a" : "#ef4444";
  const fill = isPositive ? "rgba(22, 163, 74, 0.12)" : "rgba(239, 68, 68, 0.12)";

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn("h-10 w-28", className)} role="img" aria-label="Évolution sur 7 jours">
      <defs>
        <linearGradient id={`spark-fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,${height} ${points} ${width},${height}`} fill={`url(#spark-fill-${id})`} />
    </svg>
  );
}
