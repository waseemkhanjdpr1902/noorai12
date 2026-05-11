import type { Metadata } from "next";
import { Inter, Playfair_Display, Amiri } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-arabic" });

export const metadata: Metadata = {
  title: "NurulQuran",
  description: "A modern Islamic spiritual companion app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${amiri.variable}`}>
        {children}
      </body>
    </html>
  );
}
