"use client";

import { useEffect, useState } from "react";

export function useBudgetSummary() {
  const [summary, setSummary] = useState<{
    totalSpd: number;
    totalTerpakai: number;
    totalSisa: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBudget() {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data } = await supabase.from("budget_summary").select("*");
      if (data && data.length > 0) {
        setSummary({
          totalSpd: data.reduce((acc, r) => acc + Number(r.total_spd), 0),
          totalTerpakai: data.reduce(
            (acc, r) => acc + Number(r.total_terpakai),
            0,
          ),
          totalSisa: data.reduce((acc, r) => acc + Number(r.sisa_saldo), 0),
        });
      } else {
        setSummary({ totalSpd: 0, totalTerpakai: 0, totalSisa: 0 });
      }
      setLoading(false);
    }
    fetchBudget();
  }, []);

  return { summary, loading };
}
