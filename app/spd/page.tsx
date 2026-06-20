"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Database, PiggyBank } from "lucide-react";
import { SpdForm } from "@/components/spd/spd-form";
import { SpdTable } from "@/components/spd/spd-table";
import { PageHeader } from "@/components/layout/page-header";
import { PageTransition } from "@/components/page-transition";
import { useSpd } from "@/hooks/useSpd";
import { submitSpd } from "@/lib/actions/spd";
import type { SpdFormData } from "@/types/spd";

export default function SpdPage() {
  const { recaps, budgetAccounts, loading, setLoading, fetchSpdLogs } =
    useSpd();

  const [formData, setFormData] = useState<SpdFormData>({
    noSpd: "",
    tanggal: "",
    kodeRekening: "",
    nominal: "",
  });

  const handleFieldChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSpd = async () => {
    setLoading(true);

    const result = await submitSpd({
      no_spd: formData.noSpd,
      tanggal: formData.tanggal,
      kode_rekening: formData.kodeRekening,
      nominal: Number(formData.nominal),
    });

    setLoading(false);

    if (result.success) {
      setFormData({
        noSpd: "",
        tanggal: "",
        kodeRekening: "",
        nominal: "",
      });
      fetchSpdLogs();
    } else {
      alert(`Gagal menyimpan SPD: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <PageTransition className="max-w-4xl mx-auto space-y-8">
        <PageHeader
          icon={PiggyBank}
          title="Surat Penyediaan Dana (SPD)"
          description='Admin: Isi ulang saldo anggaran untuk membuka blokir "SALDO_TIDAK_CUKUP" pada pengajuan SPJ.'
        />

        <Tabs defaultValue="form-entry" className="w-full space-y-6">
          <TabsList className="w-full grid grid-cols-2 h-14 bg-white border border-slate-200 p-1">
            <TabsTrigger
              value="form-entry"
              className="text-sm font-bold gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <Plus className="h-4 w-4" /> SPD FORM
            </TabsTrigger>
            <TabsTrigger
              value="recap-log"
              className="text-sm font-bold gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <Database className="h-4 w-4" /> RECAP TABLE
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form-entry" className="mt-0 focus-visible:ring-0">
            <SpdForm
              formData={formData}
              onChange={handleFieldChange}
              onSave={handleSaveSpd}
              isLoading={loading}
              budgetAccounts={budgetAccounts}
            />
          </TabsContent>

          <TabsContent value="recap-log" className="mt-0 focus-visible:ring-0">
            <SpdTable logs={recaps} />
          </TabsContent>
        </Tabs>
      </PageTransition>
    </div>
  );
}
