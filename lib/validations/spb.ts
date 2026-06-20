import type { SpbFormData } from "@/types/spb";

interface ValidationField {
  key: keyof SpbFormData;
  label: string;
}

const requiredFields: ValidationField[] = [
  { key: "noSpb", label: "Nomor Berkas Dokumen SPB" },
  { key: "tanggal", label: "Tanggal Perintah Pembayaran" },
  { key: "nominal", label: "Jumlah Nominal Pengeluaran" },
  { key: "terbilang", label: "Jumlah Uang Dalam Huruf" },
  { key: "kepada", label: "Kepada Penerima Bayar / Vendor" },
  { key: "untukPembayaran", label: "Tujuan Rincian Keperluan Pembayaran" },
  { key: "kegiatan", label: "Nama Paket Kegiatan Anggaran Dinas" },
  { key: "subKegiatan", label: "Kode Mata Anggaran Sub Kegiatan" },
  { key: "kodeRekening", label: "Kode Rekening Belanja Utama" },
];

export function validateSpbForm(formData: SpbFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of requiredFields) {
    const value = formData[field.key as keyof SpbFormData];
    if (!value || value.toString().trim() === "") {
      errors[field.key] = `${field.label} tidak boleh kosong`;
    }
  }

  return errors;
}
