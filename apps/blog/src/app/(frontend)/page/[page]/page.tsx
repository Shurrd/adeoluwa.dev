import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HomeView } from '../../HomeView'

export const revalidate = 3600

// Rendered on first request, then cached and revalidated like the statically generated pages.
export async function generateStaticParams() {
  return []
}

type Props = { params: Promise<{ page: string }> }

const parsePage = (value: string) => (/^[1-9]\d{0,3}$/.test(value) ? Number(value) : null)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parsePage((await params).page)
  return { title: `Older posts, page ${page ?? ''}`.trim(), alternates: { canonical: `/page/${page}` } }
}

export default async function PagedHome({ params }: Props) {
  const page = parsePage((await params).page)
  // /page/1 is a duplicate of "/"; treat anything outside the real range as missing.
  if (!page || page === 1) notFound()
  return <HomeView page={page} />
}
