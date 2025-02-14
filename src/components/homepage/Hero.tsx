'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MenuButton } from './MenuButton';

// Updated words to align with new positioning
const words = ["Strategy", "Vision", "Impact", "Growth", "Future", "Success"];
const WORD_DURATION = 2.5;

const auroraAnimation = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
    repeatType: "reverse"
  }
};

// Moved BackgroundShapes directly into Hero.tsx
const BackgroundShapes = () => {
  const floatingAnimation = {
    y: [0, -15, 0],
    x: [0, 10, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Square */}
      <motion.div
        className="absolute w-32 h-32 border border-ethereal-dark/30"
        style={{
          top: '15%',
          right: '10%',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          ...floatingAnimation,
          transition: {
            ...floatingAnimation.transition,
            delay: 1
          }
        }}
      />
      
      {/* Triangle */}
      <motion.div
        className="absolute w-32 h-32 border border-ethereal-dark/30"
        style={{
          top: '35%',
          left: '15%',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          ...floatingAnimation,
          transition: {
            ...floatingAnimation.transition,
            delay: 1.2,
            duration: 7
          }
        }}
      />
      
      {/* Cone */}
      <motion.div
        className="absolute w-28 h-28 border border-ethereal-dark/30"
        style={{
          bottom: '25%',
          right: '20%',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          ...floatingAnimation,
          transition: {
            ...floatingAnimation.transition,
            delay: 1.4,
            duration: 8
          }
        }}
      />
      
      {/* Pentagon */}
      <motion.div
        className="absolute w-24 h-24 border border-ethereal-dark/30"
        style={{
          top: '60%',
          left: '25%',
          clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          ...floatingAnimation,
          transition: {
            ...floatingAnimation.transition,
            delay: 1.6,
            duration: 9
          }
        }}
      />

      {/* Circle */}
      <motion.div
        className="absolute w-36 h-36 border border-ethereal-dark/30 rounded-full"
        style={{
          top: '25%',
          right: '30%',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          ...floatingAnimation,
          transition: {
            ...floatingAnimation.transition,
            delay: 1.8,
            duration: 7.5
          }
        }}
      />

      {/* Grid */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 2 }}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(var(--primary-rgb), 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--primary-rgb), 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </motion.div>
  );
};

// Add scroll helper function
const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

export const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Simplified scroll animations
  const backgroundScale = useTransform(scrollYProgress, 
    [0, 1], 
    [1, 1.05]
  );
  
  const fadeOut = useTransform(scrollYProgress,
    [0, 0.25],
    [1, 0]
  );

  // Word rotation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, WORD_DURATION * 1000);

    return () => clearInterval(timer);
  }, []);

  // Video ended handler
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', () => {
        setVideoEnded(true);
      });
    }
  }, []);

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden font-['DM_Sans'] select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <MenuButton />
      
      {/* Keep video background but update final frame */}
      <div className="absolute inset-0 select-none" style={{ zIndex: 0 }}>
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ scale: backgroundScale }}
        >
          <source src="/videos/ns_hero_bg_vid (1).mp4" type="video/mp4" />
        </motion.video>
        
        <motion.img
          src="/video_finalframe.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            scale: backgroundScale,
            opacity: videoEnded ? 1 : 0,
            transition: 'opacity 0.5s ease-out'
          }}
        />
      </div>

      {/* Keep existing overlays */}
      <motion.div 
        className="absolute inset-0 backdrop-blur-[1px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        style={{ 
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 240, 0.65)',
          scale: backgroundScale
        }}
      />

      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-aurora-vivid"
        style={{ zIndex: 2 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
      />

      <BackgroundShapes />

      {/* Updated content section */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Updated tagline */}
          <motion.div 
            className="overflow-hidden mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span 
              className="inline-block font-mono text-sm aurora-text-gradient-light"
              initial={{ y: 20 }}
              animate={{ 
                y: 0,
                ...auroraAnimation.animate 
              }}
              transition={{ 
                y: { duration: 0.5, delay: 0.3 },
                backgroundPosition: auroraAnimation.transition
              }}
              style={{
                backgroundSize: "200% auto",
              }}
            >
              Strategic Design & Innovation
            </motion.span>
          </motion.div>

          {/* Updated main headline */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight">
            <div className="h-[1.2em] relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWordIndex}
                  className="absolute inset-0"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{
                    y: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.3 }
                  }}
                >
                  <motion.div 
                    className="relative font-['Caveat'] text-transparent"
                    style={{ WebkitTextStroke: '1px rgba(28, 28, 28, 0.8)' }}
                  >
                    {words[currentWordIndex].split('').map((letter, index) => (
                      <motion.span
                        key={index}
                        className="inline-block relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.2,
                          delay: index * 0.1,
                          ease: "easeOut"
                        }}
                      >
                        <motion.span
                          className="absolute top-0 left-0 text-black"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1,
                            ease: "easeOut"
                          }}
                          style={{
                            transformOrigin: "left"
                          }}
                        >
                          {letter}
                        </motion.span>
                        {letter}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.span
              className="block text-transparent bg-clip-text relative"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.span
                className="absolute inset-0 aurora-text-gradient-light opacity-50"
                animate={auroraAnimation.animate}
                transition={auroraAnimation.transition}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                Solving Today.<br />Building Tomorrow.
              </motion.span>
              <motion.span
                className="absolute inset-0 aurora-text-gradient-light"
                animate={auroraAnimation.animate}
                transition={{
                  ...auroraAnimation.transition,
                  delay: 0.5
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                Solving Today.<br />Building Tomorrow.
              </motion.span>
              <span className="relative aurora-text-gradient-light">
                Solving Today.<br />Building Tomorrow.
              </span>
            </motion.span>
          </h1>

          <motion.div
            className="h-px bg-gradient-to-r from-ethereal-dark/50 to-transparent my-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />

          {/* Updated subtitle */}
          <motion.p 
            className="mt-8 text-xl sm:text-2xl text-ethereal-dark/90 font-sans font-light leading-relaxed tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            I solve problems in real time—bridging strategy, design, and execution to build what's next.
          </motion.p>

          {/* Updated CTA */}
          <motion.div
            className="mt-16 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 transition-all duration-300 rounded-xl overflow-hidden shadow-lg"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#34D399] opacity-10"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              />
              <span className="relative z-10 font-mono text-lg text-[#FFFFF0]">Let's Build Something Remarkable</span>
            </motion.button>

            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <motion.button
                onClick={() => scrollToElement('case-studies')}
                whileHover={{ opacity: 1, y: -1 }}
                className="font-mono text-sm text-[#1C1C1C] hover:aurora-text-gradient-light transition-all duration-300"
              >
                View My Work
              </motion.button>
              <div className="h-4 w-px bg-[#1C1C1C]/20" />
              <motion.button
                onClick={() => scrollToElement('contact')}
                whileHover={{ opacity: 1, y: -1 }}
                className="font-mono text-sm text-[#1C1C1C] hover:aurora-text-gradient-light transition-all duration-300"
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Keep floating elements */}
      <motion.div
        className="absolute top-1/4 right-[15%] w-24 h-24 border border-ethereal-dark/20 rounded-full"
        style={{
          zIndex: 2,
          background: 'radial-gradient(circle at center, rgba(28, 28, 28, 0.05), transparent)',
          opacity: fadeOut
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[15%] w-16 h-16 border border-ethereal-dark/20"
        style={{
          zIndex: 2,
          background: 'linear-gradient(45deg, rgba(28, 28, 28, 0.05), transparent)',
          transform: 'rotate(45deg)',
          opacity: fadeOut
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      />
    </motion.section>
  );
}; 