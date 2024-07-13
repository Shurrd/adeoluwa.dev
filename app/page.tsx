import React from 'react';
import Projects from './components/Projects';
import Hero from './components/Hero';
import Resume from './components/Resume';

const Page = () => {
  return (
    <div className='w-full rounded-md dark:bg-neutral-950 flex flex-col justify-between antialiased px-4 md:px-8 xl:px-48 py-6 mb-32'>
      <div className='flex flex-col lg:flex-row w-full justify-between gap-16'>
        <Hero />
        <div className='hidden lg:block'></div>
        <div className='lg:mt-32 lg:w-2/5 flex flex-col gap-10'>
          <Projects />
          <Resume />
        </div>
      </div>
    </div>
  );
};

export default Page;
