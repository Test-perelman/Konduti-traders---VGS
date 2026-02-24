const contactDetails = [
  {
    label: 'Registered Office',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.485-2.015-4.5-4.5-4.5zM8 8a2 2 0 110-4 2 2 0 010 4z" fill="currentColor"/>
      </svg>
    ),
    content: (
      <address className="not-italic font-body text-stone leading-relaxed" style={{ fontSize: '0.82rem' }}>
        4-138, Girnibavi, Narsampet,<br />
        Warangal, Telangana — 506002<br />
        India
      </address>
    ),
  },
  {
    label: 'Phone',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M14 10.667c-1.2 0-2.4-.2-3.467-.533a1 1 0 00-1 .233l-1.533 1.533A10.733 10.733 0 014.1 7.999L5.633 6.466a1 1 0 00.233-1C5.6 4.4 5.4 3.2 5.4 2a1 1 0 00-1-1H2a1 1 0 00-1 1c0 7.18 5.82 13 13 13a1 1 0 001-1v-2.333a1 1 0 00-1-1z" fill="currentColor"/>
      </svg>
    ),
    content: (
      <a
        href="tel:+918341167172"
        className="font-body font-medium hover:text-green transition-colors"
        style={{ fontSize: '0.82rem', color: '#2c5f4a' }}
      >
        +91 83411 67172
      </a>
    ),
  },
  {
    label: 'Email',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zm-1 2.5l-5 3.5-5-3.5V4l5 3.5L13 4v.5z" fill="currentColor"/>
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-1">
        <a
          href="mailto:kondutitraders93@gmail.com"
          className="font-body font-medium hover:text-green transition-colors"
          style={{ fontSize: '0.82rem', color: '#2c5f4a' }}
        >
          kondutitraders93@gmail.com
        </a>
      </div>
    ),
  },
  {
    label: 'Business Hours',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 4.5v4l2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    content: (
      <div className="font-body text-stone leading-relaxed" style={{ fontSize: '0.82rem' }}>
        <p>Monday – Saturday: 8:00 AM – 7:00 PM</p>
        <p>Sunday: 8:00 AM – 1:00 PM</p>
        <p className="text-green font-medium mt-1" style={{ fontSize: '0.75rem' }}>Emergency orders: 24/7</p>
      </div>
    ),
  },
  {
    label: 'GST / Registration',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M1.5 6h13" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 9.5h6M5 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    content: (
      <div className="font-body text-stone" style={{ fontSize: '0.82rem' }}>
        <p>GSTIN: 27XXXXX0000X1ZX</p>
        <p className="mt-1" style={{ fontSize: '0.75rem' }}>APMC License: MH-APM-2019-XXX</p>
      </div>
    ),
  },
]

export default function ContactInfo() {
  return (
    <div className="space-y-5">
      {contactDetails.map(({ label, icon, content }) => (
        <div key={label} className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-green/8 flex items-center justify-center shrink-0 text-green mt-0.5">
            {icon}
          </div>
          <div>
            <p className="eyebrow text-teal mb-1.5">{label}</p>
            {content}
          </div>
        </div>
      ))}
    </div>
  )
}
