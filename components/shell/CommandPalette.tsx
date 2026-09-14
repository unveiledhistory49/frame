"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { projects, users } from "@/lib/data";
import { useUI } from "@/lib/store";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const open = useUI((s) => s.commandOpen);
  const setOpen = useUI((s) => s.setCommandOpen);
  const pushToast = useUI((s) => s.pushToast);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open ]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const proj = projects
      .filter((p) => !needle || p.name.toLowerCase().includes(needle))
      .map((p) => ({ kind: "Project", title: p.name, sub: p.client, id: p.id, icon: "folder" }));
    const people = users
      .filter((u) => !needle || u.name.toLowerCase().includes(needle))
      .slice(0, 3)
      .map((u) => ({ kind: "Team member", title: u.name, sub: u.role, id: u.id, icon: "user" }));
    const clients = [{ kind: "Client", title: "Acme Corp", sub: "Client", id: "c-acme", icon: "users" }].filter(
      (c) => !needle || c.title.toLowerCase().includes(needle)
    );
    return { proj, people, clients };
  }, [q]);

  const actions = [
    { title: "Create project", icon: "circle-plus", key: "N" },
    { title: "Invite teammate", icon: "user-plus", key: "I" },
    { title: "Create task", icon: "plus", key: "T" },
  ];

  const flat: Array<{ title: string; sub?: string; go?: string; toast?: string }> = [
    ...results.proj.map((p) => ({ title: p.title, sub: p.kind, go: `/projects/${p.id}` })),
    ...results.people.map((p) => ({ title: p.title, sub: p.kind, go: "/team" })),
    ...results.clients.map((p) => ({ title: p.title, sub: p.kind, go: "/clients/c-acme" })),
    ...actions.map((a) => ({ title: a.title, sub: "Action", toast: a.title })),
  ];

  if (!open) return null;

  const choose = (i: number) => {
    const item = flat[i];
    if (!item) return;
    setOpen(false);
    if (item.go) router.push(item.go);
    else if (item.toast) pushToast({ title: item.toast, body: "Created in the demo workspace." });
  };

  return (
    <div className="fixed inset-0 z-50 anim-fade" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
      <div className="anim-pop relative mx-auto mt-[10vh] w-[min(560px,92vw)] overflow-hidden rounded-2xl border border-line bg-white shadow-pop dark:border-linedark dark:bg-carddark">
        <div className="flex items-center gap-2 border-b border-line px-4 dark:border-linedark">
          <Icon name="search" size={16} className="text-slate-400" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setIdx(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setIdx((i) => Math.min(i + 1, flat.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setIdx((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter") {
                choose(idx);
              }
            }}
            placeholder="Search anything…"
            className="h-12 w-full bg-transparent text-[15px] outline-none placeholder:text-slate-400"
          />
          <kbd className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-500 dark:bg-white/10">⌘ K</kbd>
        </div>
        <div className="max-h-[46vh] overflow-y-auto p-2 nice-scroll">
          {q.trim() === "" || results.proj.length + results.people.length > 0 ? (
            <>
              <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Recent</p>
              {results.proj.slice(0, 1).map((p) => (
                <Row key={p.id} icon={p.icon} title={p.title} sub={p.kind} active={flat.findIndex((f) => f.title === p.title) === idx} onPick={() => choose(flat.findIndex((f) => f.title === p.title))} />
              ))}
              {results.people.slice(0, 1).map((p) => (
                <Row key={p.id} icon={p.icon} title={p.title} sub={p.kind} active={flat.findIndex((f) => f.title === p.title) === idx} onPick={() => choose(flat.findIndex((f) => f.title === p.title))} />
              ))}
              {results.clients.map((p) => (
                <Row key={p.id} icon={p.icon} title={p.title} sub={p.kind} active={flat.findIndex((f) => f.title === p.title) === idx} onPick={() => choose(flat.findIndex((f) => f.title === p.title))} />
              ))}
              <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Actions</p>
              {actions.map((a) => (
                <Row key={a.title} icon={a.icon} title={a.title} sub="" kbd={a.key} active={flat.findIndex((f) => f.title === a.title) === idx} onPick={() => choose(flat.findIndex((f) => f.title === a.title))} />
              ))}
            </>
          ) : (
            <div className="px-4 py-10 text-center">
              <p className="text-sm font-semibold">No results for “{q}”</p>
              <p className="mt-1 text-[13px] text-slate-500">Try a project, person, or action like “Create task”.</p>
            </div>
          )}
        </div>
        <div className="border-t border-line px-4 py-2.5 text-[11px] text-slate-400 dark:border-linedark">
          Use ↑↓ to navigate · ↵ to select · esc to close
        </div>
      </div>
    </div>
  );
}

function Row({ icon, title, sub, kbd, active, onPick }: { icon: string; title: string; sub: string; kbd?: string; active?: boolean; onPick: () => void }) {
  return (
    <button
      onClick={onPick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${active ? "bg-slate-100 dark:bg-white/10" : "hover:bg-slate-50 dark:hover:bg-white/5"}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-500/15 text-violet-500">
        <Icon name={icon} size={16} />
      </span>
      <span>
        <span className="block font-medium text-slate-800 dark:text-slate-100">{title}</span>
        {sub && <span className="block text-xs text-slate-400">{sub}</span>}
      </span>
      {kbd && <kbd className="ml-auto rounded bg-slate-100 px-1.5 text-[11px] dark:bg-white/10">⌘ {kbd}</kbd>}
    </button>
  );
}
