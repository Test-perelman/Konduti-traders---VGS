'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive(i => (i + 1) % testimonials.length)

  const t = testimonials[active]

  return (
    <section
      className="py-24 lg:py-32 bg-off-white relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-green/5 blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[250px] bg-cream/20 blur-[80px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="eyebrow text-green block mb-4">Testimonials</span>
          <h2
            id="testimonials-heading"
            className="font-display font-light text-dark"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
          >
            Trusted by India&apos;s
            <br />
            <span className="text-teal">best food businesses.</span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div className="max-w-4xl">
          <div className="relative rounded-2xl bg-white border border-stone-lighter/70 overflow-hidden shadow-premium-md">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-green/30 via-teal/20 to-transparent" aria-hidden="true" />

            {/* Large decorative quote mark */}
            <div
              className="absolute top-5 right-6 font-display text-[8rem] leading-none text-stone-lighter/50 pointer-events-none select-none"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-7" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
                        className={i < t.rating ? 'text-cream' : 'text-stone-lighter'}
                        aria-hidden="true"
                      >
                        <path d="M8 1l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 10.6l-3.8 2.2.7-4.3-3.1-3 4.3-.6z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote
                    className="font-display font-light text-dark mb-10"
                    style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', lineHeight: '1.45', letterSpacing: '-0.02em' }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Attribution */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white font-display font-medium text-xl"
                      style={{ background: 'linear-gradient(135deg, #2c5f4a, #3d8b5e)', letterSpacing: '-0.02em' }}
                      aria-hidden="true"
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-body font-semibold text-dark" style={{ fontSize: '0.9rem' }}>{t.name}</p>
                      <p className="font-body text-stone" style={{ fontSize: '0.78rem', lineHeight: '1.6' }}>
                        {t.role} · <span className="text-green">{t.company}</span> · {t.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-7">

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-350 rounded-full ${
                    i === active
                      ? 'w-8 h-2 bg-green'
                      : 'w-2 h-2 bg-stone-light hover:bg-green/40'
                  }`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-stone-lighter flex items-center justify-center hover:bg-mint hover:border-green/25 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone"/>
                </svg>
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-green flex items-center justify-center hover:bg-green-dark transition-colors shadow-green-sm"
                aria-label="Next testimonial"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5 2l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
