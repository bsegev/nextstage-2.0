"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic imports for components that use browser APIs
const MenuButton = dynamic(() => import('@/components/homepage/MenuButton').then(mod => ({ default: mod.MenuButton })), { ssr: false });
const Hero = dynamic(() => import('@/components/homepage/Hero').then(mod => ({ default: mod.Hero })), { ssr: false });
const AiEntryPoint = dynamic(() => import('@/components/homepage/AiEntryPoint').then(mod => ({ default: mod.AiEntryPoint })), { ssr: false });
const HomeCaseStudies = dynamic(() => import('@/components/homepage/HomeCaseStudies').then(mod => ({ default: mod.HomeCaseStudies })), { ssr: false });
const FinalCTA = dynamic(() => import('@/components/homepage/FinalCTA').then(mod => ({ default: mod.FinalCTA })), { ssr: false });
const Outro = dynamic(() => import('@/components/homepage/Outro').then(mod => ({ default: mod.Outro })), { ssr: false });
const WhoIAm = dynamic(() => import('@/components/homepage/WhoIAm').then(mod => ({ default: mod.WhoIAm })), { ssr: false });
const KeyMetrics = dynamic(() => import('@/components/homepage/KeyMetrics').then(mod => ({ default: mod.KeyMetrics })), { ssr: false });
const WhoIWorkWith = dynamic(() => import('@/components/homepage/WhoIWorkWith').then(mod => ({ default: mod.WhoIWorkWith })), { ssr: false });
const BrandAnatomy = dynamic(() => import('@/components/homepage/BrandAnatomy').then(mod => ({ default: mod.BrandAnatomy })), { ssr: false });
const ReassuranceBanner = dynamic(() => import('@/components/homepage/ReassuranceBanner').then(mod => ({ default: mod.ReassuranceBanner })), { ssr: false });

export default function Home() {
  const [showAiEntry, setShowAiEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has seen the AI entrypoint in this session
    const hasSeenEntry = sessionStorage.getItem('hasSeenAiEntry');
    if (hasSeenEntry) {
      setShowAiEntry(false);
    }
    setIsLoading(false);
  }, []);

  const handleEntryComplete = () => {
    sessionStorage.setItem('hasSeenAiEntry', 'true');
    setShowAiEntry(false);
  };

  if (isLoading) return null;

  return (
    <main className="relative font-['DM_Sans']">
      <AnimatePresence mode="wait">
        {showAiEntry ? (
          <AiEntryPoint onComplete={handleEntryComplete} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Hero />
            <WhoIAm />
            <WhoIWorkWith />
            <ReassuranceBanner />
            <HomeCaseStudies />
            <BrandAnatomy />
            <KeyMetrics />
            <Outro />
            <FinalCTA />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
