"use client";

import { motion } from "framer-motion";
import { Wallet, TrendingDown, PiggyBank, Loader2 } from "lucide-react";
import { useBudgetSummary } from "@/hooks/useBudgetSummary";

function formatIdr(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

const cardGradients = [
  {
    bg: "bg-linear-to-br from-emerald-400 to-emerald-500",
    ring: "ring-emerald-300/40",
  },
  {
    bg: "bg-linear-to-br from-rose-400 to-rose-500",
    ring: "ring-rose-300/40",
  },
  {
    bg: "bg-linear-to-br from-blue-400 to-indigo-500",
    ring: "ring-blue-300/40",
  },
];

const statCards = [
  { label: "Total SPD", icon: Wallet, gradient: cardGradients[0] },
  { label: "Total Terpakai", icon: TrendingDown, gradient: cardGradients[1] },
  { label: "Sisa Saldo", icon: PiggyBank, gradient: cardGradients[2] },
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

export function BudgetSummary() {
  const { summary, loading } = useBudgetSummary();

  return (
    <div className="grid gap-6 sm:grid-cols-3 w-full mb-10">
      {statCards.map((card) => {
        const Icon = card.icon;
        const value =
          card.label === "Total SPD"
            ? (summary?.totalSpd ?? 0)
            : card.label === "Total Terpakai"
              ? (summary?.totalTerpakai ?? 0)
              : (summary?.totalSisa ?? 0);

        return (
          <motion.div
            key={card.label}
            variants={itemVariants}
            className="group w-full"
          >
            <div
              className={`relative ${card.gradient.bg} rounded-[1.5rem] overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ring-1 ring-inset ${card.gradient.ring}`}
            >
              <div className="p-6 sm:p-8 flex flex-col gap-1">
                <div className="flex items-center gap-3 mb-1">
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-white/70" />
                  ) : (
                    <Icon className="h-5 w-5 text-white/80" />
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    {card.label}
                  </span>
                </div>
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {loading ? "—" : formatIdr(value)}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
