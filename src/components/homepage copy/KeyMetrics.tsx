"use client";

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import energyAnimation from '../../../public/lotties/Energy (1).json';
import discountAnimation from '../../../public/lotties/Discount (2).json';
import featureAnimation from '../../../public/lotties/Feature (1).json';
import Link from 'next/link';

const metrics = [
  {
    title: "SPEED",
    value: "20x",
    description: "Direct collaboration, faster decisions",
    animation: energyAnimation
  },
  {
    title: "COST",
    value: "1/3",
    description: "Budget-sensitive, no overhead",
    animation: discountAnimation
  },
  {
    title: "QUALITY",
    value: "A+",
    description: "Premium execution, every time",
    animation: featureAnimation
  }
];

export function KeyMetrics() {
  return (
    <section className="relative py-20 sm:py-32 lg:py-48 bg-gradient-to-br from-[#FFFFF0] to-[#1C1C1C]">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Aurora background effect */}
        <div className="aurora-bg" style={{
          backgroundImage: `url(${encodeURI('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CCFsxRTCZvCqB3oJFvQvePpyd0hO0L.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          mixBlendMode: 'screen'
        }} />
        <div className="mystical-accent-1"></div>
        <div className="mystical-accent-2"></div>
        <div className="mystical-accent-3"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 sm:gap-4 mb-12 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3">
            <div className="h-px w-8 bg-[#FFFFF0]/20" />
            <span className="font-mono text-sm tracking-wider aurora-text-gradient-light">
              THE ADVANTAGE
            </span>
            <div className="h-px w-8 bg-[#FFFFF0]/20" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-center text-[#FFFFF0]">
            Better Results,
            <motion.span
              className="block mt-2 relative"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.span
                className="absolute inset-0 aurora-text-gradient-light opacity-50"
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
                Faster
              </motion.span>
              <motion.span
                className="absolute inset-0 aurora-text-gradient-light"
                animate={{
                  backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
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
                Faster
              </motion.span>
              <span className="relative aurora-text-gradient-light">
                Faster
              </span>
            </motion.span>
          </h2>
          <p className="mt-4 sm:mt-6 text-center text-[#FFFFF0]/60 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl font-light leading-relaxed tracking-tight">
            Working closely together, we enable exceptional quality at every step. Through direct collaboration and focused execution, you receive premium results faster, without the traditional overhead.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 lg:gap-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FFFFF0]/10 to-[#1C1C1C]/90 border border-[#FFFFF0]/20 backdrop-blur-sm"
            >
              <div className="p-4 sm:p-6 md:p-8">
                <div className="text-xs sm:text-sm font-mono text-[#FFFFF0]/60 mb-2 sm:mb-4">
                  {metric.title}
                </div>
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <motion.div 
                    className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 10
                    }}
                  >
                    <motion.span 
                      className="inline-block"
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                      }}
                      transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        backgroundSize: "200% auto",
                        backgroundImage: "linear-gradient(90deg, #FFFFF0 0%, #E8E6D9 25%, #D4D1C1 50%, #E8E6D9 75%, #FFFFF0 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}
                    >
                      {metric.value}
                    </motion.span>
                  </motion.div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
                    <Lottie 
                      animationData={metric.animation}
                      loop={true}
                      autoplay={true}
                      style={{ width: '100%', height: '100%' }}
                      rendererSettings={{
                        preserveAspectRatio: 'xMidYMid slice'
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Dark strip at bottom for description */}
              <div className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-[#1C1C1C]/70 text-[#FFFFF0]/60 text-sm sm:text-base">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simplified CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 sm:mt-24 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-6 sm:px-10 py-4 sm:py-5 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 transition-all duration-300 rounded-lg sm:rounded-xl overflow-hidden shadow-lg"
          >
            <Link href="/work" className="relative z-10">
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
              <span className="relative z-10 font-mono text-base sm:text-lg text-[#FFFFF0]">View Selected Projects</span>
            </Link>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 