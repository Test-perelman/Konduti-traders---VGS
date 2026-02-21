'use client'

import { VerticalImageStack } from '@/components/ui/vertical-image-stack'

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=700&q=85&auto=format&fit=crop',
    alt: 'Fresh Fruits — Apples, Mangoes, Pomegranates',
    label: 'Fresh Fruits',
  },
  {
    src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&q=80&auto=format&fit=crop',
    alt: 'Vegetables — Onions, Tomatoes, Potatoes',
    label: 'Vegetables',
  },
  {
    src: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=700&q=80&auto=format&fit=crop',
    alt: 'Exotic Produce — Broccoli, Zucchini, Lettuce',
    label: 'Exotic Produce',
  },
  {
    src: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=700&q=80&auto=format&fit=crop',
    alt: 'Leafy Greens — Spinach, Coriander, Mint',
    label: 'Leafy Greens',
  },
  {
    src: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=700&q=80&auto=format&fit=crop',
    alt: 'Seasonal Specials — Watermelon, Mango, Coconut',
    label: 'Seasonal Specials',
  },
]

export default function ProductsHeroStack() {
  return (
    <div className="relative" style={{ marginBottom: '-80px' }}>
      {/* Ambient green glow behind stack */}
      <div
        className="absolute -inset-12 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(61,139,94,0.18) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <VerticalImageStack
        images={heroImages}
        height={540}
        width={300}
        showDots={true}
        showCounter={true}
      />
    </div>
  )
}
