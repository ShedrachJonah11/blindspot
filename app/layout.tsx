import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blindspot | Upload your material. See where you'll likely get confused.",
  description: "Scan notes, links, or photos and get a playful Blindspot Report of tricky parts."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={font.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-to-b from-[#0f1729] to-[#0b1223] text-ink-50 dark:from-[#0f1729] dark:to-[#0b1223] light:from-gray-50 light:to-white light:text-gray-900">
            <Navbar />
            <main className="container pb-16 pt-6 md:pt-10">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
