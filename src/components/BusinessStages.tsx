"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { 
  RocketLaunchIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  ArrowPathIcon,
  ClipboardDocumentCheckIcon,
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

type IconType = typeof RocketLaunchIcon;

interface Deliverable {
  title: string;
  description: string;
}

interface Stage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: IconType;
  challenge: string;
  outcome: string;
  deliverables: Deliverable[];
}

const stages: Stage[] = [
  {
    id: 'build',
    name: 'Build Foundations',
    tagline: 'Start Strong, Scale Smart',
    description: 'Create the bedrock for sustainable growth with a brand that resonates and systems that scale.',
    icon: BuildingLibraryIcon,
    challenge: "You have the vision, but need the strategy and systems to bring it to life.",
    outcome: "A brand and foundation built for growth, ready to capture opportunities.",
    deliverables: [
      {
        title: 'Brand Strategy & Identity',
        description: 'Define your unique position and visual language'
      },
      {
        title: 'Core Messaging Framework',
        description: 'Craft stories that connect and convert'
      },
      {
        title: 'Digital Presence Design',
        description: 'Build a digital experience that drives growth'
      },
      {
        title: 'Launch Roadmap',
        description: 'Plan your path to market with confidence'
      }
    ]
  },
  {
    id: 'sustain',
    name: 'Sustain Efforts',
    tagline: 'Momentum Through Systems',
    description: 'Transform sporadic success into systematic growth with scalable processes and clear direction.',
    icon: ChartBarIcon,
    challenge: "You've found what works, but need systems to make it consistent and scalable.",
    outcome: "Reliable growth systems that run smoothly and adapt as you scale.",
    deliverables: [
      {
        title: 'Content Systems',
        description: 'Create content that consistently drives value'
      },
      {
        title: 'Marketing Automation',
        description: 'Scale your reach without scaling effort'
      },
      {
        title: 'Sales Enablement',
        description: 'Equip your team with tools for success'
      },
      {
        title: 'Team Alignment',
        description: 'Get everyone moving in the same direction'
      }
    ]
  },
  {
    id: 'grow',
    name: 'Grow Presence',
    tagline: 'Expand Your Impact',
    description: 'Take your established success to new heights with strategic expansion and market leadership.',
    icon: RocketLaunchIcon,
    challenge: "You're ready to expand your impact and claim market leadership.",
    outcome: "A dominant market position with systems built for continued expansion.",
    deliverables: [
      {
        title: 'Growth Strategy',
        description: 'Chart your path to market leadership'
      },
      {
        title: 'Market Expansion',
        description: 'Capture new opportunities systematically'
      },
      {
        title: 'Brand Evolution',
        description: 'Elevate your presence as you grow'
      },
      {
        title: 'Leadership Positioning',
        description: 'Establish your voice in the industry'
      }
    ]
  }
];

const agnosticServices: Stage[] = [
  {
    id: 'realign',
    name: 'Realign & Fix',
    tagline: 'Get Back on Track',
    description: "Reset and realign your strategy and systems when things aren't working as they should.",
    icon: ArrowPathIcon,
    challenge: "Your current approach isn't delivering the results you need.",
    outcome: "Clear direction and optimized systems that work for you.",
    deliverables: [
      {
        title: 'Brand Audit',
        description: "Identify what's working and what isn't"
      },
      {
        title: 'Strategy Reset',
        description: 'Realign your approach with your goals'
      },
      {
        title: 'System Optimization',
        description: 'Fine-tune for better performance'
      },
      {
        title: 'Team Recalibration',
        description: 'Get everyone back on the same page'
      }
    ]
  },
  {
    id: 'maintain',
    name: 'Maintain & Monitor',
    tagline: 'Keep Things Running',
    description: 'Ensure your systems stay effective and aligned with your evolving needs.',
    icon: ClipboardDocumentCheckIcon,
    challenge: "You need to maintain momentum while staying ahead of issues.",
    outcome: "Peace of mind knowing your systems are optimized and evolving.",
    deliverables: [
      {
        title: 'Performance Tracking',
        description: 'Stay on top of what matters'
      },
      {
        title: 'Regular Updates',
        description: 'Keep systems current and effective'
      },
      {
        title: 'Health Checks',
        description: 'Catch issues before they grow'
      },
      {
        title: 'Proactive Adjustments',
        description: 'Adapt to changing needs smoothly'
      }
    ]
  }
];

