"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { SparklesIcon, BoltIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface InsightDetail {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  stat: string;
  context: string;
  highlight: string;
  details: string[];
  metric: {
    value: string;
    label: string;
    context: string;
    impact: string;
  };
}

const insights: InsightDetail[] = [
  {
    title: "Vision to Reality",
    description: "Transform abstract ideas into tangible strategies that resonate with stakeholders and drive meaningful outcomes.",
    icon: SparklesIcon,
    stat: "12+",
    context: "Strategic deliverables per engagement",
    highlight: "Strategy • Design • Impact",
    details: [
      "Strategic roadmapping",
      "Stakeholder alignment",
      "Vision workshops"
    ],
    metric: {
      value: "12+",
      label: "Deliverables",
      context: "Average strategic assets per project",
      impact: "Ensuring comprehensive coverage of your vision"
    }
  },
  {
    title: "Design That Delivers",
    description: "Craft compelling visuals and experiences that capture attention and inspire action across every touchpoint.",
    icon: BoltIcon,
    stat: "100%",
    context: "Launch with confidence",
    highlight: "Vision • Execution • Results",
    details: [
      "User-centered design",
      "Brand consistency",
      "Interactive prototypes"
    ],
    metric: {
      value: "100%",
      label: "Confidence",
      context: "Client launch readiness score",
      impact: "Every project launches with complete confidence"
    }
  },
  {
    title: "Strategic Impact",
    description: "Navigate market challenges with data-informed strategies that position you for sustainable growth.",
    icon: ChartBarIcon,
    stat: "30+",
    context: "Successful launches guided",
    highlight: "Growth • Success • Scale",
    details: [
      "Market analysis",
      "Growth strategy",
      "Performance metrics"
    ],
    metric: {
      value: "30+",
      label: "Launches",
      context: "Successful brand transformations",
      impact: "Proven track record of delivering results"
    }
  }
];

