"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { SpbFormData } from "@/types/spb";

interface SpbFormProps {
  formData: SpbFormData;
  onChange: (key: string, value: string) => void;
  onPrint: () => void;
  onSave: () => Promise<void>;
  isLoading: boolean;
}

export function SpbForm({
  formData,
  onChange,
  onPrint,
  onSave,
  isLoading,
}: SpbFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const requiredFields = [
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

  const validateForm = async () => {
    const currentErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      const value = formData[field.key as keyof SpbFormData];
      if (!value || value.toString().trim() === "") {
        currentErrors[field.key] = `${field.label} tidak boleh kosong`;
      }
    });

    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      await onSave();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 px-8 py-5">
        <h3 className="text-base font-black tracking-tight text-slate-900">
          Formulir Isian Input Data SPB
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Isi data anggaran secara terstruktur untuk sinkronisasi otomatis cetak
          kertas resmi.
        </p>
      </div>

      <div className="p-8">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="noSpb" className="text-xs font-bold">
                  Nomor Berkas Dokumen SPB
                </Label>
                <Input
                  id="noSpb"
                  value={formData.noSpb}
                  onChange={(e) => onChange("noSpb", e.target.value)}
                  disabled={isLoading}
                  placeholder="Cth: 719 / 28.26 / Y"
                  className={`h-10 text-sm ${errors.noSpb ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.noSpb && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.noSpb}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tanggal" className="text-xs font-bold">
                  Tanggal Perintah Pembayaran
                </Label>
                <DatePicker
                  value={formData.tanggal}
                  onChange={(value) => onChange("tanggal", value)}
                  disabled={isLoading}
                  placeholder="Pilih tanggal pembayaran"
                  error={!!errors.tanggal}
                />
                {errors.tanggal && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.tanggal}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nominal" className="text-xs font-bold">
                  Jumlah Nominal Pengeluaran (Rp)
                </Label>
                <Input
                  id="nominal"
                  type="number"
                  value={formData.nominal}
                  onChange={(e) => onChange("nominal", e.target.value)}
                  disabled={isLoading}
                  placeholder="Cth: 2500000"
                  className={`h-10 text-sm ${errors.nominal ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.nominal && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.nominal}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="terbilang" className="text-xs font-bold">
                  Jumlah Uang Dalam Huruf (Terbilang)
                </Label>
                <Input
                  id="terbilang"
                  value={formData.terbilang}
                  onChange={(e) => onChange("terbilang", e.target.value)}
                  disabled={isLoading}
                  placeholder="Cth: Dua Juta Lima Ratus Ribu Rupiah"
                  className={`h-10 text-sm ${errors.terbilang ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.terbilang && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.terbilang}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="kepada" className="text-xs font-bold">
                  Kepada Penerima Bayar / Vendor
                </Label>
                <Input
                  id="kepada"
                  value={formData.kepada}
                  onChange={(e) => onChange("kepada", e.target.value)}
                  disabled={isLoading}
                  placeholder="Cth: Daftar Nama Terlampir"
                  className={`h-10 text-sm ${errors.kepada ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.kepada && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.kepada}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="untukPembayaran" className="text-xs font-bold">
                  Tujuan Rincian Keperluan Pembayaran
                </Label>
                <Input
                  id="untukPembayaran"
                  value={formData.untukPembayaran}
                  onChange={(e) => onChange("untukPembayaran", e.target.value)}
                  disabled={isLoading}
                  placeholder="Cth: Honorarium Tim Anggota TNI/Polri"
                  className={`h-10 text-sm ${errors.untukPembayaran ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.untukPembayaran && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.untukPembayaran}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs font-extrabold tracking-wide uppercase text-slate-500">
                Data Kegiatan Anggaran
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="kegiatan" className="text-xs font-bold">
                Nama Paket Kegiatan Anggaran Dinas
              </Label>
              <Input
                id="kegiatan"
                value={formData.kegiatan}
                onChange={(e) => onChange("kegiatan", e.target.value)}
                disabled={isLoading}
                placeholder="Cth: Pelaksanaan Pengawasan Keamanan Pangan Segar"
                className={`h-10 text-sm ${errors.kegiatan ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.kegiatan && (
                <p className="text-xs font-medium text-destructive">
                  {errors.kegiatan}
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="subKegiatan" className="text-xs font-bold">
                  Kode Mata Anggaran Sub Kegiatan
                </Label>
                <Input
                  id="subKegiatan"
                  value={formData.subKegiatan}
                  onChange={(e) => onChange("subKegiatan", e.target.value)}
                  disabled={isLoading}
                  placeholder="Cth: 2.09.05.1.01.0008"
                  className={`h-10 text-sm font-mono ${errors.subKegiatan ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.subKegiatan && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.subKegiatan}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="kodeRekening" className="text-xs font-bold">
                  Kode Rekening Belanja Utama
                </Label>
                <Input
                  id="kodeRekening"
                  value={formData.kodeRekening}
                  onChange={(e) => onChange("kodeRekening", e.target.value)}
                  disabled={isLoading}
                  placeholder="Cth: 5.1.02.02.01.00004"
                  className={`h-10 text-sm font-mono ${errors.kodeRekening ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.kodeRekening && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.kodeRekening}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs font-extrabold tracking-wide uppercase text-slate-500">
                Pejabat Penandatangan
              </span>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4">
              <span className="text-xs font-extrabold tracking-wide uppercase text-slate-600 block">
                Pejabat Pelaksana Teknis Kegiatan (PPTK)
              </span>
              <div className="space-y-2">
                <Label className="text-xs font-bold">
                  Nama Lengkap Pejabat
                </Label>
                <Input
                  value={formData.namaPptk || ""}
                  onChange={(e) => onChange("namaPptk", e.target.value)}
                  disabled={isLoading}
                  placeholder="Cth: Solihin"
                  className="h-10 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">NIP Pejabat Teknis</Label>
                <Input
                  value={formData.nipPptk || ""}
                  onChange={(e) => onChange("nipPptk", e.target.value)}
                  disabled={isLoading}
                  placeholder="Cth: 197206051998031010"
                  className="h-10 text-sm font-mono"
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4">
              <span className="text-xs font-extrabold tracking-wide uppercase text-slate-600 block">
                Pejabat Pembuat Komitmen (PPK)
              </span>
              <div className="space-y-2">
                <Label className="text-xs font-bold">
                  Nama Lengkap Pejabat
                </Label>
                <Input
                  value={formData.namaPpk || ""}
                  onChange={(e) => onChange("namaPpk", e.target.value)}
                  disabled={isLoading}
                  placeholder="Cth: Lya Imbasari"
                  className="h-10 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">
                  NIP Pejabat Komitmen
                </Label>
                <Input
                  value={formData.nipPpk || ""}
                  onChange={(e) => onChange("nipPpk", e.target.value)}
                  disabled={isLoading}
                  placeholder="Cth: 196907071999032003"
                  className="h-10 text-sm font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button
              type="button"
              onClick={onPrint}
              variant="outline"
              size="lg"
              disabled={isLoading}
              className="font-semibold text-sm px-6"
            >
              Cetak Dokumen
            </Button>

            <Button
              type="button"
              onClick={validateForm}
              disabled={isLoading}
              size="lg"
              className="font-semibold text-sm px-6"
            >
              {isLoading ? (
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
