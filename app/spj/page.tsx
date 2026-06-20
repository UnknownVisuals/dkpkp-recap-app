"use client";

import { use, useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Database, FileText, AlertCircle } from "lucide-react";
import { SpjForm } from "@/components/spj/spj-form";
import { SpjTable } from "@/components/spj/spj-table";
import { SpjPrint } from "@/components/spj/spj-print";
import { PageHeader } from "@/components/layout/page-header";
import { PageTransition } from "@/components/page-transition";
import { useUser } from "@/hooks/useUser";
import { useSpj } from "@/hooks/useSpj";
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
  const { isAdmin } = useUser();
  const {
    recaps,
    approvedSpbs,
    loading,
    setLoading,
    fetchSpjLogs,
    fetchSpjForEdit,
  } = useSpj();
  const [errorDialog, setErrorDialog] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: "" });

  const [formData, setFormData] = useState({
    noSpj: "",
    relatedSpb: "",
    tanggal: "",
    realisasi: "",
    keterangan: "",
    namaPenerima: "",
    lampiranUrl: "",
  });

  useEffect(() => {
    if (!resolvedSearchParams.edit) return;
    fetchSpjForEdit(resolvedSearchParams.edit).then((row) => {
      if (row) {
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
    });
  }, [resolvedSearchParams.edit, fetchSpjForEdit]);

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
        <PageHeader
          icon={FileText}
          title="Surat Pertanggungjawaban (SPJ)"
          description="Manage expenditure realization recording and physical payment receipt verification."
        />

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
