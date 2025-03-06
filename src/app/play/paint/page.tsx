'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { IconBrush } from '@tabler/icons-react';

// Dynamic import for components that use browser APIs
const PlayPaint = dynamic(() => import('@/components/play/PlayPaint').then(mod => ({ default: mod.PlayPaint })), { 
  ssr: false,
  loading: () => <LoadingFallback />
});

const MenuButton = dynamic(() => import('@/components/homepage/MenuButton').then(mod => ({ default: mod.MenuButton })), { 
  ssr: false 
});

function LoadingFallback() {
  return (
    <div className="relative py-16 overflow-hidden">
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-ethereal-dark/95 backdrop-blur-ethereal border border-ethereal-glass-border rounded-2xl shadow-2xl overflow-hidden h-[750px] flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-4 inline-block text-ethereal-text-primary"
              >
                <IconBrush className="w-12 h-12" />
              </motion.div>
              <p className="text-ethereal-text-secondary font-mono">Loading Canvas...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="relative">
      <MenuButton />
      <Suspense fallback={<LoadingFallback />}>
        <PlayPaint />
      </Suspense>
    </main>
  );
} 