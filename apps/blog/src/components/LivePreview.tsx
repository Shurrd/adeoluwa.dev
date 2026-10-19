'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

/** Re-renders the server component tree whenever the editor saves/autosaves in the admin. */
export function LivePreviewListener({ serverURL }: { serverURL: string }) {
  const router = useRouter()
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />
}