// Update the color themes for better contrast and visual appeal
const stageThemes = {
  build: {
    primary: '#3b82f6',
    secondary: '#60a5fa',
    gradient: 'from-blue-500/20 via-blue-400/10 to-transparent',
    accent: '#93c5fd'
  },
  sustain: {
    primary: '#0d9488', // Darker teal
    secondary: '#14b8a6',
    gradient: 'from-teal-600/20 via-teal-500/10 to-transparent',
    accent: '#5eead4'
  },
  grow: {
    primary: '#4f46e5',
    secondary: '#6366f1',
    gradient: 'from-indigo-500/20 via-violet-400/10 to-transparent',
    accent: '#a5b4fc'
  }
};

// Update the scroll lock hook for better cross-browser support
const useLockBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;
    
    // Store original styles
    const originalStyles = {
      body: {
        overflow: document.body.style.overflow,
        position: document.body.style.position,
        width: document.body.style.width,
        height: document.body.style.height,
        top: document.body.style.top,
      },
      html: {
        overflow: document.documentElement.style.overflow,
        position: document.documentElement.style.position,
        height: document.documentElement.style.height,
      }
    };

    // Get current scroll position
    const scrollY = window.scrollY;

    // Lock scroll on both html and body
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.documentElement.style.position = 'relative';

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.top = `-${scrollY}px`;
    
    return () => {
      // Restore original styles
      document.documentElement.style.overflow = originalStyles.html.overflow;
      document.documentElement.style.position = originalStyles.html.position;
      document.documentElement.style.height = originalStyles.html.height;

      document.body.style.overflow = originalStyles.body.overflow;
      document.body.style.position = originalStyles.body.position;
      document.body.style.width = originalStyles.body.width;
      document.body.style.height = originalStyles.body.height;
      document.body.style.top = originalStyles.body.top;

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};

