import { menu } from '@/app/utils';
import Link from 'next/link';
import React from 'react';

const Menu = () => {
  return (
    <div className='text-[#949495] text-[10px] tracking-wide uppercase mt-14 hidden lg:flex flex-col gap-10'>
      {menu.map((item) => {
        const { id, name, url } = item;
        return (
          <Link
            key={id}
            href={url}
            className='flex gap-3 items-center hover:text-white hover:font-semibold group'
          >
            <p>0{id}</p>
            <div className='w-[24px] h-[1px] bg-[#949495] group-hover:w-[40px] group-hover:bg-white transition-all duration-300'></div>
            <p className='tracking-[0.3em] font-semibold'>{name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
