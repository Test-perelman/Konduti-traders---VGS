import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import BlogCard from '@/components/blog/BlogCard'
import CtaBanner from '@/components/home/CtaBanner'
import { blogPosts } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'Fresh Produce Insights — Blog',
  description:
    'Procurement strategies, cold chain logistics, seasonal buying trends, and quality grading insights from Konduti Traders — India\'s B2B fresh produce experts.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-dark relative overflow-hidden" aria-labelledby="blog-hero-heading">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(95,208,104,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }} aria-hidden="true" />
        <Container>
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-[0.2em] uppercase text-green mb-5">
              <span className="w-6 h-px bg-green" />
              Insights & Resources
            </span>
            <h1 id="blog-hero-heading" className="font-display font-semibold text-5xl md:text-6xl text-white leading-tight tracking-tight mb-5">
              Fresh Produce
              <br />
              <span className="text-green">Intelligence</span>
            </h1>
            <p className="font-body text-white/65 text-lg leading-relaxed">
              Procurement strategies, market insights, cold chain guides, and seasonal
              intelligence for India&apos;s B2B food industry.
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:py-24 bg-mint" aria-label="Blog posts">
        <Container>
          {/* Featured post */}
          {featured && (
            <div className="mb-10">
              <p className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-green mb-5">
                Featured Article
              </p>
              <BlogCard post={featured} featured />
            </div>
          )}

          <div className="botanical-divider my-10" aria-hidden="true" />

          {/* Grid of remaining posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  )
}
