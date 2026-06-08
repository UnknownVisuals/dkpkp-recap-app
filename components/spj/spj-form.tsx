"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Link2,
  UploadCloud,
} from "lucide-react";

interface SpjFormProps {
  formData: any;
  onChange: (key: string, value: string) => void;
  onPrint: () => void;
}

export function SpjForm({ formData, onChange, onPrint }: SpjFormProps) {
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
              <Label className="text-xs font-bold">Nomor Registrasi SPJ</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData.noSpj}
                  onChange={(e) => onChange("noSpj", e.target.value)}
                  className="h-10 text-sm pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold">
                Referensi Hubungan Nomor SPB
              </Label>
              <div className="relative">
                <Link2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData.relatedSpb}
                  onChange={(e) => onChange("relatedSpb", e.target.value)}
                  className="h-10 text-sm font-mono pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold">Tanggal Pengajuan</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) => onChange("tanggal", e.target.value)}
                  className="h-10 text-sm pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold">
                Total Nilai Realisasi Belanja (Rp)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={formData.realisasi}
                  onChange={(e) => onChange("realisasi", e.target.value)}
                  className="h-10 text-sm pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold">
              Pihak Penerima Alokasi Belanja
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={formData.namaPenerima}
                onChange={(e) => onChange("namaPenerima", e.target.value)}
                className="h-10 text-sm pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold">
              Keterangan / Deskripsi Alokasi Belanja
            </Label>
            <Textarea
              value={formData.keterangan}
              onChange={(e) => onChange("keterangan", e.target.value)}
              rows={3}
              className="resize-none text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold">
              Lampiran Bukti Fisik Kwitansi Resmi
            </Label>
            <div className="border border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer">
              <UploadCloud className="h-6 w-6 text-muted-foreground mb-1" />
              <span className="text-xs font-semibold">
                Pilih file nota transaksi untuk diupload
              </span>
              <span className="text-[10px] text-muted-foreground">
                Format yang didukung: PDF / Gambar (Maks 5MB)
              </span>
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
              <Printer className="mr-2 h-4 w-4" /> Pratinjau Cetak
            </Button>
            <Button
              type="button"
              size="lg"
              className="font-semibold text-sm px-6 flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" /> Kunci Berkas SPJ
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
