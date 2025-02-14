'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { BeakerIcon, BoltIcon, ShieldCheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GlareCard } from '@/components/ui/glare-card';

export function AboutIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      title: "Practical",
      icon: BeakerIcon,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Direct",
      icon: BoltIcon,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Protected",
      icon: ShieldCheckIcon,
      gradient: "from-emerald-400 to-emerald-500",
    }
  ];

  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-50 via-surface-50/95 to-surface-50" />
        {/* Ambient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-32"
          >
            {/* Opening statement */}
            <div className="space-y-6">
              <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {/* Background accent */}
                <motion.div
                  className="absolute -inset-x-12 -inset-y-8 bg-gradient-to-r from-blue-50/0 via-blue-50/30 to-blue-50/0 rounded-3xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.1 }}
                />
                
                <div className="relative text-2xl sm:text-3xl font-light text-ethereal-dark/90 leading-[2] tracking-tight">
                  <motion.span 
                    className="inline-block mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    I've witnessed the challenges firsthand—
                  </motion.span>
                  <br className="hidden sm:block mb-8" />
                  <motion.span 
                    className="inline-block aurora-text-gradient-light mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    That's why I've developed an approach that puts your success first.
                  </motion.span>
                </div>
              </motion.div>
            </div>

            {/* Three Column Glare Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24">
              <GlareCard className="aspect-[3/2] md:aspect-[17/21] bg-gradient-to-br from-[#1C1C1C]/[0.01] to-[#1C1C1C]/[0.07]">
                <div className="p-6 md:p-8 h-full flex flex-col">
                  <div className="mb-auto">
                    <BeakerIcon className="w-6 h-6 md:w-8 md:h-8 text-blue-500/80 mb-4 md:mb-6" />
                    <h3 className="text-lg md:text-xl font-serif text-ethereal-dark mb-2 md:mb-3">Design × Engineering</h3>
                    <p className="text-sm text-ethereal-dark/70">
                      Bridging aesthetics and functionality to create solutions that work beautifully.
                    </p>
                  </div>
                  <div className="h-px w-full bg-[#1C1C1C]/[0.05] mt-auto mb-4 md:mb-6" />
                  <div className="text-[10px] md:text-xs text-ethereal-dark/40 font-mono">01 — METHOD</div>
                </div>
              </GlareCard>

              <GlareCard className="aspect-[3/2] md:aspect-[17/21] bg-gradient-to-br from-[#1C1C1C]/[0.01] to-[#1C1C1C]/[0.07]">
                <div className="p-6 md:p-8 h-full flex flex-col">
                  <div className="mb-auto">
                    <BoltIcon className="w-6 h-6 md:w-8 md:h-8 text-purple-500/80 mb-4 md:mb-6" />
                    <h3 className="text-lg md:text-xl font-serif text-ethereal-dark mb-2 md:mb-3">Efficient × Mindful</h3>
                    <p className="text-sm text-ethereal-dark/70">
                      Moving with purpose while maintaining attention to detail and quality.
                    </p>
                  </div>
                  <div className="h-px w-full bg-[#1C1C1C]/[0.05] mt-auto mb-4 md:mb-6" />
                  <div className="text-[10px] md:text-xs text-ethereal-dark/40 font-mono">02 — PROCESS</div>
                </div>
              </GlareCard>

              <GlareCard className="aspect-[3/2] md:aspect-[17/21] bg-gradient-to-br from-[#1C1C1C]/[0.01] to-[#1C1C1C]/[0.07]">
                <div className="p-6 md:p-8 h-full flex flex-col">
                  <div className="mb-auto">
                    <ShieldCheckIcon className="w-6 h-6 md:w-8 md:h-8 text-emerald-500/80 mb-4 md:mb-6" />
                    <h3 className="text-lg md:text-xl font-serif text-ethereal-dark mb-2 md:mb-3">Guidance × Support</h3>
                    <p className="text-sm text-ethereal-dark/70">
                      Providing direction while ensuring you have the backing to succeed.
                    </p>
                  </div>
                  <div className="h-px w-full bg-[#1C1C1C]/[0.05] mt-auto mb-4 md:mb-6" />
                  <div className="text-[10px] md:text-xs text-ethereal-dark/40 font-mono">03 — PARTNERSHIP</div>
                </div>
              </GlareCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 