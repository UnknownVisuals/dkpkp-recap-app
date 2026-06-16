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
    router.refresh();
  };

  return (
    <div className="w-full text-center space-y-5 relative">
      {/* Panel Info Akun */}
      <div className="absolute -top-12 -right-4 sm:-right-8 flex flex-col items-end gap-2 print:hidden z-20">
        {user && (
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full pl-5 pr-2 py-2 shadow-sm">
            <div className="flex flex-col items-end text-right">
              <span className="text-[11px] font-bold leading-none text-slate-900">
                {user.email}
              </span>
              <span className="text-[10px] mt-1 uppercase tracking-wider text-blue-600 font-extrabold">
                {user.role}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-8 w-8 rounded-full hover:bg-destructive hover:text-white transition-colors bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Logo & Judul Utama */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border bg-white shadow-sm shrink-0">
        <Building2 className="h-8 w-8 text-slate-800" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">
          E-Recap DKPKP
        </h1>
        <p className="text-sm font-medium text-slate-600 max-w-md mx-auto leading-relaxed">
          Dinas Ketahanan Pangan, Kelautan dan Pertanian Provinsi DKI Jakarta
        </p>
      </div>
    </div>
  );
}
