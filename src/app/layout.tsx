import type { Metadata } from "next";
import { Quicksand, Playfair_Display } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "HeladeríaMenu1",
  description: "Helados artesanales hechos con amor — Menú virtual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${quicksand.variable} ${playfair.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
