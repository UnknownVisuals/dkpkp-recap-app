"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, stripCurrency } from "@/lib/format";

interface BudgetFormProps {
  onSuccess: () => void;
}

export function BudgetForm({ onSuccess }: BudgetFormProps) {
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [anggaran, setAnggaran] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!kode.trim() || !nama.trim() || !anggaran.trim()) {
      setError("Semua field harus diisi");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("kode_rekening", kode);
    formData.append("nama_rekening", nama);
    formData.append("anggaran_total", String(stripCurrency(anggaran)));

    const { addBudgetAccount } = await import("@/lib/actions/budget");
    const result = await addBudgetAccount(formData);
    setLoading(false);

    if (result.success) {
      setKode("");
      setNama("");
      setAnggaran("");
      onSuccess();
    } else {
      setError(result.error ?? "Gagal menyimpan");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 px-8 py-5">
        <h3 className="text-base font-black tracking-tight text-slate-900">
          Tambah Rekening Baru
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Masukkan kode rekening, nama, dan total anggaran.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="kode_rekening" className="text-xs font-bold">
            Kode Rekening
          </Label>
          <Input
            id="kode_rekening"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            disabled={loading}
            placeholder="Cth: 5.1.02.01.01.0001"
            className="h-10 text-sm font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nama_rekening" className="text-xs font-bold">
            Nama Rekening
          </Label>
          <Input
            id="nama_rekening"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            disabled={loading}
            placeholder="Cth: Belanja Gaji Pokok PNS"
            className="h-10 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="anggaran_total" className="text-xs font-bold">
            Total Anggaran (Rp)
          </Label>
          <Input
            id="anggaran_total"
            type="text"
            inputMode="numeric"
            value={formatCurrency(anggaran)}
            onChange={(e) => setAnggaran(stripCurrency(e.target.value))}
            disabled={loading}
            placeholder="Cth: 100.000.000"
            className="h-10 text-sm"
          />
        </div>

        {error && (
          <p className="text-xs font-medium text-destructive">{error}</p>
        )}

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="font-semibold text-sm px-6"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Simpan Rekening"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
