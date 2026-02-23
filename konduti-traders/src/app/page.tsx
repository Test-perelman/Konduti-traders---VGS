import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import TrustTicker from '@/components/home/TrustTicker'
import AboutSnippet from '@/components/home/AboutSnippet'
import ProductCategories from '@/components/home/ProductCategories'
import FeaturedCarousel from '@/components/home/FeaturedCarousel'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import HowItWorksSnippet from '@/components/home/HowItWorksSnippet'
import WhoWeServe from '@/components/home/WhoWeServe'
import Testimonials from '@/components/home/Testimonials'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata: Metadata = {
  title: 'Konduti Traders — B2B Fresh Produce Procurement India',
  description:
    "India's trusted B2B partner for fresh fruits and vegetables. Direct farm sourcing, quality grading, cold chain logistics, and pan-India supply to supermarkets, HoReCa, wholesalers, and food processors.",
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustTicker />
      <AboutSnippet />
      <ProductCategories />
      <FeaturedCarousel />
      <WhyChooseUs />
      <HowItWorksSnippet />
      <WhoWeServe />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
