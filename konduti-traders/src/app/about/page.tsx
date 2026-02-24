import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CtaBanner from '@/components/home/CtaBanner'
import FounderSection from '@/components/about/FounderSection'
import LogoDivider from '@/components/about/LogoDivider'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about Konduti Traders — India's B2B fresh produce procurement company. Our mission, values, sourcing network, and quality assurance process.",
  alternates: { canonical: '/about' },
}

const values = [
  {
    title: 'Integrity First',
    body: 'Transparent pricing. Honest quality representation. Clear documentation. No surprises.',
  },
  {
    title: 'Quality Over Volume',
    body: 'We never compromise on grade standards to fill volumes. If it doesn\'t meet spec, it doesn\'t ship.',
  },
  {
    title: 'Partnership Mindset',
    body: 'Every buyer and farmer is a long-term partner, not a transaction. Relationships first.',
  },
  {
    title: 'Responsible Sourcing',
    body: 'We actively reduce waste, support small farmers through FPO partnerships, and promote sustainable practices.',
  },
]

const sourcing = [
  { region: 'Maharashtra', produce: 'Onions, Pomegranates, Grapes, Tomatoes', districts: 'Nashik, Pune, Solapur, Satara' },
  { region: 'Himachal Pradesh', produce: 'Apples, Stone Fruits', districts: 'Shimla, Kinnaur, Kullu' },
  { region: 'Tamil Nadu & Karnataka', produce: 'Exotic Vegetables, Leafy Greens', districts: 'Ooty, Bengaluru, Kolar' },
  { region: 'Andhra Pradesh', produce: 'Bananas, Tomatoes, Watermelon', districts: 'Narayanpet, Kurnool, Krishna' },
  { region: 'Punjab & UP', produce: 'Potatoes, Mint, Wheat Vegetables', districts: 'Agra, Farrukhabad, Amritsar' },
  { region: 'Kerala & Goa', produce: 'Coconuts, Spices, Exotic Fruits', districts: 'Thrissur, Kozhikode, North Goa' },
]

