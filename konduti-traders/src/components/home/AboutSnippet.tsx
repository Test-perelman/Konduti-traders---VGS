'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Truck, ShieldCheck, Thermometer } from 'lucide-react'
import Container from '@/components/ui/Container'

const pillars = [
  {
    Icon: MapPin,
    title: 'Direct Farm Sourcing',
    description: 'Active partnerships with 500+ farms across 20+ growing regions in India.',
    accent: 'from-green/20 to-green/5',
    iconBg: 'bg-green/15',
    iconColor: 'text-green',
    number: '01',
  },
  {
    Icon: ShieldCheck,
    title: 'Quality Inspection',
    description: 'On-ground QC teams grade every batch at source before dispatch.',
    accent: 'from-teal/15 to-teal/5',
    iconBg: 'bg-teal/15',
    iconColor: 'text-teal',
    number: '02',
  },
  {
    Icon: Truck,
    title: 'Pan-India Supply',
    description: 'Reliable logistics network covering all major metros and Tier 1–2 cities.',
    accent: 'from-cream/40 to-cream/10',
    iconBg: 'bg-cream/50',
    iconColor: 'text-teal-dark',
    number: '03',
  },
  {
    Icon: Thermometer,
    title: 'Cold Chain',
    description: 'Temperature-monitored infrastructure from farm to your receiving dock.',
    accent: 'from-green/20 to-teal/10',
    iconBg: 'bg-green/15',
    iconColor: 'text-green',
    number: '04',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function AboutSnippet() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden" aria-labelledby="about-snippet-heading">
      {/* Floating orbs */}
      <div className="floating-orb floating-orb-1" aria-hidden="true" />
      <div className="floating-orb floating-orb-2" aria-hidden="true" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Left: Text — takes 5 columns */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-gradient-to-r from-green to-teal" aria-hidden="true" />
              <span className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-teal">
                About Us
              </span>
            </div>

            <h2
              id="about-snippet-heading"
              className="font-display font-bold text-5xl md:text-6xl lg:text-[4rem] text-dark leading-[1.08] tracking-tight mb-7"
            >
              Rooted in Farms.
              <br />
              <span className="text-teal">Built for Business.</span>
            </h2>

            <div className="space-y-6 text-gray-text font-body text-lg leading-relaxed">
              <p>
                Konduti Traders is a B2B fresh produce procurement and distribution company
                operating across India. We source directly from farms and Farmer Producer
                Organisations (FPOs) in India&apos;s key growing regions — cutting out
                intermediaries to deliver better quality, better pricing, and a more reliable
                supply to your business.
              </p>
              <p>
                Every consignment undergoes grading and quality inspection at source, before
                being dispatched through our cold-chain logistics network. We serve supermarket
                chains, HoReCa operators, wholesale distributors, cloud kitchen networks, food
                processors, and organised retail chains across the country.
              </p>
              <p className="text-dark font-medium">
                Our mission is simple: make India&apos;s fresh produce supply chain more
                transparent, more reliable, and less wasteful.
              </p>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2.5 mt-10 font-body text-base font-semibold text-teal hover:text-green transition-colors animated-underline"
            >
              Learn our full story
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {/* Right: Pillar Cards — takes 7 columns */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {pillars.map(({ Icon, title, description, accent, iconBg, iconColor, number }) => (
              <motion.div key={title} variants={itemVariants}>
                <div className="gradient-border group relative p-7 rounded-2xl bg-white border border-gray-light/80 hover:border-transparent hover:shadow-green-lg transition-all duration-400 h-full overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl`} aria-hidden="true" />

                  {/* Large step number watermark */}
                  <span className="absolute -top-2 -right-1 font-display text-[6rem] font-bold text-gray-light/60 select-none leading-none" aria-hidden="true">
                    {number}
                  </span>

                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300`}>
                      <Icon className={`w-5 h-5 ${iconColor}`} aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-dark mb-2">{title}</h3>
                    <p className="font-body text-base text-gray-text leading-relaxed">{description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
