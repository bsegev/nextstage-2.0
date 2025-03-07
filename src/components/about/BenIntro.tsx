'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { LightBulbIcon, RocketLaunchIcon, SparklesIcon } from '@heroicons/react/24/outline';

function BenIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  
  const imageSpring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView) {
      imageSpring.set(1);
    }
  }, [isInView, imageSpring]);

  return (
    <motion.section
      ref={containerRef}
      className="relative py-32 sm:py-40 overflow-hidden bg-surface-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-50 via-surface-50/95 to-surface-50" />
        {/* Simplified ambient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Text Column */}
              <motion.div 
                ref={textRef}
                className="relative order-2 lg:order-1 mt-16 lg:mt-0"
                style={{ y, opacity }}
              >
                <div className="space-y-12">
                  {/* Refined label animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div 
                      className="h-px w-8 bg-ethereal-dark/20"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: 32 } : {}}
                      transition={{ duration: 0.8 }}
                    />
                    <span className="font-mono text-sm tracking-wider text-ethereal-dark/60 uppercase">
                      Nice to meet you
                    </span>
                    <motion.div 
                      className="h-px w-8 bg-ethereal-dark/20"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: 32 } : {}}
                      transition={{ duration: 0.8 }}
                    />
                  </motion.div>

                  {/* Name with aurora effect */}
                  <motion.h1
                    className="relative font-serif text-5xl sm:text-6xl md:text-7xl text-ethereal-dark/90"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="relative inline-block">
                      I'm{' '}
                      <motion.span
                        className="aurora-text-gradient-light"
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
                        Ben
                      </motion.span>
                      <motion.span
                        className="absolute -bottom-2 left-0 w-full h-px bg-blue-400/20"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </span>
                  </motion.h1>

                  {/* Personal intro with enhanced styling */}
                  <motion.div
                    className="relative text-lg sm:text-xl text-ethereal-dark/70 font-light leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <div className="space-y-6">
                      <p>
                        With roots in the arts and a degree in{' '}
                        <motion.span 
                          className="relative inline-flex items-center"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.4, delay: 0.8 }}
                        >
                          <span className="relative">
                            <motion.span
                              className="absolute -inset-1 bg-blue-50/50 rounded-md -z-10"
                              initial={{ scale: 0 }}
                              animate={isInView ? { scale: 1 } : {}}
                              transition={{ duration: 0.4, delay: 1 }}
                            />
                            <span className="aurora-text-gradient-light">industrial engineering</span>
                          </span>
                        </motion.span>
                        , I bridge the gap between creative vision and practical execution.
                      </p>
                      <p className="text-ethereal-dark/60">
                        Having navigated every role from team lead to entrepreneur, I've seen firsthand how time and resources get wasted on poor partnerships. That's why I'm here – to give founders and teams the clear direction and quality execution they deserve, without the typical agency upsells or consulting bloat.
                      </p>
                    </div>
                  </motion.div>

                  {/* Value pillars with improved responsive design */}
                  <motion.div
                    className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8 pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    {[
                      { 
                        label: 'Strategy', 
                        value: 'Vision', 
                        unit: 'into reality',
                        icon: LightBulbIcon
                      },
                      { 
                        label: 'Execution', 
                        value: 'Action', 
                        unit: 'not just ideas',
                        icon: RocketLaunchIcon
                      },
                      { 
                        label: 'Innovation', 
                        value: 'Future', 
                        unit: 'ready solutions',
                        icon: SparklesIcon
                      }
                    ].map((pillar, i) => (
                      <motion.div
                        key={i}
                        className="group relative p-3 sm:p-4 rounded-xl overflow-hidden"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Card background with aurora effect */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] border border-[#ffffff15]" />
                        <div className={`
                          absolute inset-0 opacity-0 group-hover:opacity-100
                          transition-opacity duration-1000 ease-out
                          bg-gradient-to-br from-blue-50/5 via-indigo-50/3 to-transparent
                        `} />
                        
                        <div className="relative">
                          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                            <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6">
                              <pillar.icon className="w-full h-full text-ethereal-dark/40" />
                            </div>
                            <div className="text-xs sm:text-sm text-ethereal-dark/50 font-light">{pillar.label}</div>
                          </div>
                          <motion.div
                            className="text-lg sm:text-xl lg:text-2xl font-light aurora-text-gradient-light mb-1 sm:mb-1.5"
                            animate={{
                              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.2
                            }}
                            style={{
                              backgroundSize: "200% auto",
                            }}
                          >
                            {pillar.value}
                          </motion.div>
                          <div className="text-xs sm:text-sm text-ethereal-dark/60 font-light">{pillar.unit}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* Image Column */}
              <motion.div
                className="relative order-1 lg:order-2"
                style={{ opacity: imageSpring }}
              >
                <div className="relative aspect-square w-full max-w-[800px] mx-auto">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    {/* Image container with aurora effect */}
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-br from-blue-100/10 via-purple-100/10 to-emerald-100/10 rounded-3xl"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/headshot_web.png"
                        alt="Ben Segev"
                        fill
                        className="object-cover object-[center_20%] rounded-xl"
                        priority
                        sizes="(max-width: 768px) 90vw, 45vw"
                        quality={85}
                        style={{
                          filter: 'grayscale(1) contrast(1.1) brightness(1.05)'
                        }}
                      />
                    </div>

                    {/* Simplified overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 via-transparent to-transparent" />

                  </div>

                  {/* Reduced number of accent dots */}
                  {[...Array(2)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full aurora-gradient"
                      style={{
                        top: `${30 + i * 30}%`,
                        [i === 0 ? 'left' : 'right']: '-8px',
                      }}
                      animate={{
                        y: [0, 8, 0],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default BenIntro;
export { BenIntro }; 