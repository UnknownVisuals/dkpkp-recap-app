"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Database, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { PageTransition } from "@/components/page-transition";
import { useUser } from "@/hooks/useUser";
import { BudgetForm } from "@/components/budget/budget-form";
import { BudgetTable } from "@/components/budget/budget-table";

export default function RekeningPage() {
  const router = useRouter();
  const { loading, isAdmin } = useUser();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/");
    }
  }, [loading, isAdmin, router]);

  if (loading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <PageTransition className="max-w-4xl mx-auto space-y-8">
        <PageHeader
          icon={BookOpen}
          title="Master Rekening"
          description="Manage master budget accounts (kode rekening) for SPB/SPJ transactions."
        />

        <Tabs defaultValue="form-entry" className="w-full space-y-6">
          <TabsList className="w-full grid grid-cols-2 h-14 bg-white border border-slate-200 p-1">
            <TabsTrigger
              value="form-entry"
              className="text-sm font-bold gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <Plus className="h-4 w-4" /> TAMBAH REKENING
            </TabsTrigger>
            <TabsTrigger
              value="recap-log"
              className="text-sm font-bold gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <Database className="h-4 w-4" /> DAFTAR REKENING
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form-entry" className="mt-0 focus-visible:ring-0">
            <BudgetForm onSuccess={() => setRefreshKey((k) => k + 1)} />
          </TabsContent>

          <TabsContent value="recap-log" className="mt-0 focus-visible:ring-0">
            <BudgetTable refreshKey={refreshKey} />
          </TabsContent>
        </Tabs>
      </PageTransition>
    </div>
  );
}
