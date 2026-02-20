'use client'

import { motion } from 'framer-motion'
import {
  Leaf,
  Award,
  IndianRupee,
  Truck,
  Snowflake,
  Package,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'

const features = [
  {
    Icon: Leaf,
    title: 'Direct Farm Procurement',
    description:
      'We bypass the intermediary chain and work directly with farms and FPOs across India\'s 20+ key growing regions, ensuring freshness and traceability in every batch.',
    accent: 'bg-green/10 text-green',
  },
  {
    Icon: Award,
    title: 'Quality Grading',
    description:
      'Every lot is graded by our on-ground QC teams — by size, colour, maturity, and defect percentage — to meet your exact product specification before dispatch.',
    accent: 'bg-teal/10 text-teal',
  },
  {
    Icon: IndianRupee,
    title: 'Competitive Pricing',
    description:
      'Farm-direct procurement removes 2–3 intermediary margins. You get better produce at prices that improve your cost of goods, with transparent pricing structures.',
    accent: 'bg-cream/80 text-teal-dark',
  },
  {
    Icon: Truck,
    title: 'Pan-India Logistics',
    description:
      'Our logistics network covers all major metros, Tier 1 and Tier 2 cities. Own fleet for key corridors, third-party reefer partners for national reach.',
    accent: 'bg-green/10 text-green',
  },
  {
    Icon: Snowflake,
    title: 'Cold Chain Infrastructure',
    description:
      'Temperature-controlled storage and reefer transport maintain freshness from farm to dock. We provide dispatch temperature certificates with every consignment.',
    accent: 'bg-teal/10 text-teal',
  },
  {
    Icon: Package,
    title: 'Reliable Bulk Supply',
    description:
      'Forward contracts and multi-region sourcing mean we can guarantee your volumes even during market disruptions, seasonal peaks, or supply chain stress.',
    accent: 'bg-cream/80 text-teal-dark',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-teal relative overflow-hidden" aria-labelledby="why-heading">
      {/* Decorative elements */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border border-white/5 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-20 left-1/3 w-96 h-96 rounded-full bg-green/8 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <Container>
        <SectionHeader
          eyebrow="Why Konduti"
          heading="The Procurement Advantage"
          subheading="Six reasons India's top B2B food businesses trust Konduti Traders as their primary fresh produce partner."
          light
          id="why-heading"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map(({ Icon, title, description, accent }, index) => (
            <motion.div key={title} variants={itemVariants}>
              <div className="group relative p-8 rounded-2xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.12] hover:border-white/[0.18] transition-all duration-400 h-full overflow-hidden shimmer">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" aria-hidden="true" />

                <div className="relative z-10">
                  {/* Icon & Number row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${accent} transition-transform group-hover:scale-110 duration-300`}>
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <span className="font-display text-6xl font-light text-white/[0.06] leading-none select-none" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-2xl text-white mb-4 leading-snug">
                    {title}
                  </h3>
                  <p className="font-body text-base text-white/70 leading-relaxed">{description}</p>

                  {/* Bottom accent line */}
                  <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r from-green/50 to-transparent transition-all duration-700" aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
