"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic imports for components that use browser APIs
const MenuButton = dynamic(() => import('@/components/MenuButton').then(mod => ({ default: mod.MenuButton })), { ssr: false });
const Hero = dynamic(() => import('@/components/HeroNEW').then(mod => ({ default: mod.Hero })), { ssr: false });
const AiEntryPoint = dynamic(() => import('@/components/AiEntryPoint').then(mod => ({ default: mod.AiEntryPoint })), { ssr: false });
const ValueProp = dynamic(() => import('@/components/ValueProp').then(mod => ({ default: mod.ValueProp })), { ssr: false });
const KeyMetrics = dynamic(() => import('@/components/KeyMetrics').then(mod => ({ default: mod.KeyMetrics })), { ssr: false });
const ProcessFlow = dynamic(() => import('@/components/ProcessFlow').then(mod => ({ default: mod.ProcessFlow })), { ssr: false });
const TransformationMessage = dynamic(() => import('@/components/TransformationMessage').then(mod => ({ default: mod.TransformationMessage })), { ssr: false });
const CoreOffering = dynamic(() => import('@/components/CoreOffering').then(mod => ({ default: mod.CoreOffering })), { ssr: false });
const FinalCTA = dynamic(() => import('@/components/FinalCTA').then(mod => ({ default: mod.FinalCTA })), { ssr: false });
const Outro = dynamic(() => import('@/components/Outro').then(mod => ({ default: mod.Outro })), { ssr: false });
const WorkTogether = dynamic(() => import('@/components/WorkTogether').then(mod => ({ default: mod.WorkTogether })), { ssr: false });

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
    <main className="relative">
      {showAiEntry ? (
        <AiEntryPoint onComplete={handleEntryComplete} />
      ) : (
        <>
          <MenuButton />
          <Hero />
          <ScrollNudge />
          <ValueProp />
          <TransformationMessage />
          <CoreOffering />
          <KeyMetrics />
          <ProcessFlow />
          <WorkTogether />
          <FinalCTA />
          <Outro />
        </>
      )}
    </main>
  );
}
