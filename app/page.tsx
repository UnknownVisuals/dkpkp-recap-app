import { DashboardHeader } from "@/components/dashboard-header";
import { ModuleCard } from "@/components/module-card";
import { Receipt, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12 relative select-none">
      {/* Render Subordinated Component Segments */}
      <DashboardHeader />

      {/* Action Workspace Grid Container */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2">
          <ModuleCard
            title="Surat Perintah Bayar (SPB)"
            description="Pusat pengelolaan formulir perintah pembayaran internal dinas beserta rekapitulasi data anggaran."
            href="/spb"
            icon={<Receipt className="h-7 w-7 stroke-[1.8]" />}
          />

          <ModuleCard
            title="Surat Pertanggungjawaban (SPJ)"
            description="Pencatatan realisasi dana anggaran belanja dinas disertai pengarsipan bukti kwitansi fisik."
            href="/spj"
            icon={<FileText className="h-7 w-7 stroke-[1.8]" />}
          />
        </div>
      </div>

      {/* Formal System Footer Context */}
      <div className="relative z-10 mt-16 text-[11px] font-medium uppercase tracking-wider text-slate-400 flex items-center gap-2">
        <span>Pemerintah Provinsi DKI Jakarta</span>
        <span className="text-slate-300">•</span>
        <span>Proof of Concept</span>
      </div>
    </div>
  );
}
