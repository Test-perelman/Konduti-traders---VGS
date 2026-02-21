import type { Metadata } from 'next'
import { Suspense } from 'react'
import ProductGrid from '@/components/products/ProductGrid'
import CtaBanner from '@/components/home/CtaBanner'
import ProductsHeroStack from '@/components/products/ProductsHeroStack'

export const metadata: Metadata = {
  title: 'Fresh Produce Products',
  description:
    "Browse Konduti Traders' full range of B2B fresh produce — fruits, vegetables, exotic produce, leafy greens, and seasonal specials. Request a bulk quote online.",
  alternates: { canonical: '/products' },
}

function ProductGridFallback() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-52 shrink-0">
        <div className="bg-stone-lighter/50 rounded-xl h-80 animate-pulse" />
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-stone-lighter/50 rounded-xl h-72 animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="pt-28 pb-0 bg-teal-dark relative overflow-hidden grain-overlay"
        aria-labelledby="products-hero-heading"
      >
        <div className="absolute inset-0 bg-fine-grid pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Left — copy */}
            <div className="pb-16 lg:pb-20">
              <span className="eyebrow-light block mb-6">Product Catalogue</span>
              <h1
                id="products-hero-heading"
                className="font-display font-light text-white mb-6"
                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', lineHeight: '0.97', letterSpacing: '-0.04em' }}
              >
                Fresh produce.
                <br />
                <span style={{ color: 'rgba(111,204,138,0.85)' }}>Every category.</span>
              </h1>
              <p className="font-body text-white/45 max-w-md" style={{ fontSize: '0.92rem', lineHeight: '1.8' }}>
                Graded, documented, and ready for bulk B2B procurement.
                Browse by category and request a quote directly.
              </p>
            </div>

            {/* Right — vertical image stack, bleeds into next section */}
            <div className="hidden lg:flex justify-end items-end relative">
              <ProductsHeroStack />
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="py-16 lg:py-20 bg-off-white" aria-label="Product catalogue">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
          <Suspense fallback={<ProductGridFallback />}>
            <ProductGrid />
          </Suspense>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
