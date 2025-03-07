'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const drawings = {
  beaker: {
    path: "M40,15 C40,12 60,12 60,15 L60,35 L75,80 C75,85 25,85 25,80 L40,35 L40,15 Z M45,45 A2,2 0 1,0 49,45 A2,2 0 1,0 45,45 M55,60 A3,3 0 1,0 61,60 A3,3 0 1,0 55,60 M40,70 A2,2 0 1,0 44,70 A2,2 0 1,0 40,70 M60,75 A1.5,1.5 0 1,0 63,75 A1.5,1.5 0 1,0 60,75 M50,65 A2.5,2.5 0 1,0 55,65 A2.5,2.5 0 1,0 50,65",
    viewBox: "0 0 100 100"
  },
  magnifyingGlass: {
    path: "M35,35 A20,20 0 1,1 75,35 A20,20 0 1,1 35,35 M43,28 C40,32 38,38 43,45 M68,53 L90,75",
    viewBox: "0 0 100 100"
  }
};

export function PlayCTA() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true,
    amount: 0.6,
    margin: "0px"
  });

  return (
    <section ref={containerRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-surface-50 to-[#FFFFF0]/10">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/images/transformation/outro_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface-50/80 to-[#FFFFF0]/60" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        {/* Animated gradient sweep */}
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(28,28,28,0.03)_50%,transparent_100%)]"
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

      {/* Frosted Drawing Layer */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <filter id="play-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
            </filter>
            <mask id="play-frost-mask">
              <rect width="100%" height="100%" fill="white" filter="url(#play-noise)" />
              
              {/* Beaker - Left (Desktop) */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="hidden md:block"
                style={{ transform: 'translate(10vw, 15vh)' }}
              >
                <svg width="400" height="400" viewBox={drawings.beaker.viewBox}>
                  <motion.path
                    d={drawings.beaker.path}
                    fill="none"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.2 }}
                  />
                </svg>
              </motion.g>
              
              {/* Beaker - Left (Mobile) */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="block md:hidden"
                style={{ transform: 'translate(5vw, 10vh)' }}
              >
                <svg width="150" height="150" viewBox={drawings.beaker.viewBox}>
                  <motion.path
                    d={drawings.beaker.path}
                    fill="none"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.2 }}
                  />
                </svg>
              </motion.g>
              
              {/* Magnifying Glass - Right (Desktop) */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="hidden md:block"
                style={{ transform: 'translate(calc(90vw - 400px), 15vh)' }}
              >
                <svg width="400" height="400" viewBox={drawings.magnifyingGlass.viewBox}>
                  <motion.path
                    d={drawings.magnifyingGlass.path}
                    fill="none"
                    stroke="black"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 2, delay: 1.7 }}
                  />
                </svg>
              </motion.g>
              
              {/* Magnifying Glass - Right (Mobile) */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="block md:hidden"
                style={{ transform: 'translate(calc(95vw - 150px), 10vh)' }}
              >
                <svg width="150" height="150" viewBox={drawings.magnifyingGlass.viewBox}>
                  <motion.path
                    d={drawings.magnifyingGlass.path}
                    fill="none"
                    stroke="black"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 2, delay: 1.7 }}
                  />
                </svg>
              </motion.g>
            </mask>
          </defs>
        </svg>
        <motion.div 
          className="absolute inset-0 backdrop-blur-[60px]"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
            WebkitMaskImage: 'url(#play-frost-mask)',
            maskImage: 'url(#play-frost-mask)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          <div className="inline-flex items-center gap-3 mb-6">
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
              GET INVOLVED
            </motion.span>
            <div className="h-px w-8 bg-gradient-to-r from-[#FFFFF0]/0 via-[#FFFFF0]/20 to-[#FFFFF0]/0" />
          </div>

          <h2 className="font-serif text-4xl lg:text-6xl mb-8">
            Want to <span className="aurora-text-gradient-light">Collaborate</span>?
          </h2>
          
          <p className="text-xl text-[#1C1C1C]/70 mb-12 max-w-3xl mx-auto">
            Have an interesting idea or want to contribute to an experiment? Let's explore the possibilities together.
          </p>

          <div className="space-y-8">
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
              <span className="relative z-10 font-mono text-lg text-[#FFFFF0]">Schedule Call</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#FFFFF0]/20 opacity-10 blur-2xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#FFFFF0]/20 opacity-10 blur-2xl" />
    </section>
  );
} 