"use client";

import { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/primitives";

export default function Loading() {
  // Skeleton loader + reveal (14-skeleton-reveal): pulse while loading,
  // then cross-fade + un-blur the content over --reveal-dur. Loading.tsx
  // unmounts when real content arrives, so the reveal plays on mount.
  const skelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const skel = skelRef.current;
    if (!skel) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => skel.classList.add("is-revealed"))
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main className="mx-auto max-w-6xl space-y-4 p-6">
      <div ref={skelRef} className="t-skel space-y-4">
        <div className="t-skel-skeleton is-pulsing space-y-4" aria-hidden="true">
          <Skeleton className="h-8 w-64" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
          <Skeleton className="h-64" />
        </div>
        <div className="t-skel-content space-y-4" aria-hidden="true">
          <Skeleton className="h-8 w-64" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
          <Skeleton className="h-64" />
        </div>
      </div>
      <p className="text-sm text-slate-400">Loading dashboard… skeleton state.</p>
    </main>
  );
}
