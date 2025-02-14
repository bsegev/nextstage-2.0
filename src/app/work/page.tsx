'use client';

import dynamic from 'next/dynamic';

// Dynamic imports for components that use browser APIs
const MenuButton = dynamic(() => import('@/components/homepage/MenuButton').then(mod => ({ default: mod.MenuButton })), { ssr: false });
const WorkHero = dynamic(() => import('@/components/work/WorkHero').then(mod => ({ default: mod.WorkHero })), { ssr: false });
const TransformationMessage = dynamic(() => import('@/components/homepage/TransformationMessage').then(mod => ({ default: mod.TransformationMessage })), { ssr: false });
const WorkProcess = dynamic(() => import('@/components/work/WorkProcess').then(mod => ({ default: mod.WorkProcess })), { ssr: false });
const WorkCTA = dynamic(() => import('@/components/work/WorkCTA').then(mod => ({ default: mod.WorkCTA })), { ssr: false });
const FinalCTA = dynamic(() => import('@/components/homepage/FinalCTA').then(mod => ({ default: mod.FinalCTA })), { ssr: false });

export default function WorkPage() {
  return (
    <main className="relative">
      <MenuButton />
      <WorkHero />
      <WorkProcess />
      <TransformationMessage />
      <WorkCTA />
      <FinalCTA />
    </main>
  );
} 