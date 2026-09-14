"use client";

import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { useUI } from "@/lib/store";

export function Toasts() {
  const toasts = useUI((s) => s.toasts);
  const dismiss = useUI((s) => s.dismissToast);
  useEffect(() => {
    if (!toasts.length) return;
    const t = setTimeout(() => dismiss(toasts[0].id), 3600);
    return () => clearTimeout(t);
  }, [toasts, dismiss]);
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-[min(360px,90vw)] flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className="anim-pop pointer-events-auto flex items-start gap-3 rounded-xl border border-line bg-white p-3.5 shadow-pop dark:border-linedark dark:bg-carddark">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
            <Icon name="check" size={16} />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">{t.title}</span>
            {t.body && <span className="block truncate text-[13px] text-slate-500">{t.body}</span>}
          </span>
          <button onClick={() => dismiss(t.id)} aria-label="Dismiss" className="ml-auto text-slate-400 hover:text-slate-700">
            <Icon name="x" size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
