import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Abraham Adeoluwa Adeyemi | Software Engineer',
  description:
    'Abraham Adeoluwa Adeyemi, software engineer. I specialize in developing web and mobile applications and setting up infrastructure, creating robust and scalable solutions.',
  authors: {
    name: 'Abraham Adeyemi',
  },
  keywords:
    'Abraham Adeyemi, Software Engineer, Javascript, Typescript, NextJs, ReactJs, React Native, Frontend Developer, Backend Developer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-[#0a0a0a]`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
