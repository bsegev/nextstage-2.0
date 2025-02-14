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

const ScrollNudge = () => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    let hasScrolled = false;
    const scrollHandler = () => {
      hasScrolled = true;
      setShow(false);
      window.removeEventListener('scroll', scrollHandler);
    };
    
    window.addEventListener('scroll', scrollHandler);
    
    // Show nudge after 5 seconds if no scroll
    const timer = setTimeout(() => {
      if (!hasScrolled) setShow(true);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed bottom-24 right-1/2 translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm text-ethereal-dark/60 font-light">Scroll to explore</span>
            <svg 
              className="w-5 h-5 text-ethereal-dark/40" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
      {showAiEntry ? (
        <AiEntryPoint onComplete={handleEntryComplete} />
      ) : (
        <>
          <MenuButton />
          <Hero />
          <WhoIAm />
          <WhoIWorkWith />
          <HomeCaseStudies />
          <BrandAnatomy />
          <KeyMetrics />
          <ScrollNudge />
          <Outro />
          <FinalCTA />
        </>
      )}
    </main>
  );
}
