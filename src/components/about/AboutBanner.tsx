'use client';

import { motion } from 'framer-motion';

export function AboutBanner() {
  return (
    <section className="relative bg-gradient-to-b from-white to-surface-50/30">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-emerald-500/[0.02]" />
      </div>

      {/* Content */}
      <div className="relative py-20 md:py-28 border-y border-ethereal-dark/[0.03]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 max-w-7xl mx-auto">
            {/* Left Column - Main Quote */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.1]">
                <span className="block text-ethereal-dark mb-2">Creative by nature,</span>
                <span className="block text-ethereal-dark mb-2">strategic by experience—</span>
                <motion.span 
                  className="block aurora-text-gradient-light"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    backgroundSize: "200% auto",
                  }}
                >
                  I help bring structure to ideas and ideas to life.
                </motion.span>
              </h2>
            </motion.div>

            {/* Right Column - Description */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center"
            >
              <div className="space-y-8">
                <p className="text-lg md:text-xl text-ethereal-dark/80 leading-relaxed">
                  Every great idea needs vision and structure. I help shape your idea, refine it into something tangible, and guide it through execution.
                </p>
                <p className="text-lg md:text-xl text-ethereal-dark/80 leading-relaxed">
                  Whether you're starting fresh, refining what's already in motion, or facing a challenge that needs solving, I bring clarity, momentum, and a steady hand to make it work.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary-50/40 to-secondary-50/40 rounded-full blur-3xl opacity-20 transform translate-x-1/3 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-secondary-50/40 to-primary-50/40 rounded-full blur-3xl opacity-20 transform -translate-x-1/3 translate-y-1/2" />
        </div>
      </div>
    </section>
  );
} 