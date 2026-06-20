"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Database, PiggyBank } from "lucide-react";
import { SpdForm } from "@/components/spd/spd-form";
import { SpdTable } from "@/components/spd/spd-table";
import { createClient } from "@/lib/supabase/client";
import { PageTransition } from "@/components/page-transition";
import { submitSpd } from "@/lib/actions/spd";
import type { SupabaseSpdRow, SpdFormData } from "@/types/spd";
import type { BudgetAccount } from "@/types/budget";

export default function SpdPage() {
  const supabase = createClient();
  const [recaps, setRecaps] = useState<SupabaseSpdRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [budgetAccounts, setBudgetAccounts] = useState<BudgetAccount[]>([]);

  const [formData, setFormData] = useState<SpdFormData>({
    noSpd: "",
    tanggal: "",
    kodeRekening: "",
    nominal: "",
  });

  useEffect(() => {
    fetchSpdLogs();
    fetchBudgetAccounts();
  }, [supabase]);

  async function fetchSpdLogs() {
    const { data, error } = await supabase
      .from("spd_recap")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRecaps(data as SupabaseSpdRow[]);
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
            <PiggyBank className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Surat Penyediaan Dana (SPD)
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              Admin: Isi ulang saldo anggaran untuk membuka blokir
              &quot;SALDO_TIDAK_CUKUP&quot; pada pengajuan SPJ.
            </p>
          </div>
        </div>

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
