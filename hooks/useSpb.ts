"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SupabaseSpbRow } from "@/types/spb";
import type { BudgetAccount } from "@/types/budget";

export function useSpb() {
  const [recaps, setRecaps] = useState<SupabaseSpbRow[]>([]);
  const [budgetAccounts, setBudgetAccounts] = useState<BudgetAccount[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSpbLogs = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("spb_recap")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRecaps(data as SupabaseSpbRow[]);
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

  const fetchSpbForEdit = useCallback(async (no_spb: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("spb_recap")
      .select("*")
      .eq("no_spb", no_spb)
      .single();

    if (!error && data) {
      return data as SupabaseSpbRow;
    }
    return null;
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const init = async () => {
      const { data: logs } = await supabase
        .from("spb_recap")
        .select("*")
        .order("created_at", { ascending: false });
      if (logs) setRecaps(logs as SupabaseSpbRow[]);

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
    fetchSpbLogs,
    fetchBudgetAccounts,
    fetchSpbForEdit,
  };
}
