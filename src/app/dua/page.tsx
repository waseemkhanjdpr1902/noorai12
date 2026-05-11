"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Search, BookOpen, Sun, Moon, Sunrise, Sunset, CloudSun, Loader2, Copy, Share2, Volume2, VolumeX } from "lucide-react";

const DUA_CATEGORIES = [
  { id: "all", name: "All Supplications", icon: <BookOpen size={20} /> },
  { id: "morning", name: "Morning Adhkar", icon: <Sunrise size={20} /> },
  { id: "evening", name: "Evening Adhkar", icon: <Sunset size={20} /> },
  { id: "prayer", name: "After Prayer", icon: <BookOpen size={20} /> },
  { id: "sleeping", name: "Before Sleeping", icon: <Moon size={20} /> },
  { id: "waking", name: "Waking Up", icon: <Sunrise size={20} /> },
  { id: "eating", name: "Eating & Drinking", icon: <Sun size={20} /> },
  { id: "travel", name: "Travel", icon: <CloudSun size={20} /> },
  { id: "protection", name: "Protection", icon: <Heart size={20} /> },
];

const DUAS = [
  {
    id: 1,
    category: "morning",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    translation: "We have entered a new day and with it all dominion is Allah's. All praise is to Allah. None has the right to be worshipped but Allah alone.",
    reference: "Muslim 4/2088",
  },
  {
    id: 2,
    category: "protection",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    translation: "In the Name of Allah with Whose Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing.",
    reference: "Abu Dawud 4/323",
  },
  {
    id: 3,
    category: "prayer",
    arabic: "أَسْتَغْفِرُ اللهَ (ثَلَاثاً) اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    translation: "I ask Allah for forgiveness (three times). O Allah, You are As-Salam and from You is all peace, blessed are You, O Possessor of majesty and honour.",
    reference: "Muslim 1/414",
  },
  {
    id: 4,
    category: "eating",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful.",
    reference: "Abu Dawud 3/347",
  },
  {
    id: 5,
    category: "travel",
    arabic: "سُبْحانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    translation: "Glory is to Him Who has provided this for us, though we could never have subdued it by ourselves. And surely, unto our Lord we are returning.",
    reference: "Az-Zukhruf 13-14",
  },
  {
    id: 6,
    category: "sleeping",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    translation: "In Your name, O Allah, I die and I live.",
    reference: "Bukhari 11/113",
  },
  {
    id: 7,
    category: "evening",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    translation: "We have reached the evening and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped except Allah, alone.",
    reference: "Muslim 4/2088",
  },
  {
    id: 8,
    category: "waking",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    translation: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
    reference: "Bukhari 11/113",
  },
  {
    id: 9,
    category: "protection",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    translation: "I seek refuge in the Perfect Words of Allah from the evil of what He has created.",
    reference: "Muslim 4/2080",
  }
];

export default function DuaPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const filteredDuas = DUAS.filter(d => 
    (d.category === activeCategory || activeCategory === "all") &&
    (d.translation.toLowerCase().includes(search.toLowerCase()) || d.arabic.includes(search))
  );

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
      
      <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold font-medium tracking-[0.4em] uppercase text-xs mb-6 block"
          >
            Supplications
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display text-parchment mb-8 leading-tight"
          >
            Dua & <span className="text-gold italic">Adhkar</span>
          </motion.h1>
          <p className="text-parchment/40 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            A curated collection of authentic supplications from the Quran and Sunnah 
            for every moment of your day. Now with audio recitation.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="flex flex-col lg:flex-row gap-12 mb-24">
          <div className="w-full lg:w-80 shrink-0 space-y-4">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-parchment/30" size={18} />
              <input 
                type="text" 
                placeholder="Search Duas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass rounded-2xl text-parchment placeholder:text-parchment/20 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              {DUA_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                    activeCategory === cat.id 
                    ? "bg-gold text-ink shadow-lg shadow-gold/20" 
                    : "glass text-parchment/60 hover:bg-white/5"
                  }`}
                >
                  {cat.icon}
                  <span className="font-display text-lg">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <AnimatePresence mode="wait">
              {filteredDuas.length > 0 ? (
                filteredDuas.map((dua, i) => (
                  <motion.div
                    key={dua.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-8 md:p-12 rounded-[40px] border-white/5 hover:border-gold/20 transition-all group"
                  >
                    <div className="text-right mb-8">
                      <p className="text-3xl md:text-5xl font-arabic text-parchment leading-relaxed line-clamp-2">
                        {dua.arabic}
                      </p>
                    </div>
                    <div className="pl-6 border-l-2 border-gold/20 mb-8">
                      <p className="text-parchment/70 text-lg leading-relaxed italic">
                        &quot;{dua.translation}&quot;
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                      <span className="text-[10px] uppercase tracking-widest text-gold/40">{dua.reference}</span>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => toggleAudio(dua)}
                          className={`p-3 rounded-xl transition-all ${
                            playingId === dua.id 
                            ? "bg-gold text-ink scale-110" 
                            : "glass text-parchment/30 hover:text-gold"
                          }`}
                        >
                          {playingId === dua.id ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                        <button className="p-3 glass rounded-xl text-parchment/30 hover:text-gold transition-colors">
                          <Copy size={16} />
                        </button>
                        <button className="p-3 glass rounded-xl text-parchment/30 hover:text-gold transition-colors">
                          <Share2 size={16} />
                        </button>
                        <button className="p-3 glass rounded-xl text-parchment/30 hover:text-gold transition-colors">
                          <Heart size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-32">
                  <p className="text-parchment/30 text-xl font-display italic">No supplications found in this category.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </main>
  );
}
