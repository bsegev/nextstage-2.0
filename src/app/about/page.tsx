'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Modal } from '@/components/ui/animated-modal';

// Dynamic imports for components that use browser APIs
const MenuButton = dynamic(() => import('@/components/homepage/MenuButton').then(mod => ({ default: mod.MenuButton })), { ssr: false });
const AboutHero = dynamic(() => import('@/components/about/AboutHero').then(mod => ({ default: mod.AboutHero })), { ssr: false });
const AboutBanner = dynamic(() => import('@/components/about/AboutBanner').then(mod => ({ default: mod.AboutBanner })), { ssr: false });
const BenIntro = dynamic(() => import('@/components/about/BenIntro').then(mod => ({ default: mod.BenIntro })), { ssr: false });
const AboutIntro = dynamic(() => import('@/components/about/AboutIntro').then(mod => ({ default: mod.AboutIntro })), { ssr: false });
const AboutStory = dynamic(() => import('@/components/about/AboutStory').then(mod => ({ default: mod.AboutStory })), { ssr: false });
const AboutCTA = dynamic(() => import('@/components/about/AboutCTA').then(mod => ({ default: mod.AboutCTA })), { ssr: false });

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="relative w-full overflow-x-hidden"
    >
      <Modal>
        <MenuButton />
      </Modal>
      
      <main className="min-h-screen w-full bg-surface-50">
        <AboutHero />
        <AboutBanner />
        <BenIntro />
        <AboutIntro />
        <AboutStory />
        <AboutCTA />
      </main>
    </motion.div>
  );
} 