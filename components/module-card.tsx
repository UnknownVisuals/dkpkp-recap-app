import Image from "next/image";
import Link from "next/link";

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
      className="group relative block w-full aspect-3/4 min-h-120 rounded-[1.5rem] overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 transform hover:-translate-y-2"
    >
      {/* Full-bleed background image */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      {/* Contrast gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Soft inner ring */}
      <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/20 pointer-events-none" />

      {/* Content container at bottom */}
      <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end">
        {/* Animated content wrapper: text lifts on hover */}
        <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 leading-tight drop-shadow-md">
            {title}
          </h3>

          <p className="text-sm font-medium text-slate-300 leading-relaxed max-w-[95%] mb-8 drop-shadow-md line-clamp-3">
            {description}
          </p>

          {/* Action button: transparent glass style, solid on hover */}
          <div className="flex items-center">
            <div className="flex items-center justify-center h-12 px-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm transition-all duration-300 group-hover:bg-white group-hover:text-primary group-hover:shadow-xl">
              Access Module
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
