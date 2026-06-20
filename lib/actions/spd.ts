"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitSpd(data: {
  no_spd: string;
  tanggal: string;
  kode_rekening: string;
  nominal: number;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { error } = await supabase.from("spd_recap").insert([
    {
      ...data,
      created_by: user.id,
    },
  ]);

  if (error) return { success: false, error: error.message };

  return { success: true };
}
