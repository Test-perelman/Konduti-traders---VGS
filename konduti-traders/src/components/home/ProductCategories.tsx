'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'

const categories = [
  {
    id: 'fruits',
    label: 'Fresh Fruits',
    count: '6+ varieties',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80&auto=format&fit=crop',
    desc: 'Mangoes, Apples, Pomegranates & more',
  },
  {
    id: 'vegetables',
    label: 'Vegetables',
    count: '6+ varieties',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80&auto=format&fit=crop',
    desc: 'Onions, Potatoes, Tomatoes & more',
  },
  {
    id: 'exotic',
    label: 'Exotic Produce',
    count: '5+ varieties',
    image: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=600&q=80&auto=format&fit=crop',
    desc: 'Broccoli, Zucchini, Lettuce & more',
  },
  {
    id: 'leafy',
    label: 'Leafy Greens',
    count: '4+ varieties',
    image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=600&q=80&auto=format&fit=crop',
    desc: 'Spinach, Coriander, Mint & more',
  },
  {
    id: 'seasonal',
    label: 'Seasonal Specials',
    count: '3+ varieties',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&q=80&auto=format&fit=crop',
    desc: 'Watermelon, Mango, Coconut & more',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProductCategories() {
  return (
    <section className="py-24 lg:py-32 bg-mint relative overflow-hidden" aria-labelledby="categories-heading">
      {/* Decorative corner accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-green/5 to-transparent rounded-bl-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal/5 to-transparent rounded-tr-full pointer-events-none" aria-hidden="true" />

      <Container>
        <SectionHeader
          eyebrow="Product Range"
          heading="Fresh Categories for Every Business"
          subheading="From staple vegetables to premium exotic produce — sourced, graded, and dispatched to your specification."
          id="categories-heading"
        />

        {/* Featured Large Card + Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5"
        >
          {/* First item — featured large card */}
          <motion.div variants={cardVariants} className="lg:col-span-5">
            <Link
              href={`/products?category=${categories[0].id}`}
              className="group block rounded-3xl overflow-hidden bg-white shadow-green-sm hover:shadow-green-xl card-hover h-full relative"
              aria-label={`Browse ${categories[0].label}`}
            >
              {/* Image */}
              <div className="relative h-64 lg:h-full lg:min-h-[400px] overflow-hidden">
                <Image
                  src={categories[0].image}
                  alt={categories[0].label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" aria-hidden="true" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-body font-semibold mb-4">
                    {categories[0].count}
                  </span>
                  <h3 className="font-display font-bold text-3xl lg:text-4xl text-white mb-2 leading-tight">
                    {categories[0].label}
                  </h3>
                  <p className="font-body text-base text-white/80 mb-4">{categories[0].desc}</p>
                  <span className="inline-flex items-center gap-2 font-body text-base font-semibold text-green group-hover:text-white transition-colors">
                    Browse category
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Remaining items — 2x2 grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {categories.slice(1).map((cat) => (
              <motion.div key={cat.id} variants={cardVariants}>
                <Link
                  href={`/products?category=${cat.id}`}
                  className="group block rounded-2xl overflow-hidden bg-white shadow-green-sm hover:shadow-green-lg card-hover h-full"
                  aria-label={`Browse ${cat.label}`}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-108"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" aria-hidden="true" />

                    {/* Count badge */}
                    <span className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-body font-semibold">
                      {cat.count}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-display font-semibold text-xl text-dark leading-tight">
                        {cat.label}
                      </h3>
                      <div className="w-7 h-7 rounded-full bg-mint flex items-center justify-center group-hover:bg-green/10 transition-colors shrink-0">
                        <ArrowRight
                          size={14}
                          className="text-teal group-hover:text-green transition-all group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <p className="font-body text-sm text-gray-text leading-relaxed">{cat.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-body text-base font-semibold text-teal hover:text-green transition-colors group animated-underline"
          >
            View all products
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
