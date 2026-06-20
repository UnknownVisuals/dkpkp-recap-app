"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitSpj(data: {
  no_spj: string;
  related_spb: string;
  tanggal: string;
  realisasi: number;
  keterangan: string;
  nama_penerima: string;
  lampiran_url: string | null;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  try {
    const { error } = await supabase.from("spj_recap").insert([
      {
        ...data,
        status: "PENDING",
        created_by: user.id,
      },
    ]);

    if (error) {
      if (error.message.includes("SALDO_TIDAK_CUKUP")) {
        return {
          success: false,
          errorType: "INSUFFICIENT_FUNDS" as const,
          message:
            "Saldo anggaran tidak mencukupi. Silakan hubungi admin untuk pengisian SPD.",
        };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function approveDocument(
  type: "spj" | "spb",
  id: string,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const table = type === "spj" ? "spj_recap" : "spb_recap";
  const idColumn = type === "spj" ? "no_spj" : "no_spb";

  const { error } = await supabase
    .from(table)
    .update({ status: "APPROVED" })
    .eq(idColumn, id);

  if (error) return { success: false, error: error.message };

  return { success: true };
}

export async function rejectDocument(
  type: "spj" | "spb",
  id: string,
  catatan: string,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const table = type === "spj" ? "spj_recap" : "spb_recap";
  const idColumn = type === "spj" ? "no_spj" : "no_spb";

  const { error } = await supabase
    .from(table)
    .update({
      status: "REJECTED",
      catatan_penolakan: catatan,
    })
    .eq(idColumn, id);

  if (error) return { success: false, error: error.message };

  return { success: true };
}

export async function updateSpj(data: {
  no_spj: string;
  related_spb: string;
  tanggal: string;
  realisasi: number;
  keterangan: string;
  nama_penerima: string;
  lampiran_url: string | null;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  try {
    const { error } = await supabase
      .from("spj_recap")
      .update({
        related_spb: data.related_spb,
        tanggal: data.tanggal,
        realisasi: data.realisasi,
        keterangan: data.keterangan,
        nama_penerima: data.nama_penerima,
        lampiran_url: data.lampiran_url,
        status: "PENDING",
        catatan_penolakan: null,
      })
      .eq("no_spj", data.no_spj);

    if (error) {
      if (error.message.includes("SALDO_TIDAK_CUKUP")) {
        return {
          success: false,
          errorType: "INSUFFICIENT_FUNDS" as const,
          message:
            "Saldo anggaran tidak mencukupi. Silakan hubungi admin untuk pengisian SPD.",
        };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
