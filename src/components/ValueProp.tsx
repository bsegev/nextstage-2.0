'use client';

import { motion, useScroll, useTransform, useAnimationControls } from 'framer-motion';
import { useRef, useEffect } from 'react';

const CircleAnimation = () => {
  const controls = useAnimationControls();
  const isMountedRef = useRef(true);
  const animationRef = useRef<{
    timeout?: NodeJS.Timeout;
  }>({});
  
  useEffect(() => {
    const animation = animationRef.current;
    isMountedRef.current = true;

    const animate = async () => {
      if (!isMountedRef.current) return;

      try {
        // Initial state
        await new Promise(resolve => 
          requestAnimationFrame(async () => {
            if (!isMountedRef.current) {
              resolve(null);
              return;
            }
            try {
              await controls.start({
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                pathLength: 0,
                transition: { duration: 0 }
              });
            } catch (e) { // eslint-disable-line @typescript-eslint/no-unused-vars
              // Ignore animation errors during unmount
            }
            resolve(null);
          })
        );

        // Add delay before starting animation
        const timeoutId = setTimeout(async () => {
          if (!isMountedRef.current) return;

          const runAnimation = async () => {
            if (!isMountedRef.current) return;
            try {
              // Draw outer circle
              await controls.start({
                pathLength: 1,
                transition: { duration: 1.5, ease: "easeInOut" }
              });

              if (!isMountedRef.current) return;

              // Rotate to perspective view
              await controls.start({
                rotateX: 45,
                rotateY: 45,
                scale: 0.8,
                transition: { duration: 2, ease: "easeInOut" }
              });

              if (!isMountedRef.current) return;

              // Hold perspective view
              await new Promise(resolve => setTimeout(resolve, 1000));

              if (!isMountedRef.current) return;

              // Return to flat view
              await controls.start({
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                transition: { duration: 2, ease: "easeInOut" }
              });

              if (!isMountedRef.current) return;

              // Smoothly undraw the circle
              await controls.start({
                pathLength: 0,
                transition: { duration: 1.5, ease: "easeInOut" }
              });

              if (isMountedRef.current) {
                runAnimation();
              }
            } catch (e) { // eslint-disable-line @typescript-eslint/no-unused-vars
              // Ignore animation errors during unmount
            }
          };

          runAnimation();
        }, 500);

        // Store the timeout ID for cleanup
        animation.timeout = timeoutId;
      } catch (error) {
        // Ignore animation interruption errors
        if (isMountedRef.current) {
          console.error('Animation error:', error);
        }
      }
    };

    animate();

    return () => {
      isMountedRef.current = false;
      if (animation.timeout) {
        clearTimeout(animation.timeout);
      }
      try {
        controls.stop();
      } catch (e) { // eslint-disable-line @typescript-eslint/no-unused-vars
        // Ignore errors during cleanup
      }
    };
  }, [controls]);  // Add controls to dependencies

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Container for 3D perspective */}
      <div className="relative w-96 h-96 preserve-3d">
        {/* Inner Circle - Always visible */}
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

        {/* Outer Circle - Draws and transforms */}
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

        {/* Connection Lines */}
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

      {/* Decorative Dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            top: `${50 + 45 * Math.sin((i * Math.PI) / 4)}%`,
            left: `${50 + 45 * Math.cos((i * Math.PI) / 4)}%`,
            background: `linear-gradient(45deg, rgba(96, 165, 250, ${0.3 + (i % 3) * 0.2}), rgba(129, 140, 248, ${0.3 + (i % 3) * 0.2}))`
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
            background: [
              `linear-gradient(45deg, rgba(96, 165, 250, ${0.3 + (i % 3) * 0.2}), rgba(129, 140, 248, ${0.3 + (i % 3) * 0.2}))`,
              `linear-gradient(45deg, rgba(129, 140, 248, ${0.3 + (i % 3) * 0.2}), rgba(96, 165, 250, ${0.3 + (i % 3) * 0.2}))`,
              `linear-gradient(45deg, rgba(96, 165, 250, ${0.3 + (i % 3) * 0.2}), rgba(129, 140, 248, ${0.3 + (i % 3) * 0.2}))`
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Add new component for the styled cards
const ConceptCards = () => (
  <div className="grid grid-cols-3 gap-4 my-6">
    {/* Strategic Thinking Card */}
    <div className="group relative p-6 border border-blue-300/30 rounded-lg overflow-hidden min-h-[180px] flex items-center justify-center bg-white">
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
        <span className="block font-['JetBrains_Mono'] text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
          Strategic
        </span>
        <span className="block font-['JetBrains_Mono'] text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
          Thinking
        </span>
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
    <div className="relative p-6 border border-purple-300/30 rounded-lg min-h-[180px] flex items-center justify-center bg-white overflow-hidden group">
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
        <span className="block font-['Caveat'] text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Creative
        </span>
        <span className="block font-['Caveat'] text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Direction
        </span>
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
    <div className="relative p-6 rounded-sm overflow-hidden group min-h-[180px] flex items-center justify-center bg-white">
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
        <span className="block font-['JetBrains_Mono'] uppercase tracking-wider text-base text-emerald-600">
          Tactical
        </span>
        <span className="block font-['JetBrains_Mono'] uppercase tracking-wider text-base text-emerald-700">
          Execution
        </span>
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

