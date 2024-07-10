import React from 'react';
import Menu from './Menu';
import Socials from './Socials';

const Hero = () => {
  return (
    <div className='lg:fixed lg:z-[999] mt-32 lg:w-1/2 flex flex-col lg:h-[40rem] gap-6 lg:justify-between'>
      <div className='flex flex-col gap-4'>
        <p className='text-3xl lg:text-4xl font-bold'>
          Adéolúwa Abraham Adéyẹmí
        </p>
        <p className='text-xl lg:text-[22px] font-semibold'>
          Software Engineer
        </p>
        <p className='text-sm text-[#949495] mt-4 lg:pr-56'>
          I specialize in developing{' '}
          <span className='dark:text-white underline text-black'>web</span> and{' '}
          <span className='dark:text-white underline text-black'>mobile</span>{' '}
          applications and setting up infrastructure, creating robust and{' '}
          <span className='dark:text-white underline text-black'>scalable</span>{' '}
          solutions.
        </p>
        <Menu />
      </div>
      <Socials />
    </div>
  );
};

export default Hero;
