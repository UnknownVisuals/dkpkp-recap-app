export interface SpbFormData {
  noSpb: string;
  tanggal: string;
  nominal: string;
  terbilang: string;
  kepada: string;
  untukPembayaran: string;
  atasDasar: string;
  dibebankanPada: string;
  kegiatan: string;
  subKegiatan: string;
  kodeRekening: string;
  namaPptk: string;
  nipPptk: string;
  namaPpk: string;
  nipPpk: string;
  lampiranUrl: string;
}

export type SpbStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface SpbRow {
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
  status: SpbStatus;
  created_by: string;
  created_at: string;
  updated_at: string | null;
  catatan_penolakan: string | null;
  lampiran_url: string | null;
}

export interface SupabaseSpbRow {
  no_spb: string;
  tanggal: string;
  kepada: string;
  nominal: number;
  kegiatan: string;
  status: SpbStatus;
  created_by: string;
  created_at: string;
  updated_at: string | null;
  catatan_penolakan: string | null;
  lampiran_url: string | null;
}
