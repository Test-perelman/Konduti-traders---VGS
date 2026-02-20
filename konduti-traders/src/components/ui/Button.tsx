import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'cream'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  fullWidth?: boolean
  as?: 'button' | 'a'
  href?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-green text-white hover:bg-green-dark shadow-green-sm hover:shadow-green-md active:scale-95',
  secondary:
    'bg-teal text-white hover:bg-teal-dark shadow-green-sm hover:shadow-green-md active:scale-95',
  ghost:
    'bg-transparent text-teal hover:bg-teal/8 border border-teal/20 hover:border-teal/40',
  outline:
    'bg-transparent text-white border-2 border-white/70 hover:bg-white/10 hover:border-white',
  cream:
    'bg-cream text-dark hover:bg-yellow-200 shadow-green-sm hover:shadow-green-md active:scale-95',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  fullWidth,
  as: Tag = 'button',
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-body font-semibold rounded-full',
    'transition-all duration-200 cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className
  )

  if (Tag === 'a') {
    return (
      <a href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
