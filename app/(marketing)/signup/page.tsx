import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-md content-center px-4">
      <Link href="/" className="mb-6 text-sm text-slate-500">← Frame</Link>
      <h1 className="text-2xl font-extrabold tracking-tight">Create your workspace</h1>
      <p className="mt-1 text-sm text-slate-500">Free 14-day Pro trial, no card required.</p>
      <form action="/onboarding" className="mt-6 space-y-3">
        <input required placeholder="Full name" defaultValue="Alex Morgan" className="h-11 w-full rounded-xl border border-line px-4 text-sm outline-none focus:border-accent dark:border-linedark dark:bg-white/5" />
        <input required type="email" placeholder="Work email" defaultValue="alex@acme.com" className="h-11 w-full rounded-xl border border-line px-4 text-sm outline-none focus:border-accent dark:border-linedark dark:bg-white/5" />
        <button className="h-11 w-full rounded-xl bg-accentdeep font-semibold text-white">Create account</button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">Have an account? <Link href="/login" className="font-semibold text-accentdeep">Log in</Link></p>
    </main>
  );
}
