"use client";

import { usePathname } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { Building2 } from "lucide-react";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isAuthPage) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-slate-50/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-slate-900" />
            <span className="font-black text-xl tracking-tight text-slate-900">
              SIPANGAN KPKP
            </span>
          </div>
          <DashboardHeader />
        </div>
      </header>

      {/* Main Content */}
      <main className="grow">{children}</main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 bg-slate-50 border-t border-slate-200 py-4 text-center z-40">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-2">
          <span>Dev by REY</span>
          <span className="text-slate-300">•</span>
          <a
            href="https://github.com/UnknownVisuals"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
