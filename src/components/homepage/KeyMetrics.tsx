"use client";

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import energyAnimation from '/public/lotties/Energy (1).json';
import discountAnimation from '/public/lotties/Discount (2).json';
import featureAnimation from '/public/lotties/Feature (1).json';
import handshakeAnimation from '/public/lotties/bullseye.json';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const metrics = [
  {
    title: "SPEED",
    value: "20x",
    description: "Direct collab, faster decisions",
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
  },
  {
    title: "ALIGNMENT",
    value: "100%",
    description: "Your vision, brought to life",
    animation: handshakeAnimation
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
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Label */}
          <motion.div 
            className="inline-flex items-center gap-2 sm:gap-3 mb-6"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div 
              className="h-px w-6 sm:w-8 bg-gradient-to-r from-blue-500/80 to-purple-500/80"
              initial={{ width: 0 }}
              whileInView={{ width: "2rem" }}
              transition={{ duration: 0.8 }}
            />
            <span className="font-mono text-xs sm:text-sm tracking-wider text-[#FFFFF0] uppercase">
              The Advantage
            </span>
            <motion.div 
              className="h-px w-6 sm:w-8 bg-gradient-to-r from-purple-500/80 to-emerald-500/80"
              initial={{ width: 0 }}
              whileInView={{ width: "2rem" }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          {/* Main Heading with Gradient */}
          <div className="relative mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FFFFF0]">
              Better Results,{' '}
              <span className="block mt-2 sm:mt-3">
                <span className="aurora-text-gradient-light relative">
                  Faster & Smarter
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </span>
              </span>
            </h2>
          </div>

          {/* Subheading */}
          <p className="font-sans text-lg sm:text-xl text-[#FFFFF0]/70 max-w-3xl mx-auto mb-12 sm:mb-16 leading-relaxed">
            Working closely together, we enable exceptional quality at every step. Through direct collaboration and focused execution, you receive premium results faster, without the traditional overhead.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-[#FFFFF0]/10 to-[#1C1C1C]/90 border border-[#FFFFF0]/20 backdrop-blur-sm aspect-[9/8] md:aspect-auto"
            >
              <div className="h-full flex flex-col">
                <div className="p-6 sm:p-4 md:p-6 flex-1 flex flex-col">
                  <div className="text-sm sm:text-xs md:text-base lg:text-lg font-mono text-[#FFFFF0]/60 mb-4 sm:mb-2 md:mb-3 uppercase tracking-wider">
                    {metric.title}
                  </div>
                  <div className="flex items-center justify-between flex-1">
                    <div className="font-serif text-3xl sm:text-3xl md:text-5xl lg:text-6xl">
                      <span 
                        className="inline-block"
                        style={{
                          backgroundImage: "linear-gradient(90deg, #FFFFF0 0%, #E8E6D9 25%, #D4D1C1 50%, #E8E6D9 75%, #FFFFF0 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          backgroundSize: "200% auto"
                        }}
                      >
                        {metric.value}
                      </span>
                    </div>
                    <div className="w-14 h-14 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
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
                <div className="hidden sm:block px-4 py-3 bg-[#1C1C1C]/70 text-[#FFFFF0]/60 text-sm sm:text-xs md:text-sm lg:text-base font-serif">
                  {metric.description}
                </div>
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
          <Link href="/work">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-ethereal-dark rounded-xl overflow-hidden group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative font-mono text-white">
                View Selected Projects
              </span>
              <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 