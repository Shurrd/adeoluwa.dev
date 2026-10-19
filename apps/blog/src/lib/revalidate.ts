import { revalidatePath } from 'next/cache'

type PostLike = {
  slug?: string | null
  category?: unknown
  tags?: unknown
}

const idOf = (value: unknown): string | undefined => {
  if (value && typeof value === 'object' && 'id' in value) return String((value as { id: unknown }).id)
  return value == null ? undefined : String(value)
}

export type TaxonomySlugs = { categories: Map<string, string>; tags: Map<string, string> }

/**
 * Pure helper: the set of public paths affected by a post change. Covers both
 * the new and the previous state so renames, unpublishes and category/tag
 * moves invalidate the pages that used to list the post.
 */
export function pathsForPost(
  doc: PostLike | undefined,
  previousDoc: PostLike | undefined,
  taxonomy: { category?: string[]; tag?: string[] } = {},
): string[] {
  const paths = new Set<string>(['/', '/page/[page]', '/feed.xml', '/sitemap.xml'])
  for (const post of [doc, previousDoc]) {
    if (post?.slug) paths.add(`/${post.slug}`)
  }
  for (const slug of taxonomy.category ?? []) paths.add(`/category/${slug}`)
  for (const slug of taxonomy.tag ?? []) paths.add(`/tag/${slug}`)
  return [...paths]
}

export function revalidatePaths(paths: string[]): void {
  for (const path of paths) {
    try {
      // Dynamic route patterns need the 'page' type; concrete paths ignore it.
      if (path.includes('[')) revalidatePath(path, 'page')
      else revalidatePath(path)
    } catch {
      // Outside a Next.js request (scripts, migrations, tests) there is no cache to purge.
    }
  }
}

export function revalidateEverything(): void {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // see above
  }
}

export { idOf }
