"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Loader2 } from "lucide-react";
import QuranCard from "@/components/QuranCard/QuranCard";

export default function SurahGrid() {
  const [search, setSearch] = useState("");
  const [surahs, setSurahs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const res = await fetch("https://api.alquran.cloud/v1/surah");
        
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}: Not Found`);
        }

        const data = await res.json();
        if (data.data && Array.isArray(data.data)) {
          setSurahs(data.data.map((c: any) => ({
            number: c.number,
            name: c.name,
            englishName: c.englishName,
            englishNameTranslation: c.englishNameTranslation,
            numberOfAyahs: c.numberOfAyahs,
            revelationType: c.revelationType,
            slug: c.englishName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          })));
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (error) {
        console.error("Error fetching surahs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  const filteredSurahs = surahs.filter(
    (s) =>
      s.englishName.toLowerCase().includes(search.toLowerCase()) ||
      s.number.toString() === search ||
      s.name.includes(search)
  );

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="text-gold animate-spin" size={48} />
      </div>
    );
  }

  return (
    <section id="surahs" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-display text-parchment mb-4">
            Browse <span className="text-gold">Surahs</span>
          </h2>
          <p className="text-parchment/50 max-w-md">
            Explore the 114 chapters of the Holy Quran with translations and recitations.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-parchment/30" size={20} />
          <input
            type="text"
            placeholder="Search by name or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 glass rounded-2xl text-parchment placeholder:text-parchment/20 focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSurahs.map((surah) => (
          <QuranCard key={surah.number} surah={surah} />
        ))}
      </div>

      {filteredSurahs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-parchment/30 text-xl font-display italic">No Surahs found matching your search.</p>
        </div>
      )}
    </section>
  );
}
