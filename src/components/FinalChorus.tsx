'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function FinalChorus() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-[#FFFFF0]/10">
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

      <div className="relative z-10 container mx-auto px-4 py-24 text-center">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-12"
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-serif">
            Ready to transform your <span className="aurora-text-gradient-light">vision</span> into <span className="aurora-text-gradient-light">reality</span>?
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            {/* Primary CTA */}
            <motion.a
              href="#contact"
              className="group relative px-8 py-4 bg-[#FFFFF0]/80 backdrop-blur-sm border border-[#1C1C1C]/10 hover:bg-[#FFFFF0] hover:border-[#1C1C1C]/20 transition-all duration-300 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              <span className="relative z-10 font-mono text-lg aurora-text-gradient-light">Let's Create</span>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 border border-[#1C1C1C]/10 hover:border-[#1C1C1C]/30 transition-all duration-300 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-mono text-lg text-[#1C1C1C]/70 group-hover:aurora-text-gradient-light">
                Connect on LinkedIn
              </span>
            </motion.a>
          </div>

          {/* Availability Indicator */}
          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-2 bg-white/50 rounded-full border border-[#34D399]/20 backdrop-blur-sm mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-[#34D399]"
              animate={{
                opacity: [1, 0.5, 1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="font-mono text-sm aurora-text-gradient-light">Available for new clients</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 