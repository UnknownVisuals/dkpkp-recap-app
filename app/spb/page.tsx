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

export default function SpbPage() {
  const supabase = createClient();
  const [recaps, setRecaps] = useState<SpbLogItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<SpbFormData>({
    noSpb: "719 / 28.26 / Y",
    tanggal: "2026-04-27",
    nominal: "2500000",
    terbilang: "Dua Juta Lima Ratus Ribu Rupiah",
    kepada: "Daftar Nama Terlampir",
    untukPembayaran: "Honorarium Tim Anggota TNI/Polri",
    atasDasar: "Kwitansi/ Dokumen SPJ",
    dibebankanPada: "",
    kegiatan:
      "Pelaksanaan Pengawasan Keamanan Pangan Segar Distribusi Lintas Daerah",
    subKegiatan: "2.09.05.1.01.0008",
    kodeRekening: "5.1.02.02.01.00004",
    namaPptk: "Solihin",
    nipPptk: "197206051998031010",
    namaPpk: "Lya Imbasari",
    nipPpk: "196907071999032003",
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
      alert(`Gagal menyimpan data: ${error.message}`);
    } else {
      alert("Data SPB berhasil disimpan ke database!");
      fetchSpbLogs();
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
              Surat Perintah Bayar (SPB)
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Kelola penyerapan dana alokasi internal menggunakan form standar
              integrasi database.
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
      </div>

      <SpbPrint data={formData} />
    </div>
  );
}
