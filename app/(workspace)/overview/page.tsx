import { Topbar } from "@/components/shell/Topbar";
import { ActivityChart } from "@/components/product/ActivityChart";
import { TaskPanel } from "@/components/product/TaskPanel";
import { Card } from "@/components/ui/primitives";
import { deadlines } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export default function OverviewPage() {
  return (
    <>
      <Topbar crumbs={["Dashboard", "Overview"]} />
      <main className="mx-auto max-w-6xl space-y-4 p-4 sm:p-6">
        <Reveal>
          <h1 className="text-[22px] font-bold tracking-tight">Good morning, Alex</h1>
          <p className="text-sm text-muted dark:text-muteddark">Here&apos;s what&apos;s happening today.</p>
        </Reveal>

        <Reveal lines className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: "circle-check", tint: "bg-blue-500/15 text-blue-500", value: "24", label: "Tasks", delta: "↑ 12% from last week", good: true },
            { icon: "calendar", tint: "bg-violet-500/15 text-violet-500", value: "08", label: "Due", delta: "↓ 3% from last week", good: false },
            { icon: "wallet", tint: "bg-emerald-500/15 text-emerald-500", value: "$42k", label: "Revenue", delta: "↑ 18% from last week", good: true },
          ].map((s, i) => (
            <div key={s.label} className={`t-stagger-line t-stagger-line--${Math.min(i + 1, 6)}`}>
            <Card className="flex items-center gap-4 p-5">
              <span className={`grid h-11 w-11 place-items-center rounded-full ${s.tint}`}>
                <Icon name={s.icon} size={20} />
              </span>
              <span>
                <span className="block text-2xl font-bold leading-none">{s.value}</span>
                <span className="mt-1 block text-[13px] text-muted dark:text-muteddark">{s.label}</span>
                <span className={`mt-1 block text-xs font-medium ${s.good ? "text-emerald-500" : "text-amber-500"}`}>{s.delta}</span>
              </span>
            </Card>
            </div>
          ))}
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-5">
          <Card className="p-5 lg:col-span-3">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">Project activity</h2>
              <span className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Completed</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-violet-500" /> Created</span>
              </span>
            </div>
            <ActivityChart />
          </Card>
          <Card className="p-5 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">Upcoming deadlines</h2>
              <a href="/projects" className="text-xs font-medium text-info hover:underline">View all</a>
            </div>
            <ul className="space-y-3.5">
              {deadlines.map((d) => (
                <li key={d.id} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: d.color }} />
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-medium">{d.title}</span>
                    <span className="block text-xs text-slate-400">{d.project}</span>
                  </span>
                  <span className="ml-auto shrink-0 text-xs text-slate-400">{d.when}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-[15px] font-semibold">Trial status</h2>
            <p className="mt-1 text-[13px] text-slate-500">Pro trial ends in 6 days. Upgrade to keep analytics and unlimited projects.</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-amber-400 to-orange-400" />
            </div>
            <div className="mt-3 flex gap-2">
              <a href="/settings" className="rounded-lg bg-accentdeep px-4 py-2 text-[13px] font-semibold text-white">Upgrade plan</a>
              <a href="/settings" className="rounded-lg border border-line px-4 py-2 text-[13px] font-medium dark:border-linedark">View usage</a>
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="text-[15px] font-semibold">Invite pending</h2>
            <p className="mt-1 text-[13px] text-slate-500">sofia@nova.io hasn&apos;t accepted yet. Resend or copy the invite link.</p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg bg-slate-900 px-4 py-2 text-[13px] font-semibold text-white dark:bg-white dark:text-slate-900">Resend invite</button>
              <button className="rounded-lg border border-line px-4 py-2 text-[13px] font-medium dark:border-linedark">Copy link</button>
            </div>
          </Card>
        </div>
      </main>
      <TaskPanel />
    </>
  );
}
