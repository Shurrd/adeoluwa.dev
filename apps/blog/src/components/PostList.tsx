import Link from 'next/link'
import type { Post } from '@/payload-types'
import { categoryOf, formatDate, formatReadingTime } from '@/lib/postView'

export function PostMeta({ post }: { post: Post }) {
  const category = categoryOf(post)
  return (
    <p className="meta">
      {category ? (
        <>
          <Link href={`/category/${category.slug}`}>{category.name}</Link>
          <span aria-hidden="true">·</span>
        </>
      ) : null}
      <time dateTime={post.publishedAt ?? post.createdAt}>
        {formatDate(post.publishedAt ?? post.createdAt)}
      </time>
      <span aria-hidden="true">·</span>
      <span>{formatReadingTime(post.readingTime)}</span>
    </p>
  )
}

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ol className="post-list">
      {posts.map((post) => (
        <li key={post.id}>
          <article>
            <PostMeta post={post} />
            <h2>
              <Link href={`/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="excerpt">{post.excerpt}</p>
          </article>
        </li>
      ))}
    </ol>
  )
}

export function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="empty">
      <p className="empty-title">{title}</p>
      {children ? <p>{children}</p> : null}
    </div>
  )
}
