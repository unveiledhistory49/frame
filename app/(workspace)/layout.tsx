import { Sidebar } from "@/components/shell/Sidebar";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 hidden h-screen md:block">
        <Sidebar />
      </div>
      <div className="min-w-0 flex-1">
        {/* Mobile top nav */}
        <nav className="flex items-center gap-1 overflow-x-auto border-b border-line bg-sidebar px-3 py-2 text-slate-300 md:hidden">
          {[
            ["Overview", "/overview"],
            ["Projects", "/projects"],
            ["Clients", "/clients"],
            ["Docs", "/documents"],
            ["Team", "/team"],
            ["Reports", "/reports"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="flex min-h-[44px] items-center whitespace-nowrap rounded-lg px-3 text-[13px] hover:bg-white/10">
              {label}
            </a>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
