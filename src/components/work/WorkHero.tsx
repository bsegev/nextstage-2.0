'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export function WorkHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const fadeOut = useTransform(
    scrollYProgress,
    [0, isMobile ? 0.5 : 0.25],  // Adjust fade points based on device
    [1, 0]
  );

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden font-['DM_Sans']"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Video Background with enhanced interaction */}
      <div className="absolute inset-0 select-none" style={{ zIndex: 0 }}>
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center sm:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <source src="/videos/work-hero-bg.mp4" type="video/mp4" />
        </motion.video>
      </div>

      {/* Frosted Glass Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95 backdrop-blur-sm z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        style={{ opacity: fadeOut }}
      />
      
      {/* Content Container */}
      <motion.div 
        className="container mx-auto px-4 py-24 relative z-10"
        style={{ opacity: fadeOut }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-ethereal-dark/20" 
              />
              <span className="font-mono text-sm text-ethereal-dark/60 tracking-wider uppercase">
                Selected Work
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-ethereal-dark/20" 
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-center sm:text-left mb-6 relative space-y-2"
          >
            <motion.span
              className="block text-ethereal-dark"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              Transforming ideas into
            </motion.span>
            <motion.span
              className="block relative"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.span
                className="absolute inset-0 aurora-text-gradient-light opacity-50"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                impactful solutions
              </motion.span>
              <motion.span
                className="absolute inset-0 aurora-text-gradient-light"
                animate={{
                  backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                impactful solutions
              </motion.span>
              <span className="relative aurora-text-gradient-light">
                impactful solutions
              </span>
            </motion.span>
          </motion.h1>

          {/* Description */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="mt-8 text-xl sm:text-2xl text-ethereal-dark/90 font-light leading-relaxed tracking-tight"
            >
              A curated collection of projects that showcase how strategic design and technical expertise come together to create meaningful impact. Each case study reveals the journey from challenge to solution.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
} 