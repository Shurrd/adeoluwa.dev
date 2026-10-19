import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="intro">
      <p className="eyebrow">404</p>
      <h1>That page doesn’t exist.</h1>
      <p>
        It may have been unpublished or moved. <Link href="/">Back to the blog</Link>.
      </p>
    </section>
  )
}
