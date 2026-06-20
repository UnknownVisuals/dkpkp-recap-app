"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingDown, PiggyBank, Loader2 } from "lucide-react";
import { ModuleCard } from "@/components/module-card";
import { PageTransition } from "@/components/page-transition";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";

function formatIdr(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function HomePage() {
  const { isAdmin } = useUser();
  const [summary, setSummary] = useState<{
    totalSpd: number;
    totalTerpakai: number;
    totalSisa: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBudget() {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data } = await supabase.from("budget_summary").select("*");
      if (data && data.length > 0) {
        setSummary({
          totalSpd: data.reduce((acc, r) => acc + Number(r.total_spd), 0),
          totalTerpakai: data.reduce(
            (acc, r) => acc + Number(r.total_terpakai),
            0,
          ),
          totalSisa: data.reduce((acc, r) => acc + Number(r.sisa_saldo), 0),
        });
      } else {
        setSummary({ totalSpd: 0, totalTerpakai: 0, totalSisa: 0 });
      }
      setLoading(false);
    }
    fetchBudget();
  }, []);

  const statCards = [
    {
      label: "Total SPD",
      value: summary?.totalSpd ?? 0,
      icon: Wallet,
      className: "border-l-4 border-l-emerald-500",
      iconClass: "text-emerald-600",
    },
    {
      label: "Total Terpakai",
      value: summary?.totalTerpakai ?? 0,
      icon: TrendingDown,
      className: "border-l-4 border-l-red-500",
      iconClass: "text-red-600",
    },
    {
      label: "Sisa Saldo",
      value: summary?.totalSisa ?? 0,
      icon: PiggyBank,
      className: "border-l-4 border-l-blue-500",
      iconClass: "text-blue-600",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center px-4 py-12 relative select-none overflow-hidden">
      <PageTransition
        stagger
        className="w-full max-w-4xl flex flex-col items-center"
      >
        {/* Budget Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3 w-full mb-10">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                variants={itemVariants}
                className="w-full"
              >
                <Card className={card.className}>
                  <CardContent className="flex items-center gap-4 pt-6">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ${card.iconClass}`}
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {card.label}
                      </span>
                      <span className="text-xl font-bold text-slate-900">
                        {loading
                          ? "—"
                          : formatIdr(card.value)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div
          className={`grid gap-8 w-full ${isAdmin ? "md:grid-cols-3" : "md:grid-cols-2"}`}
        >
          <motion.div variants={itemVariants}>
            <ModuleCard
              title="Surat Perintah Bayar (SPB)"
              description="Complete management of internal payment order forms with budget data recapitulation."
              href="/spb"
              imageUrl="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ModuleCard
              title="Surat Pertanggungjawaban (SPJ)"
              description="Track departmental budget realization with physical receipt documentation archiving."
              href="/spj"
              imageUrl="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
            />
          </motion.div>

          {isAdmin && (
            <motion.div variants={itemVariants}>
              <ModuleCard
                title="Surat Penyediaan Dana (SPD)"
                description="Admin tool: replenish budget balances to resolve SALDO_TIDAK_CUKUP on SPJ submissions."
                href="/spd"
                imageUrl="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800"
              />
            </motion.div>
          )}
        </div>
      </PageTransition>
    </div>
  );
}
