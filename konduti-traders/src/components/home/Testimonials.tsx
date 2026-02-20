'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const prev = () => setActiveIndex(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setActiveIndex(i => (i + 1) % testimonials.length)

  const active = testimonials[activeIndex]

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden relative" aria-labelledby="testimonials-heading">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green/5 to-transparent rounded-br-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-cream/20 to-transparent rounded-tl-full pointer-events-none" aria-hidden="true" />

      <Container>
        <SectionHeader
          eyebrow="Testimonials"
          heading="Trusted by India's Best Food Businesses"
          subheading="From supermarket chains to cloud kitchens — hear from the buyers who rely on us every day."
          id="testimonials-heading"
        />

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial card */}
          <div className="relative bg-gradient-to-br from-mint via-white to-mint rounded-3xl p-8 md:p-14 border border-green/10 overflow-hidden shadow-green-md">
            {/* Decorative large quote mark */}
            <div className="absolute top-4 right-6 opacity-[0.06]" aria-hidden="true">
              <Quote className="w-28 h-28 text-teal rotate-180" />
            </div>

            {/* Decorative line accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green via-teal to-cream" aria-hidden="true" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Stars */}
                <div className="flex items-center gap-1.5 mb-8" aria-label={`${active.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < active.rating ? 'text-cream fill-cream drop-shadow-sm' : 'text-gray-200 fill-gray-200'}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-2xl md:text-3xl lg:text-[2.25rem] text-dark leading-relaxed mb-10 font-medium">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center gap-5">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal to-green flex items-center justify-center shrink-0 shadow-md">
                    <span className="font-display font-bold text-2xl text-white">
                      {active.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-bold text-dark text-lg">{active.name}</p>
                    <p className="font-body text-base text-gray-text">{active.role}</p>
                    <p className="font-body text-sm text-teal font-semibold mt-1">
                      {active.company}
                      <span className="text-gray-text font-normal"> · {active.location}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            {/* Dots */}
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
                  onClick={() => setActiveIndex(i)}
                  className={`transition-all duration-400 rounded-full ${i === activeIndex
                    ? 'w-10 h-3 bg-gradient-to-r from-green to-teal'
                    : 'w-3 h-3 bg-gray-200 hover:bg-green/40'
                    }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-gray-light flex items-center justify-center hover:bg-mint hover:border-green/30 transition-all duration-300 active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="text-gray-text" aria-hidden="true" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-green to-teal flex items-center justify-center hover:shadow-green-lg transition-all duration-300 active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} className="text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
