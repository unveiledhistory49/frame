"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";
import { useUI } from "@/lib/store";

const nav = [
  { href: "/overview", label: "Overview", icon: "home" },
  { href: "/projects", label: "Projects", icon: "folder" },
  { href: "/clients", label: "Clients", icon: "users" },
  { href: "/documents", label: "Documents", icon: "file-text" },
  { href: "/team", label: "Team", icon: "user-plus" },
  { href: "/reports", label: "Reports", icon: "chart-line" },
  { href: "/activity", label: "Activity", icon: "bell" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

export function Sidebar() {
  const path = usePathname();
  const collapsed = useUI((s) => s.sidebarCollapsed);
  const setCollapsed = useUI((s) => s.setSidebarCollapsed);

  return (
    <aside
      className={cx(
        "flex h-screen shrink-0 flex-col bg-sidebar text-slate-300 transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[228px]"
      )}
    >
      <div className="flex h-16 items-center gap-2 px-4">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 font-black text-white">
          <Icon name="circle-frame" size={18} />
        </span>
        {!collapsed && (
          <span className="text-[15px] font-bold tracking-[0.18em] text-white">FRAME</span>
        )}
        <button
          aria-label="Collapse sidebar"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto hidden rounded-md p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:block"
        >
          <Icon name={collapsed ? "sidebar-right-open" : "sidebar-left-close"} size={16} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 nice-scroll">
        {!collapsed && (
          <p className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Workspace
          </p>
        )}
        {nav.slice(0, 1).map((n) => (
          <NavItem key={n.href} {...n} active={path?.startsWith(n.href)} collapsed={collapsed} />
        ))}
        {nav.slice(1, 2).map((n) => (
          <NavItem key={n.href} {...n} active={path?.startsWith(n.href)} collapsed={collapsed} />
        ))}
        <button
          onClick={() => useUI.getState().setCommandOpen(true)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
        >
          <Icon name="search" size={17} />
          {!collapsed && <span>Search</span>}
          {!collapsed && (
            <kbd className="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-slate-300">⌘K</kbd>
          )}
        </button>
        {!collapsed && (
          <p className="px-2 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Workspace
          </p>
        )}
        {collapsed && <div className="py-2" />}
        {nav.slice(1).map((n) => (
          <NavItem key={n.href} {...n} active={path?.startsWith(n.href)} collapsed={collapsed} />
        ))}
      </nav>

      <div className="p-3">
        <div className="flex items-center gap-2.5 rounded-xl bg-white/5 p-2.5 ring-1 ring-white/10">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/15 text-xs font-bold text-white">
            A
          </span>
          {!collapsed && (
            <>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold text-white">Acme Inc.</span>
                <span className="block text-[11px] text-slate-400">Workspace</span>
              </span>
              <Icon name="chevrons-up-down" size={14} className="ml-auto text-slate-500" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  href,
  label,
  icon,
  active,
  collapsed,
}: {
  href: string;
  label: string;
  icon: string;
  active?: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
      )}
      title={collapsed ? label : undefined}
    >
      <Icon name={icon} size={17} />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
