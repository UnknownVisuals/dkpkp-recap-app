import { Building2 } from "lucide-react";
import { SpdFormData } from "@/types/spd";

interface SpdPrintProps {
  data: SpdFormData;
}

export function SpdPrint({ data }: SpdPrintProps) {
  return (
    <div className="hidden print:block font-serif max-w-full text-black text-[12px] leading-relaxed p-0">
      <div className="flex items-start gap-4 border-b-4 border-double border-black pb-3 relative font-sans">
        <div className="w-14 h-16 border border-black flex items-center justify-center text-black shrink-0">
          <Building2 className="h-7 w-7 text-black" />
        </div>
        <div className="flex-1 text-center tracking-wide">
          <h2 className="text-[11px] font-bold uppercase leading-tight">
            Pemerintah Provinsi Daerah Khusus Ibukota Jakarta
          </h2>
          <h1 className="text-[13px] font-extrabold uppercase tracking-tight leading-snug">
            Dinas Ketahanan Pangan, Kelautan dan Pertanian
          </h1>
          <p className="text-[9px] font-medium mt-0.5 leading-tight">
            Jalan Gunung Sahari Raya No.11 Telp. 6007251, 6286625, Sentral:
            021-XXXXXX, Fax. 6241617, 6007247
            <br />
            JAKARTA PUSAT <span className="font-semibold">Kode Pos 10720</span>
          </p>
        </div>
      </div>

      <div className="text-center space-y-0.5 pt-4">
        <h3 className="text-base font-bold uppercase underline decoration-1 underline-offset-4">
          SURAT PENYEDIAAN DANA (SPD)
        </h3>
        <p className="text-xs">
          No: <span className="font-bold">{data.noSpd}</span>
        </p>
      </div>

      <div className="space-y-3 pt-4 text-justify">
        <p className="indent-8">
          Yang bertanda tangan di bawah ini selaku Pengguna Anggaran menyediakan
          dana untuk keperluan belanja dengan rincian sebagai berikut:
        </p>
      </div>

      <div className="space-y-2.5 text-sm pt-6">
        <div className="grid grid-cols-[145px_10px_1fr] items-center gap-1">
          <span>Tanggal SPD</span>
          <span>:</span>
          <span className="border-b border-dotted border-black pb-0.5">
            {data.tanggal}
          </span>
        </div>
        <div className="grid grid-cols-[145px_10px_1fr] items-center gap-1">
          <span>Kode Rekening</span>
          <span>:</span>
          <span className="border-b border-dotted border-black font-bold">
            {data.kodeRekening}
          </span>
        </div>
        <div className="grid grid-cols-[145px_10px_1fr] items-center gap-1">
          <span>Jumlah Dana</span>
          <span>:</span>
          <span className="border-b border-dotted border-black font-bold">
            Rp. {Number(data.nominal || 0).toLocaleString("id-ID")},-
          </span>
        </div>
      </div>

      <div className="pt-16 text-center text-xs grid grid-cols-2 gap-12">
        <div className="space-y-16">
          <p className="font-medium">Pejabat Pembuat Komitmen (PPK)</p>
          <div className="space-y-1">
            <p className="font-bold underline leading-relaxed tracking-widest">
              ........................................
            </p>
            <p className="text-[10px]">
              NIP. ........................................
            </p>
          </div>
        </div>
        <div className="space-y-16">
          <p className="font-medium">Bendahara Pengeluaran</p>
          <div className="space-y-1">
            <p className="font-bold underline leading-relaxed tracking-widest">
              ........................................
            </p>
            <p className="text-[10px]">
              NIP. ........................................
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
