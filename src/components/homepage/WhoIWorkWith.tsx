'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const collaborators = [
  {
    title: "Founders & Owners",
    description: "Building something meaningful takes vision and execution",
    accent: "blue",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
        <motion.path
          d="M24 8L8 16V32L24 40L40 32V16L24 8Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
          }}
        />
        <motion.path
          d="M24 8V24M8 16L24 24L40 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 1.5, delay: 0.5, ease: "easeInOut" }
          }}
        />
      </svg>
    ),
    detailedSteps: [
      { text: "Early-stage Startups" },
      { text: "Small Business Owners" },
      { text: "Solo Entrepreneurs" },
      { text: "Tech Founders" },
      { text: "Creative Agency Owners" },
      { text: "Outcome: Transform your vision into a scalable reality with strategic design that grows with your business." }
    ]
  },
  {
    title: "Team Leaders",
    description: "Empowering your team to deliver their best work",
    accent: "purple",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
        <motion.path
          d="M24 16C26.2091 16 28 14.2091 28 12C28 9.79086 26.2091 8 24 8C21.7909 8 20 9.79086 20 12C20 14.2091 21.7909 16 24 16Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
          }}
        />
        <motion.path
          d="M12 36C14.2091 36 16 34.2091 16 32C16 29.7909 14.2091 28 12 28C9.79086 28 8 29.7909 8 32C8 34.2091 9.79086 36 12 36Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
          }}
        />
        <motion.path
          d="M36 36C38.2091 36 40 34.2091 40 32C40 29.7909 38.2091 28 36 28C33.7909 28 32 29.7909 32 32C32 34.2091 33.7909 36 36 36Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
          }}
        />
        <motion.path
          d="M24 16V28M16 32L20 28M32 32L28 28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 1.5, delay: 0.5, ease: "easeInOut" }
          }}
        />
      </svg>
    ),
    detailedSteps: [
      { text: "Innovation Directors" },
      { text: "Brand Strategists" },
      { text: "UX Department Heads" },
      { text: "Digital Transformation Leads" },
      { text: "R&D Team Leaders" },
      { text: "Outcome: Transform your team's capabilities with strategic frameworks and tools that elevate quality and accelerate delivery." }
    ]
  },
  {
    title: "Project Leads",
    description: "Delivering results when specific initiatives need expert execution",
    accent: "emerald",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
        <motion.path
          d="M12 8H36C37.1046 8 38 8.89543 38 10V38C38 39.1046 37.1046 40 36 40H12C10.8954 40 10 39.1046 10 38V10C10 8.89543 10.8954 8 12 8Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
          }}
        />
        <motion.path
          d="M16 16H32M16 24H32M16 32H24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 1.5, delay: 0.5, ease: "easeInOut" }
          }}
        />
        <motion.path
          d="M38 16L42 16M38 24L42 24M38 32L42 32"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 1.5, delay: 0.75, ease: "easeInOut" }
          }}
        />
      </svg>
    ),
    detailedSteps: [
      { text: "Product Managers" },
      { text: "Project Owners" },
      { text: "Marketing Leads" },
      { text: "Development Leads" },
      { text: "Initiative Owners" },
      { text: "Outcome: Get strategic support and expert execution for your specific initiatives without adding permanent overhead." }
    ]
  }
];

