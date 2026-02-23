'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { VerticalImageStack } from '@/components/ui/vertical-image-stack'

const categories = [
  {
    id: 'fruits-vegetables',
    label: 'Fruits & Vegetables',
    count: '6 varieties',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=85&auto=format&fit=crop',
    desc: 'Mangoes, Tomatoes, Onions & more',
    featured: true,
  },
  {
    id: 'spices-herbs',
    label: 'Spices & Herbs',
    count: '6 varieties',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80&auto=format&fit=crop',
    desc: 'Turmeric, Cumin, Coriander & more',
  },
  {
    id: 'grains-pulses',
    label: 'Grains & Pulses',
    count: '5 varieties',
    image: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=600&q=80&auto=format&fit=crop',
    desc: 'Rice, Wheat, Chana Dal & more',
  },
  {
    id: 'nuts-seeds',
    label: 'Nuts & Seeds',
    count: '4 varieties',
    image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=600&q=80&auto=format&fit=crop',
    desc: 'Cashews, Almonds, Flaxseed & more',
  },
  {
    id: 'beverages',
    label: 'Beverages',
    count: '3 varieties',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&q=80&auto=format&fit=crop',
    desc: 'Coconut Water, Sugarcane & more',
  },
]

// All category images fed into the stack
const stackImages = categories.map(c => ({
  src: c.image,
  alt: c.label,
  label: c.label,
}))

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function ProductCategories() {
  return (
    <section
      className="py-24 lg:py-32 bg-mint relative overflow-hidden"
      aria-labelledby="categories-heading"
    >
      {/* Corner light bloom */}
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-green/5 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="eyebrow text-green block mb-4">Product Range</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              id="categories-heading"
              className="font-display font-light text-dark max-w-xl"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              Every category.
              <br />
              <span className="text-teal">Every specification.</span>
            </h2>
            <Link
              href="/products"
              className="font-body text-[0.8rem] font-semibold text-green hover:text-teal transition-colors animated-underline self-start lg:self-end mb-1"
            >
              View all products →
            </Link>
          </div>
        </motion.div>

        {/* Grid: Stack feature (left) + 2×2 grid (right) */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
        >
          {/* Featured — vertical image stack */}
          <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col items-center">
            {/* Editorial label above */}
            <div className="w-full mb-5 pl-2">
              <span className="eyebrow text-stone">Drag or scroll to explore</span>
            </div>

            <div className="relative w-full flex justify-center">
              {/* Ambient glow behind the stack */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl blur-3xl"
                style={{ background: 'radial-gradient(ellipse, rgba(61,139,94,0.12) 0%, transparent 70%)' }}
                aria-hidden="true"
              />

              <VerticalImageStack
                images={stackImages}
                height={460}
                width={270}
                showDots={true}
                showCounter={true}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              {/* Animated scroll hint */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                className="text-stone"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 4v10M4.5 9l4.5-4.5L13.5 9" />
                </svg>
              </motion.div>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                className="text-stone"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 4v10M4.5 9l4.5 4.5 4.5-4.5" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Link to filtered category */}
            <Link
              href={`/products?category=${categories[0].id}`}
              className="mt-5 inline-flex items-center gap-2 font-body font-semibold text-green hover:text-teal transition-colors animated-underline"
              style={{ fontSize: '0.8rem', letterSpacing: '0.02em' }}
            >
              Browse all categories
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 6h7M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          {/* 2×2 grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.slice(1).map((cat) => (
              <motion.div key={cat.id} variants={fadeUp}>
                <Link
                  href={`/products?category=${cat.id}`}
                  className="group block rounded-2xl overflow-hidden bg-white shadow-premium-sm hover:shadow-premium-lg card-hover-subtle h-full"
                  aria-label={`Browse ${cat.label}`}
                >
                  {/* Image */}
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 28vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/45 to-transparent" aria-hidden="true" />
                    <span className="absolute top-2.5 right-2.5 font-body text-[0.6rem] font-semibold tracking-[0.12em] uppercase text-white/60 bg-white/8 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-full">
                      {cat.count}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3
                        className="font-display font-medium text-dark group-hover:text-teal transition-colors"
                        style={{ fontSize: '1.1rem', letterSpacing: '-0.018em' }}
                      >
                        {cat.label}
                      </h3>
                      <div className="w-6 h-6 rounded-full bg-mint flex items-center justify-center group-hover:bg-green/10 transition-colors shrink-0">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-teal group-hover:text-green transition-colors" aria-hidden="true">
                          <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <p className="font-body text-stone" style={{ fontSize: '0.78rem', lineHeight: '1.6' }}>
                      {cat.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
