export interface SpjFormData {
  noSpj: string;
  relatedSpb: string;
  tanggal: string;
  realisasi: string;
  keterangan: string;
  namaPenerima: string;
}

export interface SpjLogItem {
  id: string;
  relatedSpb: string;
  date: string;
  realization: string;
  recipient: string;
}

export interface SupabaseSpjRow {
  no_spj: string;
  related_spb: string;
  tanggal: string;
  realisasi: number;
  nama_penerima: string;
}
