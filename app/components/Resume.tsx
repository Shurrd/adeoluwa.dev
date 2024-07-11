import React from 'react';
import { technologies } from '../utils';
import { Technologies } from '@/types';

const Resume = () => {
  return (
    <div
      className='flex flex-col gap-6 h-[30rem] bg-[#949495] dark:bg-[#16161a] p-12'
      id='resume'
    >
      <div className='flex flex-col gap-3'>
        <p className='text-2xl font-semibold'>Software Engineer</p>
        <p className='dark:text-[#949495] text-sm tracking-wider'>
          I’m a software engineer, passionate about transforming ideas into
          innovative solutions. I develop robust applications with user
          experience as a top priority.
        </p>
      </div>

      <div className='flex flex-col gap-3'>
        <p className='text-2xl font-semibold'>Technologies</p>
        <div className='flex flex-row flex-wrap items-center gap-3'>
          {technologies.map((technology) => {
            const { id, name }: Technologies = technology;
            return (
              <p
                key={id}
                className='text-[#949495] text-[10px] tracking-[0.14em] uppercase font-bold'
              >
                {name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Resume;
