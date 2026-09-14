"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/primitives";

const steps = ["Create workspace", "About your team", "What are you working on?", "Invite teammates", "Create first project"];

export default function OnboardingPage() {
  const [i, setI] = useState(0);
  const router = useRouter();
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-xl content-center px-4">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Frame onboarding</p>
      <div className="mt-4 flex gap-1.5">
        {steps.map((_, n) => (
          <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= i ? "bg-accentdeep" : "bg-slate-200 dark:bg-white/10"}`} />
        ))}
      </div>
      <h1 className="mt-6 text-center text-2xl font-extrabold tracking-tight">{steps[i]}</h1>
      <div className="mt-6 rounded-2xl border border-line bg-white p-6 dark:border-linedark dark:bg-carddark">
        {i === 0 && <input defaultValue="Acme Inc." className="h-11 w-full rounded-xl border border-line px-4 text-sm dark:border-linedark dark:bg-white/5" aria-label="Workspace name" />}
        {i === 1 && (
          <div className="grid grid-cols-3 gap-2">
            {["2–10", "11–50", "50+"].map((s) => (
              <button key={s} className="rounded-xl border border-line py-4 text-sm font-semibold hover:border-accent dark:border-linedark">{s}</button>
            ))}
          </div>
        )}
        {i === 2 && (
          <div className="grid grid-cols-2 gap-2">
            {["Product", "Marketing", "Engineering", "Operations"].map((s) => (
              <button key={s} className="rounded-xl border border-line py-4 text-sm font-semibold hover:border-accent dark:border-linedark">{s}</button>
            ))}
          </div>
        )}
        {i === 3 && <input placeholder="teammate@company.com" className="h-11 w-full rounded-xl border border-line px-4 text-sm dark:border-linedark dark:bg-white/5" aria-label="Invite email" />}
        {i === 4 && <input defaultValue="Website redesign" className="h-11 w-full rounded-xl border border-line px-4 text-sm dark:border-linedark dark:bg-white/5" aria-label="Project name" />}
        <div className="mt-5 flex justify-between">
          <Button variant="ghost" onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0}>Back</Button>
          {i < steps.length - 1 ? (
            <Button onClick={() => setI((v) => v + 1)}>Continue</Button>
          ) : (
            <Button onClick={() => router.push("/overview")}>Enter dashboard →</Button>
          )}
        </div>
      </div>
      <p className="mt-4 text-center text-[13px] text-slate-400">Visually distinct from the core app — focused, single-column, progress-led.</p>
    </main>
  );
}
