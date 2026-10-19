import type { Payload } from 'payload'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { createFixtures, createPost, getTestPayload } from './helpers/content'

const revalidatePath = vi.fn()
vi.mock('next/cache', () => ({ revalidatePath: (...args: unknown[]) => revalidatePath(...args) }))

let payload: Payload
let fixtures: Awaited<ReturnType<typeof createFixtures>>

beforeAll(async () => {
  payload = await getTestPayload()
  fixtures = await createFixtures(payload, ' cms')
})

afterAll(async () => {
  await payload.delete({ collection: 'posts', where: { id: { exists: true } } })
})

beforeEach(() => revalidatePath.mockClear())

const calledPaths = () => revalidatePath.mock.calls.map((call) => call[0])

describe('post fields', () => {
  it('generates a slug and reading time, and stamps publishedAt on first publish', async () => {
    const post = await createPost(payload, fixtures, { title: 'Generated Slug Post', _status: 'published' })
    expect(post.slug).toBe('generated-slug-post')
    expect(post.readingTime).toBe(1)
    expect(post.publishedAt).toBeTruthy()
  })

  it('enforces unique, well-formed, non-reserved slugs', async () => {
    await createPost(payload, fixtures, { title: 'Unique A', slug: 'unique-a', _status: 'published' })
    await expect(
      createPost(payload, fixtures, { title: 'Unique B', slug: 'unique-a', _status: 'published' }),
    ).rejects.toThrow()
    await expect(
      createPost(payload, fixtures, { title: 'Bad', slug: 'Not Valid', _status: 'published' }),
    ).rejects.toThrow()
    await expect(
      createPost(payload, fixtures, { title: 'Reserved', slug: 'admin', _status: 'published' }),
    ).rejects.toThrow()
  })

  it('requires an excerpt, author and category to publish', async () => {
    await expect(
      payload.create({
        collection: 'posts',
        data: { title: 'Incomplete', slug: 'incomplete', _status: 'published' } as never,
      }),
    ).rejects.toThrow()
  })
})

describe('access control', () => {
  it('lets anonymous visitors read published posts only', async () => {
    await createPost(payload, fixtures, { title: 'Access Pub', slug: 'access-pub', _status: 'published' })
    await createPost(payload, fixtures, { title: 'Access Draft', slug: 'access-draft' })

    const visible = await payload.find({
      collection: 'posts',
      overrideAccess: false,
      pagination: false,
    })
    const slugs = visible.docs.map((p) => p.slug)
    expect(slugs).toContain('access-pub')
    expect(slugs).not.toContain('access-draft')

    const asDraft = await payload.find({
      collection: 'posts',
      overrideAccess: false,
      draft: true,
      where: { slug: { equals: 'access-draft' } },
    })
    expect(asDraft.docs).toHaveLength(0)
  })

  it('blocks anonymous create, update, publish and delete', async () => {
    const draft = await createPost(payload, fixtures, { title: 'Locked', slug: 'locked' })

    await expect(
      payload.create({
        collection: 'posts',
        overrideAccess: false,
        data: { title: 'x', excerpt: 'x', _status: 'published' } as never,
      }),
    ).rejects.toThrow()
    await expect(
      payload.update({
        collection: 'posts',
        id: draft.id,
        overrideAccess: false,
        data: { _status: 'published' },
      }),
    ).rejects.toThrow()
    await expect(
      payload.delete({ collection: 'posts', id: draft.id, overrideAccess: false }),
    ).rejects.toThrow()

    const still = await payload.findByID({ collection: 'posts', id: draft.id, draft: true })
    expect(still._status).toBe('draft')
  })

  it('has no public registration', async () => {
    await expect(
      payload.create({
        collection: 'users',
        overrideAccess: false,
        data: { email: 'intruder@example.com', password: 'correct-horse-battery-1' },
      }),
    ).rejects.toThrow()
    await expect(
      payload.find({ collection: 'users', overrideAccess: false }),
    ).rejects.toThrow()
  })
})

describe('revalidation', () => {
  it('purges listing, feed, sitemap, article, category and tag pages on publish', async () => {
    const draft = await createPost(payload, fixtures, { title: 'Reval One', slug: 'reval-one' })
    expect(revalidatePath).not.toHaveBeenCalled() // saving a draft changes nothing public

    await payload.update({ collection: 'posts', id: draft.id, data: { _status: 'published' } })
    expect(calledPaths()).toEqual(
      expect.arrayContaining([
        '/', '/page/[page]', '/feed.xml', '/sitemap.xml', '/reval-one', '/category/fixtures-cms', '/tag/vitest-cms',
      ]),
    )
  })

  it('purges both the old and new URL when a published post is renamed, and on unpublish/delete', async () => {
    const post = await createPost(payload, fixtures, { title: 'Reval Two', slug: 'reval-two', _status: 'published' })
    revalidatePath.mockClear()

    await payload.update({ collection: 'posts', id: post.id, data: { slug: 'reval-two-renamed' } })
    expect(calledPaths()).toEqual(expect.arrayContaining(['/reval-two', '/reval-two-renamed']))
    revalidatePath.mockClear()

    await payload.update({ collection: 'posts', id: post.id, data: { _status: 'draft' } })
    expect(calledPaths()).toEqual(expect.arrayContaining(['/', '/reval-two-renamed', '/feed.xml']))
    revalidatePath.mockClear()

    await payload.delete({ collection: 'posts', id: post.id })
    expect(calledPaths()).toContain('/reval-two-renamed')
  })
})
