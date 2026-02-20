'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react'
import Container from '@/components/ui/Container'

export default function CtaBanner() {
  return (
    <section className="py-24 lg:py-32 bg-dark relative overflow-hidden cta-banner" aria-labelledby="cta-heading">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large decorative rings */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-green/[0.06]" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-green/[0.06]" />

        {/* Centered ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-green/[0.04] blur-[100px]" />

        {/* Top gradient band */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green/30 to-transparent" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(95,208,104,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto relative z-10"
        >
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-green/10 border border-green/20 text-sm font-body font-semibold tracking-[0.2em] uppercase text-green mb-8">
              <Sparkles size={14} aria-hidden="true" />
              Ready to Source
            </span>
          </motion.div>

          {/* Heading */}
          <h2
            id="cta-heading"
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-tight tracking-tight mb-6"
          >
            Start Sourcing
            <br />
            <span className="text-green drop-shadow-[0_0_30px_rgba(95,208,104,0.3)]">Fresh Today</span>
          </h2>

          <p className="font-body text-white/70 text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Join 100+ businesses across India who rely on Konduti Traders for
            consistent, quality fresh produce supply.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 bg-green text-white font-body font-semibold px-10 py-5 rounded-full hover:bg-green-dark transition-all duration-300 shadow-[0_0_30px_rgba(95,208,104,0.25)] hover:shadow-[0_0_50px_rgba(95,208,104,0.4)] text-lg"
            >
              Become a Buyer
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2.5 bg-white/[0.06] text-white font-body font-semibold px-10 py-5 rounded-full border border-white/15 hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300 backdrop-blur-sm text-lg"
            >
              <PhoneCall size={18} aria-hidden="true" />
              Call Now
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {['GST Registered', 'APMC Certified', 'Cold Chain Compliant'].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2 font-body text-sm text-white/40 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-green/50" aria-hidden="true" />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
