export function DraftBanner() {
  return (
    <div className="draft-banner" role="status">
      <span>Preview mode: unpublished changes may be visible</span>
      {/* A plain anchor on purpose: <Link> would prefetch this route and switch preview off. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/next/exit-preview">Exit preview</a>
    </div>
  )
}
