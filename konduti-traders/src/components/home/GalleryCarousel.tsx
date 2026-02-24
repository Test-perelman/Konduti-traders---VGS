'use client'

import { motion } from 'framer-motion'
import { ThreeDPhotoCarousel } from '@/components/ui/3d-carousel'

const galleryImages = [
  "/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.06 (1).jpeg",
  "/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.06.jpeg",
  "/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.07 (1).jpeg",
  "/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.07 (2).jpeg",
  "/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.07.jpeg",
  "/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.08 (1).jpeg",
  "/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.08 (2).jpeg",
  "/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.08.jpeg",
  "/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.09 (1).jpeg",
  "/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.09 (2).jpeg",
  "/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.09.jpeg",
].map((p) => encodeURI(p))

export default function GalleryCarousel() {
  return (
    <section className="py-20 lg:py-28 bg-mint overflow-hidden" aria-labelledby="gallery-heading">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <span className="eyebrow block mb-4 text-green">Our Sourcing in Action</span>
          <h2
            id="gallery-heading"
            className="font-display font-light text-dark"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.03em', lineHeight: '1.05' }}
          >
            Explore our network
          </h2>
          <p className="font-body text-gray-text mt-4 max-w-2xl mx-auto" style={{ fontSize: '0.95rem', lineHeight: '1.75' }}>
            Drag the carousel to rotate through our sourcing moments and tap any shot to view it in detail. These snapshots showcase the people and produce behind Konduti Traders.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex justify-center"
        >
          <div className="w-full">
            <ThreeDPhotoCarousel images={galleryImages} bgColor="bg-mint" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
