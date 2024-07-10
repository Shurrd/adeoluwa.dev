import React from 'react';
import { projects } from '../utils/projects';
import { Project, Skill } from '@/types';

const Projects = () => {
  return (
    <div className='lg:mt-32 lg:w-2/5 flex flex-col gap-3'>
      {projects.map((project) => {
        const { id, name, description, skills, isBuilding }: Project = project;
        return (
          <div
            key={id}
            className='bg-[#16161a] flex flex-col gap-3 p-12 relative'
          >
            <div className='flex flex-row items-center gap-3'>
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
            <p className='text-[#949495] text-sm tracking-wider '>
              {description}
            </p>
            {isBuilding && (
              <p className='absolute top-0 right-0'>Currently Building...</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
