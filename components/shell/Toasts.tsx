"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useUI } from "@/lib/store";

export function Toasts() {
  const toasts = useUI((s) => s.toasts);
  const dismiss = useUI((s) => s.dismissToast);
  const [closingIds, setClosingIds] = useState<Set<string>>(new Set());
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  // Toast close (22-toast): play the 250ms close tween before removing
  // from the store, instead of unmounting instantly.
  const beginClose = useCallback(
    (id: string) => {
      if (timers.current.has(id)) return;
      setClosingIds((prev) => new Set(prev).add(id));
      const t = setTimeout(() => {
        timers.current.delete(id);
        setClosingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        dismiss(id);
      }, 250);
      timers.current.set(id, t);
    },
    [dismiss]
  );

  // Auto-dismiss: each toast gets its own 3.6s timer into beginClose.
  useEffect(() => {
    const ids = new Set(toasts.map((t) => t.id));
    toasts.forEach((t) => {
      if (!timers.current.has(t.id) && !closingIds.has(t.id)) {
        const timer = setTimeout(() => beginClose(t.id), 3600);
        timers.current.set(t.id, timer);
      }
    });
    // Clean up timers for toasts already gone from the store.
    timers.current.forEach((timer, id) => {
      if (!ids.has(id) && !closingIds.has(id)) {
        clearTimeout(timer);
        timers.current.delete(id);
      }
    });
  }, [toasts, beginClose, closingIds]);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((timer) => clearTimeout(timer));
      pending.clear();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-[min(360px,90vw)] flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          id={t.id}
          title={t.title}
          body={t.body}
          closing={closingIds.has(t.id)}
          onDismiss={() => beginClose(t.id)}
        />
      ))}
    </div>
  );
}

function ToastItem({
  id,
  title,
  body,
  closing,
  onDismiss,
}: {
  id: string;
  title: string;
  body?: string;
  closing: boolean;
  onDismiss: (id: string) => void;
}) {
  // Toast open (22-toast): mount at rest, then rAF into .is-open so the
  // 350ms rise + fade + cross-blur tween plays.
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setEntered(true))
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`t-toast pointer-events-auto flex items-start gap-3 rounded-xl border border-line bg-white p-3.5 shadow-pop dark:border-linedark dark:bg-carddark ${
        entered && !closing ? "is-open" : ""
      }`}
      role="status"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
        <Icon name="check" size={16} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{title}</span>
        {body && <span className="block truncate text-[13px] text-slate-500">{body}</span>}
      </span>
      <button onClick={() => onDismiss(id)} aria-label="Dismiss" className="ml-auto text-slate-400 hover:text-slate-700">
        <Icon name="x" size={15} />
      </button>
    </div>
  );
}
