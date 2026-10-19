import type { Heading } from '@/lib/headings'

export function TableOfContents({ headings }: { headings: Heading[] }) {
  return (
    <nav className="toc" aria-label="Table of contents">
      <p className="eyebrow">On this page</p>
      <ol>
        {headings.map((heading) => (
          <li key={heading.id} data-level={heading.level}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
