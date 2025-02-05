"use client";

import React, { useRef, useEffect, useState, createRef } from 'react';
import { motion, useScroll, useTransform, easeInOut, useAnimation } from 'framer-motion';
import { SparklesIcon, BoltIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const insights = [
  {
    id: "vision",
    title: "Strategic Clarity",
    description: "Transform abstract ideas into tangible strategies that resonate with stakeholders and drive meaningful outcomes.",
    icon: SparklesIcon,
    metric: {
      value: "12+",
      label: "Deliverables",
      context: "Strategic assets per project"
    },
    points: [
      "Turn your big ideas into clear, actionable plans",
      "Work directly with you to refine and perfect the vision",
      "Deliver strategic assets you can implement today"
    ]
  },
  {
    id: "design",
    title: "Unified Expression",
    description: "Craft compelling visuals and experiences that capture attention and inspire action across every touchpoint.",
    icon: BoltIcon,
    metric: {
      value: "100%",
      label: "Confidence",
      context: "Launch readiness score"
    },
    points: [
      "Create designs that instantly connect with your audience",
      "Build interfaces that feel natural and effortless",
      "Deliver polished assets ready for immediate use"
    ]
  },
  {
    id: "impact",
    title: "Lasting Transformation",
    description: "Navigate market challenges with data-informed strategies that position you for sustainable growth.",
    icon: ChartBarIcon,
    metric: {
      value: "30+",
      label: "Launches",
      context: "Successful transformations"
    },
    points: [
      "Turn market research into real competitive edges",
      "Build systems that scale with your growth",
      "Focus on metrics that actually matter to your business"
    ]
  }
];

export function WhyImportant() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const arrowControls = useAnimation();
  
  // Add individual refs for each insight section
  const sectionRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
    Array(insights.length).fill(null).map(() => createRef<HTMLDivElement>())
  );

  // Create scroll progress trackers for each section
  const scrollProgressArray = [
    useScroll({
      target: sectionRefs.current[0],
      offset: ["start 80%", "end 20%"]
    }).scrollYProgress,
    useScroll({
      target: sectionRefs.current[1],
      offset: ["start 80%", "end 20%"]
    }).scrollYProgress,
    useScroll({
      target: sectionRefs.current[2],
      offset: ["start 80%", "end 20%"]
    }).scrollYProgress
  ];

  // Transform scroll progress to activation states
  const sectionActivations = [
    useTransform(
      scrollProgressArray[0],
      [0.4, 0.5, 0.8, 0.9],
      [0, 1, 1, 0],
      { clamp: false }
    ),
    useTransform(
      scrollProgressArray[1],
      [0.4, 0.5, 0.8, 0.9],
      [0, 1, 1, 0],
      { clamp: false }
    ),
    useTransform(
      scrollProgressArray[2],
      [0.4, 0.5, 0.8, 0.9],
      [0, 1, 1, 0],
      { clamp: false }
    )
  ];

  // Create transforms for each section
  const opacityTransforms = [
    useTransform(sectionActivations[0], [0, 1], [0.5, 1]),
    useTransform(sectionActivations[1], [0, 1], [0.5, 1]),
    useTransform(sectionActivations[2], [0, 1], [0.5, 1])
  ];
  
  const scaleTransforms = [
    useTransform(sectionActivations[0], [0, 1], [0.8, 1]),
    useTransform(sectionActivations[1], [0, 1], [0.8, 1]),
    useTransform(sectionActivations[2], [0, 1], [0.8, 1])
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scroll-based animations
  const headerY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const lineProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  
  const arrowOpacity = useTransform(
    lineProgress,
    [0, 0.85, 0.95, 1],
    [0, 0.3, 0.8, 1]
  );

  const arrowScale = useTransform(
    lineProgress,
    [0, 0.85, 0.95, 1],
    [0.5, 0.7, 0.9, 1],
    {
      ease: easeInOut
    }
  );

  // Watch for line completion and trigger arrow animation
  useEffect(() => {
    const unsubscribe = lineProgress.on('change', value => {
      // Reset animation when scrolling up
      if (value < 0.95 && hasReachedEnd) {
        setHasReachedEnd(false);
        setIsAnimating(false);
        arrowControls.set({ rotate: 0, y: 0 });
      }
      
      // Start animation when reaching end
      if (value >= 0.99 && !hasReachedEnd && !isAnimating) {
        setHasReachedEnd(true);
        setIsAnimating(true);
        
        // Start the arrow animation sequence
        arrowControls.start({
          rotate: [0, 15, 345, 360],
          transition: {
            duration: 2.5,
            times: [0, 0.2, 0.8, 1],
            ease: [0.6, 0.01, 0.05, 1],
          }
        }).then(() => {
          // After rotation, start the hover animation
          arrowControls.start({
            y: [-2, 0, -2],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          });
        });
      }
    });

    return () => unsubscribe();
  }, [lineProgress, hasReachedEnd, arrowControls, isAnimating]);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 lg:py-48 bg-gradient-to-br from-[#FFFFF0] to-[#1C1C1C] overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Aurora background effect */}
        <div className="aurora-bg" style={{
          backgroundImage: `url(${encodeURI('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CCFsxRTCZvCqB3oJFvQvePpyd0hO0L.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          mixBlendMode: 'screen'
        }} />
        <div className="mystical-accent-1"></div>
        <div className="mystical-accent-2"></div>
        <div className="mystical-accent-3"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-16">
        {/* Enhanced Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-20"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-8 bg-[#FFFFF0]/20" />
              <span className="font-mono text-sm text-[#FFFFF0]/80 tracking-wider">
              WHY THIS MATTERS
            </span>
              <div className="h-px w-8 bg-[#FFFFF0]/20" />
          </div>
          </motion.div>

          <motion.h2
            className="font-serif text-4xl lg:text-6xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[#FFFFF0]">From vision to</span>
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
                meaningful impact
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
                meaningful impact
              </motion.span>
              <span className="relative aurora-text-gradient-light">
                meaningful impact
              </span>
            </motion.span>
          </motion.h2>

          <motion.div
            className="max-w-2xl mx-auto mt-12 text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg lg:text-xl text-[#FFFFF0]/70 leading-relaxed">
            Transforming strategic thinking into tangible outcomes through unified systems that drive lasting impact
          </p>
          </motion.div>
        </motion.div>

        {/* Insights Grid with Enhanced Spacing */}
        <div className="relative">
          {/* Progress Line with Arrow */}
          <div className="absolute left-0 lg:left-1/2 w-0 top-0 bottom-0">
            <motion.div 
              className="absolute top-0 bottom-0 w-[1px] bg-white/10 left-8 lg:left-0"
              style={{
                scaleY: lineProgress,
                originY: 0
              }}
            />
            <motion.div 
              className="absolute w-[1px] bg-white/20 left-8 lg:left-0"
              style={{
                top: 0,
                bottom: 0,
                scaleY: lineProgress,
                originY: 0,
                filter: "blur(2px)"
              }}
            />
            <motion.div 
              className="absolute -bottom-8 left-8 lg:left-0 w-6 h-6"
              style={{
                opacity: arrowOpacity,
                scale: arrowScale,
                transformOrigin: "center center",
                x: '-50%'
              }}
              animate={arrowControls}
            >
              {/* Arrow head with enhanced glow */}
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 rounded-full bg-primary-300/30 blur-lg transform scale-150"
                  animate={hasReachedEnd ? {
                    scale: [1.5, 1.8, 1.5],
                    opacity: [0.3, 0.5, 0.3],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  } : {}}
                />
                <svg 
                  viewBox="0 0 16 16" 
                  className="w-full h-full relative"
                >
                  <motion.path
                    d="M8 1v14M8 15l6-6M8 15l-6-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-300"
                  />
                </svg>
                <motion.div 
                  className="absolute inset-0 rounded-full bg-primary-300/20"
                  animate={hasReachedEnd ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  } : {}}
                />
              </div>
            </motion.div>
          </div>

          {/* Enhanced Cards Layout */}
          <div className="relative grid gap-24 lg:gap-40 mx-4 lg:mx-8">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                ref={sectionRefs.current[index]}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                className={`
                  relative flex flex-col lg:flex-row gap-12 lg:gap-32
                  ${index % 2 === 0 ? 'lg:pr-[52%]' : 'lg:pl-[52%]'}
                `}
              >
                {/* Enhanced Connection Line */}
                <div 
                  className={`
                    hidden lg:block absolute top-8 h-px
                    ${index % 2 === 0 ? 'left-12 right-0' : 'right-12 left-0'}
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-300/30 via-primary-300/10 to-transparent" />
                </div>

                {/* Enhanced Content Layout */}
                <motion.div
                  className="flex-1 relative pl-20 lg:pl-0 lg:px-12"
                  style={{
                    opacity: opacityTransforms[index],
                    scale: scaleTransforms[index]
                  }}
                >
                  {/* Icon with Scroll-Based Activation */}
                  <motion.div 
                    className="absolute left-0 lg:relative mb-8"
                  >
                    <motion.div 
                      className="relative inline-flex"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Outer glow */}
                      <motion.div 
                        className="absolute inset-0 rounded-full opacity-80"
                        animate={{ 
                          scale: [1.8, 2.2, 1.8],
                          opacity: [0.6, 0.8, 0.6]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          background: "radial-gradient(circle, rgba(147,197,253,0.2) 0%, rgba(147,197,253,0) 70%)"
                        }}
                      />
                      {/* Middle glow */}
                      <motion.div 
                        className="absolute inset-0 rounded-full blur-md opacity-50"
                        animate={{ 
                          scale: [1.1, 1.3, 1.1],
                          opacity: [0.4, 0.6, 0.4]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                        style={{
                          background: "radial-gradient(circle, rgba(147,197,253,0.4) 0%, rgba(147,197,253,0) 70%)"
                        }}
                      />
                      {/* Icon container */}
                      <motion.div 
                        className="relative w-16 h-16 rounded-full bg-[#1C1C1C]/50 border border-[#FFFFF0]/20 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-[#1C1C1C]/20"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Icon with glow */}
                        <motion.div
                          className="w-8 h-8"
                          animate={{ 
                            scale: [1.05, 1.15, 1.05],
                            filter: [
                              "brightness(1.3) drop-shadow(0 0 10px rgba(147,197,253,0.7))",
                              "brightness(1.7) drop-shadow(0 0 14px rgba(147,197,253,0.9))",
                              "brightness(1.3) drop-shadow(0 0 10px rgba(147,197,253,0.7))"
                            ]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          style={{
                            opacity: 1
                          }}
                        >
                          <motion.div className="w-full h-full">
                            <svg width="0" height="0" style={{ position: 'absolute' }}>
                              <defs>
                                <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <motion.stop
                                    offset="0%"
                                    animate={{
                                      stopColor: ["#0EA5E9", "#6366F1", "#10B981", "#0EA5E9"]
                                    }}
                                    transition={{
                                      duration: 4,
                                      repeat: Infinity,
                                      ease: "easeInOut"
                                    }}
                                  />
                                  <motion.stop
                                    offset="35%"
                                    animate={{
                                      stopColor: ["#6366F1", "#8B5CF6", "#0EA5E9", "#6366F1"]
                                    }}
                                    transition={{
                                      duration: 4,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                      delay: 1
                                    }}
                                  />
                                  <motion.stop
                                    offset="65%"
                                    animate={{
                                      stopColor: ["#8B5CF6", "#10B981", "#6366F1", "#8B5CF6"]
                                    }}
                                    transition={{
                                      duration: 4,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                      delay: 2
                                    }}
                                  />
                                  <motion.stop
                                    offset="100%"
                                    animate={{
                                      stopColor: ["#10B981", "#0EA5E9", "#8B5CF6", "#10B981"]
                                    }}
                                    transition={{
                                      duration: 4,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                      delay: 3
                                    }}
                                  />
                                </linearGradient>
                              </defs>
                            </svg>
                            <insight.icon className="w-full h-full [&>path]:stroke-[2] [&>path]:stroke-[url(#aurora-gradient)]" />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Content Structure */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative"
                  >
                    <div className="flex flex-col lg:block mb-8">
                      <h3 className="font-serif text-3xl text-surface-50 mb-4 lg:mb-6">
                        {insight.title}
                      </h3>
                      
                      {/* Enhanced Mobile Metric */}
                      <motion.div 
                        className="flex items-center gap-4 lg:hidden mb-6
                                  px-5 py-3 rounded-full bg-white/5
                                  border border-white/10 backdrop-blur-sm
                                  shadow-lg shadow-white/5"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <motion.span 
                          className="text-3xl font-serif bg-gradient-to-r from-white via-[#E6E9FF] to-white bg-clip-text text-transparent"
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
                          {insight.metric.value}
                        </motion.span>
                        <div className="text-left">
                          <div className="text-sm font-medium text-white/95">
                            {insight.metric.label}
                          </div>
                          <div className="text-xs text-white/80">
                            {insight.metric.context}
                          </div>
                        </div>
                      </motion.div>

                      <p className="text-white/90 text-lg mb-8 font-light leading-relaxed">
                        {insight.description}
                      </p>
                    </div>

                    {/* Enhanced Points List */}
                    <ul className="space-y-4">
                      {insight.points.map((point, i) => (
                        <motion.li
                          key={point}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + (i * 0.1) }}
                          className="flex items-start gap-4 text-white/90 text-lg"
                        >
                          {/* Custom Aurora Arrow */}
                          <div className="relative flex-shrink-0 w-5 h-5 mt-1">
                            {/* Outer glow */}
                            <motion.div 
                              className="absolute inset-0 rounded-full"
                              animate={{ 
                                scale: [1.2, 1.4, 1.2],
                                opacity: [0.2, 0.3, 0.2]
                              }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              style={{
                                background: "radial-gradient(circle, rgba(147,197,253,0.2) 0%, rgba(147,197,253,0) 70%)"
                              }}
                            />
                            {/* Arrow SVG */}
                            <svg 
                              viewBox="0 0 24 24" 
                              className="absolute inset-0 w-full h-full"
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path 
                                d="M4 12H20M20 12L14 6M20 12L14 18" 
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="stroke-[url(#aurora-gradient)]"
                              />
                              <defs>
                                <linearGradient id={`aurora-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#38BDF8" />
                                  <stop offset="50%" stopColor="#818CF8" />
                                  <stop offset="100%" stopColor="#34D399" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Enhanced Desktop Metric */}
                  <motion.div 
                    className="hidden lg:flex absolute top-0 right-0 items-center gap-4 
                              px-6 py-4 rounded-full bg-white/5
                              border border-white/10 backdrop-blur-sm
                              shadow-lg shadow-white/5"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.span 
                      className="text-4xl font-serif bg-gradient-to-r from-white via-[#E6E9FF] to-white bg-clip-text text-transparent"
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
                      {insight.metric.value}
                    </motion.span>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white/95">
                        {insight.metric.label}
                      </div>
                      <div className="text-xs text-white/80">
                        {insight.metric.context}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 