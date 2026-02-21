'use client'

import { motion } from 'framer-motion'

const features = [
  {
    number: '01',
    title: 'Direct Farm Procurement',
    body: 'We bypass the intermediary chain. Work directly with farms and FPOs across 20+ key growing regions. Freshness and traceability in every batch.',
  },
  {
    number: '02',
    title: 'Quality Grading',
    body: 'Every lot graded by our on-ground QC teams — by size, colour, maturity, defect percentage — to your exact specification before dispatch.',
  },
  {
    number: '03',
    title: 'Competitive Pricing',
    body: 'Farm-direct procurement removes 2–3 intermediary margins. Better produce. Better cost of goods. Transparent pricing structures.',
  },
  {
    number: '04',
    title: 'Pan-India Logistics',
    body: 'All major metros, Tier 1 and Tier 2 cities. Own fleet for key corridors, reefer partners for national reach.',
  },
  {
    number: '05',
    title: 'Cold Chain Infrastructure',
    body: 'Temperature-controlled storage and reefer transport. Dispatch temperature certificates with every consignment.',
  },
  {
    number: '06',
    title: 'Guaranteed Volumes',
    body: 'Forward contracts and multi-region sourcing. Consistent supply through market disruptions, seasonal peaks, and supply chain stress.',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function WhyChooseUs() {
  return (
    <section
      className="py-24 lg:py-32 bg-teal-dark relative overflow-hidden grain-overlay"
      aria-labelledby="why-heading"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green/8 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      {/* Fine grid */}
      <div className="absolute inset-0 bg-fine-grid opacity-100 pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="eyebrow-light block mb-5">Why Konduti</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              id="why-heading"
              className="font-display font-light text-white max-w-lg"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              The procurement
              <br />
              <span style={{ color: 'rgba(111, 204, 138, 0.9)' }}>advantage.</span>
            </h2>
            <p
              className="font-body text-white/40 max-w-sm"
              style={{ fontSize: '0.85rem', lineHeight: '1.75' }}
            >
              Six reasons India&apos;s top B2B food businesses trust Konduti Traders
              as their primary fresh produce partner.
            </p>
          </div>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5"
        >
          {features.map(({ number, title, body }) => (
            <motion.div
              key={number}
              variants={fadeUp}
              className="group relative p-8 bg-teal-dark hover:bg-teal transition-colors duration-400 overflow-hidden"
            >
              {/* Large watermark number */}
              <span
                className="absolute -top-4 -right-2 font-display font-light leading-none select-none pointer-events-none section-number-dark"
                style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.06)' }}
                aria-hidden="true"
              >
                {number}
              </span>

              <div className="relative z-10">
                <span className="eyebrow-light block mb-5">{number}</span>
                <h3
                  className="font-display font-medium text-white mb-4"
                  style={{ fontSize: '1.3rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}
                >
                  {title}
                </h3>
                <p className="font-body text-white/45" style={{ fontSize: '0.83rem', lineHeight: '1.8' }}>
                  {body}
                </p>
                {/* Hover line */}
                <div
                  className="mt-7 h-px w-0 group-hover:w-full bg-green/30 transition-all duration-700"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
