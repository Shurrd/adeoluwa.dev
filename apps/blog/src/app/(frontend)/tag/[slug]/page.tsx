import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EmptyState, PostList } from '@/components/PostList'
import { getTagWithPosts } from '@/lib/posts'
import { SLUG_PATTERN } from '@/lib/slug'

export const revalidate = 3600

// Rendered on first request, then cached and revalidated like the statically generated pages.
export async function generateStaticParams() {
  return []
}

type Props = { params: Promise<{ slug: string }> }

const load = async (slug: string) => (SLUG_PATTERN.test(slug) ? getTagWithPosts(slug) : null)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const result = await load(slug)
  if (!result) return { title: 'Not found', robots: { index: false } }
  return {
    title: `#${result.term.name}`,
    description: `Articles tagged ${result.term.name}.`,
    alternates: { canonical: `/tag/${result.term.slug}` },
    robots: result.posts.length === 0 ? { index: false, follow: true } : undefined,
  }
}

export default async function TagPage({ params }: Props) {
  const result = await load((await params).slug)
  if (!result) notFound()

  return (
    <>
      <p className="back">
        <Link href="/">← All posts</Link>
      </p>
      <section className="intro">
        <p className="eyebrow">Tag</p>
        <h1>#{result.term.name}</h1>
      </section>
      {result.posts.length === 0 ? (
        <EmptyState title="No published articles with this tag yet.">
          <Link href="/">Browse every article</Link>
        </EmptyState>
      ) : (
        <PostList posts={result.posts} />
      )}
    </>
  )
}
