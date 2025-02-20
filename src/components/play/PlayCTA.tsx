'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

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
              <span className="relative z-10 font-mono text-lg text-[#FFFFF0]">Start a Conversation</span>
            </motion.button>

            <motion.div 
              className="flex items-center justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <motion.a
                href="https://github.com/bsegev"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ opacity: 1, y: -1 }}
                className="font-mono text-sm text-[#1C1C1C] hover:aurora-text-gradient-light transition-all duration-300"
              >
                View on GitHub
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