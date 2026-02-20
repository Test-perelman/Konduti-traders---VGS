'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X } from 'lucide-react'
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
    if (cat && ['fruits', 'vegetables', 'exotic', 'leafy', 'seasonal'].includes(cat)) {
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
          <div className="flex items-center justify-between mb-6">
            <p className="font-body text-sm text-gray-text">
              Showing{' '}
              <span className="font-semibold text-dark">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
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
              <p className="font-body text-gray-text text-lg">No products found in this category.</p>
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
            className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setQuoteProduct(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-green-xl"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 id="quote-modal-title" className="font-display font-semibold text-2xl text-dark">
                    Request Quote
                  </h2>
                  <p className="font-body text-sm text-gray-text mt-1">
                    For <span className="font-semibold text-teal">{quoteProduct.name}</span>
                  </p>
                </div>
                <button
                  onClick={() => setQuoteProduct(null)}
                  className="p-2 rounded-xl hover:bg-mint transition-colors"
                  aria-label="Close quote modal"
                >
                  <X size={18} className="text-gray-text" aria-hidden="true" />
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
                  <label htmlFor="q-name" className="font-body text-xs font-semibold text-teal mb-1.5 block">
                    Your Name *
                  </label>
                  <input
                    id="q-name"
                    type="text"
                    required
                    placeholder="e.g. Rajesh Menon"
                    className="w-full px-4 py-3 rounded-xl border border-gray-light focus:border-green focus:ring-1 focus:ring-green outline-none font-body text-sm text-dark bg-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="q-company" className="font-body text-xs font-semibold text-teal mb-1.5 block">
                    Company *
                  </label>
                  <input
                    id="q-company"
                    type="text"
                    required
                    placeholder="e.g. FreshMart Pvt. Ltd."
                    className="w-full px-4 py-3 rounded-xl border border-gray-light focus:border-green focus:ring-1 focus:ring-green outline-none font-body text-sm text-dark bg-white transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="q-volume" className="font-body text-xs font-semibold text-teal mb-1.5 block">
                      Volume Required *
                    </label>
                    <input
                      id="q-volume"
                      type="text"
                      required
                      placeholder="e.g. 200 kg/week"
                      className="w-full px-4 py-3 rounded-xl border border-gray-light focus:border-green focus:ring-1 focus:ring-green outline-none font-body text-sm text-dark bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="q-phone" className="font-body text-xs font-semibold text-teal mb-1.5 block">
                      Phone *
                    </label>
                    <input
                      id="q-phone"
                      type="tel"
                      required
                      placeholder="+91 98765..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-light focus:border-green focus:ring-1 focus:ring-green outline-none font-body text-sm text-dark bg-white transition-colors"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-green text-white font-body font-semibold rounded-xl hover:bg-green-dark transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MessageSquare size={15} aria-hidden="true" />
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
