"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitSpb(data: {
  no_spb: string;
  tanggal: string;
  nominal: number;
  terbilang: string;
  kepada: string;
  untuk_pembayaran: string;
  atas_dasar: string;
  dibebankan_pada: string | null;
  kegiatan: string;
  sub_kegiatan: string;
  kode_rekening: string;
  nama_pptk: string;
  nip_pptk: string;
  nama_ppk: string;
  nip_ppk: string;
  lampiran_url: string | null;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { error } = await supabase.from("spb_recap").insert([
    {
      ...data,
      status: "PENDING",
      created_by: user.id,
    },
  ]);

  if (error) return { success: false, error: error.message };

  return { success: true };
}

export async function updateSpb(data: {
  no_spb: string;
  tanggal: string;
  nominal: number;
  terbilang: string;
  kepada: string;
  untuk_pembayaran: string;
  atas_dasar: string;
  dibebankan_pada: string | null;
  kegiatan: string;
  sub_kegiatan: string;
  kode_rekening: string;
  nama_pptk: string;
  nip_pptk: string;
  nama_ppk: string;
  nip_ppk: string;
  lampiran_url: string | null;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("spb_recap")
    .update({
      tanggal: data.tanggal,
      nominal: data.nominal,
      terbilang: data.terbilang,
      kepada: data.kepada,
      untuk_pembayaran: data.untuk_pembayaran,
      atas_dasar: data.atas_dasar,
      dibebankan_pada: data.dibebankan_pada,
      kegiatan: data.kegiatan,
      sub_kegiatan: data.sub_kegiatan,
      kode_rekening: data.kode_rekening,
      nama_pptk: data.nama_pptk,
      nip_pptk: data.nip_pptk,
      nama_ppk: data.nama_ppk,
      nip_ppk: data.nip_ppk,
      lampiran_url: data.lampiran_url,
      status: "PENDING",
      catatan_penolakan: null,
    })
    .eq("no_spb", data.no_spb);

  if (error) return { success: false, error: error.message };

  return { success: true };
}
