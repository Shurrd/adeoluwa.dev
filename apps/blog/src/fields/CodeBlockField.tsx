'use client'

import { CodeField, useFormFields } from '@payloadcms/ui'
import type { CodeFieldClientProps } from 'payload'
import { useCallback } from 'react'

/** Our language values → Monaco language ids. Anything unlisted falls back to plain text. */
const MONACO_LANGUAGE: Record<string, string> = {
  typescript: 'typescript',
  tsx: 'typescript',
  javascript: 'javascript',
  jsx: 'javascript',
  json: 'json',
  html: 'html',
  css: 'css',
  bash: 'shell',
  sql: 'sql',
  yaml: 'yaml',
  dockerfile: 'dockerfile',
  python: 'python',
  go: 'go',
  rust: 'rust',
  java: 'java',
  kotlin: 'kotlin',
  swift: 'swift',
  markdown: 'markdown',
}

type OnMount = NonNullable<React.ComponentProps<typeof CodeField>['onMount']>

/**
 * The code block stores article *content*, not application code: snippets are
 * usually fragments with undeclared names. Keep Monaco's syntax highlighting
 * but turn off its compiler diagnostics, and let TSX/JSX parse.
 */
const configureMonaco: OnMount = (_editor, monaco) => {
  const { javascriptDefaults, typescriptDefaults, JsxEmit } = monaco.languages.typescript
  for (const defaults of [javascriptDefaults, typescriptDefaults]) {
    defaults.setDiagnosticsOptions({ noSemanticValidation: true, noSyntaxValidation: true })
    defaults.setCompilerOptions({
      allowNonTsExtensions: true,
      jsx: JsxEmit.Preserve,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
    })
  }
}

/**
 * Payload's code field defaults to JavaScript (and only reads its language at
 * mount), so TypeScript snippets showed JS syntax errors. This follows the
 * block's sibling `language` select instead.
 */
export function CodeBlockField(props: CodeFieldClientProps) {
  const { field, path } = props
  const languagePath = path.includes('.') ? path.replace(/[^.]+$/, 'language') : 'language'
  const selected = useFormFields(([fields]) => fields[languagePath]?.value)
  const language = MONACO_LANGUAGE[typeof selected === 'string' ? selected : ''] ?? 'plaintext'

  const onMount = useCallback<OnMount>((editor, monaco) => configureMonaco(editor, monaco), [])

  return (
    <CodeField
      {...props}
      field={{
        ...field,
        admin: {
          ...field.admin,
          language,
          // `language` here is Monaco's controlled prop, so changing the select re-highlights live.
          editorProps: { ...(field.admin?.editorProps as object | undefined), language },
          editorOptions: { ...(field.admin?.editorOptions as object | undefined), minimap: { enabled: false }, tabSize: 2 },
        },
      }}
      onMount={onMount}
    />
  )
}
