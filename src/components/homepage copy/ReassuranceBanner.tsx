'use client';

import { motion } from 'framer-motion';
import { IconArrowRight, IconMessageCircle2, IconBrush, IconChartBar, IconCode, IconCalendarEvent } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { TextRevealCard } from '@/components/ui/text-reveal-card';

export function ReassuranceBanner() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  
  const services = [
    { id: 'design', icon: IconBrush, label: 'design' },
    { id: 'strategy', icon: IconChartBar, label: 'strategy' },
    { id: 'tech', icon: IconCode, label: 'tech' }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-50 via-surface-50/95 to-surface-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-emerald-500/[0.02]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-sm border border-ethereal-dark/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl overflow-hidden"
          >
            {/* Background Gradient Animation */}
            <motion.div 
              className="absolute inset-0 opacity-10"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, #38BDF8 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, #34D399 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, #38BDF8 0%, transparent 50%)',
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            <div className="relative flex flex-col gap-8">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8">
                <div className="flex-1">
                  <motion.h3 
                    className="text-xl sm:text-2xl md:text-3xl font-serif text-ethereal-dark mb-3 sm:mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    You're in the <span className="aurora-text-gradient-light">right place</span>
                  </motion.h3>
                  <motion.p 
                    className="text-base sm:text-lg text-ethereal-dark/70 leading-relaxed font-['Inter']"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Whether you're just getting started or planning a complete digital transformation, I'm here to help at whatever level makes sense for you right now.
                  </motion.p>
                </div>
              </div>

              {/* Text Reveal Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full overflow-hidden"
              >
                <TextRevealCard
                  text="You have the idea you want to build"
                  revealText="I have the tools to help make it happen"
                  className="bg-transparent shadow-none border-none w-full"
                />
              </motion.div>

              {/* Services Section */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-ethereal-dark/5">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {services.map((service, index) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onHoverStart={() => setHoveredService(service.id)}
                        onHoverEnd={() => setHoveredService(null)}
                        className="relative group"
                      >
                        <div className={`
                          flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full 
                          transition-all duration-300
                          ${hoveredService === service.id 
                            ? 'bg-ethereal-dark text-white' 
                            : 'bg-ethereal-dark/5 text-ethereal-dark/70 hover:bg-ethereal-dark/10'
                          }
                        `}>
                          <service.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm font-medium">{service.label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                >
                  <Link href="#contact" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 transition-all duration-300 rounded-lg sm:rounded-xl overflow-hidden shadow-lg"
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
                      <span className="relative z-10 font-mono text-base sm:text-lg text-[#FFFFF0] flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                        <IconCalendarEvent className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Book an intro meeting</span>
                        <motion.span 
                          className="inline-block"
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >→</motion.span>
                      </span>
                    </motion.button>
                  </Link>
                  
                  <Link 
                    href="/learn" 
                    className="group flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 text-ethereal-dark/70 hover:text-ethereal-dark transition-colors"
                  >
                    <span className="font-mono text-sm sm:text-base">Learn more</span>
                    <motion.span 
                      className="inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >→</motion.span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 