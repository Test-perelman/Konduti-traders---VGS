import { ThreeDPhotoCarousel } from '@/components/ui/3d-carousel'

export default function FeaturedCarousel() {
  return (
    <section className="py-20 bg-teal-dark overflow-hidden" aria-labelledby="carousel-heading">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="eyebrow-light block mb-4">Our Range</span>
          <h2
            id="carousel-heading"
            className="font-display font-light text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.03em', lineHeight: '1.05' }}
          >
            Explore the full catalogue
          </h2>
          <p className="font-body text-white/50 mt-4 max-w-md mx-auto" style={{ fontSize: '0.88rem', lineHeight: '1.75' }}>
            Drag to spin. Click any item to expand. Spices, grains, nuts, produce — all in one place.
          </p>
        </div>

        {/* 3D Carousel */}
        <ThreeDPhotoCarousel bgColor="bg-teal-dark" />
      </div>
    </section>
  )
}
