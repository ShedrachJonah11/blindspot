'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAuthStore } from "@/store/useAuthStore";
// import { useThemeStore } from "@/store/useThemeStore";

const navItems = [
  { href: "/scan", label: "Scan" },
  { href: "/library", label: "Library" },
  { href: "/example", label: "Example" }
];

export default function Navbar() {
  const pathname = usePathname();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  // const theme = useThemeStore((state) => state.theme);
  // const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={clsx(
            "rounded-full px-4 py-2 transition-colors",
            pathname?.startsWith(item.href)
              ? "bg-white text-[#0f1729] shadow"
              : "hover:bg-white/15 hover:text-white"
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-40">
      {scrolled ? (
        <div className="pb-4 transition-all duration-500 ease-out">
          <div className="container">
            <div className="relative mx-auto flex items-center justify-center">
              <div className="absolute inset-x-4 -bottom-2 h-6 rounded-full bg-black/20 blur-2xl transition-all duration-500 ease-out" />
              <div className="relative flex w-full max-w-4xl items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 shadow-card backdrop-blur transition-all duration-500 ease-out">
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                  Blindspot
                </Link>
                <nav className="flex flex-1 items-center justify-center gap-2 text-sm font-medium text-ink-100">
                  {renderLinks()}
                </nav>
                <div className="flex items-center gap-2">
                  {!isLoggedIn && (
                    <Link
                      href="/login"
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-ink-50 transition hover:border-white/30 hover:bg-white/20 hover:text-white"
                    >
                      Login
                    </Link>
                  )}
                  {isLoggedIn && (
                    <button
                      onClick={handleLogout}
                      className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f1729] transition hover:-translate-y-0.5"
                    >
                      Logout
                    </button>
                  )}
                  {/* <button
                    onClick={toggleTheme}
                    className="rounded-full border border-white/10 bg-white/10 p-2 text-sm transition hover:bg-white/20"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? "☀️" : "🌙"}
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0f1729]/80 backdrop-blur transition-all duration-500 ease-out">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="text-lg font-bold tracking-tight text-white">
              Blindspot
            </Link>
            <nav className="flex items-center gap-2 text-sm font-medium text-ink-100 transition-all duration-300">
              {!isLoggedIn && (
                <Link
                  href="/login"
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 font-semibold text-ink-50 transition hover:border-white/30 hover:text-white"
                >
                  Login
                </Link>
              )}
              {renderLinks()}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 font-semibold text-ink-50 transition hover:border-white/30 hover:text-white"
                >
                  Logout
                </button>
              )}
              {/* <button
                onClick={toggleTheme}
                className="rounded-full border border-white/10 bg-white/10 p-2 text-sm transition hover:bg-white/20"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button> */}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
