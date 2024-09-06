import React from 'react';
import { experiences, technologies } from '../utils';
import { Descriptions, Experiences, Technologies } from '@/types';

const Resume = () => {
  return (
    <>
      <p className='text-white text-[14px] tracking-[0.14em] uppercase font-bold lg:hidden'>
        Resume
      </p>
      <div
        className='flex flex-col gap-6 bg-[#16161a] p-12 text-white'
        id='resume'
      >
        <div className='flex flex-col gap-3'>
          <p className='text-2xl font-semibold'>Software Engineer</p>
          <p className='text-[#949495] text-sm tracking-wider'>
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

        <div className='flex flex-col gap-3'>
          <p className='text-2xl font-semibold'>Experiences</p>
          <div className='flex flex-col gap-6 text-sm'>
            {experiences.map((experience) => {
              const { id, company, title, date, descriptions }: Experiences =
                experience;
              return (
                <div key={id} className='flex flex-col gap-2'>
                  <p className='text-xs tracking-[0.14em] uppercase font-bold'>
                    {company} - {title}
                  </p>
                  <p className='text-[#949495] text-[10px] tracking-[0.14em] uppercase font-bold'>
                    {date}
                  </p>
                  <div className='flex flex-col gap-2'>
                    {descriptions.map((item) => {
                      const { id, description }: Descriptions = item;
                      return (
                        <p key={id} className='text-[#949495] text-sm'>
                          - {description}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
