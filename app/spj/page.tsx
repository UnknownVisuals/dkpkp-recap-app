"use client";

import Link from "next/link";
import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Database, FileText, AlertCircle } from "lucide-react";
import { SpjForm } from "@/components/spj/spj-form";
import { SpjTable } from "@/components/spj/spj-table";
import { SpjPrint } from "@/components/spj/spj-print";
import { createClient } from "@/lib/supabase/client";
import { SpjFormData, SupabaseSpjRow } from "@/types/spj";
import { PageTransition } from "@/components/page-transition";
import { useUser } from "@/hooks/useUser";
import { submitSpj, updateSpj } from "@/lib/actions/spj";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function SpjPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const resolvedSearchParams = use(searchParams);
  const supabase = createClient();
  const { isAdmin } = useUser();
  const [recaps, setRecaps] = useState<SupabaseSpjRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [approvedSpbs, setApprovedSpbs] = useState<string[]>([]);
  const [errorDialog, setErrorDialog] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: "" });

  const [formData, setFormData] = useState<SpjFormData>({
    noSpj: "",
    relatedSpb: "",
    tanggal: "",
    realisasi: "",
    keterangan: "",
    namaPenerima: "",
    lampiranUrl: "",
  });

  useEffect(() => {
    fetchSpjLogs();
    fetchApprovedSpbs();
  }, [supabase]);

  useEffect(() => {
    if (!resolvedSearchParams.edit) return;
    (async () => {
      const { data, error } = await supabase
        .from("spj_recap")
        .select("*")
        .eq("no_spj", resolvedSearchParams.edit)
        .single();

      if (!error && data) {
        const row = data as SupabaseSpjRow;
        setFormData({
          noSpj: row.no_spj,
          relatedSpb: row.related_spb,
          tanggal: row.tanggal,
          realisasi: String(row.realisasi),
          keterangan: row.keterangan,
          namaPenerima: row.nama_penerima,
          lampiranUrl: row.lampiran_url || "",
        });
      }
    })();
  }, [resolvedSearchParams.edit, supabase]);

  async function fetchSpjLogs() {
    const { data, error } = await supabase
      .from("spj_recap")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRecaps(data as SupabaseSpjRow[]);
    }
  }

  async function fetchApprovedSpbs() {
    const { data } = await supabase
      .from("spb_recap")
      .select("no_spb")
      .eq("status", "APPROVED")
      .order("created_at", { ascending: false });

    if (data) {
      setApprovedSpbs(data.map((row) => row.no_spb));
    }
  }

  const handleFieldChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSpj = async (lampiranUrl: string) => {
    setLoading(true);

    const payload = {
      no_spj: formData.noSpj,
      related_spb: formData.relatedSpb,
      tanggal: formData.tanggal,
      realisasi: Number(formData.realisasi),
      keterangan: formData.keterangan,
      nama_penerima: formData.namaPenerima,
      lampiran_url: lampiranUrl || null,
    };

    const isEditing = !!resolvedSearchParams.edit;
    const result = isEditing
      ? await updateSpj(payload)
      : await submitSpj(payload);

    setLoading(false);

    if (result.success) {
      setFormData({
        noSpj: "",
        relatedSpb: "",
        tanggal: "",
        realisasi: "",
        keterangan: "",
        namaPenerima: "",
        lampiranUrl: "",
      });
      fetchSpjLogs();
      window.history.replaceState(null, "", "/spj");
    } else if (
      "errorType" in result &&
      result.errorType === "INSUFFICIENT_FUNDS"
    ) {
      setErrorDialog({ open: true, message: result.message });
    } else {
      alert(`Gagal menyimpan SPJ: ${result.error}`);
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
              Surat Pertanggungjawaban (SPJ)
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              Manage expenditure realization recording and physical payment
              receipt verification.
            </p>
          </div>
        </div>

        <Tabs defaultValue="form-entry" className="w-full space-y-6">
          <TabsList className="w-full grid grid-cols-2 h-14 bg-white border border-slate-200 p-1">
            <TabsTrigger
              value="form-entry"
              className="text-sm font-bold gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <Plus className="h-4 w-4" /> SPJ FORM
            </TabsTrigger>
            <TabsTrigger
              value="recap-log"
              className="text-sm font-bold gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
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
              approvedSpbs={approvedSpbs}
            />
          </TabsContent>

          <TabsContent value="recap-log" className="mt-0 focus-visible:ring-0">
            <SpjTable
              logs={recaps}
              isAdmin={isAdmin}
              onRefresh={fetchSpjLogs}
            />
          </TabsContent>
        </Tabs>
      </PageTransition>

      <SpjPrint data={formData} />

      <Dialog
        open={errorDialog.open}
        onOpenChange={(open) => setErrorDialog({ ...errorDialog, open })}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-destructive shrink-0" />
              <DialogTitle className="text-destructive">
                Saldo Tidak Mencukupi
              </DialogTitle>
            </div>
            <DialogDescription className="text-base pt-3">
              {errorDialog.message}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