const qualitySteps = [
  { step: '01', title: 'Pre-Harvest Assessment', body: 'Field teams visit farms 7–10 days before harvest to assess crop health, maturity, and expected quality.' },
  { step: '02', title: 'Harvest Coordination', body: 'We coordinate harvest timing to ensure produce is picked at optimal maturity for its end use.' },
  { step: '03', title: 'Farm-Level Grading', body: 'Immediate sorting by size, colour, and defects at the farm or nearby collection centre.' },
  { step: '04', title: 'Pre-Cooling', body: 'Field heat removed within 2–4 hours of harvest using forced-air or water cooling systems.' },
  { step: '05', title: 'Pack House QC', body: 'Secondary grading, weight check, visual inspection, and FSSAI-compliant labelling.' },
  { step: '06', title: 'Cold Chain Dispatch', body: 'Temperature-controlled dispatch with IoT logging. Full documentation with every consignment.' },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="pt-32 pb-20 bg-dark relative overflow-hidden grain-overlay"
        aria-labelledby="about-hero-heading"
      >
        <div className="absolute inset-0 bg-fine-grid pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green/5 blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="eyebrow-light block mb-6">About Konduti Traders</span>
            <h1
              id="about-hero-heading"
              className="font-display font-light text-white mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: '0.97', letterSpacing: '-0.04em' }}
            >
              Rooted in farms.
              <br />
              <span style={{ color: 'rgba(111,204,138,0.85)' }}>Trusted by business.</span>
            </h1>
            <p className="font-body text-white/50 max-w-xl" style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
              India&apos;s B2B fresh produce procurement partner — connecting farms directly
              to the businesses that need consistent, quality, traceable supply.
            </p>
          </div>
        </div>
      </section>

      <LogoDivider />

      {/* ── Story ── */}
      <section className="py-20 lg:py-28 bg-white" aria-labelledby="overview-heading">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="eyebrow text-green block mb-5">Our Story</span>
              <h2
                id="overview-heading"
                className="font-display font-light text-dark mb-7"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
              >
                Built on 18 years
                <br />
                in the trade.
              </h2>
              <div className="space-y-4 font-body text-gray-text" style={{ fontSize: '0.9rem', lineHeight: '1.85' }}>
                <p>
                  Konduti Traders was founded with one conviction: that India&apos;s fresh produce
                  supply chain could be better. Better for farmers who deserved fair prices.
                  Better for businesses who deserved reliable supply. Better for consumers
                  who deserved fresher food with less waste.
                </p>
                <p>
                  We started from Navi Mumbai&apos;s APMC market yard, deep in the Maharashtra
                  onion and grape trade. Over the years, we expanded our sourcing network to
                  20+ growing regions across India — Himachal apples to Ooty broccoli,
                  Kerala coconuts to Andhra tomatoes.
                </p>
                <p>
                  Today, we serve 100+ B2B buyers — supermarket chains, hotel groups, cloud
                  kitchen networks, wholesale distributors, and food processing units.
                  Every consignment carries our quality guarantee and our commitment to be
                  a dependable partner, not just a vendor.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-96 lg:h-[620px] shadow-premium-lg">
              <Image
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80&auto=format&fit=crop"
                alt="Farm fields — Konduti Traders sourcing regions"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/25 to-transparent" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-16 lg:py-20 bg-mint" aria-labelledby="mission-heading">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-10 rounded-2xl bg-teal-dark relative overflow-hidden">
              <div className="absolute inset-0 bg-fine-grid pointer-events-none" aria-hidden="true" />
              <div className="relative z-10">
                <span className="eyebrow-light block mb-5">Our Mission</span>
                <h2
                  id="mission-heading"
                  className="font-display font-light text-white mb-5"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: '1.12', letterSpacing: '-0.025em' }}
                >
                  Reliable fresh produce
                  <br />
                  for every Indian business.
                </h2>
                <p className="font-body text-white/50" style={{ fontSize: '0.85rem', lineHeight: '1.8' }}>
                  To make farm-direct fresh produce supply accessible, consistent, and
                  transparent for every B2B buyer in India — from the 5-outlet kirana
                  chain to the 200-property hotel group.
                </p>
              </div>
            </div>
            <div className="p-10 rounded-2xl bg-white border border-stone-lighter">
              <span className="eyebrow text-green block mb-5">Our Vision</span>
              <h2
                className="font-display font-light text-dark mb-5"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: '1.12', letterSpacing: '-0.025em' }}
              >
                India&apos;s most trusted
                <br />
                fresh produce network.
              </h2>
              <p className="font-body text-stone" style={{ fontSize: '0.85rem', lineHeight: '1.8' }}>
                To build India&apos;s most reliable and transparent farm-to-business fresh
                produce network — reducing waste, fairly rewarding farmers, and setting
                the standard for quality in B2B produce supply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 lg:py-24 bg-white" aria-labelledby="values-heading">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <span className="eyebrow text-green block mb-4">Our Values</span>
            <h2
              id="values-heading"
              className="font-display font-light text-dark"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              What we stand for.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-lighter/50 rounded-2xl overflow-hidden border border-stone-lighter/50">
            {values.map(({ title, body }) => (
              <div key={title} className="bg-white p-7 hover:bg-mint transition-colors duration-300">
                <h3
                  className="font-display font-medium text-dark mb-3"
                  style={{ fontSize: '1.15rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}
                >
                  {title}
                </h3>
                <p className="font-body text-stone" style={{ fontSize: '0.82rem', lineHeight: '1.75' }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sourcing Network ── */}
      <section className="py-20 lg:py-28 bg-teal-dark relative overflow-hidden grain-overlay" aria-labelledby="sourcing-heading">
        <div className="absolute inset-0 bg-fine-grid pointer-events-none" aria-hidden="true" />
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="mb-12">
            <span className="eyebrow-light block mb-4">Sourcing Network</span>
            <h2
              id="sourcing-heading"
              className="font-display font-light text-white"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              20+ regions across India.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sourcing.map(({ region, produce, districts }) => (
              <div key={region} className="p-6 rounded-xl bg-white/4 border border-white/8 hover:bg-white/8 transition-colors duration-300">
                <h3
                  className="font-display font-medium text-white mb-2"
                  style={{ fontSize: '1.1rem', letterSpacing: '-0.018em' }}
                >
                  {region}
                </h3>
                <p className="font-body text-white/65 mb-1" style={{ fontSize: '0.82rem' }}>{produce}</p>
                <p className="font-body text-white/30" style={{ fontSize: '0.72rem', letterSpacing: '0.02em' }}>{districts}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality Assurance ── */}
      <section className="py-20 lg:py-28 bg-off-white" aria-labelledby="qa-heading">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <span className="eyebrow text-green block mb-4">Quality Assurance</span>
            <h2
              id="qa-heading"
              className="font-display font-light text-dark"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              Quality at every step.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {qualitySteps.map(({ step, title, body }) => (
              <div
                key={step}
                className="flex gap-5 p-7 rounded-xl bg-white border border-stone-lighter hover:border-green/20 hover:shadow-green-sm transition-all duration-300"
              >
                <span
                  className="font-display font-light text-cream leading-none shrink-0 select-none"
                  style={{ fontSize: '2.5rem', lineHeight: '1', letterSpacing: '-0.04em' }}
                  aria-hidden="true"
                >
                  {step}
                </span>
                <div>
                  <h3
                    className="font-display font-medium text-dark mb-2"
                    style={{ fontSize: '1.05rem', letterSpacing: '-0.018em', lineHeight: '1.2' }}
                  >
                    {title}
                  </h3>
                  <p className="font-body text-stone" style={{ fontSize: '0.8rem', lineHeight: '1.75' }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FounderSection />

      <CtaBanner />
    </>
  )
}
