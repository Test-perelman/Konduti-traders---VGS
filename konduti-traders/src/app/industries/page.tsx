import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, UtensilsCrossed, Warehouse, ChefHat, Factory, Store, CheckCircle2, ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
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
      {/* Hero */}
      <section className="pt-32 pb-20 bg-teal relative overflow-hidden" aria-labelledby="industries-hero-heading">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(95,208,104,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }} aria-hidden="true" />
        <Container>
          <div className="max-w-3xl relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-[0.2em] uppercase text-green mb-5">
              <span className="w-6 h-px bg-green" />
              Industries
            </span>
            <h1 id="industries-hero-heading" className="font-display font-semibold text-5xl md:text-6xl text-white leading-tight tracking-tight mb-6">
              Built for India&apos;s
              <br />
              <span className="text-green">Food Industry</span>
            </h1>
            <p className="font-body text-white/70 text-lg leading-relaxed max-w-2xl">
              Every segment of the B2B food industry has different procurement needs. We have
              built tailored solutions for each — based on 18 years of working with them.
            </p>
          </div>
        </Container>
      </section>

      {/* Industry Cards */}
      <section className="py-20 lg:py-28 bg-mint" aria-label="Industries served overview">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {industries.map(industry => {
              const IconComponent = iconMap[industry.icon]
              return (
                <a
                  key={industry.id}
                  href={`#${industry.slug}`}
                  className="group bg-white rounded-2xl p-7 border border-gray-light shadow-green-sm hover:shadow-green-md card-hover flex flex-col"
                  aria-label={`Jump to ${industry.name} section`}
                >
                  <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center mb-5">
                    {IconComponent && <IconComponent className="w-5 h-5 text-green" />}
                  </div>
                  <h2 className="font-display font-semibold text-xl text-dark mb-2 flex-1">
                    {industry.name}
                  </h2>
                  <p className="font-body text-sm text-gray-text leading-relaxed mb-4">
                    {industry.shortDescription}
                  </p>
                  <div className="flex items-center gap-1 text-teal text-sm font-body font-semibold group-hover:text-green transition-colors mt-auto">
                    Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              )
            })}
          </div>

          {/* Detailed sections */}
          <div className="space-y-24">
            {industries.map((industry, index) => {
              const IconComponent = iconMap[industry.icon]
              const isEven = index % 2 === 0
              return (
                <div
                  key={industry.id}
                  id={industry.slug}
                  className="scroll-mt-24"
                  aria-labelledby={`${industry.slug}-heading`}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image */}
                    <div className={`relative rounded-3xl overflow-hidden h-72 lg:h-[420px] ${!isEven ? 'lg:order-last' : ''}`}>
                      <Image
                        src={industry.image}
                        alt={industry.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" aria-hidden="true" />
                      <div className="absolute bottom-6 left-6">
                        <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/25">
                          {IconComponent && <IconComponent className="w-4 h-4 text-white" />}
                          <span className="font-body text-sm font-semibold text-white">{industry.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <span className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-[0.2em] uppercase text-green mb-4">
                        <span className="w-6 h-px bg-green" />
                        {industry.name}
                      </span>
                      <h2
                        id={`${industry.slug}-heading`}
                        className="font-display font-semibold text-3xl md:text-4xl text-dark leading-tight mb-4"
                      >
                        {industry.description.split('.')[0]}.
                      </h2>
                      <p className="font-body text-base text-gray-text leading-relaxed mb-8">
                        {industry.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div>
                          <h3 className="font-body text-xs font-semibold tracking-[0.12em] uppercase text-teal mb-3">
                            Challenges We Solve
                          </h3>
                          <ul className="space-y-2">
                            {industry.challenges.slice(0, 3).map(c => (
                              <li key={c} className="flex items-start gap-2 font-body text-sm text-gray-text">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal/50 mt-1.5 shrink-0" aria-hidden="true" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-body text-xs font-semibold tracking-[0.12em] uppercase text-green mb-3">
                            Our Solutions
                          </h3>
                          <ul className="space-y-2">
                            {industry.solutions.slice(0, 3).map(s => (
                              <li key={s} className="flex items-start gap-2 font-body text-sm text-gray-text">
                                <CheckCircle2 size={14} className="text-green mt-0.5 shrink-0" aria-hidden="true" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-green text-white font-body font-semibold px-7 py-3.5 rounded-full hover:bg-green-dark transition-colors shadow-green-sm hover:shadow-green-md text-sm"
                      >
                        Get a Quote for {industry.name}
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  )
}
