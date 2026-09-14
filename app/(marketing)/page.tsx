import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

function MarketingNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur dark:border-linedark dark:bg-canvashark/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-[0.18em]"><span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900"><Icon name="circle-frame" size={17} /></span>FRAME</Link>
        <nav className="hidden items-center gap-5 text-sm text-slate-500 md:flex">
          <Link href="/features" className="hover:text-slate-900 dark:hover:text-white">Features</Link>
          <Link href="/pricing" className="hover:text-slate-900 dark:hover:text-white">Pricing</Link>
          <Link href="/overview" className="hover:text-slate-900 dark:hover:text-white">Live demo</Link>
        </nav>
        <span className="flex-1" />
        <Link href="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300">Log in</Link>
        <Link href="/signup" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">Start free</Link>
      </div>
    </header>
  );
}

export default function LandingPage() {
  return (
    <>
      <MarketingNav />
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="anim-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium text-slate-500 dark:border-linedark">New · Timeline view is live</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">Teamwork with a Frame around it.</h1>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-slate-500">Projects, clients, documents and activity in one calm workspace. Designed for teams that ship — not for configuring software.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/signup" className="rounded-xl bg-accentdeep px-6 py-3 text-[15px] font-semibold text-white hover:brightness-110">Start free trial</Link>
              <Link href="/overview" className="rounded-xl border border-line px-6 py-3 text-[15px] font-semibold hover:bg-slate-50 dark:border-linedark">View live demo</Link>
            </div>
            <p className="mt-4 text-[13px] text-slate-400">Free 14-day Pro trial · No credit card · Cancel anytime</p>
          </div>
          <div className="anim-pop">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/marketing/hero-dashboard.jpg" alt="Frame dashboard" className="rounded-2xl border border-line shadow-pop dark:border-linedark" />
          </div>
        </section>

        <section className="border-y border-line bg-white dark:border-linedark dark:bg-carddark">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-3">
            {[
              ["columns", "One dataset, three views", "List, Board and Timeline stay in sync — pick the representation that fits the work."],
              ["command", "Command everything", "⌘K jumps to any project, person or action. Keyboard-first by design."],
              ["bell", "Activity, not noise", "A single operational feed powers notifications, audit and project history."],
            ].map(([icon, t, b]) => (
              <div key={t}>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accentdeep dark:text-accent"><Icon name={icon} size={19} /></span>
                <h2 className="mt-3 font-bold">{t}</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/marketing/team-collab.jpg" alt="Team collaborating" className="rounded-2xl border border-line object-cover dark:border-linedark" />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Information architecture, not page sprawl.</h2>
            <p className="mt-3 leading-relaxed text-slate-500">Fourteen nav items became five destinations. Contextual work moved into the project workspace and command palette — where it belongs.</p>
            <ul className="mt-4 space-y-2 text-sm">
              {["Multi-tenant workspaces with roles", "Clients, documents and billing built in", "Empty, loading, error and offline states designed"].map((li) => (
                <li key={li} className="flex items-center gap-2"><Icon name="check" size={15} className="text-emerald-500" /> {li}</li>
              ))}
            </ul>
            <Link href="/features" className="mt-5 inline-block font-semibold text-accentdeep">Explore the product →</Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-line py-8 text-center text-[13px] text-slate-400 dark:border-linedark">Frame demo · Built per spec · Light + dark supported</footer>
    </>
  );
}
