"use client";

import { SpdFormData } from "@/types/spd";

interface SpdPrintProps {
  data: SpdFormData;
}

export function SpdPrint({ data }: SpdPrintProps) {
  const hasData = data.noSpd || data.tanggal || data.nominal;

  if (!hasData) return null;

  return (
    <div className="hidden print:block p-8">
      <h1 className="text-xl font-bold text-center mb-6">
        SURAT PENYEDIAAN DANA (SPD)
      </h1>
      <table className="w-full border-collapse border border-black text-sm">
        <tbody>
          <tr>
            <td className="border border-black px-3 py-2 font-bold w-48">
              Nomor SPD
            </td>
            <td className="border border-black px-3 py-2">{data.noSpd}</td>
          </tr>
          <tr>
            <td className="border border-black px-3 py-2 font-bold">Tanggal</td>
            <td className="border border-black px-3 py-2">{data.tanggal}</td>
          </tr>
          <tr>
            <td className="border border-black px-3 py-2 font-bold">
              Kode Rekening
            </td>
            <td className="border border-black px-3 py-2">
              {data.kodeRekening}
            </td>
          </tr>
          <tr>
            <td className="border border-black px-3 py-2 font-bold">Nominal</td>
            <td className="border border-black px-3 py-2">
              Rp {Number(data.nominal).toLocaleString("id-ID")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
