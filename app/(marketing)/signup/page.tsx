"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "loading" | "success" | "error";

export default function SignupPage() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid work email, e.g. you@company.com.");
      setStatus("error");
      return;
    }
    setEmailError("");
    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      window.setTimeout(() => router.push("/onboarding"), 500);
    }, 700);
  }

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-md content-center px-4">
      <Link href="/" className="mb-6 text-sm text-slate-500">← Frame</Link>
      <h1 className="text-2xl font-extrabold tracking-tight">Create your workspace</h1>
      <p className="mt-1 text-sm text-slate-500">Free 14-day Pro trial, no card required.</p>
      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-3">
        <div>
          <label htmlFor="signup-name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Full name <span aria-hidden="true" className="text-danger">*</span>
          </label>
          <input
            id="signup-name"
            name="name"
            required
            placeholder="Full name"
            autoComplete="name"
            defaultValue="Alex Morgan"
            aria-describedby="signup-status"
            className="h-11 w-full rounded-xl border border-line px-4 text-sm outline-none focus:border-accent dark:border-linedark dark:bg-white/5"
          />
        </div>
        <div>
          <label htmlFor="signup-email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Work email <span aria-hidden="true" className="text-danger">*</span>
          </label>
          <input
            id="signup-email"
            name="email"
            required
            type="email"
            autoComplete="email"
            placeholder="Work email"
            defaultValue="alex@acme.com"
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? "signup-email-error signup-status" : "signup-status"}
            className="h-11 w-full rounded-xl border border-line px-4 text-sm outline-none focus:border-accent dark:border-linedark dark:bg-white/5"
          />
          {emailError && (
            <p id="signup-email-error" role="alert" className="mt-1 text-[13px] text-danger">
              {emailError}
            </p>
          )}
        </div>
        <p id="signup-status" role="status" aria-live="polite" className="min-h-[20px] text-[13px] text-slate-500">
          {status === "loading" && "Creating your account…"}
          {status === "success" && "Account created — taking you to onboarding…"}
          {status === "error" && emailError === "" && "Something went wrong — check the form and try again."}
        </p>
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="h-11 w-full rounded-xl bg-accentdeep font-semibold text-white disabled:cursor-wait disabled:opacity-70"
        >
          {status === "loading" ? "Creating account…" : status === "success" ? "Account created ✓" : status === "error" ? "Try again" : "Create account"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">Have an account? <Link href="/login" className="font-semibold text-accentdeep">Log in</Link></p>
    </main>
  );
}
