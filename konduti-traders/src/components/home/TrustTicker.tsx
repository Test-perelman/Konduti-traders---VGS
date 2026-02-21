'use client'

const items = [
  'Direct Farm Sourcing',
  '500+ Farm Partners',
  'Quality Graded Produce',
  'Cold Chain Compliant',
  'APMC Certified',
  'Pan-India Delivery',
  '48-Hour Window',
  '20+ Sourcing Regions',
  'GST Registered',
  'No Intermediaries',
]

// Doubled for seamless loop
const tickerItems = [...items, ...items]

export default function TrustTicker() {
  return (
    <section
      className="py-5 bg-teal-dark border-y border-white/5 overflow-hidden"
      aria-label="Trust indicators"
    >
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {tickerItems.map((text, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 px-7 font-body text-[0.72rem] font-semibold tracking-[0.15em] uppercase text-white/45"
            >
              {text}
              <span className="text-green/40 text-[0.5rem]" aria-hidden="true">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
