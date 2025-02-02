'use client';

import { MenuButton } from '@/components/MenuButton';
import { AboutHero } from '@/components/AboutHero';
import { BenIntro } from '@/components/BenIntro';
import { AboutIntro } from '@/components/AboutIntro';
import { AboutStory } from '@/components/AboutStory';
import { AboutCTA } from '@/components/AboutCTA';

// Client-side wrapper for MenuButton
const ClientMenuButton = () => {
  return <MenuButton />;
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <ClientMenuButton />
      <AboutHero />
      <BenIntro />
      <AboutIntro />
      <AboutStory />
      <AboutCTA />
    </main>
  );
} 