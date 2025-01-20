"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';

const transformationStages = [
  {
    id: 1,
    category: "DIGITAL PRIVATE BANK",
    title: "Process Optimization",
    description: "Evolution from process optimization to comprehensive digital transformation and brand development for a private banking institution.",
    image: "/images/transformation/bank-comparison.png",
    bgImage: "/images/transformation/bank-bg.png",
    type: "case"
  },
  {
    id: 2,
    category: "WEIGHT LOSS CLINIC",
    title: "Website Implementation",
    description: "From template website implementation to comprehensive healthcare brand development and digital strategy for specialized medical procedure.",
    image: "/images/transformation/weight-loss-comparison.png",
    bgImage: "/images/transformation/weight-loss-bg.png",
    type: "case"
  },
  {
    id: 3,
    category: "UNIVERSITY AI PODCAST",
    title: "Custom Website Development",
    description: "From initial concept to a thoughtfully structured digital platform making AI education accessible to university students.",
    image: "/images/transformation/ai-podcast-mockup.jpg",
    bgImage: "/images/transformation/ai-podcast-bg.jpg",
    type: "case"
  },
  {
    id: 4,
    category: "ENERGY MANAGEMENT PLATFORM",
    title: "Sales Deck Development",
    description: "From regional sales materials to global tech brand transformation, enabling expansion from Canadian market to US and European territories.",
    image: "/images/transformation/energy-comparison.jpg",
    bgImage: "/images/transformation/energy-bg.jpg",
    type: "case"
  },
  {
    id: 5,
    category: "VETERAN PHOTOGRAPHER",
    title: "Website Development",
    description: "Transforming 30 years of photographic mastery into an engaging digital experience that honors artistic authenticity while enabling business growth.",
    image: "/images/transformation/photographer-portfolio.png",
    bgImage: "/images/transformation/photography-bg.png",
    type: "case"
  },
  {
    id: 6,
    category: "HOLISTIC RECOVERY CENTER",
    title: "Global Brand Strategy",
    description: "Evolution from clinical recovery center to authentic holistic healing sanctuary, beginning with internal alignment before global expansion.",
    image: "/images/transformation/recovery-comparison.jpg",
    bgImage: "/images/transformation/recovery-bg.jpg",
    type: "case"
  },
  {
    id: 7,
    category: "REAL ESTATE DEVELOPER",
    title: "Project Pitch Deck",
    description: "Transformation from standalone presentation needs into a comprehensive brand and marketing system for faster project approvals.",
    image: "/images/transformation/sp_deck.jpg",
    bgImage: "/images/transformation/strategic-vision.jpg",
    type: "case"
  }
];

