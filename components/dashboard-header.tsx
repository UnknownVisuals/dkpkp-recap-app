"use client";

import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

export function DashboardHeader() {
  const [connectionStatus, setConnectionStatus] = useState<
    "checking" | "connected" | "disconnected"
  >("checking");

  useEffect(() => {
    async function verifySupabaseConnection() {
      const supabase = createClient();
      try {
        // Melakukan panggilan ringan ke salah satu tabel untuk memeriksa status handshake API
        const { error } = await supabase
          .from("spb_recap")
          .select("id")
          .limit(1);

        if (error) {
          // Jika skema tabel belum dibuat tetapi server merespon, konektivitas API sebetulnya aktif
          // Kita hanya mendeteksi kegagalan jaringan mentah (seperti kegagalan fetch DNS)
          if (error.message.includes("fetch") || error.code === "PGRST301") {
            setConnectionStatus("disconnected");
          } else {
            setConnectionStatus("connected");
          }
        } else {
          setConnectionStatus("connected");
        }
      } catch (err) {
        setConnectionStatus("disconnected");
        console.error("Error memeriksa koneksi Supabase:", err);
      }
    }

    verifySupabaseConnection();
  }, []);

  return (
    <div className="w-full max-w-xl text-center space-y-4 mb-12">
      {/* RE-ACTIVE STATUS CONNECTION BADGE DIAGNOSTIC */}
      <div className="absolute top-6 right-6 print:hidden">
        {connectionStatus === "checking" && (
          <Badge
            variant="outline"
            className="gap-1.5 px-3 py-1.5 text-xs font-medium"
          >
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            Memeriksa Koneksi...
          </Badge>
        )}

        {connectionStatus === "connected" && (
          <Badge
            variant="outline"
            className="gap-1.5 px-3 py-1.5 text-xs font-medium"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Terhubung ke Database
          </Badge>
        )}

        {connectionStatus === "disconnected" && (
          <Badge
            variant="outline"
            className="gap-1.5 px-3 py-1.5 text-xs font-medium border-destructive/50 text-destructive"
          >
            <span className="h-2 w-2 rounded-full bg-destructive" />
            Koneksi Terputus
          </Badge>
        )}
      </div>

      {/* Institutional Branding Container Layout */}
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border bg-white shadow-sm">
        <Building2 className="h-6 w-6 text-slate-700" />
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          E-Recap DKPKP
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Dinas Ketahanan Pangan, Kelautan dan Pertanian Provinsi DKI Jakarta
        </p>
      </div>
    </div>
  );
}
