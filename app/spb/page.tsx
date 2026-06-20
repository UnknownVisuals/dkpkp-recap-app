"use client";

import Link from "next/link";
import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Database, FileText } from "lucide-react";
import { SpbForm } from "@/components/spb/spb-form";
import { SpbTable } from "@/components/spb/spb-table";
import { SpbPrint } from "@/components/spb/spb-print";
import { createClient } from "@/lib/supabase/client";
import { SpbFormData, SupabaseSpbRow } from "@/types/spb";
import { PageTransition } from "@/components/page-transition";
import { useUser } from "@/hooks/useUser";
import { submitSpb, updateSpb } from "@/lib/actions/spb";
import type { BudgetAccount } from "@/types/budget";

export default function SpbPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const resolvedSearchParams = use(searchParams);
  const supabase = createClient();
  const { isAdmin } = useUser();
  const [recaps, setRecaps] = useState<SupabaseSpbRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [budgetAccounts, setBudgetAccounts] = useState<BudgetAccount[]>([]);

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
    lampiranUrl: "",
  });

  useEffect(() => {
    fetchSpbLogs();
    fetchBudgetAccounts();
  }, [supabase]);

  useEffect(() => {
    if (!resolvedSearchParams.edit) return;
    (async () => {
      const { data, error } = await supabase
        .from("spb_recap")
        .select("*")
        .eq("no_spb", resolvedSearchParams.edit)
        .single();

      if (!error && data) {
        const row = data as SupabaseSpbRow;
        setFormData({
          noSpb: row.no_spb,
          tanggal: row.tanggal,
          nominal: String(row.nominal),
          terbilang: row.terbilang,
          kepada: row.kepada,
          untukPembayaran: row.untuk_pembayaran,
          atasDasar: row.atas_dasar,
          dibebankanPada: row.dibebankan_pada || "",
          kegiatan: row.kegiatan,
          subKegiatan: row.sub_kegiatan,
          kodeRekening: row.kode_rekening,
          namaPptk: row.nama_pptk,
          nipPptk: row.nip_pptk,
          namaPpk: row.nama_ppk,
          nipPpk: row.nip_ppk,
          lampiranUrl: row.lampiran_url || "",
        });
      }
    })();
  }, [resolvedSearchParams.edit, supabase]);

  async function fetchSpbLogs() {
    const { data, error } = await supabase
      .from("spb_recap")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRecaps(data as SupabaseSpbRow[]);
    }
  }

  async function fetchBudgetAccounts() {
    const { data } = await supabase
      .from("budget_accounts")
      .select("*")
      .order("kode_rekening", { ascending: true });

    if (data) {
      setBudgetAccounts(data as BudgetAccount[]);
    }
  }

  const handleFieldChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSpb = async (lampiranUrl: string) => {
    setLoading(true);

    const payload = {
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
      lampiran_url: lampiranUrl || null,
    };

    const isEditing = !!resolvedSearchParams.edit;
    const result = isEditing
      ? await updateSpb(payload)
      : await submitSpb(payload);

    setLoading(false);

    if (result.success) {
      setFormData({
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
        lampiranUrl: "",
      });
      fetchSpbLogs();
      window.history.replaceState(null, "", "/spb");
    } else {
      alert(`Gagal menyimpan SPB: ${result.error}`);
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
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shrink-0">
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
              className="text-sm font-bold gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <Plus className="h-4 w-4" /> SPB FORM
            </TabsTrigger>
            <TabsTrigger
              value="recap-log"
              className="text-sm font-bold gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
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
              budgetAccounts={budgetAccounts}
            />
          </TabsContent>

          <TabsContent value="recap-log" className="mt-0 focus-visible:ring-0">
            <SpbTable
              logs={recaps}
              isAdmin={isAdmin}
              onRefresh={fetchSpbLogs}
            />
          </TabsContent>
        </Tabs>
      </PageTransition>

      <SpbPrint data={formData} />
    </div>
  );
}
