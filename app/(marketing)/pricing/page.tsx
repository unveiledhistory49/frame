import Link from "next/link";

const plans = [
  { name: "Starter", price: "$12", cta: "Start free", features: ["5 projects", "3 members", "Core views"] },
  { name: "Pro", price: "$29", cta: "Start trial", hot: true, features: ["Unlimited projects", "25 members", "Analytics + Timeline"] },
  { name: "Business", price: "$79", cta: "Contact sales", features: ["Unlimited everything", "Advanced permissions", "SSO + audit"] },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Link href="/" className="text-sm text-slate-500">← Back</Link>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Simple pricing that scales.</h1>
      <p className="mt-2 text-slate-500">Test mode — upgrading is simulated, no charge.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className={`rounded-2xl border p-6 ${p.hot ? "border-accentdeep bg-white shadow-pop dark:bg-carddark" : "border-line bg-white dark:border-linedark dark:bg-carddark"}`}>
            <h2 className="font-bold">{p.name}</h2>
            <p className="mt-1 text-3xl font-extrabold">{p.price}<span className="text-sm font-normal text-slate-400">/mo</span></p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-500">{p.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
            <Link href="/signup" className={`mt-5 block rounded-xl py-2.5 text-center text-sm font-semibold ${p.hot ? "bg-accentdeep text-white" : "border border-line dark:border-linedark"}`}>{p.cta}</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
