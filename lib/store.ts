"use client";

import { create } from "zustand";

type Theme = "light" | "dark";

interface UIState {
  theme: Theme;
  sidebarCollapsed: boolean;
  commandOpen: boolean;
  activeTaskId: string | null;
  toasts: { id: string; title: string; body?: string }[];
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  setSidebarCollapsed: (v: boolean) => void;
  setCommandOpen: (v: boolean) => void;
  setActiveTaskId: (id: string | null) => void;
  pushToast: (t: { title: string; body?: string }) => void;
  dismissToast: (id: string) => void;
}

export const useUI = create<UIState>((set) => ({
  theme: "light",
  sidebarCollapsed: false,
  commandOpen: false,
  activeTaskId: null,
  toasts: [],
  toggleTheme: () =>
    set((s) => {
      const next = s.theme === "light" ? "dark" : "light";
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", next === "dark");
        try {
          localStorage.setItem("frame-theme", next);
        } catch {}
      }
      return { theme: next };
    }),
  setTheme: (theme) =>
    set(() => {
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
      return { theme };
    }),
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  setCommandOpen: (v) => set({ commandOpen: v }),
  setActiveTaskId: (id) => set({ activeTaskId: id }),
  pushToast: (t) =>
    set((s) => ({
      toasts: [...s.toasts, { ...t, id: Math.random().toString(36).slice(2) }],
    })),
  dismissToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
