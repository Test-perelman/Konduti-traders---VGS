import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

type BadgeVariant = 'green' | 'cream' | 'teal' | 'gray' | 'white'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  green: 'bg-green/12 text-green-dark border border-green/20',
  cream: 'bg-cream/70 text-teal-dark border border-cream',
  teal: 'bg-teal/10 text-teal border border-teal/20',
  gray: 'bg-gray-light text-gray-text border border-gray-200',
  white: 'bg-white/15 text-white border border-white/30 backdrop-blur-sm',
}

export default function Badge({ variant = 'green', children, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold tracking-wide uppercase',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
