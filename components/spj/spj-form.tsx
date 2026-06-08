"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SpjFormData } from "@/types/spj";

interface SpjFormProps {
  formData: SpjFormData;
  onChange: (key: string, value: string) => void;
  onPrint: () => void;
  onSave: () => Promise<void>;
  isLoading: boolean;
}

export function SpjForm({
  formData,
  onChange,
  onPrint,
  onSave,
  isLoading,
}: SpjFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      await onSave();
    }
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-base font-bold">
          Laporan Penyusunan Dokumen SPJ
        </CardTitle>
        <CardDescription className="text-xs">
          Catat nilai transaksi riil penyerapan dana untuk memvalidasi perintah
          bayar terkait.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
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
                disabled={isLoading}
                className={`h-10 text-sm ${errors.noSpj ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.noSpj && (
                <p className="text-[11px] font-medium text-destructive">
                  {errors.noSpj}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="relatedSpb" className="text-xs font-bold">
                Referensi Hubungan Nomor SPB
              </Label>
              <Input
                id="relatedSpb"
                value={formData.relatedSpb}
                onChange={(e) => onChange("relatedSpb", e.target.value)}
                disabled={isLoading}
                className={`h-10 text-sm font-mono ${errors.relatedSpb ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.relatedSpb && (
                <p className="text-[11px] font-medium text-destructive">
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

            <div className="space-y-2">
              <Label htmlFor="realisasi" className="text-xs font-bold">
                Total Realisasi Anggaran Terpakai (Rp)
              </Label>
              <Input
                id="realisasi"
                type="number"
                value={formData.realisasi}
                onChange={(e) => onChange("realisasi", e.target.value)}
                disabled={isLoading}
                className={`h-10 text-sm ${errors.realisasi ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.realisasi && (
                <p className="text-[11px] font-medium text-destructive">
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
              disabled={isLoading}
              className={`h-10 text-sm ${errors.namaPenerima ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.namaPenerima && (
              <p className="text-[11px] font-medium text-destructive">
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
              disabled={isLoading}
              rows={3}
              className={`resize-none text-sm ${errors.keterangan ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.keterangan && (
              <p className="text-[11px] font-medium text-destructive">
                {errors.keterangan}
              </p>
            )}
          </div>

          <Separator />

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              onClick={onPrint}
              variant="outline"
              size="lg"
              disabled={isLoading}
              className="font-semibold text-sm"
            >
              Cetak
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
