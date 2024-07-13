import React from 'react';
import { ModeToggle } from './ThemeToggle';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 w-full flex justify-between px-4 md:px-8 xl:px-48 py-6 z-30 bg-[#0a0a0a]'>
      <div>
        <Link href='/'>
          <Image
            src='/logo.svg'
            alt='logo'
            width={80}
            height={80}
            className='bg-gradient-to-r from-[#171a25] to-[#1d1e22] bg-[#e7e7eb] bg-opacity-30 backdrop-blur-lg shadow-lg'
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
