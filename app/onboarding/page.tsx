"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/primitives";

const steps = ["Create workspace", "About your team", "What are you working on?", "Invite teammates", "Create first project"];

export default function OnboardingPage() {
  const [i, setI] = useState(0);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteError, setInviteError] = useState("");
  const router = useRouter();

  function handleContinue() {
    if (i === 3 && inviteEmail.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail.trim())) {
      setInviteError("Enter a valid email address, e.g. teammate@company.com — or leave it blank to skip.");
      return;
    }
    setInviteError("");
    setI((v) => v + 1);
  }
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-xl content-center px-4">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Frame onboarding</p>
      <div className="mt-4 flex gap-1.5">
        {steps.map((_, n) => (
          <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= i ? "bg-accentdeep" : "bg-slate-200 dark:bg-white/10"}`} />
        ))}
      </div>
      <h1 className="mt-6 text-center text-2xl font-extrabold tracking-tight">{steps[i]}</h1>
      <p aria-live="polite" role="status" className="sr-only">
        Step {i + 1} of {steps.length}: {steps[i]}
      </p>
      <div className="mt-6 rounded-2xl border border-line bg-white p-6 dark:border-linedark dark:bg-carddark">
        {i === 0 && (
          <div>
            <label htmlFor="onboarding-workspace" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Workspace name
            </label>
            <input id="onboarding-workspace" name="workspace" defaultValue="Acme Inc." placeholder="Acme Inc." autoComplete="organization" className="h-11 w-full rounded-xl border border-line px-4 text-sm dark:border-linedark dark:bg-white/5" />
          </div>
        )}
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
        {i === 3 && (
          <div>
            <label htmlFor="onboarding-invite" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Teammate email
            </label>
            <input
              id="onboarding-invite"
              name="invite"
              type="email"
              autoComplete="email"
              placeholder="teammate@company.com"
              value={inviteEmail}
              onChange={(e) => { setInviteEmail(e.target.value); if (inviteError) setInviteError(""); }}
              aria-invalid={inviteError ? true : undefined}
              aria-describedby={inviteError ? "onboarding-invite-error" : undefined}
              className="h-11 w-full rounded-xl border border-line px-4 text-sm dark:border-linedark dark:bg-white/5"
            />
            {inviteError && (
              <p id="onboarding-invite-error" role="alert" className="mt-1 text-[13px] text-danger">
                {inviteError}
              </p>
            )}
          </div>
        )}
        {i === 4 && (
          <div>
            <label htmlFor="onboarding-project" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Project name
            </label>
            <input id="onboarding-project" name="project" defaultValue="Website redesign" placeholder="Website redesign" className="h-11 w-full rounded-xl border border-line px-4 text-sm dark:border-linedark dark:bg-white/5" />
          </div>
        )}
        <div className="mt-5 flex justify-between">
          <Button variant="ghost" onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0}>Back</Button>
          {i < steps.length - 1 ? (
            <Button onClick={handleContinue}>Continue</Button>
          ) : (
            <Button onClick={() => router.push("/overview")}>Enter dashboard →</Button>
          )}
        </div>
      </div>
      <p className="mt-4 text-center text-[13px] text-slate-400">Visually distinct from the core app — focused, single-column, progress-led.</p>
    </main>
  );
}
