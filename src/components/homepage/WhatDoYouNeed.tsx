'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const needs = [
  {
    id: 'website',
    question: "Need a website that stands out?",
    description: "Not just any website—one that tells your story and drives growth",
    gradient: "from-[#38BDF8] via-[#818CF8] to-[#34D399]",
    colors: ["#38BDF8", "#818CF8", "#34D399"],
    deliverables: ["Brand Strategy", "Website Design", "UX/UI", "Content Strategy"],
    insight: "Get both the site you need now and the strategic foundation for what's next"
  },
  {
    id: 'brand',
    question: "Want to build a stronger brand?",
    description: "Transform your identity into something that resonates and scales",
    gradient: "from-[#818CF8] via-[#C084FC] to-[#F472B6]",
    colors: ["#818CF8", "#C084FC", "#F472B6"],
    deliverables: ["Brand Strategy", "Visual Identity", "Brand Voice", "Marketing Assets"],
    insight: "Create a brand that grows with you, built on strategy and storytelling"
  },
  {
    id: 'growth',
    question: "Ready to accelerate growth?",
    description: "Turn your vision into a clear path forward",
    gradient: "from-[#34D399] via-[#38BDF8] to-[#818CF8]",
    colors: ["#34D399", "#38BDF8", "#818CF8"],
    deliverables: ["Growth Strategy", "Marketing Roadmap", "Launch Strategy", "Sales Enablement"],
    insight: "Get the strategy, tools, and guidance to reach your next level"
  }
];

export function WhatDoYouNeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNeed, setActiveNeed] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Refined Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-6"
        style={{ opacity }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4 mb-8"
            >
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-[#1C1C1C]/0 via-[#1C1C1C]/10 to-[#1C1C1C]/0" />
                <span className="font-mono text-xs tracking-wider text-[#1C1C1C]/40 uppercase">
                  What do you need?
                </span>
                <div className="h-px w-12 bg-gradient-to-r from-[#1C1C1C]/0 via-[#1C1C1C]/10 to-[#1C1C1C]/0" />
              </div>
            </motion.div>

            <h2 className="font-serif text-4xl lg:text-5xl text-[#1C1C1C] mb-6">
              Let's start with your needs
            </h2>
            <p className="text-lg text-[#1C1C1C]/60 max-w-2xl mx-auto font-light">
              Choose what interests you, and I'll show you how we can make it happen
            </p>
          </div>

          {/* Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {needs.map((need, index) => (
              <motion.div
                key={need.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="group"
                onMouseEnter={() => {
                  setActiveNeed(need.id);
                  setIsHovering(true);
                }}
                onMouseLeave={() => {
                  setActiveNeed(null);
                  setIsHovering(false);
                }}
              >
                <motion.div 
                  className="relative h-full rounded-2xl bg-white overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Aurora Border Effect */}
                  <motion.div 
                    className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(to right, ${need.colors.join(', ')})`,
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Card Content */}
                  <div className="relative h-full bg-white/95 backdrop-blur-sm p-8">
                    <div className="flex flex-col h-full">
                      {/* Question */}
                      <h3 className="text-2xl font-serif text-[#1C1C1C] mb-4">
                        {need.question}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-base text-[#1C1C1C]/70 mb-8">
                        {need.description}
                      </p>

                      {/* Deliverables */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {need.deliverables.map((deliverable) => (
                          <span 
                            key={deliverable}
                            className="inline-flex px-3 py-1 rounded-full text-sm bg-[#1C1C1C]/[0.03] text-[#1C1C1C]/60"
                          >
                            {deliverable}
                          </span>
                        ))}
                      </div>

                      {/* Insight */}
                      <div className="mt-auto pt-6 border-t border-[#1C1C1C]/5">
                        <p className="text-base text-[#1C1C1C]/80 font-light">
                          {need.insight}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <div className="inline-block">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="#contact" 
                  className="relative z-10 inline-flex items-center gap-4 px-8 py-4 bg-[#1C1C1C] rounded-xl overflow-hidden"
                >
                  {/* Background Aurora Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: 'linear-gradient(to right, #38BDF8, #818CF8, #34D399)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Content */}
                  <span className="relative font-mono text-base text-white/90 tracking-wide">
                    Let's explore your needs
                  </span>
                  
                  {/* Animated Arrow */}
                  <motion.div
                    className="relative flex items-center justify-center w-6 h-6"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRightIcon className="w-5 h-5 text-white/90" />
                  </motion.div>
                </Link>

                {/* Glow Effect */}
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#38BDF8]/20 via-[#818CF8]/20 to-[#34D399]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Subtle Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20"
                  style={{
                    background: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </div>

            {/* Optional: Subtle Label */}
            <motion.div 
              className="mt-6 font-mono text-sm text-[#1C1C1C]/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              No pressure, just possibilities
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 