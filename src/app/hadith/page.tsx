"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Book, Filter, Bookmark, Share2, Loader2, AlertCircle } from "lucide-react";
import HadithCard from "@/components/HadithCard/HadithCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Hadith {
  collection: string;
  number: string;
  text: string;
  narrator: string;
}

const collections = [
  { id: "eng-bukhari", name: "Sahih Bukhari" },
  { id: "eng-muslim", name: "Sahih Muslim" },
  { id: "eng-abudawud", name: "Sunan Abu Dawud" },
  { id: "eng-tirmidhi", name: "Sunan al-Tirmidhi" },
  { id: "eng-nasai", name: "Sunan an-Nasa'i" },
  { id: "eng-ibnmajah", name: "Sunan Ibn Majah" },
];

export default function HadithPage() {
  const [search, setSearch] = useState("");
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState("eng-bukhari");

  useEffect(() => {
    const fetchHadiths = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${selectedCollection}.json`);
        if (!res.ok) throw new Error("Failed to fetch Hadith data");
        const data = await res.json();
        
        // The API structure varies slightly, but usually it's data.hadiths
        const fetchedHadiths = data.hadiths.slice(0, 50).map((h: any) => ({
          collection: collections.find(c => c.id === selectedCollection)?.name || "Unknown",
          number: h.hadithnumber || h.number || "0",
          text: h.text,
          narrator: h.grades?.[0]?.name || "Prophetic Tradition",
        }));
        
        setHadiths(fetchedHadiths);
      } catch (err) {
        console.error(err);
        setError("Unable to load Hadith collection. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHadiths();
  }, [selectedCollection]);

  const filteredHadiths = hadiths.filter(h => 
    h.text.toLowerCase().includes(search.toLowerCase()) ||
    h.narrator.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      
      <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold font-medium tracking-[0.4em] uppercase text-xs mb-6 block"
          >
            Prophetic Wisdom
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display text-parchment mb-8 leading-tight"
          >
            Hadith <span className="text-gold italic">Library</span>
          </motion.h1>
          <p className="text-parchment/40 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Explore authentic traditions and sayings of the Prophet Muhammad (ﷺ) 
            from the major collections of Hadith.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-parchment/20" size={20} />
            <input 
              type="text" 
              placeholder="Search within this collection..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-6 py-5 glass rounded-[32px] text-parchment placeholder:text-parchment/20 focus:outline-none focus:border-gold/50 transition-colors shadow-2xl"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
            {collections.map((col) => (
              <button 
                key={col.id}
                onClick={() => setSelectedCollection(col.id)}
                className={`px-6 py-4 rounded-[24px] text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                  selectedCollection === col.id 
                    ? "gold-gradient text-ink" 
                    : "glass text-parchment/60 hover:text-gold hover:bg-white/10"
                }`}
              >
                {col.name}
              </button>
            ))}
          </div>
        </div>

        {/* Hadith Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Loader2 className="text-gold animate-spin" size={48} />
            <p className="text-parchment/40 font-display text-xl">Fetching wisdom...</p>
          </div>
        ) : error ? (
          <div className="glass p-12 rounded-[40px] border-red-500/10 text-center">
            <AlertCircle className="text-red-500 mx-auto mb-6" size={48} />
            <p className="text-parchment/60 text-lg mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-4 gold-gradient text-ink font-bold rounded-full"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredHadiths.map((hadith, i) => (
                <motion.div
                  key={`${hadith.collection}-${hadith.number}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <HadithCard hadith={hadith} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredHadiths.length === 0 && (
          <div className="text-center py-32">
            <p className="text-parchment/20 text-2xl font-display italic">No Hadith found matching your search.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
