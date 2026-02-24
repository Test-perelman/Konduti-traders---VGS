'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function FounderSection() {
  return (
    <section className="py-20 lg:py-28 bg-white" aria-labelledby="founder-heading">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-80px' }}
            className="order-2 lg:order-1"
          >
            <Image
              src="/gallery images/founder images/founder_new.png"
              alt="Sridhar, Founder & Managing Director"
              width={540}
              height={700}
              className="rounded-xl shadow-premium-lg w-full h-auto object-cover"
            />
          </motion.div>

          {/* Founder Text */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-80px' }}
            className="order-1 lg:order-2"
          >
            <span className="eyebrow text-green block mb-5">Meet the Founder</span>
            <h2
              id="founder-heading"
              className="font-display font-light text-dark mb-6"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              Sridhar
            </h2>
            <p className="font-body text-gray-text leading-relaxed mb-6">
              With over 18 years of hands-on experience in India's fresh produce trade, Sridhar has been instrumental in reshaping how B2B buyers and farmers connect.
            </p>
            <p className="font-body text-gray-text leading-relaxed mb-6">
              As a former APMC board member and lead advisor to farmer producer organizations (FPOs), he understands both sides of the supply chain—the pressures on farms and the exacting demands of commercial buyers.
            </p>
            <p className="font-body text-gray-text leading-relaxed mb-8">
              Konduti Traders was founded on his conviction that transparency, quality-first sourcing, and long-term partnerships can unlock growth for both small farmers and ambitious businesses.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-lg hover:bg-green/90 transition-colors font-body font-medium"
            >
              Schedule a Meeting
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 12l4-4-4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
