import type { Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { createFixtures, createPost, getTestPayload } from './helpers/content'

const draftState = { isEnabled: false, enable: vi.fn(), disable: vi.fn() }
let requestHeaders = new Headers()

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))
vi.mock('next/headers', () => ({
  draftMode: async () => draftState,
  headers: async () => requestHeaders,
}))
vi.mock('next/font/google', () => ({ Inter: () => ({ className: 'inter' }) }))

let payload: Payload

beforeAll(async () => {
  payload = await getTestPayload()
  const fixtures = await createFixtures(payload)
  await createPost(payload, fixtures, {
    title: 'Published Site Post',
    slug: 'published-site-post',
    excerpt: 'Visible excerpt',
    _status: 'published',
  })
  await createPost(payload, fixtures, {
    title: 'Secret Draft Post',
    slug: 'secret-draft-post',
    excerpt: 'Hidden excerpt',
  })
})

afterAll(async () => {
  await payload.delete({ collection: 'posts', where: { id: { exists: true } } })
})

const NOT_FOUND = /NEXT_HTTP_ERROR_FALLBACK;404|NEXT_NOT_FOUND/

describe('home page', () => {
  it('renders published posts and never drafts', async () => {
    const { HomeView } = await import('@/app/(frontend)/HomeView')
    const html = renderToStaticMarkup(await HomeView({ page: 1 }))
    expect(html).toContain('Published Site Post')
    expect(html).toContain('Visible excerpt')
    expect(html).toContain('1 min read')
    expect(html).not.toContain('Secret Draft Post')
  })

  it('returns not-found for pages past the end of the list', async () => {
    const { HomeView } = await import('@/app/(frontend)/HomeView')
    await expect(HomeView({ page: 9 })).rejects.toThrow(NOT_FOUND)
  })
})

describe('article page', () => {
  it('renders a published slug with indexable, canonical metadata', async () => {
    const mod = await import('@/app/(frontend)/[slug]/page')
    const params = Promise.resolve({ slug: 'published-site-post' })
    await expect(mod.default({ params })).resolves.toBeTruthy()
    const meta = await mod.generateMetadata({ params })
    expect(meta.alternates?.canonical).toBe('https://blog.example.test/published-site-post')
    expect(meta.robots).toMatchObject({ index: true })
  })

  it.each(['secret-draft-post', 'does-not-exist', 'Not A Slug', '..%2Fetc'])(
    'responds 404 for %s',
    async (slug) => {
      const mod = await import('@/app/(frontend)/[slug]/page')
      await expect(mod.default({ params: Promise.resolve({ slug }) })).rejects.toThrow(NOT_FOUND)
    },
  )

  it('shows a draft only with draft mode AND an authenticated session, and marks it noindex', async () => {
    const mod = await import('@/app/(frontend)/[slug]/page')
    const params = Promise.resolve({ slug: 'secret-draft-post' })

    draftState.isEnabled = true
    requestHeaders = new Headers() // draft cookie but no session
    await expect(mod.default({ params })).rejects.toThrow(NOT_FOUND)

    await payload.create({
      collection: 'users',
      data: { email: 'editor@example.com', password: 'correct-horse-battery-1' },
    })
    const { token } = await payload.login({
      collection: 'users',
      data: { email: 'editor@example.com', password: 'correct-horse-battery-1' },
    })
    requestHeaders = new Headers({ Authorization: `JWT ${token}` })
    await expect(mod.default({ params })).resolves.toBeTruthy()
    expect((await mod.generateMetadata({ params })).robots).toMatchObject({ index: false })

    draftState.isEnabled = false
    requestHeaders = new Headers()
  })
})

describe('category and tag pages', () => {
  it('list published posts and 404 for unknown terms', async () => {
    const category = await import('@/app/(frontend)/category/[slug]/page')
    const tag = await import('@/app/(frontend)/tag/[slug]/page')

    const catHtml = renderToStaticMarkup(
      await category.default({ params: Promise.resolve({ slug: 'fixtures' }) }),
    )
    expect(catHtml).toContain('Published Site Post')
    expect(catHtml).not.toContain('Secret Draft Post')

    const tagHtml = renderToStaticMarkup(await tag.default({ params: Promise.resolve({ slug: 'vitest' }) }))
    expect(tagHtml).toContain('Published Site Post')

    await expect(category.default({ params: Promise.resolve({ slug: 'nope' }) })).rejects.toThrow(NOT_FOUND)
    await expect(tag.default({ params: Promise.resolve({ slug: 'nope' }) })).rejects.toThrow(NOT_FOUND)
  })
})

describe('feed, sitemap and robots', () => {
  it('RSS contains published posts only', async () => {
    const { GET } = await import('@/app/(frontend)/feed.xml/route')
    const xml = await (await GET()).text()
    expect(xml).toContain('https://blog.example.test/published-site-post')
    expect(xml).not.toContain('secret-draft-post')
    expect(xml).not.toContain('Secret Draft Post')
  })

  it('sitemap contains published posts only', async () => {
    const { default: sitemap } = await import('@/app/sitemap')
    const urls = (await sitemap()).map((entry) => entry.url)
    expect(urls).toContain('https://blog.example.test/published-site-post')
    expect(urls.some((url) => url.includes('secret-draft-post'))).toBe(false)
  })

  it('robots disallows admin, api and preview routes', async () => {
    const { default: robots } = await import('@/app/robots')
    const rules = robots().rules as { disallow: string[] }
    expect(rules.disallow).toEqual(expect.arrayContaining(['/admin', '/api/', '/next/']))
  })
})

describe('preview route', () => {
  const secret = 'test-preview-secret-0123456789abcdef012'
  const call = async (query: string, headers: HeadersInit = {}) => {
    const { GET } = await import('@/app/(frontend)/next/preview/route')
    return GET(new Request(`https://blog.example.test/next/preview?${query}`, { headers }))
  }

  it('rejects a missing or wrong secret', async () => {
    expect((await call('path=/x')).status).toBe(403)
    expect((await call('previewSecret=wrong&path=/x')).status).toBe(403)
  })

  it('rejects a valid secret without an admin session', async () => {
    expect((await call(`previewSecret=${secret}&path=/secret-draft-post`)).status).toBe(401)
    expect(draftState.enable).not.toHaveBeenCalled()
  })

  it('rejects open-redirect paths even with a session', async () => {
    const { token } = await payload.login({
      collection: 'users',
      data: { email: 'editor@example.com', password: 'correct-horse-battery-1' },
    })
    const auth = { Authorization: `JWT ${token}` }
    expect((await call(`previewSecret=${secret}&path=//evil.example`, auth)).status).toBe(400)
    expect((await call(`previewSecret=${secret}&path=/%5Cevil.example`, auth)).status).toBe(400)
    expect(draftState.enable).not.toHaveBeenCalled()

    await expect(call(`previewSecret=${secret}&path=/secret-draft-post`, auth)).rejects.toThrow(/NEXT_REDIRECT/)
    expect(draftState.enable).toHaveBeenCalledTimes(1)
  })
})
