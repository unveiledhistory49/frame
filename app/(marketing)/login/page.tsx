import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-md content-center px-4">
      <Link href="/" className="mb-6 text-sm text-slate-500">← Frame</Link>
      <h1 className="text-2xl font-extrabold tracking-tight">Welcome back</h1>
      <p className="mt-1 text-sm text-slate-500">Demo auth — any email signs you in.</p>
      <form action="/overview" className="mt-6 space-y-3">
        <input required type="email" placeholder="you@company.com" defaultValue="alex@acme.com" className="h-11 w-full rounded-xl border border-line px-4 text-sm outline-none focus:border-accent dark:border-linedark dark:bg-white/5" />
        <input required type="password" placeholder="Password" defaultValue="password" className="h-11 w-full rounded-xl border border-line px-4 text-sm outline-none focus:border-accent dark:border-linedark dark:bg-white/5" />
        <button className="h-11 w-full rounded-xl bg-slate-900 font-semibold text-white dark:bg-white dark:text-slate-900">Log in</button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">No account? <Link href="/signup" className="font-semibold text-accentdeep">Sign up</Link></p>
    </main>
  );
}
