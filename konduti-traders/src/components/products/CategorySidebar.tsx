'use client'

import { productCategories } from '@/data/products'
import type { ProductCategory } from '@/types'
import { cn } from '@/lib/utils'

interface CategorySidebarProps {
  activeCategory: ProductCategory
  onCategoryChange: (category: ProductCategory) => void
}

export default function CategorySidebar({ activeCategory, onCategoryChange }: CategorySidebarProps) {
  return (
    <aside aria-label="Product category filter" className="w-full lg:w-72 shrink-0">
      <div className="bg-white rounded-2xl border border-stone-lighter p-6 sticky top-24 shadow-premium-sm">
        <div className="mb-6 pb-4 border-b border-stone-lighter">
          <p className="eyebrow text-stone text-xs font-semibold tracking-[0.14em]">Filter by Category</p>
        </div>

        <ul className="flex flex-col gap-1.5" role="list">
          {productCategories.map(cat => (
            <li key={cat.id}>
              <button
                onClick={() => onCategoryChange(cat.id as ProductCategory)}
                aria-pressed={activeCategory === cat.id}
                className={cn(
                  'w-full flex items-center justify-between px-5 py-3 rounded-xl font-body transition-all duration-200',
                  activeCategory === cat.id
                    ? 'bg-teal text-white'
                    : 'text-stone hover:bg-off-white hover:text-dark'
                )}
                style={{ fontSize: '0.9rem' }}
              >
                <span
                  className={cn(
                    'font-medium whitespace-nowrap',
                    activeCategory === cat.id ? 'text-white' : 'text-dark'
                  )}
                >
                  {cat.label}
                </span>
                <span
                  className={cn(
                    'text-xs px-2.5 py-1 rounded-full font-semibold',
                    activeCategory === cat.id
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-lighter text-stone'
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
