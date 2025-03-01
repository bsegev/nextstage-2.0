'use client';

import { motion, useScroll, useTransform, useAnimationControls } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// Import the ConceptCards component directly
// Add new component for the styled cards
const ConceptCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-4 sm:my-6">
    {/* Strategic Thinking Card */}
    <div className="group relative p-4 sm:p-6 border border-blue-300/30 rounded-lg overflow-hidden min-h-[160px] sm:min-h-[180px] flex items-center justify-center bg-white">
      {/* Graph paper background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px, 20px 20px, 4px 4px, 4px 4px',
          backgroundPosition: 'center center'
        }}
      />

      {/* Venn Diagram */}
      <div className="absolute left-4 bottom-4 w-20 h-20 opacity-30">
        <div className="absolute w-12 h-12 rounded-full border border-blue-400/50 translate-x-2" />
        <div className="absolute w-12 h-12 rounded-full border border-blue-400/50 translate-x-6 translate-y-2" />
        <motion.div 
          className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-500"
          style={{ left: '45%', top: '45%' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Scatter Plot */}
      <div className="absolute right-4 top-4 w-20 h-20 opacity-30">
        {/* Axes */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-blue-400/20" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-blue-400/20" />
        
        {/* Data Points */}
        {[
          { x: '65%', y: '30%' },
          { x: '40%', y: '50%' },
          { x: '75%', y: '60%' },
          { x: '55%', y: '75%' },
          { x: '85%', y: '45%' }
        ].map((point, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-blue-500"
            style={{ left: point.x, bottom: point.y }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1] }}
            transition={{ delay: i * 0.1, duration: 0.2 }}
          />
        ))}
        
        {/* Trend Line */}
        <motion.div
          className="absolute w-px h-16 bg-gradient-to-b from-blue-400/40 to-blue-500/40"
          style={{ 
            left: '30%', 
            bottom: '20%',
            transform: 'rotate(-45deg)',
            transformOrigin: 'bottom left'
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center text-center space-y-2">
        <div className="relative group">
          <motion.div 
            className="absolute inset-0 backdrop-blur-sm bg-white/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="relative">
            <span className="block font-mono uppercase tracking-wider text-base text-blue-600 group-hover:opacity-0 transition-opacity duration-300">
              Strategy &
            </span>
            <span className="block font-['JetBrains_Mono'] text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700 group-hover:opacity-0 transition-opacity duration-300">
              Direction
            </span>
            <p className="absolute inset-0 text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              For high-level thinking and vision
            </p>
          </div>
        </div>
      </div>
      
      {/* Hover effect */}
      <motion.div 
        className="absolute inset-0 bg-blue-50/0 group-hover:bg-gradient-to-br from-blue-50/60 to-indigo-50/60 transition-colors duration-300"
        initial={false}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
    </div>

    {/* Creative Direction Card */}
    <div className="relative p-4 sm:p-6 border border-purple-300/30 rounded-lg min-h-[160px] sm:min-h-[180px] flex items-center justify-center bg-white overflow-hidden group">
      {/* Design tool background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ruler guides with purple tint */}
        <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-purple-50/10 to-transparent">
          {[...Array(20)].map((_, i) => (
            <div 
              key={`ruler-${i}`} 
              className="absolute top-0 h-2 border-l border-purple-300/20"
              style={{ left: `${(i + 1) * 10}px` }}
            />
          ))}
        </div>

        {/* Figma-style selection area */}
        <div className="absolute inset-8 border border-dashed border-purple-400/30" />

        {/* Selection handles - 8 points */}
        {[
          'top-8 left-8', 'top-8 left-1/2', 'top-8 right-8',
          'top-1/2 left-8', 'top-1/2 right-8',
          'bottom-8 left-8', 'bottom-8 left-1/2', 'bottom-8 right-8'
        ].map((position, i) => (
          <div 
            key={`handle-${i}`}
            className={`absolute w-1.5 h-1.5 bg-white border border-purple-400/50 rounded-sm ${position} -translate-x-1/2 -translate-y-1/2`}
          />
        ))}

        {/* Smart guides */}
        <motion.div 
          className="absolute left-0 top-1/2 w-full h-px bg-purple-400/40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1]
          }}
        />
        <motion.div 
          className="absolute top-0 left-1/2 h-full w-px bg-purple-400/40"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
            delay: 0.5
          }}
        />

        {/* Distance indicators */}
        <div className="absolute top-1/2 right-2 -translate-y-1/2 text-[10px] font-mono text-purple-400/60">
          180px
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center text-center space-y-2 z-10">
        <div className="relative group">
          <motion.div 
            className="absolute inset-0 backdrop-blur-sm bg-white/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="relative">
            <span className="block font-['Caveat'] text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 group-hover:opacity-0 transition-opacity duration-300">
              Problem-Solving &
            </span>
            <span className="block font-['Caveat'] text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 group-hover:opacity-0 transition-opacity duration-300">
              Execution
            </span>
            <p className="absolute inset-0 text-sm text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              For hands-on implementation
            </p>
          </div>
        </div>
      </div>

      {/* Hover effect */}
      <motion.div 
        className="absolute inset-0 bg-purple-50/0 group-hover:bg-gradient-to-br from-purple-50/60 to-pink-50/60 transition-colors duration-300"
        initial={false}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
    </div>

    {/* Tactical Execution Card */}
    <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden group min-h-[160px] sm:min-h-[180px] flex items-center justify-center bg-white">
      {/* Radar background with green tint */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Static circles */}
        {[60, 45, 30].map((size, i) => (
          <div
            key={`static-circle-${i}`}
            className="absolute border border-emerald-300/10 rounded-full"
            style={{
              width: `${size * 2}px`,
              height: `${size * 2}px`,
            }}
          />
        ))}
        
        {/* Pulsing circles */}
        {[60, 45, 30].map((size, i) => (
          <motion.div
            key={`pulse-circle-${i}`}
            className="absolute border border-emerald-300/10 rounded-full"
            style={{
              width: `${size * 2}px`,
              height: `${size * 2}px`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Radar sweep */}
        <motion.div
          className="absolute w-[60px] h-[60px] origin-center"
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div
            className="absolute w-[60px] h-[1px] bg-gradient-to-r from-emerald-400/20 to-transparent"
            style={{ transformOrigin: '0 0' }}
          />
        </motion.div>

        {/* Crosshair lines */}
        <div className="absolute w-[120px] h-[120px]">
          <div className="absolute left-0 top-1/2 w-full h-px bg-blue-400/5" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-blue-400/5" />
        </div>
      </div>

      {/* Corner brackets - more tactical style */}
      {[
        { pos: 'top-0 left-0', transform: '-translate-x-px -translate-y-px' },
        { pos: 'top-0 right-0', transform: 'translate-x-px -translate-y-px' },
        { pos: 'bottom-0 left-0', transform: '-translate-x-px translate-y-px' },
        { pos: 'bottom-0 right-0', transform: 'translate-x-px translate-y-px' }
      ].map(({ pos, transform }, i) => (
        <div key={i} className={`absolute ${pos} flex items-center justify-center`}>
          <div className={`w-4 h-4 border-t border-l border-blue-300/20 transform ${transform}`} />
        </div>
      ))}
      
      {/* Content */}
      <div className="relative flex flex-col items-center text-center space-y-2 z-10">
        <div className="relative group">
          <motion.div 
            className="absolute inset-0 backdrop-blur-sm bg-white/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="relative">
            <span className="block font-['JetBrains_Mono'] uppercase tracking-wider text-base text-emerald-600 group-hover:opacity-0 transition-opacity duration-300">
              Guidance &
            </span>
            <span className="block font-['JetBrains_Mono'] uppercase tracking-wider text-base text-emerald-700 group-hover:opacity-0 transition-opacity duration-300">
              Advisory
            </span>
            <p className="absolute inset-0 text-sm text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              For structured insight and direction
            </p>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <motion.div 
        className="absolute inset-0 bg-emerald-50/0 group-hover:bg-gradient-to-br from-emerald-50/40 to-teal-50/40 transition-colors duration-300"
        initial={false}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  </div>
);

// Add CircleAnimation from ValueProp
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
  }, []);

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

export function WhoIAm() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Dynamic line animation
  const lineAnimation = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative py-32 overflow-hidden font-sans bg-white"
    >
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -right-1/4 top-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -left-1/4 bottom-1/4 w-96 h-96 bg-gradient-to-tr from-indigo-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with animated line */}
          <motion.div 
            className="mb-8 sm:mb-16 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="h-px bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-blue-500/50"
              variants={lineAnimation}
            />
            <h2 className="mt-6 sm:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-ethereal-dark/90">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="block"
              >
                <span className="relative">
                  Not a <span className="relative inline-block">
                    <span className="relative z-10 font-['Caveat'] italic text-blue-600/90 line-through decoration-blue-400/50 text-[120%]">
                      freelancer
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-blue-100/50 -skew-x-6 rounded"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    />
                  </span>
                  <motion.div
                    className="absolute -right-4 top-1/2 w-2 h-2 rounded-full bg-blue-400/70"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: [0, 1.5, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  />
                </span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block mt-2"
              >
                <span className="relative">
                  Not an <span className="relative inline-block">
                    <span className="relative z-10 font-['Caveat'] italic text-purple-600/90 line-through decoration-purple-400/50 text-[120%]">
                      agency
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-purple-100/50 -skew-x-6 rounded"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    />
                  </span>
                  <motion.div
                    className="absolute -right-4 top-1/2 w-2 h-2 rounded-full bg-purple-400/70"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: [0, 1.5, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  />
                </span>
              </motion.span>
            </h2>
          </motion.div>

          {/* Main content area - Modified for mobile timeline */}
          <div className="relative grid grid-cols-[60px_1fr] sm:block gap-4 sm:gap-0">
            {/* Mobile Timeline - Only visible on mobile */}
            <div className="relative block sm:hidden h-full">
              <div className="sticky top-24 h-[calc(100vh-6rem)]">
                {/* Timeline line */}
                <div className="absolute left-1/2 top-[100px] bottom-8 w-px bg-gradient-to-b from-blue-400/20 via-purple-400/20 to-emerald-400/20 transform -translate-x-1/2" />
                
                {/* Timeline points - Adjusted to align with card centers */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 relative" style={{ top: '180px' }} />
                  <div className="w-2 h-2 rounded-full bg-purple-400 relative" style={{ top: '380px' }} />
                  <div className="w-2 h-2 rounded-full bg-emerald-400 relative" style={{ top: '580px' }} />
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-4 sm:my-6">
              {/* Original ConceptCards content */}
              <ConceptCards />
            </div>

            {/* Desktop Timeline - Hidden on mobile */}
            <div className="hidden sm:block relative">
              {/* Original timeline code */}
              <div className="max-w-7xl mx-auto">
                {/* Main content with grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
                  {/* Left column - Text and cards */}
                  <motion.div
                    style={{ y }}
                    className="space-y-8 sm:space-y-16"
                  >
                    {/* Main statement */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="max-w-2xl"
                    >
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-light text-ethereal-dark/90">
                        A <span className="relative inline-block align-middle mx-1">
                          <motion.span
                            className="block relative"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                          >
                            <motion.span
                              className="font-['Caveat'] text-[145%] relative aurora-text-gradient-light leading-none inline-flex items-center px-1 pb-2"
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
                              high-impact partner
                            </motion.span>
                          </motion.span>
                          <motion.div
                            className="absolute -inset-x-6 -inset-y-2 bg-blue-50/50 rounded-lg -z-10"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          />
                        </span> who helps turn your idea into a reality.
                      </h3>
                      
                      <p className="text-lg sm:text-xl text-ethereal-dark/70 mt-3 sm:mt-4 font-sans">
                        I step in at the level you need most—whether as a strategic guide, embedded problem-solver, or hands-on advisor.
                      </p>
                    </motion.div>

                    {/* Concept Cards */}
                    <ConceptCards />

                    <div className="relative flex items-center justify-center mt-8 sm:mt-12">
                      {/* Timeline line */}
                      <motion.div 
                        className="absolute h-px w-full max-w-sm sm:max-w-2xl bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />

                      {/* Timeline points */}
                      <div className="relative flex justify-between w-full max-w-sm sm:max-w-2xl px-4 sm:px-8">
                        {[
                          { label: "Before", color: "blue" },
                          { label: "During", color: "purple" },
                          { label: "After", color: "emerald" }
                        ].map((point, i) => (
                          <motion.div
                            key={point.label}
                            className="flex flex-col items-center gap-1 sm:gap-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                          >
                            {/* Point */}
                            <motion.div 
                              className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-${point.color}-400/70`}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ 
                                type: "spring",
                                duration: 0.5, 
                                delay: 1 + i * 0.1 
                              }}
                            />
                            
                            {/* Label */}
                            <span className={`font-mono text-[10px] sm:text-xs text-${point.color}-600/70 uppercase tracking-wider`}>
                              {point.label}
                            </span>

                            {/* Connecting line to card */}
                            <motion.div 
                              className={`h-6 sm:h-8 w-px bg-gradient-to-b from-${point.color}-400/30 to-transparent -mt-8 sm:-mt-10`}
                              initial={{ scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Right column - Circle Animation */}
                  <motion.div
                    className="relative h-[300px] sm:h-[400px] lg:h-[600px] block lg:block"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  >
                    <CircleAnimation />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
} 