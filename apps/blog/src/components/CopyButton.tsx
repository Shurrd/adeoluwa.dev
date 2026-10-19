'use client'

import { useState } from 'react'

export function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('failed')
    }
    setTimeout(() => setState('idle'), 1800)
  }

  return (
    <button type="button" className="copy-button" onClick={copy} aria-live="polite">
      {state === 'copied' ? 'Copied' : state === 'failed' ? 'Press ⌘C' : 'Copy'}
    </button>
  )
}
