'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import CategorySidebar from './CategorySidebar'
import { products } from '@/data/products'
import type { IProduct, ProductCategory } from '@/types'

export default function ProductGrid() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all')
  const [quoteProduct, setQuoteProduct] = useState<IProduct | null>(null)

  // Sync with URL search params
  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory | null
    if (cat && ['spices-herbs', 'grains-pulses', 'nuts-seeds', 'fruits-vegetables', 'beverages', 'dehydrated'].includes(cat)) {
      setActiveCategory(cat)
    } else {
      setActiveCategory('all')
    }
  }, [searchParams])

  const handleCategoryChange = (cat: ProductCategory) => {
    setActiveCategory(cat)
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'all') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    router.push(`/products?${params.toString()}`, { scroll: false })
  }

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory)

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar */}
        <CategorySidebar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Grid */}
        <div className="flex-1">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-lighter">
            <p className="font-body text-stone" style={{ fontSize: '0.8rem' }}>
              Showing{' '}
              <span className="font-semibold text-dark">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            {activeCategory !== 'all' && (
              <button
                onClick={() => handleCategoryChange('all')}
                className="font-body text-stone hover:text-dark transition-colors flex items-center gap-1"
                style={{ fontSize: '0.75rem' }}
              >
                Clear filter
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard
                    product={product}
                    onRequestQuote={setQuoteProduct}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-stone" style={{ fontSize: '0.9rem' }}>
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quote Modal */}
      <AnimatePresence>
        {quoteProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setQuoteProduct(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-premium-xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="eyebrow text-green block mb-2">Quick Quote</span>
                  <h2
                    id="quote-modal-title"
                    className="font-display font-light text-dark"
                    style={{ fontSize: '1.6rem', letterSpacing: '-0.025em', lineHeight: '1.1' }}
                  >
                    {quoteProduct.name}
                  </h2>
                </div>
                <button
                  onClick={() => setQuoteProduct(null)}
                  className="w-8 h-8 rounded-lg bg-off-white flex items-center justify-center hover:bg-stone-lighter transition-colors shrink-0 ml-4"
                  aria-label="Close quote modal"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="#8a9a88" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <form
                className="space-y-4"
                onSubmit={e => {
                  e.preventDefault()
                  setQuoteProduct(null)
                  alert('Quote request sent! We will contact you within 4 business hours.')
                }}
              >
                <div>
                  <label htmlFor="q-name" className="eyebrow text-teal mb-1.5 block">
                    Your Name *
                  </label>
                  <input
                    id="q-name"
                    type="text"
                    required
                    placeholder="e.g. Rajesh Menon"
                    className="w-full px-4 py-3 rounded-xl border border-stone-lighter focus:border-green focus:ring-1 focus:ring-green/20 outline-none font-body text-dark bg-white transition-colors"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label htmlFor="q-company" className="eyebrow text-teal mb-1.5 block">
                    Company *
                  </label>
                  <input
                    id="q-company"
                    type="text"
                    required
                    placeholder="e.g. FreshMart Pvt. Ltd."
                    className="w-full px-4 py-3 rounded-xl border border-stone-lighter focus:border-green focus:ring-1 focus:ring-green/20 outline-none font-body text-dark bg-white transition-colors"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="q-volume" className="eyebrow text-teal mb-1.5 block">
                      Volume *
                    </label>
                    <input
                      id="q-volume"
                      type="text"
                      required
                      placeholder="200 kg/week"
                      className="w-full px-4 py-3 rounded-xl border border-stone-lighter focus:border-green focus:ring-1 focus:ring-green/20 outline-none font-body text-dark bg-white transition-colors"
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="q-phone" className="eyebrow text-teal mb-1.5 block">
                      Phone *
                    </label>
                    <input
                      id="q-phone"
                      type="tel"
                      required
                      placeholder="+91 98765..."
                      className="w-full px-4 py-3 rounded-xl border border-stone-lighter focus:border-green focus:ring-1 focus:ring-green/20 outline-none font-body text-dark bg-white transition-colors"
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-green text-white font-body font-semibold rounded-full hover:bg-green-dark transition-colors flex items-center justify-center gap-2 shadow-green-sm hover:shadow-green-md magnetic-btn"
                  style={{ fontSize: '0.82rem', letterSpacing: '0.02em' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1.5 7h11M8 2.5l5 4.5-5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Send Quote Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
