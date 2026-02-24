import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import type { IBlogPost } from '@/types'

interface BlogCardProps {
  post: IBlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`group bg-white rounded-2xl overflow-hidden border border-stone-lighter shadow-premium-sm hover:shadow-premium-lg card-hover-subtle flex flex-col ${
        featured ? 'md:flex-row' : ''
      }`}
      aria-label={post.title}
    >
      {/* Image */}
      <div className={`relative overflow-hidden shrink-0 ${featured ? 'h-72 md:h-auto md:w-96' : 'h-56'}`}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-600 group-hover:scale-105"
          sizes={featured ? '(max-width: 768px) 100vw, 320px' : '(max-width: 640px) 100vw, 50vw'}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/25 to-transparent" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category */}
        <span className="eyebrow text-green block mb-3">{post.category}</span>

        <Link href={`/blog/${post.slug}`}>
          <h2
            className={`font-display font-medium text-dark leading-tight mb-3 group-hover:text-teal transition-colors ${
              featured ? '' : ''
            }`}
            style={{
              fontSize: featured ? 'clamp(1.5rem, 2.8vw, 2.15rem)' : '1.4rem',
              letterSpacing: '-0.025em',
              lineHeight: '1.18',
            }}
          >
            {post.title}
          </h2>
        </Link>

        <p className="font-body text-stone flex-1 line-clamp-3 mb-5" style={{ fontSize: '0.96rem', lineHeight: '1.8' }}>
          {post.excerpt}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-lighter">
          <div className="flex items-center gap-3 font-body text-stone" style={{ fontSize: '0.82rem', letterSpacing: '0.03em' }}>
            <span>{formatDate(post.date)}</span>
            <span className="text-stone-light" aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 font-body font-semibold text-green hover:text-teal transition-colors group/read"
            style={{ fontSize: '0.84rem', letterSpacing: '0.03em' }}
            aria-label={`Read ${post.title}`}
          >
            Read
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-hover/read:translate-x-0.5 transition-transform" aria-hidden="true">
              <path d="M2 5h6M5 2.5L7.5 5 5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
