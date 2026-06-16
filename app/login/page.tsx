"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Proses login
    let { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Jika gagal karena belum terdaftar, lakukan pendaftaran (Sign Up) otomatis
    if (authError && authError.message.includes("Invalid login credentials")) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      authError = signUpError;
      if (!signUpError)
        alert(
          "Akun berhasil dibuat otomatis! Silakan klik Akses Sistem sekali lagi.",
        );
    }

    if (authError) {
      setError(authError.message);
    } else {
      router.push("/"); // Arahkan ke dashboard
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-slate-50">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 shrink-0">
            <Building2 className="h-6 w-6 text-slate-700" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Login Portal
          </h1>
          <p className="text-xs text-muted-foreground">
            Sistem E-Recap DKPKP Jakarta
          </p>
        </div>

        <Card>
          <CardHeader className="border-b space-y-1">
            <CardTitle className="text-base font-bold">
              Otentikasi Pengguna
            </CardTitle>
            <CardDescription className="text-xs">
              Masuk atau daftar untuk mengakses sistem.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold">
                  Alamat Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="h-10 text-sm"
                  placeholder="nama@jakarta.go.id"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold">
                  Kata Sandi
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="h-10 text-sm"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-xs font-medium">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 font-semibold text-sm"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" /> Akses Sistem
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
