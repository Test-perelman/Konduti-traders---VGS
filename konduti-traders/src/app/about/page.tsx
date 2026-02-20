import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Leaf, Target, Eye, Heart, MapPin, Truck, ShieldCheck, Users, ArrowRight
} from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Konduti Traders — India\'s B2B fresh produce procurement company. Our mission, values, sourcing network, cold chain infrastructure, and quality assurance process.',
  alternates: { canonical: '/about' },
}

const values = [
  {
    Icon: ShieldCheck,
    title: 'Integrity First',
    description: 'Transparent pricing, honest quality representation, and clear documentation. No surprises.',
  },
  {
    Icon: Target,
    title: 'Quality Over Volume',
    description: 'We never compromise on grade standards to fill volumes. If it does not meet spec, it does not ship.',
  },
  {
    Icon: Users,
    title: 'Partnership Mindset',
    description: 'We treat every buyer and every farmer as a long-term partner, not a transaction.',
  },
  {
    Icon: Leaf,
    title: 'Responsible Sourcing',
    description: 'We actively reduce waste, support small farmers through FPO partnerships, and promote sustainable practices.',
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
  {
    step: '01',
    title: 'Pre-Harvest Assessment',
    description: 'Our field teams visit farms 7–10 days before harvest to assess crop health, maturity stage, and expected quality.',
  },
  {
    step: '02',
    title: 'Harvest Coordination',
    description: 'We coordinate harvest timing to ensure produce is picked at optimal maturity for its end use.',
  },
  {
    step: '03',
    title: 'Farm-Level Grading',
    description: 'Immediate sorting by size, colour, and defects at the farm or nearby collection centre.',
  },
  {
    step: '04',
    title: 'Pre-Cooling',
    description: 'Field heat is removed within 2–4 hours of harvest using forced-air or water cooling systems.',
  },
  {
    step: '05',
    title: 'Pack House QC',
    description: 'Secondary grading, weight check, visual inspection, and FSSAI-compliant labelling.',
  },
  {
    step: '06',
    title: 'Cold Chain Dispatch',
    description: 'Temperature-controlled dispatch with IoT logging. Documentation accompanies every consignment.',
  },
]

const team = [
  { name: 'Vikram Konduti', role: 'Founder & Managing Director', bio: '18 years in fresh produce trade across India. Former APMC board member and FPO advisory committee lead.', initial: 'V' },
  { name: 'Preethi Shankar', role: 'Head of Quality Assurance', bio: 'Post-graduate in Food Technology from CFTRI Mysore. 12 years in produce QA for export and domestic markets.', initial: 'P' },
  { name: 'Arjun Mehta', role: 'Head of Logistics', bio: 'Supply chain specialist with experience building cold chain networks for two major Indian food companies.', initial: 'A' },
  { name: 'Divya Nair', role: 'Key Accounts Manager', bio: 'B2B relationship management specialist. Primary contact for supermarket and HoReCa accounts.', initial: 'D' },
]

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-20 bg-dark relative overflow-hidden" aria-labelledby="about-hero-heading">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(95,208,104,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green/5 blur-3xl" />
        </div>
        <Container>
          <div className="max-w-3xl relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-[0.2em] uppercase text-green mb-5">
              <span className="w-6 h-px bg-green" />
              About Konduti Traders
            </span>
            <h1
              id="about-hero-heading"
              className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl text-white leading-tight tracking-tight mb-6"
            >
              Rooted in Farms.
              <br />
              <span className="text-green">Trusted by Business.</span>
            </h1>
            <p className="font-body text-white/70 text-lg leading-relaxed max-w-2xl">
              We are India&apos;s B2B fresh produce procurement partner — connecting farms directly
              to the businesses that need consistent, quality, traceable supply.
            </p>
          </div>
        </Container>
      </section>

      {/* Company Overview */}
      <section className="py-20 lg:py-28 bg-white" aria-labelledby="overview-heading">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow="Our Story"
                heading="Built on 18 Years in the Trade"
                align="left"
              />
              <div className="space-y-4 font-body text-base text-gray-text leading-relaxed">
                <p>
                  Konduti Traders was founded with one conviction: that India&apos;s fresh produce
                  supply chain could be better. Better for farmers who deserved fair prices and
                  stable markets. Better for businesses who deserved consistent quality and
                  reliable supply. Better for consumers who deserved fresher food with less waste.
                </p>
                <p>
                  We started operations from Navi Mumbai&apos;s APMC market yard, with deep roots
                  in the Maharashtra onion and grape trade. Over the years, we have expanded our
                  sourcing network to 20+ growing regions across India, covering everything from
                  Himachal apples to Ooty broccoli, Kerala coconuts to Andhra tomatoes.
                </p>
                <p>
                  Today, we serve 100+ B2B buyers across the country — supermarket chains, hotel
                  groups, cloud kitchen networks, wholesale distributors, and food processing
                  units. Every consignment we dispatch carries our quality guarantee and our
                  commitment to be a dependable partner, not just a vendor.
                </p>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-80 lg:h-[480px]">
              <Image
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80&auto=format&fit=crop"
                alt="Farm fields — Konduti Traders sourcing regions"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" aria-hidden="true" />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-24 bg-mint" aria-labelledby="mission-heading">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                Icon: Target,
                eyebrow: 'Our Mission',
                heading: 'Reliable Fresh Produce for Every Indian Business',
                text: 'To make farm-direct fresh produce supply accessible, consistent, and transparent for every B2B buyer in India — from the 5-outlet kirana chain to the 200-property hotel group.',
                bg: 'bg-teal',
                light: true,
              },
              {
                Icon: Eye,
                eyebrow: 'Our Vision',
                heading: "India's Most Trusted Fresh Produce Supply Network",
                text: 'To build India\'s most reliable and transparent farm-to-business fresh produce network, reducing waste, fairly rewarding farmers, and setting the standard for quality in B2B produce supply.',
                bg: 'bg-white border border-gray-light',
                light: false,
              },
            ].map(({ Icon, eyebrow, heading, text, bg, light }) => (
              <div key={eyebrow} className={`p-10 rounded-3xl ${bg}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${light ? 'bg-white/15' : 'bg-green/10'}`}>
                  <Icon className={`w-5 h-5 ${light ? 'text-white' : 'text-green'}`} aria-hidden="true" />
                </div>
                <span className={`font-body text-xs font-semibold tracking-[0.15em] uppercase ${light ? 'text-green' : 'text-green'} mb-3 block`}>
                  {eyebrow}
                </span>
                <h2 id="mission-heading" className={`font-display font-semibold text-2xl md:text-3xl ${light ? 'text-white' : 'text-dark'} mb-4 leading-tight`}>
                  {heading}
                </h2>
                <p className={`font-body text-base ${light ? 'text-white/75' : 'text-gray-text'} leading-relaxed`}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-white" aria-labelledby="values-heading">
        <Container>
          <SectionHeader
            eyebrow="Our Values"
            heading="What We Stand For"
            subheading="The principles that guide every sourcing decision, every partnership, and every consignment we dispatch."
            id="values-heading"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title, description }) => (
              <div key={title} className="p-7 rounded-2xl bg-mint border border-gray-light hover:border-green/30 hover:shadow-green-sm transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-green/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-green" aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-lg text-dark mb-2">{title}</h3>
                <p className="font-body text-sm text-gray-text leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Sourcing Network */}
      <section className="py-20 lg:py-28 bg-teal" aria-labelledby="sourcing-heading">
        <Container>
          <SectionHeader
            eyebrow="Sourcing Network"
            heading="20+ Regions Across India"
            subheading="Our farm network spans India's most productive growing regions, giving us multi-source capability for every major produce category."
            light
            id="sourcing-heading"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sourcing.map(({ region, produce, districts }) => (
              <div key={region} className="p-6 rounded-2xl bg-white/8 border border-white/15 hover:bg-white/12 transition-colors">
                <div className="flex items-center gap-2.5 mb-3">
                  <MapPin className="w-4 h-4 text-green shrink-0" aria-hidden="true" />
                  <h3 className="font-display font-semibold text-lg text-white">{region}</h3>
                </div>
                <p className="font-body text-sm text-white/85 mb-2 font-medium">{produce}</p>
                <p className="font-body text-xs text-white/50">{districts}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 lg:py-28 bg-white" aria-labelledby="qa-heading">
        <Container>
          <SectionHeader
            eyebrow="Quality Assurance"
            heading="Quality at Every Step"
            subheading="Our 6-stage quality process ensures every consignment meets your specification — from field to dock."
            id="qa-heading"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualitySteps.map(({ step, title, description }) => (
              <div key={step} className="flex gap-5 p-6 rounded-2xl bg-mint border border-gray-light hover:border-green/30 hover:shadow-green-sm transition-all duration-300">
                <div className="shrink-0">
                  <span className="font-display font-semibold text-4xl text-cream leading-none select-none" aria-hidden="true">
                    {step}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-dark mb-2">{title}</h3>
                  <p className="font-body text-sm text-gray-text leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="py-20 lg:py-28 bg-mint" aria-labelledby="team-heading">
        <Container>
          <SectionHeader
            eyebrow="Our Team"
            heading="The People Behind the Supply"
            subheading="Experienced professionals with deep roots in Indian agriculture, food technology, and logistics."
            id="team-heading"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, bio, initial }) => (
              <div key={name} className="bg-white rounded-2xl p-7 border border-gray-light shadow-green-sm hover:shadow-green-md card-hover">
                <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center mb-5">
                  <span className="font-display font-semibold text-2xl text-teal">{initial}</span>
                </div>
                <h3 className="font-display font-semibold text-xl text-dark mb-1">{name}</h3>
                <p className="font-body text-xs font-semibold text-green uppercase tracking-wide mb-3">{role}</p>
                <p className="font-body text-sm text-gray-text leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  )
}
