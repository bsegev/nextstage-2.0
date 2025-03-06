'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { RocketLaunchIcon, ArrowTrendingUpIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { 
  BrainCircuit, 
  Workflow, 
  LayoutPanelTop,
  Sparkles,
  ArrowUpDown,
  GitBranch
} from 'lucide-react';

const collaborators = [
  {
    title: "Launch",
    subtitle: "From Idea to Market",
    description: "For founders and businesses ready to build a strong foundation.",
    accent: "blue",
    icon: (
      <RocketLaunchIcon className="w-12 h-12 stroke-[1.5]" />
    ),
    detailedSteps: [
      { text: "1. Brand & Positioning Strategy" },
      { text: "2. Website & Core Assets" },
      { text: "3. AI-Enhanced Operations" },
      { text: "Outcome: Launch-ready brand and systems that position you for growth." }
    ],
    cta: "See Launch Process"
  },
  {
    title: "Scale",
    subtitle: "From Market to Growth",
    description: "For businesses ready to accelerate and optimize.",
    accent: "purple",
    icon: (
      <ArrowTrendingUpIcon className="w-12 h-12 stroke-[1.5]" />
    ),
    detailedSteps: [
      { text: "1. Growth Strategy & Systems" },
      { text: "2. Sales & Marketing Automation" },
      { text: "3. Process Optimization" },
      { text: "Outcome: Efficient systems and assets that help you compete at a higher level." }
    ],
    cta: "See Scale Process"
  },
  {
    title: "Pivot",
    subtitle: "Strategic Realignment",
    description: "For established businesses changing direction.",
    accent: "emerald",
    icon: (
      <GitBranch className="w-12 h-12 stroke-[1.5]" />
    ),
    detailedSteps: [
      { text: "1. Market Transition Plan" },
      { text: "2. Brand & Message Evolution" },
      { text: "3. Systems Adaptation" },
      { text: "Outcome: Smooth transition that maintains momentum and trust." }
    ],
    cta: "See Pivot Process"
  },
  {
    title: "Support",
    subtitle: "Reliable External Help",
    description: "For lean teams who need reliable external support and optimization.",
    accent: "amber",
    icon: (
      <WrenchScrewdriverIcon className="w-12 h-12 stroke-[1.5]" />
    ),
    detailedSteps: [
      { text: "1. Team & Process Assessment" },
      { text: "2. Support System Design" },
      { text: "3. Ongoing Optimization" },
      { text: "Outcome: Reliable external support that helps your team stay lean and effective." }
    ],
    cta: "See Support Process"
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
  const getIconForTitle = (title: string) => {
    const collaborator = collaborators.find(c => c.title === title);
    return collaborator?.icon || null;
  };

  return (
    <div className="flex relative justify-start max-w-xl mx-auto flex-col px-4 sm:px-0">
      {[{ text: title, isTitle: true }, ...loadingStates].map((state, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0);
        const isTitle = 'isTitle' in state;
        const isOutcome = state.text.startsWith('Outcome:');

        return (
          <motion.div
            key={index}
            className={cn(
              "text-left flex gap-3 sm:gap-4",
              isTitle ? "mb-6 sm:mb-8" : "mb-4 sm:mb-6",
              isOutcome && "mt-4"
            )}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-shrink-0 mt-1">
              {isTitle ? (
                <div className="w-12 h-12 mb-2">
                  {getIconForTitle(state.text)}
                </div>
              ) : (
                !isOutcome && (
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    index <= value 
                      ? "border-ethereal-dark bg-ethereal-dark" 
                      : "border-ethereal-dark/30"
                  )}>
                    {index <= value && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                )
              )}
            </div>
            <div className={cn(
              "flex-grow py-1",
              isTitle && "pt-1"
            )}>
              {isTitle ? (
                <>
                  <h3 className="text-2xl font-serif text-ethereal-dark mb-2">
                    {state.text}
                  </h3>
                  <p className="text-ethereal-dark/70 text-base">
                    {loadingStates[0].text}
                  </p>
                </>
              ) : (
                <span className={cn(
                  "text-base leading-relaxed",
                  isOutcome 
                    ? "text-emerald-600 font-medium" 
                    : index <= value 
                      ? "text-ethereal-dark" 
                      : "text-ethereal-dark/50"
                )}>
                  {state.text}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
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
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden font-sans"
    >
      {/* Premium background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(147,51,234,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.9),rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.9))]" />
      <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[90rem] mx-auto">
          {/* Header with enhanced styling */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
            style={{ y }}
          >
            {/* Label with lines */}
            <motion.div 
              className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="h-px w-6 sm:w-8 bg-ethereal-dark/20"
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                transition={{ duration: 0.8 }}
              />
              <span className="font-mono text-xs sm:text-sm tracking-wider text-ethereal-dark/60 uppercase">
                How I Can Help
              </span>
              <motion.div 
                className="h-px w-6 sm:w-8 bg-ethereal-dark/20"
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>

            {/* Main title with animated gradient */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-center text-ethereal-dark">
              The NextStage
              <motion.span
                className="block mt-1 sm:mt-2 relative"
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
                  Framework
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
                  Framework
                </motion.span>
                <span className="relative aurora-text-gradient-light">
                  Framework
                </span>
              </motion.span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-6 text-center text-ethereal-dark/70 max-w-2xl mx-auto text-base sm:text-lg font-sans">
              Most businesses struggle because they lack one of three things—a solid strategy, an effective brand, or the right tech to scale. I help solve that.
            </p>
          </motion.div>

          {/* Cards with enhanced premium styling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-24 max-w-[90rem] mx-auto">
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
                  className={cn(
                    "relative p-8 sm:p-10 rounded-3xl h-full min-h-[380px]",
                    "transition-all duration-500 cursor-pointer",
                    "bg-white/40 backdrop-blur-xl",
                    "border border-white/60 group-hover:border-white",
                    "shadow-[0_8px_16px_rgb(0_0_0/0.04)] group-hover:shadow-[0_16px_32px_rgb(0_0_0/0.08)]",
                    "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/80 before:to-white/20 before:opacity-80 before:-z-10",
                    activeCard === i && `ring-2 ring-${item.accent}-400/50 ring-offset-2 ring-offset-white`
                  )}
                  onClick={() => handleCardClick(i)}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  {/* Premium icon container */}
                  <div className="flex items-start gap-6 mb-10">
                    <div className={cn(
                      "p-5 rounded-2xl bg-gradient-to-br from-white to-white/90",
                      `text-${item.accent}-500 shadow-lg group-hover:shadow-xl transition-all duration-500`,
                      `group-hover:bg-gradient-to-br group-hover:from-${item.accent}-50/90 group-hover:to-white`,
                      "border border-white group-hover:border-white/80",
                      "relative overflow-hidden"
                    )}>
                      <div className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                        `bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),transparent_70%)]`,
                        `from-${item.accent}-100/40`
                      )} />
                      <div className="w-16 h-16 stroke-[1.5] relative">
                    {item.icon}
                      </div>
                    </div>
                    <div className="text-left pt-2">
                    <h3 className={cn(
                        "text-3xl font-serif mb-3",
                        `text-${item.accent}-600 group-hover:text-${item.accent}-700`
                    )}>
                      {item.title}
                    </h3>
                      <p className={cn(
                        "text-sm font-mono tracking-wide",
                        `text-${item.accent}-500/90 group-hover:text-${item.accent}-600`,
                        "relative inline-block"
                      )}>
                        {item.subtitle}
                        <motion.div 
                          className={`absolute -bottom-1 left-0 right-0 h-px bg-${item.accent}-400/30`}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </p>
                    </div>
                  </div>

                  {/* Premium description */}
                  <p className="font-sans text-lg leading-relaxed text-ethereal-dark/80 mb-16">
                      {item.description}
                    </p>
                    
                  {/* Premium CTA */}
                  <div className="absolute bottom-8 sm:bottom-10 left-8 sm:left-10 right-8 sm:right-10">
                    <motion.div 
                      className={cn(
                        "flex items-center justify-between",
                        "p-4 rounded-xl transition-all duration-300",
                        `group-hover:bg-${item.accent}-50/90`,
                        "border border-transparent group-hover:border-white/20",
                        "relative overflow-hidden"
                      )}
                      whileHover={{ x: 5 }}
                    >
                      <div className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                        `bg-gradient-to-r from-${item.accent}-50/20 to-transparent`
                      )} />
                      <span className={cn(
                        "text-sm font-mono font-medium relative",
                        `text-${item.accent}-600 group-hover:text-${item.accent}-700`
                      )}>
                        {item.cta}
                      </span>
                      <motion.svg 
                        className={cn(
                          "w-5 h-5 relative",
                          `text-${item.accent}-500 group-hover:text-${item.accent}-600`
                        )}
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                        whileHover={{ x: 2 }}
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                          clipRule="evenodd" 
                        />
                      </motion.svg>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Primary CTA with premium styling */}
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
              className="group relative px-16 py-7 overflow-hidden rounded-2xl"
            >
              {/* Premium gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 opacity-90 group-hover:opacity-100 transition-opacity" />
              
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400"
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
                  opacity: 0.4,
                }}
              />
              
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
              
              {/* Border gradient */}
              <div className="absolute inset-0 p-[1px] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-white/40 opacity-50" />
              </div>
              
              {/* Content */}
              <span className="relative font-mono text-xl text-white flex items-center gap-4">
                Schedule Call
                <motion.svg 
                  className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M9 5l7 7-7 7" />
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>

          {/* Modal */}
      <AnimatePresence mode="wait">
        {showDetailedSteps && activeCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          >
            {/* Close button */}
            <button
              onClick={() => {
                setShowDetailedSteps(false);
                setCurrentDetailedStep(0);
              }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black hover:opacity-70 transition-opacity z-[102]"
            >
                  <XMarkIcon className="w-4 h-4 text-white" />
            </button>

                <div className="w-full h-full flex items-center justify-center px-6 sm:px-4">
              <LoaderCore 
                value={currentDetailedStep} 
                loadingStates={collaborators[activeCard].detailedSteps}
                title={collaborators[activeCard].title}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
} 