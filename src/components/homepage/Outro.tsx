'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import cubeCircleLoader from '../../../public/lotties/cube-and-circle-preloader (1).json';

export function Outro() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-white to-[#FFFFF0]/10">
      {/* Background Effects */}
      <div className="absolute inset-0">
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

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative"
        >
          {/* Minimalist Circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 aspect-square w-[280px] sm:w-[500px]">
            <motion.div
              className="relative w-full h-full"
              animate={{ 
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-[#1C1C1C]/10"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 1, 0.4],
                  rotate: [0, -180, 0]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute inset-0 rounded-full border border-[#1C1C1C]/5"
                animate={{ 
                  scale: [1.1, 1, 1.1],
                  opacity: [0.2, 0.8, 0.2],
                  rotate: [180, 0, 180]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative">
            {/* Cube and Circle Preloader */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto -mb-16 sm:-mb-24 relative">
              <div className="relative">
                <Lottie 
                  animationData={cubeCircleLoader}
                  loop={true}
                  style={{ 
                    width: '100%', 
                    height: '100%',
                  }}
                />
                <style jsx global>{`
                  #line path {
                    stroke: url(#aurora-gradient);
                    stroke-width: 20;
                  }
                  
                  @keyframes aurora-shift {
                    0% { stop-color: #4F46E5; }
                    50% { stop-color: #E879F9; }
                    100% { stop-color: #4F46E5; }
                  }

                  #aurora-gradient-start {
                    animation: aurora-shift 4s ease-in-out infinite;
                  }

                  #aurora-gradient-end {
                    animation: aurora-shift 4s ease-in-out infinite reverse;
                  }
                `}</style>
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop id="aurora-gradient-start" offset="0%" />
                      <stop id="aurora-gradient-end" offset="100%" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <div className="mt-16 sm:mt-24">
              <p className="text-xl sm:text-2xl md:text-3xl text-[#1C1C1C]/80 leading-relaxed font-sans max-w-2xl mx-auto">
                Between vision and execution, between strategy and craft, there's a moment where{' '}
                <motion.span 
                  className="aurora-text-gradient-light font-normal"
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  clarity
                </motion.span>
                {' '}meets{' '}
                <motion.span 
                  className="aurora-text-gradient-light font-normal"
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  purpose
                </motion.span>
                .
              </p>
            </div>

            <div className="mt-24 sm:mt-32">
              <motion.p
                className="text-lg sm:text-xl md:text-2xl font-serif max-w-xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                Let's create something <span className="aurora-text-gradient-light">meaningful</span>.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
              className="font-mono text-sm text-[#1C1C1C]/50 mt-8"
            >
              — Ben Segev
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 