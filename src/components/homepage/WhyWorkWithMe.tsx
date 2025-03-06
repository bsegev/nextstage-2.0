'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, 
  Workflow, 
  LayoutPanelTop,
  Sparkles
} from 'lucide-react';

const DifferentiatorCard = ({ title, description, color }: {
  title: string; 
  description: string;
  color: 'blue' | 'purple' | 'emerald' | 'amber';
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative p-6 rounded-xl overflow-hidden transition-all duration-300 border border-ethereal-dark/5",
        "lg:cursor-pointer",
        color === 'blue' && "lg:hover:bg-blue-50/30",
        color === 'purple' && "lg:hover:bg-purple-50/30",
        color === 'emerald' && "lg:hover:bg-emerald-50/30",
        color === 'amber' && "lg:hover:bg-amber-50/30"
      )}
    >
          <h3 className={cn(
        "text-xl font-serif mb-2",
            color === 'blue' && "text-blue-600",
            color === 'purple' && "text-purple-600",
            color === 'emerald' && "text-emerald-600",
            color === 'amber' && "text-amber-600"
          )}>
            {title}
          </h3>
      <AnimatePresence>
        {isHovered && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="hidden lg:block text-ethereal-dark/70"
          >
                {description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function WhyWorkWithMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.section
      ref={containerRef}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden font-sans bg-gradient-to-b from-white to-gray-50"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(147,51,234,0.03),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Column */}
            <div>
          <motion.div 
                className="mb-8 sm:mb-12"
            style={{ y }}
          >
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                className="h-px bg-ethereal-dark/20" 
              />
                  <span className="font-mono text-xs sm:text-sm text-ethereal-dark/60 tracking-wider uppercase">
                Beyond Siloed Solutions
              </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ethereal-dark mb-4 sm:mb-6">
                  Most People Give You a{' '}
                  <motion.span
                    className="relative inline-block"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      backgroundImage: `linear-gradient(
                        to right,
                        #3b82f6 0%,    /* Deep blue anchor */
                        #4f46e5 15%,   /* Deep indigo */
                        #38bdf8 30%,   /* Bright sky blue */
                        #818cf8 45%,   /* Soft indigo */
                        #2dd4bf 60%,   /* Teal accent */
                        #4f46e5 75%,   /* Back to deep indigo */
                        #38bdf8 90%,   /* Sky blue finish */
                        #3b82f6 100%   /* Deep blue anchor */
                      )`,
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent"
                    }}
                  >
                    Siloed Solution
                  </motion.span>
                </h2>
                <p className="text-base sm:text-lg text-ethereal-dark/70 max-w-2xl">
                  Most teams force you to stitch together solutions yourself—hiring a consultant for strategy, a designer for branding, a developer to build, and a separate expert for AI.
                </p>
              </motion.div>

              {/* Problem Statement */}
              <div className="grid gap-3 sm:gap-4">
                <DifferentiatorCard
                  title="Designers focus on looks"
                  description="Beautiful but disconnected from business goals"
                  color="blue"
                />
                <DifferentiatorCard
                  title="Builders focus on function"
                  description="Powerful but misaligned with brand and users"
                  color="purple"
                />
                <DifferentiatorCard
                  title="Strategists focus on ideas"
                  description="Smart plans that often fail in execution"
                  color="emerald"
                />
                <DifferentiatorCard
                  title="AI automates without context"
                  description="Fast but missing human insight and strategy"
                  color="amber"
                />
              </div>
            </div>

            {/* Right Column - The Solution */}
            <div className="relative lg:sticky lg:top-32 mt-8 lg:mt-0">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100/50 via-blue-100/30 to-emerald-100/50 p-4 sm:p-6 lg:p-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="relative rounded-lg overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20 p-6 sm:p-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-emerald-600/5" />
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-serif text-ethereal-dark mb-6 sm:mb-8">
                      I Make Everything Work Together
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-8">
                      {[
                        {
                          icon: LayoutPanelTop,
                          title: "Design with Purpose",
                          description: "Every design element serves your business goals and drives results",
                          color: "blue"
                        },
                        {
                          icon: BrainCircuit,
                          title: "Build for Growth",
                          description: "Technical solutions that scale with your business",
                          color: "purple"
                        },
                        {
                          icon: Workflow,
                          title: "Strategy That Works",
                          description: "Plans built for real-world implementation",
                          color: "emerald"
                        },
                        {
                          icon: Sparkles,
                          title: "AI Done Right",
                          description: "Meaningful automation guided by human expertise",
                          color: "amber"
                        }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <div className={cn(
                            "flex-shrink-0 p-2 rounded-lg",
                            "bg-gradient-to-br from-white to-white/80",
                            "shadow-sm"
                          )}>
                            <item.icon className={cn(
                              "w-5 h-5",
                              item.color === 'blue' && "text-blue-500",
                              item.color === 'purple' && "text-purple-500",
                              item.color === 'emerald' && "text-emerald-500",
                              item.color === 'amber' && "text-amber-500"
                            )} />
                          </div>
                          <div>
                            <h4 className={cn(
                              "font-serif text-lg mb-1",
                              item.color === 'blue' && "text-blue-600",
                              item.color === 'purple' && "text-purple-600",
                              item.color === 'emerald' && "text-emerald-600",
                              item.color === 'amber' && "text-amber-600"
                            )}>
                              {item.title}
                            </h4>
                            <p className="text-sm text-ethereal-dark/70">
                              {item.description}
                            </p>
                          </div>
          </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-8 group relative px-8 py-4 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 
                        transition-all duration-300 rounded-xl overflow-hidden shadow-lg text-center"
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
                      <span className="relative z-10 font-mono text-lg text-[#FFFFF0]">
                        See If We're a Fit
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
} 