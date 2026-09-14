import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function FeaturesPage() {
  const groups = [
    ["Project workspace", "List, Kanban board and Timeline over one dataset. Task panels keep context without page-hopping.", "columns"],
    ["Command interface", "Fuzzy search, grouped results, keyboard navigation and contextual actions.", "command"],
    ["Activity system", "One feed drives notifications, project history and audit — reused everywhere.", "activity"],
    ["Detail panels", "Tasks open in contextual side panels with focus management and transitions.", "panel-right"],
    ["UX states", "Empty, loading, error, offline, permission, trial and destructive flows — all designed.", "shield-check"],
    ["Billing", "Plans, usage, invoices and upgrade flows that behave like real SaaS.", "credit-card"],
  ];
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Link href="/" className="text-sm text-slate-500">← Back</Link>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Everything a real operations product needs.</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {groups.map(([t, b, icon]) => (
          <div key={t as string} className="rounded-2xl border border-line bg-white p-5 dark:border-linedark dark:bg-carddark">
            <Icon name={icon as string} size={20} className="text-accentdeep dark:text-accent" />
            <h2 className="mt-2 font-bold">{t as string}</h2>
            <p className="mt-1 text-sm text-slate-500">{b as string}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
