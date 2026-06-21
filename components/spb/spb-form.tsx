"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { SpbFormData } from "@/types/spb";
import { useFileUpload } from "@/hooks/useFileUpload";
import { validateSpbForm } from "@/lib/validations/spb";
import { formatCurrency, stripCurrency } from "@/lib/format";
import type { BudgetAccount } from "@/types/budget";

interface SpbFormProps {
  formData: SpbFormData;
  onChange: (key: string, value: string) => void;
  onPrint: () => void;
  onSave: (lampiranUrl: string) => Promise<void>;
  isLoading: boolean;
  budgetAccounts: BudgetAccount[];
}

export function SpbForm({
  formData,
  onChange,
  onPrint,
  onSave,
  isLoading,
  budgetAccounts,
}: SpbFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { file, uploading, handleFileChange, upload } = useFileUpload();
  const selectedAccount = budgetAccounts.find(
    (a) => a.kode_rekening === formData.kodeRekening,
  ) ?? null;

  const validateForm = async () => {
    const currentErrors = validateSpbForm(formData);
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      const lampiranUrl = await upload();
      await onSave(lampiranUrl);
    }
  };

  const isBusy = isLoading || uploading;

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
                  disabled={isBusy}
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
                  disabled={isBusy}
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
                  type="text"
                  inputMode="numeric"
                  value={formatCurrency(formData.nominal)}
                  onChange={(e) =>
                    onChange("nominal", stripCurrency(e.target.value))
                  }
                  disabled={isBusy}
                  placeholder="Cth: 2.500.000"
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
                  disabled={isBusy}
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
                  disabled={isBusy}
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
                  disabled={isBusy}
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
                disabled={isBusy}
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
                  disabled={isBusy}
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
                <Combobox
                  value={selectedAccount}
                  onValueChange={(acc) => onChange("kodeRekening", acc?.kode_rekening ?? "")}
                  items={budgetAccounts}
                  itemToStringLabel={(acc) => `${acc.kode_rekening} - ${acc.nama_rekening}`}
                >
                  <ComboboxInput
                    placeholder="Pilih rekening belanja"
                    disabled={isBusy}
                    aria-invalid={!!errors.kodeRekening || undefined}
                  />
                  <ComboboxContent>
                    <ComboboxList>
                      {(acc: BudgetAccount) => (
                        <ComboboxItem key={acc.kode_rekening} value={acc}>
                          {acc.kode_rekening} - {acc.nama_rekening}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                    <ComboboxEmpty>
                      Rekening tidak ditemukan
                    </ComboboxEmpty>
                  </ComboboxContent>
                </Combobox>
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
                  disabled={isBusy}
                  placeholder="Cth: Solihin"
                  className="h-10 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">NIP Pejabat Teknis</Label>
                <Input
                  value={formData.nipPptk || ""}
                  onChange={(e) => onChange("nipPptk", e.target.value)}
                  disabled={isBusy}
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
                  disabled={isBusy}
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
                  disabled={isBusy}
                  placeholder="Cth: 196907071999032003"
                  className="h-10 text-sm font-mono"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lampiran" className="text-xs font-bold">
              Lampiran Dokumen (PDF/Gambar, Maks. 5MB)
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="lampiran"
                type="file"
                accept=".pdf,image/*"
                disabled={isBusy}
                onChange={handleFileChange}
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
              disabled={isBusy}
              className="font-semibold text-sm px-6"
            >
              Cetak Dokumen
            </Button>

            <Button
              type="button"
              onClick={validateForm}
              disabled={isBusy}
              size="lg"
              className="font-semibold text-sm px-6"
            >
              {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
