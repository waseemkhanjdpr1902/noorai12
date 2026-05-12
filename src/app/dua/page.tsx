"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Search, BookOpen, Sun, Moon, Sunrise, Sunset, CloudSun, Loader2, Copy, Share2, Volume2, VolumeX } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DUAS = [
  {
    id: 1,
    category: "morning",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    translation: "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the Final Return.",
    reference: "Abu Dawud 4/317",
  },
  {
    id: 2,
    category: "evening",
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    translation: "O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the Final Return.",
    reference: "Abu Dawud 4/317",
  }
];

export default function DuaPage() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const toggleAudio = (dua: any) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = "";
    }

    if (playingId === dua.id) {
      setPlayingId(null);
      setCurrentAudio(null);
      return;
    }

    const audio = new Audio(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(dua.arabic)}&tl=ar&client=tw-ob`);
    audio.onended = () => {
      setPlayingId(null);
      setCurrentAudio(null);
    };
    audio.play();
    setPlayingId(dua.id);
    setCurrentAudio(audio);
  };

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      
      <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display text-parchment mb-6 tracking-tight"
          >
            Dua & <span className="text-gold italic">Adhkar</span>
          </motion.h1>
          <p className="text-parchment/40 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            A curated collection of authentic supplications from the Quran and Sunnah. Now with audio recitation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {DUAS.map((dua) => (
            <motion.div
              key={dua.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 md:p-12 rounded-[40px] border-white/5 hover:border-gold/20 transition-all group"
            >
              <div className="text-right mb-8">
                <p className="text-3xl md:text-5xl font-arabic text-parchment leading-relaxed">
                  {dua.arabic}
                </p>
              </div>
              
              <div className="space-y-4 mb-10">
                <p className="text-parchment/80 text-lg leading-relaxed">{dua.translation}</p>
                <div className="flex items-center gap-2 text-gold/40 text-xs font-bold uppercase tracking-[0.2em]">
                  <BookOpen size={14} /> {dua.reference}
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleAudio(dua)}
                    className={`p-4 rounded-2xl transition-all ${
                      playingId === dua.id 
                      ? "bg-gold text-ink scale-110 shadow-lg shadow-gold/20" 
                      : "glass text-parchment/30 hover:text-gold"
                    }`}
                  >
                    {playingId === dua.id ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <button className="p-4 glass rounded-2xl text-parchment/30 hover:text-gold transition-colors">
                    <Copy size={20} />
                  </button>
                  <button className="p-4 glass rounded-2xl text-parchment/30 hover:text-gold transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
                <button className="text-parchment/20 hover:text-rose-500 transition-colors">
                  <Heart size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
