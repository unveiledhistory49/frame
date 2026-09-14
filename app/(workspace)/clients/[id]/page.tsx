import Link from "next/link";
import { Topbar } from "@/components/shell/Topbar";
import { Badge, Card } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { clients, projects } from "@/lib/data";

export default function ClientDetail({ params }: { params: { id: string } }) {
  const client = clients.find((c) => c.id === params.id) ?? clients[0];
  const list = projects.filter((p) => p.clientId === client.id);
  return (
    <>
      <Topbar crumbs={["Clients", client.name]} />
      <main className="mx-auto max-w-6xl space-y-4 p-4 sm:p-6">
        <Link href="/clients" className="inline-flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-slate-800"><Icon name="arrow-left" size={14} /> All clients</Link>
        <Card className="flex flex-wrap items-center gap-4 p-6">
          <span className="grid h-12 w-12 place-items-center rounded-2xl text-lg font-bold text-white" style={{ background: client.avatarColor }}>{client.name[0]}</span>
          <span>
            <span className="block text-xl font-bold">{client.name}</span>
            <span className="block text-sm text-slate-500">{client.contact}</span>
          </span>
          <Badge tone={client.status === "Active" ? "green" : "slate"} className="ml-auto">{client.status}</Badge>
        </Card>
        <Card className="overflow-hidden">
          <h2 className="px-5 pt-4 font-semibold">Projects ({list.length || projects.length})</h2>
          <ul className="divide-y divide-line dark:divide-linedark">
            {(list.length ? list : projects.slice(0, 2)).map((p) => (
              <li key={p.id}>
                <Link href={`/projects/${p.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 dark:hover:bg-white/5">
                  <span className="font-medium">{p.name}</span>
                  <Badge tone="blue">{p.status}</Badge>
                  <span className="ml-auto text-[13px] text-slate-400">{p.progress}%</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </main>
    </>
  );
}
