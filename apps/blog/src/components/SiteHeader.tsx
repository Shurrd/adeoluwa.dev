import Link from 'next/link'
import { PORTFOLIO_URL } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        adeoluwa<span>.dev</span> / blog
      </Link>
      <nav aria-label="Site">
        <Link href="/feed.xml">RSS</Link>
        <a href={PORTFOLIO_URL}>Portfolio ↗</a>
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Adéolúwa Abraham Adéyẹmí</span>
      <a href={PORTFOLIO_URL}>adeoluwa.dev</a>
    </footer>
  )
}
