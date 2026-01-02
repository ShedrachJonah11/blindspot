'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    router.push('/library');
  };

  if (isLoggedIn) {
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <div className="card border-white/5 p-6 shadow-card text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-ink-300">Already logged in</p>
          <h1 className="mt-1 text-3xl font-semibold text-white">You&apos;re all set!</h1>
          <p className="mt-2 text-sm text-ink-200">
            You&apos;re already logged in. Head to your library to continue.
          </p>
          <div className="mt-6">
            <Link
              href="/library"
              className="inline-block rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 px-6 py-3 text-sm font-semibold text-white shadow-brand-900/30 transition hover:-translate-y-0.5"
            >
              Go to Library
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="card border-white/5 p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.2em] text-ink-300">Account</p>
        <h1 className="mt-1 text-3xl font-semibold text-white">Login to Blindspot</h1>
        <p className="mt-2 text-sm text-ink-200">
          Dummy auth screen for staging. Wire this up to your identity provider when you add a
          backend; today it keeps UI flow consistent.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-ink-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-ink-50 focus:border-brand-400/70 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-ink-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-ink-50 focus:border-brand-400/70 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 px-4 py-3 text-sm font-semibold text-white shadow-brand-900/30 transition hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>
      </div>
      <div className="text-center">
        <Link href="/" className="text-sm text-ink-300 hover:text-white transition">
          ← Back to landing
        </Link>
      </div>
    </div>
  );
}
