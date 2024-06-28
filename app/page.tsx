import React from 'react';
import Hero from './components/Hero';

const Page = () => {
  return (
    <div className='h-[40rem] w-full rounded-md dark:bg-neutral-950 relative flex flex-col items-center justify-center antialiased'>
      <div className=''>
        <Hero />
      </div>
    </div>
  );
};

export default Page;
