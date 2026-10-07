import React from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Footer from './components/Footer';

const Page = () => {
  return (
    <main className='mx-auto flex w-full max-w-2xl flex-col gap-28 px-6 pb-24 pt-36 antialiased'>
      <Hero />
      <Projects />
      <Resume />
      <Footer />
    </main>
  );
};

export default Page;
