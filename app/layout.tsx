import type { Metadata } from "next";
import "./globals.css";
import { Kiwi_Maru, Inter } from "next/font/google";

const kiwi = Kiwi_Maru({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jp",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-en",
});

export const metadata: Metadata = {
  title: "英文法カード",
  description: "Wordholic風：英文法一問一答カード学習",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${kiwi.variable} ${inter.variable}`}>
      <body className="min-h-dvh font-[var(--font-jp)]">
        {children}
      </body>
    </html>
  );
}
