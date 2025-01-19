"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const drawings = {
  question: {
    path: "M30,20 C30,10 70,10 70,30 C70,50 30,50 30,70 M30,85 L30,95",
    viewBox: "0 0 100 100"
  },
  happyFace: {
    path: "M35,40 a2,2 0 1,0 0,4 a2,2 0 1,0 0,-4 M65,40 a2,2 0 1,0 0,4 a2,2 0 1,0 0,-4 M35,60 C35,70 65,70 65,60 M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10",
    viewBox: "0 0 100 100"
  }
};

export function FinalCTA() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true,
    amount: 0.6, // Requires 60% of element to be in view
    margin: "0px" // Only triggers when actually in viewport
  });

  return (
    <section ref={containerRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-[#FFFFF0]/10">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/images/transformation/outro_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-40"
            sizes="100vw"
          />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-[#FFFFF0]/60" />

        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
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
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
            </filter>
            <mask id="frost-mask">
              <rect width="100%" height="100%" fill="white" filter="url(#noise)" />
              {/* Question Mark - Left */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="hidden md:block"  // Desktop only
                style={{ transform: 'translate(10vw, 15vh)' }}
              >
                <svg width="400" height="400" viewBox={drawings.question.viewBox}>
                  <motion.path
                    d={drawings.question.path}
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
              {/* Mobile Question Mark - Top Left */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="block md:hidden"  // Mobile only
                style={{ transform: 'translate(5vw, 10vh)' }}
              >
                <svg width="150" height="150" viewBox={drawings.question.viewBox}>
                  <motion.path
                    d={drawings.question.path}
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
              {/* Smiley Face - Right (Desktop) */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="hidden md:block"  // Desktop only
                style={{ transform: 'translate(calc(90vw - 400px), 15vh)' }}
              >
                <svg width="400" height="400" viewBox={drawings.happyFace.viewBox}>
                  <motion.path
                    d={drawings.happyFace.path}
                    fill="none"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 2, delay: 1.7 }}
                  />
                </svg>
              </motion.g>
              {/* Mobile Smiley Face - Top Right */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="block md:hidden"  // Mobile only
                style={{ transform: 'translate(calc(95vw - 150px), 10vh)' }}
              >
                <svg width="150" height="150" viewBox={drawings.happyFace.viewBox}>
                  <motion.path
                    d={drawings.happyFace.path}
                    fill="none"
                    stroke="black"
                    strokeWidth={2}
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
            WebkitMaskImage: 'url(#frost-mask)',
            maskImage: 'url(#frost-mask)',
          }}
        >
          <div 
            className="absolute inset-0 mix-blend-overlay opacity-50"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
              backgroundSize: '300px 300px'
            }}
          />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 bg-[#1C1C1C]/20"
            />
            <h2 className="text-6xl font-serif">
              Ready to Make Your <span className="aurora-text-gradient-light">Mark</span>?
            </h2>
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-0.5 bg-[#1C1C1C]/20"
            />
          </div>
          
          <p className="text-xl text-[#1C1C1C]/70 mb-12 max-w-3xl mx-auto">
            Ready to build something <span className="aurora-text-gradient-light">meaningful</span>? Let&apos;s create a brand that resonates from the inside out, turning your vision into lasting impact.
          </p>

          <div className="space-y-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-[#FFFFF0]/80 backdrop-blur-sm border border-[#1C1C1C]/10 hover:bg-[#FFFFF0] hover:border-[#1C1C1C]/20 transition-all duration-300 rounded-lg overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/10 via-[#818CF8]/10 to-[#34D399]/10"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10 font-mono text-lg aurora-text-gradient-light">Start the Conversation</span>
            </motion.button>

            <div className="text-[#1C1C1C]/70">
              Prefer email? Reach me at{' '}
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="mailto:hello@yourdomain.co"
                className="font-medium group-hover:aurora-text-gradient-light"
              >
                hello@yourdomain.co
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#FFFFF0]/20 opacity-10 blur-2xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#FFFFF0]/20 opacity-10 blur-2xl" />
    </section>
  );
} 