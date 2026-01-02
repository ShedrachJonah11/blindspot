'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const renderLinks = (mobile = false) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => mobile && setMobileMenuOpen(false)}
          className={clsx(
            "rounded-full px-4 py-2 transition-colors",
            mobile ? "block w-full text-center" : "",
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
      <AnimatePresence mode="wait">
        {scrolled ? (
          <motion.div
            key="scrolled"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pb-4 pt-4"
          >
            <div className="container">
              <div className="relative mx-auto flex items-center justify-center">
                <div className="absolute inset-x-4 -bottom-2 h-6 rounded-full bg-black/20 blur-2xl" />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex w-full max-w-4xl items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-3 shadow-card backdrop-blur"
                >
                  <Link
                    href="/"
                    className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20 md:px-4"
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-400" />
                    <span className="hidden sm:inline">Blindspot</span>
                  </Link>
                  <nav className="hidden md:flex flex-1 items-center justify-center gap-2 text-sm font-medium text-ink-100">
                    {renderLinks()}
                  </nav>
                  <div className="flex items-center gap-2 ml-auto">
                    {!isLoggedIn && (
                      <Link
                        href="/login"
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-ink-50 transition hover:border-white/30 hover:bg-white/20 hover:text-white md:px-4 md:text-sm"
                      >
                        Login
                      </Link>
                    )}
                    {isLoggedIn && (
                      <button
                        onClick={handleLogout}
                        className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#0f1729] transition hover:-translate-y-0.5 md:px-4 md:text-sm"
                      >
                        Logout
                      </button>
                    )}
                    <button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      className="md:hidden rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
                      aria-label="Toggle menu"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {mobileMenuOpen ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        )}
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="not-scrolled"
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0f1729]/80 backdrop-blur"
          >
            <div className="container flex items-center justify-between py-4">
              <Link href="/" className="text-lg font-bold tracking-tight text-white">
                Blindspot
              </Link>
              <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-ink-100">
                {renderLinks()}
              </nav>
              <div className="flex items-center gap-2">
                {!isLoggedIn && (
                  <Link
                    href="/login"
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-ink-50 transition hover:border-white/30 hover:text-white md:px-4 md:text-sm"
                  >
                    Login
                  </Link>
                )}
                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-ink-50 transition hover:border-white/30 hover:text-white md:px-4 md:text-sm"
                  >
                    Logout
                  </button>
                )}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/20"
                  aria-label="Toggle menu"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {mobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0f1729]/95 backdrop-blur border-t border-white/10">
          <div className="container py-4 space-y-2">
            {renderLinks(true)}
          </div>
        </div>
      )}
    </header>
  );
}
