"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function DashboardHeader() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<{ email: string; role: string } | null>(
    null,
  );

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (authUser) {
        // Tarik peran dari tabel profiles jika ada
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authUser.id)
          .single();
        setUser({
          email: authUser.email || "",
          role: profile?.role || "STAFF",
        });
      }
    }
    fetchUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh(); // Pastikan session di-clear dari memori
  };

  return (
    <div className="w-full max-w-xl text-center space-y-4 mb-12 relative">
      {/* Panel Info Akun (Kanan Atas) */}
      <div className="absolute -top-6 -right-6 flex flex-col items-end gap-2 print:hidden">
        {user && (
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full pl-4 pr-1.5 py-1.5 shadow-sm">
            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] font-bold leading-none text-slate-800">
                {user.email}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
                {user.role}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-7 w-7 rounded-full hover:bg-destructive hover:text-white transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>

      {/* Logo Instansi */}
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border bg-white shadow-sm shrink-0">
        <Building2 className="h-6 w-6 text-slate-700" />
      </div>

      {/* Judul Utama */}
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
