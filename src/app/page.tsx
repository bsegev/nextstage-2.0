"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic imports for components that use browser APIs
const Hero = dynamic(() => import('@/components/HeroNEW').then(mod => ({ default: mod.Hero })), { ssr: false });
const ValueProp = dynamic(() => import('@/components/ValueProp').then(mod => ({ default: mod.ValueProp })), { ssr: false });
const WhyImportant = dynamic(() => import('@/components/WhyImportant').then(mod => ({ default: mod.WhyImportant })), { ssr: false });
const TransformationMessage = dynamic(() => import('@/components/TransformationMessage').then(mod => ({ default: mod.TransformationMessage })), { ssr: false });
const CoreOffering = dynamic(() => import('@/components/CoreOffering').then(mod => ({ default: mod.CoreOffering })), { ssr: false });
const FinalCTA = dynamic(() => import('@/components/FinalCTA').then(mod => ({ default: mod.FinalCTA })), { ssr: false });
const Outro = dynamic(() => import('@/components/Outro').then(mod => ({ default: mod.Outro })), { ssr: false });
const AiEntryPoint = dynamic(() => import('@/components/AiEntryPoint').then(mod => ({ default: mod.AiEntryPoint })), { ssr: false });

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <main className="relative">
      <AiEntryPoint onComplete={() => setShowLoader(false)} />
      <AnimatePresence>
        {!showLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Hero />
            <ValueProp />
            <CoreOffering />
            <WhyImportant />
            <TransformationMessage />
            <FinalCTA />
            <Outro />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
