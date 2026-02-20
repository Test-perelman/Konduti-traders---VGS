'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ClipboardList, Quote, CheckCircle2, Package, Truck } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Share Requirement',
    description: 'Tell us what you need — category, volume, grade, and delivery timeline.',
    color: 'bg-green',
  },
  {
    icon: Quote,
    step: '02',
    title: 'Receive Quote',
    description: 'Get a transparent, itemised quote within 4 business hours with source details.',
    color: 'bg-teal',
  },
  {
    icon: CheckCircle2,
    step: '03',
    title: 'Confirm Order',
    description: 'Confirm with advance or credit terms. We lock in your farm allocation.',
    color: 'bg-green',
  },
  {
    icon: Package,
    step: '04',
    title: 'QC & Dispatch',
    description: 'On-ground quality inspection, grading, packaging, and cold-chain dispatch.',
    color: 'bg-teal',
  },
  {
    icon: Truck,
    step: '05',
    title: 'Delivery',
    description: 'Tracked delivery to your facility with temperature certificate and documentation.',
    color: 'bg-green',
  },
]

export default function HowItWorksSnippet() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden" aria-labelledby="hiw-snippet-heading">
      {/* Decorative cross pattern */}
      <div className="absolute inset-0 bg-cross-pattern opacity-30 pointer-events-none" aria-hidden="true" />

      <Container>
        <SectionHeader
          eyebrow="Process"
          heading="Simple, Transparent Procurement"
          subheading="From requirement to delivery — a structured process with clear communication at every step."
          id="hiw-snippet-heading"
        />

        <div className="relative">
          {/* Connecting line for desktop */}
          <div
            className="absolute top-12 left-[10%] right-[10%] h-[2px] hidden lg:block"
            aria-hidden="true"
          >
            <div className="w-full h-full bg-gradient-to-r from-green/10 via-green/30 to-green/10 relative">
              {/* Animated shimmer on the line */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green/60 to-transparent" style={{ animation: 'shimmer 4s ease-in-out infinite', backgroundSize: '200% 100%' }} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative">
            {steps.map(({ icon: Icon, step, title, description, color }, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step circle with pulse */}
                <div className="relative mb-6">
                  {/* Pulse ring on hover */}
                  <div className="absolute inset-0 rounded-full bg-green/20 scale-100 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" aria-hidden="true" />

                  <div className="w-[88px] h-[88px] rounded-full bg-white border-2 border-green/15 flex items-center justify-center shadow-green-md relative z-10 group-hover:border-green/40 group-hover:shadow-green-lg transition-all duration-300">
                    <Icon className="w-8 h-8 text-teal group-hover:text-green transition-colors duration-300" aria-hidden="true" />
                  </div>

                  {/* Step number badge */}
                  <span
                    className={`absolute -top-1 -right-1 w-10 h-10 rounded-full ${color} text-white text-sm font-body font-bold flex items-center justify-center z-20 shadow-md`}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-xl text-dark mb-2 group-hover:text-teal transition-colors">{title}</h3>
                <p className="font-body text-base text-gray-text leading-relaxed max-w-[200px]">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-14 text-center"
        >
          <Link
            href="/how-it-works"
            className="group inline-flex items-center gap-2 font-body text-base font-semibold px-8 py-4 rounded-full bg-mint text-teal hover:bg-green/10 hover:text-green border border-gray-light hover:border-green/30 transition-all duration-300"
          >
            See full process details
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
