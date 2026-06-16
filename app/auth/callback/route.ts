import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  if (code) {
    // Memanggil utility cookies() bawaan Next.js
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch (error) {
              // Blok catch ini diperlukan jika setAll dipanggil dari area
              // di mana cookie tidak dapat dimodifikasi secara langsung.
              console.error("Error setting cookies:", error);
            }
          },
        },
      },
    );

    // Tukar kode token dengan sesi aktif
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Sesi berhasil disimpan ke cookie, arahkan ke dashboard
      return NextResponse.redirect(`${requestUrl.origin}${next}`);
    } else {
      console.error("Auth callback error:", error.message);
    }
  }

  // Jika gagal, arahkan kembali ke login dengan indikator error
  return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`);
}
