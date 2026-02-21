import type { Metadata } from 'next'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    "Learn how Konduti Traders' procurement process works — from requirement collection to delivery. Simple, transparent, documented.",
  alternates: { canonical: '/how-it-works' },
}

const steps = [
  {
    number: '01',
    title: 'Requirement Collection',
    shortDesc: 'Tell us what you need',
    details: [
      'Submit via inquiry form, email, or phone',
      'Specify: category, volume, grade, delivery city, frequency',
      'Include packaging specs and labelling requirements',
      'Provide GST number for documentation setup',
    ],
    timeline: 'Same day acknowledgement',
    outcome: 'Detailed requirement sheet confirmed',
  },
  {
    number: '02',
    title: 'Vendor & Source Matching',
    shortDesc: 'We identify the right farms',
    details: [
      'Sourcing team matches requirement to active farms in the right growing region',
      'We assess crop health, harvest schedule, and quality expectations',
      'Multi-region sourcing planned for supply security',
      'FPO partnerships activated for large volume requirements',
    ],
    timeline: '2–4 business hours',
    outcome: 'Source map with farm locations and quality assessment',
  },
  {
    number: '03',
    title: 'Quote & Confirmation',
    shortDesc: 'Transparent pricing, no surprises',
    details: [
      'Itemised quote with product spec, unit price, and volume commitment',
      'Price formula clearly stated: fixed, market-linked, or floating',
      'Confirm via portal, email, or signed purchase order',
      'Payment terms agreed: advance, credit, or LC for large volume',
    ],
    timeline: '4–8 business hours from requirement',
    outcome: 'Confirmed purchase order with all terms documented',
  },
  {
    number: '04',
    title: 'Quality Grading',
    shortDesc: 'On-ground QC at source',
    details: [
      'Harvest coordinated at optimal maturity stage',
      'Field-level sorting removes defective produce immediately',
      'Pack house grading: size, colour, firmness, defect percentage',
      'Quality certificate prepared with batch code and farm reference',
    ],
    timeline: 'During harvest and pack house operations',
    outcome: 'Quality-certified batch ready for dispatch',
  },
  {
    number: '05',
    title: 'Cold Storage & Dispatch',
    shortDesc: 'Temperature-controlled from source',
    details: [
      'Pre-cooling within 2–4 hours of harvest for temperature-sensitive categories',
      'Cold room storage at spec-appropriate temperature (2°C–15°C)',
      'Packaging per your specification: loose, netted, carton, or retail packs',
      'IoT temperature loggers in each consignment for in-transit monitoring',
    ],
    timeline: 'Within 24–48 hours of harvest',
    outcome: 'Consignment dispatched with temperature log and quality cert',
  },
  {
    number: '06',
    title: 'Logistics & Delivery',
    shortDesc: 'Tracked, on-time, documented',
    details: [
      'Own fleet for key corridors; reefer partners for national reach',
      'Real-time tracking via WhatsApp or portal',
      'Delivery to your specified dock or warehouse',
      'Digital invoice, E-way bill, and delivery receipt on completion',
    ],
    timeline: '24–72 hours transit depending on distance',
    outcome: 'Confirmed delivery with full digital documentation',
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
    q: "What happens if quality on arrival doesn't match specification?",
    a: 'Notify us within 4 hours of receiving with photographic evidence. We will review and arrange replacement or credit as per our quality guarantee terms.',
  },
  {
    q: 'Do you offer forward contracts for seasonal produce?',
    a: 'Yes. For major seasonal categories — mangoes, apples, onions, pomegranates — we offer advance booking at fixed or capped pricing. Contact us 4–6 weeks before the season.',
  },
  {
    q: 'Can you supply to multiple locations across a city?',
    a: 'Yes. We regularly supply supermarket chains and cloud kitchen networks with multi-location delivery in the same city or metro region under a single purchase order.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="pt-32 pb-20 bg-dark relative overflow-hidden grain-overlay"
        aria-labelledby="hiw-hero-heading"
      >
        <div className="absolute inset-0 bg-fine-grid pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[300px] bg-green/6 blur-[100px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="eyebrow-light block mb-6">Our Process</span>
            <h1
              id="hiw-hero-heading"
              className="font-display font-light text-white mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: '0.97', letterSpacing: '-0.04em' }}
            >
              Simple procurement.
              <br />
              <span style={{ color: 'rgba(111,204,138,0.85)' }}>Serious standards.</span>
            </h1>
            <p className="font-body text-white/45 max-w-xl" style={{ fontSize: '0.92rem', lineHeight: '1.8' }}>
              A clear, 6-step process from requirement to delivery.
              No ambiguity at any stage. Every step documented and communicated.
            </p>
          </div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="py-20 lg:py-28 bg-off-white" aria-label="Procurement process steps">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="space-y-5">
            {steps.map(({ number, title, shortDesc, details, timeline, outcome }, i) => (
              <div
                key={number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-8 md:p-10 rounded-2xl ${
                  i % 2 === 0 ? 'bg-white border border-stone-lighter' : 'bg-mint'
                }`}
              >
                {/* Step number + meta */}
                <div className="lg:col-span-3 flex lg:flex-col gap-4 lg:gap-3 items-center lg:items-start">
                  <span
                    className="font-display font-light leading-none select-none text-cream"
                    style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.05em', lineHeight: 1 }}
                    aria-hidden="true"
                  >
                    {number}
                  </span>
                  <div>
                    <p className="eyebrow text-green">Step {number}</p>
                    <p className="font-body text-stone mt-1" style={{ fontSize: '0.75rem' }}>{shortDesc}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-9">
                  <h2
                    className="font-display font-medium text-dark mb-5"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', letterSpacing: '-0.025em', lineHeight: '1.15' }}
                  >
                    {title}
                  </h2>
                  <ul className="space-y-2 mb-7">
                    {details.map(d => (
                      <li key={d} className="flex items-start gap-2.5 font-body text-gray-text" style={{ fontSize: '0.85rem', lineHeight: '1.7' }}>
                        <span className="w-1 h-1 rounded-full bg-green mt-2.5 shrink-0" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal/6 border border-teal/12">
                      <span className="eyebrow text-teal">Timeline</span>
                      <span className="font-body text-stone" style={{ fontSize: '0.75rem' }}>{timeline}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green/6 border border-green/12">
                      <span className="eyebrow text-green">Output</span>
                      <span className="font-body text-stone" style={{ fontSize: '0.75rem' }}>{outcome}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-20 lg:py-28 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <span className="eyebrow text-green block mb-4">FAQ</span>
            <h2
              id="faq-heading"
              className="font-display font-light text-dark"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}
            >
              Common questions.
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-white rounded-xl border border-stone-lighter hover:border-green/20 overflow-hidden transition-colors"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none gap-4">
                  <span
                    className="font-display font-medium text-dark pr-4"
                    style={{ fontSize: '1.05rem', letterSpacing: '-0.018em', lineHeight: '1.3' }}
                  >
                    {q}
                  </span>
                  <span
                    className="shrink-0 w-7 h-7 rounded-full bg-green/8 flex items-center justify-center text-green font-bold text-lg transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="font-body text-stone" style={{ fontSize: '0.85rem', lineHeight: '1.8' }}>{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
