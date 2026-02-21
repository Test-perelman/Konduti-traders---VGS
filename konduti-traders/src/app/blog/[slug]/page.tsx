import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import BlogCard from '@/components/blog/BlogCard'
import CtaBanner from '@/components/home/CtaBanner'
import { blogPosts } from '@/data/blog-posts'
import { formatDate } from '@/lib/utils'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) notFound()

  const related = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      {/* ── Article Hero ── */}
      <section className="pt-32 pb-0 bg-dark relative overflow-hidden grain-overlay" aria-labelledby="blog-post-heading">
        <div className="absolute inset-0 bg-fine-grid pointer-events-none" aria-hidden="true" />
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center pb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-body text-white/40 hover:text-white/80 transition-colors mb-8 group"
              style={{ fontSize: '0.75rem', letterSpacing: '0.04em' }}
            >
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="group-hover:-translate-x-0.5 transition-transform"
                aria-hidden="true"
              >
                <path d="M9 2.5L4 7l5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              All Articles
            </Link>

            <span className="eyebrow-light block mb-5">{post.category}</span>

            <h1
              id="blog-post-heading"
              className="font-display font-light text-white mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', lineHeight: '1.05', letterSpacing: '-0.035em' }}
            >
              {post.title}
            </h1>

            <p className="font-body text-white/50 max-w-2xl mx-auto mb-8" style={{ fontSize: '0.92rem', lineHeight: '1.8' }}>
              {post.excerpt}
            </p>

            <div className="flex items-center justify-center gap-4 font-body text-white/35" style={{ fontSize: '0.75rem', letterSpacing: '0.04em' }}>
              <span className="text-white/55">{post.author}</span>
              <span aria-hidden="true">·</span>
              <span>{formatDate(post.date)}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hero Image ── */}
      <div className="relative h-72 md:h-[480px] bg-dark">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover opacity-75"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-transparent to-white" aria-hidden="true" />
      </div>

      {/* ── Article Content ── */}
      <article className="py-12 lg:py-20 bg-white" itemScope itemType="https://schema.org/Article">
        <meta itemProp="author" content={post.author} />
        <meta itemProp="datePublished" content={post.date} />
        <div className="max-w-[720px] mx-auto px-6">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-stone-lighter">
              <div className="flex items-center flex-wrap gap-2">
                <span className="eyebrow text-stone mr-1">Tags</span>
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-off-white border border-stone-lighter font-body text-stone"
                    style={{ fontSize: '0.72rem', letterSpacing: '0.02em' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author card */}
          <div className="mt-10 p-6 rounded-2xl bg-off-white border border-stone-lighter">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white font-display font-medium"
                style={{ background: 'linear-gradient(135deg, #2c5f4a, #3d8b5e)', fontSize: '1.2rem' }}
                aria-hidden="true"
              >
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-display font-medium text-dark" style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>
                  {post.author}
                </p>
                <p className="eyebrow text-stone mt-0.5">{post.authorRole}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ── Related Posts ── */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-off-white border-t border-stone-lighter" aria-labelledby="related-heading">
          <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
            <div className="mb-10">
              <span className="eyebrow text-green block mb-3">Continue Reading</span>
              <h2
                id="related-heading"
                className="font-display font-light text-dark"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: '1.1' }}
              >
                More insights.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(p => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  )
}
