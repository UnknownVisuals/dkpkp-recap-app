"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Database, Printer, FileText } from "lucide-react";

import { SpbForm } from "@/components/spb/spb-form";
import { SpbTable } from "@/components/spb/spb-table";
import { SpbPrint } from "@/components/spb/spb-print";

export default function SpbPage() {
  const [formData, setFormData] = useState({
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
  });

  const [recaps] = useState([
    {
      id: "719/28.26/Y",
      date: "2026-04-27",
      recipient: "Daftar Nama Terlampir",
      amount: "Rp 2.500.000",
      activity:
        "Pelaksanaan Pengawasan Keamanan Pangan Segar Distribusi Lintas Daerah",
    },
  ]);

  const handleFieldChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
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
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1.5 px-3 py-1 text-xs h-9">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              SPB Workspace
            </Badge>
            <Button
              onClick={() => window.print()}
              variant="outline"
              size="sm"
              className="gap-2 h-9 px-4 font-bold"
            >
              <Printer className="h-4 w-4 text-muted-foreground" /> Cetak
              Dokumen Resmi
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border shrink-0">
            <FileText className="h-6 w-6" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Workspace Surat Perintah Bayar
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
              <Plus className="h-4 w-4" /> PENGISIAN FORM OPERASIONAL
            </TabsTrigger>
            <TabsTrigger value="recap-log" className="text-xs font-bold gap-2">
              <Database className="h-4 w-4" /> LIHAT LOG REKAPITULASI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form-entry" className="mt-0 focus-visible:ring-0">
            <SpbForm
              formData={formData}
              onChange={handleFieldChange}
              onPrint={() => window.print()}
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
