"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Database, FileText } from "lucide-react";
import { SpjForm } from "@/components/spj/spj-form";
import { SpjTable } from "@/components/spj/spj-table";
import { SpjPrint } from "@/components/spj/spj-print";
import { createClient } from "@/lib/supabase/client";
import { SpjFormData, SpjLogItem, SupabaseSpjRow } from "@/types/spj";

export default function SpjPage() {
  const supabase = createClient();
  const [recaps, setRecaps] = useState<SpjLogItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<SpjFormData>({
    noSpj: "120 / SPJ / DKPKP / 2026",
    relatedSpb: "719 / 28.26 / Y",
    tanggal: "2026-04-30",
    realisasi: "2450000",
    keterangan: "Pembayaran Honorarium Transaksi Satgas Lapangan Terlampir",
    namaPenerima: "Koordinator Lapangan TNI/Polri",
  });

  const fetchSpjLogs = useCallback(async () => {
    const { data, error } = await supabase
      .from("spj_recap")
      .select("no_spj, related_spb, tanggal, realisasi, nama_penerima")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const mappedData: SpjLogItem[] = (data as SupabaseSpjRow[]).map(
        (item) => ({
          id: item.no_spj,
          relatedSpb: item.related_spb,
          date: item.tanggal,
          realization: `Rp ${Number(item.realisasi).toLocaleString("id-ID")}`,
          recipient: item.nama_penerima,
        }),
      );
      setRecaps(mappedData);
    }
  }, [supabase]);

  useEffect(() => {
    fetchSpjLogs();
  }, [fetchSpjLogs]);

  const handleFieldChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSpj = async () => {
    setLoading(true);
    const { error } = await supabase.from("spj_recap").insert([
      {
        no_spj: formData.noSpj,
        related_spb: formData.relatedSpb,
        tanggal: formData.tanggal,
        realisasi: Number(formData.realisasi),
        keterangan: formData.keterangan,
        nama_penerima: formData.namaPenerima,
      },
    ]);

    setLoading(false);
    if (error) {
      alert(`Gagal menyimpan data SPJ: ${error.message}`);
    } else {
      alert("Data SPJ berhasil dikunci ke database!");
      fetchSpjLogs();
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 print:p-0">
      <div className="max-w-4xl mx-auto space-y-6 print:hidden">
        <div className="flex justify-between items-center border-b pb-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="font-semibold px-2"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Kembali
            </Link>
          </Button>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-white shadow-sm shrink-0">
            <FileText className="h-6 w-6" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Surat Pertanggungjawaban (SPJ)
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Kelola pencatatan realisasi belanja dinas dan verifikasi keabsahan
              bukti pembayaran fisik.
            </p>
          </div>
        </div>

        <Tabs defaultValue="form-entry" className="w-full space-y-6">
          <TabsList className="w-full grid grid-cols-2 h-12">
            <TabsTrigger value="form-entry" className="text-xs font-bold gap-2">
              <Plus className="h-4 w-4" /> FORM
            </TabsTrigger>
            <TabsTrigger value="recap-log" className="text-xs font-bold gap-2">
              <Database className="h-4 w-4" /> TABEL REKAP
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form-entry" className="mt-0 focus-visible:ring-0">
            <SpjForm
              formData={formData}
              onChange={handleFieldChange}
              onPrint={() => window.print()}
              onSave={handleSaveSpj}
              isLoading={loading}
            />
          </TabsContent>

          <TabsContent value="recap-log" className="mt-0 focus-visible:ring-0">
            <SpjTable logs={recaps} />
          </TabsContent>
        </Tabs>
      </div>

      <SpjPrint data={formData} />
    </div>
  );
}
