"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useUI } from "@/lib/store";
import { cx } from "@/lib/utils";

const statuses = [
  { id: "backlog", label: "Backlog" },
  { id: "progress", label: "In Progress" },
  { id: "review", label: "Review" },
  { id: "done", label: "Done" },
] as const;

const labels = ["Design", "Development", "Content", "Marketing", "Technical"] as const;

export function FilterSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pushToast = useUI((s) => s.pushToast);
  const [selStatuses, setSelStatuses] = useState<string[]>([]);
  const [selLabels, setSelLabels] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const toggle = (list: string[], v: string, set: (n: string[]) => void) => {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 transition-opacity"
        style={{ transitionDuration: "var(--duration-slow)", transitionTimingFunction: "var(--ease-smooth-out)" }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter tasks"
        className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-line bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-pop transition-transform dark:border-linedark dark:bg-carddark"
        style={{ transitionDuration: "var(--duration-slow)", transitionTimingFunction: "var(--ease-smooth-out)" }}
      >
        <div aria-hidden="true" className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200 dark:bg-white/15" />
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Filter tasks</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid min-h-[44px] min-w-[44px] place-items-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        <h3 className="mt-3 text-[13px] font-semibold text-slate-600 dark:text-slate-300">Status</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {statuses.map((s) => {
            const active = selStatuses.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggle(selStatuses, s.id, setSelStatuses)}
                aria-pressed={active}
                className={cx(
                  "min-h-[44px] rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                  active
                    ? "border-accentdeep bg-accentdeep/10 text-accentdeep dark:border-accent dark:text-white"
                    : "border-line text-slate-600 dark:border-linedark dark:text-slate-300"
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <h3 className="mt-4 text-[13px] font-semibold text-slate-600 dark:text-slate-300">Labels</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {labels.map((l) => {
            const active = selLabels.includes(l);
            return (
              <button
                key={l}
                onClick={() => toggle(selLabels, l, setSelLabels)}
                aria-pressed={active}
                className={cx(
                  "min-h-[44px] rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                  active
                    ? "border-accentdeep bg-accentdeep/10 text-accentdeep dark:border-accent dark:text-white"
                    : "border-line text-slate-600 dark:border-linedark dark:text-slate-300"
                )}
              >
                {l}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => {
              setSelStatuses([]);
              setSelLabels([]);
            }}
            className="min-h-[44px] flex-1 rounded-xl border border-line px-4 text-sm font-medium text-slate-600 dark:border-linedark dark:text-slate-200"
          >
            Clear
          </button>
          <button
            onClick={() => {
              onClose();
              pushToast({ title: "Filters applied" });
            }}
            className="min-h-[44px] flex-1 rounded-xl bg-accentdeep px-4 text-sm font-semibold text-white dark:bg-accent"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
