import React from 'react';
import SparklesText from '@/components/ui/sparkles-text';

const Page = () => {
  return (
    <div className='h-[40rem] w-full rounded-md dark:bg-neutral-950 relative flex flex-col items-center justify-center antialiased'>
      <div className='max-w-2xl mx-auto p-4'>
        <SparklesText text='Join the Waitlist' />
      </div>
    </div>
  );
};

export default Page;
