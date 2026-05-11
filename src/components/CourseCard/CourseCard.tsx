"use client";

import { motion } from "motion/react";
import { PlayCircle, Clock, Users, Star } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    instructor: string;
    duration: string;
    students: string;
    rating: string;
    level: string;
    image?: string;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-[32px] overflow-hidden border-white/5 hover:border-gold/20 transition-all group"
    >
      <div className="aspect-video bg-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center text-ink shadow-2xl scale-90 group-hover:scale-100 transition-transform">
            <PlayCircle size={32} />
          </div>
        </div>
        <div className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-[10px] uppercase tracking-widest text-gold font-bold">
          {course.level}
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-display text-parchment mb-2 group-hover:text-gold transition-colors">{course.title}</h3>
        <p className="text-parchment/40 text-sm mb-6">by {course.instructor}</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-gold">
              <Clock size={14} />
              <span className="text-[10px] font-bold uppercase">{course.duration}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-gold">
              <Users size={14} />
              <span className="text-[10px] font-bold uppercase">{course.students}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-gold">
              <Star size={14} />
              <span className="text-[10px] font-bold uppercase">{course.rating}</span>
            </div>
          </div>
        </div>

        <Link 
          href={`/courses/${course.id}`}
          className="block w-full py-4 rounded-2xl border border-gold/20 text-gold text-center text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-ink transition-all"
        >
          Enroll Now
        </Link>
      </div>
    </motion.div>
  );
}
