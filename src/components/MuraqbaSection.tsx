"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Heart, Wind, Moon, Sparkles, ArrowRight, X, Play, Pause, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function MuraqbaSection() {
  const [isMeditating, setIsMeditating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startMeditation = () => {
    setIsMeditating(true);
    setIsActive(true);
  };

  const resetMeditation = () => {
    setTimeLeft(300);
    setIsActive(false);
  };

  const steps = [
    {
      title: "Preparation",
      description: "Find a quiet space, sit comfortably, and close your eyes. Ensure your heart is present.",
      icon: Moon,
      color: "text-indigo-400"
    },
    {
      title: "Breath Awareness",
      description: "Breathe deeply and slowly. With each breath, feel the presence of Allah's mercy surrounding you.",
      icon: Wind,
      color: "text-emerald-400"
    },
    {
      title: "Heart Connection",
      description: "Focus on your heart. Visualize the name 'Allah' written in light upon it.",
      icon: Heart,
      color: "text-rose-400"
    },
    {
      title: "Divine Presence",
      description: "Maintain the awareness that Allah is watching you, hearing you, and with you.",
      icon: Eye,
      color: "text-gold"
    }
  ];

  return (
    <section id="muraqba" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gold font-medium tracking-[0.3em] uppercase text-xs mb-4 block">
            Spiritual Excellence • Ihsan
          </span>
          <h2 className="text-4xl md:text-6xl font-display text-parchment mb-8 leading-tight">
            The Art of <span className="text-gold italic">Muraqba</span>
          </h2>
          <p className="text-parchment/60 text-lg mb-10 leading-relaxed font-light">
            Muraqba is the Islamic practice of deep meditation and mindfulness. 
            It is the state of being aware that Allah is always watching over us, 
            leading to a heart filled with tranquility and Divine love.
          </p>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 p-6 glass rounded-3xl hover:bg-white/10 transition-colors group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 ${step.color} group-hover:scale-110 transition-transform`}>
                  <step.icon size={24} />
                </div>
                <div>
                  <h4 className="text-parchment font-bold mb-1">{step.title}</h4>
                  <p className="text-parchment/40 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square glass rounded-[60px] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gold/5 blur-[100px] rounded-full animate-pulse" />
            
            <Sparkles className="text-gold mb-8 animate-bounce" size={48} />
            <h3 className="text-3xl font-display text-parchment mb-6">Start Your Journey</h3>
            <p className="text-parchment/50 mb-10 max-w-xs mx-auto text-sm leading-relaxed italic">
              &quot;Verily, in the remembrance of Allah do hearts find rest.&quot; <br />
              <span className="text-[10px] uppercase tracking-widest mt-2 block">— Ar-Ra&apos;d 13:28</span>
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={startMeditation}
                className="px-8 py-4 gold-gradient text-ink font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                Begin Meditation <ArrowRight size={18} />
              </button>
              <Link 
                href="/spiritual-guide"
                className="px-8 py-4 glass text-parchment font-medium rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                Full Spiritual Guide <Sparkles size={18} />
              </Link>
            </div>
          </div>

          {/* Decorative floating elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 glass rounded-full flex items-center justify-center animate-spin-slow">
            <div className="text-gold font-arabic text-2xl">ذكر</div>
          </div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 glass rounded-full flex items-center justify-center animate-bounce-slow">
            <div className="text-gold font-arabic text-xl">حب</div>
          </div>
        </motion.div>
      </div>

      {/* Meditation Overlay */}
      <AnimatePresence>
        {isMeditating && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/95 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg text-center"
            >
              <button 
                onClick={() => setIsMeditating(false)}
                className="absolute -top-16 right-0 text-parchment/50 hover:text-gold transition-colors"
              >
                <X size={32} />
              </button>

              <div className="mb-12">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-gold/20 mx-auto flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-2 border-gold animate-pulse-slow" />
                  <div className="text-5xl md:text-7xl font-display text-gold font-light tracking-tighter">
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-display text-parchment mb-4">
                {isActive ? "Be Present with Allah" : timeLeft === 0 ? "Meditation Complete" : "Paused"}
              </h3>
              <p className="text-parchment/40 mb-12 italic">
                {isActive ? "Focus on your heart and breathe slowly..." : "Take a moment to reflect."}
              </p>

              <div className="flex items-center justify-center gap-8">
                <button 
                  onClick={resetMeditation}
                  className="w-14 h-14 rounded-full glass flex items-center justify-center text-parchment/50 hover:text-gold transition-colors"
                >
                  <RotateCcw size={24} />
                </button>
                <button 
                  onClick={() => setIsActive(!isActive)}
                  className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center text-ink shadow-2xl shadow-gold/20 hover:scale-110 transition-transform"
                >
                  {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>
                <div className="w-14 h-14" /> {/* Spacer */}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
