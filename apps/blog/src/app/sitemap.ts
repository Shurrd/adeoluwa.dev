import type { MetadataRoute } from 'next'
import { getAllPublishedPosts } from '@/lib/posts'
import { categoryOf, tagsOf } from '@/lib/postView'
import { absoluteUrl } from '@/lib/site'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPublishedPosts()

  const categories = new Set<string>()
  const tags = new Set<string>()
  for (const post of posts) {
    const category = categoryOf(post)
    if (category) categories.add(category.slug)
    for (const tag of tagsOf(post)) tags.add(tag.slug)
  }

  return [
    { url: absoluteUrl('/'), lastModified: posts[0]?.updatedAt, changeFrequency: 'weekly', priority: 1 },
    ...posts.map((post) => ({
      url: absoluteUrl(`/${post.slug}`),
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...[...categories].map((slug) => ({ url: absoluteUrl(`/category/${slug}`), changeFrequency: 'weekly' as const, priority: 0.4 })),
    ...[...tags].map((slug) => ({ url: absoluteUrl(`/tag/${slug}`), changeFrequency: 'weekly' as const, priority: 0.3 })),
  ]
}
