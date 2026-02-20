'use client'

import { productCategories } from '@/data/products'
import type { ProductCategory } from '@/types'
import { cn } from '@/lib/utils'
import { Filter } from 'lucide-react'

interface CategorySidebarProps {
  activeCategory: ProductCategory
  onCategoryChange: (category: ProductCategory) => void
}

export default function CategorySidebar({ activeCategory, onCategoryChange }: CategorySidebarProps) {
  return (
    <aside aria-label="Product category filter" className="w-full lg:w-56 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-light p-5 sticky top-24">
        <div className="flex items-center gap-2 mb-5">
          <Filter size={15} className="text-teal" aria-hidden="true" />
          <h2 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-teal">
            Filter by Category
          </h2>
        </div>

        <ul className="flex flex-col gap-1" role="list">
          {productCategories.map(cat => (
            <li key={cat.id}>
              <button
                onClick={() => onCategoryChange(cat.id as ProductCategory)}
                aria-pressed={activeCategory === cat.id}
                className={cn(
                  'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-body transition-all duration-200',
                  activeCategory === cat.id
                    ? 'bg-teal text-white font-semibold'
                    : 'text-gray-text hover:bg-mint hover:text-teal'
                )}
              >
                <span>{cat.label}</span>
                <span
                  className={cn(
                    'text-xs font-semibold px-2 py-0.5 rounded-full',
                    activeCategory === cat.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-light text-gray-text'
                  )}
                >
                  {cat.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
