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
import { PageTransition } from "@/components/page-transition";

export default function SpjPage() {
  const supabase = createClient();
  const [recaps, setRecaps] = useState<SpjLogItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<SpjFormData>({
    noSpj: "",
    relatedSpb: "",
    tanggal: "",
    realisasi: "",
    keterangan: "",
    namaPenerima: "",
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
      alert(`Failed to save SPJ data: ${error.message}`);
    } else {
      alert("SPJ data saved successfully!");
      fetchSpjLogs();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
      <PageTransition className="max-w-4xl mx-auto space-y-8 print:hidden">
        {/* Navigation Bar */}
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

        {/* Header Section */}
        <div className="flex items-center gap-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm shrink-0">
            <FileText className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Surat Pertanggungjawaban (SPJ)
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              Manage expenditure realization recording and physical payment
              receipt verification.
            </p>
          </div>
        </div>

        {/* Tab Navigation & Content */}
        <Tabs defaultValue="form-entry" className="w-full space-y-6">
          <TabsList className="w-full grid grid-cols-2 h-14 bg-white border border-slate-200 p-1">
            <TabsTrigger
              value="form-entry"
              className="text-sm font-bold gap-2 h-full data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all"
            >
              <Plus className="h-4 w-4" /> SPJ FORM
            </TabsTrigger>
            <TabsTrigger
              value="recap-log"
              className="text-sm font-bold gap-2 h-full data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all"
            >
              <Database className="h-4 w-4" /> RECAP TABLE
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
      </PageTransition>

      <SpjPrint data={formData} />
    </div>
  );
}
