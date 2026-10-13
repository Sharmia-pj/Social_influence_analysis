import React, { useState } from 'react';

// ==================== 1. VERTICAL BAR CHART (LIGHT THEME) ====================
interface BarChartProps {
  data: { label: string; value: number; subLabel?: string; color?: string }[];
  height?: number;
  valueFormatter?: (v: number) => string;
  accentColor?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 240,
  valueFormatter = (v) => v.toLocaleString(),
  accentColor = '#7c3aed'
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-xs text-slate-400">No chart data available</div>;
  }

  const maxValue = Math.max(...data.map(d => d.value), 1);
  const paddingBottom = 48;
  const paddingTop = 24;
  const chartHeight = height - paddingBottom - paddingTop;

  return (
    <div className="w-full relative select-none">
      <div className="relative w-full" style={{ height: `${height}px` }}>
        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${data.length * 54 + 20} ${height}`} preserveAspectRatio="none">
          {/* Subtle grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = paddingTop + chartHeight * (1 - pct);
            return (
              <g key={i}>
                <line
                  x1="0"
                  y1={y}
                  x2={data.length * 54 + 20}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeDasharray="3 3"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          {/* Bars */}
          {data.map((item, idx) => {
            const barWidth = 30;
            const x = idx * 54 + 24;
            const barH = (item.value / maxValue) * chartHeight;
            const y = paddingTop + chartHeight - barH;
            const isHovered = hoveredIdx === idx;
            const fill = item.color || (isHovered ? '#6d28d9' : accentColor);

            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer transition-all duration-200"
              >
                {/* Bar rect */}
                <rect
                  x={x - barWidth / 2}
                  y={y}
                  width={barWidth}
                  height={Math.max(barH, 4)}
                  rx="6"
                  fill={fill}
                  className="transition-all duration-200"
                  opacity={hoveredIdx !== null && !isHovered ? 0.5 : 1}
                />

                {/* X axis text */}
                <text
                  x={x}
                  y={height - 18}
                  textAnchor="middle"
                  fill={isHovered ? '#0f172a' : '#64748b'}
                  fontSize="10"
                  fontFamily="system-ui"
                  className="font-medium"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Float */}
        {hoveredIdx !== null && (
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 bg-white border border-purple-200 rounded-lg px-3 py-1.5 text-xs shadow-lg pointer-events-none z-10 font-mono text-slate-800"
          >
            <span className="font-semibold text-purple-900">{data[hoveredIdx].label}</span>:{' '}
            <span className="text-purple-600 font-bold">{valueFormatter(data[hoveredIdx].value)}</span>
            {data[hoveredIdx].subLabel && (
              <span className="text-slate-400 text-[10px] ml-1.5">({data[hoveredIdx].subLabel})</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== 2. DOUGHNUT / DONUT CHART (LIGHT THEME) ====================
interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerTitle?: string;
  centerValue?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 200,
  thickness = 30,
  centerTitle = 'Total',
  centerValue
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const total = data.reduce((acc, d) => acc + d.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedAngle = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          {data.map((item, idx) => {
            const fraction = item.value / total;
            const strokeDasharray = `${fraction * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedAngle * circumference;
            accumulatedAngle += fraction;
            const isHovered = hoveredIdx === idx;

            return (
              <circle
                key={idx}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={isHovered ? thickness + 4 : thickness}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-200"
                opacity={hoveredIdx !== null && !isHovered ? 0.5 : 1}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
            {hoveredIdx !== null ? data[hoveredIdx].label : centerTitle}
          </span>
          <span className="text-base sm:text-lg font-bold text-slate-900 font-mono">
            {hoveredIdx !== null
              ? `${((data[hoveredIdx].value / total) * 100).toFixed(1)}%`
              : centerValue || total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="space-y-1.5 text-xs w-full max-w-[200px]">
        {data.map((item, idx) => {
          const pct = ((item.value / total) * 100).toFixed(1);
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between gap-3 p-1.5 rounded-lg cursor-pointer transition-all ${
                isHovered ? 'bg-purple-50 text-purple-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.label}</span>
              </div>
              <span className="font-mono text-slate-500 font-semibold shrink-0">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==================== 3. HORIZONTAL LEADERBOARD BAR (LIGHT THEME) ====================
interface LeaderboardBarProps {
  label: string;
  subLabel?: string;
  value: number;
  maxValue: number;
  scoreDisplay?: string;
  rank?: number;
  color?: string;
  secondaryText?: string;
}

export const LeaderboardBar: React.FC<LeaderboardBarProps> = ({
  label,
  subLabel,
  value,
  maxValue,
  scoreDisplay,
  rank,
  color = '#7c3aed',
  secondaryText
}) => {
  const pct = Math.min(100, Math.max(3, (value / (maxValue || 1)) * 100));

  return (
    <div className="group py-2 border-b border-slate-100 last:border-0 hover:bg-purple-50/40 px-2 rounded-lg transition-colors">
      <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
        <div className="flex items-center gap-2 truncate">
          {rank !== undefined && (
            <span className={`w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[10px] shrink-0 ${
              rank === 1 ? 'bg-amber-100 text-amber-800 border border-amber-300' :
              rank === 2 ? 'bg-slate-200 text-slate-800 border border-slate-300' :
              rank === 3 ? 'bg-orange-100 text-orange-800 border border-orange-300' :
              'bg-slate-100 text-slate-600'
            }`}>
              #{rank}
            </span>
          )}
          <span className="font-semibold text-slate-800 group-hover:text-purple-700 transition-colors truncate">
            {label}
          </span>
          {subLabel && <span className="text-slate-400 text-[11px] truncate">({subLabel})</span>}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {secondaryText && <span className="text-[11px] text-slate-500 font-mono">{secondaryText}</span>}
          <span className="font-mono font-bold text-slate-900 text-xs">{scoreDisplay || value.toLocaleString()}</span>
        </div>
      </div>

      {/* Progress track */}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

// ==================== 4. LINE / AREA SPARKLINE CHART (LIGHT THEME) ====================
interface AreaTrendChartProps {
  data: { label: string; value: number; secondaryValue?: number }[];
  height?: number;
  lineColor?: string;
  fillColor?: string;
  valueFormatter?: (v: number) => string;
}

export const AreaTrendChart: React.FC<AreaTrendChartProps> = ({
  data,
  height = 200,
  lineColor = '#7c3aed',
  fillColor = 'rgba(124, 58, 237, 0.08)',
  valueFormatter = (v) => v.toLocaleString()
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map(d => d.value), 1);
  const paddingX = 30;
  const paddingTop = 20;
  const paddingBottom = 40;
  const chartWidth = 500;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1 || 1)) * (chartWidth - 2 * paddingX);
    const y = paddingTop + chartHeight - (d.value / maxVal) * chartHeight;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;

  return (
    <div className="w-full relative select-none">
      <div style={{ height: `${height}px` }} className="relative w-full">
        <svg viewBox={`0 0 ${chartWidth} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 0.5, 1].map((pct, i) => {
            const y = paddingTop + chartHeight * (1 - pct);
            return (
              <line
                key={i}
                x1={paddingX}
                y1={y}
                x2={chartWidth - paddingX}
                y2={y}
                stroke="#f1f5f9"
                strokeDasharray="2 2"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Area fill */}
          <path d={areaD} fill={fillColor} />

          {/* Line stroke */}
          <path d={pathD} fill="none" stroke={lineColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data points */}
          {points.map((p, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 6 : 4}
                  fill={isHovered ? '#6d28d9' : '#ffffff'}
                  stroke={lineColor}
                  strokeWidth="2.5"
                  className="transition-all duration-150"
                />
                <text
                  x={p.x}
                  y={height - 12}
                  textAnchor="middle"
                  fill={isHovered ? '#0f172a' : '#64748b'}
                  fontSize="10"
                  fontFamily="system-ui"
                  className="font-medium"
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>

        {hoveredIdx !== null && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white border border-purple-200 rounded-lg px-3 py-1.5 text-xs shadow-lg font-mono text-slate-800 pointer-events-none">
            <span className="text-purple-900 font-semibold">{data[hoveredIdx].label}</span>:{' '}
            <span className="text-purple-600 font-bold">{valueFormatter(data[hoveredIdx].value)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
