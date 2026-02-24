'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

// ── Wordmark ──────────────────────────────────────────────────────────────────
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
            className="flex items-center justify-between h-[88px] lg:h-[96px]"
            role="navigation"
            aria-label="Main navigation"
          >

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center group flex-shrink-0 rounded-xl bg-white px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
              aria-label="Konduti Traders — Home"
            >
              <Image
                src="/logo-full.png"
                alt="Konduti Traders Logo"
                width={280}
                height={146}
                className="w-auto h-[62px] md:h-[66px] lg:h-[70px] object-contain group-hover:opacity-90 transition-opacity"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-8" role="list">
              {NAV_LINKS.map(link => {
                const active = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'relative font-body text-[0.95rem] font-medium tracking-[0.01em] transition-colors duration-300 py-1 group',
                        active
                          ? 'text-green font-semibold'
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
                  'hidden lg:inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-[0.9rem] font-semibold tracking-[0.02em] transition-all duration-300 magnetic-btn',
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
                          'flex items-center justify-between py-4 border-b border-stone-lighter/50 font-display text-[1.85rem] tracking-[-0.03em] transition-colors',
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
                  className="block w-full text-center bg-green text-white font-body text-base font-semibold tracking-[0.02em] py-4 rounded-full hover:bg-green-dark transition-colors"
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

