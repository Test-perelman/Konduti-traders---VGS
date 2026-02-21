import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, UtensilsCrossed, Warehouse, ChefHat, Factory, Store, ArrowRight } from 'lucide-react'
import CtaBanner from '@/components/home/CtaBanner'
import { industries } from '@/data/industries'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'Konduti Traders serves supermarket chains, HoReCa, wholesale distributors, cloud kitchens, food processing units, and retail chains across India with fresh produce supply.',
  alternates: { canonical: '/industries' },
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  ShoppingCart: ({ className }) => <ShoppingCart className={className} />,
  UtensilsCrossed: ({ className }) => <UtensilsCrossed className={className} />,
  Warehouse: ({ className }) => <Warehouse className={className} />,
  ChefHat: ({ className }) => <ChefHat className={className} />,
  Factory: ({ className }) => <Factory className={className} />,
  Store: ({ className }) => <Store className={className} />,
}

export default function IndustriesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="pt-32 pb-20 bg-teal-dark relative overflow-hidden grain-overlay"
        aria-labelledby="industries-hero-heading"
      >
        <div className="absolute inset-0 bg-fine-grid pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-green/8 blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="eyebrow-light block mb-6">Industries</span>
            <h1
              id="industries-hero-heading"
              className="font-display font-light text-white mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: '0.97', letterSpacing: '-0.04em' }}
            >
              Built for India&apos;s
              <br />
              <span style={{ color: 'rgba(111,204,138,0.85)' }}>food industry.</span>
            </h1>
            <p className="font-body text-white/45 max-w-xl" style={{ fontSize: '0.92rem', lineHeight: '1.8' }}>
              Every segment of the B2B food industry has different procurement needs.
              We have built tailored solutions for each — based on 18 years of working with them.
            </p>
          </div>
        </div>
      </section>

      {/* ── Industry Nav Cards ── */}
      <section className="py-16 bg-mint" aria-label="Industries overview">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {industries.map(industry => {
              const IconComponent = iconMap[industry.icon]
              return (
                <a
                  key={industry.id}
                  href={`#${industry.slug}`}
                  className="group bg-white rounded-xl p-5 border border-stone-lighter hover:border-green/25 hover:shadow-green-sm transition-all duration-300 flex flex-col items-center text-center gap-3"
                  aria-label={`Jump to ${industry.name} section`}
                >
                  <div className="w-10 h-10 rounded-full bg-green/8 flex items-center justify-center group-hover:bg-green/12 transition-colors">
                    {IconComponent && <IconComponent className="w-4 h-4 text-green" />}
                  </div>
                  <span
                    className="font-display font-medium text-dark group-hover:text-teal transition-colors leading-tight"
                    style={{ fontSize: '0.85rem', letterSpacing: '-0.01em' }}
                  >
                    {industry.name}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Detailed Sections ── */}
      <section className="bg-off-white" aria-label="Industries served in detail">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
          <div className="divide-y divide-stone-lighter/60">
            {industries.map((industry, index) => {
              const IconComponent = iconMap[industry.icon]
              const isEven = index % 2 === 0
              return (
                <div
                  key={industry.id}
                  id={industry.slug}
                  className="py-20 lg:py-28 scroll-mt-20"
                  aria-labelledby={`${industry.slug}-heading`}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Image */}
                    <div className={`relative rounded-2xl overflow-hidden h-72 lg:h-[420px] shadow-premium-md ${!isEven ? 'lg:order-2' : ''}`}>
                      <Image
                        src={industry.image}
                        alt={industry.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/35 to-transparent" aria-hidden="true" />
                      <div className="absolute bottom-5 left-5">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
                          {IconComponent && <IconComponent className="w-3.5 h-3.5 text-white opacity-80" />}
                          <span className="font-body text-white text-sm font-medium">{industry.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={!isEven ? 'lg:order-1' : ''}>
                      <span className="eyebrow text-green block mb-5">{industry.name}</span>
                      <h2
                        id={`${industry.slug}-heading`}
                        className="font-display font-light text-dark mb-5"
                        style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: '1.1', letterSpacing: '-0.03em' }}
                      >
                        {industry.description.split('.')[0]}.
                      </h2>
                      <p className="font-body text-stone mb-8" style={{ fontSize: '0.88rem', lineHeight: '1.85' }}>
                        {industry.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div>
                          <h3 className="eyebrow text-teal mb-4">Challenges We Solve</h3>
                          <ul className="space-y-2">
                            {industry.challenges.slice(0, 3).map(c => (
                              <li key={c} className="flex items-start gap-2 font-body text-stone" style={{ fontSize: '0.82rem', lineHeight: '1.65' }}>
                                <span className="w-1 h-1 rounded-full bg-teal/40 mt-2 shrink-0" aria-hidden="true" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="eyebrow text-green mb-4">Our Solutions</h3>
                          <ul className="space-y-2">
                            {industry.solutions.slice(0, 3).map(s => (
                              <li key={s} className="flex items-start gap-2 font-body text-stone" style={{ fontSize: '0.82rem', lineHeight: '1.65' }}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-green mt-1 shrink-0" aria-hidden="true">
                                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-green text-white font-body font-semibold px-6 py-3 rounded-full hover:bg-green-dark transition-colors shadow-green-sm hover:shadow-green-md magnetic-btn"
                        style={{ fontSize: '0.8rem', letterSpacing: '0.02em' }}
                      >
                        Get a Quote for {industry.name}
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
