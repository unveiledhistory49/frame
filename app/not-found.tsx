import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid max-w-md content-center gap-3 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">404</p>
      <h1 className="text-2xl font-extrabold">Page not found</h1>
      <p className="text-sm text-slate-500">It may have been moved, archived or deleted. Deleted items stay recoverable for 30 days.</p>
      <Link href="/overview" className="mx-auto rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">Back to dashboard</Link>
    </main>
  );
}
