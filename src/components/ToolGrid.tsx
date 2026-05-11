"use client";

import { motion } from "motion/react";
import { Clock, Landmark, Heart, Sparkles, LayoutDashboard, Calculator, Globe, BookOpen, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const TOOLS = [
  {
    name: "Prayer Times",
    description: "Accurate daily prayer schedules based on your location.",
    icon: Clock,
    href: "/prayer-times",
    color: "from-blue-500/10 to-indigo-500/10",
    size: "large"
  },
  {
    name: "Supplications",
    description: "Daily adhkar and protective duas.",
    icon: Heart,
    href: "/dua",
    color: "from-rose-500/10 to-pink-500/10",
    size: "small"
  },
  {
    name: "Quran Explorer",
    description: "Interactive digital Quran with multiple translations.",
    icon: BookOpen,
    href: "/quran",
    color: "from-emerald-500/10 to-teal-500/10",
    size: "medium"
  },
  {
    name: "Dawah & Outreach",
    description: "Connect with the message of Islam through modern wisdom.",
    icon: Globe,
    href: "/dawah",
    color: "from-amber-500/10 to-orange-500/10",
    size: "medium"
  },
  {
    name: "Names of Allah",
    description: "Reflect on the 99 attributes of the Almighty.",
    icon: Sparkles,
    href: "/names-of-allah",
    color: "from-purple-500/10 to-fuchsia-500/10",
    size: "small"
  },
  {
    name: "Tasbih",
    description: "Simple digital tasbih for your daily dhikr.",
    icon: LayoutDashboard,
    href: "/tasbih",
    color: "from-cyan-500/10 to-sky-500/10",
    size: "small"
  },
  {
    name: "Zakat Calculator",
    description: "Calculate your zakat obligation according to Shariah.",
    icon: Landmark,
    href: "/zakat",
    color: "from-slate-500/10 to-gray-500/10",
    size: "small"
  }
];

export default function ToolGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto py-24">
      {TOOLS.map((tool, index) => {
        const spanClass = 
          tool.size === "large" ? "md:col-span-2 md:row-span-2" : 
          tool.size === "medium" ? "md:col-span-2" : 
          "col-span-1";

        return (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className={`${spanClass} h-full`}
          >
            <Link 
              href={tool.href}
              className={`group relative block h-full p-8 rounded-[40px] glass-card overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-gold/30`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-12">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-500">
                    <tool.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-parchment/20 group-hover:text-gold group-hover:border-gold/20 transition-all duration-500">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-2xl font-display font-medium text-parchment mb-4 tracking-tight group-hover:text-gold transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-parchment/40 text-sm leading-relaxed max-w-[240px]">
                    {tool.description}
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-gold/5 blur-[40px] rounded-full group-hover:bg-gold/10 transition-colors" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
