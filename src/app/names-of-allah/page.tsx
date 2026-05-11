"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Sparkles, BookOpen, Volume2, Info, X } from "lucide-react";

interface AllahName {
  number: number;
  name: string;
  transliteration: string;
  en: {
    meaning: string;
  };
}

export default function NamesOfAllahPage() {
  const [names, setNames] = useState<AllahName[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedName, setSelectedName] = useState<AllahName | null>(null);
  const [dailyName, setDailyName] = useState<AllahName | null>(null);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await fetch("https://api.aladhan.com/v1/asmaAlHusna");
        const data = await res.json();
        if (data.code === 200) {
          setNames(data.data);
          
          // Set daily name based on date
          const today = new Date();
          const index = (today.getFullYear() + today.getMonth() + today.getDate()) % data.data.length;
          setDailyName(data.data[index]);
        }
      } catch (err) {
        console.error("Failed to fetch names:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNames();
  }, []);

  const filteredNames = names.filter(
    (n) =>
      n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.en.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-ink">
      

      <header className="pt-40 pb-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 mb-8">
            <Sparkles size={14} className="text-gold" />
            <span className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold">Asma-ul-Husna</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display text-parchment mb-8 tracking-tight">
            99 Names of <span className="text-gold">Allah</span>
          </h1>
          <p className="text-parchment/40 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Discover the beautiful names and attributes of Allah. Reflect on their meanings 
            and implement their wisdom in your daily life.
          </p>
        </motion.div>
      </header>

      {/* Daily Name Feature */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {dailyName && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-[40px] p-8 md:p-12 overflow-hidden relative group border border-gold/10"
              >
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-[100px] group-hover:bg-gold/10 transition-colors duration-700" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                  <div className="text-center md:text-right order-2 md:order-1">
                    <span className="text-gold/60 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Memorize Today</span>
                    <h2 className="text-6xl md:text-8xl font-arabic text-gold mb-6">{dailyName.name}</h2>
                    <h3 className="text-2xl md:text-3xl font-display text-parchment mb-4">{dailyName.transliteration}</h3>
                    <p className="text-parchment/60 text-xl font-light italic">&quot;{dailyName.en.meaning}&quot;</p>
                  </div>
                  
                  <div className="order-1 md:order-2 flex justify-center">
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-gold/20 flex items-center justify-center p-8 relative">
                      <div className="absolute inset-4 rounded-full border border-gold/10 animate-spin-slow" />
                      <div className="text-8xl font-arabic text-gold opacity-10 absolute pointer-events-none">الله</div>
                      <BookOpen size={48} className="text-gold opacity-50" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Grid and Search */}
      <section className="px-6 pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <h2 className="text-3xl font-display text-parchment">Browse All Names</h2>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-parchment/20" size={18} />
              <input
                type="text"
                placeholder="Search names, meanings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-4 glass rounded-2xl text-parchment placeholder:text-parchment/20 focus:outline-none focus:border-gold/50 transition-all border border-white/5"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-64 rounded-[32px] glass animate-shimmer" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredNames.map((name) => (
                <motion.div
                  key={name.number}
                  layout
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedName(name)}
                  className="glass p-8 rounded-[32px] text-center border border-white/5 hover:border-gold/30 transition-all cursor-pointer group"
                >
                  <span className="text-gold/20 text-xs font-mono mb-4 block">#{name.number}</span>
                  <h3 className="text-4xl font-arabic text-parchment mb-4 group-hover:text-gold transition-colors">{name.name}</h3>
                  <h4 className="text-sm font-display text-parchment/60 mb-2">{name.transliteration}</h4>
                  <p className="text-[10px] text-parchment/30 uppercase tracking-[0.2em]">{name.en.meaning}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal for detail */}
      <AnimatePresence>
        {selectedName && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedName(null)}
              className="absolute inset-0 bg-ink/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-xl glass rounded-[40px] p-12 relative z-10 border border-gold/20"
            >
              <button 
                onClick={() => setSelectedName(null)}
                className="absolute top-8 right-8 text-parchment/40 hover:text-parchment transition-colors"
              >
                <X size={24} />
              </button>

              <div className="text-center">
                <span className="text-gold font-mono text-sm mb-6 block">Name #{selectedName.number}</span>
                <h2 className="text-8xl font-arabic text-gold mb-8">{selectedName.name}</h2>
                <h3 className="text-3xl font-display text-parchment mb-4">{selectedName.transliteration}</h3>
                <div className="w-12 h-1 bg-gold/30 mx-auto mb-8 rounded-full" />
                <p className="text-xl text-parchment/70 font-light mb-12 italic leading-relaxed">
                  &quot;{selectedName.en.meaning}&quot;
                </p>

                <div className="flex justify-center gap-4">
                  <button className="flex-1 py-4 gold-gradient text-ink font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                    <Volume2 size={20} />
                    Listen Recitation
                  </button>
                  <button className="px-6 py-4 glass border border-gold/20 text-gold rounded-2xl hover:bg-gold/5 transition-colors">
                    <Info size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
