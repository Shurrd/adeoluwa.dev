import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { socials } from '../utils';
import { Social } from '@/types';

const Socials = () => {
  return (
    <div className='flex items-center gap-8'>
      <Image
        src={'/profile.png'}
        alt='profile'
        height={50}
        width={50}
        className='rounded-full grayscale'
      />
      {socials.map((social) => {
        const { id, icon: Icon, name, url }: Social = social;
        return (
          <Link
            href={url}
            key={id}
            target='_blank'
            className='flex items-center gap-2 text-[#949495] dark:hover:text-white hover:text-[#212121] transition-all duration-300'
          >
            <Icon size={16} />
            <p className='capitalize'>{name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
