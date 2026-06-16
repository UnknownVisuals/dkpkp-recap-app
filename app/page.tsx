"use client";

import { motion } from "framer-motion";
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
    <div className="h-screen bg-slate-50 flex flex-col justify-center items-center px-4 relative select-none overflow-hidden">
      <PageTransition
        stagger
        className="w-full max-w-4xl flex flex-col items-center"
      >
        <div className="grid gap-8 md:grid-cols-2 w-full">
          <motion.div variants={itemVariants}>
            <ModuleCard
              title="Surat Perintah Bayar (SPB)"
              description="Pusat pengelolaan formulir perintah pembayaran internal dinas beserta rekapitulasi data anggaran."
              href="/spb"
              imageUrl="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ModuleCard
              title="Surat Pertanggungjawaban (SPJ)"
              description="Pencatatan realisasi dana anggaran belanja dinas disertai pengarsipan bukti kwitansi fisik."
              href="/spj"
              imageUrl="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
            />
          </motion.div>
        </div>
      </PageTransition>
    </div>
  );
}
