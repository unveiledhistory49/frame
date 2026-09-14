"use client";

import { useState } from "react";
import Link from "next/link";
import { Topbar } from "@/components/shell/Topbar";
import { TaskPanel } from "@/components/product/TaskPanel";
import { Badge, Button, Card, EmptyState, Input, Skeleton } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { projects } from "@/lib/data";
import { useUI } from "@/lib/store";

const statusTone: Record<string, "blue" | "purple" | "amber" | "green"> = {
  "In Progress": "blue",
  Planning: "purple",
  "On Hold": "amber",
  Completed: "green",
};

export default function ProjectsPage() {
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const [loading] = useState(false);
  const pushToast = useUI((s) => s.pushToast);

  const list = projects.filter(
    (p) =>
      (tab === "All" || (tab === "Active" ? p.status !== "Completed" : p.status === "Completed")) &&
      (!q || p.name.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <Topbar crumbs={["Workspace", "Projects"]} />
      <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight">Projects</h1>
          <span className="ml-auto" />
          <Button onClick={() => pushToast({ title: "New project", body: "Project composer opened in demo." })}>
            <Icon name="plus" size={15} /> New project
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {["All", "Active", "Completed"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${tab === t ? "bg-accentdeep text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300"}`}
            >
              {t}
            </button>
          ))}
          <div className="ml-auto w-full max-w-xs">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects…" />
          </div>
        </div>

        <Card className="mt-4 overflow-hidden">
          <div className="hidden grid-cols-[1.4fr_1fr_0.8fr_1fr_0.7fr] gap-3 border-b border-line px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:grid dark:border-linedark">
            <span>Name</span><span>Client</span><span>Status</span><span>Progress</span><span className="text-right">Due date</span>
          </div>
          {loading ? (
            <div className="space-y-2 p-5">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-12" />)}</div>
          ) : list.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title={q ? `No results for “${q}”` : "No projects yet"}
                body={q ? "Try a different search or clear the filter." : "Create your first project to get the workspace moving."}
                action={<Button onClick={() => pushToast({ title: "New project" })}>Create project</Button>}
              />
            </div>
          ) : (
            <ul className="divide-y divide-line dark:divide-linedark">
              {list.map((p) => (
                <li key={p.id}>
                  <Link href={`/projects/${p.id}`} className="grid gap-2 px-5 py-3.5 transition hover:bg-slate-50 sm:grid-cols-[1.4fr_1fr_0.8fr_1fr_0.7fr] sm:items-center sm:gap-3 dark:hover:bg-white/5">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-[13px] text-slate-500">{p.client}</span>
                    <span><Badge tone={statusTone[p.status]}>{p.status}</Badge></span>
                    <span className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{p.progress}%</span>
                      <span className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                        <span className="block h-full rounded-full bg-gradient-to-r from-accentdeep to-accent" style={{ width: `${p.progress}%` }} />
                      </span>
                    </span>
                    <span className="text-[13px] text-slate-500 sm:text-right">{p.due}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="mt-4 border-dashed p-5">
          <h2 className="text-sm font-semibold">Archived project</h2>
          <p className="mt-1 text-[13px] text-slate-500">“Brand refresh 2023” was archived on Aug 30. Archived projects stay out of search until restored.</p>
          <div className="mt-3 flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => pushToast({ title: "Project restored" })}>Restore</Button>
            <Button variant="ghost" size="sm" onClick={() => pushToast({ title: "Deleted", body: "Moved to trash for 30 days." })}>Delete permanently</Button>
          </div>
        </Card>
      </main>
      <TaskPanel />
    </>
  );
}
