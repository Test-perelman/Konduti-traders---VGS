'use client'

import { Leaf, Award, Thermometer, Shield, Truck, Clock } from 'lucide-react'

const trustItems = [
    { icon: Leaf, text: 'Direct Farm Sourcing' },
    { icon: Award, text: 'Quality Graded Produce' },
    { icon: Thermometer, text: 'Cold Chain Compliant' },
    { icon: Shield, text: 'APMC Certified' },
    { icon: Truck, text: 'Pan-India Delivery' },
    { icon: Clock, text: '48-Hour Delivery Window' },
    { icon: Leaf, text: 'Direct Farm Sourcing' },
    { icon: Award, text: 'Quality Graded Produce' },
    { icon: Thermometer, text: 'Cold Chain Compliant' },
    { icon: Shield, text: 'APMC Certified' },
    { icon: Truck, text: 'Pan-India Delivery' },
    { icon: Clock, text: '48-Hour Delivery Window' },
]

export default function TrustTicker() {
    return (
        <section className="py-7 bg-dark border-y border-green/10 overflow-hidden" aria-label="Trust indicators">
            <div className="ticker-wrap">
                <div className="ticker-inner">
                    {trustItems.map(({ icon: Icon, text }, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-3 px-10 font-body text-base font-semibold text-white/70 tracking-wide"
                        >
                            <Icon className="w-5 h-5 text-green/70 shrink-0" aria-hidden="true" />
                            {text}
                            <span className="text-green/30 mx-6" aria-hidden="true">✦</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
