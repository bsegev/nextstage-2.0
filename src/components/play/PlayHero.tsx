'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export function PlayHero() {
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
    [0, isMobile ? 0.25 : 0.25, isMobile ? 1 : 0.5],
    [1, 1, 0]
  );

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden font-['DM_Sans']"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/play-hero-bg.mp4" type="video/mp4" />
      </video>

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
                Experiments
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
          <h1 className="font-serif text-4xl md:text-7xl font-bold leading-tight text-center sm:text-left">
            <motion.span
              className="block text-ethereal-dark"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              Where Ideas
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
                Take Flight
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
                Take Flight
              </motion.span>
              <span className="relative aurora-text-gradient-light">
                Take Flight
              </span>
            </motion.span>
          </h1>

          {/* Description */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="mt-8 text-lg sm:text-xl md:text-2xl text-ethereal-dark/90 font-light leading-relaxed tracking-tight font-sans text-center sm:text-left"
            >
              A creative lab where design, technology, and strategy converge—transforming raw ideas into tangible innovations that shape tomorrow's possibilities.
            </motion.p>

            {/* CTA Section */}
            <motion.div 
              className="mt-12 flex flex-col items-center sm:items-start gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 transition-all duration-300 rounded-xl overflow-hidden shadow-lg"
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
                <span className="relative z-10 font-mono text-lg text-[#FFFFF0] flex items-center gap-3">
                  <span>Explore Experiments</span>
                  <motion.span 
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >→</motion.span>
                </span>
              </motion.button>
              
              {/* Scroll Indicator */}
              <motion.div 
                className="flex items-center justify-center w-full mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <motion.div
                  className="cursor-pointer"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  onClick={() => {
                    const nextSection = document.querySelector('section:nth-of-type(2)');
                    if (nextSection) {
                      nextSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    y: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* First Chevron */}
                    <motion.path
                      d="M8 16 L24 32 L40 16"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="url(#playChevronGradient)"
                      className="drop-shadow-lg"
                      initial={{ pathLength: 0, opacity: 0.4 }}
                      animate={{ 
                        pathLength: [0, 1, 1, 0],
                        opacity: [0.4, 1, 1, 0.4]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.4, 0.6, 1]
                      }}
                    />
                    
                    {/* Second Chevron */}
                    <motion.path
                      d="M8 8 L24 24 L40 8"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="url(#playChevronGradient)"
                      className="drop-shadow-lg"
                      initial={{ pathLength: 0, opacity: 0.4 }}
                      animate={{ 
                        pathLength: [0, 1, 1, 0],
                        opacity: [0.4, 1, 1, 0.4]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.4, 0.6, 1],
                        delay: 0.35
                      }}
                    />

                    {/* Gradient Definitions */}
                    <defs>
                      <linearGradient id="playChevronGradient" x1="8" y1="8" x2="40" y2="32" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#3B82F6">
                          <animate
                            attributeName="stop-color"
                            values="#3B82F6;#8B5CF6;#10B981;#3B82F6"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </stop>
                        <stop offset="50%" stopColor="#8B5CF6">
                          <animate
                            attributeName="stop-color"
                            values="#8B5CF6;#10B981;#3B82F6;#8B5CF6"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </stop>
                        <stop offset="100%" stopColor="#10B981">
                          <animate
                            attributeName="stop-color"
                            values="#10B981;#3B82F6;#8B5CF6;#10B981"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
} 