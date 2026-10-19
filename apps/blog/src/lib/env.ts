/**
 * Server-side environment validation. Imported by payload.config.ts, so a
 * misconfigured deployment fails at boot/build with a readable message rather
 * than at the first request.
 */
export type Env = {
  databaseUrl: string
  payloadSecret: string
  previewSecret: string
  siteUrl: string
  blobToken: string | undefined
}

type EnvSource = Record<string, string | undefined>

let cached: Env | undefined

const MIN_SECRET_LENGTH = 32

function normalizeUrl(value: string): string {
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`
  return new URL(withProtocol).origin
}

export function resolveSiteUrl(source: EnvSource = process.env): string | undefined {
  if (source.SITE_URL) return normalizeUrl(source.SITE_URL)
  // Preview deployments on Vercel have no SITE_URL; fall back to their own host
  // so previews never point at (or link to) localhost or production by accident.
  if (source.VERCEL_URL) return normalizeUrl(source.VERCEL_URL)
  if (source.NODE_ENV !== 'production') return 'http://localhost:3000'
  return undefined
}

export function readEnv(source: EnvSource = process.env): Env {
  const problems: string[] = []

  const databaseUrl = source.DATABASE_URL
  if (!databaseUrl) problems.push('DATABASE_URL is required (PostgreSQL connection string)')

  const payloadSecret = source.PAYLOAD_SECRET
  if (!payloadSecret || payloadSecret.length < MIN_SECRET_LENGTH) {
    problems.push(`PAYLOAD_SECRET is required and must be at least ${MIN_SECRET_LENGTH} characters`)
  }

  const previewSecret = source.PREVIEW_SECRET
  if (!previewSecret || previewSecret.length < MIN_SECRET_LENGTH) {
    problems.push(`PREVIEW_SECRET is required and must be at least ${MIN_SECRET_LENGTH} characters`)
  }

  // Serverless file systems are read-only, so production without Blob storage
  // would only fail later, at the first upload.
  if (source.VERCEL_ENV === 'production' && !source.BLOB_READ_WRITE_TOKEN) {
    problems.push(
      'BLOB_READ_WRITE_TOKEN is required in production (create a Vercel Blob store and connect it to the project)',
    )
  }

  let siteUrl: string | undefined
  try {
    siteUrl = resolveSiteUrl(source)
  } catch {
    problems.push('SITE_URL must be a valid URL, e.g. https://blog.adeoluwa.dev')
  }
  if (!siteUrl && !problems.some((p) => p.startsWith('SITE_URL'))) {
    problems.push('SITE_URL is required in production, e.g. https://blog.adeoluwa.dev')
  }

  if (problems.length > 0) {
    throw new Error(`Invalid environment configuration:\n - ${problems.join('\n - ')}`)
  }

  return {
    databaseUrl: databaseUrl as string,
    payloadSecret: payloadSecret as string,
    previewSecret: previewSecret as string,
    siteUrl: siteUrl as string,
    blobToken: source.BLOB_READ_WRITE_TOKEN || undefined,
  }
}

export function getEnv(): Env {
  cached ??= readEnv()
  return cached
}
