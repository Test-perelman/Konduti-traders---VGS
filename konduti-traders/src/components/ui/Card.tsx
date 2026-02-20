import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  variant?: 'default' | 'elevated' | 'outlined' | 'teal'
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

const variantStyles = {
  default: 'bg-white border border-gray-light shadow-green-sm',
  elevated: 'bg-white shadow-green-md',
  outlined: 'bg-white border-2 border-green/20',
  teal: 'bg-teal text-white',
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({
  children,
  hover = false,
  variant = 'default',
  padding = 'md',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden',
        variantStyles[variant],
        paddingStyles[padding],
        hover && 'card-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
