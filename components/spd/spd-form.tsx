"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import type { SpdFormData } from "@/types/spd";
import type { BudgetAccount } from "@/types/budget";
import { formatCurrency, stripCurrency } from "@/lib/format";

interface SpdFormProps {
  formData: SpdFormData;
  onChange: (key: string, value: string) => void;
  onSave: () => Promise<void>;
  isLoading: boolean;
  budgetAccounts: BudgetAccount[];
}

export function SpdForm({
  formData,
  onChange,
  onSave,
  isLoading,
  budgetAccounts,
}: SpdFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const requiredFields = [
    { key: "noSpd", label: "Nomor SPD" },
    { key: "tanggal", label: "Tanggal SPD" },
    { key: "kodeRekening", label: "Kode Rekening" },
    { key: "nominal", label: "Nominal Pengisian Dana" },
  ];

  const validateForm = async () => {
    const currentErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      const value = formData[field.key as keyof SpdFormData];
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
          Formulir Pengisian Dana SPD
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Isi data penyediaan dana untuk menambah saldo anggaran pada rekening
          terkait.
        </p>
      </div>

      <div className="p-8">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="noSpd" className="text-xs font-bold">
                Nomor SPD
              </Label>
              <Input
                id="noSpd"
                value={formData.noSpd}
                onChange={(e) => onChange("noSpd", e.target.value)}
                disabled={isLoading}
                placeholder="Cth: 001 / SPD / DKPKP / 2026"
                className={`h-10 text-sm ${errors.noSpd ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.noSpd && (
                <p className="text-xs font-medium text-destructive">
                  {errors.noSpd}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tanggal" className="text-xs font-bold">
                Tanggal SPD
              </Label>
              <DatePicker
                value={formData.tanggal}
                onChange={(value) => onChange("tanggal", value)}
                disabled={isLoading}
                placeholder="Pilih tanggal SPD"
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
              <Label htmlFor="kodeRekening" className="text-xs font-bold">
                Kode Rekening
              </Label>
              <Select
                value={formData.kodeRekening}
                onValueChange={(value) => onChange("kodeRekening", value)}
                disabled={isLoading}
              >
                <SelectTrigger
                  id="kodeRekening"
                  className={`w-full ${errors.kodeRekening ? "border-destructive focus-visible:ring-destructive" : ""}`}
                >
                  <SelectValue placeholder="Pilih rekening belanja" />
                </SelectTrigger>
                <SelectContent>
                  {budgetAccounts.map((acc) => (
                    <SelectItem
                      key={acc.kode_rekening}
                      value={acc.kode_rekening}
                    >
                      {acc.kode_rekening} - {acc.nama_rekening}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.kodeRekening && (
                <p className="text-xs font-medium text-destructive">
                  {errors.kodeRekening}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nominal" className="text-xs font-bold">
                Nominal Pengisian Dana (Rp)
              </Label>
              <Input
                id="nominal"
                type="text"
                inputMode="numeric"
                value={formatCurrency(formData.nominal)}
                onChange={(e) =>
                  onChange("nominal", stripCurrency(e.target.value))
                }
                disabled={isLoading}
                placeholder="Cth: 50.000.000"
                className={`h-10 text-sm ${errors.nominal ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.nominal && (
                <p className="text-xs font-medium text-destructive">
                  {errors.nominal}
                </p>
              )}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
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
                "Simpan SPD"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
