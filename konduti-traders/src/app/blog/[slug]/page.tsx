import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
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
      {/* Article Hero */}
      <section className="pt-32 pb-0 bg-dark relative overflow-hidden" aria-labelledby="blog-post-heading">
        <Container size="lg">
          <div className="relative z-10 max-w-3xl mx-auto text-center pb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-body text-xs font-semibold text-white/50 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              All Articles
            </Link>
            <Badge variant="teal" className="mb-5">{post.category}</Badge>
            <h1
              id="blog-post-heading"
              className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-5"
            >
              {post.title}
            </h1>
            <p className="font-body text-white/65 text-lg leading-relaxed mb-7">{post.excerpt}</p>
            <div className="flex items-center justify-center gap-4 text-sm font-body text-white/50">
              <span>{post.author}</span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} aria-hidden="true" />
                {formatDate(post.date)}
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} aria-hidden="true" />
                {post.readTime}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Hero Image */}
      <div className="relative h-80 md:h-[500px] bg-dark">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover opacity-80"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-white" aria-hidden="true" />
      </div>

      {/* Article Content */}
      <article className="py-12 lg:py-16 bg-white" itemScope itemType="https://schema.org/Article">
        <meta itemProp="author" content={post.author} />
        <meta itemProp="datePublished" content={post.date} />
        <Container size="sm">
          <div
            className="blog-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-light">
              <div className="flex items-center flex-wrap gap-2">
                <Tag size={14} className="text-gray-text" aria-hidden="true" />
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-mint border border-gray-light font-body text-xs text-gray-text"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author card */}
          <div className="mt-10 p-6 rounded-2xl bg-mint border border-gray-light">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                <span className="font-display font-semibold text-xl text-teal">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-body font-semibold text-dark text-sm">{post.author}</p>
                <p className="font-body text-xs text-gray-text">{post.authorRole}</p>
              </div>
            </div>
          </div>
        </Container>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 bg-mint" aria-labelledby="related-heading">
          <Container>
            <h2 id="related-heading" className="font-display font-semibold text-3xl text-dark mb-8 text-center">
              More Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(p => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBanner />
    </>
  )
}
