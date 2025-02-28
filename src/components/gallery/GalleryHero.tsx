"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export function GalleryHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-ethereal-dark to-ethereal-dark/90" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
        
        {/* Animated gradient sweep */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            backgroundImage: "linear-gradient(45deg, rgba(56, 189, 248, 0.15) 0%, rgba(129, 140, 248, 0.15) 50%, rgba(52, 211, 153, 0.15) 100%)",
            backgroundSize: "400% 400%",
          }}
        />

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl"
            animate={{
              x: ["-25%", "25%"],
              y: ["-25%", "25%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              left: "25%",
              top: "25%",
            }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl"
            animate={{
              x: ["25%", "-25%"],
              y: ["25%", "-25%"],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1,
            }}
            style={{
              right: "25%",
              bottom: "25%",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 justify-center">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-white/20" 
              />
              <span className="font-mono text-sm text-white/60 tracking-wider uppercase">
                AI Art Gallery
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-white/20" 
              />
            </div>
          </motion.div>

          {/* Main Title */}
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-8">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Where AI Meets
            </motion.span>
            <motion.span
              className="block relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.span
                className="absolute inset-0 aurora-text-gradient-light opacity-50"
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
                Artistry
              </motion.span>
              <motion.span
                className="absolute inset-0 aurora-text-gradient-light"
                animate={{
                  backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                Artistry
              </motion.span>
              <span className="relative aurora-text-gradient-light">
                Artistry
              </span>
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto"
          >
            Explore a curated collection of AI-generated artworks spanning multiple mediums and styles, pushing the boundaries of digital creativity.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16"
          >
            <div className="text-center">
              <div className="text-4xl font-serif text-white mb-2">12+</div>
              <div className="text-sm font-mono text-white/60">Unique Works</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif text-white mb-2">3</div>
              <div className="text-sm font-mono text-white/60">Media Types</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif text-white mb-2">5</div>
              <div className="text-sm font-mono text-white/60">Featured Pieces</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-white/20 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
} 