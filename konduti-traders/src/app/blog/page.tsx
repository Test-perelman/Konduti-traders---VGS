import type { Metadata } from 'next'
import BlogCard from '@/components/blog/BlogCard'
import CtaBanner from '@/components/home/CtaBanner'
import { blogPosts } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'Fresh Produce Insights — Blog',
  description:
    "Procurement strategies, cold chain logistics, seasonal buying trends, and quality grading insights from Konduti Traders — India's B2B fresh produce experts.",
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="pt-32 pb-20 bg-dark relative overflow-hidden grain-overlay"
        aria-labelledby="blog-hero-heading"
      >
        <div className="absolute inset-0 bg-fine-grid pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-teal/8 blur-[100px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-2xl">
            <span className="eyebrow-light block mb-6">Insights & Resources</span>
            <h1
              id="blog-hero-heading"
              className="font-display font-light text-white mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: '0.97', letterSpacing: '-0.04em' }}
            >
              Fresh produce
              <br />
              <span style={{ color: 'rgba(111,204,138,0.85)' }}>intelligence.</span>
            </h1>
            <p className="font-body text-white/45 max-w-lg" style={{ fontSize: '0.92rem', lineHeight: '1.8' }}>
              Procurement strategies, market insights, cold chain guides, and seasonal
              intelligence for India&apos;s B2B food industry.
            </p>
          </div>
        </div>
      </section>

      {/* ── Blog Grid ── */}
      <section className="py-16 lg:py-24 bg-off-white" aria-label="Blog posts">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12">

          {/* Featured post */}
          {featured && (
            <div className="mb-14">
              <span className="eyebrow text-green block mb-6">Featured Article</span>
              <BlogCard post={featured} featured />
            </div>
          )}

          {/* Divider */}
          <div className="rule mb-14" aria-hidden="true" />

          {/* Article grid */}
          <div className="mb-6">
            <span className="eyebrow text-green block mb-8">All Articles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
