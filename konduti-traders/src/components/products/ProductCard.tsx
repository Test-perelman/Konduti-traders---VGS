'use client'

import Image from 'next/image'
import { Package } from 'lucide-react'
import type { IProduct } from '@/types'

interface ProductCardProps {
  product: IProduct
  onRequestQuote?: (product: IProduct) => void
}

export default function ProductCard({ product, onRequestQuote }: ProductCardProps) {
  return (
    <article
      className="group bg-white rounded-xl overflow-hidden border border-stone-lighter shadow-premium-sm hover:shadow-premium-md card-hover-subtle flex flex-col"
      aria-label={product.name}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.description.slice(0, 80)}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" aria-hidden="true" />
        {/* Availability badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`font-body font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full text-[0.6rem] backdrop-blur-sm border ${
              product.availability === 'year-round'
                ? 'bg-green/15 text-green border-green/20 text-white/90'
                : 'bg-cream/20 text-white border-cream/25'
            }`}
          >
            {product.availability === 'year-round' ? 'Year-round' : 'Seasonal'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-display font-medium text-dark mb-2 leading-tight"
          style={{ fontSize: '1.1rem', letterSpacing: '-0.018em' }}
        >
          {product.name}
        </h3>

        <p className="font-body text-stone flex-1 line-clamp-2 mb-4" style={{ fontSize: '0.78rem', lineHeight: '1.7' }}>
          {product.description}
        </p>

        {/* Meta */}
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center gap-2 font-body text-stone" style={{ fontSize: '0.72rem' }}>
            <Package className="w-3 h-3 text-teal" aria-hidden="true" />
            <span>Min. order: {product.minOrder || '50 kg'}</span>
          </div>
          {product.season && (
            <div className="flex items-center gap-2 font-body text-stone" style={{ fontSize: '0.72rem' }}>
              <span className="w-3 h-3 flex items-center justify-center" aria-hidden="true">📅</span>
              <span>Season: {product.season}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-mint font-body text-teal"
                style={{ fontSize: '0.65rem', fontWeight: 500 }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => onRequestQuote?.(product)}
          className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-green/7 text-green border border-green/15 rounded-lg font-body font-semibold hover:bg-green hover:text-white hover:border-green transition-all duration-250 magnetic-btn"
          style={{ fontSize: '0.77rem', letterSpacing: '0.02em' }}
          aria-label={`Request a quote for ${product.name}`}
        >
          Request Quote
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 6h7M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </article>
  )
}