export function TransformationMessage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState<'left' | 'right' | 'info' | null>(null);
  const [rotation, setRotation] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % transformationStages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + transformationStages.length) % transformationStages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsSwiping(true);
    setTouchEnd(e.touches[0].clientX); // Reset touchEnd to prevent unwanted swipes
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;
    
    if (Math.abs(diff) > 5) { // Add a small threshold to detect intentional swipes
      if (diff > 0) {
        setSwipeDirection('left');
      } else {
        setSwipeDirection('right');
      }
      
      setTouchEnd(currentTouch);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    
    const minSwipeDistance = 50;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    
    setIsSwiping(false);
    setSwipeDirection(null);
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!slideRef.current) return;
    
    const rect = slideRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPosition = x < rect.width / 2 ? 'left' : 'right';
    
    if (cursorPosition !== newPosition) {
      if (cursorPosition === null) {
        // Initial entry - set rotation based on entry position
        setRotation(newPosition === 'left' ? 180 : 0);
      } else {
        // Normal movement - continue rotating clockwise
        setRotation(prev => prev + 180);
      }
    }
    setCursorPosition(newPosition);
    setX(e.clientX - rect.left);
    setY(e.clientY - rect.top);
  }, [cursorPosition]);

  const handleMouseEnter = useCallback(() => {
    // Let handleMouseMove determine the position
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorPosition(null);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const { clientX } = e;
    const { innerWidth } = window;
    if (clientX < innerWidth / 2) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  return (
    <section 
      ref={slideRef}
      className={`relative min-h-screen ${windowWidth >= 1024 ? 'cursor-none' : ''} transformation-message bg-[#1C1C1C] overflow-hidden`}
      onMouseMove={windowWidth >= 1024 ? handleMouseMove : undefined}
      onMouseEnter={windowWidth >= 1024 ? handleMouseEnter : undefined}
      onMouseLeave={windowWidth >= 1024 ? handleMouseLeave : undefined}
      onClick={windowWidth >= 1024 ? handleClick : undefined}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Layer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.2,
            ease: "easeOut"
          }}
          >
            <motion.div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
              backgroundImage: `url(${transformationStages[currentIndex].bgImage})`
              }}
            />
          </motion.div>
        </AnimatePresence>

      {/* Grid and Effects Layer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,240,0.03)_50%,transparent_100%)]"
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% 100%"
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 py-24 lg:py-32">
        {/* Header */}
        <motion.div
          className="relative max-w-4xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Clean gradient overlay */}
          <motion.div 
            className="absolute inset-0 -mx-[100vw] h-[60vh] top-[-20vh] bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

        {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4"
            >
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-8 bg-gradient-to-r from-[#FFFFF0]/0 via-[#FFFFF0]/20 to-[#FFFFF0]/0" />
                <motion.span 
                  className="font-mono text-sm tracking-wider aurora-text-gradient-light"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    backgroundSize: "200% auto",
                  }}
                >
                  TRANSFORMATION
                </motion.span>
                <div className="h-px w-8 bg-gradient-to-r from-[#FFFFF0]/0 via-[#FFFFF0]/20 to-[#FFFFF0]/0" />
              </div>
            </motion.div>

            <motion.h2
              className="font-serif text-4xl lg:text-6xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-[#FFFFF0]">
                Identity
              </span>
              <motion.span
                className="block mt-2 relative"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.span
                  className="absolute inset-0 aurora-text-gradient-light opacity-50"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    backgroundSize: "200% auto",
                  }}
                >
                  in Motion
                </motion.span>
                <motion.span
                  className="absolute inset-0 aurora-text-gradient-light"
                  animate={{
                    backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    backgroundSize: "200% auto",
                  }}
                >
                  in Motion
                </motion.span>
                <span className="relative aurora-text-gradient-light">
                  in Motion
                </span>
              </motion.span>
            </motion.h2>

            <motion.div
              className="max-w-2xl mx-auto mt-12 text-center space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg lg:text-xl text-[#FFFFF0]/70 leading-relaxed">
                Turning foundational truth into business growth through unified brand expression
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Carousel Section */}
        <div className="relative w-full mt-12 overflow-hidden">
          <div className="flex items-start justify-center">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                className="relative w-[80%] max-w-[1700px] mx-auto"
                initial={{ opacity: 0, x: swipeDirection === 'left' ? 100 : swipeDirection === 'right' ? -100 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: swipeDirection === 'left' ? -100 : swipeDirection === 'right' ? 100 : 0 }}
                transition={{
                  opacity: { duration: 0.4 },
                  x: { duration: 0.4, ease: "easeInOut" }
                }}
              >
                {/* Main Image Container */}
                <motion.div 
                  className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-2xl"
                  animate={{ 
                    scale: 1,
                    transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
                  }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-cover bg-center"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                    style={{ 
                      backgroundImage: `url(${transformationStages[currentIndex].image})`
                    }}
                  />

                  {/* Mobile Info Button */}
                  {windowWidth < 1024 && (
                    <motion.button
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-[#FFFFF0]/10 to-[#1C1C1C]/90 backdrop-blur-sm border border-[#FFFFF0]/20 flex items-center justify-center z-20"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        setShowInfo(!showInfo);
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5 text-[#FFFFF0]/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" className="stroke-current" strokeWidth="1.5"/>
                        <path d="M12 16v-4m0-4h.01" className="stroke-current" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </motion.button>
                  )}
                </motion.div>

                {/* Mobile Navigation Indicators */}
                {windowWidth < 1024 && (
                  <div className="mt-6 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                      {transformationStages.map((_, index) => (
                        <motion.div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full ${
                            index === currentIndex 
                              ? 'bg-white w-4' 
                              : 'bg-white/30'
                          }`}
                          animate={index === currentIndex ? {
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          } : {}}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                    <motion.div 
                      className="text-[#FFFFF0]/60 text-sm font-mono"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Swipe to navigate
                    </motion.div>
                  </div>
                )}

                {/* Mobile Info Panel */}
                {windowWidth < 1024 && showInfo && (
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="bg-gradient-to-br from-[#1C1C1C]/95 to-black/95 rounded-2xl shadow-2xl overflow-hidden border border-[#FFFFF0]/20 backdrop-blur-md">
                      <div className="px-6 py-4 border-b border-[#FFFFF0]/20 bg-[#1C1C1C]/50">
                        <span className="font-mono text-sm text-[#FFFFF0]/80">{transformationStages[currentIndex].category}</span>
                      </div>

                      <div className="p-6 space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-4">
                            <h3 className="text-xl text-[#FFFFF0] font-serif">
                              Initial Ask: {transformationStages[currentIndex].title}
                            </h3>
                            <p className="text-[#FFFFF0]/80">
                              Brief: {transformationStages[currentIndex].description}
                            </p>

                            {/* Case Study Buttons */}
                            <div className="flex flex-col gap-4 pt-4">
                              <button className="w-full py-3 px-4 bg-[#FFFFF0]/10 backdrop-blur-sm rounded-lg transition-all duration-300 relative overflow-hidden group border border-[#FFFFF0]/20 hover:bg-[#FFFFF0]/20 flex items-center justify-center gap-3">
                                <span className="relative z-10 text-[#FFFFF0]/80">Watch Case Study</span>
                                <svg className="w-4 h-4 text-[#FFFFF0]/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="12" cy="12" r="10" className="stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path className="fill-current" d="M15.4,12l-5.1,3c-0.2,0.1-0.4,0-0.4-0.2V9.2c0-0.2,0.2-0.3,0.4-0.2l5.1,3C15.6,12.1,15.6,11.9,15.4,12z"/>
                                </svg>
                              </button>
                              <button className="w-full py-3 px-4 bg-[#FFFFF0]/10 backdrop-blur-sm rounded-lg transition-all duration-300 relative overflow-hidden group border border-[#FFFFF0]/20 hover:bg-[#FFFFF0]/20 flex items-center justify-center gap-3">
                                <span className="relative z-10 text-[#FFFFF0]/80">Read Case Study</span>
                                <svg className="w-4 h-4 text-[#FFFFF0]/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect x="4" y="4" width="16" height="16" className="stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path className="stroke-current" d="M9 8h6M9 12h6M9 16h4" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Desktop Info Panel - Toggled by button */}
                <AnimatePresence>
                  {showInfo && windowWidth >= 1024 && (
              <motion.div 
                      className="hidden lg:block absolute top-0 right-0 w-[400px] h-full z-10"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 100, opacity: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.32, 0.72, 0, 1]
                      }}
                    >
                      <div className="bg-gradient-to-br from-[#1C1C1C]/95 to-black/95 rounded-2xl shadow-2xl overflow-hidden border border-[#FFFFF0]/20 backdrop-blur-md h-full flex flex-col">
                        {/* Info Panel Content */}
                        <div className="px-6 py-4 border-b border-[#FFFFF0]/20 bg-[#1C1C1C]/50">
                          <span className="font-mono text-sm text-[#FFFFF0]/80">{transformationStages[currentIndex].category}</span>
                        </div>

                        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 space-y-4">
              <motion.h3 
                                className="text-xl md:text-2xl text-[#FFFFF0] font-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={`title-${currentIndex}`}
              >
                                Initial Ask: {transformationStages[currentIndex].title}
              </motion.h3>
                              <motion.p
                                className="text-[#FFFFF0]/80"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={`desc-${currentIndex}`}
                              >
                                Brief: {transformationStages[currentIndex].description}
                              </motion.p>

                              {/* Case Study Buttons */}
                              <motion.div 
                                className="flex flex-col gap-4 pt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <button className="w-full py-3 px-4 bg-[#FFFFF0]/10 backdrop-blur-sm rounded-lg transition-all duration-300 relative overflow-hidden group border border-[#FFFFF0]/20 hover:bg-[#FFFFF0]/20 flex items-center justify-center gap-3">
                                  <span className="relative z-10 text-[#FFFFF0]/80">Watch Case Study</span>
                                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-[#FFFFFF]/20 via-[#E6E9FF]/20 to-[#FFFFFF]/20" />
                                  <svg className="w-4 h-4 text-[#FFFFF0]/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" className="stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path 
                                      className="fill-current transition-transform duration-200 origin-center transform group-hover:scale-110" 
                                      d="M15.4,12l-5.1,3c-0.2,0.1-0.4,0-0.4-0.2V9.2c0-0.2,0.2-0.3,0.4-0.2l5.1,3C15.6,12.1,15.6,11.9,15.4,12z"
                                    />
                                  </svg>
                                </button>
                                <button className="w-full py-3 px-4 bg-[#FFFFF0]/10 backdrop-blur-sm rounded-lg transition-all duration-300 relative overflow-hidden group border border-[#FFFFF0]/20 hover:bg-[#FFFFF0]/20 flex items-center justify-center gap-3">
                                  <span className="relative z-10 text-[#FFFFF0]/80">Read Case Study</span>
                                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-[#FFFFFF]/20 via-[#E6E9FF]/20 to-[#FFFFFF]/20" />
                                  <svg className="w-4 h-4 text-[#FFFFF0]/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="4" y="4" width="16" height="16" className="stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path 
                                      className="stroke-current transition-transform duration-200 origin-center transform group-hover:translate-x-0.5" 
                                      d="M9 8h6M9 12h6M9 16h4"
                                      strokeWidth="1.5" 
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                </button>
                              </motion.div>
                            </div>
                          </div>
            </div>

                        <div className="px-6 py-4 bg-black/50 flex justify-between items-center border-t border-[#FFFFF0]/20">
                          <div className="text-xs text-[#FFFFF0]/60 font-mono">
                            {currentIndex + 1} / {transformationStages.length}
              </div>

              <div className="flex gap-2">
                {transformationStages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                    }}
                                className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                                    ? 'bg-white w-6 sm:w-8' 
                                    : 'bg-gradient-to-r from-[#38BDF8]/30 via-[#818CF8]/30 to-[#34D399]/30 hover:from-[#38BDF8]/50 hover:via-[#818CF8]/50 hover:to-[#34D399]/50'
                    }`}
                  />
                ))}
              </div>
            </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Info Tag Button - Desktop Only */}
                {windowWidth >= 1024 && (
                  <motion.button
                    className={`absolute -right-10 top-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFFFF0]/10 to-[#1C1C1C]/90 backdrop-blur-sm border border-[#FFFFF0]/20 flex items-center justify-center group overflow-hidden z-20 shadow-2xl transition-all duration-300 ${
                      showInfo ? 'bg-[#FFFFF0]/20 border-[#FFFFF0]/40' : ''
                    }`}
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      setShowInfo(!showInfo);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      x: showInfo ? -20 : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    onMouseEnter={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      setCursorPosition('info');
                    }}
                    onMouseLeave={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      const rect = slideRef.current?.getBoundingClientRect();
                      if (rect) {
                        const x = e.clientX - rect.left;
                        setCursorPosition(x < rect.width / 2 ? 'left' : 'right');
                      }
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/20 via-[#818CF8]/20 to-[#34D399]/20"
                      animate={{
                        opacity: showInfo ? [0.8, 1, 0.8] : [0.5, 1, 0.5],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <div className="relative w-8 h-8">
                      <motion.svg 
                        className="absolute inset-0 text-[#FFFFF0]/80 transition-all duration-300 group-hover:scale-110"
                        initial={{ opacity: 1, scale: 1, rotate: 0 }}
                        animate={{ 
                          opacity: showInfo ? 0 : 1,
                          scale: showInfo ? 0.5 : 1,
                          rotate: showInfo ? 180 : 0,
                        }}
                        transition={{ 
                          duration: 0.4,
                          scale: { duration: 0.2 },
                          opacity: { duration: 0.2 },
                          rotate: { duration: 0.4, ease: "easeInOut" }
                        }}
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" className="stroke-current" strokeWidth="1.5"/>
                        <path d="M12 16v-4m0-4h.01" className="stroke-current" strokeWidth="1.5" strokeLinecap="round"/>
                      </motion.svg>
                      <motion.svg
                        className="absolute inset-0 text-[#FFFFF0] transition-all duration-300 group-hover:scale-110"
                        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        animate={{ 
                          opacity: showInfo ? 1 : 0,
                          scale: showInfo ? 1 : 0.5,
                          rotate: showInfo ? 0 : -180,
                        }}
                        transition={{ 
                          duration: 0.4,
                          scale: { duration: 0.2, delay: 0.2 },
                          opacity: { duration: 0.2, delay: 0.2 },
                          rotate: { duration: 0.4, ease: "easeInOut" }
                        }}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 6l12 12M6 18L18 6" className="stroke-current" strokeWidth="1.5" strokeLinecap="round"/>
                      </motion.svg>
                    </div>
                  </motion.button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Custom Cursor */}
      <motion.div
        className="absolute top-0 left-0 w-20 h-20 pointer-events-none z-50 mix-blend-difference"
        style={{
          x,
          y,
          transform: `translate(-50%, -50%)`
        }}
      >
        {/* Dark circle background */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-[#1C1C1C] shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          initial={{ scale: 0 }}
          animate={{ 
            scale: cursorPosition === null ? 0 : 1,
            opacity: cursorPosition === 'info' ? 0 : 1 
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Aurora arrow */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ rotate: 0 }}
          animate={{ 
            rotate: rotation,
            scale: cursorPosition === 'info' ? 0 : (cursorPosition === null ? 0 : 1)
          }}
          transition={{ duration: 0.3 }}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-10 h-10"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))' }}
          >
            <defs>
              <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#38BDF8' }} />
                <stop offset="50%" style={{ stopColor: '#818CF8' }} />
                <stop offset="100%" style={{ stopColor: '#34D399' }} />
              </linearGradient>
            </defs>
            <motion.path
              d="M5 12h14M13 5l7 7-7 7"
              stroke="url(#arrow-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </motion.div>

        {/* Info cursor state */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ 
            scale: cursorPosition === 'info' ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-4 h-4 rounded-full bg-[#FFFFF0]/80" />
        </motion.div>
      </motion.div>

      {/* Scoped styles */}
      <style jsx>{`
        section {
          cursor: none;
        }
      `}</style>

      {/* Add gradient definitions */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#60A5FA' }} />
            <stop offset="50%" style={{ stopColor: '#A855F7' }} />
            <stop offset="100%" style={{ stopColor: '#EC4899' }} />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
} 