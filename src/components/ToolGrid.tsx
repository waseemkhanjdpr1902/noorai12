"use client";

import { motion } from "motion/react";
import { Clock, Landmark, Heart, Sparkles, HandIcon, LayoutDashboard, Calculator, Globe } from "lucide-react";
import Link from "next/link";

const TOOLS = [
  {
    name: "Prayer Times",
    description: "Accurate local prayer timings and Qibla finder.",
    icon: Clock,
    href: "/prayer-times",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    name: "99 Names of Allah",
    description: "Memorize and reflect on the Divine attributes.",
    icon: Sparkles,
    href: "/names-of-allah",
    color: "from-gold/20 to-amber-500/20"
  },
  {
    name: "Dua & Adhkar",
    description: "Authentic supplications for every occasion.",
    icon: Heart,
    href: "/dua",
    color: "from-rose-500/20 to-pink-500/20"
  },
  {
    name: "Dawah & Outreach",
    description: "Connect with the message of Islam through AI and wisdom.",
    icon: Globe,
    href: "/dawah",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    name: "Tasbih Counter",
    description: "Digital counter for your daily dhikr.",
    icon: LayoutDashboard,
    href: "/tasbih",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    name: "Zakat Calculator",
    description: "Fulfill your obligation with ease and precision.",
    icon: Calculator,
    href: "/zakat",
    color: "from-purple-500/20 to-violet-500/20"
  }
];

export default function ToolGrid() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold font-medium tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Spiritual Arsenal
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display text-parchment"
          >
            Everyday <span className="text-gold italic">Tools</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={tool.href}
                className="group block relative p-8 glass rounded-[40px] border border-white/5 hover:border-gold/30 transition-all duration-500 h-full overflow-hidden"
              >
                {/* Hover Background Decor */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl`} />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center text-ink mb-6 shadow-lg shadow-gold/10 group-hover:scale-110 transition-transform duration-500">
                    <tool.icon size={28} />
                  </div>
                  
                  <h3 className="text-2xl font-display text-parchment mb-3 group-hover:text-gold transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-parchment/40 text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                    Launch Tool <Sparkles size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
