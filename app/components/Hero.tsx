import React from 'react';
import Menu from './Menu';
import Socials from './Socials';
import Link from 'next/link';
import { CiMail } from 'react-icons/ci';

const Hero = () => {
  return (
    <div className='lg:fixed lg:z-[999] mt-32 lg:w-1/2 flex flex-col lg:h-[40rem] gap-6 lg:justify-between'>
      <div className='flex flex-col gap-4 text-white'>
        <p className='text-3xl lg:text-4xl font-bold'>
          Adéolúwa Abraham Adéyẹmí
        </p>
        <p className='text-xl lg:text-[22px] font-semibold'>
          Software Engineer
        </p>
        <p className='text-sm text-[#949495] mt-4 lg:pr-56'>
          I specialize in developing{' '}
          <span className='text-white underline'>web</span> and{' '}
          <span className='text-white underline'>mobile</span> applications and
          setting up infrastructure, creating robust and{' '}
          <span className='text-white underline'>scalable</span> solutions.
        </p>
        <Menu />
      </div>
      <Socials />
      <Link
        href={'https://calendly.com/engraaadeyemi/30min?month=2024-07'}
        className='tracking-[0.06em] font-semibold text-[#949495] border-b w-max pb-1 flex items-center gap-4 lg:hidden'
        target='_blank'
      >
        <p>Let's Chat</p>
        <CiMail />
      </Link>
    </div>
  );
};

export default Hero;
