'use client'

import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SphereImageGrid, { ImageData } from '@/components/ui/image-sphere'

export default function SphereImageGallery() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  // Generate gallery images from public folder
  const galleryImages: ImageData[] = useMemo(() => {
    const baseImages = [
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.09.jpeg', alt: 'Gallery image 1' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.09 (1).jpeg', alt: 'Gallery image 2' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.06.jpeg', alt: 'Gallery image 3' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.06 (1).jpeg', alt: 'Gallery image 4' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.07.jpeg', alt: 'Gallery image 5' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.07 (1).jpeg', alt: 'Gallery image 6' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.07 (2).jpeg', alt: 'Gallery image 7' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.08.jpeg', alt: 'Gallery image 8' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.08 (1).jpeg', alt: 'Gallery image 9' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.08 (2).jpeg', alt: 'Gallery image 10' },
      { src: '/gallery images/gallery/WhatsApp Image 2026-02-24 at 17.18.09 (2).jpeg', alt: 'Gallery image 11' },
    ]

    return baseImages.map((img, i) => ({
      id: `gallery-${i + 1}`,
      ...img,
      title: `Konduti Gallery ${i + 1}`,
      description: 'Fresh produce from our sourcing network'
    }))
  }, [])

  return (
    <section className="py-20 lg:py-28 bg-mint overflow-hidden" aria-labelledby="gallery-heading">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
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
            Drag to rotate. Click any image to view in detail. Witness the quality and diversity of produce from across India's finest sourcing regions.
          </p>
        </motion.div>

        {/* 3D Sphere Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex justify-center"
        >
          <SphereImageGrid
            images={galleryImages}
            containerSize={500}
            sphereRadius={200}
            dragSensitivity={0.8}
            momentumDecay={0.96}
            maxRotationSpeed={6}
            baseImageScale={0.15}
            hoverScale={1.3}
            perspective={1000}
            autoRotate={true}
            autoRotateSpeed={0.2}
            className="drop-shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  )
}
