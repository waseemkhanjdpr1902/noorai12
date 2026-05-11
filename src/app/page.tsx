"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SurahGrid from "@/components/SurahGrid";
import AIAssistant from "@/components/AIAssistant";
import RemembrancePopup from "@/components/RemembrancePopup";
import MuraqbaSection from "@/components/MuraqbaSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content Areas */}
      <div className="relative z-10">
        <SurahGrid />
        
        <MuraqbaSection />
      </div>

      <AIAssistant />
      <RemembrancePopup />
      <Footer />
    </main>
  );
}
