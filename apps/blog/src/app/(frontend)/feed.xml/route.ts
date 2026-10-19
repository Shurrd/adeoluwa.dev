import { getAllPublishedPosts } from '@/lib/posts'
import { authorOf, categoryOf, tagsOf } from '@/lib/postView'
import { BLOG_DESCRIPTION, BLOG_NAME, SITE_NAME, absoluteUrl } from '@/lib/site'

export const revalidate = 3600

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`)

export async function GET() {
  const posts = (await getAllPublishedPosts()).slice(0, 50)
  const lastBuild = posts[0]?.updatedAt ?? new Date().toISOString()

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/${post.slug}`)
      const categories = [categoryOf(post)?.name, ...tagsOf(post).map((t) => t.name)].filter(
        (name): name is string => Boolean(name),
      )
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.publishedAt ?? post.createdAt).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(authorOf(post)?.name ?? SITE_NAME)}</dc:creator>
${categories.map((name) => `      <category>${escapeXml(name)}</category>`).join('\n')}
      <description>${escapeXml(post.excerpt)}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${BLOG_NAME} | ${SITE_NAME}`)}</title>
    <link>${absoluteUrl('/')}</link>
    <description>${escapeXml(BLOG_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
