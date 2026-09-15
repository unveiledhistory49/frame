"use client";

import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/primitives";
import { tasks, type Task, type TaskStatus } from "@/lib/data";
import { useUI } from "@/lib/store";
import { cx, formatDate } from "@/lib/utils";

const groups: { id: TaskStatus; label: string }[] = [
  { id: "backlog", label: "Backlog" },
  { id: "progress", label: "In Progress" },
  { id: "review", label: "Review" },
  { id: "done", label: "Done" },
];

const labelTone: Record<Task["label"], "purple" | "blue" | "green" | "amber" | "slate"> = {
  Design: "purple",
  Development: "blue",
  Content: "green",
  Marketing: "amber",
  Technical: "slate",
};

export function ProjectListView({ projectId }: { projectId: string }) {
  const setActiveTaskId = useUI((s) => s.setActiveTaskId);
  const list = tasks.filter((t) => t.projectId === projectId);

  return (
    <div className="min-w-0 space-y-5">
      {groups.map((g) => {
        const rows = list.filter((t) => t.status === g.id);
        return (
          <section key={g.id} aria-label={g.label} className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">{g.label}</h3>
              <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[11px] font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-300">
                {rows.length}
              </span>
            </div>
            <ul className="mt-2 overflow-hidden rounded-xl border border-line bg-white dark:border-linedark dark:bg-carddark">
              {rows.map((t) => (
                <li key={t.id} className="border-b border-line last:border-0 dark:border-linedark">
                  <button
                    onClick={() => setActiveTaskId(t.id)}
                    className="flex min-h-[48px] w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-slate-50 active:bg-slate-100 dark:hover:bg-white/5 dark:active:bg-white/10"
                  >
                    <Icon
                      name={t.status === "done" ? "circle-check" : "circle"}
                      size={18}
                      className={cx("shrink-0", t.status === "done" ? "text-success" : "text-slate-400")}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium leading-snug">{t.title}</span>
                      <span className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                        <Icon name="calendar" size={11} /> {formatDate(t.due)}
                      </span>
                    </span>
                    <Badge tone={labelTone[t.label]} className="shrink-0">{t.label}</Badge>
                  </button>
                </li>
              ))}
              {rows.length === 0 && (
                <li className="px-3 py-4 text-center text-[13px] text-slate-400">No tasks.</li>
              )}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
