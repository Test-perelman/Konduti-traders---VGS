import Link from 'next/link'
import { Leaf, Phone, Mail, MapPin, Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react'
import Container from '@/components/ui/Container'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Industries', href: '/industries' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const productLinks = [
  { label: 'Fresh Fruits', href: '/products?category=fruits' },
  { label: 'Vegetables', href: '/products?category=vegetables' },
  { label: 'Exotic Produce', href: '/products?category=exotic' },
  { label: 'Leafy Greens', href: '/products?category=leafy' },
  { label: 'Seasonal Specials', href: '/products?category=seasonal' },
]

const industryLinks = [
  { label: 'Supermarket Chains', href: '/industries#supermarkets' },
  { label: 'HoReCa', href: '/industries#horeca' },
  { label: 'Wholesalers', href: '/industries#wholesalers' },
  { label: 'Cloud Kitchens', href: '/industries#cloud-kitchens' },
  { label: 'Food Processors', href: '/industries#food-processors' },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-white" role="contentinfo">
      {/* Top Section */}
      <div className="border-b border-white/10">
        <Container>
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-6" aria-label="Konduti Traders">
                <div className="w-10 h-10 rounded-xl bg-green/15 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green" aria-hidden="true" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-display font-semibold text-xl text-white">Konduti</span>
                  <span className="font-body text-[12px] font-semibold tracking-[0.15em] uppercase text-green">
                    Traders
                  </span>
                </div>
              </Link>

              <p className="font-body text-base text-white/70 leading-relaxed max-w-sm mb-8">
                India&apos;s trusted B2B partner for fresh fruits and vegetables. Direct farm
                sourcing, quality grading, and pan-India supply chain logistics.
              </p>

              {/* Contact Info */}
              <ul className="flex flex-col gap-3" aria-label="Contact information">
                <li className="flex items-start gap-3 text-base font-body text-white/70">
                  <MapPin className="w-5 h-5 text-green mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Plot 14, APMC Market Yard, Sector 19,<br />Vashi, Navi Mumbai — 400 705</span>
                </li>
                <li className="flex items-center gap-3 text-base font-body">
                  <Phone className="w-5 h-5 text-green shrink-0" aria-hidden="true" />
                  <a href="tel:+919876543210" className="text-white/70 hover:text-green transition-colors">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-3 text-base font-body">
                  <Mail className="w-5 h-5 text-green shrink-0" aria-hidden="true" />
                  <a
                    href="mailto:procurement@kondutitraders.in"
                    className="text-white/70 hover:text-green transition-colors"
                  >
                    procurement@kondutitraders.in
                  </a>
                </li>
              </ul>

              {/* Social */}
              <div className="flex items-center gap-3 mt-6" aria-label="Social media links">
                {[
                  { Icon: Instagram, href: '#', label: 'Instagram' },
                  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { Icon: Twitter, href: '#', label: 'Twitter / X' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center hover:bg-green/20 hover:text-green text-white/50 transition-colors"
                  >
                    <Icon size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-green mb-6">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {quickLinks.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-base text-white/60 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-green mb-6">
                Products
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {productLinks.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-base text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h3 className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-green mb-6">
                Industries
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {industryLinks.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-base text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8 p-5 rounded-xl bg-green/10 border border-green/20">
                <p className="font-body text-sm text-white/70 mb-3">Ready to source fresh?</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-body text-base font-semibold text-green hover:text-white transition-colors"
                >
                  Get a Quote <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <Container>
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-white/50">
            © {new Date().getFullYear()} Konduti Traders Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span className="font-body text-sm text-white/40">GST: 27XXXXX0000X1ZX</span>
            <span className="text-white/20">·</span>
            <Link href="/privacy" className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">
              Privacy
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/terms" className="font-body text-sm text-white/50 hover:text-white/80 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
