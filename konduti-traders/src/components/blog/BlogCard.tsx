import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { IBlogPost } from '@/types'

interface BlogCardProps {
  post: IBlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`group bg-white rounded-2xl overflow-hidden border border-gray-light shadow-green-sm hover:shadow-green-md card-hover flex flex-col ${
        featured ? 'md:flex-row' : ''
      }`}
      aria-label={post.title}
    >
      {/* Image */}
      <div className={`relative overflow-hidden shrink-0 ${featured ? 'h-56 md:h-auto md:w-80' : 'h-48'}`}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={featured ? '(max-width: 768px) 100vw, 320px' : '(max-width: 640px) 100vw, 50vw'}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category badge */}
        <Badge variant="teal" className="mb-3 self-start">
          {post.category}
        </Badge>

        <Link href={`/blog/${post.slug}`} className="group/link">
          <h2 className={`font-display font-semibold text-dark leading-tight mb-3 group-hover/link:text-teal transition-colors ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}>
            {post.title}
          </h2>
        </Link>

        <p className="font-body text-sm text-gray-text leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between border-t border-gray-light pt-4">
          <div className="flex items-center gap-3 text-xs font-body text-gray-text">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} aria-hidden="true" />
              {formatDate(post.date)}
            </span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-body font-semibold text-teal hover:text-green transition-colors group/read"
            aria-label={`Read ${post.title}`}
          >
            Read
            <ArrowRight size={12} className="transition-transform group-hover/read:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
