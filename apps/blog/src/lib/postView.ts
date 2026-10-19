import type { Author, Category, Media, Post, Tag } from '@/payload-types'

/** Relations are populated at depth ≥ 1; these narrow the `id | doc` unions. */
const populated = <T extends object>(value: number | T | null | undefined): T | undefined =>
  value && typeof value === 'object' ? value : undefined

export const categoryOf = (post: Post): Category | undefined => populated(post.category)
export const authorOf = (post: Post): Author | undefined => populated(post.author)
export const coverOf = (post: Post): Media | undefined => populated(post.coverImage)
export const tagsOf = (post: Post): Tag[] =>
  (post.tags ?? []).map((tag) => populated(tag)).filter((tag): tag is Tag => Boolean(tag))

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatDate(value: string | null | undefined): string {
  return value ? dateFormat.format(new Date(value)) : ''
}

export const formatReadingTime = (minutes: number | null | undefined) =>
  `${minutes && minutes > 0 ? minutes : 1} min read`

const LOCAL_MEDIA_PREFIX = '/api/media/file/'

/**
 * Payload returns absolute media URLs (it knows the site origin). next/image only
 * optimises same-site images when they are relative, and the origin differs
 * between production, previews and local dev, so use the path form.
 */
export function mediaSrc(url: string): string {
  if (!/^https?:\/\//.test(url)) return url
  try {
    const { pathname, search } = new URL(url)
    return pathname.startsWith(LOCAL_MEDIA_PREFIX) ? `${pathname}${search}` : url
  } catch {
    return url
  }
}
