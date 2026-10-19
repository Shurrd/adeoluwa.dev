import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ArticleImage } from '@/components/RichText'
import type { Media } from '@/payload-types'

describe('ArticleImage', () => {
  it('requests same-site media through the optimiser as a relative path', () => {
    const media = {
      id: 1,
      alt: 'An image',
      url: 'https://blog.adeoluwa.dev/api/media/file/a%3Db.jpg',
      mimeType: 'image/jpeg',
      width: 1200,
      height: 800,
      updatedAt: '',
      createdAt: '',
    } satisfies Media
    const html = renderToStaticMarkup(createElement(ArticleImage, { media }))
    expect(html).toContain('url=%2Fapi%2Fmedia%2Ffile%2Fa%253Db.jpg')
    expect(html).not.toContain('blog.adeoluwa.dev')
  })
})
