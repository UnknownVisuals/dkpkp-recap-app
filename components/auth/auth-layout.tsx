"use client";

import { ReactNode } from "react";
import { Building2 } from "lucide-react";
import { motion, Transition } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  imagePosition?: "left" | "right";
}

export function AuthLayout({
  children,
  title,
  subtitle,
  imagePosition = "left",
}: AuthLayoutProps) {
  // Menentukan arah animasi masuk (slide in) berdasarkan posisi layout
  const imageInitialX = imagePosition === "left" ? -50 : 50;
  const formInitialX = imagePosition === "left" ? 50 : -50;

  // FIX: Type assertion explicitly defining the 4-number tuple for Framer Motion
  const customTransition: Transition = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-white">
      {/* Image/Branding Column */}
      <motion.div
        initial={{ opacity: 0, x: imageInitialX }}
        animate={{ opacity: 1, x: 0 }}
        transition={customTransition}
        className={`hidden lg:flex flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden ${
          imagePosition === "right" ? "lg:order-2" : "lg:order-1"
        }`}
      >
        {/* Placeholder for an abstract background image */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-800 to-slate-950 z-0" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 border border-white/20">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            DKPKP Jakarta
          </span>
        </div>

        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...customTransition, delay: 0.2 }}
            className="text-3xl font-medium tracking-tight mb-4"
          >
            Sistem E-Recap Terpadu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...customTransition, delay: 0.3 }}
            className="text-slate-400 text-sm max-w-md leading-relaxed"
          >
            Kelola penyerapan dana alokasi internal, SPB, dan SPJ dengan
            antarmuka yang modern, cepat, dan aman.
          </motion.p>
        </div>
      </motion.div>

      {/* Form Area Column */}
      <motion.div
        initial={{ opacity: 0, x: formInitialX }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...customTransition, delay: 0.1 }}
        className={`flex items-center justify-center p-8 bg-white z-10 ${
          imagePosition === "right" ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="w-full max-w-100 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...customTransition, delay: 0.2 }}
            className="space-y-2"
          >
            {/* Mobile Logo */}
            <div className="flex lg:hidden h-10 w-10 items-center justify-center rounded-lg bg-slate-900 mb-6">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...customTransition, delay: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
