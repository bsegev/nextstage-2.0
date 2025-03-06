'use client';

import { motion, useScroll, useTransform, useAnimationControls, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Code2, Palette } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const highlights = [
  {
    icon: Sparkles,
    text: "strategy",
    color: "from-blue-500/20 to-transparent"
  },
  {
    icon: Palette,
    text: "design",
    color: "from-purple-500/20 to-transparent"
  },
  {
    icon: Code2,
    text: "technology",
    color: "from-emerald-500/20 to-transparent"
  }
];

const CircleAnimation = () => {
  const controls = useAnimationControls();
  const isMountedRef = useRef(true);
  const animationRef = useRef<{
    timeout?: NodeJS.Timeout;
  }>({});
  
  useEffect(() => {
    isMountedRef.current = true;

    const animate = async () => {
      if (!isMountedRef.current) return;

      try {
        await controls.start({
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          pathLength: 0,
          transition: { duration: 0 }
        });

        animationRef.current.timeout = setTimeout(async () => {
          if (!isMountedRef.current) return;

          const runAnimation = async () => {
            if (!isMountedRef.current) return;
            try {
              await controls.start({
                pathLength: 1,
                transition: { duration: 1.5, ease: "easeInOut" }
              });

              if (!isMountedRef.current) return;

              await controls.start({
                rotateX: 45,
                rotateY: 45,
                scale: 0.8,
                transition: { duration: 2, ease: "easeInOut" }
              });

              if (!isMountedRef.current) return;

              await new Promise(resolve => setTimeout(resolve, 1000));

              if (!isMountedRef.current) return;

              await controls.start({
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                transition: { duration: 2, ease: "easeInOut" }
              });

              if (!isMountedRef.current) return;

              await controls.start({
                pathLength: 0,
                transition: { duration: 1.5, ease: "easeInOut" }
              });

              if (isMountedRef.current) {
                runAnimation();
              }
            } catch (e) {
              // Ignore animation errors during unmount
            }
          };

          runAnimation();
        }, 500);
      } catch (error) {
        if (isMountedRef.current) {
          console.error('Animation error:', error);
        }
      }
    };

    animate();

    return () => {
      isMountedRef.current = false;
      if (animationRef.current.timeout) {
        clearTimeout(animationRef.current.timeout);
      }
      controls.stop();
    };
  }, [controls]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-96 h-96 preserve-3d">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400/30"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1, 0.8] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.svg
          className="absolute inset-0 w-full h-full"
          initial={{ pathLength: 0, rotateX: 0, rotateY: 0, scale: 1 }}
          animate={controls}
        >
          <defs>
            <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="animate-gradient-shift" style={{ stopColor: '#60A5FA', stopOpacity: 0.4 }} />
              <stop offset="50%" className="animate-gradient-shift" style={{ stopColor: '#818CF8', stopOpacity: 0.4 }} />
              <stop offset="100%" className="animate-gradient-shift" style={{ stopColor: '#60A5FA', stopOpacity: 0.4 }} />
            </linearGradient>
          </defs>
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="url(#circleGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={controls}
          />
        </motion.svg>

        <motion.div
          className="absolute inset-0"
          animate={controls}
        >
          {[0, 90, 180, 270].map((rotation, i) => (
            <motion.div
              key={rotation}
              className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-400/30 to-transparent origin-left"
              style={{ rotate: rotation }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const words = [
  "one-time-asset",
  "website",
  "deck",
  "prototype",
  "template",
  "post",
  "plan",
  "blog",
  "video",
  "document",
];
const WORD_DURATION = 3.5;

export function ValueProp() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [hoveredHighlight, setHoveredHighlight] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = 1;

  // Word rotation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, WORD_DURATION * 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-visible">
      {/* Background Elements - Adjusted for mobile */}
      <div className="absolute inset-0 -z-30 overflow-visible">
        {/* Animated gradient orbs - Mobile optimized positions */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 -left-1/3 w-2/3 h-2/3 bg-blue-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-1/3 -right-1/3 w-2/3 h-2/3 bg-purple-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-1/4 left-1/4 w-2/3 h-2/3 bg-emerald-200/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Base background */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.02),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
      </div>

      <motion.div 
        className="container relative mx-auto px-6 sm:px-8 lg:px-10 z-50 overflow-visible"
        style={{ y }}
      >
        <div className="mx-auto max-w-7xl overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center overflow-visible">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-visible mx-auto lg:mx-0 max-w-xl lg:max-w-none text-left px-4 sm:px-6 lg:px-0"
            >
              {/* Label */}
              <motion.div 
                className="flex items-center gap-2 sm:gap-3 mb-6 mx-auto lg:mx-0 w-fit lg:w-auto"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div 
                  className="h-px w-6 sm:w-8 bg-gradient-to-r from-blue-500/80 to-purple-500/80"
                  initial={{ width: 0 }}
                  whileInView={{ width: "2rem" }}
                  transition={{ duration: 0.8 }}
                />
                <span className="font-mono text-xs sm:text-sm tracking-wider text-ethereal-dark uppercase">
                  The Difference
                </span>
                <motion.div 
                  className="h-px w-6 sm:w-8 bg-gradient-to-r from-purple-500/80 to-emerald-500/80"
                  initial={{ width: 0 }}
                  whileInView={{ width: "2rem" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>

              {/* Headline */}
              <div className="relative mb-8 sm:mb-12 overflow-visible">
                <h2 className="text-[2rem] sm:text-4xl lg:text-5xl font-serif text-ethereal-dark overflow-visible text-left pl-4 sm:pl-6 lg:pl-8">
                  Most will make you a{' '}
                  <div className="inline-block h-[1.2em] relative overflow-visible min-w-[200px] sm:min-w-[280px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentWordIndex}
                        className="absolute whitespace-nowrap"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{
                          y: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.3 }
                        }}
                      >
                        <motion.div 
                          className="relative font-['Caveat'] text-transparent text-[110%] sm:text-[115%] whitespace-nowrap"
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
                  <br />
                  <span className="relative inline-flex items-center">
                    <motion.div
                      className="mr-2 sm:mr-3"
                      initial={{ x: 0 }}
                      animate={{ x: [-4, 0, -4] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* First Chevron */}
                        <motion.path
                          d="M12 8 L20 16 L12 24"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          stroke="url(#forwardGradient)"
                          className="drop-shadow-lg"
                          initial={{ pathLength: 0, opacity: 0.4 }}
                          animate={{ 
                            pathLength: [0, 1, 1, 0],
                            opacity: [0.4, 1, 1, 0.4]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.4, 0.6, 1]
                          }}
                        />
                        
                        {/* Second Chevron */}
                        <motion.path
                          d="M6 8 L14 16 L6 24"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          stroke="url(#forwardGradient)"
                          className="drop-shadow-lg"
                          initial={{ pathLength: 0, opacity: 0.4 }}
                          animate={{ 
                            pathLength: [0, 1, 1, 0],
                            opacity: [0.4, 1, 1, 0.4]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.4, 0.6, 1],
                            delay: 0.25
                          }}
                        />

                        {/* Gradient Definitions */}
                        <defs>
                          <linearGradient id="forwardGradient" x1="6" y1="8" x2="20" y2="24" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#3B82F6">
                              <animate
                                attributeName="stop-color"
                                values="#3B82F6;#8B5CF6;#10B981;#3B82F6"
                                dur="3s"
                                repeatCount="indefinite"
                              />
                            </stop>
                            <stop offset="50%" stopColor="#8B5CF6">
                              <animate
                                attributeName="stop-color"
                                values="#8B5CF6;#10B981;#3B82F6;#8B5CF6"
                                dur="3s"
                                repeatCount="indefinite"
                              />
                            </stop>
                            <stop offset="100%" stopColor="#10B981">
                              <animate
                                attributeName="stop-color"
                                values="#10B981;#3B82F6;#8B5CF6;#10B981"
                                dur="3s"
                                repeatCount="indefinite"
                              />
                            </stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                    <span className="aurora-text-gradient-light">
                      Nextstage builds assets that move you forward
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </span>
                  </span>
                </h2>
              </div>

              {/* Highlight pills - Mobile optimization */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.text}
                    className="relative"
                    onHoverStart={() => setHoveredHighlight(index)}
                    onHoverEnd={() => setHoveredHighlight(null)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`
                        px-4 sm:px-6 py-2 rounded-full
                        border border-gray-200 shadow-lg
                        flex items-center gap-2
                        bg-white/80
                        transition-all duration-300
                      `}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <highlight.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-ethereal-dark" />
                      <span className="font-mono text-xs sm:text-sm text-ethereal-dark">
                        {highlight.text}
                      </span>
                    </motion.div>
                    {hoveredHighlight === index && (
                      <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5 rounded-full blur"
                        layoutId="highlightHover"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Description */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-lg sm:text-xl text-ethereal-dark max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-12 text-left pl-4 sm:pl-6 lg:pl-8">
                </p>

                {/* CTA Button - Mobile optimization */}
                <div className="flex justify-center lg:justify-start pl-4 sm:pl-6 lg:pl-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center gap-2 w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 transition-all duration-300 rounded-xl overflow-hidden shadow-lg"
                  >
                    {/* Button gradient and effects */}
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
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    </div>
                    
                    <span className="relative z-10 font-mono text-base sm:text-lg text-[#FFFFF0] font-medium">
                      Let's Talk
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#FFFFF0] transition-transform group-hover:translate-x-0.5" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Animation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="w-full max-w-lg xl:max-w-xl aspect-square">
                <CircleAnimation />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 