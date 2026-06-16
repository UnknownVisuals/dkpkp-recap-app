import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MainLayout } from "@/components/layout/main-layout";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-sans",
});
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIPANGAN KPKP",
  description:
    "Dinas Ketahanan Pangan, Kelautan dan Pertanian Provinsi DKI Jakarta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        roboto.variable,
      )}
    >
      <body className="min-h-full font-sans">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
