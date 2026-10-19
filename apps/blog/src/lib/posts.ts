import config from '@payload-config'
import { draftMode, headers } from 'next/headers'
import { getPayload, type Where } from 'payload'
import type { Category, Post, Tag } from '@/payload-types'
import { POSTS_PER_PAGE } from './site'

/**
 * Data access for the public site. Everything here goes through Payload's Local
 * API on the server with `overrideAccess: false`, so the collection access rules
 * (published-only for anonymous reads) apply even if a query is written wrongly.
 */

const published: Where = { _status: { equals: 'published' } }

// List views do not need the article body.
const listSelect = { content: false } as const

export type PostList = {
  posts: Post[]
  page: number
  totalPages: number
  totalDocs: number
}

const getClient = () => getPayload({ config })

export async function getPublishedPosts(page = 1, limit = POSTS_PER_PAGE): Promise<PostList> {
  const payload = await getClient()
  const result = await payload.find({
    collection: 'posts',
    where: published,
    sort: '-publishedAt',
    page,
    limit,
    depth: 1,
    draft: false,
    overrideAccess: false,
    select: listSelect,
  })
  return {
    posts: result.docs as Post[],
    page: result.page ?? page,
    totalPages: result.totalPages,
    totalDocs: result.totalDocs,
  }
}

/** Every published post, newest first; used by the feed and sitemap. */
export async function getAllPublishedPosts(limit = 500): Promise<Post[]> {
  const payload = await getClient()
  const result = await payload.find({
    collection: 'posts',
    where: published,
    sort: '-publishedAt',
    limit,
    pagination: false,
    depth: 1,
    draft: false,
    overrideAccess: false,
    select: listSelect,
  })
  return result.docs as Post[]
}

export async function getPublishedSlugs(): Promise<string[]> {
  const payload = await getClient()
  const result = await payload.find({
    collection: 'posts',
    where: published,
    limit: 1000,
    pagination: false,
    depth: 0,
    draft: false,
    overrideAccess: false,
    select: { slug: true },
  })
  return result.docs.map((doc) => doc.slug)
}

export type LoadedPost = { post: Post; isDraft: boolean }

/**
 * Loads one post by slug. Published content for everyone; the latest draft only
 * when draft mode is on AND the request carries a valid admin session.
 */
export async function getPostBySlug(slug: string): Promise<LoadedPost | null> {
  const payload = await getClient()
  const { isEnabled } = await draftMode()

  if (isEnabled) {
    const { user } = await payload.auth({ headers: await headers() })
    if (user) {
      const draft = await payload.find({
        collection: 'posts',
        where: { slug: { equals: slug } },
        draft: true,
        limit: 1,
        depth: 2,
        user,
        overrideAccess: false,
      })
      const post = draft.docs[0]
      return post ? { post, isDraft: post._status !== 'published' } : null
    }
  }

  const result = await payload.find({
    collection: 'posts',
    where: { and: [{ slug: { equals: slug } }, published] },
    limit: 1,
    depth: 2,
    draft: false,
    overrideAccess: false,
  })
  const post = result.docs[0]
  return post ? { post, isDraft: false } : null
}

export type Taxonomy<T> = { term: T; posts: Post[] }

export async function getCategoryWithPosts(slug: string): Promise<Taxonomy<Category> | null> {
  const payload = await getClient()
  const found = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  const term = found.docs[0]
  if (!term) return null
  const result = await payload.find({
    collection: 'posts',
    where: { and: [published, { category: { equals: term.id } }] },
    sort: '-publishedAt',
    limit: 100,
    pagination: false,
    depth: 1,
    draft: false,
    overrideAccess: false,
    select: listSelect,
  })
  return { term, posts: result.docs as Post[] }
}

export async function getTagWithPosts(slug: string): Promise<Taxonomy<Tag> | null> {
  const payload = await getClient()
  const found = await payload.find({
    collection: 'tags',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  const term = found.docs[0]
  if (!term) return null
  const result = await payload.find({
    collection: 'posts',
    where: { and: [published, { tags: { contains: term.id } }] },
    sort: '-publishedAt',
    limit: 100,
    pagination: false,
    depth: 1,
    draft: false,
    overrideAccess: false,
    select: listSelect,
  })
  return { term, posts: result.docs as Post[] }
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const categoryId = typeof post.category === 'object' ? post.category?.id : post.category
  const tagIds = (post.tags ?? []).map((tag) => (typeof tag === 'object' ? tag.id : tag))

  const matchers: Where[] = []
  if (categoryId) matchers.push({ category: { equals: categoryId } })
  if (tagIds.length > 0) matchers.push({ tags: { in: tagIds } })
  if (matchers.length === 0) return []

  const payload = await getClient()
  const result = await payload.find({
    collection: 'posts',
    where: { and: [published, { id: { not_equals: post.id } }, { or: matchers }] },
    sort: '-publishedAt',
    limit,
    depth: 1,
    draft: false,
    overrideAccess: false,
    select: listSelect,
  })
  return result.docs as Post[]
}
