import { Skeleton } from "@/components/ui/primitives";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl space-y-4 p-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
      <Skeleton className="h-64" />
      <p className="text-sm text-slate-400">Loading dashboard… skeleton state.</p>
    </main>
  );
}
