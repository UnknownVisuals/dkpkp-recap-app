export interface SpjFormData {
  noSpj: string;
  relatedSpb: string;
  tanggal: string;
  realisasi: string;
  keterangan: string;
  namaPenerima: string;
  lampiranUrl: string;
}

export type SpjStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface SpjRow {
  no_spj: string;
  related_spb: string;
  tanggal: string;
  realisasi: number;
  keterangan: string;
  nama_penerima: string;
  status: SpjStatus;
  created_by: string;
  created_at: string;
  updated_at: string | null;
  catatan_penolakan: string | null;
  lampiran_url: string | null;
}

export interface SupabaseSpjRow {
  no_spj: string;
  related_spb: string;
  tanggal: string;
  realisasi: number;
  nama_penerima: string;
  status: SpjStatus;
  created_by: string;
  created_at: string;
  updated_at: string | null;
  catatan_penolakan: string | null;
  lampiran_url: string | null;
}
