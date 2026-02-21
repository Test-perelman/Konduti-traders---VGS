'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const steps = [
  {
    step: '01',
    title: 'Share Requirement',
    body: 'Category. Volume. Grade. Delivery timeline. That\'s all we need.',
  },
  {
    step: '02',
    title: 'Receive Quote',
    body: 'Transparent, itemised quote within 4 business hours. With source details.',
  },
  {
    step: '03',
    title: 'Confirm Order',
    body: 'Advance or credit terms. We lock your farm allocation immediately.',
  },
  {
    step: '04',
    title: 'QC & Dispatch',
    body: 'On-ground quality inspection. Grading, packaging, cold-chain dispatch.',
  },
  {
    step: '05',
    title: 'Delivered',
    body: 'Tracked delivery with temperature certificate and documentation.',
  },
]

export default function HowItWorksSnippet() {
  return (
    <section
      className="py-24 lg:py-32 bg-off-white relative overflow-hidden"
      aria-labelledby="hiw-snippet-heading"
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="eyebrow text-green block mb-4">Process</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              id="hiw-snippet-heading"
              className="font-display font-light text-dark max-w-lg"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              Simple.
              <br />
              <span className="text-teal">Transparent. Reliable.</span>
            </h2>
            <Link
              href="/how-it-works"
              className="font-body text-[0.8rem] font-semibold text-green hover:text-teal transition-colors animated-underline self-start lg:self-end mb-1"
            >
              Full process details →
            </Link>
          </div>
        </motion.div>

        {/* Steps — vertical list on mobile, horizontal on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-0 relative">

          {/* Connecting line — desktop only */}
          <div
            className="hidden lg:block absolute top-9 left-[10%] right-[10%] h-px bg-stone-lighter/80 pointer-events-none"
            aria-hidden="true"
          >
            {/* Animated glow on line */}
            <div
              className="absolute inset-0 shimmer"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(61,139,94,0.4), transparent)' }}
            />
          </div>

          {steps.map(({ step, title, body }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center px-4 group"
            >
              {/* Step indicator circle */}
              <div className="relative mb-7 z-10">
                {/* Hover pulse */}
                <div
                  className="absolute inset-0 rounded-full bg-green/10 scale-100 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  aria-hidden="true"
                />
                <div className="w-[72px] h-[72px] rounded-full bg-white border border-stone-lighter shadow-premium-sm flex items-center justify-center relative z-10 group-hover:border-green/25 group-hover:shadow-green-sm transition-all duration-300">
                  <span
                    className="font-display font-medium text-teal group-hover:text-green transition-colors"
                    style={{ fontSize: '1.1rem', letterSpacing: '-0.03em' }}
                  >
                    {step}
                  </span>
                </div>
              </div>

              <h3
                className="font-display font-medium text-dark mb-2 group-hover:text-teal transition-colors"
                style={{ fontSize: '1.05rem', letterSpacing: '-0.018em', lineHeight: '1.2' }}
              >
                {title}
              </h3>
              <p className="font-body text-stone max-w-[160px]" style={{ fontSize: '0.78rem', lineHeight: '1.7' }}>
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 bg-green text-white font-body font-semibold px-8 py-4 rounded-full hover:bg-green-dark transition-colors shadow-green-sm hover:shadow-green-md magnetic-btn"
            style={{ fontSize: '0.82rem', letterSpacing: '0.02em' }}
          >
            Start the process
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
