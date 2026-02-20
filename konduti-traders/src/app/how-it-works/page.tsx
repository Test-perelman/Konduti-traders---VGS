import type { Metadata } from 'next'
import { ClipboardList, Quote, CheckCircle2, Package, Truck, BarChart3 } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Learn how Konduti Traders\' procurement process works — from requirement collection and vendor matching to quality grading, cold storage, logistics, and delivery.',
  alternates: { canonical: '/how-it-works' },
}

const steps = [
  {
    Icon: ClipboardList,
    number: '01',
    title: 'Requirement Collection',
    shortDesc: 'Tell us what you need',
    details: [
      'Submit your requirement via our inquiry form, email, or phone',
      'Specify: product categories, grade/spec, weekly or monthly volume, delivery city, frequency',
      'Include any special requirements: pre-cut formats, packaging specs, labelling needs',
      'Provide your business details and GST number for documentation setup',
    ],
    timeline: 'Same day acknowledgement',
    outcome: 'Detailed requirement sheet created and shared for your confirmation',
  },
  {
    Icon: BarChart3,
    number: '02',
    title: 'Vendor & Source Matching',
    shortDesc: 'We identify the right farms',
    details: [
      'Our sourcing team matches your requirement to active farms in the appropriate growing region',
      'We consider current crop health, harvest schedule, and quality expectations',
      'Multi-region sourcing planned for supply security during peak demand',
      'FPO partnerships activated for large volume requirements',
    ],
    timeline: '2–4 business hours',
    outcome: 'Source map with farm locations and indicative quality assessment',
  },
  {
    Icon: Quote,
    number: '03',
    title: 'Quote & Confirmation',
    shortDesc: 'Transparent pricing, no surprises',
    details: [
      'Receive itemised quote with product specification, unit price, and volume commitment',
      'Price formula clearly stated: fixed, market-linked with cap, or floating',
      'Review and confirm via portal, email, or signed purchase order',
      'Payment terms agreed: advance, credit, or LC for large volume',
    ],
    timeline: '4–8 business hours from requirement receipt',
    outcome: 'Confirmed purchase order with all terms documented',
  },
  {
    Icon: CheckCircle2,
    number: '04',
    title: 'Quality Grading',
    shortDesc: 'On-ground QC at source',
    details: [
      'Harvest is coordinated at optimal maturity stage',
      'Field-level sorting removes clearly defective produce',
      'Pack house grading: size, colour, firmness, defect % check',
      'Random sample testing for pesticide residues on premium lots',
      'Quality certificate prepared with batch code and farm reference',
    ],
    timeline: 'During harvest and pack house operations',
    outcome: 'Quality certified batch ready for dispatch, with batch documentation',
  },
  {
    Icon: Package,
    number: '05',
    title: 'Cold Storage & Dispatch',
    shortDesc: 'Temperature-controlled from source',
    details: [
      'Pre-cooling applied within 2–4 hours of harvest for temperature-sensitive categories',
      'Cold room storage at spec-appropriate temperature (2°C–15°C by category)',
      'Packaging per your specification: loose, netted, carton, or retail packs',
      'IoT temperature loggers placed in each consignment for in-transit monitoring',
      'Dispatch temperature certificate issued with shipment',
    ],
    timeline: 'Within 24–48 hours of harvest',
    outcome: 'Consignment dispatched with temperature log, quality cert, and challan',
  },
  {
    Icon: Truck,
    number: '06',
    title: 'Logistics & Delivery',
    shortDesc: 'Tracked, on-time, documented',
    details: [
      'Own fleet for key corridors; third-party reefer partners for national reach',
      'Real-time dispatch tracking shared via WhatsApp or portal',
      'Delivery to your specified receiving dock or warehouse',
      'Unloading inspection support on request for large orders',
      'Digital invoice, E-way bill, and delivery receipt on completion',
    ],
    timeline: '24–72 hours transit depending on distance',
    outcome: 'Delivery confirmation, digital documentation, and invoice for payment',
  },
]

