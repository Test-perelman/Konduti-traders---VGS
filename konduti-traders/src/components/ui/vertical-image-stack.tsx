'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, type PanInfo } from 'framer-motion'
import Image from 'next/image'

interface StackImage {
  src: string
  alt: string
  label?: string
}

interface VerticalImageStackProps {
  images: StackImage[]
  className?: string
  /** height of the visible stack area */
  height?: number
  /** width of each card */
  width?: number
  showCounter?: boolean
  showDots?: boolean
}

export function VerticalImageStack({
  images,
  className = '',
  height = 520,
  width = 320,
  showCounter = false,
  showDots = true,
}: VerticalImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavTime = useRef(0)
  const cooldown = 400

  const navigate = useCallback((dir: number) => {
    const now = Date.now()
    if (now - lastNavTime.current < cooldown) return
    lastNavTime.current = now
    setCurrentIndex(prev => {
      if (dir > 0) return prev === images.length - 1 ? 0 : prev + 1
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }, [images.length])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -50) navigate(1)
    else if (info.offset.y > 50) navigate(-1)
  }

  const getStyle = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    const cardH = height * 0.88
    if (diff === 0)  return { y: 0,           scale: 1,    opacity: 1,    zIndex: 5, rotateX: 0   }
    if (diff === -1) return { y: -(cardH * 0.38), scale: 0.84, opacity: 0.55, zIndex: 4, rotateX: 9  }
    if (diff === -2) return { y: -(cardH * 0.65), scale: 0.70, opacity: 0.28, zIndex: 3, rotateX: 16 }
    if (diff === 1)  return { y:  (cardH * 0.38), scale: 0.84, opacity: 0.55, zIndex: 4, rotateX: -9 }
    if (diff === 2)  return { y:  (cardH * 0.65), scale: 0.70, opacity: 0.28, zIndex: 3, rotateX: -16 }
    return { y: diff > 0 ? cardH * 1.1 : -cardH * 1.1, scale: 0.6, opacity: 0, zIndex: 0, rotateX: 0 }
  }

  const isVisible = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  const cardH = Math.round(height * 0.88)

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ height, width: width + 80 }}>
      {/* Card Stack */}
      <div
        className="relative flex items-center justify-center"
        style={{ height, width, perspective: '1100px' }}
      >
        {images.map((img, index) => {
          if (!isVisible(index)) return null
          const s = getStyle(index)
          const isCurrent = index === currentIndex
          return (
            <motion.div
              key={index}
              className="absolute cursor-grab active:cursor-grabbing select-none"
              animate={{ y: s.y, scale: s.scale, opacity: s.opacity, rotateX: s.rotateX, zIndex: s.zIndex }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 1 }}
              drag={isCurrent ? 'y' : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.18}
              onDragEnd={handleDragEnd}
              style={{ transformStyle: 'preserve-3d', zIndex: s.zIndex }}
            >
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  width,
                  height: cardH,
                  boxShadow: isCurrent
                    ? '0 28px 56px -12px rgba(17,26,17,0.45), 0 0 0 1px rgba(61,139,94,0.08)'
                    : '0 12px 32px -10px rgba(17,26,17,0.22)',
                }}
              >
                {/* Top-to-transparent inner glow */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/10 via-transparent to-transparent rounded-2xl pointer-events-none" />

                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  draggable={false}
                  priority={isCurrent}
                  sizes={`${width}px`}
                />

                {/* Bottom label overlay */}
                {img.label && isCurrent && (
                  <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent px-5 pt-12 pb-5">
                    <p className="font-display font-light text-white text-2xl leading-tight" style={{ letterSpacing: '-0.02em' }}>
                      {img.label}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation dots */}
      {showDots && images.length > 1 && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'h-6 w-1.5 bg-green'
                  : 'h-1.5 w-1.5 bg-stone-lighter hover:bg-stone'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {showCounter && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <span className="font-display font-light text-dark tabular-nums" style={{ fontSize: '2.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <div className="my-1.5 h-px w-6 bg-stone-lighter" />
          <span className="font-body text-stone tabular-nums" style={{ fontSize: '0.85rem' }}>
            {String(images.length).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  )
}
