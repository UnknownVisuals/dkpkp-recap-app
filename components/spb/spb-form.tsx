"use client";

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
import {
  Calendar,
  DollarSign,
  User,
  Hash,
  CheckCircle2,
  Printer,
} from "lucide-react";

interface SpbFormProps {
  formData: any;
  onChange: (key: string, value: string) => void;
  onPrint: () => void;
}

export function SpbForm({ formData, onChange, onPrint }: SpbFormProps) {
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
              <Label className="text-xs font-bold">Nomor Berkas SPB</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData.noSpb}
                  onChange={(e) => onChange("noSpb", e.target.value)}
                  className="pl-10 h-10 text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold">Tanggal Perintah</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) => onChange("tanggal", e.target.value)}
                  className="pl-10 h-10 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold">
                Nominal Pembayaran (Rp)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={formData.nominal}
                  onChange={(e) => onChange("nominal", e.target.value)}
                  className="pl-10 h-10 text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold">
                Uang Dalam Huruf (Terbilang)
              </Label>
              <Input
                value={formData.terbilang}
                onChange={(e) => onChange("terbilang", e.target.value)}
                className="h-10 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold">
                Kepada Penerima / Vendor
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData.kepada}
                  onChange={(e) => onChange("kepada", e.target.value)}
                  className="pl-10 h-10 text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold">
                Untuk Rincian Pembayaran
              </Label>
              <Input
                value={formData.untukPembayaran}
                onChange={(e) => onChange("untukPembayaran", e.target.value)}
                className="h-10 text-sm"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="text-xs font-bold">
              Nama Paket Kegiatan Anggaran
            </Label>
            <Input
              value={formData.kegiatan}
              onChange={(e) => onChange("kegiatan", e.target.value)}
              className="h-10 text-sm"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold">Kode Sub Kegiatan</Label>
              <Input
                value={formData.subKegiatan}
                onChange={(e) => onChange("subKegiatan", e.target.value)}
                className="h-10 text-sm font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold">Kode Rekening Utama</Label>
              <Input
                value={formData.kodeRekening}
                onChange={(e) => onChange("kodeRekening", e.target.value)}
                className="h-10 text-sm font-mono"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              onClick={onPrint}
              variant="outline"
              size="lg"
              className="font-semibold text-sm"
            >
              <Printer className="mr-2 h-4 w-4" /> Pratinjau Cetak A4
            </Button>
            <Button
              type="button"
              size="lg"
              className="font-semibold text-sm px-6 flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" /> Simpan Transaksi Ke Supabase
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
