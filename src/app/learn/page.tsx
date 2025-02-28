"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

// Dynamic imports for components that use browser APIs
const MenuButton = dynamic(() => import('@/components/homepage/MenuButton').then(mod => ({ default: mod.MenuButton })), { ssr: false });
const LearnHero = dynamic(() => import('@/components/learn/LearnHero').then(mod => ({ default: mod.LearnHero })), { ssr: false });
const LearnBook = dynamic(() => import('@/components/learn/LearnBook').then(mod => ({ default: mod.LearnBook })), { ssr: false });
const ArticleGrid = dynamic(() => import('@/components/learn/ArticleGrid').then(mod => ({ default: mod.ArticleGrid })), { ssr: false });
const ResourceLibrary = dynamic(() => import('@/components/learn/ResourceLibrary').then(mod => ({ default: mod.ResourceLibrary })), { ssr: false });
const LearnCTA = dynamic(() => import('@/components/learn/LearnCTA').then(mod => ({ default: mod.LearnCTA })), { ssr: false });
const Modal = dynamic(() => import('@/components/ui/animated-modal').then(mod => ({ default: mod.Modal })), { ssr: false });

export default function LearnPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Modal>
        <MenuButton />
      </Modal>
      
      <main className="min-h-screen bg-surface-50">
        <Suspense fallback={<div className="min-h-screen bg-surface-50" />}>
          <LearnHero />
          <LearnBook />
          <ArticleGrid />
          <ResourceLibrary />
          <LearnCTA />
        </Suspense>
      </main>
    </motion.div>
  );
} 