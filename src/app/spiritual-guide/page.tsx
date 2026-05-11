"use client";

import { motion } from "motion/react";
import { Sparkles, Heart, Wind, Moon, Eye, ArrowRight, BookOpen, Sun, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function SpiritualGuidePage() {
  const sections = [
    {
      title: "The Essence of Muraqba",
      description: "Muraqba is the Islamic practice of deep meditation and mindfulness. It is the state of being aware that Allah is always watching over us, leading to a heart filled with tranquility and Divine love.",
      icon: Moon,
      color: "text-gold",
      details: [
        "Preparation: Find a quiet space and settle your heart.",
        "Intention: Set your intention to seek the closeness of Allah.",
        "Stillness: Allow your body to be still while your heart remains active in remembrance.",
        "Observation: Observe the thoughts passing through your mind without attachment."
      ]
    },
    {
      title: "Tazkiyah: Purification of the Soul",
      description: "The journey of the soul begins with purification. By removing the diseases of the heart—such as pride, envy, and greed—we make room for Divine light to enter.",
      icon: Heart,
      color: "text-rose-400",
      details: [
        "Self-Reflection (Muhasabah): Daily accounting of one's deeds.",
        "Repentance (Tawbah): Turning back to Allah with a sincere heart.",
        "Gratitude (Shukr): Recognizing the blessings in every moment.",
        "Patience (Sabr): Finding strength in the face of adversity."
      ]
    },
    {
      title: "Dhikr: The Remembrance of Allah",
      description: "Dhikr is the polish of the heart. It is the constant remembrance of the Creator through words and contemplation, keeping the soul connected to its Source.",
      icon: Sparkles,
      color: "text-emerald-400",
      details: [
        "Morning & Evening Adhkar: Protecting the soul throughout the day.",
        "Contemplation of Nature: Seeing the signs of Allah in the universe.",
        "Recitation of the Beautiful Names: Connecting with the attributes of Allah.",
        "Sending Blessings (Salawat): Increasing love for the Prophet (ﷺ)."
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold font-medium tracking-[0.4em] uppercase text-xs mb-6 block"
          >
            The Path to Inner Peace
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display text-parchment mb-8 leading-tight"
          >
            Spiritual <span className="text-gold italic">Guide</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-parchment/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light"
          >
            A comprehensive journey into the depths of Islamic spirituality, 
            designed to help you find tranquility, purpose, and a deeper connection with your Creator.
          </motion.p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { title: "Ihsan", desc: "To worship Allah as if you see Him.", icon: Eye },
            { title: "Ikhlas", desc: "Sincerity in every action and thought.", icon: ShieldCheck },
            { title: "Noor", desc: "The light of guidance in the heart.", icon: Sun },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-[32px] border-white/5 text-center group hover:border-gold/20 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-gold group-hover:scale-110 transition-transform">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-display text-parchment mb-4">{item.title}</h3>
              <p className="text-parchment/40 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-32">
          {sections.map((section, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}>
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 1 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 ${section.color}`}>
                  <section.icon size={32} />
                </div>
                <h2 className="text-4xl md:text-5xl font-display text-parchment mb-8">{section.title}</h2>
                <p className="text-parchment/60 text-lg leading-relaxed mb-10 font-light">
                  {section.description}
                </p>
                <ul className="space-y-4">
                  {section.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-4 text-parchment/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                      <span className="text-sm md:text-base">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-1 w-full"
              >
                <div className="aspect-[4/5] glass rounded-[60px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gold/5 blur-[100px] rounded-full animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <section.icon size={120} className={`${section.color} opacity-10 group-hover:scale-110 transition-transform duration-700`} />
                  </div>
                  <div className="absolute bottom-12 left-12 right-12">
                    <p className="text-gold font-arabic text-4xl mb-4 opacity-40">نور على نور</p>
                    <p className="text-parchment/30 text-xs uppercase tracking-[0.3em]">Light upon Light</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-48 p-12 md:p-24 glass rounded-[60px] text-center border-gold/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gold/5 blur-[120px] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <Sparkles className="text-gold mx-auto mb-8" size={48} />
            <h2 className="text-4xl md:text-6xl font-display text-parchment mb-8">Ready to Begin?</h2>
            <p className="text-parchment/50 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
              The journey of a thousand miles begins with a single step. 
              Start your spiritual transformation today by connecting with the Divine Word.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link 
                href="/#surahs" 
                className="w-full md:w-auto px-12 py-5 gold-gradient text-ink font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3"
              >
                Read the Quran <BookOpen size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
