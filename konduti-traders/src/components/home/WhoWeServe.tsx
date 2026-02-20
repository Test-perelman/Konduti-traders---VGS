'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, UtensilsCrossed, Warehouse, ChefHat, Factory, Store, ArrowRight, ArrowUpRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'

const segments = [
  {
    Icon: ShoppingCart,
    title: 'Supermarket Chains',
    description: 'Retail-ready graded produce with consistent sizing and shelf life for modern trade.',
    href: '/industries#supermarkets',
    iconBg: 'bg-green/10',
    iconColor: 'text-green',
    hoverBorder: 'group-hover:border-green/30',
    hoverGlow: 'group-hover:shadow-[0_0_40px_rgba(95,208,104,0.08)]',
  },
  {
    Icon: UtensilsCrossed,
    title: 'HoReCa',
    description: 'Precision kitchen-grade produce for hotels, restaurants, and catering operations.',
    href: '/industries#horeca',
    iconBg: 'bg-teal/10',
    iconColor: 'text-teal',
    hoverBorder: 'group-hover:border-teal/30',
    hoverGlow: 'group-hover:shadow-[0_0_40px_rgba(75,134,115,0.08)]',
  },
  {
    Icon: Warehouse,
    title: 'Wholesalers',
    description: 'High-volume, mandi-direct pricing with documentation and bulk logistics support.',
    href: '/industries#wholesalers',
    iconBg: 'bg-cream/50',
    iconColor: 'text-teal-dark',
    hoverBorder: 'group-hover:border-cream/60',
    hoverGlow: 'group-hover:shadow-[0_0_40px_rgba(245,223,153,0.1)]',
  },
  {
    Icon: ChefHat,
    title: 'Cloud Kitchens',
    description: 'Daily fresh delivery calibrated to kitchen workflow and portion requirements.',
    href: '/industries#cloud-kitchens',
    iconBg: 'bg-green/10',
    iconColor: 'text-green',
    hoverBorder: 'group-hover:border-green/30',
    hoverGlow: 'group-hover:shadow-[0_0_40px_rgba(95,208,104,0.08)]',
  },
  {
    Icon: Factory,
    title: 'Food Processors',
    description: 'Technical-grade bulk supply with assured volumes and processing specifications.',
    href: '/industries#food-processors',
    iconBg: 'bg-teal/10',
    iconColor: 'text-teal',
    hoverBorder: 'group-hover:border-teal/30',
    hoverGlow: 'group-hover:shadow-[0_0_40px_rgba(75,134,115,0.08)]',
  },
  {
    Icon: Store,
    title: 'Retail Chains',
    description: 'Organised supply for kirana chains competing on produce freshness and quality.',
    href: '/industries#retail-chains',
    iconBg: 'bg-cream/50',
    iconColor: 'text-teal-dark',
    hoverBorder: 'group-hover:border-cream/60',
    hoverGlow: 'group-hover:shadow-[0_0_40px_rgba(245,223,153,0.1)]',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function WhoWeServe() {
  return (
    <section className="py-24 lg:py-32 bg-mint relative overflow-hidden" aria-labelledby="serve-heading">
      {/* Floating decorative circle */}
      <div className="absolute -top-20 right-20 w-64 h-64 rounded-full border border-teal/5 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 -left-10 w-40 h-40 rounded-full border border-green/8 pointer-events-none" aria-hidden="true" />

      <Container>
        <SectionHeader
          eyebrow="Industries"
          heading="Who We Supply To"
          subheading="Konduti Traders serves India's most demanding B2B food businesses across six verticals."
          id="serve-heading"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {segments.map(({ Icon, title, description, href, iconBg, iconColor, hoverBorder, hoverGlow }) => (
            <motion.div key={title} variants={itemVariants}>
              <Link
                href={href}
                className={`group flex flex-col gap-5 p-8 rounded-2xl bg-white border border-gray-light/70 transition-all duration-400 h-full ${hoverBorder} ${hoverGlow}`}
                aria-label={`Learn about serving ${title}`}
              >
                {/* Icon with subtle ring */}
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBg} transition-transform group-hover:scale-110 duration-300`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} aria-hidden="true" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-display font-bold text-2xl text-dark mb-2 group-hover:text-teal transition-colors duration-300">{title}</h3>
                  <p className="font-body text-base text-gray-text leading-relaxed">{description}</p>
                </div>

                {/* Bottom link indicator */}
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm font-semibold text-teal group-hover:text-green transition-colors duration-300">
                    Learn more
                  </span>
                  <div className="w-8 h-8 rounded-full bg-mint flex items-center justify-center group-hover:bg-green/10 transition-all duration-300">
                    <ArrowUpRight size={14} className="text-teal group-hover:text-green transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/industries"
            className="group inline-flex items-center gap-2 font-body text-base font-semibold px-8 py-4 rounded-full bg-white text-teal hover:bg-green/10 hover:text-green border border-gray-light hover:border-green/30 transition-all duration-300 shadow-green-sm"
          >
            View all industry solutions
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
