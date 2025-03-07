"use client";

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { ValueProp } from "@/components/homepage/ValueProp";
import { Services } from "@/components/homepage/Services";
import { Process } from "@/components/homepage/Process";
import { Testimonials } from "@/components/homepage/Testimonials";

// Use dynamic imports for components that use Lottie or browser APIs
const Hero = dynamic(() => import('@/components/homepage/Hero').then(mod => mod.Hero), { ssr: false });
const KeyMetrics = dynamic(() => import('@/components/homepage/KeyMetrics').then(mod => mod.KeyMetrics), { ssr: false });
const Outro = dynamic(() => import('@/components/homepage/Outro').then(mod => mod.Outro), { ssr: false });
const FinalCTA = dynamic(() => import('@/components/homepage/FinalCTA').then(mod => mod.FinalCTA), { ssr: false });
const AiEntryPoint = dynamic(() => import('@/components/homepage/AiEntryPoint').then(mod => mod.AiEntryPoint), { ssr: false });

// Homepage sections following the new structure:
// 1. Hero (First Impression)
// 2. Value Proposition (Why It Matters)
// 3. Services (How I Help)
// 4. Process (The Journey)
// 5. Key Metrics (The Advantage)
// 6. Social Proof (Trust Signals)
// 7. Outro (Brand Story)
// 8. Final CTA (Action Step)

export default function Home() {
  const [showAiEntry, setShowAiEntry] = useState(true);
  const [mainContentReady, setMainContentReady] = useState(false);

  // Start preloading main content immediately
  useEffect(() => {
    Promise.all([
      // Preload all dynamic components
      Hero,
      KeyMetrics,
      Outro,
      FinalCTA
    ]).then(() => {
      setMainContentReady(true);
    });
  }, []);

  const handleAiComplete = () => {
    // Only transition if main content is ready
    if (mainContentReady) {
      setShowAiEntry(false);
    }
  };

  return (
    <main className="relative font-['DM_Sans']">
      {showAiEntry && (
        <AiEntryPoint 
          onComplete={handleAiComplete} 
        />
      )}
      
      <motion.div
        initial={false}
        animate={{ 
          opacity: showAiEntry ? 0 : 1,
          y: showAiEntry ? 20 : 0
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ 
          display: showAiEntry ? 'none' : 'block'
        }}
      >
        <Hero />
        <ValueProp />
        <Services />
        <Process />
        <KeyMetrics />
        <Testimonials />
        <Outro />
        <FinalCTA />
      </motion.div>
    </main>
  );
}
