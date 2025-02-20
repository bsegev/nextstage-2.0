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
      <section className="relative py-16">
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "2rem" }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="h-px bg-ethereal-dark/20" 
                />
                <span className="font-mono text-sm text-ethereal-dark/60 tracking-wider uppercase">
                  Interactive Paint
                </span>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "2rem" }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="h-px bg-ethereal-dark/20" 
                />
              </div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-ethereal-dark mb-8"
              >
                Digital <span className="aurora-text-gradient-light">Canvas</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-ethereal-dark/70 font-light leading-relaxed"
              >
                Express your creativity with our digital painting tool. Features intuitive controls, multiple brush sizes, and a clean interface for seamless artistic expression.
              </motion.p>
            </motion.div>

            {/* Canvas */}
            <Suspense fallback={<LoadingFallback />}>
              <PlayPaint />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
} 