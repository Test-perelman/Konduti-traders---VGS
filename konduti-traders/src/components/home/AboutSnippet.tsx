'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const pillars = [
  {
    number: '01',
    title: 'Direct Farm Sourcing',
    body: '500+ farms. 20+ regions. No middlemen.',
  },
  {
    number: '02',
    title: 'Quality Inspection',
    body: 'On-ground QC teams grade every batch at source.',
  },
  {
    number: '03',
    title: 'Pan-India Supply',
    body: 'All major metros and Tier 1–2 cities. Covered.',
  },
  {
    number: '04',
    title: 'Cold Chain',
    body: 'Temperature-monitored from farm to your dock.',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function AboutSnippet() {
  return (
    <section
      className="py-24 lg:py-32 bg-off-white relative overflow-hidden"
      aria-labelledby="about-snippet-heading"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Ambient light bloom */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[400px] bg-green/5 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left column — editorial text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <span className="eyebrow text-green block mb-5">About Konduti</span>

            <h2
              id="about-snippet-heading"
              className="font-display font-light text-dark mb-8"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: '1.05', letterSpacing: '-0.035em' }}
            >
              Rooted in farms.
              <br />
              <span className="text-teal">Built for business.</span>
            </h2>

            <div className="space-y-5 text-gray-text font-body" style={{ fontSize: '0.92rem', lineHeight: '1.85' }}>
              <p>
                We source directly from farms and Farmer Producer Organisations across
                India&apos;s key growing regions — cutting out intermediaries to deliver
                better quality, better pricing, and a more reliable supply.
              </p>
              <p>
                Every consignment is graded and quality-checked at source. Then dispatched
                through our cold-chain network to your facility — precisely, reliably,
                every time.
              </p>
              <p className="font-medium text-dark/80">
                Our mission: make India&apos;s fresh produce supply chain
                more transparent, more reliable, and less wasteful.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-10 font-body font-semibold text-green hover:text-teal transition-colors group animated-underline"
              style={{ fontSize: '0.82rem', letterSpacing: '0.03em' }}
            >
              Read our story
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          {/* Right column — pillar cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-stone-lighter/60 rounded-2xl overflow-hidden border border-stone-lighter/60"
          >
            {pillars.map(({ number, title, body }) => (
              <motion.div
                key={number}
                variants={reveal}
                className="group bg-white p-8 hover:bg-mint transition-colors duration-300 relative overflow-hidden"
              >
                {/* Large watermark number */}
                <span
                  className="absolute -top-3 -right-2 font-display font-light leading-none select-none pointer-events-none section-number"
                  aria-hidden="true"
                >
                  {number}
                </span>

                <div className="relative z-10">
                  <span className="eyebrow text-green/60 block mb-4">{number}</span>
                  <h3
                    className="font-display font-medium text-dark mb-3"
                    style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', lineHeight: '1.15' }}
                  >
                    {title}
                  </h3>
                  <p className="font-body text-stone" style={{ fontSize: '0.85rem', lineHeight: '1.7' }}>
                    {body}
                  </p>

                  {/* Bottom indicator line */}
                  <div
                    className="mt-6 h-px w-0 group-hover:w-full bg-green/25 transition-all duration-600"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
