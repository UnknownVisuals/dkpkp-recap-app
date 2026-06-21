import { SpbFormData } from "@/types/spb";
import { Building2 } from "lucide-react";

interface SpbPrintProps {
  data: SpbFormData;
}

function isImageUrl(url: string) {
  return /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i.test(url);
}

export function SpbPrint({ data }: SpbPrintProps) {
  const lampiranUrl = data.lampiranUrl;

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
          SURAT PERINTAH BAYAR (SPB)
        </h3>
        <p className="text-xs">
          No: <span className="font-bold">{data.noSpb}</span>
        </p>
      </div>

      <div className="space-y-3 pt-4 text-justify">
        <p className="indent-8">
          Saya yang bertanda tangan di bawah ini, selaku Pengguna Anggaran
          memerintahkan Bendahara Pengeluaran agar melakukan pembayaran
          sejumlah:
        </p>
        <p className="pl-8 font-bold text-sm">
          Rp.{" "}
          <span className="underline font-bold px-1">
            {Number(data.nominal || 0).toLocaleString("id-ID")},-
          </span>
          <span className="text-xs font-normal italic ml-2">
            ({data.terbilang})
          </span>
        </p>
      </div>

      <div className="space-y-2.5 text-sm pt-6">
        <div className="grid grid-cols-[145px_10px_1fr] items-center gap-1">
          <span>Kepada</span>
          <span>:</span>
          <span className="border-b border-dotted border-black pb-0.5">
            {data.kepada}
          </span>
        </div>
        <div className="grid grid-cols-[145px_10px_1fr] items-start gap-1">
          <span>Untuk Pembayaran</span>
          <span>:</span>
          <span className="border-b border-dotted border-black pb-0.5">
            {data.untukPembayaran}
          </span>
        </div>
        <div className="grid grid-cols-[145px_10px_1fr] items-center gap-1">
          <span>Atas dasar</span>
          <span>:</span>
          <span className="border-b border-dotted border-black font-bold">
            {data.atasDasar}
          </span>
        </div>
        <div className="grid grid-cols-[145px_10px_1fr] items-start gap-1">
          <span>Kegiatan</span>
          <span>:</span>
          <span className="border-b border-dotted border-black pb-0.5">
            {data.kegiatan}
          </span>
        </div>
        <div className="grid grid-cols-[145px_10px_1fr] items-center gap-1">
          <span>Kode Sub Kegiatan</span>
          <span>:</span>
          <span className="border-b border-dotted border-black font-bold">
            {data.subKegiatan}
          </span>
        </div>
        <div className="grid grid-cols-[145px_10px_1fr] items-center gap-1">
          <span>Kode Rekening</span>
          <span>:</span>
          <span className="border-b border-dotted border-black font-bold">
            {data.kodeRekening}
          </span>
        </div>
      </div>

      <div className="pt-16 text-center text-xs grid grid-cols-2 gap-12">
        <div className="space-y-16">
          <p className="font-medium">
            Pejabat Pelaksana Teknis Kegiatan (PPTK)
          </p>
          <div className="space-y-1">
            {data.namaPptk ? (
              <>
                <p className="font-bold underline">{data.namaPptk}</p>
                <p className="text-[10px]">NIP. {data.nipPptk}</p>
              </>
            ) : (
              <>
                <p className="font-bold underline leading-relaxed tracking-widest">
                  ........................................
                </p>
                <p className="text-[10px]">
                  NIP. ........................................
                </p>
              </>
            )}
          </div>
        </div>
        <div className="space-y-16">
          <p className="font-medium">Pejabat Pembuat Komitmen (PPK)</p>
          <div className="space-y-1">
            {data.namaPpk ? (
              <>
                <p className="font-bold underline">{data.namaPpk}</p>
                <p className="text-[10px]">NIP. {data.nipPpk}</p>
              </>
            ) : (
              <>
                <p className="font-bold underline leading-relaxed tracking-widest">
                  ........................................
                </p>
                <p className="text-[10px]">
                  NIP. ........................................
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {lampiranUrl && (
        <div className="page-break-before mt-8 pt-8 border-t border-black">
          <p className="text-xs font-bold uppercase mb-4">
            Lampiran
          </p>
          {isImageUrl(lampiranUrl) ? (
            <div className="flex justify-center">
              <img
                src={lampiranUrl}
                alt="Lampiran"
                className="max-w-full h-auto"
                style={{ maxHeight: "90vh" }}
              />
            </div>
          ) : (
            <p className="text-xs italic">
              * Dokumen lampiran (PDF) tersedia di arsip digital.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
