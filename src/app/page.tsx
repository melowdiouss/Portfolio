'use client';

import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Work from '@/components/sections/Work';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Work />
        <Contact />
      </main>
    </ThemeProvider>
  );
}
