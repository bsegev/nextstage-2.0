"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6", className)}
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const processSteps = [
  {
    title: "Vision Alignment",
    description: "Let's talk about where you want to go. Direct, focused conversations about your goals—no middlemen, just clarity.",
    icon: "✧",
    link: "/vision-alignment",
    detailedSteps: [
      { text: "Quick chat to understand your goals" },
      { text: "Map out where you are now" },
      { text: "Spot the best opportunities" },
      { text: "Set clear targets" },
      { text: "Define what success looks like" }
    ]
  },
  {
    title: "Strategic Architecture",
    description: "Together, we'll map out your path forward. Understanding your market and uncovering the best opportunities for growth.",
    icon: "◇",
    link: "/strategic-architecture",
    detailedSteps: [
      { text: "Build your game plan" },
      { text: "Create a clear roadmap" },
      { text: "Plan your resources" },
      { text: "Identify potential challenges" },
      { text: "Set key milestones" }
    ]
  },
  {
    title: "Creative Evolution",
    description: "Bringing your vision to life through thoughtful design. Working directly with you to ensure every detail hits the mark.",
    icon: "○",
    link: "/creative-evolution",
    detailedSteps: [
      { text: "Design your core look" },
      { text: "Refine your brand voice" },
      { text: "Make it user-friendly" },
      { text: "Create key visuals" },
      { text: "Review and polish" }
    ]
  },
  {
    title: "Continuous Refinement",
    description: "Quick, impactful improvements based on real results. Your success drives every decision and refinement.",
    icon: "△",
    link: "/continuous-refinement",
    detailedSteps: [
      { text: "Track what matters" },
      { text: "Learn from the data" },
      { text: "Make quick improvements" },
      { text: "Act on feedback" },
      { text: "Keep growing" }
    ]
  }
];

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: { text: string }[];
  value?: number;
}) => {
  return (
    <div className="flex relative justify-start max-w-xl mx-auto flex-col mt-40">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0);

        return (
          <motion.div
            key={index}
            className={cn("text-left flex gap-2 mb-4")}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {index > value && (
                <CheckIcon className="text-ethereal-dark dark:text-white" />
              )}
              {index <= value && (
                <CheckFilled
                  className={cn(
                    "text-ethereal-dark dark:text-white",
                    value === index &&
                      "text-ethereal-dark dark:text-lime-500 opacity-100"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-ethereal-dark dark:text-white",
                value === index && "text-ethereal-dark dark:text-lime-500 opacity-100"
              )}
            >
              {loadingState.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export function ProcessFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showDetailedSteps, setShowDetailedSteps] = useState(false);
  const [currentDetailedStep, setCurrentDetailedStep] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (!showDetailedSteps || !isAutoScrolling) {
      setCurrentDetailedStep(0);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentDetailedStep((prev) => {
        if (prev === processSteps[activeStep].detailedSteps.length - 1) {
          return isAutoScrolling ? 0 : prev; // Loop if auto-scrolling
        }
        return prev + 1;
      });
    }, 1200); // Faster timing (was 2000)

    return () => clearTimeout(timeout);
  }, [currentDetailedStep, showDetailedSteps, activeStep, isAutoScrolling]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 lg:py-48 bg-surface-50 overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-50 via-surface-50/95 to-surface-50" />
      </div>
      
      <motion.div 
        className="relative z-10 max-w-3xl mx-auto px-6 w-full"
        style={{ opacity }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 mb-24"
        >
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-8 bg-ethereal-dark/20" />
            <span className="font-mono text-sm tracking-wider text-ethereal-dark/60 uppercase">
              THE PROCESS
            </span>
            <div className="h-px w-8 bg-ethereal-dark/20" />
          </div>

          <h2 className="font-serif text-4xl lg:text-6xl text-center text-ethereal-dark">
            How We Work
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
                Together
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
                Together
              </motion.span>
              <span className="relative aurora-text-gradient-light">
                Together
              </span>
            </motion.span>
          </h2>
          <p className="mt-6 text-center text-ethereal-dark/70 max-w-2xl mx-auto text-lg">
            A straightforward approach that turns your vision into reality, combining strategic thinking with creative craft.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div 
            className="absolute top-0 bottom-0 left-[21px] w-px bg-gradient-to-b from-transparent via-ethereal-dark/20 to-transparent"
            style={{ scaleY: scrollYProgress }}
          />
          
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.button 
                onClick={() => {
                  setActiveStep(index);
                  setShowDetailedSteps(true);
                }}
                className={`relative flex items-start gap-6 mb-20 group cursor-pointer w-full text-left z-[103]
                         ${activeStep === index ? 'opacity-100' : 'opacity-70'}`}
                onMouseEnter={() => setActiveStep(index)}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Step indicator */}
                <div className="relative flex-shrink-0 w-12 h-12">
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary-100 to-surface-200 
                                border border-ethereal-dark/20 shadow-lg shadow-primary-100/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                    <span className="font-serif text-ethereal-dark/80 text-xl">
                      {step.icon}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1 relative">
                  <h3 className="text-xl font-medium text-ethereal-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-ethereal-dark/70 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Hover effect - meaningful as it indicates clickability */}
                  <motion.div
                    className="absolute -inset-4 -z-10 rounded-lg bg-gradient-to-r from-primary-100/50 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Detailed Steps Overlay */}
      <AnimatePresence mode="wait">
        {showDetailedSteps && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center bg-surface-50/80 backdrop-blur-xl"
          >
            {/* Close button - Fixed z-index */}
            <button
              onClick={() => setShowDetailedSteps(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-black hover:opacity-70 transition-opacity z-[102]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Controls moved to bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <button
                onClick={() => {
                  setIsAutoScrolling(false);
                  setCurrentDetailedStep(prev => Math.max(0, prev - 1));
                }}
                className="p-2 rounded-full bg-surface-50/90 border border-ethereal-dark/20 hover:border-ethereal-dark/40 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={currentDetailedStep === 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-ethereal-dark"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className="px-4 py-2 rounded-full bg-surface-50/90 border border-ethereal-dark/20 hover:border-ethereal-dark/40 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 text-sm font-mono text-ethereal-dark"
              >
                {isAutoScrolling ? 'Pause' : 'Play'}
              </button>

              <button
                onClick={() => {
                  setIsAutoScrolling(false);
                  setCurrentDetailedStep(prev => 
                    Math.min(processSteps[activeStep].detailedSteps.length - 1, prev + 1)
                  );
                }}
                className="p-2 rounded-full bg-surface-50/90 border border-ethereal-dark/20 hover:border-ethereal-dark/40 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={currentDetailedStep === processSteps[activeStep].detailedSteps.length - 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-ethereal-dark"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>

            <div className="h-96 relative">
              <LoaderCore 
                value={currentDetailedStep} 
                loadingStates={processSteps[activeStep].detailedSteps} 
              />
            </div>
            {/* Lower z-index for the gradient overlay */}
            <div className="bg-gradient-to-t inset-x-0 z-[101] bottom-0 bg-surface-50 h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 