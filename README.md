# SIPANGAN KPKP

**Sistem Informasi Pengajuan dan Administrasi Keuangan**

A web-based financial administration and record-keeping application for Dinas Ketahanan Pangan, Kelautan dan Pertanian Provinsi DKI Jakarta. Manages two key government financial documents:

- **SPB (Surat Perintah Bayar)** — Payment Order documents for internal budget allocation
- **SPJ (Surat Pertanggungjawaban)** — Accountability/Liability reports for expenditure realization

## Tech Stack

| Category      | Tools                                                    |
| ------------- | -------------------------------------------------------- |
| Framework     | Next.js 16 (App Router)                                  |
| Language      | TypeScript 5                                              |
| UI Library    | React 19                                                  |
| CSS           | Tailwind CSS v4                                           |
| Components    | shadcn/ui (Radix UI primitives) with Mist theme           |
| Animations    | Framer Motion                                             |
| Icons         | Lucide React                                              |
| Auth & DB     | Supabase (PostgreSQL + SSR Auth)                          |
| Fonts         | Geist, Geist Mono, Roboto                                 |

## Features

- Email/password and Google OAuth authentication
- Dashboard with module navigation cards
- SPB data entry form with auto-format print layout
- SPJ data entry form with auto-format print layout
- Recap tables with persistent Supabase storage
- Print-ready document layouts
- Responsive design with dark mode support

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-supabase-anon-key>
```

## Build

```bash
npm run build
```
