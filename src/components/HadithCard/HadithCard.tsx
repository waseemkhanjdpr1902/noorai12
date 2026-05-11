"use client";

import { motion } from "motion/react";
import { Book, Bookmark, Share2 } from "lucide-react";

interface HadithCardProps {
  hadith: {
    collection: string;
    number: string;
    text: string;
    narrator?: string;
  };
  onSave?: () => void;
}

export default function HadithCard({ hadith, onSave }: HadithCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass p-8 rounded-[32px] border-white/5 hover:border-gold/20 transition-all group"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
            <Book size={24} />
          </div>
          <div>
            <h4 className="text-parchment font-bold text-sm uppercase tracking-widest">{hadith.collection}</h4>
            <p className="text-gold/60 text-[10px] uppercase tracking-[0.2em]">Hadith #{hadith.number}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onSave}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-parchment/30 hover:text-gold hover:bg-gold/10 transition-all"
          >
            <Bookmark size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-parchment/30 hover:text-gold hover:bg-gold/10 transition-all">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {hadith.narrator && (
          <p className="text-gold/80 font-medium text-sm italic">
            Narrated by {hadith.narrator}:
          </p>
        )}
        <p className="text-parchment/70 leading-relaxed text-lg font-light">
          &quot;{hadith.text}&quot;
        </p>
      </div>

      <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.3em] text-parchment/20">Authentic Source</span>
        <button className="text-gold text-[10px] uppercase tracking-widest font-bold hover:underline">View Context</button>
      </div>
    </motion.div>
  );
}
