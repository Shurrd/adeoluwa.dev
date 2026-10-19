import { absoluteUrl } from './site'
import { getEnv } from './env'

/** Link into the draft-mode entry route. Only usable by a signed-in staff member. */
export function previewUrl(slug: string | null | undefined): string {
  const path = slug ? `/${slug}` : '/'
  const params = new URLSearchParams({ path, previewSecret: getEnv().previewSecret })
  return absoluteUrl(`/next/preview?${params.toString()}`)
}
