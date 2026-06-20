"use client";

import { useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { SpjFormData } from "@/types/spj";
import { uploadLampiran } from "@/lib/actions/storage";

interface SpjFormProps {
  formData: SpjFormData;
  onChange: (key: string, value: string) => void;
  onPrint: () => void;
  onSave: (lampiranUrl: string) => Promise<void>;
  isLoading: boolean;
  approvedSpbs: string[];
}

export function SpjForm({
  formData,
  onChange,
  onPrint,
  onSave,
  isLoading,
  approvedSpbs,
}: SpjFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredFields = [
    { key: "noSpj", label: "Nomor Registrasi SPJ" },
    { key: "relatedSpb", label: "Referensi Hubungan Nomor SPB" },
    { key: "tanggal", label: "Tanggal Pengajuan SPJ" },
    { key: "realisasi", label: "Total Realisasi Anggaran Terpakai" },
    { key: "namaPenerima", label: "Pihak Penerima Dana Anggaran Belanja" },
    { key: "keterangan", label: "Keterangan Realisasi Belanja" },
  ];

  const validateForm = async () => {
    const currentErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      const value = formData[field.key as keyof SpjFormData];
      if (!value || value.toString().trim() === "") {
        currentErrors[field.key] = `${field.label} tidak boleh kosong`;
      }
    });

    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      setUploading(true);
      try {
        let lampiranUrl = "";
        if (file) {
          const formDataUpload = new FormData();
          formDataUpload.append("file", file);
          const result = await uploadLampiran(formDataUpload);
          lampiranUrl = result.publicUrl;
        }
        await onSave(lampiranUrl);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 px-8 py-5">
        <h3 className="text-base font-black tracking-tight text-slate-900">
          Laporan Penyusunan Dokumen SPJ
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Catat nilai transaksi riil penyerapan dana untuk memvalidasi perintah
          bayar terkait.
        </p>
      </div>

      <div className="p-8">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="noSpj" className="text-xs font-bold">
                Nomor Registrasi SPJ
              </Label>
              <Input
                id="noSpj"
                value={formData.noSpj}
                onChange={(e) => onChange("noSpj", e.target.value)}
                disabled={isLoading || uploading}
                placeholder="Cth: 120 / SPJ / DKPKP / 2026"
                className={`h-10 text-sm ${errors.noSpj ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.noSpj && (
                <p className="text-xs font-medium text-destructive">
                  {errors.noSpj}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="relatedSpb" className="text-xs font-bold">
                Referensi Hubungan Nomor SPB
              </Label>
              <select
                id="relatedSpb"
                value={formData.relatedSpb}
                onChange={(e) => onChange("relatedSpb", e.target.value)}
                disabled={isLoading || uploading}
                className={`flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.relatedSpb ? "border-destructive focus-visible:ring-destructive" : ""}`}
              >
                <option value="">Pilih SPB yang sudah disetujui</option>
                {approvedSpbs.map((spb) => (
                  <option key={spb} value={spb}>
                    {spb}
                  </option>
                ))}
              </select>
              {errors.relatedSpb && (
                <p className="text-xs font-medium text-destructive">
                  {errors.relatedSpb}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tanggal" className="text-xs font-bold">
                Tanggal Pengajuan SPJ
              </Label>
              <DatePicker
                value={formData.tanggal}
                onChange={(value) => onChange("tanggal", value)}
                disabled={isLoading || uploading}
                placeholder="Pilih tanggal pengajuan"
                error={!!errors.tanggal}
              />
              {errors.tanggal && (
                <p className="text-xs font-medium text-destructive">
                  {errors.tanggal}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="realisasi" className="text-xs font-bold">
                Total Realisasi Anggaran Terpakai (Rp)
              </Label>
              <Input
                id="realisasi"
                type="number"
                value={formData.realisasi}
                onChange={(e) => onChange("realisasi", e.target.value)}
                disabled={isLoading || uploading}
                placeholder="Cth: 2450000"
                className={`h-10 text-sm ${errors.realisasi ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.realisasi && (
                <p className="text-xs font-medium text-destructive">
                  {errors.realisasi}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="namaPenerima" className="text-xs font-bold">
              Pihak Penerima Dana Anggaran Belanja
            </Label>
            <Input
              id="namaPenerima"
              value={formData.namaPenerima}
              onChange={(e) => onChange("namaPenerima", e.target.value)}
              disabled={isLoading || uploading}
              placeholder="Cth: Koordinator Lapangan TNI/Polri"
              className={`h-10 text-sm ${errors.namaPenerima ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.namaPenerima && (
              <p className="text-xs font-medium text-destructive">
                {errors.namaPenerima}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="keterangan" className="text-xs font-bold">
              Keterangan / Rincian Realisasi Belanja
            </Label>
            <Textarea
              id="keterangan"
              value={formData.keterangan}
              onChange={(e) => onChange("keterangan", e.target.value)}
              disabled={isLoading || uploading}
              rows={3}
              placeholder="Cth: Pembayaran Honorarium Transaksi Satgas Lapangan Terlampir"
              className={`resize-none text-sm ${errors.keterangan ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.keterangan && (
              <p className="text-xs font-medium text-destructive">
                {errors.keterangan}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lampiran" className="text-xs font-bold">
              Berita Acara / Kwitansi (PDF/Gambar)
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="lampiran"
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/*"
                disabled={isLoading || uploading}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="h-10 text-sm file:cursor-pointer"
              />
            </div>
            {file && (
              <p className="text-xs text-muted-foreground mt-1">
                Terpilih: {file.name}
              </p>
            )}
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button
              type="button"
              onClick={onPrint}
              variant="outline"
              size="lg"
              disabled={isLoading || uploading}
              className="font-semibold text-sm *:"
            >
              Cetak Dokumen
            </Button>

            <Button
              type="button"
              onClick={validateForm}
              disabled={isLoading || uploading}
              size="lg"
              className="font-semibold text-sm px-6"
            >
              {isLoading || uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Simpan"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
