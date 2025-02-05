"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const processSteps = [
  {
    id: "discover",
    number: "01",
    title: "Listen & Understand",
    theme: "Discovery",
    description: "Every meaningful partnership starts with deep listening. We'll explore your vision, values, and the change you want to create in the world.",
    color: "from-blue-500 to-violet-500",
    details: [
      {
        heading: "Strategic Discovery",
        text: "Understanding your journey, goals, and vision"
      },
      {
        heading: "Market Analysis",
        text: "Identifying opportunities and positioning"
      },
      {
        heading: "Audience Insights",
        text: "Deep understanding of who we're reaching"
      }
    ]
  },
  {
    id: "strategy",
    number: "02",
    title: "Shape the Strategy",
    theme: "Strategy",
    description: "Together, we'll craft a strategic foundation that authentically captures your vision and resonates with your audience.",
    color: "from-violet-500 to-fuchsia-500",
    details: [
      {
        heading: "Brand Architecture",
        text: "Building your strategic foundation"
      },
      {
        heading: "Positioning Strategy",
        text: "Defining your unique market position"
      },
      {
        heading: "Growth Roadmap",
        text: "Planning your path to success"
      }
    ]
  },
  {
    id: "create",
    number: "03",
    title: "Design & Develop",
    theme: "Creation",
    description: "We'll bring your strategy to life through thoughtful design that reflects your values and connects with your audience.",
    color: "from-fuchsia-500 to-rose-500",
    details: [
      {
        heading: "Brand Identity",
        text: "Crafting your visual language"
      },
      {
        heading: "Digital Experience",
        text: "Building engaging touchpoints"
      },
      {
        heading: "Content Strategy",
        text: "Telling your story effectively"
      }
    ]
  },
  {
    id: "evolve",
    number: "04",
    title: "Launch & Evolve",
    theme: "Growth",
    description: "Your brand is a living thing. We'll help you launch with impact and evolve based on real-world feedback.",
    color: "from-rose-500 to-orange-500",
    details: [
      {
        heading: "Launch Strategy",
        text: "Making a memorable entrance"
      },
      {
        heading: "Performance Analysis",
        text: "Measuring what matters"
      },
      {
        heading: "Continuous Evolution",
        text: "Growing with purpose"
      }
    ]
  }
];

export function MyProcess() {
  const [activeStep, setActiveStep] = useState<string>(processSteps[0].id);
  const [prevStep, setPrevStep] = useState<string>(processSteps[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndex = processSteps.findIndex(step => step.id === activeStep);
  const prevIndex = processSteps.findIndex(step => step.id === prevStep);
  const direction = activeIndex > prevIndex ? 1 : -1;

  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const progress = y / rect.height;
      const stepIndex = Math.min(
        processSteps.length - 1,
        Math.max(0, Math.floor(progress * processSteps.length))
      );
      const newStep = processSteps[stepIndex].id;
      
      if (newStep !== activeStep) {
        setPrevStep(activeStep);
        setActiveStep(newStep);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [activeStep]);

  return (
    <section className="relative bg-white py-24 lg:py-32">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-primary-500/30" />
          <span className="font-mono text-sm tracking-wider text-primary-600">
            OUR PROCESS
          </span>
          <div className="h-px w-8 bg-primary-500/30" />
        </div>
        <h2 className="font-serif text-4xl lg:text-6xl text-surface-950 mb-6">
          Strategic Process,
          <span className="block text-primary-600 mt-2">Meaningful Results</span>
        </h2>
        <p className="text-lg text-surface-600 max-w-2xl mx-auto">
          A proven approach that transforms vision into reality, 
          combining strategic thinking with creative execution.
        </p>
      </div>

      {/* Interactive Process View */}
      <div 
        ref={containerRef}
        className="relative h-[80vh] min-h-[600px] group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white 
                      pointer-events-none z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
        
        {/* Fixed Container */}
        <div className="sticky top-0 h-full overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b"
              animate={{
                background: processSteps[activeIndex].color,
                opacity: [0.02, 0.05, 0.02],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          <div className="relative h-full flex flex-col justify-center">
            {/* Navigation Dots */}
            <div className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-20">
              {processSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => {
                    setPrevStep(activeStep);
                    setActiveStep(step.id);
                  }}
                  className="group relative p-2"
                >
                  <div className={`
                    w-3 h-3 rounded-full transition-colors duration-300
                    ${step.id === activeStep ? 'bg-primary-500' : 'bg-primary-500/20'}
                  `} />
                  <div className={`
                    absolute left-8 top-1/2 -translate-y-1/2 px-3 py-1.5
                    text-sm font-mono tracking-wider whitespace-nowrap
                    opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
                    transition-all duration-300
                    ${step.id === activeStep ? 'text-primary-500' : 'text-primary-500/60'}
                  `}>
                    {step.theme}
                  </div>
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="relative max-w-7xl mx-auto px-6 w-full">
              <AnimatePresence mode="wait">
                {processSteps.map((step) => (
                  step.id === activeStep && (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 * direction }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 * direction }}
                      transition={{ duration: 0.5 }}
                      className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
                    >
                      {/* Step Info */}
                      <div>
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="flex items-center gap-4 mb-8"
                        >
                          <div className="relative">
                            <div 
                              className="absolute inset-0 rounded-full opacity-20"
                              style={{
                                background: `linear-gradient(135deg, ${step.color})`
                              }}
                            />
                            <div className="relative w-20 h-20 rounded-full border border-primary-500/20
                                          flex items-center justify-center font-serif text-5xl text-primary-500">
                              {step.number}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="font-mono text-sm tracking-wider text-primary-600">
                              {step.theme}
                            </div>
                            <h3 className="font-serif text-3xl lg:text-4xl text-surface-950">
                              {step.title}
                            </h3>
                          </div>
                        </motion.div>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-lg text-surface-600 mb-12"
                        >
                          {step.description}
                        </motion.p>
                      </div>

                      {/* Details Grid */}
                      <div className="relative">
                        <div className="grid gap-4">
                          {step.details.map((detail, i) => (
                            <motion.div
                              key={detail.heading}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="group relative p-6 rounded-xl bg-surface-50
                                       border border-primary-100 overflow-hidden"
                            >
                              <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                  background: `linear-gradient(135deg, ${step.color})`,
                                  opacity: 0.1
                                }}
                              />
                              
                              <h4 className="font-medium text-lg text-surface-950 mb-2">
                                {detail.heading}
                              </h4>
                              <p className="text-surface-600">
                                {detail.text}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 