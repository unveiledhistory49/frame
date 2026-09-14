import { cx } from "@/lib/utils";
import React from "react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 active:scale-[0.98]";
  const sizes = {
    sm: "h-8 px-3 text-[13px]",
    md: "h-9 px-4 text-sm",
    lg: "h-11 px-6 text-[15px]",
  };
  const variants = {
    primary:
      "bg-accentdeep text-white hover:bg-accent shadow-sm dark:bg-accent dark:hover:bg-accentdeep",
    secondary:
      "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15",
    ghost:
      "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10",
    danger: "bg-danger text-white hover:brightness-110",
    outline:
      "border border-line text-slate-700 hover:bg-slate-50 dark:border-linedark dark:text-slate-200 dark:hover:bg-white/5",
  };
  return (
    <button className={cx(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "slate",
  className,
}: {
  children: React.ReactNode;
  tone?: "slate" | "blue" | "green" | "purple" | "amber" | "red" | "pink";
  className?: string;
}) {
  const tones: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200",
    blue: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
    green: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
    purple: "bg-violet-500/20 text-violet-600 dark:text-violet-300",
    amber: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
    red: "bg-red-500/15 text-red-600 dark:text-red-300",
    pink: "bg-pink-500/15 text-pink-600 dark:text-pink-300",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-card border border-line bg-card shadow-card dark:border-linedark dark:bg-carddark",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cx(
        "h-9 w-full rounded-lg border border-line bg-white px-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-linedark dark:bg-white/5 dark:text-slate-100",
        props.className
      )}
    />
  );
}

export function Avatar({
  src,
  name,
  size = 28,
}: {
  src?: string;
  name: string;
  size?: number;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover ring-2 ring-white dark:ring-carddark"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-accent/15 font-semibold text-accent"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {name.slice(0, 1)}
    </span>
  );
}

export function AvatarStack({ urls, names }: { urls: string[]; names: string[] }) {
  return (
    <span className="flex -space-x-2">
      {urls.map((u, i) => (
        <Avatar key={i} src={u} name={names[i] ?? "?"} size={24} />
      ))}
    </span>
  );
}

export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-line px-6 py-14 text-center dark:border-linedark">
      {icon}
      <h3 className="mt-3 text-[15px] font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted dark:text-muteddark">{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cx("animate-pulse rounded-lg bg-slate-200/80 dark:bg-white/10", className)} />
  );
}
