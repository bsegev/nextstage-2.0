"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function LearnBook() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-50 via-surface-50/95 to-surface-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-emerald-500/[0.02]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Book Display */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full max-w-[500px] mx-auto transform hover:scale-[1.02] hover:-translate-y-2 hover:rotate-y-[-8deg] transition-all duration-500 perspective-1000">
                {/* Glow Effects */}
                <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[90%] h-[2px] bg-blue-400/50 blur-sm" />
                <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-blue-300 shadow-glow" />
                
                <Image
                  src="/images/artoftheprompt_book.png"
                  alt="The Art of the Prompt Book"
                  width={800}
                  height={1000}
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,170,255,0.25)] transition-all duration-500 hover:drop-shadow-[0_30px_60px_rgba(0,170,255,0.35)]"
                  priority
                  quality={100}
                />
                
                {/* Premium Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-emerald-500/10 mix-blend-overlay opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-blue-500/10 mix-blend-overlay opacity-75" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="flex items-center gap-3 mb-8">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "2rem" }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-px bg-ethereal-dark/20" 
                />
                <span className="font-mono text-sm text-ethereal-dark/60 tracking-wider uppercase">
                  Featured Book
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-ethereal-dark mb-6">
                The Art of the Prompt
              </h2>

              <p className="text-xl text-ethereal-dark/80 mb-8 leading-relaxed">
                Master the craft of prompt engineering with our comprehensive guide. Learn advanced techniques to unlock the full potential of AI language models.
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5" />
                  <p className="text-lg text-ethereal-dark/70">Advanced prompt engineering techniques for real-world applications</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5" />
                  <p className="text-lg text-ethereal-dark/70">Practical examples and case studies from industry experts</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5" />
                  <p className="text-lg text-ethereal-dark/70">Framework for creating reliable and efficient AI interactions</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 transition-all duration-300 rounded-xl overflow-hidden shadow-lg"
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
                  <span className="relative z-10 font-mono text-lg text-[#FFFFF0] flex items-center gap-3">
                    <span>Buy Now - $89</span>
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>

                <div className="flex flex-col gap-1">
                  <span className="font-mono text-sm text-ethereal-dark/60">
                    Includes
                  </span>
                  <span className="text-ethereal-dark/80">
                    Digital book + Bonus resources
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 