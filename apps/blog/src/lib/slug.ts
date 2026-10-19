/** Top-level paths owned by the app. A post may not use them as its slug. */
export const RESERVED_SLUGS = [
  'admin',
  'api',
  'category',
  'tag',
  'page',
  'next',
  'feed.xml',
  'sitemap.xml',
  'robots.txt',
]

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

export function validateSlug(value: string | null | undefined): true | string {
  if (!value) return 'A slug is required'
  if (!SLUG_PATTERN.test(value)) {
    return 'Use lowercase letters, numbers and single hyphens only'
  }
  if (RESERVED_SLUGS.includes(value)) return `"${value}" is reserved by the application`
  return true
}
