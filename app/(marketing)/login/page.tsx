"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "loading" | "success" | "error";

export default function LoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address, e.g. you@company.com.");
      setStatus("error");
      return;
    }
    setEmailError("");
    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      window.setTimeout(() => router.push("/overview"), 500);
    }, 700);
  }

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-md content-center px-4">
      <Link href="/" className="mb-6 text-sm text-slate-500">← Frame</Link>
      <h1 className="text-2xl font-extrabold tracking-tight">Welcome back</h1>
      <p className="mt-1 text-sm text-slate-500">Demo auth — any email signs you in.</p>
      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-3">
        <div>
          <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email <span aria-hidden="true" className="text-danger">*</span>
          </label>
          <input
            id="login-email"
            name="email"
            required
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            defaultValue="alex@acme.com"
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? "login-email-error login-status" : "login-status"}
            className="h-11 w-full rounded-xl border border-line px-4 text-sm outline-none focus:border-accent dark:border-linedark dark:bg-white/5"
          />
          {emailError && (
            <p id="login-email-error" role="alert" className="mt-1 text-[13px] text-danger">
              {emailError}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Password <span aria-hidden="true" className="text-danger">*</span>
          </label>
          <input
            id="login-password"
            name="password"
            required
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            defaultValue="password"
            aria-describedby="login-status"
            className="h-11 w-full rounded-xl border border-line px-4 text-sm outline-none focus:border-accent dark:border-linedark dark:bg-white/5"
          />
        </div>
        <p id="login-status" role="status" aria-live="polite" className="min-h-[20px] text-[13px] text-slate-500">
          {status === "loading" && "Logging you in…"}
          {status === "success" && "Logged in — taking you to your overview…"}
          {status === "error" && emailError === "" && "Something went wrong — check the form and try again."}
        </p>
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="h-11 w-full rounded-xl bg-slate-900 font-semibold text-white disabled:cursor-wait disabled:opacity-70 dark:bg-white dark:text-slate-900"
        >
          {status === "loading" ? "Logging in…" : status === "success" ? "Logged in ✓" : status === "error" ? "Try again" : "Log in"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">No account? <Link href="/signup" className="font-semibold text-accentdeep">Sign up</Link></p>
    </main>
  );
}
