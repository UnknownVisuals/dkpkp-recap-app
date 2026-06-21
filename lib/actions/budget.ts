"use server";

import { createClient } from "@/lib/supabase/server";

export async function addBudgetAccount(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return { success: false, error: "Forbidden" };

  const kode_rekening = formData.get("kode_rekening") as string;
  const nama_rekening = formData.get("nama_rekening") as string;
  const anggaran_total = Number(formData.get("anggaran_total"));

  if (!kode_rekening || !nama_rekening || !anggaran_total) {
    return { success: false, error: "Semua field harus diisi" };
  }

  const { error } = await supabase.from("budget_accounts").insert([
    { kode_rekening, nama_rekening, anggaran_total },
  ]);

  if (error) return { success: false, error: error.message };

  return { success: true };
}
