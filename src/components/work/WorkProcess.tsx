'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const examples = [
  {
    scenario: "Let's say you need a website",
    blend: "I'll naturally weave in strategy discussions as we build, helping shape your story and align everything with your goals",
    audience: "Perfect for founders & startups",
    insight: "You get both the site you need now and the strategic foundation for what's next",
    gradient: "from-[#38BDF8] via-[#818CF8] to-[#34D399]",
    colors: ["#38BDF8", "#818CF8", "#34D399"],
    number: "01"
  },
  {
    scenario: "Or you're starting out solo",
    blend: "I'll stand by you as we validate your ideas, shape your vision, and build strong foundations for growth",
    audience: "Perfect for early-stage founders",
    insight: "Get the confidence and clarity to move forward with purpose",
    gradient: "from-[#818CF8] via-[#C084FC] to-[#F472B6]",
    colors: ["#818CF8", "#C084FC", "#F472B6"],
    number: "02"
  },
  {
    scenario: "Maybe you've got momentum but need guidance",
    blend: "I'll help your team navigate complexity, align efforts, and stay focused on what matters most",
    audience: "Great for growing teams & leaders",
    insight: "Turn overwhelming possibilities into clear, confident decisions",
    gradient: "from-[#34D399] via-[#38BDF8] to-[#818CF8]",
    colors: ["#34D399", "#38BDF8", "#818CF8"],
    number: "03"
  }
];

export function WorkProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
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
                  How We Work Together
                </span>
                <div className="h-px w-12 bg-gradient-to-r from-[#1C1C1C]/0 via-[#1C1C1C]/10 to-[#1C1C1C]/0" />
              </div>
            </motion.div>

            <h2 className="font-serif text-4xl lg:text-5xl text-[#1C1C1C] mb-6">
              Here's how it might look
            </h2>
            <p className="text-lg text-[#1C1C1C]/60 max-w-2xl mx-auto font-light">
              You'll get more than what you came for (in a good way).
            </p>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {examples.map((example, index) => (
              <motion.div
                key={example.scenario}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full rounded-2xl bg-white overflow-hidden p-[1px]">
                  {/* Aurora Border Effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(to right, ${example.colors.join(', ')})`,
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
                  <div className="relative h-full rounded-2xl bg-white overflow-hidden">
                    {/* Enhanced Gradient Border Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className={`absolute inset-0 bg-gradient-to-r ${example.gradient} opacity-10`} />
                    </div>

                    <div className="relative p-8 h-full flex flex-col">
                      {/* Number */}
                      <div className="font-mono text-xs text-[#1C1C1C]/20 mb-8">
                        {example.number}
                      </div>

                      {/* Main Content */}
                      <div className="flex flex-col h-full">
                        {/* Scenario Section */}
                        <div className="mb-8">
                          <div className="font-mono text-xs text-[#1C1C1C]/40 mb-3">SCENARIO</div>
                          <h3 className="text-xl font-serif text-[#1C1C1C] mb-6">{example.scenario}</h3>
                          
                          {/* Audience Tag */}
                          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#1C1C1C]/[0.02] border border-[#1C1C1C]/5">
                            <div className="text-sm text-[#1C1C1C]/60">{example.audience}</div>
                          </div>
                        </div>

                        {/* Process Section */}
                        <div className="mb-8">
                          <div className="font-mono text-xs text-[#1C1C1C]/40 mb-3">WHAT HAPPENS</div>
                          <p className="text-base text-[#1C1C1C]/80 font-light leading-relaxed">
                            {example.blend}
                          </p>
                        </div>

                        {/* Outcome Section - At the bottom */}
                        <div className="mt-auto pt-8 border-t border-[#1C1C1C]/5">
                          <div className="font-mono text-xs text-[#1C1C1C]/40 mb-3">THE UPSIDE</div>
                          <p className="text-base text-[#1C1C1C]/80 font-light leading-relaxed">
                            {example.insight}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced CTA */}
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
                    See what we can do together
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