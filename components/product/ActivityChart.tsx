"use client";

import { activitySeries } from "@/lib/data";

function path(points: number[], w: number, h: number, max: number) {
  const stepX = w / (points.length - 1);
  const coords = points.map((v, i) => [i * stepX, h - (v / max) * (h - 8) - 4] as const);
  const d = coords
    .map(([x, y], i) => {
      if (i === 0) return `M ${x},${y}`;
      const [px, py] = coords[i - 1];
      const cx = (px + x) / 2;
      return `C ${cx},${py} ${cx},${y} ${x},${y}`;
    })
    .join(" ");
  return { d, coords };
}

export function ActivityChart() {
  const w = 560;
  const h = 170;
  const max = 28;
  const c = path(activitySeries.completed, w, h, max);
  const r = path(activitySeries.created, w, h, max);
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Project activity chart">
        {[7, 14, 21, 28].map((g) => (
          <line key={g} x1={0} x2={w} y1={h - (g / max) * (h - 8) - 4} y2={h - (g / max) * (h - 8) - 4} stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth={1} />
        ))}
        <path d={`${c.d} L ${w},${h} L 0,${h} Z`} fill="url(#fillBlue)" opacity={0.35} />
        <path d={`${r.d} L ${w},${h} L 0,${h} Z`} fill="url(#fillPurple)" opacity={0.25} />
        <path d={c.d} fill="none" stroke="#3B82F6" strokeWidth={2.2} strokeLinecap="round" />
        <path d={r.d} fill="none" stroke="#8B5CF6" strokeWidth={2.2} strokeLinecap="round" />
        <defs>
          <linearGradient id="fillBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillPurple" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex justify-between text-[11px] text-slate-400">
        {activitySeries.labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}
