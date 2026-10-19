import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import type { Post } from '@/payload-types'
import { slugify } from '@/lib/slug'

const text = (value: string) => ({
  type: 'text', version: 1, text: value, format: 0, detail: 0, mode: 'normal', style: '',
})
const block = (type: string, children: unknown[], extra: object = {}) => ({
  type, version: 1, direction: 'ltr', format: '', indent: 0, children, ...extra,
})

export function lexical(paragraphs: string[], headings: string[] = []) {
  return {
    root: block('root', [
      ...headings.map((heading) => block('heading', [text(heading)], { tag: 'h2' })),
      ...paragraphs.map((paragraph) => block('paragraph', [text(paragraph)])),
    ]),
  } as unknown as Post['content']
}

export async function getTestPayload(): Promise<Payload> {
  return getPayload({ config })
}

export async function createFixtures(payload: Payload, suffix = '') {
  const author = await payload.create({ collection: 'authors', data: { name: `Test Author${suffix}` } })
  const categoryName = `Fixtures${suffix}`
  const tagName = `Vitest${suffix}`
  const category = await payload.create({
    collection: 'categories',
    data: { name: categoryName, slug: slugify(categoryName) },
  })
  const tag = await payload.create({
    collection: 'tags',
    data: { name: tagName, slug: slugify(tagName) },
  })
  return { author, category, tag }
}

export async function createPost(
  payload: Payload,
  fixtures: Awaited<ReturnType<typeof createFixtures>>,
  data: Partial<Post> & { title: string },
) {
  return payload.create({
    collection: 'posts',
    draft: data._status !== 'published',
    data: {
      excerpt: 'An excerpt',
      content: lexical(['Hello world.'], ['One', 'Two', 'Three']),
      author: fixtures.author.id,
      category: fixtures.category.id,
      tags: [fixtures.tag.id],
      ...data,
    } as never,
  })
}
