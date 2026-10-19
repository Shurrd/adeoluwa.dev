import { getEnv } from './env'

export const SITE_NAME = 'Abraham Adeyemi'
export const BLOG_NAME = 'Engineering notes'
export const BLOG_DESCRIPTION =
  'Notes on building web and mobile software, backend systems and the cloud infrastructure they run on.'
export const PORTFOLIO_URL = 'https://adeoluwa.dev'
export const POSTS_PER_PAGE = 10

export function absoluteUrl(path = '/'): string {
  return new URL(path, getEnv().siteUrl).toString()
}

export function postPath(slug: string): string {
  return `/${slug}`
}
