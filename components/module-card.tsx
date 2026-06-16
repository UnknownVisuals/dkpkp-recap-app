import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  imageUrl: string;
}

export function ModuleCard({
  title,
  description,
  href,
  imageUrl,
}: ModuleCardProps) {
  return (
    <Link
      href={href}
      // KUNCI: Menggunakan aspect-[3/4] agar kartu selalu berbentuk portrait (tinggi),
      // dengan min-h-[480px] agar teks tidak bertumpuk di layar handphone yang sangat kecil.
      className="group relative block w-full aspect-3/4 min-h-120 rounded-[2.5rem] overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/50 transform hover:-translate-y-2"
    >
      {/* 1. Full Bleed Background Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      {/* 2. Contrast Gradient Overlay */}
      {/* Gradient ini menjamin teks putih selalu terbaca di atas gambar apapun */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      {/* 3. Soft Inner Ring (Efek border kaca / 3D) */}
      <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/20 pointer-events-none" />

      {/* 4. Content Container (Terletak di bagian bawah) */}
      <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end">
        {/* Animated content wrapper: Teks akan naik sedikit saat di-hover */}
        <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 leading-tight drop-shadow-md">
            {title}
          </h3>

          <p className="text-sm font-medium text-slate-300 leading-relaxed max-w-[95%] mb-8 drop-shadow-md line-clamp-3">
            {description}
          </p>

          {/* Action Button: Styled seperti tombol transparan yang solid saat di-hover */}
          <div className="flex items-center">
            <div className="flex items-center justify-center h-12 px-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm transition-all duration-300 group-hover:bg-white group-hover:text-slate-900 group-hover:shadow-xl">
              Akses Modul
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
