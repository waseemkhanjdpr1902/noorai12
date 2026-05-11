import type { Metadata } from "next";
import { Inter, Playfair_Display, Amiri } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic"], variable: "--font-amiri" });

export const metadata: Metadata = {
  title: "NurulQuran — Beautiful Modern Quran Platform",
  description: "Experience the Quran with luxury editorial design, AI-powered study tools, and seamless donations.",
  keywords: ["Quran", "Islam", "AI", "Tafsir", "Surah", "Muslim"],
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RemembrancePopup from "@/components/RemembrancePopup";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${amiri.variable}`}>
      <body className="font-sans bg-ink">
        <Navbar />
        {children}
        <Footer />
        <RemembrancePopup />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </body>
    </html>
  );
}
