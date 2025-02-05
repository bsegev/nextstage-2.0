"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { BackgroundEffect } from './BackgroundEffect';

const rotatingWords = ["design", "strategy", "story", "innovation", "impact"];

const arrowMainStem = "M436.877 273.59 C 414.95 286.319, 391.786 299.252, 366.509 306.733 C 342.665 313.789, 316.517 315.986, 292.743 307.451 C 286.519 305.217, 280.446 302.129, 274.819 298.347 C 276.908 297.825, 278.989 297.272, 281.049 296.645 C 293.031 292.995, 304.546 287.417, 314.07 279.19 C 322.509 271.9, 328.9 262.239, 332.63 251.755 C 336.275 241.51, 337.086 229.853, 333.668 219.431 C 330.433 209.566, 323.78 201.357, 314.897 196.005 C 298.167 185.926, 274.746 186.061, 258.775 197.666 C 241.197 210.438, 232.882 233.111, 235.441 254.41 C 237.164 268.748, 243.518 281.642, 252.772 292.216";
const arrowHead = "M465.066 256.605 C 464.111 255.369, 462.727 254.638, 461.14 254.635 C 443.251 254.602, 425.363 254.568, 407.474 254.535 C 404.858 254.53, 402.353 256.838, 402.474 259.535 C 402.596 262.248, 404.671 264.53, 407.474 264.535 C 423.419 264.565, 439.364 264.595, 455.309 264.624";
const arrowTail = "M452.518 317.036 C 452.107 319.608, 453.179 322.542, 456.01 323.187 C 458.41 323.734, 461.719 322.457, 462.161 319.695 C 465.289 300.118, 468.417 280.541, 471.545 260.964";

// Add back graph paper SVG background
const graphPaperPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23102A43' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v1H0zM0 0v40h1V0zM39 0v40h1V0zM0 39h40v1H0z'/%3E%3C/g%3E%3C/svg%3E")`;

