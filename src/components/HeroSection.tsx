"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <span className="text-gold font-medium tracking-[0.3em] uppercase text-sm mb-4 block">
            The Divine Light for Humanity
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-parchment leading-[0.9] mb-8">
            Nurul<span className="text-gold">Quran</span>
          </h1>
          <p className="text-parchment/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Experience the Holy Quran through a lens of modern elegance. 
            Study with AI, track prayer times, calculate zakat, and connect with the Divine.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/#surahs"
            className="px-10 py-4 gold-gradient text-ink font-bold rounded-full hover:scale-105 transition-transform shadow-xl shadow-gold/20"
          >
            Start Reading
          </Link>
          <Link
            href="/names-of-allah"
            className="px-10 py-4 glass text-parchment font-medium rounded-full hover:bg-white/10 transition-colors"
          >
            99 Names of Allah
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/50"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
