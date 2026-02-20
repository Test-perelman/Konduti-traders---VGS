'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const stats = [
  { value: '20+', label: 'Sourcing Regions' },
  { value: '500+', label: 'Farm Partners' },
  { value: '48hr', label: 'Delivery Window' },
  { value: '6+', label: 'Product Categories' },
]

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      aria-label="Hero section — Farm-to-Business Fresh Produce"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover scale-105"
        src="/animated-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Heavy dark overlay for legibility */}
      <div className="hero-overlay absolute inset-0 z-10" aria-hidden="true" />

      {/* Additional vignette for edges */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 200px 60px rgba(26,46,26,0.5)',
        }}
        aria-hidden="true"
      />

      {/* Top gradient for navbar readability */}
      <div
        className="absolute top-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(26,46,26,0.7) 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(26,46,26,0.8) 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Decorative floating orbs behind text */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green/20 rounded-full blur-[120px] z-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-cream/15 rounded-full blur-[100px] z-10 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center max-w-5xl mx-auto">
        {/* Eyebrow with glass pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" aria-hidden="true" />
            <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-white/95">
              India&apos;s Premier B2B Fresh Produce Partner
            </span>
          </span>
        </motion.div>

        {/* Headline — large, bold, ultra-legible */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hero-text-glow font-display font-bold text-white leading-[1.05] tracking-tight max-w-4xl mb-6"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)' }}
        >
          Farm-to-Business
          <br />
          <span className="text-green drop-shadow-[0_0_30px_rgba(95,208,104,0.4)]">
            Fresh Produce
          </span>
          <br />
          Across India
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hero-subtext-glow font-body text-white/95 text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed font-medium"
        >
          Direct sourcing.&nbsp; Quality control.&nbsp; Reliable delivery.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 bg-green text-white font-body font-semibold px-10 py-5 rounded-full hover:bg-green-dark transition-all duration-300 shadow-[0_0_30px_rgba(95,208,104,0.3)] hover:shadow-[0_0_50px_rgba(95,208,104,0.5)] text-base md:text-lg"
          >
            <span className="relative z-10">Become a Buyer</span>
            <ArrowRight
              size={18}
              className="relative z-10 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white/10 text-white font-body font-semibold px-10 py-5 rounded-full border border-white/25 hover:bg-white/20 hover:border-white/50 transition-all duration-300 backdrop-blur-md text-base md:text-lg"
          >
            Explore Products
          </Link>
        </motion.div>

        {/* Stats row — glass card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 px-8 py-6 rounded-2xl bg-white/8 backdrop-blur-lg border border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
            {stats.map(({ value, label }, index) => (
              <div key={label} className="flex flex-col items-center gap-1.5 relative">
                {/* Separator for non-first items on desktop */}
                {index !== 0 && (
                  <span className="hidden sm:block absolute -left-6 top-1/2 -translate-y-1/2 w-px h-8 bg-white/15" aria-hidden="true" />
                )}
                <span className="stat-number text-4xl md:text-5xl text-cream drop-shadow-[0_0_12px_rgba(245,223,153,0.3)]">
                  {value}
                </span>
                <span className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-white/70">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-body text-xs tracking-[0.25em] uppercase text-white/60 font-medium">
          Scroll to explore
        </span>
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-white/70"
          />
        </div>
      </motion.div>
    </section>
  )
}
