import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LivePreviewListener } from '@/components/LivePreview'
import { PostList, PostMeta } from '@/components/PostList'
import { ArticleImage, RichText } from '@/components/RichText'
import { TableOfContents } from '@/components/TableOfContents'
import { collectHeadings } from '@/lib/headings'
import { articleJsonLd, serializeJsonLd } from '@/lib/jsonLd'
import { getPostBySlug, getPublishedSlugs, getRelatedPosts } from '@/lib/posts'
import { authorOf, coverOf, formatDate, tagsOf } from '@/lib/postView'
import { SITE_NAME, absoluteUrl } from '@/lib/site'
import { SLUG_PATTERN } from '@/lib/slug'

export const revalidate = 3600
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    return (await getPublishedSlugs()).map((slug) => ({ slug }))
  } catch {
    // CMS unreachable at build time: fall back to rendering on first request.
    return []
  }
}

async function load(slug: string) {
  if (!SLUG_PATTERN.test(slug)) return null
  return getPostBySlug(slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const loaded = await load(slug)
  if (!loaded) return { title: 'Not found', robots: { index: false, follow: false } }

  const { post, isDraft } = loaded
  const { isEnabled } = await draftMode()
  const title = post.meta?.title || post.title
  const description = post.meta?.description || post.excerpt
  const cover = coverOf(post)
  const image = cover?.sizes?.social?.url || cover?.url
  const url = absoluteUrl(`/${post.slug}`)

  return {
    title,
    description,
    alternates: { canonical: url },
    // Previews and unpublished content must never be indexed.
    robots: isEnabled || isDraft ? { index: false, follow: false } : { index: true, follow: true },
    authors: [{ name: authorOf(post)?.name ?? SITE_NAME }],
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [authorOf(post)?.name ?? SITE_NAME],
      tags: tagsOf(post).map((tag) => tag.name),
      images: image ? [{ url: absoluteUrl(image), alt: cover?.alt }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [absoluteUrl(image)] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const loaded = await load(slug)
  if (!loaded) notFound()

  const { post, isDraft } = loaded
  const { isEnabled } = await draftMode()
  const author = authorOf(post)
  const cover = coverOf(post)
  const tags = tagsOf(post)
  const { headings } = collectHeadings(post.content)
  const related = isDraft ? [] : await getRelatedPosts(post)

  return (
    <article className="article">
      {isEnabled ? <LivePreviewListener serverURL={absoluteUrl('/')} /> : null}
      {!isDraft ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd(post)) }}
        />
      ) : null}

      <p className="back">
        <Link href="/">← All posts</Link>
      </p>

      <header className="article-header">
        <PostMeta post={post} />
        <h1>{post.title}</h1>
        <p className="lede">{post.excerpt}</p>
        <p className="byline">
          {author ? <>By {author.name}</> : null}
          {post.updatedAt && post.publishedAt && post.updatedAt.slice(0, 10) > post.publishedAt.slice(0, 10) ? (
            <> · Updated {formatDate(post.updatedAt)}</>
          ) : null}
        </p>
      </header>

      {cover ? <ArticleImage media={cover} priority /> : null}
      {headings.length >= 3 ? <TableOfContents headings={headings} /> : null}

      <div className="prose">
        <RichText data={post.content} />
      </div>

      {tags.length > 0 ? (
        <ul className="tags" aria-label="Tags">
          {tags.map((tag) => (
            <li key={tag.id}>
              <Link href={`/tag/${tag.slug}`}>#{tag.name}</Link>
            </li>
          ))}
        </ul>
      ) : null}

      {related.length > 0 ? (
        <aside className="related" aria-labelledby="related-heading">
          <h2 id="related-heading" className="eyebrow">
            Keep reading
          </h2>
          <PostList posts={related} />
        </aside>
      ) : null}

      <p className="back">
        <Link href="/">← Back to the blog</Link>
      </p>
    </article>
  )
}
