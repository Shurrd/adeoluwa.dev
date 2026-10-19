import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { slugify } from './slug'

export type Heading = { id: string; text: string; level: 2 | 3 }

type Node = { type?: string; tag?: string; text?: string; children?: Node[] }

const textOf = (node: Node): string =>
  typeof node.text === 'string' ? node.text : (node.children ?? []).map(textOf).join('')

/**
 * Walks the top-level headings once and returns both the table-of-contents
 * entries and a node→id map, so rendered heading anchors always match the TOC
 * (including de-duplicated ids for repeated headings).
 */
export function collectHeadings(state: SerializedEditorState | null | undefined) {
  const headings: Heading[] = []
  const ids = new WeakMap<object, string>()
  const seen = new Map<string, number>()

  for (const node of ((state?.root?.children ?? []) as Node[])) {
    if (node.type !== 'heading' || (node.tag !== 'h2' && node.tag !== 'h3' && node.tag !== 'h4')) continue
    const text = textOf(node).trim()
    if (!text) continue
    const base = slugify(text) || 'section'
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count + 1}`
    ids.set(node, id)
    if (node.tag !== 'h4') headings.push({ id, text, level: node.tag === 'h2' ? 2 : 3 })
  }
  return { headings, ids }
}
