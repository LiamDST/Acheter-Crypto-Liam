export function MiniChart({ className = "" }: { className?: string }) {
  const points = [
    { x: 24, y: 138, label: "Jan", value: "+3%" },
    { x: 82, y: 116, label: "Fév", value: "+9%" },
    { x: 138, y: 122, label: "Mar", value: "+7%" },
    { x: 196, y: 88, label: "Avr", value: "+18%" },
    { x: 252, y: 94, label: "Mai", value: "+16%" },
    { x: 310, y: 62, label: "Juin", value: "+29%" },
    { x: 366, y: 68, label: "Juil", value: "+27%" },
    { x: 424, y: 44, label: "Août", value: "+38%" },
    { x: 496, y: 32, label: "Sep", value: "+46%" }
  ];
  const line = "M24 138 C62 128 56 113 82 116 C118 121 116 136 138 122 C168 101 172 86 196 88 C226 90 226 108 252 94 C282 78 282 61 310 62 C342 64 338 82 366 68 C396 55 394 43 424 44 C462 45 466 46 496 32";

  return (
    <svg viewBox="0 0 520 180" className={className} role="img" aria-label="Courbe de performance mensuelle">
      <defs>
        <linearGradient id="performanceFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#111111" stopOpacity="0.2" />
          <stop offset="72%" stopColor="#E8D6BB" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="performanceStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#111111" />
          <stop offset="55%" stopColor="#806B49" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
      </defs>

      {[36, 72, 108, 144].map((y) => <line key={y} x1="20" x2="500" y1={y} y2={y} stroke="#EEE7DC" strokeWidth="1" />)}
      {points.map((point) => (
        <g key={point.label} opacity="0.55">
          <line x1={point.x} x2={point.x} y1="24" y2="150" stroke="#EEE7DC" strokeDasharray="4 8" />
          <text x={point.x} y="170" textAnchor="middle" fill="#5F5F5F" fontSize="10">{point.label}</text>
        </g>
      ))}
      <path d={`${line} L496 150 L24 150 Z`} fill="url(#performanceFill)" />
      <path d={line} fill="none" stroke="url(#performanceStroke)" strokeWidth="5" strokeLinecap="round" className="price-line" />
      {points.map((point, index) => (
        <g key={point.value} className="performance-dot" style={{ animationDelay: `${index * 0.12}s` }}>
          <circle cx={point.x} cy={point.y} r="6" fill="#FFFFFF" stroke="#111111" strokeWidth="3" />
          {index === points.length - 1 && (
            <g>
              <rect x={point.x - 38} y={point.y - 34} width="76" height="22" rx="11" fill="#111111" />
              <text x={point.x} y={point.y - 19} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">{point.value}</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
