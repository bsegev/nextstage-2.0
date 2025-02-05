"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const rotatingWords = ["design", "strategy", "story", "innovation", "impact"];

export function Hero2() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  };

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -50]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [1, 0]),
    springConfig
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, 0.98]),
    springConfig
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setCursorPosition({ x, y });
    };

    const handleScroll = () => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      setIsInView(rect.top < window.innerHeight && rect.bottom > 0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const wordInterval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[100svh] overflow-hidden bg-surface-50"
    >
      {/* Refined background system */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `
            radial-gradient(
              circle at ${cursorPosition.x * 100}% ${cursorPosition.y * 100}%,
              rgba(var(--primary-rgb) / 0.12),
              transparent 60%
            )
          `
        }}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.08] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-50/0 via-surface-50/30 to-surface-50/60" />
      </div>

      <motion.div 
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] px-4 py-16 sm:py-24 md:py-32"
        style={{ y, opacity, scale }}
      >
        <div className="max-w-[85rem] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex flex-col items-center text-center gap-6 sm:gap-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.1
              }}
              className="relative"
            >
              <h1 className="font-serif tracking-tight text-primary-900 flex flex-col items-center overflow-visible">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mb-6 sm:mb-8 overflow-visible">
                  <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 leading-[1.3] overflow-visible">
                    Idea
                  </span>
                  
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: [0.76, 0, 0.24, 1]
                    }}
                    className="relative w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary-100/30"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.3, 0, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        x: [0, 15, 0],
                        scale: [1, 0.92, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: [0.76, 0, 0.24, 1]
                      }}
                    >
                      <ArrowRightIcon className="w-full h-full text-primary-600" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 rotate-180 text-primary-400/30"
                      animate={{
                        x: [-25, -5, -25],
                        opacity: [0, 0.6, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: [0.76, 0, 0.24, 1]
                      }}
                    >
                      <ArrowRightIcon className="w-full h-full" />
                    </motion.div>
                  </motion.div>
                  
                  <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 leading-[1.3] overflow-visible min-h-[1.3em] flex items-center">
                    reality
                  </span>
                </div>

                <div className="flex flex-col items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl overflow-visible">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-400 to-primary-300 mb-4 leading-[1.3] overflow-visible min-h-[1.3em] flex items-center">
                    through
                  </span>
                  
                  <div className="relative flex items-center min-w-[180px] sm:min-w-[240px] justify-center py-2 overflow-visible min-h-[1.3em]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={rotatingWords[activeWordIndex]}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{
                          y: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 }
                        }}
                        className="absolute flex flex-col items-center overflow-visible w-full"
                      >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-primary-200 capitalize font-medium whitespace-nowrap leading-[1.3] overflow-visible min-h-[1.3em] flex items-center">
                          {rotatingWords[activeWordIndex]}
                        </span>
                        <motion.div 
                          className="h-px w-full bg-gradient-to-r from-transparent via-primary-300/50 to-transparent mt-2"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </h1>

              <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 lg:-inset-12 border border-primary-200/20 rounded-3xl" />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="max-w-[90%] sm:max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-secondary-600/90 font-light leading-relaxed mt-12 sm:mt-16"
              >
                <span className="text-primary-900/80">Transform complex challenges</span>{" "}
                into <span className="text-primary-600">elegant solutions</span> that{" "}
                <span className="text-primary-700">engage</span>,{" "}
                <span className="text-primary-600">inspire</span>, and{" "}
                <span className="text-primary-700">deliver measurable results</span>.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-8 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative group bg-primary-600 text-white rounded-full w-full sm:w-auto",
                  "px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg",
                  "transition-all duration-500 ease-out",
                  "hover:shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.3)]",
                  "after:absolute after:inset-0 after:rounded-full",
                  "after:shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.2)]",
                  "after:opacity-0 after:transition-opacity after:duration-500",
                  "hover:after:opacity-100"
                )}
              >
                <span className="relative z-10">Start Your Journey</span>
                <span className="absolute inset-0 rounded-full overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </span>
              </motion.button>
              
              <motion.a
                href="#process"
                whileHover={{ x: 5 }}
                className={cn(
                  "text-secondary-600 hover:text-primary-600 rounded-full w-full sm:w-auto",
                  "px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg text-center sm:text-left",
                  "transition-colors duration-300",
                  "hover:bg-primary-50/50",
                  "flex items-center justify-center sm:justify-start gap-3"
                )}
              >
                <span>Explore Our Process</span>
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDownIcon className="w-5 h-5" />
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-sm text-secondary-500 tracking-wider font-mono">Scroll to explore</span>
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="w-5 h-5 rounded-full border border-primary-200/30 flex items-center justify-center"
        >
          <motion.div
            animate={{
              y: [0, 3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="w-1 h-1 rounded-full bg-primary-400/50"
          />
        </motion.div>
      </motion.div>
    </div>
  );
} 