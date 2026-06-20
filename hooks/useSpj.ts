"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SupabaseSpjRow } from "@/types/spj";

export function useSpj() {
  const [recaps, setRecaps] = useState<SupabaseSpjRow[]>([]);
  const [approvedSpbs, setApprovedSpbs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSpjLogs = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("spj_recap")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRecaps(data as SupabaseSpjRow[]);
    }
  }, []);

  const fetchApprovedSpbs = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("spb_recap")
      .select("no_spb")
      .eq("status", "APPROVED")
      .order("created_at", { ascending: false });

    if (data) {
      setApprovedSpbs(data.map((row) => row.no_spb));
    }
  }, []);

  const fetchSpjForEdit = useCallback(async (no_spj: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("spj_recap")
      .select("*")
      .eq("no_spj", no_spj)
      .single();

    if (!error && data) {
      return data as SupabaseSpjRow;
    }
    return null;
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const init = async () => {
      const { data: logs } = await supabase
        .from("spj_recap")
        .select("*")
        .order("created_at", { ascending: false });
      if (logs) setRecaps(logs as SupabaseSpjRow[]);

      const { data: spbs } = await supabase
        .from("spb_recap")
        .select("no_spb")
        .eq("status", "APPROVED")
        .order("created_at", { ascending: false });
      if (spbs) setApprovedSpbs(spbs.map((row) => row.no_spb));
    };
    init();
  }, []);

  return {
    recaps,
    approvedSpbs,
    loading,
    setLoading,
    fetchSpjLogs,
    fetchApprovedSpbs,
    fetchSpjForEdit,
  };
}
