import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react'

const contactDetails = [
  {
    Icon: MapPin,
    label: 'Registered Office',
    content: (
      <address className="not-italic font-body text-sm text-gray-text leading-relaxed">
        Plot 14, APMC Market Yard, Sector 19<br />
        Vashi, Navi Mumbai — 400 705<br />
        Maharashtra, India
      </address>
    ),
  },
  {
    Icon: Phone,
    label: 'Phone',
    content: (
      <a
        href="tel:+919876543210"
        className="font-body text-sm text-teal hover:text-green transition-colors font-medium"
      >
        +91 98765 43210
      </a>
    ),
  },
  {
    Icon: Mail,
    label: 'Email',
    content: (
      <div className="flex flex-col gap-1">
        <a
          href="mailto:procurement@kondutitraders.in"
          className="font-body text-sm text-teal hover:text-green transition-colors font-medium"
        >
          procurement@kondutitraders.in
        </a>
        <a
          href="mailto:info@kondutitraders.in"
          className="font-body text-sm text-teal hover:text-green transition-colors"
        >
          info@kondutitraders.in
        </a>
      </div>
    ),
  },
  {
    Icon: Clock,
    label: 'Business Hours',
    content: (
      <div className="font-body text-sm text-gray-text leading-relaxed">
        <p>Monday – Saturday: 8:00 AM – 7:00 PM</p>
        <p>Sunday: 8:00 AM – 1:00 PM</p>
        <p className="text-xs text-green mt-1 font-medium">Emergency orders: 24/7</p>
      </div>
    ),
  },
  {
    Icon: Building2,
    label: 'GST / Registration',
    content: (
      <div className="font-body text-sm text-gray-text">
        <p>GSTIN: 27XXXXX0000X1ZX</p>
        <p className="text-xs mt-1">APMC License: MH-APM-2019-XXX</p>
      </div>
    ),
  },
]

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {contactDetails.map(({ Icon, label, content }) => (
        <div key={label} className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-green" aria-hidden="true" />
          </div>
          <div>
            <p className="font-body text-xs font-semibold tracking-[0.12em] uppercase text-teal mb-1">
              {label}
            </p>
            {content}
          </div>
        </div>
      ))}
    </div>
  )
}
