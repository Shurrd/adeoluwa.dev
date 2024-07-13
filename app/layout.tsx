import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Adeoluwa',
  description: "Adeoluwa's Portfolio",
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
