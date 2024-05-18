import { HeroParallax } from '@/components/ui/hero-parallax';
import React from 'react';
import { projects } from '../utils/projects';

const Hero = () => {
  return (
    <div className='border border-red-400'>
      <HeroParallax products={projects} />;
    </div>
  );
};

export default Hero;
