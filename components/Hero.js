"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, var(--bg-secondary) 0%, var(--bg-primary) 100%)"
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center container"
      >
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 gradient-text">Knowledge & Wisdom Hub</h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
          Exploring the intersection of ancient wisdom and modern knowledge through Science, Scripture, Music, and Civil Services preparation.
        </p>
        <Link href="/about" className="inline-block bg-[var(--accent-color)] text-[var(--dark-green)] font-semibold px-6 py-3 rounded-full shadow-soft hover-lift">
          Discover My Journey
        </Link>
      </motion.div>
    </section>
  );
}
