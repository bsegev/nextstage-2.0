'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function AboutStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const beliefs = [
    {
      text: "Strategy without execution is just theory – I bridge both worlds",
      gradient: "from-blue-500 to-blue-600",
      delay: 0
    },
    {
      text: "Real impact comes from understanding the entire system, not just parts",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      text: "The best solutions emerge when vision, design, engineering, and strategy come together",
      gradient: "from-emerald-400 to-emerald-500",
      delay: 0.2
    },
    {
      text: "Move fast, but build things right – speed shouldn't compromise quality",
      gradient: "from-blue-500 to-purple-500",
      delay: 0.3
    },
    {
      text: "Plan for pivots – the best solutions are built to adapt as quickly as opportunities emerge",
      gradient: "from-purple-500 to-emerald-500",
      delay: 0.4
    }
  ];

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-surface-50">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-50 via-surface-50/95 to-surface-50" />
        {/* Ambient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-32 sm:py-40">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            {/* Section header */}
            <div className="flex items-center gap-3 justify-center">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-ethereal-dark/20" 
              />
              <span className="font-mono text-sm text-ethereal-dark/60 tracking-wider uppercase">
                The Journey
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-ethereal-dark/20" 
              />
            </div>

            {/* Main header */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-ethereal-dark text-center"
            >
              Lessons Learned<br />
              <span className="aurora-text-gradient-light">& Principles Applied</span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-xl text-ethereal-dark/70 max-w-3xl mx-auto text-center"
              style={{ y }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Through years of building, leading, and transforming, I've developed a set of core principles that guide every decision. 
              These insights shape how I approach challenges and create solutions that stand the test of time.
            </motion.p>

            {/* Core Beliefs - Enhanced Layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <h3 className="font-serif text-3xl text-ethereal-dark text-center mb-12">
                <span className="aurora-text-gradient-light">Principles</span> That Drive Me
              </h3>
              
              <div className="space-y-8">
                {beliefs.map((belief, i) => (
                  <motion.div
                    key={i}
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: belief.delay, duration: 0.5 }}
                  >
                    <div className="relative flex items-center gap-6 p-4 rounded-xl group-hover:bg-white/5 transition-all duration-500">
                      {/* Animated line */}
                      <motion.div 
                        className={`h-px w-16 bg-gradient-to-r ${belief.gradient}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: 64 }}
                        viewport={{ once: true }}
                        transition={{ delay: belief.delay + 0.3, duration: 0.8 }}
                      />
                      
                      {/* Text with hover effect */}
                      <motion.p 
                        className="flex-1 text-lg text-ethereal-dark/80 group-hover:text-ethereal-dark transition-colors duration-300"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {belief.text}
                      </motion.p>

                      {/* Gradient dot */}
                      <motion.div 
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${belief.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: belief.delay + 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Added Closing Statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center pt-16"
              >
                <p className="text-xl text-ethereal-dark/70">
                  I'm not just here to contribute – I'm here to ensure everything{' '}
                  <span className="aurora-text-gradient-light">holds together</span>, works at its{' '}
                  <span className="aurora-text-gradient-light">best</span>, and helps move you{' '}
                  <span className="aurora-text-gradient-light">forward</span>.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 