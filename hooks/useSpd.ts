"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SupabaseSpdRow } from "@/types/spd";
import type { BudgetAccount } from "@/types/budget";

export function useSpd() {
  const [recaps, setRecaps] = useState<SupabaseSpdRow[]>([]);
  const [budgetAccounts, setBudgetAccounts] = useState<BudgetAccount[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSpdLogs = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("spd_recap")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRecaps(data as SupabaseSpdRow[]);
    }
  }, []);

  const fetchBudgetAccounts = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("budget_accounts")
      .select("*")
      .order("kode_rekening", { ascending: true });

    if (data) {
      setBudgetAccounts(data as BudgetAccount[]);
    }
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const init = async () => {
      const { data: logs } = await supabase
        .from("spd_recap")
        .select("*")
        .order("created_at", { ascending: false });
      if (logs) setRecaps(logs as SupabaseSpdRow[]);

      const { data: accounts } = await supabase
        .from("budget_accounts")
        .select("*")
        .order("kode_rekening", { ascending: true });
      if (accounts) setBudgetAccounts(accounts as BudgetAccount[]);
    };
    init();
  }, []);

  return {
    recaps,
    budgetAccounts,
    loading,
    setLoading,
    fetchSpdLogs,
    fetchBudgetAccounts,
  };
}
