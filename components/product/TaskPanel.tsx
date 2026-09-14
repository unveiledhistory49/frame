"use client";

import { Icon } from "@/components/ui/Icon";
import { Avatar, Badge } from "@/components/ui/primitives";
import { comments, tasks, userById } from "@/lib/data";
import { useUI } from "@/lib/store";
import { formatDateLong } from "@/lib/utils";
import { useState } from "react";

export function TaskPanel() {
  const activeId = useUI((s) => s.activeTaskId);
  const setActive = useUI((s) => s.setActiveTaskId);
  const pushToast = useUI((s) => s.pushToast);
  const [draft, setDraft] = useState("");
  const [local, setLocal] = useState<string[]>([]);
  const task = tasks.find((t) => t.id === activeId);

  if (!task) return null;
  const assignee = userById(task.assignees[0]);
  const list = comments.filter((c) => c.taskId === task.id);

  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label="Task details">
      <div className="anim-fade absolute inset-0 bg-slate-950/40" onClick={() => setActive(null)} />
      <aside className="anim-pop absolute right-0 top-0 flex h-full w-[min(420px,94vw)] flex-col overflow-hidden border-l border-line bg-white shadow-pop dark:border-linedark dark:bg-carddark">
        <div className="flex items-center justify-between px-5 pt-4">
          <Badge tone="purple">{task.label}</Badge>
          <div className="flex items-center gap-1">
            <button className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100" aria-label="More options">
              <Icon name="dots" size={16} />
            </button>
            <button onClick={() => setActive(null)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Close panel">
              <Icon name="x" size={16} />
            </button>
          </div>
        </div>
        <div className="nice-scroll flex-1 overflow-y-auto px-5 pb-5">
          <h2 className="mt-2 text-xl font-bold tracking-tight">{task.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-500">{task.description}</p>
          <div className="mt-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[13px] font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> In Review
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-slate-400">Progress</span>
              <span className="font-semibold">68%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-500 to-indigo-400" />
            </div>
          </div>
          <dl className="mt-5 space-y-3.5 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-400">Assignee</dt>
              <dd className="flex items-center gap-2 font-medium">
                <Avatar src={assignee.avatar} name={assignee.name} size={24} /> {assignee.name}
                <span className="text-xs font-normal text-slate-400">{assignee.role}</span>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-400">Due date</dt>
              <dd className="flex items-center gap-1.5 font-medium">
                <Icon name="calendar" size={15} className="text-slate-400" /> {formatDateLong(task.due)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-400">Priority</dt>
              <dd className="flex items-center gap-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> {task.priority}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-400">Labels</dt>
              <dd className="flex gap-1.5">
                <Badge tone="purple">Design</Badge>
                <Badge tone="slate">Landing page</Badge>
              </dd>
            </div>
          </dl>
          <h3 className="mt-6 flex items-center justify-between text-sm font-semibold">
            Comments <span className="rounded-md bg-slate-100 px-1.5 text-xs dark:bg-white/10">{list.length + local.length}</span>
          </h3>
          <div className="mt-3 space-y-4">
            {list.map((c) => {
              const u = userById(c.authorId);
              return (
                <div key={c.id} className="flex gap-2.5">
                  <Avatar src={u.avatar} name={u.name} size={30} />
                  <div className="min-w-0">
                    <p className="text-[13px]">
                      <span className="font-semibold">{u.name}</span>{" "}
                      <span className="text-slate-400">{c.time}</span>
                    </p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">{c.body}</p>
                    {c.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.image} alt="Attachment" className="mt-2 rounded-xl border border-line object-cover dark:border-linedark" />
                    )}
                  </div>
                </div>
              );
            })}
            {local.map((b, i) => (
              <div key={i} className="flex gap-2.5">
                <Avatar src="/images/avatars/alex-morgan.jpg" name="Alex Morgan" size={30} />
                <div>
                  <p className="text-[13px]"><span className="font-semibold">Alex Morgan</span> <span className="text-slate-400">now</span></p>
                  <p className="mt-0.5 text-[13px]">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form
          className="border-t border-line p-3 dark:border-linedark"
          onSubmit={(e) => {
            e.preventDefault();
            if (!draft.trim()) return;
            setLocal((p) => [...p, draft.trim()]);
            setDraft("");
            pushToast({ title: "Comment posted" });
          }}
        >
          <div className="flex items-center gap-2 rounded-xl border border-line bg-slate-50 px-3 dark:border-linedark dark:bg-white/5">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a comment…"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <Icon name="paperclip" size={16} className="shrink-0 text-slate-400" />
            <button type="submit" aria-label="Send comment" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accentdeep text-white">
              <Icon name="send" size={15} />
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