export function Hero2() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

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
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      setIsInView(rect.top < window.innerHeight && rect.bottom > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const wordInterval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[100svh] overflow-hidden bg-surface-50"
    >
      {/* Video/Image Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-full"
        >
          {/* Static image that appears after video ends */}
          <motion.img
            src="/video_finalframe.png"
            alt=""
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: videoEnded ? 1 : 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.3,
              ease: "easeInOut"
            }}
          />
          {/* Video that fades out when ended */}
          <motion.video
            ref={videoRef}
            className="absolute w-full h-full object-cover"
            playsInline
            muted
            animate={{ opacity: videoEnded ? 0 : 1 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
            onLoadedData={() => setVideoLoaded(true)}
            onEnded={() => {
              setVideoEnded(true);
            }}
          >
            <source src="/videos/ns_hero_bg_vid.mp4" type="video/mp4" />
          </motion.video>
        </motion.div>
        {/* Overlay gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: videoEnded ? 0.75 : 0.7 }}
          transition={{ 
            duration: 1.2,
            delay: videoEnded ? 0.3 : 0.3,
            ease: "easeOut" 
          }}
          className="absolute inset-0 bg-gradient-to-b from-surface-50/80 via-surface-50/50 to-surface-50/80"
        />
      </div>

      <BackgroundEffect />
      
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
              className="relative w-full max-w-[90%] sm:max-w-none"
            >
              <h1 className="font-serif tracking-tight text-primary-900 flex flex-col items-center overflow-visible">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-12 sm:mb-12 overflow-visible w-full">
                  <div className="relative group w-full sm:w-auto text-center">
                    <div 
                      className="absolute inset-0 rounded-xl bg-surface-100"
                      style={{ 
                        backgroundImage: graphPaperPattern,
                        transform: 'rotate(-1deg)',
                      }} 
                    />
                    <motion.span 
                      className="relative block text-7xl sm:text-6xl md:text-7xl lg:text-8xl font-['Caveat'] text-primary-800 leading-[1.1] overflow-visible px-4 py-2"
                      style={{ fontFamily: 'var(--font-caveat)' }}
                    animate={{ 
                        x: [-1, 1, -1], 
                        y: [-1, 1, -1],
                        rotate: [-1, 1, -1]
                    }}
                    transition={{ 
                        duration: 5,
                      repeat: Infinity,
                        ease: "easeInOut"
                    }}
                  >
                      Idea
                    </motion.span>
                    <motion.div
                      className="absolute -inset-2 border-2 border-primary-200/30 rounded-xl"
                      style={{ transform: 'rotate(-1deg)' }}
                      animate={{
                        scale: [1, 1.02, 1],
                        rotate: [-1, 1, -1]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  
                  <div className="relative w-24 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-16 md:h-20 lg:h-24 mx-2 sm:mx-4 my-2 sm:my-0 transform -rotate-90 sm:rotate-0">
                    <svg 
                      viewBox="200 150 300 200" 
                      className="w-full h-full relative z-10 scale-x-[-1] sm:scale-x-100"
                    >
                      <motion.path
                        d={arrowMainStem}
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        className="text-primary-600"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: 1,
                          opacity: 1
                        }}
                        transition={{
                          duration: 1.2,
                          ease: "easeInOut",
                          delay: 0.2
                        }}
                      />
                      <motion.path
                        d={arrowHead}
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-600"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: 1,
                          opacity: 1
                        }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.8
                        }}
                      />
                      <motion.path
                        d={arrowTail}
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="text-primary-400/60"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: 1,
                          opacity: 1
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                          delay: 1.4
                        }}
                      />
                    </svg>
                  </div>
                  
                  <motion.div
                    className="relative overflow-visible min-h-[1.5em] flex items-center justify-center w-full sm:w-auto text-center"
                    initial={{ filter: 'blur(8px)', opacity: 0 }}
                    animate={{ filter: 'blur(0px)', opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <div className="relative group">
                      <div 
                        className="absolute inset-0 rounded-xl overflow-hidden"
                      >
                        <div
                          className={cn(
                            `absolute -inset-[10px] opacity-50
                            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
                            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
                            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
                            [background-image:var(--white-gradient),var(--aurora)]
                            dark:[background-image:var(--dark-gradient),var(--aurora)]
                            [background-size:300%,_200%]
                            [background-position:50%_50%,50%_50%]
                            filter blur-[10px] invert dark:invert-0
                            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
                            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
                            after:[background-size:200%,_100%] 
                            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
                            pointer-events-none`,
                            `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
                          )}
                        />
                      </div>
                      <span className="relative block text-7xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 leading-[1.2] sm:leading-[1.5] overflow-visible px-6 py-4">
                      reality
                    </span>
                    <motion.div
                        className="absolute -inset-2 border-2 border-primary-200/30 rounded-xl"
                        style={{ transform: 'rotate(-1deg)' }}
                      animate={{
                          boxShadow: [
                            'inset 0 0 20px rgba(var(--primary-rgb), 0.1)',
                            'inset 0 0 40px rgba(var(--primary-rgb), 0.2)',
                            'inset 0 0 20px rgba(var(--primary-rgb), 0.1)'
                          ]
                      }}
                      transition={{
                          duration: 3,
                        repeat: Infinity,
                          repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    />
                    </div>
                  </motion.div>
                </div>

                <div className="flex flex-col items-center text-5xl sm:text-5xl md:text-6xl lg:text-7xl overflow-visible mt-0 sm:mt-0">
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-400 to-primary-300 mb-2 sm:mb-4 leading-[1.3] overflow-visible"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      backgroundSize: '200% auto'
                    }}
                  >
                    through
                  </motion.span>
                  
                  <div className="relative flex items-center min-w-[280px] sm:min-w-[320px] md:min-w-[380px] lg:min-w-[440px] justify-center py-2 overflow-visible">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={rotatingWords[activeWordIndex]}
                        initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: -40, opacity: 0, filter: 'blur(8px)' }}
                        transition={{
                          y: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 },
                          filter: { duration: 0.3 }
                        }}
                        className="absolute flex flex-col items-center overflow-visible w-full"
                      >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-primary-200 capitalize font-medium whitespace-nowrap leading-[1.3] overflow-visible text-5xl sm:text-5xl md:text-6xl lg:text-7xl pb-4">
                          {rotatingWords[activeWordIndex]}
                        </span>
                        <motion.div 
                          className="h-px w-full bg-gradient-to-r from-transparent via-primary-300/50 to-transparent -mt-2 relative"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          style={{ zIndex: -1 }}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative max-w-[95%] sm:max-w-3xl mx-auto mt-12 sm:mt-24"
              >
                {/* Background plate - now showing on all screens */}
                <motion.div 
                  className="absolute inset-0 -z-10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <motion.div 
                    className="absolute inset-[-1rem] sm:inset-[-1.5rem] rounded-3xl backdrop-blur-sm"
                    animate={{ 
                      backgroundColor: videoEnded ? 'rgba(var(--primary-rgb), 0.15)' : 'rgba(var(--primary-rgb), 0.1)'
                    }}
                    transition={{ duration: 1 }}
                  >
                    <div 
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background: 'linear-gradient(45deg, transparent, rgba(var(--primary-rgb), 0.08) 45%, rgba(var(--primary-rgb), 0.02) 55%, transparent)'
                      }}
                    />
                    <motion.div 
                      className="absolute inset-0 rounded-3xl border border-primary-200/20"
                      animate={{
                        boxShadow: [
                          'inset 0 0 0 0 rgba(var(--primary-rgb), 0.1)',
                          'inset 0 0 20px 2px rgba(var(--primary-rgb), 0.05)',
                          'inset 0 0 0 0 rgba(var(--primary-rgb), 0.1)'
                        ]
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </motion.div>

                <p className="text-base sm:text-xl md:text-2xl text-secondary-600/90 font-light leading-relaxed px-4 py-3 sm:px-12 sm:py-8 flex flex-col items-center gap-1.5 sm:gap-4">
                  <span>
                    <span className="text-primary-900/80">Transform complex challenges</span>
                  </span>
                  <span>
                    <span className="text-primary-600">into elegant solutions</span>
                  </span>
                  <span>
                    that <span className="text-primary-700">engage</span>, <span className="text-primary-600">inspire</span>, and deliver <span className="text-primary-700">measurable results</span>
                  </span>
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-3 sm:mt-8 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative group",
                  "px-8 sm:px-10 py-4 sm:py-5",
                  "text-base sm:text-lg font-medium",
                  "bg-primary-600 hover:bg-primary-500",
                  "text-white",
                  "rounded-full",
                  "overflow-hidden",
                  "transition-colors duration-300",
                  "shadow-lg shadow-primary-600/20",
                  "hover:shadow-xl hover:shadow-primary-600/30",
                  "border border-primary-500/50"
                )}
              >
                <div className="relative flex items-center gap-3">
                  <span className="relative z-10">Book Your Free Call</span>
                  <div className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="w-full h-full"
                    >
                      <motion.path
                        d="M4 12h16m-6-6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                    </svg>
                  </div>
                </div>
              </motion.button>
              
              <motion.a
                href="#process"
                whileHover={{ x: 5 }}
                className={cn(
                  "text-secondary-600 hover:text-primary-600 rounded-full w-full sm:w-auto",
                  "px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg text-center sm:text-left",
                  "transition-colors duration-300",
                  "hover:bg-primary-50/50",
                  "flex items-center justify-center sm:justify-start gap-3",
                  "group"
                )}
              >
                <span>Explore Our Process</span>
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="group-hover:text-primary-500 transition-colors duration-300"
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
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
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