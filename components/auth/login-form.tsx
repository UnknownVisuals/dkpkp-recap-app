"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { GoogleAuthButton } from "./google-button";

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-bold">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className="h-10 text-sm"
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs font-bold">
            Password
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
          <p className="text-xs font-medium text-destructive">{error}</p>
        )}

        <Button type="submit" disabled={loading} size="lg" className="w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <GoogleAuthButton text="Sign in with Google" />

      <p className="text-center text-sm text-slate-500">
        Don`t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
