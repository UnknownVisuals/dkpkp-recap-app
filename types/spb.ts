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
}

export interface SpbLogItem {
  id: string;
  date: string;
  recipient: string;
  amount: string;
  activity: string;
}

export interface SupabaseSpbRow {
  no_spb: string;
  tanggal: string;
  kepada: string;
  nominal: number;
  kegiatan: string;
}
