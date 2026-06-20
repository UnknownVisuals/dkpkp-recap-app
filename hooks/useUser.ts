"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/profile";

export function useUser() {
  const supabaseRef = useRef(createClient());
  const supabase = supabaseRef.current;
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      console.log("[useUser] authUser:", authUser, "authError:", authError);

      if (authUser) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authUser.id)
          .single();

        console.log(
          "[useUser] profile query result:",
          profile,
          "error:",
          profileError,
        );

        const role = profile?.role || "staff";
        console.log("[useUser] final role set to:", role);

        setUser({
          id: authUser.id,
          email: authUser.email || "",
          role,
        });
      }
      setLoading(false);
    }
    fetchUser();
  }, [supabase]);

  return { user, loading, isAdmin: user?.role === "admin" };
}
