"use client";

import { tasks } from "@/lib/data";

const dayWidth = 46;

export function Timeline({ projectId }: { projectId: string }) {
  const list = tasks.filter((t) => t.projectId === projectId).slice(0, 8);
  const days = ["Sep 10", "Sep 14", "Sep 18", "Sep 22", "Sep 26"];
  return (
    <div className="overflow-x-auto nice-scroll">
      <div className="min-w-[640px]">
        <div className="grid" style={{ gridTemplateColumns: `180px repeat(${days.length}, 1fr)` }}>
          <div />
          {days.map((d) => (
            <div key={d} className="border-l border-line px-2 py-1 text-[11px] text-slate-400 dark:border-linedark">{d}</div>
          ))}
        </div>
        <div className="mt-1 space-y-2">
          {list.map((t, i) => {
            const start = (i * 37) % 3;
            const span = 2;
            return (
              <div key={t.id} className="grid items-center" style={{ gridTemplateColumns: `180px repeat(${days.length}, 1fr)` }}>
                <div className="truncate pr-3 text-[13px] font-medium">{t.title}</div>
                <div className="relative col-span-5 h-8">
                  <div className="absolute inset-y-1 rounded-lg bg-slate-100 dark:bg-white/5" />
                  <div
                    className="absolute inset-y-1.5 rounded-lg bg-gradient-to-r from-accentdeep to-accent shadow-sm"
                    style={{ left: `${start * 20}%`, width: `${span * 18}%` }}
                    title={`${t.title}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-slate-400">Timeline is a visual projection of the same task data shown in List and Board.</p>
      </div>
    </div>
  );
}

export { dayWidth };
