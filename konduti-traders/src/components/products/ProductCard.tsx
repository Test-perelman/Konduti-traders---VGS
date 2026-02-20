'use client'

import Image from 'next/image'
import { Calendar, Package, ArrowRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import type { IProduct } from '@/types'

interface ProductCardProps {
  product: IProduct
  onRequestQuote?: (product: IProduct) => void
}

export default function ProductCard({ product, onRequestQuote }: ProductCardProps) {
  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden border border-gray-light shadow-green-sm hover:shadow-green-md card-hover flex flex-col"
      aria-label={product.name}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.description.slice(0, 80)}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        {/* Availability badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={product.availability === 'year-round' ? 'green' : 'cream'}>
            {product.availability === 'year-round' ? 'Year-round' : 'Seasonal'}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-xl text-dark leading-tight">
            {product.name}
          </h3>
        </div>

        <p className="font-body text-sm text-gray-text leading-relaxed mb-4 flex-1 line-clamp-3">
          {product.description}
        </p>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs font-body text-gray-text">
            <Package size={13} className="text-teal" aria-hidden="true" />
            <span>Min. order: {product.minOrder || '50 kg'}</span>
          </div>
          {product.season && (
            <div className="flex items-center gap-2 text-xs font-body text-gray-text">
              <Calendar size={13} className="text-teal" aria-hidden="true" />
              <span>Season: {product.season}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-mint text-teal text-xs font-body font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => onRequestQuote?.(product)}
          className="group/btn flex items-center justify-center gap-2 w-full py-3 bg-teal/8 text-teal border border-teal/20 rounded-xl font-body font-semibold text-sm hover:bg-teal hover:text-white hover:border-teal transition-all duration-200 mt-auto"
          aria-label={`Request a quote for ${product.name}`}
        >
          Request Quote
          <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
