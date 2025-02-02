'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const drawings = {
  lightbulb: {
    path: "M50,70 L50,80 M42,80 L58,80 M45,85 L55,85 M50,20 C35,20 25,30 25,45 C25,55 35,60 40,65 C45,70 45,70 45,75 L55,75 C55,70 55,70 60,65 C65,60 75,55 75,45 C75,30 65,20 50,20",
    viewBox: "0 0 100 100"
  },
  blocks: {
    path: "M20,80 L40,80 L40,60 L20,60 L20,80 M45,80 L65,80 L65,60 L45,60 L45,80 M32,55 L52,55 L52,35 L32,35 L32,55 M57,55 L77,55 L77,35 L57,35 L57,55 M45,30 L65,30 L65,10 L45,10 L45,30",
    viewBox: "0 0 100 100"
  }
};

export function AboutCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
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
            className="object-cover object-center opacity-40"
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
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
            </filter>
            <mask id="frost-mask">
              <rect width="100%" height="100%" fill="white" filter="url(#noise)" />
              {/* Lightbulb - Left */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="hidden md:block"
                style={{ transform: 'translate(10vw, 15vh)' }}
              >
                <svg width="400" height="400" viewBox={drawings.lightbulb.viewBox}>
                  <motion.path
                    d={drawings.lightbulb.path}
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
              {/* Blocks - Right */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="hidden md:block"
                style={{ transform: 'translate(calc(90vw - 400px), 15vh)' }}
              >
                <svg width="400" height="400" viewBox={drawings.blocks.viewBox}>
                  <motion.path
                    d={drawings.blocks.path}
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
              LET'S CONNECT
            </motion.span>
            <div className="h-px w-8 bg-gradient-to-r from-[#FFFFF0]/0 via-[#FFFFF0]/20 to-[#FFFFF0]/0" />
          </div>

          <h2 className="font-serif text-4xl lg:text-6xl mb-8">
            Have an Idea Worth <span className="aurora-text-gradient-light">Building</span>?
          </h2>
          
          <p className="text-xl text-[#1C1C1C]/70 mb-12 max-w-3xl mx-auto">
            Let&apos;s explore how we can turn your vision into a <span className="aurora-text-gradient-light">lasting brand</span> that grows with your business and resonates with your audience.
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
              <span className="relative z-10 font-mono text-lg aurora-text-gradient-light">Schedule a Discovery Call</span>
            </motion.button>

            <div className="text-[#1C1C1C]/70">
              Or send me a note at{' '}
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