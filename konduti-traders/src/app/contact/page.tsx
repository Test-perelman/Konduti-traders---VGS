import type { Metadata } from 'next'
import InquiryForm from '@/components/contact/InquiryForm'
import ContactInfo from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact & Bulk Enquiries',
  description:
    'Contact Konduti Traders for B2B fresh produce procurement. Submit a bulk enquiry, request a quote, or call our procurement team directly.',
  alternates: { canonical: '/contact' },
}

const stats = [
  { value: '4hr', label: 'Response Time' },
  { value: '100+', label: 'B2B Clients Served' },
  { value: '20+', label: 'Sourcing Regions' },
  { value: '48hr', label: 'Dispatch Turnaround' },
]

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="pt-32 pb-20 bg-dark relative overflow-hidden grain-overlay"
        aria-labelledby="contact-hero-heading"
      >
        <div className="absolute inset-0 bg-fine-grid pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-green/6 blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-2xl">
            <span className="eyebrow-light block mb-6">Contact Us</span>
            <h1
              id="contact-hero-heading"
              className="font-display font-light text-white mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: '0.97', letterSpacing: '-0.04em' }}
            >
              Let&apos;s build
              <br />
              <span style={{ color: 'rgba(111,204,138,0.85)' }}>your supply.</span>
            </h1>
            <p className="font-body text-white/45 max-w-xl" style={{ fontSize: '0.92rem', lineHeight: '1.8' }}>
              Share your procurement requirement and we will respond within 4 business hours
              with a tailored quote and supply plan.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-white border-b border-stone-lighter" aria-label="Key metrics">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-lighter">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <span
                  className="font-display font-medium text-teal block mb-1"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
                >
                  {value}
                </span>
                <span className="eyebrow text-stone">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Contact ── */}
      <section className="py-16 lg:py-24 bg-off-white" aria-label="Contact information and inquiry form">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left — Info */}
            <div>
              <span className="eyebrow text-green block mb-5">Reach Our Team</span>
              <h2
                className="font-display font-light text-dark mb-5"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: '1.1', letterSpacing: '-0.03em' }}
              >
                Talk to our
                <br />
                procurement team.
              </h2>
              <p className="font-body text-stone mb-10" style={{ fontSize: '0.88rem', lineHeight: '1.85' }}>
                Whether you&apos;re a supermarket chain looking for a long-term supply partner or
                a new cloud kitchen exploring your first bulk purchase — we welcome the conversation.
              </p>

              <ContactInfo />

              {/* Map */}
              <div className="mt-8 rounded-2xl overflow-hidden h-52 bg-gray-light border border-stone-lighter relative">
                <iframe
                  src="https://maps.google.com/maps?q=APMC+Market+Yard+Vashi+Navi+Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Konduti Traders office location"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Map showing office location at APMC Market Yard, Vashi, Navi Mumbai"
                />
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-stone-lighter shadow-premium-md">
              <div className="mb-8">
                <span className="eyebrow text-green block mb-3">Bulk Enquiry</span>
                <h2
                  className="font-display font-light text-dark"
                  style={{ fontSize: '1.9rem', letterSpacing: '-0.025em', lineHeight: '1.1' }}
                >
                  Submit a requirement.
                </h2>
                <p className="font-body text-stone mt-2" style={{ fontSize: '0.8rem' }}>
                  Fields marked <span aria-hidden="true">*</span> are required. We respond within 4 hours.
                </p>
              </div>
              <InquiryForm />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
