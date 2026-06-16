"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard-header";
import { ModuleCard } from "@/components/module-card";
import { PageTransition } from "@/components/page-transition";

export default function HomePage() {
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12 relative select-none overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 w-full h-75 bg-linear-to-b from-slate-200/50 to-transparent pointer-events-none" />

      <PageTransition
        stagger
        className="relative z-10 w-full max-w-4xl flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="w-full">
          <DashboardHeader />
        </motion.div>

        {/* Action Workspace Grid Container */}
        <div className="grid gap-8 md:grid-cols-2 w-full mt-8">
          <motion.div variants={itemVariants}>
            <ModuleCard
              title="Surat Perintah Bayar (SPB)"
              description="Pusat pengelolaan formulir perintah pembayaran internal dinas beserta rekapitulasi data anggaran."
              href="/spb"
              // Gambar merepresentasikan: Dokumen Keuangan, Kalkulator, Anggaran
              imageUrl="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ModuleCard
              title="Surat Pertanggungjawaban (SPJ)"
              description="Pencatatan realisasi dana anggaran belanja dinas disertai pengarsipan bukti kwitansi fisik."
              href="/spj"
              // Gambar merepresentasikan: Tanda tangan, Validasi, Audit Dokumen Resmi
              imageUrl="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
            />
          </motion.div>
        </div>

        {/* Formal System Footer Context */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-[12px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2"
        >
          <span>Pemerintah Provinsi DKI Jakarta</span>
          <span className="text-slate-400">•</span>
          <span>Proof of Concept</span>
        </motion.div>
      </PageTransition>
    </div>
  );
}
