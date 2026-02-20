import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import InquiryForm from '@/components/contact/InquiryForm'
import ContactInfo from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact & Bulk Enquiries',
  description:
    'Contact Konduti Traders for B2B fresh produce procurement. Submit a bulk enquiry, request a quote, or call our procurement team directly.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-dark relative overflow-hidden" aria-labelledby="contact-hero-heading">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(95,208,104,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }} aria-hidden="true" />
        <Container>
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-[0.2em] uppercase text-green mb-5">
              <span className="w-6 h-px bg-green" />
              Contact Us
            </span>
            <h1 id="contact-hero-heading" className="font-display font-semibold text-5xl md:text-6xl text-white leading-tight tracking-tight mb-5">
              Let&apos;s Build
              <br />
              <span className="text-green">Your Supply</span>
            </h1>
            <p className="font-body text-white/70 text-lg leading-relaxed">
              Share your procurement requirement and we will respond within 4 business hours
              with a tailored quote and supply plan.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Contact information and inquiry form">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Info */}
            <div>
              <h2 className="font-display font-semibold text-2xl text-dark mb-3">
                Reach Our Procurement Team
              </h2>
              <p className="font-body text-base text-gray-text leading-relaxed mb-8">
                Whether you&apos;re a supermarket chain looking for a long-term supply partner or a
                new cloud kitchen exploring your first bulk purchase, we welcome the conversation.
              </p>

              <ContactInfo />

              {/* Map embed placeholder */}
              <div className="mt-8 rounded-2xl overflow-hidden h-56 bg-gray-light relative">
                <iframe
                  src="https://maps.google.com/maps?q=APMC+Market+Yard+Vashi+Navi+Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Konduti Traders office location — APMC Market Yard, Vashi"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Map showing office location at APMC Market Yard, Vashi, Navi Mumbai"
                />
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-mint rounded-3xl p-8 md:p-10 border border-gray-light">
              <div className="mb-7">
                <h2 className="font-display font-semibold text-2xl text-dark mb-1.5">
                  Submit a Bulk Enquiry
                </h2>
                <p className="font-body text-sm text-gray-text">
                  Fields marked <span aria-hidden="true">*</span> are required.
                </p>
              </div>
              <InquiryForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust bar */}
      <section className="py-12 bg-mint border-t border-gray-light" aria-label="Trust indicators">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '4hr', label: 'Response Time' },
              { value: '100+', label: 'B2B Clients Served' },
              { value: '20+', label: 'Sourcing Regions' },
              { value: '48hr', label: 'Dispatch Turnaround' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="stat-number text-4xl text-teal">{value}</span>
                <span className="font-body text-xs font-medium uppercase tracking-widest text-gray-text">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
