"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Topbar } from "@/components/shell/Topbar";
import { Kanban } from "@/components/product/Kanban";
import { Timeline } from "@/components/product/Timeline";
import { TaskPanel } from "@/components/product/TaskPanel";
import { Badge, Button, Card, Skeleton } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { projects, tasks, userById } from "@/lib/data";
import { useUI } from "@/lib/store";
import { cx } from "@/lib/utils";

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id) ?? projects[0];
  const [view, setView] = useState<"Overview" | "Board" | "Timeline" | "Activity">("Board");
  const [loading] = useState(false);
  const pushToast = useUI((s) => s.pushToast);
  const list = tasks.filter((t) => t.projectId === project.id);
  const views = ["Overview", "Board", "Timeline", "Activity"] as const;

  // Sliding pill (16-tabs-sliding): JS writes the active tab's offsetLeft /
  // offsetWidth onto the pill; CSS owns the 250ms tween. First position is
  // set with transition:none + reflow, then restored so the pill snaps
  // before any animation can run.
  const pillRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const firstPaint = useRef(true);

  useLayoutEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const moveTo = (animate: boolean) => {
      const tab = tabRefs.current.get(view);
      if (!tab) return;
      // Inset the pill 12px each side to match the previous static style.
      const x = tab.offsetLeft + 12;
      const w = Math.max(tab.offsetWidth - 24, 0);
      if (!animate) {
        const prev = pill.style.transition;
        pill.style.transition = "none";
        pill.style.transform = `translateX(${x}px)`;
        pill.style.width = `${w}px`;
        void pill.offsetWidth;
        pill.style.transition = prev;
      } else {
        pill.style.transform = `translateX(${x}px)`;
        pill.style.width = `${w}px`;
      }
    };
    // First paint: snap with no transition; later view changes tween.
    moveTo(!firstPaint.current);
    firstPaint.current = false;
    const onResize = () => moveTo(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [view]);

  return (
    <>
      {/* Cover */}
      <div className="relative">
        <Image src="/images/covers/project-phoenix.jpg" alt="Project Phoenix cover — mountain range at dusk" width={1536} height={512} loading="eager" priority={false} className="h-44 w-full object-cover sm:h-56" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/55 to-transparent" />
        <div className="absolute inset-x-0 top-0">
          <div className="mx-auto flex max-w-6xl items-center gap-2 p-4 text-white">
            <Link href="/projects" className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-[13px] backdrop-blur hover:bg-white/20">
              <Icon name="arrow-left" size={14} /> Projects
            </Link>
            <span className="flex-1" />
            <button onClick={() => useUI.getState().setCommandOpen(true)} className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[13px] backdrop-blur sm:flex">
              <Icon name="search" size={14} /> Search anything… <kbd className="text-[11px] opacity-70">⌘ K</kbd>
            </button>
            <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white/10"><Icon name="bell" size={16} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-400" /></span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image src="/images/avatars/alex-morgan.jpg" alt="Alex Morgan profile photo" width={36} height={36} loading="lazy" className="h-9 w-9 rounded-full object-cover" />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl p-4 sm:p-6">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-[28px]">{project.name}</h1>
            <p className="mt-0.5 text-sm text-slate-300">{project.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-[13px] text-white backdrop-blur">
                <Icon name="users" size={14} /> {project.client}
              </span>
              <span className="flex items-center gap-2 text-[13px] text-slate-200">
                <span className="grid h-5 w-5 place-items-center rounded-full border border-white/30 text-[10px]">◐</span>
                {project.progress}% complete
              </span>
              <span className="h-1.5 w-40 overflow-hidden rounded-full bg-white/20">
                <span className="block h-full rounded-full bg-gradient-to-r from-violet-400 to-indigo-300" style={{ width: `${project.progress}%` }} />
              </span>
              <span className="ml-auto flex items-center gap-2">
                <span className="flex -space-x-2">
                  {project.members.map((m) => {
                    const u = userById(m);
                    // eslint-disable-next-line @next/next/no-img-element
                    return <Image key={m} src={u.avatar} alt={`${u.name} profile photo`} title={u.name} width={28} height={28} loading="lazy" className="h-7 w-7 rounded-full object-cover ring-2 ring-white/40" />;
                  })}
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 text-[11px] font-semibold text-white ring-2 ring-white/40">+3</span>
                </span>
                <Button size="sm" variant="secondary" onClick={() => pushToast({ title: "Share link copied" })}>
                  <Icon name="share" size={14} /> Share
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-white dark:border-linedark dark:bg-canvashark">
        <div role="tablist" aria-label="Project views" className="t-tabs-underline mx-auto flex max-w-6xl gap-1 px-4 sm:px-6">
          {views.map((v) => (
            <button
              key={v}
              ref={(el) => {
                if (el) tabRefs.current.set(v, el);
                else tabRefs.current.delete(v);
              }}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={cx("relative px-4 py-3 text-sm font-medium transition-colors", view === v ? "text-accentdeep dark:text-white" : "text-slate-500 hover:text-slate-800 dark:text-slate-400")}
            >
              {v}
            </button>
          ))}
          <span ref={pillRef} aria-hidden="true" className="t-tabs-underline-pill bg-accentdeep dark:bg-accent" />
        </div>
      </div>

      <main className="mx-auto max-w-6xl space-y-4 p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm"><Icon name="columns" size={14} /> {view} <Icon name="chevron-down" size={13} /></Button>
          <span className="flex-1" />
          <Button variant="ghost" size="sm"><Icon name="filter" size={14} /> Filter</Button>
          <Button variant="ghost" size="sm"><Icon name="arrows-sort" size={14} /> Sort</Button>
          <Button variant="ghost" size="sm" onClick={() => pushToast({ title: "Task created", body: "Added to Backlog." })}><Icon name="plus" size={14} /> Add task</Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-4 gap-3">{[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-64" />)}</div>
        ) : view === "Board" ? (
          <Kanban projectId={project.id} />
        ) : view === "Timeline" ? (
          <Card className="p-5"><Timeline projectId={project.id} /></Card>
        ) : view === "Overview" ? (
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-5 lg:col-span-2">
              <h2 className="font-semibold">About this project</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{project.description}. This overview shares the same underlying tasks as Board and Timeline — three representations of one dataset.</p>
              <div className="mt-4 space-y-2">
                {list.slice(0, 4).map((t) => (
                  <div key={t.id} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-sm dark:border-linedark">
                    <Icon name={t.status === "done" ? "circle-check" : "circle"} size={16} className="text-slate-400" />
                    <span className="font-medium">{t.title}</span>
                    <Badge tone="purple" className="ml-auto">{t.label}</Badge>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <h2 className="font-semibold">Members</h2>
              <ul className="mt-3 space-y-2.5">
                {project.members.map((m) => {
                  const u = userById(m);
                  return <li key={m} className="flex items-center gap-2.5 text-sm"><Image src={u.avatar} alt={`${u.name} profile photo`} width={28} height={28} loading="lazy" className="h-7 w-7 rounded-full object-cover" /><span className="font-medium">{u.name}</span><span className="ml-auto text-xs text-slate-400">{u.role}</span></li>;
                })}
              </ul>
            </Card>
          </div>
        ) : (
          <Card className="p-5">
            <h2 className="font-semibold">Activity</h2>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex gap-2.5"><span className="mt-0.5 text-xs text-slate-400">09:42</span><p><b>Sarah</b> moved “Homepage redesign” from In Progress → Review</p></li>
              <li className="flex gap-2.5"><span className="mt-0.5 text-xs text-slate-400">09:18</span><p><b>Daniel</b> commented on API integration</p></li>
              <li className="flex gap-2.5"><span className="mt-0.5 text-xs text-slate-400">08:55</span><p>You were assigned “QA checklist”</p></li>
            </ul>
          </Card>
        )}

        <div className="flex gap-6 border-b border-line text-[13px] dark:border-linedark">
          {["Files", "Links", "Subtasks", "Dependencies"].map((t, i) => (
            <span key={t} className={i === 0 ? "border-b-2 border-accentdeep pb-2 font-semibold" : "pb-2 text-slate-400"}>{t}</span>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["landing-page-design.fig", "Figma · 2.4 MB", "folder"],
            ["hero-illustration.png", "Image · 1.2 MB", "photo"],
            ["content-draft.docx", "Word · 48 KB", "file-text"],
            ["style-guide.pdf", "PDF · 3.8 MB", "file-check"],
          ].map(([name, meta, icon]) => (
            <Card key={name} className="flex items-center gap-2.5 p-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-500/10 text-blue-500"><Icon name={icon} size={17} /></span>
              <span className="min-w-0"><span className="block truncate text-[13px] font-medium">{name}</span><span className="block text-[11px] text-slate-400">{meta}</span></span>
              <Icon name="dots" size={14} className="ml-auto text-slate-300" />
            </Card>
          ))}
        </div>
      </main>
      <TaskPanel />
    </>
  );
}
