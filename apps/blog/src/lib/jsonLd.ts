import type { Post } from '@/payload-types'
import { authorOf, categoryOf, coverOf } from './postView'
import { absoluteUrl, BLOG_NAME, SITE_NAME } from './site'

export function articleJsonLd(post: Post) {
  const author = authorOf(post)
  const cover = coverOf(post)
  const url = absoluteUrl(`/${post.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.meta?.title || post.title,
    description: post.meta?.description || post.excerpt,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    ...(categoryOf(post) ? { articleSection: categoryOf(post)?.name } : {}),
    ...(cover?.url ? { image: [absoluteUrl(cover.url)] } : {}),
    author: {
      '@type': 'Person',
      name: author?.name ?? SITE_NAME,
      ...(author?.url ? { url: author.url } : {}),
    },
    publisher: { '@type': 'Person', name: SITE_NAME },
    isPartOf: { '@type': 'Blog', name: BLOG_NAME, url: absoluteUrl('/') },
  }
}

/** Serialises JSON-LD safely for inline <script> (prevents `</script>` breakouts). */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')
