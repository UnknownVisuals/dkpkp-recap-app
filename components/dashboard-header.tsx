"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
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
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 pl-4 pr-1.5 py-1">
      <div className="flex flex-col items-end text-right">
        <span className="text-[12px] font-semibold leading-none text-slate-800">
          {user.email}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">
          {user.role}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        className="h-7 w-7 rounded-lg hover:bg-destructive hover:text-white"
      >
        <LogOut className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
