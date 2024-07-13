'use client';

import { menu } from '@/app/utils';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Menu = () => {
  const pathname = usePathname();
  const [activeUrl, setActiveUrl] = useState<string>(() => {
    if (menu.some((item) => item.url === pathname)) {
      return pathname;
    }
    return menu.find((item) => item.name === 'recent projects')?.url || '';
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 60;

      const localMenuItems = menu.filter(
        (item) => item.url.startsWith('#') && item.url.length > 1
      );

      const sections = localMenuItems.map(
        (item) => document.querySelector(item.url) as HTMLElement
      );

      let foundActive = false;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveUrl(localMenuItems[i].url);
            foundActive = true;
            break;
          }
        }
      }

      if (!foundActive) {
        setActiveUrl(
          menu.find((item) => item.name === 'recent projects')?.url || ''
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (url: string) => {
    if (url.startsWith('#')) {
      setActiveUrl(url);
    }
  };

  return (
    <div className='text-[#949495] text-[10px] tracking-wide uppercase mt-14 hidden lg:flex flex-col gap-10'>
      {menu.map((item) => {
        const { id, name, url } = item;
        const isActive = activeUrl === url;

        return (
          <Link
            key={id}
            href={url}
            className={`flex gap-3 items-center hover:text-white hover:font-semibold group w-max ${
              isActive ? 'text-white font-semibold' : ''
            }`}
            target={name === "let's chat" ? '_blank' : '_self'}
            onClick={() => handleMenuClick(url)}
          >
            <p>0{id}</p>
            <div
              className={`w-[24px] h-[1px] bg-[#949495] ${
                isActive
                  ? 'w-[40px] bg-white'
                  : 'group-hover:w-[40px] group-hover:bg-white transition-all duration-300'
              }`}
            ></div>
            <p className='tracking-[0.3em] font-semibold'>{name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
