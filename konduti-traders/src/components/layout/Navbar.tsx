'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Industries', href: '/industries' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

// ── Animated Logo Mark ────────────────────────────────────────────────────────
function LogoMark({ isLight }: { isLight: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 260, damping: 24, mass: 0.8 }
  const rotateX = useSpring(useTransform(mouseY, [-30, 30], [12, -12]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-30, 30], [-10, 10]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mouseX.set(e.clientX - cx)
    mouseY.set(e.clientY - cy)
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Leaf layer definitions — each with depth offset (z) and angle
  const layers = [
    { rotate: -22, y: 3,  scale: 0.72, opacity: 0.35, delay: 0    },
    { rotate: -10, y: 1,  scale: 0.86, opacity: 0.55, delay: 0.06 },
    { rotate:   0, y: 0,  scale: 1,    opacity: 1,    delay: 0.12 },
    { rotate:  12, y: 2,  scale: 0.82, opacity: 0.45, delay: 0.08 },
  ]

  const leafColor = isLight ? '#3d8b5e' : '#6fcf8a'
  const stemColor = isLight ? '#2c5f4a' : '#4fc97e'

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 320, transformStyle: 'preserve-3d' }}
      className="relative w-16 h-16 cursor-pointer flex-shrink-0"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        {/* Glow ring behind */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 rounded-full"
          style={{
            background: isLight
              ? 'radial-gradient(circle, rgba(61,139,94,0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(111,207,138,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Stacked leaf layers — adapted from the vertical card stack depth concept */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.7, rotateZ: layer.rotate - 8 }}
              animate={{ opacity: layer.opacity, y: layer.y, scale: layer.scale, rotateZ: layer.rotate }}
              transition={{
                delay: layer.delay,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute"
              style={{ transformOrigin: 'center bottom' }}
            >
              <svg width="34" height="44" viewBox="0 0 20 26" fill="none">
                {/* Leaf shape */}
                <path
                  d="M10 1C10 1 1 7 1 15.5a9 9 0 0018 0C19 7 10 1 10 1z"
                  fill={leafColor}
                  opacity={0.9}
                />
                {/* Inner highlight */}
                <path
                  d="M10 4C10 4 4.5 9 4.5 15a5.5 5.5 0 003 4.9"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Stem */}
                {i === 2 && (
                  <path
                    d="M10 24.5V15"
                    stroke={stemColor}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.6"
                  />
                )}
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Subtle animated pulse ring on the dominant leaf */}
        <motion.div
          className="absolute inset-0 rounded-full border pointer-events-none"
          style={{ borderColor: isLight ? 'rgba(61,139,94,0.2)' : 'rgba(111,207,138,0.25)' }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </motion.div>
    </motion.div>
  )
}

// ── Wordmark ──────────────────────────────────────────────────────────────────
function LogoWordmark({ isLight }: { isLight: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col leading-none gap-[3px]"
    >
      <span
        className={cn(
          'font-display font-medium leading-none transition-colors duration-500',
          isLight ? 'text-dark' : 'text-white'
        )}
        style={{ fontSize: '1.65rem', letterSpacing: '-0.035em' }}
      >
        Konduti
      </span>
      <motion.span
        initial={{ opacity: 0, letterSpacing: '0.08em' }}
        animate={{ opacity: 1, letterSpacing: '0.22em' }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'font-body uppercase transition-colors duration-500',
          isLight ? 'text-stone' : 'text-white/45'
        )}
        style={{ fontSize: '0.58rem' }}
      >
        Traders
      </motion.span>
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isLight = !isHome || scrolled

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isLight
            ? 'bg-white/96 backdrop-blur-xl border-b border-stone-lighter/50 shadow-premium-sm'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
          <nav
            className="flex items-center justify-between h-[76px] lg:h-[88px]"
            role="navigation"
            aria-label="Main navigation"
          >

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group flex-shrink-0"
              aria-label="Konduti Traders — Home"
            >
              <LogoMark isLight={isLight} />
              <LogoWordmark isLight={isLight} />
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-7" role="list">
              {NAV_LINKS.map(link => {
                const active = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'relative font-body text-[0.8rem] font-medium tracking-[0.01em] transition-colors duration-300 py-1 group',
                        active
                          ? isLight ? 'text-dark' : 'text-white'
                          : isLight ? 'text-stone hover:text-dark' : 'text-white/65 hover:text-white'
                      )}
                      aria-current={active ? 'page' : undefined}
                    >
                      {link.label}
                      <span className={cn(
                        'absolute -bottom-0.5 left-0 h-px bg-current transition-all duration-400 origin-left',
                        active ? 'w-full opacity-35' : 'w-0 group-hover:w-full opacity-25'
                      )} />
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Desktop CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  'hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-[0.75rem] font-semibold tracking-[0.03em] transition-all duration-300 magnetic-btn',
                  isLight
                    ? 'bg-green text-white hover:bg-green-dark shadow-green-sm hover:shadow-green-md'
                    : 'bg-white/10 text-white border border-white/22 hover:bg-white/18 backdrop-blur-sm'
                )}
              >
                Get a Quote
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-60" aria-hidden="true">
                  <path d="M2 5h6M6 2.5L8.5 5 6 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              {/* Hamburger */}
              <button
                className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-8 h-8"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                <span className={cn(
                  'block w-5 h-px transition-all duration-300 origin-center',
                  isLight ? 'bg-dark' : 'bg-white',
                  mobileOpen && 'rotate-45 translate-y-[6px]'
                )} />
                <span className={cn(
                  'block w-5 h-px transition-all duration-300',
                  isLight ? 'bg-dark' : 'bg-white',
                  mobileOpen && 'opacity-0 scale-x-0'
                )} />
                <span className={cn(
                  'block w-5 h-px transition-all duration-300 origin-center',
                  isLight ? 'bg-dark' : 'bg-white',
                  mobileOpen && '-rotate-45 -translate-y-[6px]'
                )} />
              </button>
            </div>

          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-dark/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              key="drawer"
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[min(82vw,310px)] bg-white flex flex-col shadow-premium-xl lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 h-[68px] border-b border-stone-lighter/50">
                <span className="font-display text-lg tracking-[-0.025em] text-dark">Navigation</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-stone hover:text-dark transition-colors rounded-full hover:bg-gray-light"
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 px-6 py-6 overflow-y-auto" aria-label="Mobile navigation">
                <ul role="list" className="flex flex-col gap-0.5">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'flex items-center justify-between py-3.5 border-b border-stone-lighter/50 font-display text-[1.6rem] tracking-[-0.03em] transition-colors',
                          pathname === link.href ? 'text-green' : 'text-dark hover:text-green'
                        )}
                        aria-current={pathname === link.href ? 'page' : undefined}
                      >
                        {link.label}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-25" aria-hidden="true">
                          <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="px-6 pb-8 pt-4"
              >
                <Link
                  href="/contact"
                  className="block w-full text-center bg-green text-white font-body text-sm font-semibold tracking-[0.025em] py-3.5 rounded-full hover:bg-green-dark transition-colors"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
