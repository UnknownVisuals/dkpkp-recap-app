"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Database, FileText } from "lucide-react";
import { SpbForm } from "@/components/spb/spb-form";
import { SpbTable } from "@/components/spb/spb-table";
import { SpbPrint } from "@/components/spb/spb-print";
import { createClient } from "@/lib/supabase/client";
import { SpbFormData, SpbLogItem, SupabaseSpbRow } from "@/types/spb";
import { PageTransition } from "@/components/page-transition";

export default function SpbPage() {
  const supabase = createClient();
  const [recaps, setRecaps] = useState<SpbLogItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<SpbFormData>({
    noSpb: "",
    tanggal: "",
    nominal: "",
    terbilang: "",
    kepada: "",
    untukPembayaran: "",
    atasDasar: "Kwitansi/ Dokumen SPJ",
    dibebankanPada: "",
    kegiatan: "",
    subKegiatan: "",
    kodeRekening: "",
    namaPptk: "",
    nipPptk: "",
    namaPpk: "",
    nipPpk: "",
  });

  const fetchSpbLogs = useCallback(async () => {
    const { data, error } = await supabase
      .from("spb_recap")
      .select("no_spb, tanggal, kepada, nominal, kegiatan")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const mappedData: SpbLogItem[] = (data as SupabaseSpbRow[]).map(
        (item) => ({
          id: item.no_spb,
          date: item.tanggal,
          recipient: item.kepada,
          amount: `Rp ${Number(item.nominal).toLocaleString("id-ID")}`,
          activity: item.kegiatan,
        }),
      );
      setRecaps(mappedData);
    }
  }, [supabase]);

  useEffect(() => {
    fetchSpbLogs();
  }, [fetchSpbLogs]);

  const handleFieldChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSpb = async () => {
    setLoading(true);
    const { error } = await supabase.from("spb_recap").insert([
      {
        no_spb: formData.noSpb,
        tanggal: formData.tanggal,
        nominal: Number(formData.nominal),
        terbilang: formData.terbilang,
        kepada: formData.kepada,
        untuk_pembayaran: formData.untukPembayaran,
        atas_dasar: formData.atasDasar,
        dibebankan_pada: formData.dibebankanPada || null,
        kegiatan: formData.kegiatan,
        sub_kegiatan: formData.subKegiatan,
        kode_rekening: formData.kodeRekening,
        nama_pptk: formData.namaPptk,
        nip_pptk: formData.nipPptk,
        nama_ppk: formData.namaPpk,
        nip_ppk: formData.nipPpk,
      },
    ]);

    setLoading(false);
    if (error) {
      alert(`Failed to save SPB data: ${error.message}`);
    } else {
      alert("SPB data saved successfully!");
      fetchSpbLogs(); // Refresh recap table after save
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
      <PageTransition className="max-w-4xl mx-auto space-y-8 print:hidden">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="font-semibold h-9 px-4 bg-white"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm shrink-0">
            <FileText className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Surat Perintah Bayar (SPB)
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              Manage internal budget allocation absorption with standard
              database-integrated forms.
            </p>
          </div>
        </div>

        <Tabs defaultValue="form-entry" className="w-full space-y-6">
          <TabsList className="w-full grid grid-cols-2 h-14 bg-white border border-slate-200 p-1">
            <TabsTrigger
              value="form-entry"
              className="text-sm font-bold gap-2 h-full data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all"
            >
              <Plus className="h-4 w-4" /> SPB FORM
            </TabsTrigger>
            <TabsTrigger
              value="recap-log"
              className="text-sm font-bold gap-2 h-full data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all"
            >
              <Database className="h-4 w-4" /> RECAP TABLE
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form-entry" className="mt-0 focus-visible:ring-0">
            <SpbForm
              formData={formData}
              onChange={handleFieldChange}
              onPrint={() => window.print()}
              onSave={handleSaveSpb}
              isLoading={loading}
            />
          </TabsContent>

          <TabsContent value="recap-log" className="mt-0 focus-visible:ring-0">
            <SpbTable logs={recaps} />
          </TabsContent>
        </Tabs>
      </PageTransition>

      <SpbPrint data={formData} />
    </div>
  );
}