export function BusinessStages() {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Lock scroll when modal is open
  useLockBodyScroll(!!selectedStage);

  // Handle escape key
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSelectedStage(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  // Track first interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  // Define stage positions and paths - adjusted for text visibility and centering
  const stageConfig = {
    build: {
      position: { x: 20, y: 70 },  // Moved right slightly for better text space
      path: 'M20 80 C25 80 30 65 40 55',
      labelPosition: 'center'  // Changed to center for consistency
    },
    sustain: {
      position: { x: 50, y: 50 },  // Center point
      path: 'M40 55 L60 55',
      labelPosition: 'center'
    },
    grow: {
      position: { x: 80, y: 30 },  // Moved left slightly for text space
      path: 'M60 55 C70 55 75 40 80 20',
      labelPosition: 'center'  // Changed to center for consistency
    }
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-surface-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/30" />
        <motion.div 
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-blue-500/5 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-indigo-500/5 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - refined to match WorkTogether */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div 
              className="inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="h-px w-8 bg-ethereal-dark/20"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8 }}
              />
              <span className="font-mono text-sm tracking-wider text-ethereal-dark/60 uppercase">
                Your Path Forward
              </span>
              <motion.div 
                className="h-px w-8 bg-ethereal-dark/20"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>

            <h2 className="font-serif text-4xl lg:text-6xl text-center text-ethereal-dark">
              Find Your
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
                  Growth Stage
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
                  Growth Stage
                </motion.span>
                <span className="relative aurora-text-gradient-light">
                  Growth Stage
                </span>
              </motion.span>
            </h2>
            <motion.p 
              className="mt-6 text-center text-ethereal-dark/70 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Every business faces unique challenges at different stages. Identify where you are, and let's create the path forward together.
            </motion.p>
          </motion.div>
        </div>

        {/* Growth Journey Visualization - enhanced with more dynamic elements */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] bg-white/40 backdrop-blur-sm rounded-3xl shadow-xl p-4 sm:p-8 overflow-hidden border border-white/20">
            {/* Mobile Interaction Prompt */}
            <AnimatePresence>
              {!hasInteracted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-0 bottom-4 z-20 flex justify-center sm:hidden pointer-events-none"
                >
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20">
                    <p className="text-sm text-ethereal-dark/70 text-center">
                      Tap stages to explore details
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stage-specific background gradients */}
            {stages.map((stage) => {
              const theme = stageThemes[stage.id as keyof typeof stageThemes];
              return (
                <motion.div
                  key={stage.id}
                  className={`absolute inset-0 bg-gradient-to-r ${theme.gradient}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredStage === stage.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Background Area */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(59,130,246)" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="rgb(45,212,191)" stopOpacity="0.03" />
                  <stop offset="100%" stopColor="rgb(79,70,229)" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Connection lines from buttons to path */}
              <motion.path
                d="M20 80 L20 80"
                stroke="url(#line-gradient)"
                strokeWidth="0.5"
                strokeDasharray="1 2"
                opacity="0.3"
              />
              <motion.path
                d="M50 55 L50 55"
                stroke="url(#line-gradient)"
                strokeWidth="0.5"
                strokeDasharray="1 2"
                opacity="0.3"
              />
              <motion.path
                d="M80 20 L80 20"
                stroke="url(#line-gradient)"
                strokeWidth="0.5"
                strokeDasharray="1 2"
                opacity="0.3"
              />

              <path 
                d="M20 80 C25 80 30 65 40 55 L60 55 C70 55 75 40 80 20 L80 100 L20 100 Z" 
                fill="url(#areaGradient)"
              />

              {/* Main Growth Path */}
              <motion.path
                d="M20 80 C25 80 30 65 40 55 L60 55 C70 55 75 40 80 20"
                fill="none"
                stroke="url(#animated-line-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />

              {/* Connection lines using animated gradient */}
              {Object.entries(stageConfig).map(([stage, config]) => (
                <motion.line
                  key={stage}
                  x1={`${config.position.x}`}
                  y1={`${config.position.y}`}
                  x2={`${config.position.x}`}
                  y2={config.path.split(' ')[1]}
                  stroke="url(#animated-line-gradient)"
                  strokeWidth="0.5"
                  strokeDasharray="1 2"
                  opacity="0.3"
                />
              ))}

              {/* Animated Particles */}
              <motion.circle
                r="0.5"
                fill="url(#particle-gradient)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  offsetPath: `path("M20 80 C25 80 30 65 40 55 L60 55 C70 55 75 40 80 20")`,
                  offsetDistance: ["0%", "100%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1
                }}
              />

              {/* Node connection points */}
              <circle cx="20" cy="80" r="0.75" fill="url(#line-gradient)" opacity="0.5" />
              <circle cx="50" cy="55" r="0.75" fill="url(#line-gradient)" opacity="0.5" />
              <circle cx="80" cy="20" r="0.75" fill="url(#line-gradient)" opacity="0.5" />

              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                  <motion.stop 
                    offset="0%" 
                    stopColor="#3b82f6"
                    animate={{
                      stopColor: ["#3b82f6", "#2dd4bf", "#4f46e5", "#3b82f6"]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.stop 
                    offset="50%" 
                    stopColor="#2dd4bf"
                    animate={{
                      stopColor: ["#2dd4bf", "#4f46e5", "#3b82f6", "#2dd4bf"]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.stop 
                    offset="100%" 
                    stopColor="#4f46e5"
                    animate={{
                      stopColor: ["#4f46e5", "#3b82f6", "#2dd4bf", "#4f46e5"]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </linearGradient>
                <linearGradient 
                  id="animated-line-gradient" 
                  gradientUnits="userSpaceOnUse"
                  x1="0%" 
                  y1="0%" 
                  x2="200%" 
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="25%" stopColor="#2dd4bf" />
                  <stop offset="50%" stopColor="#4f46e5" />
                  <stop offset="75%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <radialGradient id="particle-gradient">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
            </svg>

            {/* Stage Markers with enhanced colors */}
            {stages.map((stage, index) => {
              const config = stageConfig[stage.id as keyof typeof stageConfig];
              const theme = stageThemes[stage.id as keyof typeof stageThemes];
              const isHovered = hoveredStage === stage.id;
              
              return (
                <div 
                  key={stage.id}
                  className="absolute transform -translate-x-1/2 z-10"
                  style={{
                    left: `${config.position.x}%`,
                    top: `${config.position.y}%`,
                    width: 'auto',
                    minWidth: '160px'
                  }}
                >
                  {/* Label with dynamic color */}
                  <motion.div 
                    className="absolute left-0 -top-10 w-full text-left"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                  >
                    <div 
                      className="inline-block text-sm font-medium whitespace-nowrap px-3 py-1.5 bg-white/90 rounded-full shadow-sm backdrop-blur-sm border transition-colors duration-300"
                      style={{
                        borderColor: isHovered ? theme.primary + '40' : 'rgba(255,255,255,0.2)',
                        color: isHovered ? theme.primary : '#1a1a1a'
                      }}
                    >
                      {stage.name}
                    </div>
                  </motion.div>

                  {/* Connector Line with dynamic color */}
                  <div 
                    className="absolute left-[50%] -translate-x-1/2 h-4 w-px bg-gradient-to-b transition-colors duration-300"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, ${theme.primary}40, transparent)`,
                      top: '-8px'
                    }}
                  />

                  {/* Button with dynamic colors */}
                  <motion.button
                    onClick={() => setSelectedStage(stage)}
                    className="absolute left-[50%] -translate-x-1/2"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.2,
                      delay: index * 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                    onMouseEnter={() => setHoveredStage(stage.id)}
                    onMouseLeave={() => setHoveredStage(null)}
                  >
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                      {/* Enhanced glow effect with dynamic color */}
                      <motion.div
                        className="absolute inset-0 rounded-full blur-xl transform scale-150"
                        style={{
                          background: `radial-gradient(circle, ${theme.primary}20 0%, transparent 70%)`
                        }}
                        animate={{
                          scale: isHovered ? [1.5, 1.7, 1.5] : [1.5, 1.6, 1.5],
                          opacity: isHovered ? [0.5, 0.7, 0.5] : [0.3, 0.4, 0.3]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.5, 1]
                        }}
                      />
                      
                      {/* Outer Ring with dynamic color */}
                      <motion.div
                        className="absolute inset-0 rounded-full border transition-colors duration-300"
                        style={{
                          borderColor: isHovered ? theme.primary + '40' : 'rgba(255,255,255,0.3)'
                        }}
                        animate={{
                          scale: isHovered ? [1, 1.15, 1] : [1, 1.05, 1],
                          opacity: isHovered ? [0.6, 0.8, 0.6] : [0.3, 0.4, 0.3]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.5, 1]
                        }}
                      />

                      {/* Main Circle with dynamic color */}
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-white/90 shadow-lg backdrop-blur-sm flex items-center justify-center overflow-hidden"
                        animate={{
                          boxShadow: isHovered 
                            ? `0 0 20px ${theme.primary}30`
                            : `0 0 10px ${theme.primary}20`
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div 
                          className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300"
                          style={{ color: isHovered ? theme.primary : '#64748b' }}
                        >
                          <stage.icon className="w-full h-full" />
                        </div>
                      </motion.div>
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Modal Dialog */}
      <AnimatePresence>
        {selectedStage && (
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-8 overflow-y-auto">
            {/* Enhanced Backdrop with close on click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-md"
              onClick={() => setSelectedStage(null)}
            />

            {/* Modal Container */}
            <motion.div
              className="relative w-full sm:max-w-3xl bg-white/95 backdrop-blur-md sm:rounded-3xl shadow-2xl overflow-hidden min-h-screen sm:min-h-0"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {/* Sticky Close Button */}
              <motion.button
                onClick={() => setSelectedStage(null)}
                className="fixed sm:absolute top-4 right-4 z-50 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-200"
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <XMarkIcon className="w-6 h-6 text-ethereal-dark/60" />
              </motion.button>

              {/* Content Container with improved mobile padding */}
              <div className="relative p-6 pt-16 sm:p-10">
                {/* Header Section - Enhanced for mobile */}
                <div className="flex items-start justify-between mb-8 sm:mb-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1"
                  >
                    <div className="flex items-start gap-4 sm:gap-5 mb-3">
                      <div 
                        className="p-2 sm:p-3 rounded-xl sm:rounded-2xl backdrop-blur-sm shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${stageThemes[selectedStage.id as keyof typeof stageThemes].primary}20, ${stageThemes[selectedStage.id as keyof typeof stageThemes].secondary}10)`
                        }}
                      >
                        <selectedStage.icon 
                          className="w-6 h-6 sm:w-8 sm:h-8"
                          style={{ color: stageThemes[selectedStage.id as keyof typeof stageThemes].primary }}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-ethereal-dark mb-1">
                          {selectedStage.name}
                        </h3>
                        <p 
                          className="text-sm sm:text-base font-medium"
                          style={{ color: stageThemes[selectedStage.id as keyof typeof stageThemes].primary }}
                        >
                          {selectedStage.tagline}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Sections - Enhanced for mobile */}
                <div className="space-y-8 sm:space-y-12">
                  {/* Description - Made more prominent */}
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="absolute left-0 top-0 w-12 h-px" style={{ background: stageThemes[selectedStage.id as keyof typeof stageThemes].primary }} />
                    <p className="text-ethereal-dark/80 text-lg leading-relaxed pt-6">
                      {selectedStage.description}
                    </p>
                  </motion.div>

                  {/* Challenge & Outcome - Adjusted for mobile */}
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div 
                      className="group p-6 rounded-2xl backdrop-blur-[2px] border transition-all duration-300 relative overflow-hidden hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${stageThemes[selectedStage.id as keyof typeof stageThemes].primary}10, transparent)`,
                        borderColor: `${stageThemes[selectedStage.id as keyof typeof stageThemes].primary}20`
                      }}
                    >
                      <div 
                        className="absolute top-0 left-0 w-full h-1 opacity-20 group-hover:opacity-30 transition-opacity"
                        style={{ background: `linear-gradient(to right, ${stageThemes[selectedStage.id as keyof typeof stageThemes].primary}, ${stageThemes[selectedStage.id as keyof typeof stageThemes].accent})` }}
                      />
                      <motion.div
                        className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-[0.12]"
                        style={{ 
                          background: `radial-gradient(circle, ${stageThemes[selectedStage.id as keyof typeof stageThemes].primary} 0%, transparent 70%)`
                        }}
                      />
                      <h4 
                        className="text-sm font-medium uppercase tracking-wider mb-3 flex items-center gap-2"
                        style={{ color: stageThemes[selectedStage.id as keyof typeof stageThemes].primary }}
                      >
                        <span className="w-4 h-px" style={{ background: stageThemes[selectedStage.id as keyof typeof stageThemes].primary }} />
                        The Challenge
                      </h4>
                      <p className="text-ethereal-dark/80 relative z-10">{selectedStage.challenge}</p>
                    </div>
                    
                    {/* Similar update for Outcome box */}
                    <div 
                      className="group p-6 rounded-2xl backdrop-blur-[2px] border transition-all duration-300 relative overflow-hidden hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${stageThemes[selectedStage.id as keyof typeof stageThemes].secondary}10, transparent)`,
                        borderColor: `${stageThemes[selectedStage.id as keyof typeof stageThemes].secondary}20`
                      }}
                    >
                      <div 
                        className="absolute top-0 left-0 w-full h-1 opacity-20 group-hover:opacity-30 transition-opacity"
                        style={{ background: `linear-gradient(to right, ${stageThemes[selectedStage.id as keyof typeof stageThemes].secondary}, ${stageThemes[selectedStage.id as keyof typeof stageThemes].accent})` }}
                      />
                      <motion.div
                        className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-[0.12]"
                        style={{ 
                          background: `radial-gradient(circle, ${stageThemes[selectedStage.id as keyof typeof stageThemes].secondary} 0%, transparent 70%)`
                        }}
                      />
                      <h4 
                        className="text-sm font-medium uppercase tracking-wider mb-3 flex items-center gap-2"
                        style={{ color: stageThemes[selectedStage.id as keyof typeof stageThemes].secondary }}
                      >
                        <span className="w-4 h-px" style={{ background: stageThemes[selectedStage.id as keyof typeof stageThemes].secondary }} />
                        The Outcome
                      </h4>
                      <p className="text-ethereal-dark/80 relative z-10">{selectedStage.outcome}</p>
                    </div>
                  </motion.div>

                  {/* Deliverables - Adjusted for mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute left-0 top-0 w-12 h-px" style={{ background: stageThemes[selectedStage.id as keyof typeof stageThemes].primary }} />
                    <h4 
                      className="text-sm font-medium uppercase tracking-wider mb-4 sm:mb-6 pt-6"
                      style={{ color: stageThemes[selectedStage.id as keyof typeof stageThemes].primary }}
                    >
                      What We'll Do Together
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedStage.deliverables.map((deliverable, index) => (
                        <motion.div 
                          key={deliverable.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="group p-5 rounded-xl backdrop-blur-[2px] border transition-all duration-300 relative hover:shadow-lg"
                          style={{
                            borderColor: `${stageThemes[selectedStage.id as keyof typeof stageThemes].primary}20`,
                            background: `linear-gradient(135deg, ${stageThemes[selectedStage.id as keyof typeof stageThemes].primary}08, transparent)`
                          }}
                        >
                          <motion.div
                            className="absolute -right-16 -bottom-16 w-32 h-32 rounded-full opacity-[0.05] blur-2xl transition-opacity group-hover:opacity-[0.09]"
                            style={{ 
                              background: `radial-gradient(circle, ${stageThemes[selectedStage.id as keyof typeof stageThemes].accent} 0%, transparent 70%)`
                            }}
                          />
                          <div 
                            className="absolute -top-px -left-px w-8 h-8 flex items-center justify-center text-xs font-mono rounded-tl-xl rounded-br-xl"
                            style={{ 
                              background: `linear-gradient(135deg, ${stageThemes[selectedStage.id as keyof typeof stageThemes].primary}20, ${stageThemes[selectedStage.id as keyof typeof stageThemes].accent}10)`,
                              color: stageThemes[selectedStage.id as keyof typeof stageThemes].primary
                            }}
                          >
                            {(index + 1).toString().padStart(2, '0')}
                          </div>
                          <h5 
                            className="text-base font-medium mb-2 transition-colors duration-300 pl-6"
                            style={{ 
                              color: stageThemes[selectedStage.id as keyof typeof stageThemes].primary 
                            }}
                          >
                            {deliverable.title}
                          </h5>
                          <p className="text-sm text-ethereal-dark/70 group-hover:text-ethereal-dark/90 transition-colors duration-300 pl-6 relative z-10">
                            {deliverable.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .aurora-text-gradient-light {
          background: linear-gradient(to right, #3b82f6, #4f46e5, #38bdf8, #818cf8, #2dd4bf);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
        }

        @keyframes gradientFlow {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        #animated-line-gradient {
          animation: gradientFlow 8s linear infinite;
        }
      `}</style>
    </section>
  );
}