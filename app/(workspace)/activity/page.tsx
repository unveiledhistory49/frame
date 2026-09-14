import { Topbar } from "@/components/shell/Topbar";
import { Card } from "@/components/ui/primitives";
import Image from "next/image";
import { activity, userById } from "@/lib/data";

export default function ActivityPage() {
  const groups: Record<string, typeof activity> = { Today: [], Yesterday: [] };
  activity.forEach((a) => groups[a.day].push(a));
  return (
    <>
      <Topbar crumbs={["Workspace", "Activity"]} />
      <main className="mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
        <h1 className="text-xl font-bold tracking-tight">Activity</h1>
        {(Object.keys(groups) as Array<"Today" | "Yesterday">).map((day) => (
          <section key={day}>
            <h2 className="mb-2 text-[13px] font-semibold text-slate-500">{day}</h2>
            <Card className="divide-y divide-line dark:divide-linedark">
              {groups[day].map((a) => {
                const u = userById(a.actorId);
                return (
                  <div key={a.id} className="flex gap-3 px-5 py-3.5">
                    <Image src={u.avatar} alt={`${u.name} profile photo`} width={32} height={32} loading="lazy" priority={false} className="h-8 w-8 rounded-full object-cover" />
                    <p className="text-sm">
                      <span className="font-medium">{a.text}</span>
                      {a.detail && <span className="block text-[13px] text-slate-500">{a.detail}</span>}
                    </p>
                    <span className="ml-auto shrink-0 text-xs text-slate-400">{a.time}</span>
                  </div>
                );
              })}
            </Card>
          </section>
        ))}
      </main>
    </>
  );
}
