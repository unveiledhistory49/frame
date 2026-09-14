import type { Metadata } from "next";
import "./globals.css";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { Toasts } from "@/components/shell/Toasts";

export const metadata: Metadata = {
  title: "Frame — Team operations workspace",
  description: "Frame is a workspace where teams manage projects, clients, documents and operational activity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('frame-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-canvas font-sans text-ink antialiased dark:bg-canvashark dark:text-slate-100">
        {children}
        <CommandPalette />
        <Toasts />
      </body>
    </html>
  );
}
