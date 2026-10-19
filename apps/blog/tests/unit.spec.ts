import { describe, expect, it } from 'vitest'
import { collectHeadings } from '@/lib/headings'
import { readEnv, resolveSiteUrl } from '@/lib/env'
import { readingTimeMinutes } from '@/lib/readingTime'
import { pathsForPost } from '@/lib/revalidate'
import { slugify, validateSlug } from '@/lib/slug'
import { lexical } from './helpers/content'

describe('slug', () => {
  it('slugifies titles', () => {
    expect(slugify('Why I Run <Postgres> Everywhere!')).toBe('why-i-run-postgres-everywhere')
    expect(slugify('Adéolúwa’s notes')).toBe('adeoluwas-notes')
  })
  it('rejects malformed and reserved slugs', () => {
    expect(validateSlug('good-slug-1')).toBe(true)
    expect(validateSlug('Bad Slug')).not.toBe(true)
    expect(validateSlug('trailing-')).not.toBe(true)
    expect(validateSlug('admin')).not.toBe(true)
    expect(validateSlug('')).not.toBe(true)
  })
})

describe('readingTime', () => {
  it('is at least one minute and scales with length', () => {
    expect(readingTimeMinutes(lexical(['short']))).toBe(1)
    expect(readingTimeMinutes(lexical([Array(661).fill('word').join(' ')]))).toBe(4)
  })
})

describe('headings', () => {
  it('de-duplicates ids so the TOC matches rendered anchors', () => {
    const { headings } = collectHeadings(lexical([], ['Setup', 'Setup', 'Other']))
    expect(headings.map((h) => h.id)).toEqual(['setup', 'setup-2', 'other'])
  })
})

describe('env validation', () => {
  const valid = {
    DATABASE_URL: 'postgres://u:p@h/db',
    PAYLOAD_SECRET: 'x'.repeat(32),
    PREVIEW_SECRET: 'y'.repeat(32),
    SITE_URL: 'https://blog.adeoluwa.dev/',
  }

  it('accepts a complete configuration and normalises the site URL', () => {
    expect(readEnv(valid).siteUrl).toBe('https://blog.adeoluwa.dev')
  })
  it('reports every missing or weak variable', () => {
    expect(() => readEnv({ NODE_ENV: 'production' })).toThrow(
      /DATABASE_URL[\s\S]*PAYLOAD_SECRET[\s\S]*PREVIEW_SECRET[\s\S]*SITE_URL/,
    )
    expect(() => readEnv({ ...valid, PAYLOAD_SECRET: 'short' })).toThrow(/PAYLOAD_SECRET/)
  })
  it('requires Blob storage on Vercel production only', () => {
    expect(() => readEnv({ ...valid, VERCEL_ENV: 'production' })).toThrow(/BLOB_READ_WRITE_TOKEN/)
    expect(readEnv({ ...valid, VERCEL_ENV: 'production', BLOB_READ_WRITE_TOKEN: 'tok' }).blobToken).toBe('tok')
    expect(() => readEnv({ ...valid, VERCEL_ENV: 'preview' })).not.toThrow()
  })
  it('falls back to the Vercel deployment host for previews, never localhost in production', () => {
    expect(resolveSiteUrl({ VERCEL_URL: 'blog-git-x.vercel.app', NODE_ENV: 'production' })).toBe(
      'https://blog-git-x.vercel.app',
    )
    expect(resolveSiteUrl({ NODE_ENV: 'production' })).toBeUndefined()
  })
})

describe('pathsForPost', () => {
  it('covers listing, feed, sitemap, article, category and tag, for old and new slugs', () => {
    const paths = pathsForPost({ slug: 'new' }, { slug: 'old' }, { category: ['c'], tag: ['t1', 't2'] })
    expect(paths).toEqual(
      expect.arrayContaining([
        '/', '/page/[page]', '/feed.xml', '/sitemap.xml', '/new', '/old', '/category/c', '/tag/t1', '/tag/t2',
      ]),
    )
  })
})