const faqs = [
  {
    q: 'What is the minimum order quantity?',
    a: 'Minimum orders vary by category. Most vegetables start at 200–500 kg; fruits at 100–200 kg; exotic and leafy from 30–50 kg. For long-term supply agreements, we can discuss custom minimums.',
  },
  {
    q: 'How quickly can you deliver after order confirmation?',
    a: 'For in-season products with farm inventory, dispatch is within 24–48 hours. For bespoke or out-of-season requests, we provide a realistic timeline upfront — typically 3–7 days.',
  },
  {
    q: 'What happens if quality on arrival doesn\'t match the specification?',
    a: 'We have a quality dispute process: notify us within 4 hours of receiving with photographic evidence. We will review and arrange replacement or credit as per our quality guarantee terms.',
  },
  {
    q: 'Do you offer forward contracts for seasonal produce?',
    a: 'Yes. For major seasonal categories (mangoes, apples, onions, pomegranates), we offer advance booking at fixed or capped pricing. Contact us 4–6 weeks before the season.',
  },
  {
    q: 'Can you supply to multiple locations across a city?',
    a: 'Yes. We regularly supply supermarket chains and cloud kitchen networks with multi-location delivery in the same city or metro region under a single purchase order and invoice.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-dark relative overflow-hidden" aria-labelledby="hiw-hero-heading">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(95,208,104,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }} aria-hidden="true" />
        <Container>
          <div className="max-w-3xl relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-[0.2em] uppercase text-green mb-5">
              <span className="w-6 h-px bg-green" />
              Our Process
            </span>
            <h1 id="hiw-hero-heading" className="font-display font-semibold text-5xl md:text-6xl text-white leading-tight tracking-tight mb-6">
              Simple Procurement.
              <br />
              <span className="text-green">Serious Standards.</span>
            </h1>
            <p className="font-body text-white/70 text-lg leading-relaxed max-w-2xl">
              A clear, 6-step process from requirement to delivery. No ambiguity at any stage.
              Every step documented and communicated.
            </p>
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section className="py-20 lg:py-28 bg-white" aria-label="Procurement process steps">
        <Container size="lg">
          <div className="space-y-8">
            {steps.map(({ Icon, number, title, shortDesc, details, timeline, outcome }, index) => (
              <div
                key={number}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-start p-8 md:p-10 rounded-3xl ${
                  index % 2 === 0 ? 'bg-mint' : 'bg-white border border-gray-light'
                }`}
              >
                {/* Left: Step indicator */}
                <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-2 shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-teal" aria-hidden="true" />
                  </div>
                  <span className="font-display font-light text-5xl text-green/20 leading-none select-none hidden lg:block" aria-hidden="true">
                    {number}
                  </span>
                </div>

                {/* Right: Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-green">
                      Step {number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" aria-hidden="true" />
                    <span className="font-body text-xs text-gray-text">{shortDesc}</span>
                  </div>
                  <h2 className="font-display font-semibold text-2xl md:text-3xl text-dark mb-5 leading-tight">
                    {title}
                  </h2>
                  <ul className="space-y-2 mb-6">
                    {details.map(detail => (
                      <li key={detail} className="flex items-start gap-2.5 font-body text-sm text-gray-text">
                        <span className="w-1.5 h-1.5 rounded-full bg-green mt-2 shrink-0" aria-hidden="true" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal/8 border border-teal/15">
                      <span className="font-body text-xs font-semibold text-teal">Timeline:</span>
                      <span className="font-body text-xs text-gray-text">{timeline}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green/8 border border-green/15">
                      <span className="font-body text-xs font-semibold text-green">Output:</span>
                      <span className="font-body text-xs text-gray-text">{outcome}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-28 bg-mint" aria-labelledby="faq-heading">
        <Container size="md">
          <SectionHeader
            eyebrow="FAQ"
            heading="Common Questions"
            subheading="Answers to the questions our buyers ask most often."
            id="faq-heading"
          />
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-white rounded-2xl border border-gray-light overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none">
                  <span className="font-display font-semibold text-lg text-dark pr-4">{q}</span>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full bg-green/10 flex items-center justify-center text-green font-bold text-lg transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="font-body text-sm text-gray-text leading-relaxed">{a}</p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  )
}