export function ValueProp() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax and fade effects
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  useEffect(() => {
    // Load additional fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500&family=Caveat:wght@600&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center py-24 sm:py-32 overflow-hidden font-['DM_Sans']"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/10" />
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(59,130,246,0.03)_50%,transparent_100%)]"
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
      
      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Text Column */}
          <motion.div 
            className="relative"
            style={{ y, opacity }}
          >
            <div className="space-y-8">
              {/* Main Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <motion.div 
                  className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-primary-100/0 via-primary-100/30 to-primary-100/0 rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <div className="relative space-y-6">
                  <h2 className="text-2xl font-light text-ethereal-dark/90">
                    For founders and teams
                  </h2>
                  
                  <p className="relative text-2xl sm:text-3xl md:text-4xl font-light text-ethereal-dark/90 leading-relaxed tracking-tight">
                    I build & align brands by creating{" "}
                    <motion.span 
                      className="relative inline-flex items-center gap-2 font-medium"
                      whileInView={{ opacity: [0, 1], y: [20, 0] }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {/* Connected */}
                      <span className="relative px-2">
                        <motion.span
                          className="absolute inset-0 border border-blue-300/30 rounded-full -z-10"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        />
                        <span className="text-blue-500/70 drop-shadow-sm">connected</span>
                      </span>

                      {/* Connecting line */}
                      <motion.span 
                        className="relative w-6 h-0.5 inline-block"
                      >
                        {/* Static line */}
                        <span className="absolute inset-0 bg-blue-300/10" />
                        
                        {/* Animated beam */}
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/80 to-blue-400/0"
                          animate={{
                            x: ["-100%", "100%", "-100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.span>

                      {/* Systems */}
                      <span className="relative px-2">
                        <motion.span
                          className="absolute inset-0 border border-blue-300/30 rounded-full -z-10"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.4, delay: 0.8 }}
                        />
                        <span className="text-blue-500/70 drop-shadow-sm">systems</span>
                      </span>
                    </motion.span>
                    {" "}that turn your truth into your advantage.
                  </p>

                  <ul className="space-y-2 text-lg text-ethereal-dark/70 mt-8">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70" />
                      One partner replacing scattered solutions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70" />
                      Strategy, design, and story as one force
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70" />
                      Built to grow stronger through use
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Concept Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <ConceptCards />
              </motion.div>
            </div>
          </motion.div>

          {/* Animation Column */}
          <motion.div
            className="relative h-[600px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <CircleAnimation />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
} 