"use client";

import { useState } from "react";
import { Topbar } from "@/components/shell/Topbar";
import { Badge, Button, Card } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { useUI } from "@/lib/store";

const plans = [
  { name: "Starter", price: "$12", projects: "5", members: "3", analytics: false, perms: false },
  { name: "Pro", price: "$29", projects: "∞", members: "25", analytics: true, perms: false, current: true },
  { name: "Business", price: "$79", projects: "∞", members: "∞", analytics: true, perms: true },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("Billing");
  const pushToast = useUI((s) => s.pushToast);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [unsaved, setUnsaved] = useState(false);

  return (
    <>
      <Topbar crumbs={["Workspace", "Settings"]} />
      <main className="mx-auto max-w-6xl space-y-4 p-4 sm:p-6">
        <h1 className="text-xl font-bold tracking-tight">Settings</h1>
        <div className="flex gap-1 border-b border-line dark:border-linedark">
          {["General", "Members", "Billing", "Permissions"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium ${tab === t ? "border-b-2 border-accentdeep text-accentdeep dark:text-white" : "text-slate-500"}`}>{t}</button>
          ))}
        </div>

        {tab === "Billing" && (
          <>
            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="p-5">
                <p className="text-[13px] text-slate-500">Current plan</p>
                <p className="mt-1 text-xl font-bold">Pro <Badge tone="purple" className="ml-1">Trial</Badge></p>
                <p className="mt-1 text-[13px] text-slate-500">Billing period: Sep 1 – Sep 30</p>
              </Card>
              <Card className="p-5">
                <p className="text-[13px] text-slate-500">Usage</p>
                <p className="mt-1 text-xl font-bold">18 / 25 seats</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full w-[72%] rounded-full bg-accent" /></div>
              </Card>
              <Card className="p-5">
                <p className="text-[13px] text-slate-500">Payment method</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-medium"><Icon name="credit-card" size={16} /> •••• 4242 <span className="text-xs text-slate-400">exp 08/27</span></p>
                <p className="mt-2 text-[13px] text-slate-500">Next invoice: $29 on Oct 1</p>
              </Card>
            </div>

            <Card className="overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-[11px] uppercase tracking-wider text-slate-400 dark:border-linedark">
                    <th className="px-5 py-3 font-semibold"> </th>
                    {plans.map((p) => (
                      <th key={p.name} className="px-5 py-3 font-semibold">{p.name}<span className="block text-lg normal-case text-slate-800 dark:text-white">{p.price}<span className="text-xs font-normal text-slate-400">/mo</span></span></th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line dark:divide-linedark">
                  <tr><td className="px-5 py-3 text-slate-500">Projects</td>{plans.map((p) => <td key={p.name} className="px-5 py-3">{p.projects}</td>)}</tr>
                  <tr><td className="px-5 py-3 text-slate-500">Team members</td>{plans.map((p) => <td key={p.name} className="px-5 py-3">{p.members}</td>)}</tr>
                  <tr><td className="px-5 py-3 text-slate-500">Analytics</td>{plans.map((p) => <td key={p.name} className="px-5 py-3">{p.analytics ? "✓" : "—"}</td>)}</tr>
                  <tr><td className="px-5 py-3 text-slate-500">Advanced permissions</td>{plans.map((p) => <td key={p.name} className="px-5 py-3">{p.perms ? "✓" : "—"}</td>)}</tr>
                  <tr>
                    <td className="px-5 py-3" />
                    {plans.map((p) => (
                      <td key={p.name} className="px-5 py-3">
                        {p.current ? <Badge tone="slate">Current</Badge> : <Button size="sm" onClick={() => pushToast({ title: p.name === "Business" ? "Sales contacted" : `Upgraded to ${p.name}`, body: "Test mode — no charge." })}>{p.name === "Business" ? "Contact" : "Upgrade"}</Button>}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </Card>

            <Card className="p-5">
              <h2 className="font-semibold">Billing history</h2>
              <ul className="mt-2 divide-y divide-line text-sm dark:divide-linedark">
                {[["Aug 1, 2024", "$29.00", "Paid"], ["Jul 1, 2024", "$29.00", "Paid"], ["Jun 1, 2024", "$12.00", "Paid"]].map(([d, a, s]) => (
                  <li key={d} className="flex items-center gap-3 py-2.5"><span>{d}</span><span className="ml-auto">{a}</span><Badge tone="green">{s}</Badge></li>
                ))}
              </ul>
            </Card>
          </>
        )}

        {tab === "General" && (
          <Card className="max-w-xl space-y-3 p-5">
            <h2 className="font-semibold">Workspace</h2>
            <label htmlFor="workspace-name" className="block text-sm font-medium">Workspace name</label>
            <input id="workspace-name" name="workspace-name" defaultValue="Acme Inc." autoComplete="organization" onChange={() => setUnsaved(true)} aria-describedby="workspace-unsaved-status" className="mt-1 h-11 w-full rounded-lg border border-line bg-white px-3 dark:border-linedark dark:bg-white/5" />
            <p id="workspace-unsaved-status" role="status" aria-live="polite" className="min-h-[20px] text-[13px] text-amber-600">
              {unsaved ? "Unsaved changes — remember to save before leaving." : ""}
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => { setUnsaved(false); pushToast({ title: "Settings saved" }); }}>Save changes</Button>
              <Button size="sm" variant="ghost" onClick={() => setUnsaved(false)}>Discard</Button>
            </div>
            <hr className="border-line dark:border-linedark" />
            <h3 className="text-sm font-semibold text-danger">Danger zone</h3>
            {!confirmDelete ? (
              <Button size="sm" variant="danger" onClick={() => setConfirmDelete(true)}>Delete workspace…</Button>
            ) : (
              <div className="rounded-xl border border-danger/30 bg-danger/5 p-3" role="status" aria-live="polite">
                <p className="text-[13px]">Type <b>DELETE</b> to confirm. This permanently removes projects, tasks and files.</p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="danger" onClick={() => pushToast({ title: "Workspace deleted", body: "Recoverable from trash for 30 days." })}>Confirm delete</Button>
                  <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(false)}>Cancel</Button>
                </div>
              </div>
            )}
          </Card>
        )}

        {tab === "Members" && (
          <Card className="p-5">
            <h2 className="font-semibold">Permission denied (preview)</h2>
            <p className="mt-1 text-sm text-slate-500">Viewers can&apos;t manage members. Ask an admin to upgrade your role.</p>
            <Button size="sm" variant="secondary" className="mt-3" onClick={() => pushToast({ title: "Request sent to admins" })}>Request access</Button>
          </Card>
        )}

        {tab === "Permissions" && (
          <Card className="max-w-xl space-y-2 p-5 text-sm">
            <h2 className="font-semibold">Advanced permissions</h2>
            {[["Can invite members", true], ["Can delete projects", false], ["Can manage billing", false]].map(([label, on]) => (
              <label key={label as string} className="flex items-center justify-between rounded-lg border border-line px-3 py-2.5 opacity-90 dark:border-linedark">
                <span>{label as string}</span>
                <input type="checkbox" defaultChecked={on as boolean} disabled className="h-4 w-4 accent-indigo-600" />
              </label>
            ))}
            <p className="text-[13px] text-slate-500">Available on Business. <a href="#" className="text-info hover:underline">Compare plans</a></p>
          </Card>
        )}
      </main>
    </>
  );
}
