'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Headphones, 
  Search, 
  Link2, 
  Hammer,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    id: 'listen',
    title: "Listen",
    subtitle: "Understand Your Vision",
    icon: Headphones,
    color: "from-indigo-400 to-sky-400",
    hoverColor: "group-hover:from-indigo-300 group-hover:to-sky-500",
    description: "We dive deep into your vision, challenges, and goals to build a solid foundation for your project."
  },
  {
    id: 'see',
    title: "See",
    subtitle: "Identify Opportunities",
    icon: Search,
    color: "from-fuchsia-400 to-pink-400",
    hoverColor: "group-hover:from-fuchsia-300 group-hover:to-pink-500",
    description: "We identify gaps in your current approach and uncover hidden opportunities for growth."
  },
  {
    id: 'connect',
    title: "Connect",
    subtitle: "Integrate Solutions",
    icon: Link2,
    color: "from-teal-400 to-cyan-400",
    hoverColor: "group-hover:from-teal-300 group-hover:to-cyan-500",
    description: "We balance strategy, design, and technology to create a plan tailored to your needs."
  },
  {
    id: 'build',
    title: "Build",
    subtitle: "Create Impact",
    icon: Hammer,
    color: "from-rose-400 to-orange-400",
    hoverColor: "group-hover:from-rose-300 group-hover:to-orange-500",
    description: "We execute with precision, creating the assets and systems you need to reach your next stage of growth."
  }
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [animationActive, setAnimationActive] = useState(true);
  const [currentAnimatedStep, setCurrentAnimatedStep] = useState(0);

  // Animation sequence for cycling through steps
  useEffect(() => {
    if (!isInView || !animationActive) return;
    
    const interval = setInterval(() => {
      // Fade out current step before changing
      setAnimationActive(false);
      
      // Use setTimeout to create a smooth transition
      setTimeout(() => {
        setCurrentAnimatedStep(prev => (prev + 1) % steps.length);
        setAnimationActive(true);
      }, 300); // Short delay for fade transition
      
    }, 5000); // Increased time between transitions for better readability
    
    return () => clearInterval(interval);
  }, [isInView, animationActive]);

  // Handle step click
  const handleStepClick = (stepId: string) => {
    if (activeStep === stepId) {
      // Closing the active step
      setActiveStep(null);
      // Find the index of the current step and set animation to start from the next one
      const currentIndex = steps.findIndex(s => s.id === stepId);
      
      // Add a small delay before starting animation again
      setTimeout(() => {
        setCurrentAnimatedStep((currentIndex + 1) % steps.length);
        setAnimationActive(true);
      }, 300);
    } else {
      // Opening a step
      setActiveStep(stepId);
      setAnimationActive(false);
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.03),transparent_70%)]" />
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(28,28,28,0.03)_50%,transparent_100%)]"
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% 100%"
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={containerRef}>
        <motion.div 
          className="mx-auto max-w-2xl text-center mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
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
            <span className="font-mono text-xs sm:text-sm tracking-wider text-ethereal-dark uppercase">
              The Process
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ethereal-dark">
              Your Journey To{' '}
              <span className="block mt-2 sm:mt-3">
                <span className="aurora-text-gradient-light relative">
                  The NextStage
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
          <p className="font-sans text-lg sm:text-xl text-ethereal-dark/70 max-w-3xl mx-auto leading-relaxed">
            A proven process that combines strategy, design, and technology to transform your vision into reality.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline Line */}
          <div className="absolute top-[40px] left-0 right-0 h-0.5">
            <div className="h-full bg-gray-100/50 rounded-full" />
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ 
                width: activeStep 
                  ? `${(steps.findIndex(s => s.id === activeStep) + 1) * 100 / steps.length}%` 
                  : animationActive 
                    ? `${(currentAnimatedStep + 1) * 100 / steps.length}%` 
                    : "25%" 
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const isActive = activeStep === step.id;
              const isAnimatedActive = !activeStep && animationActive && currentAnimatedStep === index;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      opacity: { duration: 0.5 },
                      y: { duration: 0.5 }
                    }
                  } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative pt-14 pb-6 px-6 rounded-xl cursor-pointer transition-all duration-500 ${
                    isActive || isAnimatedActive 
                      ? 'bg-white/70 shadow-lg ring-1 ring-gray-100' 
                      : 'bg-white/50'
                  }`}
                  onClick={() => handleStepClick(step.id)}
                >
                  {/* Background Number */}
                  <div className="absolute right-2 bottom-0 text-[120px] leading-none font-bold font-serif text-gray-100 opacity-80 select-none pointer-events-none" style={{ zIndex: 1 }}>
                    {index + 1}
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      {/* Icon with Circle */}
                      <div className="relative flex-shrink-0 -mt-14" style={{ overflow: 'visible' }}>
                        <div className={`w-14 h-14 rounded-full bg-white shadow-lg relative z-10 flex items-center justify-center transition-all duration-300 ${
                          isActive || isAnimatedActive ? 'scale-125' : ''
                        }`}>
                          <step.icon className={`w-7 h-7 transition-colors duration-300 ${
                            isActive || isAnimatedActive
                              ? `text-gradient-${step.id}` 
                              : 'text-gray-400'
                          }`} />
                        </div>
                        {(isActive || isAnimatedActive) ? (
                          <motion.div 
                            className="absolute inset-0 rounded-full blur-[10px] opacity-70 scale-150"
                            style={{
                              background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #10B981, #3B82F6)',
                              backgroundSize: '300% 100%'
                            }}
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: 1,
                              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              opacity: { duration: 0.3 },
                              backgroundPosition: {
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 blur-[10px]" />
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <div className="pt-2">
                        <h3 className="text-xl font-serif text-gray-900 mb-1">
                          {step.title}
                        </h3>
                        <p className="font-sans text-sm text-gray-500">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0
                      }}
                      transition={{
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2, ease: "easeInOut" }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 pb-4">
                        <div className="relative">
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4 opacity-70"></div>
                          <p className="font-sans text-base text-gray-600 leading-relaxed pl-[4.5rem] -ml-[4.5rem]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-7 top-0 bottom-0 w-0.5">
            <div className="absolute inset-0 bg-gray-100/50" />
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-400 via-purple-400 to-emerald-400"
              initial={{ height: "0%" }}
              animate={{ 
                height: activeStep 
                  ? `${((steps.findIndex(s => s.id === activeStep) + 1) * 100 / steps.length)}%` 
                  : animationActive 
                    ? `${(currentAnimatedStep + 1) * 100 / steps.length}%` 
                    : "25%" 
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
          
          <div className="space-y-12">
            {steps.map((step, index) => {
              const isActive = activeStep === step.id;
              const isAnimatedActive = !activeStep && animationActive && currentAnimatedStep === index;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      opacity: { duration: 0.5 },
                      x: { duration: 0.5 }
                    }
                  } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative rounded-xl p-4 pl-16 cursor-pointer transition-all duration-500 ${
                    isActive || isAnimatedActive 
                      ? 'bg-white/70 shadow-lg ring-1 ring-gray-100' 
                      : 'bg-white/50'
                  }`}
                  onClick={() => handleStepClick(step.id)}
                >
                  {/* Background Number for Mobile */}
                  <div className="absolute right-2 bottom-0 text-[80px] leading-none font-bold font-serif text-gray-100 opacity-80 select-none pointer-events-none" style={{ zIndex: 1 }}>
                    {index + 1}
                  </div>
                  <div className="relative z-10">
                    {/* Timeline Node */}
                    <div className="absolute left-5 top-4 w-4 h-4">
                      <div className={`w-full h-full rounded-full bg-white shadow-md relative z-10 ${
                        isActive || isAnimatedActive ? 'scale-150' : ''
                      } transition-transform duration-300`} />
                      {(isActive || isAnimatedActive) ? (
                        <motion.div 
                          className="absolute inset-0 rounded-full blur-[6px] opacity-70 scale-200"
                          style={{
                            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #10B981, #3B82F6)',
                            backgroundSize: '300% 100%'
                          }}
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                          }}
                          exit={{ opacity: 0 }}
                          transition={{
                            opacity: { duration: 0.3 },
                            backgroundPosition: {
                              duration: 8,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }}
                        />
                      ) : (
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 blur-[6px]`} />
                      )}
                    </div>

                    <div>
                      <div className="flex items-start gap-4">
                        {/* Icon with Circle */}
                        <div className="relative flex-shrink-0" style={{ overflow: 'visible' }}>
                          <div className={`w-10 h-10 rounded-full bg-white shadow-md relative z-10 flex items-center justify-center transition-all duration-300 ${
                            isActive || isAnimatedActive ? 'scale-125' : ''
                          }`}>
                            <step.icon className={`w-5 h-5 transition-colors duration-300 ${
                              isActive || isAnimatedActive
                                ? `text-gradient-${step.id}` 
                                : 'text-gray-400'
                            }`} />
                          </div>
                          {(isActive || isAnimatedActive) ? (
                            <motion.div 
                              className="absolute inset-0 rounded-full blur-[8px] opacity-70 scale-150"
                              style={{
                                background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #10B981, #3B82F6)',
                                backgroundSize: '300% 100%'
                              }}
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                              }}
                              exit={{ opacity: 0 }}
                              transition={{
                                opacity: { duration: 0.3 },
                                backgroundPosition: {
                                  duration: 8,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }
                              }}
                            />
                          ) : (
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 blur-[8px]`} />
                          )}
                        </div>

                        {/* Title & Subtitle */}
                        <div className="pt-1">
                          <h3 className="text-lg font-serif text-gray-900 mb-1">
                            {step.title}
                          </h3>
                          <p className="font-sans text-sm text-gray-500">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Mobile Expandable Description */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0
                        }}
                        transition={{
                          height: { duration: 0.3, ease: "easeInOut" },
                          opacity: { duration: 0.2, ease: "easeInOut" }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 pr-4">
                          <div className="relative pl-4">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4 opacity-70"></div>
                            <p className="font-sans text-base text-gray-600 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-mono text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors duration-300"
          >
            Schedule a Call
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 