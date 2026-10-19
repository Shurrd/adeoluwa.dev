import { codeToHtml } from 'shiki'
import { CODE_LANGUAGE_VALUES } from '@/lib/languages'
import { CopyButton } from './CopyButton'

const THEME = 'github-dark-default'

async function highlight(code: string, lang: string) {
  try {
    return await codeToHtml(code, { lang, theme: THEME })
  } catch {
    // A language Shiki cannot load must not take the whole article down.
    return codeToHtml(code, { lang: 'text', theme: THEME })
  }
}

type Props = { code: string; language?: string | null; filename?: string | null }

export async function CodeBlock({ code, language, filename }: Props) {
  const lang = language && CODE_LANGUAGE_VALUES.includes(language) ? language : 'text'
  // Shiki returns escaped, tokenised markup, so it is safe to inject.
  const html = await highlight(code, lang)

  return (
    <figure className="code">
      <div className="code-bar">
        <span className="code-name">{filename || (lang === 'text' ? '' : lang)}</span>
        <CopyButton text={code} />
      </div>
      <div className="code-body" dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  )
}
