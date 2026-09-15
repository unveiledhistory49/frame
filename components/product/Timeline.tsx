"use client";

import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/primitives";
import { tasks } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const dayWidth = 46;

const statusLabel: Record<string, string> = {
  backlog: "Backlog",
  progress: "In Progress",
  review: "Review",
  done: "Done",
};

export function Timeline({ projectId }: { projectId: string }) {
  const list = tasks.filter((t) => t.projectId === projectId).slice(0, 8);
  const days = ["Sep 10", "Sep 14", "Sep 18", "Sep 22", "Sep 26"];
  return (
    <div className="min-w-0">
      {/* Mobile: vertical timeline, full-width, no horizontal scroll */}
      <div className="md:hidden">
        <ol className="relative">
          {list.map((t, i) => (
            <li key={t.id} className="relative flex gap-3 pb-4 last:pb-0">
              <span aria-hidden="true" className="flex flex-col items-center">
                <span
                  className={
                    t.status === "done"
                      ? "mt-1 h-2.5 w-2.5 rounded-full bg-success"
                      : t.status === "progress"
                        ? "mt-1 h-2.5 w-2.5 rounded-full bg-info"
                        : t.status === "review"
                          ? "mt-1 h-2.5 w-2.5 rounded-full bg-pink-500"
                          : "mt-1 h-2.5 w-2.5 rounded-full bg-slate-300"
                  }
                />
                {i < list.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-line dark:bg-linedark" />
                )}
              </span>
              <div className="min-w-0 flex-1 rounded-xl border border-line bg-white px-3 py-2.5 dark:border-linedark dark:bg-white/[0.03]">
                <p className="truncate text-sm font-semibold leading-snug">{t.title}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Icon name={t.status === "done" ? "circle-check" : "circle"} size={13} />
                    {statusLabel[t.status] ?? t.status}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Icon name="calendar" size={12} /> {formatDate(t.due)}
                  </span>
                  <Badge tone="purple" className="ml-auto">{t.label}</Badge>
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-slate-400">Timeline is a visual projection of the same task data shown in List and Board.</p>
      </div>

      {/* Desktop timeline */}
      <div className="hidden md:block">
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
      </div>
    </div>
  );
}

export { dayWidth };
