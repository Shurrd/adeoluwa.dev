import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  CollectionBeforeValidateHook,
  PayloadRequest,
} from 'payload'
import type { Post } from '@/payload-types'
import { readingTimeMinutes } from '@/lib/readingTime'
import { idOf, pathsForPost, revalidatePaths } from '@/lib/revalidate'
import { slugify } from '@/lib/slug'

export const generateSlug: CollectionBeforeValidateHook<Post> = ({ data }) => {
  if (data && !data.slug && typeof data.title === 'string') data.slug = slugify(data.title)
  return data
}

export const computeDerivedFields: CollectionBeforeChangeHook<Post> = ({ data }) => {
  if (data.content) data.readingTime = readingTimeMinutes(data.content)
  if (data._status === 'published' && !data.publishedAt) data.publishedAt = new Date().toISOString()
  return data
}

async function taxonomySlugs(req: PayloadRequest, docs: (Partial<Post> | undefined)[]) {
  const categoryIds = new Set<string>()
  const tagIds = new Set<string>()
  for (const doc of docs) {
    const categoryId = idOf(doc?.category)
    if (categoryId) categoryIds.add(categoryId)
    for (const tag of doc?.tags ?? []) {
      const tagId = idOf(tag)
      if (tagId) tagIds.add(tagId)
    }
  }

  const lookup = async (collection: 'categories' | 'tags', ids: Set<string>) => {
    if (ids.size === 0) return []
    const { docs: found } = await req.payload.find({
      collection,
      where: { id: { in: [...ids] } },
      depth: 0,
      pagination: false,
      req,
    })
    return found.map((entry) => entry.slug)
  }

  return {
    category: await lookup('categories', categoryIds),
    tag: await lookup('tags', tagIds),
  }
}

/**
 * A change is publicly visible when the post is published now, or was published
 * before (so unpublishing and renaming purge the stale pages).
 */
export const revalidatePostAfterChange: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req,
  context,
}) => {
  if (context?.disableRevalidate) return doc
  const wasPublished = previousDoc?._status === 'published'
  const isPublished = doc._status === 'published'
  if (!wasPublished && !isPublished) return doc

  const taxonomy = await taxonomySlugs(req, [doc, previousDoc])
  revalidatePaths(pathsForPost(doc, previousDoc, taxonomy))
  return doc
}

export const revalidatePostAfterDelete: CollectionAfterDeleteHook<Post> = async ({
  doc,
  req,
  context,
}) => {
  if (context?.disableRevalidate) return doc
  const taxonomy = await taxonomySlugs(req, [doc])
  revalidatePaths(pathsForPost(doc, undefined, taxonomy))
  return doc
}
