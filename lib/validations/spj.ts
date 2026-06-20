import type { SpjFormData } from "@/types/spj";

interface ValidationField {
  key: keyof SpjFormData;
  label: string;
}

const requiredFields: ValidationField[] = [
  { key: "noSpj", label: "Nomor Registrasi SPJ" },
  { key: "relatedSpb", label: "Referensi Hubungan Nomor SPB" },
  { key: "tanggal", label: "Tanggal Pengajuan SPJ" },
  { key: "realisasi", label: "Total Realisasi Anggaran Terpakai" },
  { key: "namaPenerima", label: "Pihak Penerima Dana Anggaran Belanja" },
  { key: "keterangan", label: "Keterangan Realisasi Belanja" },
];

export function validateSpjForm(formData: SpjFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of requiredFields) {
    const value = formData[field.key as keyof SpjFormData];
    if (!value || value.toString().trim() === "") {
      errors[field.key] = `${field.label} tidak boleh kosong`;
    }
  }

  return errors;
}