// First, let's create a styled details component
const DetailsView = ({ item, onClose }: { 
  item: typeof collaborators[0], 
  onClose: () => void 
}) => (
  <motion.div
    className="absolute inset-0 bg-white/98 backdrop-blur-sm rounded-lg overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {/* Left side - Header and Navigation */}
    <div className="absolute left-0 top-0 bottom-0 w-1/3 border-r border-ethereal-dark/10 p-6">
      <div className="flex flex-col h-full">
        {/* Icon and Title */}
        <div className={`flex items-center gap-4 pb-6 border-b border-${item.accent}-200/20`}>
          <div className={`text-${item.accent}-500/80`}>
            {item.icon}
          </div>
          <div>
            <h3 className={`text-2xl font-serif text-${item.accent}-600`}>
              {item.title}
            </h3>
            <p className="text-sm text-ethereal-dark/70">
              {item.description}
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="mt-8 flex-grow">
          <ul className="space-y-2">
            {item.detailedSteps.map((step, j) => (
              <motion.li
                key={step.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: j * 0.1 }}
                className={`p-3 rounded-lg cursor-pointer
                  hover:bg-${item.accent}-50/50 transition-colors
                  border border-transparent hover:border-${item.accent}-200/20`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-sm text-${item.accent}-600/90`}>
                    {(j + 1).toString().padStart(2, '0')}
                  </span>
                  <span className={`text-${item.accent}-600/90 font-medium`}>
                    {step.text}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Close button at bottom */}
        <motion.button
          className={`mt-auto flex items-center gap-2 text-${item.accent}-600/60 
            hover:text-${item.accent}-600/90 transition-colors py-2 px-4 rounded-lg
            hover:bg-${item.accent}-50/50 border border-transparent 
            hover:border-${item.accent}-200/20`}
          onClick={onClose}
          whileHover={{ x: -5 }}
        >
          <svg className="w-5 h-5 rotate-180" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
          </svg>
          <span className="font-mono text-sm">Back</span>
        </motion.button>
      </div>
    </div>

    {/* Right side - Content Area */}
    <div className="absolute left-1/3 right-0 top-0 bottom-0 p-8 overflow-auto">
      <div className="max-w-2xl mx-auto">
        {item.detailedSteps.map((step, j) => (
          <motion.div
            key={step.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: j * 0.15 }}
            className="mb-12"
          >
            <div className={`flex items-center gap-4 mb-4`}>
              <div className={`w-10 h-10 rounded-full bg-${item.accent}-100/20 
                flex items-center justify-center text-${item.accent}-600`}>
                <span className="font-mono text-sm">{(j + 1).toString().padStart(2, '0')}</span>
              </div>
              <h4 className={`text-xl font-serif text-${item.accent}-600`}>
                {step.text}
              </h4>
            </div>
            <p className="text-ethereal-dark/70 leading-relaxed pl-14">
              {step.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Add the LoaderCore component
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
    <div className="flex relative justify-start max-w-xl mx-auto flex-col mt-16 sm:mt-40 px-4 sm:px-0">
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
              isTitle ? "mb-4 sm:mb-6" : "mb-3 sm:mb-4",
              isOutcome && "mt-2"
            )}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-shrink-0">
              {!isTitle && !isOutcome && index > value && (
                <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-ethereal-dark dark:text-white" />
              )}
              {!isTitle && !isOutcome && index <= value && (
                <CheckFilled className={cn(
                  "w-5 h-5 sm:w-6 sm:h-6 text-ethereal-dark dark:text-white",
                  value === index && "text-ethereal-dark dark:text-lime-500 opacity-100"
                )} />
              )}
              {!isTitle && isOutcome && (
                <OutcomeIcon className={cn(
                  "w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 flex-shrink-0",
                  value === index && "opacity-100"
                )} />
              )}
            </div>
            <span className={cn(
              "text-ethereal-dark dark:text-white text-sm sm:text-base",
              isTitle ? "font-serif text-xl sm:text-2xl" : "",
              isOutcome ? "text-emerald-500 font-medium max-w-[280px] sm:max-w-[320px] leading-snug" : "",
              value === index && !isTitle && !isOutcome && "text-ethereal-dark dark:text-lime-500 opacity-100"
            )}>
              {isOutcome ? (
                <>
                  <span className="font-medium block mb-1">Outcome:</span>
                  <span className="block text-sm sm:text-base">{state.text.replace('Outcome: ', '')}</span>
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

// Add these icon components at the top of the file
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

// Add this helper function at the top with other utility functions
const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

export function WhoIWorkWith() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [showDetailedSteps, setShowDetailedSteps] = useState(false);
  const [currentDetailedStep, setCurrentDetailedStep] = useState(0);

  // Add this effect for auto-scrolling
  useEffect(() => {
    if (!showDetailedSteps) return;

    const currentStepDetails = collaborators[activeCard!].detailedSteps;
    const timeout = setTimeout(() => {
      if (currentDetailedStep < currentStepDetails.length) {
        setCurrentDetailedStep(prev => prev + 1);
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [currentDetailedStep, showDetailedSteps, activeCard]);

  // Update the card click handler
  const handleCardClick = (index: number) => {
    setActiveCard(index);
    setCurrentDetailedStep(0);
    setShowDetailedSteps(true);
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative py-32 overflow-hidden font-sans bg-white"
    >
      {/* Sophisticated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(147,51,234,0.03),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            style={{ y }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-ethereal-dark/20" 
              />
              <span className="font-mono text-sm text-ethereal-dark/60 tracking-wider uppercase">
                Who I Work With
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-ethereal-dark/20" 
              />
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-ethereal-dark mb-6"
            >
              For Those Ready to
              <motion.span
                className="block mt-2"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="aurora-text-gradient-light">Build What's Next</span>
              </motion.span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-ethereal-dark/70 max-w-2xl mx-auto font-light leading-relaxed"
            >
              I help build digital experiences & products through strategic design systems & deliverables – turning challenges into elegant solutions.
            </motion.p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-16 px-4 sm:px-0">
            {collaborators.map((item, i) => (
              <motion.div
                key={item.title}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <motion.div 
                  className={`relative p-6 sm:p-8 rounded-lg border border-transparent 
                    hover:border-${item.accent}-200/20 transition-all duration-500 
                    flex flex-col items-center justify-center text-center cursor-pointer aspect-[4/3] sm:aspect-[3/2] lg:aspect-square
                    ${activeCard === i ? `border-${item.accent}-200/40 bg-${item.accent}-50/5` : ''}`}
                  onClick={() => handleCardClick(i)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Hover effect */}
                  <motion.div
                    className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg",
                      item.title === "Founders & Owners" && "bg-gradient-to-br from-white to-blue-50/50",
                      item.title === "Team Leaders" && "bg-gradient-to-br from-white to-purple-50/50",
                      item.title === "Project Leads" && "bg-gradient-to-br from-white to-emerald-50/50"
                    )}
                    initial={false}
                    whileHover={{ scale: 1.02 }}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    className={`text-4xl mb-6 text-${item.accent}-500/80`}
                    animate={{
                      rotate: [0, 10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="relative space-y-2">
                    <h3 className={cn(
                      "text-xl sm:text-2xl font-sans font-light",
                      item.title === "Project Leads" 
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                        : `text-${item.accent}-600/90`
                    )}>
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-ethereal-dark/70 font-sans">
                      {item.description}
                    </p>
                    
                    {/* Learn more hint stays the same */}
                    <motion.div 
                      className="mt-4 flex items-center justify-center gap-1.5 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span className={cn(
                        "font-mono tracking-wide",
                        item.title === "Founders & Owners" && "text-blue-600/90",
                        item.title === "Team Leaders" && "text-purple-600/90",
                        item.title === "Project Leads" && "text-emerald-600/90"
                      )}>
                        Learn more
                      </span>
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={cn(
                          "w-4 h-4",
                          item.title === "Founders & Owners" && "text-blue-600/90",
                          item.title === "Team Leaders" && "text-purple-600/90",
                          item.title === "Project Leads" && "text-emerald-600/90"
                        )}
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                          clipRule="evenodd" 
                        />
                      </motion.svg>
                    </motion.div>
                  </div>

                  {/* Decorative line */}
                  <motion.div
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-px",
                      item.title === "Founders & Owners" && "bg-gradient-to-r from-transparent via-blue-300/30 to-transparent",
                      item.title === "Team Leaders" && "bg-gradient-to-r from-transparent via-purple-300/30 to-transparent",
                      item.title === "Project Leads" && "bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent"
                    )}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={() => scrollToElement('brand-anatomy')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 transition-all duration-300 rounded-xl overflow-hidden shadow-lg"
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
              <span className="relative z-10 font-mono text-lg text-[#FFFFF0] flex items-center gap-2">
                See What Can Be Done
                <svg 
                  className="w-4 h-4 transition-transform group-hover:translate-y-0.5" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Add the modal */}
      <AnimatePresence mode="wait">
        {showDetailedSteps && activeCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center bg-surface-50/80 backdrop-blur-xl p-4 sm:p-0"
          >
            {/* Close button */}
            <button
              onClick={() => {
                setShowDetailedSteps(false);
                setCurrentDetailedStep(0);
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-black hover:opacity-70 transition-opacity z-[102]"
            >
              <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>

            <div className="h-[80vh] sm:h-96 relative w-full max-w-lg sm:max-w-none">
              <LoaderCore 
                value={currentDetailedStep} 
                loadingStates={collaborators[activeCard].detailedSteps}
                title={collaborators[activeCard].title}
              />
            </div>
            
            {/* Background gradient */}
            <div className="bg-gradient-to-t inset-x-0 z-[101] bottom-0 bg-surface-50 h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
} 