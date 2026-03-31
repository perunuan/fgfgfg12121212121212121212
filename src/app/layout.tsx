import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Диполь — Технологическая поддержка предприятий радиоэлектронной промышленности",
  description: "Модернизация и технологическая поддержка предприятий. Оборудование для поверхностного монтажа, микроэлектроники, контрольно-измерительные приборы.",
  keywords: "SMT оборудование, поверхностный монтаж, микроэлектроника, контрольно-измерительные приборы",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
