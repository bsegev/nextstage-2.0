'use client';

import { MenuButton } from '@/components/MenuButton';
import { AboutHero } from '@/components/AboutHero';
import { BenIntro } from '@/components/BenIntro';
import { AboutIntro } from '@/components/AboutIntro';
import { AboutStory } from '@/components/AboutStory';
import { AboutCTA } from '@/components/AboutCTA';

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