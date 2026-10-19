import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { draftMode } from 'next/headers'
import { DraftBanner } from '@/components/DraftBanner'
import { SiteFooter, SiteHeader } from '@/components/SiteHeader'
import { BLOG_DESCRIPTION, BLOG_NAME, SITE_NAME, absoluteUrl } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext', 'vietnamese'], display: 'swap' })

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(absoluteUrl('/')),
    title: { default: `${BLOG_NAME} | ${SITE_NAME}`, template: `%s | ${SITE_NAME}` },
    description: BLOG_DESCRIPTION,
    authors: [{ name: SITE_NAME, url: 'https://adeoluwa.dev' }],
    alternates: {
      canonical: '/',
      types: { 'application/rss+xml': absoluteUrl('/feed.xml') },
    },
    openGraph: {
      type: 'website',
      siteName: `${SITE_NAME} · ${BLOG_NAME}`,
      locale: 'en_US',
      url: '/',
    },
    twitter: { card: 'summary' },
    robots: { index: true, follow: true },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  return (
    <html lang="en" className={inter.className}>
      <body>
        {isEnabled ? <DraftBanner /> : null}
        <div className="shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
