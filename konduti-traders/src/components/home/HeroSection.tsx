'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const stats = [
  { value: '20+', label: 'Sourcing regions' },
  { value: '500+', label: 'Farm partners' },
  { value: '48hr', label: 'Delivery window' },
  { value: '6+', label: 'Product categories' },
]

// Stagger config
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center"
      aria-label="Konduti Traders — Farm-to-Business Fresh Produce"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: 'blur(0.3px) contrast(1.05) saturate(0.85) brightness(0.8)',
          transform: 'scale(1.04)',
          transformOrigin: 'center center',
        }}
        src="/animated-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Colour Wash — Deep teal multiply */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'rgba(20, 50, 38, 0.58)', mixBlendMode: 'multiply' }}
        aria-hidden="true"
      />

      {/* Radial centre glow — keeps vibrancy */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 55% at 50% 48%, rgba(61,139,94,0.2) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 65% at 50% 50%, transparent 30%, rgba(8,20,12,0.82) 100%)' }}
        aria-hidden="true"
      />

      {/* Corner crush */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{ boxShadow: 'inset 0 0 300px 80px rgba(8,20,12,0.7)' }}
        aria-hidden="true"
      />

      {/* Animated grain */}
      <div className="hero-grain" aria-hidden="true" />

      {/* ─── HERO CONTENT ─── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-[1000px] mx-auto pt-28 pb-32"
      >

        {/* Eyebrow */}
        <motion.div variants={item} className="mb-10">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/8 backdrop-blur-md border border-white/12">
            <span className="w-1.5 h-1.5 rounded-full bg-green-light animate-pulse" aria-hidden="true" />
            <span className="font-body text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-white/70">
              India&apos;s B2B Fresh Produce Partner
            </span>
          </span>
        </motion.div>

        {/* Headline — editorial, rhythmic */}
        <motion.h1
          variants={item}
          className="font-display font-light text-white hero-text-glow max-w-[900px]"
          style={{
            fontSize: 'clamp(3.2rem, 8.5vw, 7.2rem)',
            lineHeight: '0.96',
            letterSpacing: '-0.04em',
          }}
        >
          Farm-fresh.
          <br />
          <em className="not-italic" style={{ color: '#6fcc8a' }}>
            Precision-supplied.
          </em>
          <br />
          Pan-India.
        </motion.h1>

        {/* Sub-manifesto — short sharp lines */}
        <motion.div variants={item} className="mt-10 mb-12">
          <p
            className="hero-subtext-glow font-body text-white/65 text-center"
            style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', letterSpacing: '0.04em', lineHeight: '2' }}
          >
            Direct from farms.&ensp;·&ensp;No intermediaries.&ensp;·&ensp;No margin leakage.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-3.5">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 bg-green text-white font-body font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_40px_rgba(61,139,94,0.35)] hover:shadow-[0_0_60px_rgba(61,139,94,0.55)] hover:bg-green-light magnetic-btn"
            style={{ fontSize: '0.85rem', letterSpacing: '0.02em' }}
          >
            Start Sourcing
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white/8 text-white font-body font-medium px-8 py-4 rounded-full border border-white/18 hover:bg-white/14 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
            style={{ fontSize: '0.85rem', letterSpacing: '0.02em' }}
          >
            Explore Products
          </Link>
        </motion.div>

        {/* Stats — minimal horizontal row */}
        <motion.div
          variants={item}
          className="mt-20 pt-8 border-t border-white/8 w-full flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0"
        >
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className="relative flex flex-col items-center gap-1.5 sm:px-10"
            >
              {i !== 0 && (
                <span
                  className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-6 bg-white/10"
                  aria-hidden="true"
                />
              )}
              <span
                className="font-display font-medium text-cream"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
              >
                {value}
              </span>
              <span className="font-body text-white/45" style={{ fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/25 to-white/50 relative overflow-hidden">
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-x-0 top-0 h-1/2 bg-white/70"
          />
        </div>
        <span
          className="font-body text-white/35 tracking-[0.2em] uppercase"
          style={{ fontSize: '0.6rem' }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
