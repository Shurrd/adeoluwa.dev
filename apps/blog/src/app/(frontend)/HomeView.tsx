import { EmptyState, PostList } from '@/components/PostList'
import { Pagination } from '@/components/Pagination'
import { getPublishedPosts } from '@/lib/posts'
import { BLOG_DESCRIPTION } from '@/lib/site'
import { notFound } from 'next/navigation'

export async function HomeView({ page }: { page: number }) {
  const { posts, totalPages } = await getPublishedPosts(page)
  if (page > 1 && posts.length === 0) notFound()

  return (
    <>
      {page === 1 ? (
        <section className="intro">
          <h1>Engineering notes</h1>
          <p>{BLOG_DESCRIPTION}</p>
        </section>
      ) : (
        <section className="intro">
          <h1>Older posts</h1>
        </section>
      )}
      {posts.length === 0 ? (
        <EmptyState title="Nothing published yet.">
          The first article is on its way. In the meantime, the RSS feed will pick it up as soon as it lands.
        </EmptyState>
      ) : (
        <PostList posts={posts} />
      )}
      <Pagination page={page} totalPages={totalPages} />
    </>
  )
}
