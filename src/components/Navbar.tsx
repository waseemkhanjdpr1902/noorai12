"use client";

import { useState, useEffect } from "react";
import { Search, BookOpen, Heart, Sparkles, Menu, X, LayoutDashboard, LogIn, Book, TrendingUp, Landmark, Clock, MapPin, Globe, Compass, Atom } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Quran", href: "/quran", icon: Book },
    { name: "Hadith", href: "/hadith", icon: BookOpen },
    { name: "Science", href: "/islamic-science", icon: Atom },
    { name: "Features", href: "/#features", icon: Sparkles },
    { name: "Tools", href: "/#tools", icon: Landmark },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
      isScrolled ? "py-4 bg-ink/70 backdrop-blur-3xl border-b border-white/5" : "py-8"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative">
            <div className={`absolute inset-0 gold-gradient blur-lg opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center text-ink shadow-2xl shadow-gold/30 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
              <Sparkles size={24} />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-ink/20" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-display font-bold text-parchment leading-none tracking-tight">
              Nurul<span className="text-gold">Quran</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-gold/40 font-bold mt-1">Light for the soul</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="group flex flex-col items-center gap-1"
              >
                <span className="text-parchment/60 group-hover:text-gold transition-colors text-[10px] font-bold uppercase tracking-widest">
                  {link.name}
                </span>
                <div className="h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>
          
          <div className="h-8 w-px bg-white/10" />
          
          <div className="flex items-center gap-6">
            <button className="text-parchment/40 hover:text-gold transition-colors">
              <Search size={22} strokeWidth={1.5} />
            </button>
            <Link href="/login" className="group relative px-7 py-3 rounded-2xl overflow-hidden glass border border-gold/20 flex items-center gap-3">
              <div className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <LogIn size={18} className="text-gold group-hover:text-ink transition-colors relative z-10" />
              <span className="text-gold group-hover:text-ink transition-colors text-xs font-bold uppercase tracking-widest relative z-10">Join</span>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="lg:hidden w-12 h-12 glass rounded-2xl flex items-center justify-center text-parchment hover:text-gold transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="lg:hidden absolute top-full left-0 right-0 m-6 mt-2 glass-card rounded-[40px] overflow-hidden shadow-2xl"
          >
            <div className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className="flex flex-col gap-3 p-6 rounded-3xl bg-white/5 hover:bg-gold/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-xl glass border border-gold/20 flex items-center justify-center text-gold">
                      <link.icon size={20} />
                    </div>
                    <span className="text-sm font-bold text-parchment/80 uppercase tracking-widest">{link.name}</span>
                  </Link>
                ))}
              </div>
              <div className="h-px bg-white/5" />
              <Link href="/login" className="w-full py-5 rounded-3xl gold-gradient text-ink font-bold flex items-center justify-center gap-2 shadow-xl shadow-gold/20">
                <LogIn size={20} /> Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
