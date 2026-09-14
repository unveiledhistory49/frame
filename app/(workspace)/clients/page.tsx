import { Topbar } from "@/components/shell/Topbar";
import { TaskPanel } from "@/components/product/TaskPanel";
import { Badge, Button, Card, Input } from "@/components/ui/primitives";
import { clients } from "@/lib/data";
import Link from "next/link";

export default function ClientsPage() {
  return (
    <>
      <Topbar crumbs={["Workspace", "Clients"]} />
      <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight">Clients</h1>
          <Button className="ml-auto"><span className="text-lg leading-none">+</span> New Client</Button>
        </div>
        <div className="mt-4 max-w-md"><Input placeholder="Search clients…" /></div>
        <Card className="mt-4 overflow-hidden">
          <div className="hidden grid-cols-[1.4fr_1.4fr_0.6fr_0.7fr] gap-3 border-b border-line px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:grid dark:border-linedark">
            <span>Name</span><span>Contact</span><span>Projects</span><span className="text-right">Status</span>
          </div>
          <ul className="divide-y divide-line dark:divide-linedark">
            {clients.map((c) => (
              <li key={c.id}>
                <Link href={`/clients/${c.id}`} className="grid gap-1 px-5 py-3.5 hover:bg-slate-50 sm:grid-cols-[1.4fr_1.4fr_0.6fr_0.7fr] sm:items-center dark:hover:bg-white/5">
                  <span className="flex items-center gap-2.5 font-medium">
                    <span className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold text-white" style={{ background: c.avatarColor }}>{c.name[0]}</span>
                    {c.name}
                  </span>
                  <span className="text-[13px] text-slate-500">{c.contact}</span>
                  <span className="text-[13px]">{c.projects}</span>
                  <span className="sm:text-right"><Badge tone={c.status === "Active" ? "green" : "slate"}>{c.status}</Badge></span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </main>
      <TaskPanel />
    </>
  );
}
