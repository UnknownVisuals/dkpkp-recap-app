import { Building2 } from "lucide-react";

interface SpbPrintProps {
  data: any;
}

export function SpbPrint({ data }: SpbPrintProps) {
  return (
    <div className="hidden print:block font-serif max-w-full text-black text-[14px] leading-relaxed p-0">
      {/* Official DKI Jakarta Letterhead (Kop Surat) */}
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

      {/* Document Sub-title Hierarchy */}
      <div className="text-center space-y-0.5 pt-4">
        <h3 className="text-base font-bold uppercase underline decoration-1 underline-offset-4">
          SURAT PERINTAH BAYAR (SPB)
        </h3>
        <p className="font-sans text-xs">
          No: <span className="font-mono font-bold">{data.noSpb}</span>
        </p>
      </div>

      {/* Narrative Body Statement */}
      <div className="space-y-3 pt-4 text-justify">
        <p className="indent-8">
          Saya yang bertanda tangan di bawah ini, selaku Pengguna Anggaran
          memerintahkan Bendahara Pengeluaran agar melakukan pembayaran
          sejumlah:
        </p>
        <p className="pl-8 font-sans font-bold text-sm">
          Rp.{" "}
          <span className="underline font-bold px-1">
            {Number(data.nominal || 0).toLocaleString("id-ID")},-
          </span>
          <span className="text-xs font-serif font-normal italic ml-2">
            ({data.terbilang})
          </span>
        </p>
      </div>

      {/* Traditional Aligned Form Fields Layout */}
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
          <span className="border-b border-dotted border-black font-mono font-bold">
            {data.subKegiatan}
          </span>
        </div>
        <div className="grid grid-cols-[145px_10px_1fr] items-center gap-1">
          <span>Kode Rekening</span>
          <span>:</span>
          <span className="border-b border-dotted border-black font-mono font-bold">
            {data.kodeRekening}
          </span>
        </div>
      </div>

      {/* Traditional 2x2 Official Signature Block Mapping */}
      <div className="pt-16 text-center font-sans text-xs grid grid-cols-2 gap-12">
        <div className="space-y-16">
          <p className="font-medium">Bendahara Pengeluaran</p>
          <div className="space-y-0.5">
            <p className="font-bold underline">Agung Laksono</p>
            <p className="font-mono text-[10px]">NIP. 19880508201101013</p>
          </div>
        </div>
        <div className="space-y-16 ml-auto w-60">
          <div className="text-left pl-4">
            <p>
              Jakarta,{" "}
              <span className="underline font-sans text-xs px-1">
                {data.tanggal}
              </span>
            </p>
            <p className="font-medium text-center mt-1">Pengguna Anggaran</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-bold underline text-center">
              Dr. drh. Hasudungan A. Sidabalok, M.Si.
            </p>
            <p className="font-mono text-[10px] text-center">
              NIP. 197308122006041004
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
