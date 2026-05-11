import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-ink">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
              <span className="text-ink font-bold text-xl">ن</span>
            </div>
            <span className="text-parchment font-display text-2xl">NurulQuran</span>
          </div>
          <p className="text-parchment/40 leading-relaxed mb-8">
            A modern platform dedicated to the preservation and study of the Holy Quran. 
            Built with love for the Ummah.
          </p>
        </div>

        <div>
          <h4 className="text-parchment font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-4 text-parchment/40">
            <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><Link href="/#surahs" className="hover:text-gold transition-colors">Read Quran</Link></li>
            <li><Link href="/hadith" className="hover:text-gold transition-colors">Hadith Library</Link></li>
            <li><Link href="/names-of-allah" className="hover:text-gold transition-colors">99 Names of Allah</Link></li>
            <li><Link href="/zakat" className="hover:text-gold transition-colors">Zakat Calculator</Link></li>
            <li><Link href="/prayer-times" className="hover:text-gold transition-colors">Prayer Times</Link></li>
            <li><Link href="/dua" className="hover:text-gold transition-colors">Dua Library</Link></li>
            <li><Link href="/tasbih" className="hover:text-gold transition-colors">Tasbih Counter</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-parchment font-bold mb-6 uppercase tracking-widest text-sm">Resources</h4>
          <ul className="space-y-4 text-parchment/40">
            <li><Link href="/dawah" className="hover:text-gold transition-colors font-bold text-gold">Dawah & Outreach</Link></li>
            <li><Link href="/#ai" className="hover:text-gold transition-colors">AI Assistant</Link></li>
            <li><Link href="/dashboard" className="hover:text-gold transition-colors">User Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-parchment font-bold mb-6 uppercase tracking-widest text-sm">Contact Us</h4>
          <ul className="space-y-4 text-parchment/40">
            <li className="text-sm">
              <span className="text-gold block mb-1 font-medium">Founder & Developer</span>
              Mohammed Waseem, Nurul Quran Team
            </li>
            <li className="text-sm">
              <span className="text-gold block mb-1 font-medium">Email</span>
              <a href="mailto:support@nurulquran.info" className="hover:text-gold transition-colors">support@nurulquran.info</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-parchment/20 text-xs tracking-widest uppercase">
          © 2024 NurulQuran. All Rights Reserved.
        </p>
        <p className="text-parchment/20 text-xs tracking-widest uppercase font-arabic">
          صَدَقَ اللَّهُ الْعَظِيمُ
        </p>
      </div>
    </footer>
  );
}
