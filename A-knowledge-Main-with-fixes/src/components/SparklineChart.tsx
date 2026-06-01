import React from 'react';
import { Area, AreaChart, YAxis } from 'recharts';

interface SparklineChartProps {
  data: number[];
  width?: number;
  height?: number;
  isPositive: boolean;
}

export default function SparklineChart({ data, width = 120, height = 40, isPositive }: SparklineChartProps) {
  const chartData = data.map((value, index) => ({ value }));

  return (
    <AreaChart width={width} height={height} data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id={`gradient-${isPositive ? 'up' : 'down'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0.3} />
          <stop offset="100%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0} />
        </linearGradient>
      </defs>
      <YAxis type="number" domain={['dataMin', 'dataMax']} hide />
      <Area
        type="monotone"
        dataKey="value"
        stroke={isPositive ? '#22c55e' : '#ef4444'}
        strokeWidth={1.5}
        fillOpacity={1}
        fill={`url(#gradient-${isPositive ? 'up' : 'down'})`}
      />
    </AreaChart>
  );
}