"use client";

// Mobile navigation chrome for the workspace.
// Contract: bottom tab bar (exactly 5 destinations) + left slide-over drawer.
// The drawer opens via the "More"/"Menu" tab below, or via a top-bar button
// that dispatches `window.dispatchEvent(new CustomEvent('frame:menu-open'))`.
// MobileNav listens for that 'frame:menu-open' event. Backdrop click + Esc
// closes the drawer. No zoom disabling anywhere (pinch-zoom keeps working).

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";
import { useUI } from "@/lib/store";

export const MENU_OPEN_EVENT = "frame:menu-open";

const DRAWER_LINKS = [
  { href: "/overview", label: "Overview", icon: "home" },
  { href: "/projects", label: "Projects", icon: "folder" },
  { href: "/clients", label: "Clients", icon: "users" },
  { href: "/documents", label: "Documents", icon: "file-text" },
  { href: "/team", label: "Team", icon: "user-plus" },
  { href: "/reports", label: "Reports", icon: "chart-line" },
  { href: "/activity", label: "Activity", icon: "bell" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

export function MobileNav() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    window.addEventListener(MENU_OPEN_EVENT, openMenu);
    return () => window.removeEventListener(MENU_OPEN_EVENT, openMenu);
  }, [openMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  // Close the drawer on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  const homeActive = path?.startsWith("/overview") ?? false;
  const projectsActive = path?.startsWith("/projects") ?? false;
  const activityActive = path?.startsWith("/activity") ?? false;

  const tabClass = (active: boolean) =>
    cx(
      "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-medium transition-colors",
      active ? "text-white" : "text-slate-400 hover:text-white"
    );

  return (
    <>
      {/* Bottom tab bar: exactly 5 destinations, mobile only. */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-sidebar text-slate-300 md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid h-16 grid-cols-5 gap-1 px-2">
          <Link
            href="/overview"
            aria-label="Home"
            aria-current={homeActive ? "page" : undefined}
            className={tabClass(homeActive)}
          >
            <Icon name="home" size={20} />
            <span>Home</span>
          </Link>
          <Link
            href="/projects"
            aria-label="Projects"
            aria-current={projectsActive ? "page" : undefined}
            className={tabClass(projectsActive)}
          >
            <Icon name="folder" size={20} />
            <span>Projects</span>
          </Link>
          <button
            type="button"
            aria-label="Search"
            onClick={() => useUI.getState().setCommandOpen(true)}
            className={tabClass(false)}
          >
            <Icon name="search" size={20} />
            <span>Search</span>
          </button>
          <Link
            href="/activity"
            aria-label="Activity, has unread notifications"
            aria-current={activityActive ? "page" : undefined}
            className={tabClass(activityActive)}
          >
            <span className="relative">
              <Icon name="bell" size={20} />
              <span
                aria-hidden="true"
                className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-danger ring-2 ring-[#0B1220]"
              />
            </span>
            <span>Activity</span>
          </Link>
          {/* Labeled menu tab (not a bare hamburger): visible "Menu" text. */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={openMenu}
            className={tabClass(menuOpen)}
          >
            <Icon name="menu" size={20} />
            <span>Menu</span>
          </button>
        </div>
      </nav>

      {/* Drawer backdrop, mobile only. */}
      <div
        aria-hidden={!menuOpen}
        onClick={closeMenu}
        className={cx(
          "fixed inset-0 z-40 bg-black/60 md:hidden",
          menuOpen ? "block" : "hidden"
        )}
      />

      {/* Drawer panel: left slide-over, mobile only. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
        className={cx(
          "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-sidebar text-slate-300 md:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        style={{
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          transitionProperty: "transform",
          transitionDuration: "var(--duration-slow)",
          transitionTimingFunction: "var(--ease-smooth-out)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="flex h-16 items-center gap-2 px-4">
          <span className="text-[15px] font-bold tracking-[0.18em] text-white">MENU</span>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            className="ml-auto grid min-h-[44px] min-w-[44px] place-items-center rounded-md p-3 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <Icon name="x" size={18} />
          </button>
        </div>
        <nav aria-label="Menu" className="flex-1 space-y-1 overflow-y-auto px-3">
          {DRAWER_LINKS.map((n) => {
            const active = path?.startsWith(n.href) ?? false;
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                tabIndex={menuOpen ? 0 : -1}
                className={cx(
                  "flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-sm transition-colors",
                  active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon name={n.icon} size={17} />
                <span>{n.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-3">
          <div className="flex items-center gap-2.5 rounded-xl bg-white/5 p-2.5 ring-1 ring-white/10">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/15 text-xs font-bold text-white">
              A
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-semibold text-white">Acme Inc.</span>
              <span className="block text-[11px] text-slate-400">Workspace</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
