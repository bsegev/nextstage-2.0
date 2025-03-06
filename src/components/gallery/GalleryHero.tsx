"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export function GalleryHero() {
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
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-ethereal-dark to-ethereal-dark/90" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
        
        {/* Animated gradient sweep */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            backgroundImage: "linear-gradient(45deg, rgba(56, 189, 248, 0.15) 0%, rgba(129, 140, 248, 0.15) 50%, rgba(52, 211, 153, 0.15) 100%)",
            backgroundSize: "400% 400%",
          }}
        />

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl"
            animate={{
              x: ["-25%", "25%"],
              y: ["-25%", "25%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              left: "25%",
              top: "25%",
            }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl"
            animate={{
              x: ["25%", "-25%"],
              y: ["25%", "-25%"],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1,
            }}
            style={{
              right: "25%",
              bottom: "25%",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 py-24 relative z-10"
        style={{ opacity: fadeOut }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 justify-center">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-white/20" 
              />
              <span className="font-mono text-sm text-white/60 tracking-wider uppercase">
                AI Art Gallery
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-white/20" 
              />
            </div>
          </motion.div>

          {/* Title */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight">
            <motion.span
              className="block text-white"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              Where AI Meets
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
                Artistry
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
                Artistry
              </motion.span>
              <span className="relative aurora-text-gradient-light">
                Artistry
              </span>
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mt-8 text-xl sm:text-2xl text-white/80 font-light leading-relaxed tracking-tight font-sans max-w-3xl mx-auto"
          >
            Explore a curated collection of AI-generated artworks spanning multiple mediums and styles, pushing the boundaries of digital creativity.
          </motion.p>

          {/* CTA Button */}
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-white/10 hover:bg-white/15 transition-all duration-300 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm border border-white/10"
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
              <span className="relative z-10 font-mono text-lg text-white flex items-center gap-3">
                <span>Explore Gallery</span>
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
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
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
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* First Chevron */}
            <motion.path
              d="M8 16 L24 32 L40 16"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="url(#galleryChevronGradient)"
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
              stroke="url(#galleryChevronGradient)"
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
                delay: 0.5,
                times: [0, 0.4, 0.6, 1]
              }}
            />
            
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="galleryChevronGradient" x1="8" y1="8" x2="40" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
    </motion.section>
  );
} 