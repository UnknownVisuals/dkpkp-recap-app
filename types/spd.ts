export interface SpdFormData {
  noSpd: string;
  tanggal: string;
  kodeRekening: string;
  nominal: string;
}

export interface SupabaseSpdRow {
  no_spd: string;
  tanggal: string;
  kode_rekening: string;
  nominal: number;
  created_by: string;
  created_at: string;
  updated_at: string | null;
}
