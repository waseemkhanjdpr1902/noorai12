"use client";

import React, { useEffect, useState } from 'react';

/**
 * Noor AI Main Entry Point
 * This file satisfies the Next.js build requirement and 
 * serves as the launchpad for your AI application.
 */
export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      {/* Hero Section */}
      <nav className="border-b border-white/10 px-8 py-4 flex justify-between items-center backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20" />
          <span className="text-xl font-bold tracking-tight">Noor AI</span>
        </div>
        <div className="flex gap-4">
          <a href="/login.html" className="text-sm font-medium hover:text-cyan-400 transition-colors">Login</a>
          <a href="/dashboard.html" className="text-sm font-medium px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all">Dashboard</a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          SYSTEM ONLINE
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          The Future of <br /> Healthcare Intelligence
        </h1>
        
        <p className="text-lg text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Your AI-powered assistant for medical career coaching and pharmacy expertise. 
          Ready to deploy and scale.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="/index.html" 
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            Launch Chat Interface
          </a>
          <a 
            href="/hadith.html" 
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all"
          >
            Explore Resources
          </a>
        </div>

        <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            { title: "Fast Deployment", desc: "Optimized for Google Cloud and Vercel edge networks." },
            { title: "Next.js 14", desc: "Built with the latest App Router and React Server Components." },
            { title: "Secure API", desc: "Integrated with Gemini AI via encrypted environment variables." }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 text-left hover:border-cyan-500/30 transition-colors group">
              <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="mt-20 border-t border-white/5 py-10 text-center text-slate-600 text-sm">
        &copy; {new Date().getFullYear()} Noor AI. Created via Google AI Studio.
      </footer>
    </div>
  );
}
