import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

const NotFound = () => {
  return (
    <main className='mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 pb-24 pt-36 text-white antialiased'>
      <p className='rise text-sm text-[#6b6b6e]'>404</p>
      <h1
        className='rise text-3xl font-semibold tracking-[-0.03em] sm:text-[2.6rem] sm:leading-[1.1]'
        style={{ animationDelay: '80ms' }}
      >
        This page doesn&apos;t exist.
      </h1>
      <p
        className='rise max-w-xl text-[15px] leading-relaxed text-[#b4b4b8]'
        style={{ animationDelay: '160ms' }}
      >
        The link may be broken or the page may have moved.
      </p>
      <Link
        href='/'
        className='rise press w-max text-sm text-white underline underline-offset-4 decoration-white/30 transition-colors hover:decoration-white'
        style={{ animationDelay: '240ms' }}
      >
        Back to home
      </Link>
    </main>
  );
};

export default NotFound;
