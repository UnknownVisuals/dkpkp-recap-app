import { Building2 } from "lucide-react";
import { SpjFormData } from "@/types/spj";

interface SpjPrintProps {
  data: SpjFormData;
}

export function SpjPrint({ data }: SpjPrintProps) {
  return (
    <div className="hidden print:block font-serif max-w-full text-black text-[14px] leading-relaxed p-0">
      <div className="flex items-start gap-4 border-b-4 border-double border-black pb-3 relative font-sans">
        <div className="w-14 h-18 border border-black flex items-center justify-center text-black shrink-0">
          <Building2 className="h-7 w-7 text-black" />
        </div>
        <div className="flex-1 text-center tracking-wide">
          <h2 className="text-[11px] font-bold uppercase leading-tight">
            Pemerintah Provinsi Daerah Khusus Ibukota Jakarta
          </h2>
          <h1 className="text-[13px] font-extrabold uppercase tracking-tight leading-snug">
            Dinas Ketahanan Pangan, Kelautan dan Pertanian
          </h1>
          <p className="text-[9px] font-medium text-slate-600 mt-0.5 leading-tight">
            Jalan Gunung Sahari Raya No.11 Telp. 6007251, 6286625, Sentral:
            021-XXXXXX, Fax. 6241617, 6007247
            <br />
            JAKARTA PUSAT <span className="font-semibold">Kode Pos 10720</span>
          </p>
        </div>
      </div>

      <div className="text-center space-y-0.5 pt-4">
        <h3 className="text-base font-bold uppercase underline decoration-1 underline-offset-4">
          SURAT PERTANGGUNGJAWABAN REALISASI (SPJ)
        </h3>
        <p className="font-sans text-xs">
          No: <span className="font-mono font-bold">{data.noSpj}</span>
        </p>
      </div>

      <div className="space-y-3 pt-4 text-justify">
        <p className="indent-8">
          Berdasarkan Surat Perintah Bayar Nomor{" "}
          <span className="font-bold font-mono">{data.relatedSpb}</span>,
          bersama dokumen ini dilaporkan penyerapan anggaran atas nama penerima
          pembayaran belanja terkait dengan perincian nilai sebagai berikut:
        </p>
      </div>

      <div className="space-y-2.5 text-sm pt-6">
        <div className="grid grid-cols-[145px_10px_1fr] items-center gap-1">
          <span>Pihak Penerima Dana</span>
          <span>:</span>
          <span className="border-b border-dotted border-black pb-0.5">
            {data.namaPenerima}
          </span>
        </div>
        <div className="grid grid-cols-[145px_10px_1fr] items-center gap-1">
          <span>Tanggal Pelaporan</span>
          <span>:</span>
          <span className="border-b border-dotted border-black pb-0.5 font-sans">
            {data.tanggal}
          </span>
        </div>
        <div className="grid grid-cols-[145px_10px_1fr] items-center gap-1">
          <span>Realisasi Dana</span>
          <span>:</span>
          <span className="border-b border-dotted border-black font-sans font-bold">
            Rp. {Number(data.realisasi || 0).toLocaleString("id-ID")},-
          </span>
        </div>
        <div className="grid grid-cols-[145px_10px_1fr] items-start gap-1">
          <span>Keterangan Alokasi</span>
          <span>:</span>
          <span className="border-b border-dotted border-black pb-0.5">
            {data.keterangan}
          </span>
        </div>
      </div>

      <div className="pt-20 text-center font-sans text-xs grid grid-cols-2 gap-12">
        <div className="space-y-16">
          <p className="font-medium">Verifikator Keuangan</p>
          <p className="font-bold underline">
            ......................................................
          </p>
        </div>
        <div className="space-y-16">
          <p className="font-medium">Penanggung Jawab Kegiatan (PPTK)</p>
          <p className="font-bold underline">
            ......................................................
          </p>
        </div>
      </div>
    </div>
  );
}
