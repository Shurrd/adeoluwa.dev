import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

const WORDS_PER_MINUTE = 220

type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
  fields?: { code?: string }
}

export function plainTextFromLexical(state: SerializedEditorState | null | undefined): string {
  const parts: string[] = []
  const walk = (node: LexicalNode) => {
    if (typeof node.text === 'string') parts.push(node.text)
    if (typeof node.fields?.code === 'string') parts.push(node.fields.code)
    node.children?.forEach(walk)
  }
  if (state?.root) walk(state.root as LexicalNode)
  return parts.join(' ')
}

export function readingTimeMinutes(state: SerializedEditorState | null | undefined): number {
  const words = plainTextFromLexical(state).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}
