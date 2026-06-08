import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  return (
    <div className="w-full max-w-xl text-center space-y-4 mb-12">
      {/* Live Sync Status Indicator */}
      <div className="absolute top-6 right-6 print:hidden">
        <Badge
          variant="outline"
          className="bg-white gap-1.5 px-3 py-1.5 text-xs font-medium shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Sistem Terintegrasi Supabase
        </Badge>
      </div>

      {/* Institutional Emblem Placeholder */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm border border-slate-200">
        <Building2 className="h-7 w-7 stroke-[1.8]" />
      </div>

      {/* Text Hierarchy */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          E-Recap DKPKP
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Dinas Ketahanan Pangan, Kelautan dan Pertanian Provinsi DKI Jakarta
        </p>
      </div>
    </div>
  );
}
