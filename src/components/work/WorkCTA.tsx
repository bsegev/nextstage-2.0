'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const drawings = {
  compass: {
    path: "M50,20 L50,30 M50,70 L50,80 M20,50 L30,50 M70,50 L80,50 M50,50 m0,-30 a30,30 0 1,1 0,60 a30,30 0 1,1 0,-60 M50,35 L50,50 L65,50",  // Compass with needle
    viewBox: "0 0 100 100"
  },
  spark: {
    path: "M50,20 L55,35 L70,40 L55,45 L50,60 L45,45 L30,40 L45,35 Z M60,30 L65,25 M40,30 L35,25 M60,50 L65,55 M40,50 L35,55",  // Starburst/spark with small radiating lines
    viewBox: "0 0 100 100"
  }
};

export function WorkCTA() {
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
              {/* Compass - Left (Desktop) */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="hidden md:block"
                style={{ transform: 'translate(10vw, 15vh)' }}
              >
                <svg width="400" height="400" viewBox={drawings.compass.viewBox}>
                  <motion.path
                    d={drawings.compass.path}
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
              
              {/* Compass - Left (Mobile) */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="block md:hidden"
                style={{ transform: 'translate(5vw, 10vh)' }}
              >
                <svg width="150" height="150" viewBox={drawings.compass.viewBox}>
                  <motion.path
                    d={drawings.compass.path}
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
              
              {/* Spark - Right (Desktop) */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="hidden md:block"
                style={{ transform: 'translate(calc(90vw - 400px), 15vh)' }}
              >
                <svg width="400" height="400" viewBox={drawings.spark.viewBox}>
                  <motion.path
                    d={drawings.spark.path}
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
              
              {/* Spark - Right (Mobile) */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="block md:hidden"
                style={{ transform: 'translate(calc(95vw - 150px), 10vh)' }}
              >
                <svg width="150" height="150" viewBox={drawings.spark.viewBox}>
                  <motion.path
                    d={drawings.spark.path}
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
              START YOUR PROJECT
            </motion.span>
            <div className="h-px w-8 bg-gradient-to-r from-[#FFFFF0]/0 via-[#FFFFF0]/20 to-[#FFFFF0]/0" />
          </div>

          <h2 className="font-serif text-4xl lg:text-6xl mb-8">
            Ready to Create Something <span className="aurora-text-gradient-light">Exceptional</span>?
          </h2>
          
          <p className="text-xl text-[#1C1C1C]/70 mb-12 max-w-3xl mx-auto">
            Let's discuss your project and explore how we can transform your vision into reality with strategic design and technical excellence.
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

            <motion.div 
              className="flex items-center justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <motion.a
                href="https://linkedin.com/in/bensegev"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ opacity: 1, y: -1 }}
                className="font-mono text-sm text-[#1C1C1C] hover:aurora-text-gradient-light transition-all duration-300"
              >
                Connect on LinkedIn
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#FFFFF0]/20 opacity-10 blur-2xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#FFFFF0]/20 opacity-10 blur-2xl" />
    </section>
  );
} 