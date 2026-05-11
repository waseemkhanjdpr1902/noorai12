import HeroSection from "@/components/HeroSection";
import SurahGrid from "@/components/SurahGrid";
import ToolGrid from "@/components/ToolGrid";
import MuraqbaSection from "@/components/MuraqbaSection";
import AIAssistant from "@/components/AIAssistant";
import { Book, Users, Globe, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <HeroSection />

      {/* Stats Bar */}
      <section className="py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Book, label: "Surahs", val: "114" },
            { icon: Users, label: "Active Users", val: "50k+" },
            { icon: Globe, label: "Countries", val: "120+" },
            { icon: Star, label: "Rating", val: "4.9/5" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <s.icon className="text-gold mb-3" size={24} />
              <span className="text-2xl font-display text-parchment">{s.val}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-parchment/30">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <SurahGrid />
      
      <ToolGrid />
      
      <MuraqbaSection />
      
      {/* Featured Verse */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center glass p-12 md:p-20 rounded-[60px] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gold/5 opacity-50 pointer-events-none" />
          <span className="text-gold font-arabic text-4xl mb-8 block">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </span>
          <h3 className="text-3xl md:text-5xl font-arabic text-parchment mb-10 leading-relaxed">
            وَإِذَا قُرِئَ الْقُرْآنُ فَاسْتَمِعُوا لَهُ وَأَنصِتُوا لَعَلَّكُمْ تُرْحَمُونَ
          </h3>
          <p className="text-gold/60 font-display text-xl mb-4 italic">
            &quot;So when the Quran is recited, then listen to it and pay attention that you may receive mercy.&quot;
          </p>
          <p className="text-parchment/30 text-sm uppercase tracking-widest">Surah Al-A&apos;raf — 7:204</p>
        </div>
      </section>

      <AIAssistant />
    </main>
  );
}