interface InsightCardProps {
  insight: InsightDetail;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

function InsightCard({ insight, index, mouseX, mouseY }: InsightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 500, damping: 30 });

  useEffect(() => {
    if (!cardRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateXValue = (e.clientY - centerY) / 20;
      const rotateYValue = (e.clientX - centerX) / 20;
      
      rotateX.set(rotateXValue);
      rotateY.set(rotateYValue);
    };

    if (hovered) {
      window.addEventListener('mousemove', handleMouseMove);
      scale.set(1.02);
    } else {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hovered, rotateX, rotateY, scale]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className="relative group"
    >
      <div className="relative p-6 rounded-xl bg-primary-800/30 backdrop-blur-sm 
                    border border-surface-50/10 transition-all duration-300
                    hover:bg-primary-800/40">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-surface-50/5 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative">
          <div className="flex items-start gap-6">
            <motion.div
              whileHover={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary-300/20 rounded-full blur-xl 
                           scale-75 group-hover:scale-100 transition-transform duration-300" />
              <insight.icon className="w-8 h-8 text-primary-300 shrink-0 mt-1 relative" />
            </motion.div>
            
            <div>
              <motion.h3 
                className="font-serif text-2xl text-surface-50 mb-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {insight.title}
              </motion.h3>
              <p className="text-surface-50/80 mb-4">{insight.description}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <motion.span 
                  className="text-3xl font-serif text-primary-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {insight.stat}
                </motion.span>
                <span className="text-sm text-surface-50/60">{insight.context}</span>
              </div>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: hovered ? "auto" : 0,
                  opacity: hovered ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="space-y-2">
                  {insight.details.map((detail, i) => (
                    <motion.li
                      key={detail}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-surface-50/70"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary-300" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function WhyThisMatters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeInsight, setActiveInsight] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Story progression timeline
  const progress = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 1], [0.95, 1]);
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Reveal animation states
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced scroll handling for persistent title
  const titleRef = useRef<HTMLDivElement>(null);
  const titleBounds = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2],
    [0, 0, 1]
  );

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[120vh] py-24 md:py-32 bg-primary-900 overflow-hidden"
    >
      {/* Persistent Title Bar */}
      <motion.div
        ref={titleRef}
        className="fixed top-0 left-0 right-0 z-50 bg-primary-900/80 backdrop-blur-md
                   transform-gpu"
        style={{
          opacity: titleBounds,
          y: useTransform(titleBounds, [0, 1], [-100, 0])
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-surface-50/60">WHY THIS MATTERS</span>
            <span className="h-4 w-px bg-surface-50/20" />
            <span className="text-surface-50/80 font-serif">Transform Vision into Reality</span>
          </div>
          <div className="flex items-center gap-6">
            {insights.map((insight, i) => (
              <motion.button
                key={i}
                className={`text-sm ${activeInsight === i ? 'text-primary-300' : 'text-surface-50/60'}`}
                onClick={() => setActiveInsight(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {insight.metric.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% ${useTransform(scrollYProgress, [0, 1], ['30%', '70%'])}, 
                     var(--primary-300) 0%, transparent 70%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Floating Elements */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ scale }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary-300/20"
              animate={{
                x: [
                  Math.random() * 1000 - 500,
                  Math.random() * 1000 - 500
                ],
                y: [
                  Math.random() * 1000 - 500,
                  Math.random() * 1000 - 500
                ]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="relative">
          {/* Initial Title Sequence */}
          <motion.div
            style={{ opacity: useTransform(titleBounds, [0, 1], [1, 0]) }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative inline-block"
            >
              <motion.span
                className="absolute -inset-1 rounded-lg bg-primary-300/20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <span className="relative font-mono text-sm tracking-wider text-surface-50/80">
                WHY THIS MATTERS
              </span>
            </motion.div>

            <motion.h2
              className="font-serif text-4xl md:text-6xl text-surface-50 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <span className="block text-primary-300 mb-2">Transform</span>
              Vision into Reality
            </motion.h2>
          </motion.div>

          {/* Enhanced Story Cards */}
          <div className="relative max-w-5xl mx-auto">
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-primary-300/20"
              style={{
                scaleY: useTransform(scrollYProgress, [0, 0.5], [0, 1])
              }}
            />

            <div className="relative grid gap-16">
              {insights.map((insight, index) => (
                <StoryCard
                  key={insight.title}
                  insight={insight}
                  index={index}
                  isActive={activeInsight === index}
                  onActivate={() => setActiveInsight(index)}
                  progress={progress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryCard({ insight, index, isActive, onActivate, progress }: {
  insight: InsightDetail;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  progress: MotionValue<number>;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  // Particle system for icon
  const particleCount = 12;
  const particles = [...Array(particleCount)].map((_, i) => ({
    angle: (i / particleCount) * Math.PI * 2,
    delay: i * 0.1
  }));

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseEnter={() => {
        setIsHovered(true);
        onActivate();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative group cursor-pointer
        ${index % 2 === 0 ? 'lg:mr-[50%]' : 'lg:ml-[50%]'}
      `}
    >
      {/* Connection Line */}
      <motion.div
        className="absolute top-1/2 hidden lg:block"
        style={{
          left: index % 2 === 0 ? '100%' : 'auto',
          right: index % 2 === 1 ? '100%' : 'auto',
          width: '50px',
          height: '2px',
          background: 'var(--primary-300)',
          transformOrigin: index % 2 === 0 ? 'left' : 'right',
          scaleX: useTransform(progress, (p) => isInView ? 1 : 0)
        }}
      />

      {/* Card Content */}
      <motion.div
        layout
        className="relative p-8 rounded-xl bg-surface-50/5 backdrop-blur-sm
                   border border-primary-300/10 overflow-hidden"
        animate={{
          scale: isHovered ? 1.02 : 1,
          backgroundColor: isHovered ? 'rgba(var(--primary-900-rgb), 0.1)' : 'rgba(var(--surface-50-rgb), 0.05)'
        }}
      >
        {/* Ambient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-300/10 via-transparent to-transparent"
          animate={{
            opacity: isHovered ? 0.2 : 0,
            scale: isHovered ? 1.1 : 1
          }}
        />

        {/* Icon with Particles */}
        <div className="relative mb-6">
          <motion.div
            className="relative z-10 w-12 h-12 rounded-full bg-primary-900/50
                       flex items-center justify-center"
            animate={{
              rotate: isHovered ? 360 : 0
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <insight.icon className="w-6 h-6 text-primary-300" />
          </motion.div>

          {/* Particles */}
          {isHovered && particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-primary-300"
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [1, 0],
                x: [0, Math.cos(particle.angle) * 50],
                y: [0, Math.sin(particle.angle) * 50]
              }}
              transition={{
                duration: 1,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Enhanced Metric Display */}
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-2
                     px-4 py-2 rounded-full bg-primary-900/30 border border-primary-300/20"
          animate={{
            scale: isHovered ? 1.05 : 1,
            backgroundColor: isHovered ? 'rgba(var(--primary-900-rgb), 0.4)' : 'rgba(var(--primary-900-rgb), 0.3)'
          }}
        >
          <motion.span
            className="text-2xl font-serif text-primary-300"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1
            }}
          >
            {insight.metric.value}
          </motion.span>
          <div className="text-left">
            <div className="text-sm font-medium text-surface-50">
              {insight.metric.label}
            </div>
            <div className="text-xs text-surface-50/60">
              {insight.metric.context}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div layout>
          <motion.div 
            layout
            className="flex items-baseline gap-4 mb-4"
          >
            <h3 className="font-serif text-2xl text-surface-50">
              {insight.title}
            </h3>
            <motion.span
              className="text-4xl font-serif text-primary-300"
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.5 }}
            >
              {insight.stat}
            </motion.span>
          </motion.div>

          <p className="text-surface-50/70 mb-6">
            {insight.description}
          </p>

          <motion.div
            initial={false}
            animate={{
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0
            }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-primary-300/80 text-sm mb-4"
              >
                {insight.metric.impact}
              </motion.div>
              {insight.details.map((detail, i) => (
                <motion.div
                  key={detail}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-primary-300"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                  <span className="text-surface-50/80">{detail}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 