"use client";

import { useEffect, useState } from "react";

/**
 * Texts-reveal entrance (transitions-dev 18-texts-reveal).
 * Mounts at rest, then rAF-flips to .is-shown so the token stagger
 * (500ms, 12px, blur 3px, 40ms stagger) plays once on load.
 */
export function Reveal({
  children,
  lines = false,
  className = "",
}: {
  children: React.ReactNode;
  lines?: boolean;
  className?: string;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setShown(true))
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!lines) {
    return (
      <div className={`t-stagger ${shown ? "is-shown" : ""} ${className}`}>
        <div className="t-stagger-line t-stagger-line--1">{children}</div>
      </div>
    );
  }
  return <div className={`t-stagger ${shown ? "is-shown" : ""} ${className}`}>{children}</div>;
}
