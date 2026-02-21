'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CtaBanner() {
  return (
    <section
      className="py-24 lg:py-36 bg-dark relative overflow-hidden cta-banner grain-overlay"
      aria-labelledby="cta-heading"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-green/6 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      {/* Fine grid */}
      <div className="absolute inset-0 bg-fine-grid pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <span className="eyebrow-light block mb-8">Ready to source</span>

          <h2
            id="cta-heading"
            className="font-display font-light text-white mb-7"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', lineHeight: '0.97', letterSpacing: '-0.04em' }}
          >
            Fresh produce.
            <br />
            <span style={{ color: 'rgba(111, 204, 138, 0.85)' }}>Reliably sourced.</span>
            <br />
            Start today.
          </h2>

          <p
            className="font-body text-white/40 mb-12 max-w-lg"
            style={{ fontSize: '0.92rem', lineHeight: '1.8' }}
          >
            Join 100+ businesses across India who rely on Konduti Traders for
            consistent, quality fresh produce — delivered to spec, every time.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-3.5 mb-14">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-green text-white font-body font-semibold px-8 py-4 rounded-full hover:bg-green-light transition-colors shadow-green-glow hover:shadow-green-lg magnetic-btn"
              style={{ fontSize: '0.85rem', letterSpacing: '0.02em' }}
            >
              Become a Buyer
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2.5 bg-white/6 text-white font-body font-medium px-8 py-4 rounded-full border border-white/12 hover:bg-white/10 hover:border-white/22 transition-all duration-300 backdrop-blur-sm"
              style={{ fontSize: '0.85rem', letterSpacing: '0.02em' }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="opacity-60" aria-hidden="true">
                <path d="M2 2.5A1.5 1.5 0 013.5 1h1a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5H4A1.5 1.5 0 002 3.5v-1zM10 2.5A1.5 1.5 0 0111.5 1h1A1.5 1.5 0 0114 2.5v1A1.5 1.5 0 0112.5 5h-1A1.5 1.5 0 0110 3.5v-1z" fill="currentColor" opacity="0.4"/>
                <path d="M2 2c0 6.627 5.373 12 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Call Now
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {['GST Registered', 'APMC Certified', 'Cold Chain Compliant', 'ISO Quality Standards'].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-green/40" aria-hidden="true" />
                <span className="font-body text-white/30" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
