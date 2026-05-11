"use client";

import { motion } from "motion/react";
import { Sparkles, Book, Heart, Globe, ArrowRight, Compass, Shield, ScrollText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolGrid from "@/components/ToolGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Editorial Style */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/10 bg-gold/5 mb-12"
            >
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">The Modern Islamic Experience</span>
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="text-[12vw] lg:text-[10vw] font-display text-parchment leading-[0.85] mb-12 tracking-tight uppercase"
            >
              Light of the <br /> <span className="text-gold italic">Faithful</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-parchment/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-16 font-light italic"
            >
              &quot;Allah is the Light of the heavens and the earth.&quot; <br />
              <span className="text-parchment/20 text-sm not-italic mt-2 block">— An-Nur 24:35</span>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8"
            >
              <Link href="/quran" className="group relative px-12 py-5 rounded-2xl overflow-hidden shadow-2xl shadow-gold/20">
                <div className="absolute inset-0 gold-gradient group-hover:scale-105 transition-transform duration-500" />
                <div className="relative flex items-center gap-3 text-ink font-bold z-10">
                  Begin Journey <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link href="/dawah" className="px-12 py-5 glass border border-gold/20 text-gold font-bold rounded-2xl hover:bg-gold/5 transition-all flex items-center gap-3">
                 Explore Dawah <Globe size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Bento Section */}
      <section className="relative py-32 bg-ink">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-display text-parchment mb-4">Spiritual <span className="text-gold italic">Toolkit</span></h2>
              <p className="text-parchment/40 max-w-md">Everything you need for your daily spiritual growth, crafted with precision and care.</p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-white/5 mx-12 mb-4" />
            <div className="flex items-center gap-4 text-parchment/20 text-xs font-bold uppercase tracking-widest">
              <span>Updated 2026</span>
              <div className="w-1 h-1 rounded-full bg-gold/40" />
              <span>V4.2.0</span>
            </div>
          </div>
        </div>
        
        <ToolGrid />
      </section>

      {/* Featured Quote / Section */}
      <section className="py-48 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full" />
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <ScrollText size={48} className="text-gold/20 mx-auto mb-12" />
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-5xl font-display text-parchment leading-tight mb-12 italic font-light"
          >
            &quot;Verily, in the remembrance of Allah do hearts find rest.&quot;
          </motion.blockquote>
          <div className="text-gold uppercase tracking-[0.4em] font-bold text-xs">— Ar-Ra&apos;d 13:28</div>
        </div>
      </section>

      {/* Featured Content / Stats */}
      <section className="py-32 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="flex items-center gap-3 text-gold mb-6 uppercase tracking-widest text-xs font-bold">
                <Shield size={16} /> 100% Authentic Sources
              </div>
              <h2 className="text-4xl md:text-6xl font-display text-parchment mb-8 leading-tight">
                Built for the <br /> <span className="text-gold">Modern Ummah</span>
              </h2>
              <p className="text-parchment/60 text-lg leading-relaxed mb-12">
                NurulQuran combines the timeless wisdom of the Quran and Sunnah with 
                cutting-edge technology to provide an immersive spiritual experience 
                wherever you are.
              </p>
              
              <ul className="space-y-6">
                {[
                  "Verified Hadith & Duas from Sahih Bukhari & Muslim",
                  "AI-Powered Dawah Assistant for deep explorations",
                  "Location-based Prayer Times with high precision",
                  "Beautifully rendered Digital Quran interface"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-parchment/80">
                    <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 size={14} className="text-gold" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[60px] overflow-hidden glass border border-white/5 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="w-full h-full rounded-[40px] border border-white/10 glass-card flex flex-col items-center justify-center text-center p-12 animate-float">
                    <Sparkles size={64} className="text-gold mb-8" />
                    <div className="text-4xl font-display text-parchment mb-4">Nurul AI</div>
                    <p className="text-parchment/40 text-sm italic">Always ready to guide your spirit.</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative nodes */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full glass border border-gold/20 flex items-center justify-center text-gold shadow-2xl shadow-gold/20 backdrop-blur-3xl animate-bounce [animation-duration:4s]">
                <Globe size={32} />
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-3xl glass border border-gold/20 flex items-center justify-center text-gold shadow-2xl shadow-gold/20 backdrop-blur-3xl">
                <Heart size={28} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
