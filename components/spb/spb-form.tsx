"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-base font-bold">
          Formulir Isian Input Data SPB
        </CardTitle>
        <CardDescription className="text-xs">
          Isi data anggaran secara terstruktur untuk sinkronisasi otomatis cetak
          kertas resmi.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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
                className={`h-10 text-sm ${errors.noSpb ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.noSpb && (
                <p className="text-[11px] font-medium text-destructive">
                  {errors.noSpb}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tanggal" className="text-xs font-bold">
                Tanggal Perintah Pembayaran
              </Label>
              <Input
                id="tanggal"
                type="date"
                value={formData.tanggal}
                onChange={(e) => onChange("tanggal", e.target.value)}
                disabled={isLoading}
                className={`h-10 text-sm ${errors.tanggal ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.tanggal && (
                <p className="text-[11px] font-medium text-destructive">
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
                className={`h-10 text-sm ${errors.nominal ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.nominal && (
                <p className="text-[11px] font-medium text-destructive">
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
                className={`h-10 text-sm ${errors.terbilang ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.terbilang && (
                <p className="text-[11px] font-medium text-destructive">
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
                className={`h-10 text-sm ${errors.kepada ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.kepada && (
                <p className="text-[11px] font-medium text-destructive">
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
                className={`h-10 text-sm ${errors.untukPembayaran ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.untukPembayaran && (
                <p className="text-[11px] font-medium text-destructive">
                  {errors.untukPembayaran}
                </p>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="kegiatan" className="text-xs font-bold">
              Nama Paket Kegiatan Anggaran Dinas
            </Label>
            <Input
              id="kegiatan"
              value={formData.kegiatan}
              onChange={(e) => onChange("kegiatan", e.target.value)}
              disabled={isLoading}
              className={`h-10 text-sm ${errors.kegiatan ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.kegiatan && (
              <p className="text-[11px] font-medium text-destructive">
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
                className={`h-10 text-sm font-mono ${errors.subKegiatan ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.subKegiatan && (
                <p className="text-[11px] font-medium text-destructive">
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
                className={`h-10 text-sm font-mono ${errors.kodeRekening ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.kodeRekening && (
                <p className="text-[11px] font-medium text-destructive">
                  {errors.kodeRekening}
                </p>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="p-4 border rounded-lg space-y-4">
              <span className="text-[11px] font-extrabold tracking-wide uppercase text-muted-foreground block">
                Pejabat Pelaksana Teknis Kegiatan (PPTK)
              </span>
              <div className="space-y-2">
                <Label className="text-[11px] font-medium">
                  Nama Lengkap Pejabat
                </Label>
                <Input
                  value={formData.namaPptk || ""}
                  onChange={(e) => onChange("namaPptk", e.target.value)}
                  disabled={isLoading}
                  className="h-9 text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-medium">
                  NIP Pejabat Teknis
                </Label>
                <Input
                  value={formData.nipPptk || ""}
                  onChange={(e) => onChange("nipPptk", e.target.value)}
                  disabled={isLoading}
                  className="h-9 text-xs font-mono"
                />
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-4">
              <span className="text-[11px] font-extrabold tracking-wide uppercase text-muted-foreground block">
                Pejabat Pembuat Komitmen (PPK)
              </span>
              <div className="space-y-2">
                <Label className="text-[11px] font-medium">
                  Nama Lengkap Pejabat
                </Label>
                <Input
                  value={formData.namaPpk || ""}
                  onChange={(e) => onChange("namaPpk", e.target.value)}
                  disabled={isLoading}
                  className="h-9 text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-medium">
                  NIP Pejabat Komitmen
                </Label>
                <Input
                  value={formData.nipPpk || ""}
                  onChange={(e) => onChange("nipPpk", e.target.value)}
                  disabled={isLoading}
                  className="h-9 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              onClick={onPrint}
              variant="outline"
              size="lg"
              disabled={isLoading}
              className="font-semibold text-sm"
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
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
