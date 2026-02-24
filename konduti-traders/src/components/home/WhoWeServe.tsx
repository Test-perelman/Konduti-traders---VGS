'use client'

import { motion } from 'framer-motion'

const segments = [
  {
    title: 'Supermarket Chains',
    body: 'Retail-ready graded produce. Consistent sizing. Extended shelf life. Serve modern trade at scale.',
  },
  {
    title: 'HoReCa',
    body: 'Kitchen-grade precision. Hotels, restaurants, catering - every portion spec met.',
  },
  {
    title: 'Wholesalers',
    body: 'High-volume. Mandi-direct pricing. Full documentation. Bulk logistics support.',
  },
  {
    title: 'Cloud Kitchens',
    body: 'Daily fresh delivery. Calibrated to kitchen workflow and portion requirements.',
  },
  {
    title: 'Food Processors',
    body: 'Technical-grade bulk. Assured volumes. Processing specifications guaranteed.',
  },
  {
    title: 'Retail Chains',
    body: 'Organised supply for kiranas competing on produce freshness and quality.',
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

export default function WhoWeServe() {
  return (
    <section
      className="py-24 lg:py-32 bg-mint relative overflow-hidden"
      aria-labelledby="serve-heading"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-teal/5 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="eyebrow text-green block mb-4">Industries</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              id="serve-heading"
              className="font-display font-light text-dark max-w-xl"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              Who we supply to.
            </h2>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-lighter/50 rounded-2xl overflow-hidden border border-stone-lighter/50"
        >
          {segments.map(({ title, body }) => (
            <motion.div key={title} variants={fadeUp}>
              <article className="group flex flex-col h-full p-8 bg-white hover:bg-mint transition-colors duration-300 relative overflow-hidden">
                <h3
                  className="font-display font-medium text-dark mb-3 group-hover:text-teal transition-colors duration-300"
                  style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', lineHeight: '1.15' }}
                >
                  {title}
                </h3>
                <p className="font-body text-stone flex-1" style={{ fontSize: '0.83rem', lineHeight: '1.75' }}>
                  {body}
                </p>

                <div className="flex items-center justify-between mt-6">
                  <span className="font-body text-[0.72rem] font-semibold text-green group-hover:text-teal transition-colors tracking-[0.05em]">
                    Learn more
                  </span>
                  <div className="w-7 h-7 rounded-full bg-mint group-hover:bg-green/10 flex items-center justify-center transition-colors">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-teal group-hover:text-green transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                      <path d="M1.5 9.5L9 2M9 2H4M9 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Bottom hover line */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-green/15 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden="true" />
              </article>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
