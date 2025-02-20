'use client';

import dynamic from 'next/dynamic';

// Dynamic imports for components that use browser APIs
const MenuButton = dynamic(() => import('@/components/homepage/MenuButton').then(mod => ({ default: mod.MenuButton })), { ssr: false });
const PlayHero = dynamic(() => import('@/components/play/PlayHero').then(mod => ({ default: mod.PlayHero })), { ssr: false });
const PlayExperiments = dynamic(() => import('@/components/play/PlayExperiments').then(mod => ({ default: mod.PlayExperiments })), { ssr: false });
const PlayCTA = dynamic(() => import('@/components/play/PlayCTA').then(mod => ({ default: mod.PlayCTA })), { ssr: false });

export default function Page() {
  return (
    <main className="relative">
      <MenuButton />
      <PlayHero />
      <PlayExperiments />
      <PlayCTA />
    </main>
  );
} 