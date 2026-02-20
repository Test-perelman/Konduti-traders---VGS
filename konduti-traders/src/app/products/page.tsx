import type { Metadata } from 'next'
import { Suspense } from 'react'
import Container from '@/components/ui/Container'
import ProductGrid from '@/components/products/ProductGrid'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata: Metadata = {
  title: 'Fresh Produce Products',
  description:
    'Browse Konduti Traders\' full range of B2B fresh produce — fruits, vegetables, exotic produce, leafy greens, and seasonal specials. Request a bulk quote online.',
  alternates: { canonical: '/products' },
}

function ProductGridFallback() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-56 shrink-0">
        <div className="bg-gray-light/50 rounded-2xl h-80 animate-pulse" />
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-light/50 rounded-2xl h-72 animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-teal relative overflow-hidden" aria-labelledby="products-hero-heading">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(95,208,104,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <Container>
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-[0.2em] uppercase text-green mb-4">
              <span className="w-6 h-px bg-green" />
              Product Catalogue
            </span>
            <h1
              id="products-hero-heading"
              className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-4 max-w-3xl"
            >
              Fresh Produce,
              <br />
              <span className="text-green">Every Category</span>
            </h1>
            <p className="font-body text-white/70 text-lg max-w-xl leading-relaxed">
              Graded, documented, and ready for bulk B2B procurement. Browse by category
              and request a quote directly.
            </p>
          </div>
        </Container>
      </section>

      {/* Product Grid */}
      <section className="py-16 lg:py-20 bg-mint" aria-label="Product catalogue">
        <Container>
          <Suspense fallback={<ProductGridFallback />}>
            <ProductGrid />
          </Suspense>
        </Container>
      </section>

      <CtaBanner />
    </>
  )
}
