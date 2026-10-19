import Link from 'next/link'

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null
  const href = (n: number) => (n === 1 ? '/' : `/page/${n}`)
  return (
    <nav className="pagination" aria-label="Pagination">
      {page > 1 ? <Link href={href(page - 1)} rel="prev">← Newer</Link> : <span />}
      <span className="muted">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? <Link href={href(page + 1)} rel="next">Older →</Link> : <span />}
    </nav>
  )
}
