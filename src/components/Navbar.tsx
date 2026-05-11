"use client";

import { useState, useEffect } from "react";
import { Search, BookOpen, Heart, Sparkles, Menu, X, LayoutDashboard, LogIn, Book, TrendingUp, Landmark, Clock, MapPin, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { supabase } from "@/services/supabase";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    // Check auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const navLinks = [
    { name: "Quran", href: "/#surahs", icon: BookOpen },
    { name: "Hadith", href: "/hadith", icon: Book },
    { name: "Names", href: "/names-of-allah", icon: Sparkles },
    { name: "Zakat", href: "/zakat", icon: Landmark },
    { name: "Prayer", href: "/prayer-times", icon: Clock },
    { name: "Dua", href: "/dua", icon: Heart },
    { name: "Dawah", href: "/dawah", icon: Globe },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-4 glass" : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-gold/20 group-hover:scale-110 transition-transform">
            <span className="text-ink font-bold text-xl">ن</span>
          </div>
          <div className="flex flex-col">
            <span className="text-parchment font-display text-xl tracking-tight leading-none">NurulQuran</span>
            <span className="text-gold font-arabic text-sm tracking-widest opacity-80">نور القرآن</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 text-parchment/70 hover:text-gold transition-colors text-xs font-medium uppercase tracking-widest"
            >
              <link.icon size={14} />
              {link.name}
            </Link>
          ))}
          
          <div className="h-4 w-px bg-white/10 mx-2" />

          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors text-xs font-medium uppercase tracking-widest"
            >
              <LayoutDashboard size={14} />
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 text-parchment/70 hover:text-gold transition-colors text-xs font-medium uppercase tracking-widest"
            >
              <LogIn size={14} />
              Login
            </Link>
          )}

          <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
            <Search size={18} className="text-parchment/60" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-parchment"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass py-6 px-6 lg:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 text-parchment py-3 border-b border-white/5"
              >
                <link.icon size={20} className="text-gold" />
                <span className="text-lg font-display">{link.name}</span>
              </Link>
            ))}
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 text-gold py-3"
              >
                <LayoutDashboard size={20} />
                <span className="text-lg font-display">Dashboard</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 text-parchment py-3"
              >
                <LogIn size={20} />
                <span className="text-lg font-display">Login</span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
