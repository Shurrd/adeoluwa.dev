import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { CodeBlock } from '@/components/CodeBlock'
import { CODE_LANGUAGE_VALUES } from '@/lib/languages'

const TS = `interface SubscriptionInput {
  planId: string;
  customerId: string;
}

async function createSubscription(
  dto: SubscriptionInput,
): Promise<void> {
  console.log(dto.planId, dto.customerId);
}`

/** Rendered code text with the highlighter's markup removed. */
const textOf = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&#x3C;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

const render = async (props: Parameters<typeof CodeBlock>[0]) =>
  renderToStaticMarkup(createElement('div', null, await CodeBlock(props)))

describe('CodeBlock', () => {
  it('keeps TypeScript content, indentation and blank lines intact', async () => {
    const html = await render({ code: TS, language: 'typescript' })
    expect(html).toContain('class="shiki')
    expect(html).toContain('color:') // tokens are highlighted
    expect(textOf(html.split('<pre')[1])).toContain(TS)
  })

  it('escapes markup inside code', async () => {
    const html = await render({ code: '<script>alert(1)</script>', language: 'html' })
    expect(html).not.toContain('<script>')
  })

  it('falls back to plain text for an unknown language instead of throwing', async () => {
    const html = await render({ code: 'PERFORM X', language: 'cobol' })
    expect(html).toContain('PERFORM X')
  })

  it('every language offered in the editor is one Shiki can load', async () => {
    for (const language of CODE_LANGUAGE_VALUES) {
      await expect(render({ code: 'x', language })).resolves.toContain('<pre')
    }
  })
})
