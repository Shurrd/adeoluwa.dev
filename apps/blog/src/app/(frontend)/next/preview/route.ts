import config from '@payload-config'
import { timingSafeEqual } from 'node:crypto'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { getEnv } from '@/lib/env'

export const dynamic = 'force-dynamic'

const safeEqual = (a: string, b: string) => {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

/** Only same-site, absolute-path redirects (no `//host`, no backslashes, no control chars). */
const isSafePath = (path: string) =>
  path.startsWith('/') && !path.startsWith('//') && !/[\\\u0000-\u001f]/.test(path)

/**
 * Enables Next.js draft mode. Requires BOTH the shared preview secret (embedded
 * in the preview links Payload generates) AND a valid Payload admin session, so
 * a leaked link alone cannot expose drafts.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('previewSecret')
  const path = searchParams.get('path') ?? '/'

  if (!secret || !safeEqual(secret, getEnv().previewSecret)) {
    return new Response('Invalid preview token', { status: 403 })
  }
  if (!isSafePath(path)) return new Response('Invalid path', { status: 400 })

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) return new Response('Sign in to the admin panel to preview drafts', { status: 401 })

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
