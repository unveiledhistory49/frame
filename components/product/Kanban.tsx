"use client";

import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/primitives";
import { tasks, userById, type Task, type TaskStatus } from "@/lib/data";
import { useUI } from "@/lib/store";
import { cx, formatDate } from "@/lib/utils";
import { useState } from "react";

const cols: { id: TaskStatus; label: string; color: string }[] = [
  { id: "backlog", label: "Backlog", color: "text-slate-500" },
  { id: "progress", label: "In Progress", color: "text-info" },
  { id: "review", label: "Review", color: "text-pink-500" },
  { id: "done", label: "Done", color: "text-success" },
];

const labelTone: Record<Task["label"], "purple" | "blue" | "green" | "amber" | "slate"> = {
  Design: "purple",
  Development: "blue",
  Content: "green",
  Marketing: "amber",
  Technical: "slate",
};

export function Kanban({ projectId, compact }: { projectId: string; compact?: boolean }) {
  const [items, setItems] = useState<Task[]>(tasks.filter((t) => t.projectId === projectId));
  const setActiveTaskId = useUI((s) => s.setActiveTaskId);
  const pushToast = useUI((s) => s.pushToast);
  const [dragId, setDragId] = useState<string | null>(null);

  const move = (id: string, status: TaskStatus) => {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return (
    <div className="grid auto-cols-[260px] grid-flow-col gap-3 overflow-x-auto pb-2 nice-scroll">
      {cols.map((c) => {
        const list = items.filter((t) => t.status === c.id);
        return (
          <div
            key={c.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragId) {
                move(dragId, c.id);
                pushToast({ title: "Task moved", body: `Moved to ${c.label}.` });
                setDragId(null);
              }
            }}
            className="rounded-card border border-line bg-slate-50/60 p-3 dark:border-linedark dark:bg-white/[0.03]"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className={cx("text-[13px] font-semibold", c.color)}>{c.label}</h3>
              <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[11px] font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-300">
                {list.length}
              </span>
            </div>
            <div className="space-y-2.5">
              {list.map((t) => (
                <article
                  key={t.id}
                  draggable
                  onDragStart={() => setDragId(t.id)}
                  onClick={() => setActiveTaskId(t.id)}
                  className="cursor-pointer rounded-xl border border-line bg-white p-3 shadow-card transition hover:-translate-y-0.5 hover:shadow-pop dark:border-linedark dark:bg-carddark"
                >
                  <div className="flex items-center justify-between">
                    <Badge tone={labelTone[t.label]}>{t.label}</Badge>
                    <Icon name="dots" size={15} className="text-slate-300" />
                  </div>
                  <h4 className="mt-1.5 text-[13.5px] font-semibold leading-snug">{t.title}</h4>
                  {!compact && <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">{t.description}</p>}
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="flex -space-x-1.5">
                      {t.assignees.map((a) => {
                        const u = userById(a);
                        return (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={a} src={u.avatar} alt={u.name} title={u.name} className="h-6 w-6 rounded-full object-cover ring-2 ring-white dark:ring-carddark" />
                        );
                      })}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Icon name="calendar" size={12} /> {formatDate(t.due)}
                    </span>
                  </div>
                </article>
              ))}
              <button
                onClick={() => pushToast({ title: "Add task", body: "Task composer opened in demo." })}
                className="flex w-full items-center gap-1.5 rounded-xl px-2 py-2 text-[13px] text-slate-400 hover:bg-white hover:text-slate-600 dark:hover:bg-white/5"
              >
                <Icon name="plus" size={14} /> Add task
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
