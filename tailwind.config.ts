import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Frame design tokens — sampled from the approved dashboard reference
        sidebar: "#0B1220",
        sidebardeep: "#070C17",
        ink: "#0F172A",
        paper: "#FFFFFF",
        canvas: "#F1F5F9",
        canvashark: "#0A0F1E",
        card: "#FFFFFF",
        carddark: "#111A2E",
        line: "#E2E8F0",
        linedark: "#1E2A45",
        muted: "#64748B",
        muteddark: "#8B98B0",
        accent: "#6366F1",
        accentdeep: "#4F46E5",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        display: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "0.875rem",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.05), 0 8px 24px -12px rgba(15,23,42,0.10)",
        pop: "0 24px 64px -16px rgba(2,6,23,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
