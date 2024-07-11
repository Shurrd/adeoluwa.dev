import React from 'react';
import { projects } from '../utils/projects';
import { Project, Skill, Url } from '@/types';
import { IoBuild } from 'react-icons/io5';
import Link from 'next/link';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const Projects = () => {
  return (
    <div className='lg:mt-32 lg:w-2/5 flex flex-col gap-3 group'>
      {projects.map((project) => {
        const { id, name, description, skills, isMaintaining, urls }: Project =
          project;
        return (
          <div
            key={id}
            className='project-card bg-[#949495] dark:bg-[#16161a] flex flex-col gap-3 p-12 relative transition-all duration-300 group-hover:blur-[2px] hover:!blur-none hover:scale-[1.08]'
          >
            <div className='flex flex-row flex-wrap items-center gap-3'>
              {skills.map((skill) => {
                const { id, label }: Skill = skill;
                return (
                  <p
                    key={id}
                    className='text-white text-[10px] tracking-[0.14em] uppercase font-bold'
                  >
                    {label}
                  </p>
                );
              })}
            </div>
            <p className='text-2xl font-semibold'>{name}</p>
            <p className='dark:text-[#949495] text-sm tracking-wider '>
              {description}
            </p>
            <div className='flex flex-wrap gap-4 capitalize'>
              {urls.map((url) => {
                const { id, url: link, name, icon: Icon }: Url = url;
                return (
                  <Link
                    key={id}
                    href={link}
                    target='_blank'
                    className='flex items-center gap-2 dark:text-[#949495] dark:hover:text-white transition-all duration-300 hover:text-white text-sm'
                  >
                    <p>{name}</p>
                    <Icon />
                  </Link>
                );
              })}
            </div>
            {isMaintaining && (
              <div className='bg-[#DDAB19] absolute top-2 right-2 flex items-center gap-2 text-[#854d0e] px-2 py-1 rounded-md text-sm'>
                <IoBuild />
                <p>Maintenance</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
