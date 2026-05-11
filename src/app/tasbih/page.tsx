"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, Plus, Minus, Settings, Volume2, VolumeX, Sparkles } from "lucide-react";

export default function TasbihPage() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrateEnabled, setVibrateEnabled] = useState(true);

  const increment = () => {
    setCount(prev => prev + 1);
    if (soundEnabled) {
      const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
      audio.volume = 0.2;
      audio.play().catch(() => {});
    }
    if (vibrateEnabled && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const reset = () => {
    if (confirm("Are you sure you want to reset the counter?")) {
      setCount(0);
    }
  };

  return (
    <main className="min-h-screen bg-ink">
      
      <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold font-medium tracking-[0.4em] uppercase text-xs mb-6 block"
          >
            Remembrance
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display text-parchment mb-8 leading-tight"
          >
            Digital <span className="text-gold italic">Tasbih</span>
          </motion.h1>
        </div>

        {/* Counter UI */}
        <div className="relative w-full max-w-md aspect-square flex flex-col items-center justify-center">
          {/* Background Ring */}
          <div className="absolute inset-0 rounded-full border-[20px] border-white/5" />
          <motion.div 
            className="absolute inset-0 rounded-full border-[20px] border-gold/20"
            style={{ 
              clipPath: `conic-gradient(from 0deg, white ${ (count % target) / target * 100 }%, transparent 0)` 
            }}
          />

          {/* Main Counter Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={increment}
            className="w-64 h-64 rounded-full glass border-gold/20 flex flex-col items-center justify-center shadow-2xl shadow-gold/10 group relative z-10"
          >
            <span className="text-gold/40 text-[10px] uppercase tracking-widest mb-2">SubhanAllah</span>
            <span className="text-8xl font-mono text-parchment font-bold">{count}</span>
            <span className="text-gold/40 text-[10px] uppercase tracking-widest mt-2">Target: {target}</span>
            
            <div className="absolute inset-0 rounded-full bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          {/* Secondary Controls */}
          <div className="absolute -bottom-12 flex gap-6">
            <button 
              onClick={reset}
              className="w-14 h-14 rounded-full glass flex items-center justify-center text-parchment/30 hover:text-gold transition-colors"
              title="Reset"
            >
              <RotateCcw size={24} />
            </button>
            <button 
              onClick={() => setTarget(target === 33 ? 100 : 33)}
              className="px-6 h-14 rounded-full glass flex items-center justify-center text-parchment/30 hover:text-gold transition-colors font-bold text-xs"
            >
              SET {target === 33 ? 100 : 33}
            </button>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-14 h-14 rounded-full glass flex items-center justify-center text-parchment/30 hover:text-gold transition-colors"
              title="Toggle Sound"
            >
              {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-40 max-w-xl text-center">
          <p className="text-parchment/40 leading-relaxed font-light italic">
            &quot;The best of remembrance is SubhanAllah, Alhamdulillah, and Allahu Akbar.&quot; 
            Use this digital counter to keep track of your daily dhikr.
          </p>
        </div>
      </div>

    </main>
  );
}
