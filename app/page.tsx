import React from 'react';

import { BackgroundBeams } from '@/components/ui/background-beams';

const Page = () => {
  return (
    <div className='h-[40rem] w-full rounded-md dark:bg-neutral-950 relative flex flex-col items-center justify-center antialiased'>
      <div className='max-w-2xl mx-auto p-4'>
        <p className='relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold'>
          Join the waitlist
        </p>
        <BackgroundBeams />
      </div>
    </div>
  );
};

export default Page;
