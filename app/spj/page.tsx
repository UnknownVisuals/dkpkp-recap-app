"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Database, Printer, FileText } from "lucide-react";

import { SpjForm } from "@/components/spj/spj-form";
import { SpjTable } from "@/components/spj/spj-table";
import { SpjPrint } from "@/components/spj/spj-print";

export default function SpjPage() {
  const [formData, setFormData] = useState({
    noSpj: "120 / SPJ / DKPKP / 2026",
    relatedSpb: "719 / 28.26 / Y",
    tanggal: "2026-04-30",
    realisasi: "2450000",
    keterangan: "Pembayaran Honorarium Transaksi Satgas Lapangan Terlampir",
    namaPenerima: "Koordinator Lapangan TNI/Polri",
  });

  const [recaps] = useState([
    {
      id: "120/SPJ/DKPKP/2026",
      relatedSpb: "719/28.26/Y",
      date: "2026-04-30",
      realization: "Rp 2.450.000",
      file: "lampiran_nota_kwitansi.pdf",
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
              SPJ Workspace
            </Badge>
            <Button
              onClick={() => window.print()}
              variant="outline"
              size="sm"
              className="gap-2 h-9 px-4 font-bold"
            >
              <Printer className="h-4 w-4 text-muted-foreground" /> Cetak
              Laporan Resmi
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border shrink-0">
            <FileText className="h-6 w-6" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Workspace Surat Pertanggungjawaban
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
              <Plus className="h-4 w-4" /> FORM REALISASI BARU
            </TabsTrigger>
            <TabsTrigger value="recap-log" className="text-xs font-bold gap-2">
              <Database className="h-4 w-4" /> LOG DATA REKAPITULASI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form-entry" className="mt-0 focus-visible:ring-0">
            <SpjForm
              formData={formData}
              onChange={handleFieldChange}
              onPrint={() => window.print()}
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
