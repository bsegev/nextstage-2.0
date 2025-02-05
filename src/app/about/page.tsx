'use client';

import dynamic from 'next/dynamic';

// Dynamic imports for components that use browser APIs
const MenuButton = dynamic(() => import('@/components/MenuButton').then(mod => ({ default: mod.MenuButton })), { ssr: false });
const AboutHero = dynamic(() => import('@/components/AboutHero').then(mod => ({ default: mod.AboutHero })), { ssr: false });
const BenIntro = dynamic(() => import('@/components/BenIntro').then(mod => ({ default: mod.BenIntro })), { ssr: false });
const AboutIntro = dynamic(() => import('@/components/AboutIntro').then(mod => ({ default: mod.AboutIntro })), { ssr: false });
const AboutStory = dynamic(() => import('@/components/AboutStory').then(mod => ({ default: mod.AboutStory })), { ssr: false });
const AboutCTA = dynamic(() => import('@/components/AboutCTA').then(mod => ({ default: mod.AboutCTA })), { ssr: false });

export default function AboutPage() {
  return (
    <main className="bg-white">
      <MenuButton />
      <AboutHero />
      <BenIntro />
      <AboutIntro />
      <AboutStory />
      <AboutCTA />
    </main>
  );
} 