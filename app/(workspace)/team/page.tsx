import { Topbar } from "@/components/shell/Topbar";
import { Badge, Button, Card } from "@/components/ui/primitives";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { users } from "@/lib/data";

export default function TeamPage() {
  return (
    <>
      <Topbar crumbs={["Workspace", "Team"]} />
      <main className="mx-auto max-w-6xl space-y-4 p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight">Team</h1>
          <Button className="ml-auto"><Icon name="user-plus" size={15} /> Invite teammate</Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((u) => (
            <Card key={u.id} className="flex items-center gap-3 p-4">
              <Image src={u.avatar} alt={`${u.name} profile photo`} width={44} height={44} loading="lazy" priority={false} className="h-11 w-11 rounded-full object-cover" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{u.name}</span>
                <span className="block truncate text-xs text-slate-400">{u.role} · {u.email}</span>
              </span>
              <Badge tone={u.id === "u-alex" ? "purple" : "green"} className="ml-auto">{u.id === "u-alex" ? "Owner" : "Member"}</Badge>
            </Card>
          ))}
        </div>
        <Card className="border-dashed p-5">
          <h2 className="text-sm font-semibold">Pending invite</h2>
          <p className="mt-1 text-[13px] text-slate-500">sofia@nova.io — sent 2 days ago, expires in 5 days.</p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="secondary">Resend</Button>
            <Button size="sm" variant="ghost">Revoke</Button>
          </div>
        </Card>
      </main>
    </>
  );
}
