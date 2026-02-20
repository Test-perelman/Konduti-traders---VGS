'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Leaf } from 'lucide-react'
import { cn } from '@/lib/utils'
import Container from '@/components/ui/Container'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Industries', href: '/industries' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isTransparent = isHome && !isScrolled && !isOpen

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-gray-light shadow-green-sm'
      )}
    >
      <Container>
        <nav
          className="flex items-center justify-between h-16 lg:h-20"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Konduti Traders — Home"
          >
            <div className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center transition-colors',
              isTransparent ? 'bg-white/15' : 'bg-green/10'
            )}>
              <Leaf
                className={cn(
                  'w-5 h-5 transition-colors',
                  isTransparent ? 'text-white' : 'text-green'
                )}
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={cn(
                  'font-display font-semibold text-lg tracking-tight transition-colors',
                  isTransparent ? 'text-white' : 'text-dark'
                )}
              >
                Konduti
              </span>
              <span
                className={cn(
                  'font-body text-[12px] font-semibold tracking-[0.15em] uppercase transition-colors',
                  isTransparent ? 'text-white/70' : 'text-teal'
                )}
              >
                Traders
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'relative px-3 py-2 text-base font-body font-medium rounded-lg transition-colors duration-200',
                    'after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:rounded-full',
                    'after:transition-transform after:duration-200 after:origin-left',
                    pathname === link.href
                      ? cn(
                        'after:scale-x-100',
                        isTransparent
                          ? 'text-white after:bg-white'
                          : 'text-teal after:bg-green'
                      )
                      : cn(
                        'after:scale-x-0 hover:after:scale-x-100',
                        isTransparent
                          ? 'text-white/85 hover:text-white hover:bg-white/10 after:bg-white'
                          : 'text-gray-text hover:text-teal hover:bg-mint after:bg-green'
                      )
                  )}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                'px-6 py-3 text-base font-body font-semibold rounded-full transition-all duration-200',
                isTransparent
                  ? 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
                  : 'bg-green text-white hover:bg-green-dark shadow-green-sm hover:shadow-green-md'
              )}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              isTransparent
                ? 'text-white hover:bg-white/15'
                : 'text-dark hover:bg-mint'
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          'lg:hidden bg-white border-b border-gray-light overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!isOpen}
      >
        <Container>
          <ul className="py-4 flex flex-col gap-1" role="list">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center px-4 py-3.5 rounded-xl text-base font-body font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-green/10 text-teal font-semibold'
                      : 'text-gray-text hover:bg-mint hover:text-teal'
                  )}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                className="flex items-center justify-center px-4 py-3.5 bg-green text-white text-base font-body font-semibold rounded-xl hover:bg-green-dark transition-colors"
              >
                Get a Quote
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  )
}
