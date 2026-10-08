import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
});

const siteUrl = 'https://adeoluwa.dev';
const title = 'Abraham Adeoluwa Adeyemi | Software Engineer';
const description =
  'Abraham Adeoluwa Adeyemi, software engineer. I specialize in developing web and mobile applications and setting up infrastructure, creating robust and scalable solutions.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | Abraham Adeyemi' },
  description,
  applicationName: 'Abraham Adeyemi',
  authors: [{ name: 'Abraham Adeyemi', url: siteUrl }],
  creator: 'Abraham Adeyemi',
  keywords: [
    'Abraham Adeyemi',
    'Adeoluwa Adeyemi',
    'Software Engineer',
    'Lagos',
    'Nigeria',
    'JavaScript',
    'TypeScript',
    'Next.js',
    'React',
    'React Native',
    'Frontend Developer',
    'Backend Developer',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Abraham Adeyemi',
    title,
    description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Abraham Adeoluwa Adeyemi',
  url: siteUrl,
  image: `${siteUrl}/profile.png`,
  jobTitle: 'Software Engineer',
  description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  },
  sameAs: [
    'https://www.linkedin.com/in/shurrd/',
    'https://github.com/shurrd',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-[#0a0a0a]`}>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
