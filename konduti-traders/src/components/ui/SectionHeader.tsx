import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  subheading?: string
  align?: 'left' | 'center' | 'right'
  headingSize?: 'sm' | 'md' | 'lg' | 'xl'
  light?: boolean
  className?: string
  id?: string
}

const headingSizes = {
  sm: 'text-3xl md:text-4xl lg:text-5xl',
  md: 'text-4xl md:text-5xl lg:text-6xl',
  lg: 'text-5xl md:text-6xl lg:text-7xl',
  xl: 'text-6xl md:text-7xl lg:text-8xl',
}

const alignStyles = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
}

export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = 'center',
  headingSize = 'md',
  light = false,
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-5 mb-14 lg:mb-20', alignStyles[align], className)}>
      {eyebrow && (
        <span
          className={cn(
            'inline-flex items-center gap-2.5 text-xs font-body font-semibold tracking-[0.16em] uppercase',
            light ? 'text-green' : 'text-teal'
          )}
        >
          <span className={cn(
            'w-8 h-px inline-block',
            light
              ? 'bg-gradient-to-r from-green/50 to-green'
              : 'bg-gradient-to-r from-teal/30 to-green'
          )} />
          {eyebrow}
          <span className={cn(
            'w-8 h-px inline-block',
            light
              ? 'bg-gradient-to-l from-green/50 to-green'
              : 'bg-gradient-to-l from-teal/30 to-green'
          )} />
        </span>
      )}
      <h2
        id={id}
        className={cn(
          'font-display font-bold leading-[1.08] tracking-tight',
          headingSizes[headingSize],
          light ? 'text-white' : 'text-dark'
        )}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={cn(
            'max-w-2xl font-body leading-relaxed text-lg md:text-xl lg:text-2xl font-light',
            light ? 'text-white/70' : 'text-gray-text',
            align === 'center' && 'mx-auto'
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  )
}
