"use client";

export default function WorkspaceError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto grid max-w-md content-center gap-3 py-24 text-center">
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <p className="text-sm text-slate-500">The workspace hit an error. Your work is safe — try again or go back.</p>
      <div className="flex justify-center gap-2">
        <button onClick={reset} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Try again</button>
        <a href="/overview" className="rounded-lg border border-line px-4 py-2 text-sm">Dashboard</a>
      </div>
    </main>
  );
}
