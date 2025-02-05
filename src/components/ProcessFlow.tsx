"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

type IconComponent = ({ className }: { className?: string }) => JSX.Element;

interface ProcessStep {
  title: string;
  description: string;
  icon: IconComponent;
  link: string;
  detailedSteps: { text: string }[];
}

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

const VisionIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6", className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
};

const LaunchIcon = ({ className }: { className?: string }) => {
  return <RocketLaunchIcon className={cn("w-6 h-6", className)} />;
};

const StrategyIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6", className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
    </svg>
  );
};

const CreativeIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6", className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
    </svg>
  );
};

const RefinementIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6", className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
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

const OutcomeIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6", className)}
    >
      <path
        fillRule="evenodd"
        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const processSteps: ProcessStep[] = [
  {
    title: "Define & Align",
    description: "Let's get clear on where you're headed and what's standing in the way.",
    icon: VisionIcon,
    link: "/define-align",
    detailedSteps: [
      { text: "What's working?" },
      { text: "What's not?" },
      { text: "Where do you want to go?" },
      { text: "Who do you need to reach?" },
      { text: "What's the next move?" },
      { text: "Outcome: A clear vision and direction before we build anything." }
    ]
  },
  {
    title: "Build the Strategy",
    description: "We build the roadmap that takes you from where you are to where you need to be.",
    icon: StrategyIcon,
    link: "/build-strategy",
    detailedSteps: [
      { text: "Define your positioning" },
      { text: "Spot the gaps and opportunities" },
      { text: "Refine your brand message" },
      { text: "Set clear priorities" },
      { text: "Align your resources" },
      { text: "Outcome: A structured plan that makes growth intentional, not accidental." }
    ]
  },
  {
    title: "Create & Design",
    description: "We bring your brand to life—visually and strategically.",
    icon: CreativeIcon,
    link: "/create-design",
    detailedSteps: [
      { text: "Develop your brand identity" },
      { text: "Design your website and digital experience" },
      { text: "Align messaging and visuals" },
      { text: "Create marketing and sales materials" },
      { text: "Ensure everything connects seamlessly" },
      { text: "Outcome: A brand that looks, sounds, and feels like it belongs in the market." }
    ]
  },
  {
    title: "Launch & Activate",
    description: "We make sure your brand isn't just built—but actually works.",
    icon: LaunchIcon,
    link: "/launch-activate",
    detailedSteps: [
      { text: "Launch your brand or campaign" },
      { text: "Set up marketing and content systems" },
      { text: "Align your team and tools" },
      { text: "Optimize for real-world engagement" },
      { text: "Track early performance and adjust" },
      { text: "Outcome: A brand that's live, running, and positioned for success." }
    ]
  },
  {
    title: "Optimize & Grow",
    description: "Growth doesn't stop at launch—we keep improving.",
    icon: RefinementIcon,
    link: "/optimize-grow",
    detailedSteps: [
      { text: "Track what's working" },
      { text: "Fine-tune messaging and design" },
      { text: "Expand your reach" },
      { text: "Optimize conversions" },
      { text: "Keep everything aligned as you grow" },
      { text: "Outcome: A brand and business that evolve, staying relevant and impactful." }
    ]
  }
];

const LoaderCore = ({
  loadingStates,
  value = 0,
  title,
}: {
  loadingStates: { text: string }[];
  value?: number;
  title: string;
}) => {
  return (
    <div className="flex relative justify-start max-w-xl mx-auto flex-col mt-40">
      {[{ text: title, isTitle: true }, ...loadingStates].map((state, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0);
        const isTitle = 'isTitle' in state;
        const isOutcome = state.text.startsWith('Outcome:');

        return (
          <motion.div
            key={index}
            className={cn(
              "text-left flex gap-2",
              isTitle ? "mb-6" : "mb-4",
              isOutcome && "mt-2"
            )}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {!isTitle && !isOutcome && index > value && (
                <CheckIcon className="text-ethereal-dark dark:text-white" />
              )}
              {!isTitle && !isOutcome && index <= value && (
                <CheckFilled
                  className={cn(
                    "text-ethereal-dark dark:text-white",
                    value === index &&
                      "text-ethereal-dark dark:text-lime-500 opacity-100"
                  )}
                />
              )}
              {!isTitle && isOutcome && (
                <OutcomeIcon
                  className={cn(
                    "text-emerald-500 flex-shrink-0",
                    value === index && "opacity-100"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-ethereal-dark dark:text-white",
                isTitle ? "font-serif text-2xl" : "",
                isOutcome ? "text-emerald-500 font-medium max-w-[280px] leading-snug" : "",
                value === index && !isTitle && !isOutcome && "text-ethereal-dark dark:text-lime-500 opacity-100"
              )}
            >
              {isOutcome ? (
                <>
                  <span className="font-medium block mb-1">Outcome:</span>
                  <span className="block">{state.text.replace('Outcome: ', '')}</span>
                </>
              ) : (
                state.text
              )}
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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Block scrolling when loader is open
  useEffect(() => {
    if (showDetailedSteps) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset current step when closing
      setCurrentDetailedStep(0);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showDetailedSteps]);

  // Auto-scrolling effect for the current process step only
  useEffect(() => {
    if (!showDetailedSteps) {
      return;
    }

    const currentStepDetails = processSteps[activeStep].detailedSteps;
    const timeout = setTimeout(() => {
      if (currentDetailedStep < currentStepDetails.length) {
        setCurrentDetailedStep(prev => prev + 1);
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [currentDetailedStep, showDetailedSteps, activeStep]);

  // Handler for opening a specific step
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setCurrentDetailedStep(0); // Reset to start of animation
    setShowDetailedSteps(true);
  };

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
                onClick={() => handleStepClick(index)}
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
                    {React.createElement(step.icon, { className: "text-ethereal-dark/80 w-6 h-6" })}
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

            <div className="h-96 relative">
              <LoaderCore 
                value={currentDetailedStep} 
                loadingStates={processSteps[activeStep].detailedSteps}
                title={processSteps[activeStep].title}
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