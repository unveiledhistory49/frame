import { Topbar } from "@/components/shell/Topbar";
import { ActivityChart } from "@/components/product/ActivityChart";
import { Card } from "@/components/ui/primitives";

export default function ReportsPage() {
  return (
    <>
      <Topbar crumbs={["Workspace", "Reports"]} />
      <main className="mx-auto max-w-6xl space-y-4 p-4 sm:p-6">
        <h1 className="text-xl font-bold tracking-tight">Reports</h1>
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            ["Velocity", "18 tasks / week", "+9%"],
            ["Cycle time", "3.2 days", "-0.4d"],
            ["On-time rate", "86%", "+4pts"],
          ].map(([k, v, d]) => (
            <Card key={k} className="p-5">
              <p className="text-[13px] text-slate-500">{k}</p>
              <p className="mt-1 text-2xl font-bold">{v}</p>
              <p className="mt-1 text-xs font-medium text-emerald-500">{d} vs last period</p>
            </Card>
          ))}
        </div>
        <Card className="p-5">
          <h2 className="font-semibold">Throughput</h2>
          <p className="text-[13px] text-slate-500">Completed vs created tasks across the workspace.</p>
          <div className="mt-3"><ActivityChart /></div>
        </Card>
      </main>
    </>
  );
}
