"use client";

import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { useUI } from "@/lib/store";

export function Topbar({ title, crumbs }: { title?: string; crumbs?: string[] }) {
  const setCommandOpen = useUI((s) => s.setCommandOpen);
  const theme = useUI((s) => s.theme);
  const toggleTheme = useUI((s) => s.toggleTheme);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        useUI.getState().setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-white/80 px-4 backdrop-blur dark:border-linedark dark:bg-canvashark/80 sm:px-6">
      {crumbs && (
        <nav className="hidden items-center gap-1.5 text-[13px] text-muted md:flex dark:text-muteddark">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <Icon name="chevron-right" size={13} className="opacity-60" />}
              <span className={i === crumbs.length - 1 ? "font-medium text-slate-800 dark:text-slate-100" : ""}>{c}</span>
            </span>
          ))}
        </nav>
      )}
      <div className="flex-1" />
      <button
        onClick={() => setCommandOpen(true)}
        className="hidden h-10 w-full max-w-md items-center gap-2 rounded-full border border-line bg-slate-50 px-4 text-sm text-slate-500 transition hover:border-accent/40 hover:text-slate-700 sm:flex dark:border-linedark dark:bg-white/5 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <Icon name="search" size={16} />
        <span>Search anything…</span>
        <kbd className="ml-auto rounded-md bg-slate-200/70 px-1.5 py-0.5 text-[11px] font-semibold dark:bg-white/10">⌘ K</kbd>
      </button>
      <button
        onClick={() => setCommandOpen(true)}
        aria-label="Search"
        className="grid h-10 w-10 place-items-center rounded-full border border-line sm:hidden dark:border-linedark"
      >
        <Icon name="search" size={17} />
      </button>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="grid h-10 w-10 place-items-center rounded-full border border-line text-slate-500 transition hover:text-slate-800 dark:border-linedark dark:text-slate-300 dark:hover:text-white"
      >
        <Icon name={theme === "light" ? "moon" : "sun"} size={17} />
      </button>
      <button
        aria-label="Notifications"
        className="relative grid h-10 w-10 place-items-center rounded-full border border-line text-slate-500 dark:border-linedark dark:text-slate-300"
      >
        <Icon name="bell" size={17} />
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-danger ring-2 ring-white dark:ring-canvashark" />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/avatars/alex-morgan.jpg" alt="Alex Morgan" className="h-9 w-9 rounded-full object-cover ring-2 ring-line dark:ring-linedark" />
    </header>
  );
}
