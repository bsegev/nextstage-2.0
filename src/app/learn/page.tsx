"use client";

import { motion } from 'framer-motion';
import { LearnHero } from '@/components/learn/LearnHero';
import { ArticleGrid } from '@/components/learn/ArticleGrid';
import { ResourceLibrary } from '@/components/learn/ResourceLibrary';
import { LearnCTA } from '@/components/learn/LearnCTA';
import { LearnBook } from '@/components/learn/LearnBook';
import { MenuButton } from '@/components/homepage/MenuButton';
import { Modal } from '@/components/ui/animated-modal';

export default function LearnPage() {
  return (
    <>
      <Modal>
        <MenuButton />
      </Modal>
      <main className="min-h-screen bg-surface-50">
        <LearnHero />
        <LearnBook />
        <ArticleGrid />
        <ResourceLibrary />
        <LearnCTA />
      </main>
    </>
  );
} 