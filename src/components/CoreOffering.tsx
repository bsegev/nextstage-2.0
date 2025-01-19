"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useAnimationFrame, AnimatePresence } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { 
  ChartBarSquareIcon, 
  DocumentTextIcon,
  UserGroupIcon,
  PresentationChartLineIcon,
  SwatchIcon,
  RectangleGroupIcon,
  MagnifyingGlassCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  UserCircleIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  PlusIcon,
  UsersIcon,
  PresentationChartBarIcon,
  WindowIcon,
  CursorArrowRaysIcon,
  CircleStackIcon,
  BriefcaseIcon,
  ClipboardDocumentCheckIcon,
  RocketLaunchIcon,
  SignalIcon,
  CubeTransparentIcon,
  PlayIcon,
  PaintBrushIcon,
  DocumentDuplicateIcon,
  CameraIcon
} from '@heroicons/react/24/outline';

const serviceCategories = [
  {
    name: "Strategy",
    description: "Uncover opportunities and chart the course forward",
    services: [
      {
        title: "Strategic Vision",
        shortDesc: "Transform ideas into compelling strategies",
        description: "Let's shape your vision into a clear, actionable strategy. We'll work together to define your unique position, identify key opportunities, and create a roadmap that resonates with stakeholders and drives meaningful outcomes.",
        icon: ChartBarSquareIcon,
        examples: ["Market positioning strategy", "Growth roadmap", "Value proposition design"]
      },
      {
        title: "Market Analysis",
        shortDesc: "Uncover market gaps and opportunities",
        description: "Through deep market analysis, we'll identify untapped opportunities and position you for success. We'll study your competitors, understand market dynamics, and find the perfect space for your offering to thrive.",
        icon: ChartBarIcon,
        examples: ["Competitive analysis", "Market opportunity mapping", "Trend analysis"]
      },
      {
        title: "Growth Advisory",
        shortDesc: "Strategic guidance for sustainable growth",
        description: "Get ongoing strategic support to navigate your growth journey. We'll be your thinking partner, providing fresh perspectives and actionable insights to keep you moving in the right direction.",
        icon: BuildingOfficeIcon,
        examples: ["Growth strategy sessions", "Strategic planning", "Decision support"]
      }
    ]
  },
  {
    name: "Design",
    description: "Craft experiences that inspire action",
    services: [
      {
        title: "Brand Identity",
        shortDesc: "Design a cohesive brand experience",
        description: "Create a distinctive and memorable brand identity that sets you apart. We'll develop a comprehensive design system that ensures consistency and impact across all touchpoints.",
        icon: SwatchIcon,
        examples: ["Visual identity system", "Brand guidelines", "Design language"]
      },
      {
        title: "UX Strategy",
        shortDesc: "Design intuitive user experiences",
        description: "Craft user experiences that delight and convert. We'll combine user research, interaction design, and strategic thinking to create interfaces that feel effortless and drive results.",
        icon: UserCircleIcon,
        examples: ["User journey mapping", "Interface design", "Usability testing"]
      },
      {
        title: "Creative Collateral",
        shortDesc: "Design assets that elevate your brand",
        description: "Transform your brand into stunning visual assets that capture attention and drive engagement. From social media to sales materials, we'll create design elements that consistently elevate your presence.",
        icon: RectangleGroupIcon,
        examples: ["Marketing materials", "Social media assets", "Sales collateral"]
      }
    ]
  },
  {
    name: "Story",
    description: "Tell stories that inspire action",
    services: [
      {
        title: "Narrative Design",
        shortDesc: "Shape compelling brand stories",
        description: "Craft stories that carry your essence from first glance to final pitch. We'll help you develop narratives that resonate deeply and inspire action, making complex ideas accessible and memorable.",
        icon: DocumentTextIcon,
        examples: ["Story architecture", "Message framework", "Content strategy"]
      },
      {
        title: "Mission & Story",
        shortDesc: "Define your mission and narrative",
        description: "Articulate your purpose in a way that moves people. We'll help you refine your mission and craft a story arc that connects with your audience on a deeper level.",
        icon: ChatBubbleBottomCenterTextIcon,
        examples: ["Mission statements", "Brand story", "Value narratives"]
      },
      {
        title: "Pitch Materials",
        shortDesc: "Create compelling presentations",
        description: "Transform your narrative into presentations that capture attention and drive decisions. We'll help you craft materials that make your vision impossible to ignore.",
        icon: PresentationChartLineIcon,
        examples: ["Pitch decks", "Investor presentations", "Sales materials"]
      }
    ]
  }
];

const FEATURED_DELIVERABLES = [
  "website-design",
  "brand-audit",
  "audience-insights",
  "messaging-framework",
  "pitch-deck",
  "animated-explainers",
  "email-design-system",
  "launch-package",
  "investment-materials"
];

const deliverables = [
  // Row 1
  {
    id: "brand-strategy",
    title: "Brand Strategy Blueprint",
    description: "Comprehensive strategic foundation defining your unique market position",
    icon: DocumentTextIcon,
    category: "Core Foundations"
  },
  {
    id: "website-design",
    title: "Website Design",
    description: "Strategic digital presence that brings your brand to life online",
    icon: WindowIcon,
    category: "Core Foundations"
  },
  {
    id: "vision-workshop",
    title: "Vision Workshop",
    description: "Collaborative sessions to align stakeholders and craft your vision",
    icon: UsersIcon,
    category: "Core Foundations"
  },
  {
    id: "brand-audit",
    title: "Brand Audit",
    description: "Assessment of current positioning and opportunities for transformation",
    icon: MagnifyingGlassCircleIcon,
    category: "Core Foundations"
  },

  // Row 2
  {
    id: "visual-identity",
    title: "Visual Identity",
    description: "Core brand elements that bring your strategy to life",
    icon: RectangleGroupIcon,
    category: "Core Foundations"
  },
  {
    id: "audience-insights",
    title: "Audience Insights",
    description: "Deep understanding of your audience through systematic research",
    icon: UserGroupIcon,
    category: "Core Foundations"
  },
  {
    id: "pitch-deck",
    title: "Pitch Deck",
    description: "Compelling narratives that capture stakeholder attention",
    icon: PresentationChartLineIcon,
    category: "Core Foundations"
  },
  {
    id: "brand-guidelines",
    title: "Brand Guidelines",
    description: "Strategic guide for consistent brand expression",
    icon: ClipboardDocumentCheckIcon,
    category: "Core Foundations"
  },

  // Row 3
  {
    id: "messaging-framework",
    title: "Messaging Framework",
    description: "Strategic foundation for consistent brand communication",
    icon: ChatBubbleBottomCenterTextIcon,
    category: "Core Foundations"
  },
  {
    id: "content-strategy",
    title: "Content Strategy",
    description: "Systematic approach to content creation and distribution",
    icon: DocumentTextIcon,
    category: "Core Foundations"
  },
  {
    id: "animated-explainers",
    title: "Animated Explainers",
    description: "Strategic motion graphics and brand videos that simplify complex ideas",
    icon: PlayIcon,
    category: "Specialized Solutions"
  },
  {
    id: "investment-materials",
    title: "Investor Materials",
    description: "Strategic materials for fundraising and growth",
    icon: PresentationChartBarIcon,
    category: "Specialized Solutions"
  },

  // Row 4
  {
    id: "digital-experience",
    title: "Digital Experience Design",
    description: "User-centered digital interfaces and interactions",
    icon: CursorArrowRaysIcon,
    category: "Advanced Systems"
  },
  {
    id: "email-design-system",
    title: "Email Design System",
    description: "Strategic templates for email communications",
    icon: ChatBubbleBottomCenterTextIcon,
    category: "Advanced Systems"
  },
  {
    id: "launch-package",
    title: "Launch Package",
    description: "Complete suite of launch materials and assets",
    icon: RocketLaunchIcon,
    category: "Specialized Solutions"
  },

  // Rest of Advanced Systems
  {
    id: "campaign-design",
    title: "Campaign Design",
    description: "Multi-channel campaign concepts and assets",
    icon: SignalIcon,
    category: "Advanced Systems"
  },
  {
    id: "sales-enablement",
    title: "Sales Enablement Kit",
    description: "Strategic materials that support your sales process",
    icon: BriefcaseIcon,
    category: "Advanced Systems"
  },
  {
    id: "social-media-system",
    title: "Social Media System",
    description: "Visual and content frameworks for social presence",
    icon: ChatBubbleBottomCenterTextIcon,
    category: "Advanced Systems"
  },
  {
    id: "design-system",
    title: "Design System",
    description: "Comprehensive visual language and component library",
    icon: SwatchIcon,
    category: "Advanced Systems"
  },
  {
    id: "marketing-collateral",
    title: "Marketing Collateral",
    description: "Essential materials that extend your brand presence",
    icon: PresentationChartBarIcon,
    category: "Advanced Systems"
  },
  {
    id: "presentation-system",
    title: "Presentation System",
    description: "Template suite for consistent communications",
    icon: PresentationChartBarIcon,
    category: "Advanced Systems"
  },
  {
    id: "event-materials",
    title: "Event Materials",
    description: "Cohesive event branding and promotional assets",
    icon: RectangleGroupIcon,
    category: "Advanced Systems"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Package",
    description: "Ready-to-use assets for digital campaigns",
    icon: WindowIcon,
    category: "Advanced Systems"
  },

  // Specialized Solutions
  {
    id: "mvp-design",
    title: "MVP Design & Prototyping",
    description: "Quick-turn digital product validation",
    icon: CubeTransparentIcon,
    category: "Specialized Solutions"
  },
  {
    id: "ecommerce-design",
    title: "E-commerce Design",
    description: "Strategic online shopping experiences",
    icon: CircleStackIcon,
    category: "Specialized Solutions"
  },
  {
    id: "brand-video",
    title: "Brand Video Production",
    description: "Cinematic brand stories that capture your essence",
    icon: PlayIcon,
    category: "Specialized Solutions"
  },
  {
    id: "pitch-coaching",
    title: "Pitch Coaching & Support",
    description: "Strategic guidance for high-stakes presentations",
    icon: PresentationChartBarIcon,
    category: "Specialized Solutions"
  },
  {
    id: "custom-icons",
    title: "Custom Icons & Illustrations",
    description: "Unique visual assets that extend your brand",
    icon: PaintBrushIcon,
    category: "Specialized Solutions"
  },
  {
    id: "interactive-experiences",
    title: "Interactive Experiences",
    description: "Engaging digital interactions and microsites",
    icon: CursorArrowRaysIcon,
    category: "Specialized Solutions"
  },
  {
    id: "print-design",
    title: "Print Design System",
    description: "Strategic print materials and templates",
    icon: DocumentDuplicateIcon,
    category: "Specialized Solutions"
  },
  {
    id: "brand-photography",
    title: "Brand Photography Direction",
    description: "Visual direction for photo and video assets",
    icon: CameraIcon,
    category: "Specialized Solutions"
  }
];

const MovingBorder = ({ className }: { className?: string }) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / 3000; // 3s duration
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <div className="absolute inset-0 -z-10">
      <svg
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <rect
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="1"
          width="100%"
          height="100%"
          rx="1rem"
          ref={pathRef}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(147,197,253,0.3)" />
            <stop offset="50%" stopColor="rgba(192,168,249,0.4)" />
            <stop offset="100%" stopColor="rgba(244,163,235,0.3)" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div
        className={className}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        <div className="relative h-2 w-2">
          {/* Outermost glow - subtle fade */}
          <div className="absolute inset-[-8px] rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.2)_0%,rgba(94,234,212,0.1)_30%,rgba(192,168,249,0.1)_60%,transparent_80%)] blur-[2px]" />
          
          {/* Middle glow - vibrant aurora */}
          <div className="absolute inset-[-4px] rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.9)_0%,rgba(94,234,212,0.7)_30%,rgba(192,168,249,0.7)_50%,rgba(244,163,235,0.6)_70%,transparent_90%)]" />
          
          {/* Inner glow - transition to white */}
          <div className="absolute inset-[-1px] rounded-full bg-[radial-gradient(circle,white_0%,rgba(255,255,255,0.9)_30%,rgba(147,197,253,0.8)_60%,transparent_80%)]" />
          
          {/* White center core */}
          <div className="absolute inset-[2px] rounded-full bg-white shadow-[0_0_2px_1px_rgba(255,255,255,0.9)]" />
        </div>
      </motion.div>
    </div>
  );
};

export function CoreOffering() {
  const containerRef = useRef<HTMLDivElement>(null);
  const deliverablesRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Strategy");
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [showDeliverables, setShowDeliverables] = useState(false);
  const [visibleRows, setVisibleRows] = useState(3);
  
  // Calculate items per row based on screen size
  const itemsPerRow = useCallback(() => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1280) return 4; // xl
    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 768) return 2;  // md
    return 1; // mobile
  }, []);

  const [itemsPerRowState, setItemsPerRowState] = useState(itemsPerRow());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerRowState(itemsPerRow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerRow]);

  const visibleDeliverables = deliverables.slice(0, visibleRows * itemsPerRowState);
  const hasMoreDeliverables = visibleDeliverables.length < deliverables.length;

  const handleShowMore = () => {
    setVisibleRows(prev => prev + 2);
    // Smooth scroll to the last visible row
    setTimeout(() => {
      const items = deliverablesRef.current?.querySelectorAll('.deliverable-item');
      if (items) {
        const lastRowStart = items.length - itemsPerRowState;
        if (items[lastRowStart]) {
          items[lastRowStart].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 100);
  };

  const handleToggleDeliverables = () => {
    if (!showDeliverables) {
      setShowDeliverables(true);
      setTimeout(() => {
        deliverablesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      setShowDeliverables(false);
      setVisibleRows(3);
    }
  };
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.15]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-24 lg:py-32 bg-gradient-to-b from-white to-[#FFFFF0]/10"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: backgroundOpacity }}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
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
          {/* Aurora accent */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white via-[#FFFFF0] to-white"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Ethereal floating elements */}
          <motion.div
            className="absolute top-1/4 right-[15%] w-24 h-24 border border-[#1C1C1C]/10 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 255, 240, 0.1), transparent)',
            }}
            animate={{
              y: [-20, 0, -20],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-[15%] w-16 h-16 border border-[#1C1C1C]/10"
            style={{
              background: 'linear-gradient(45deg, rgba(255, 255, 240, 0.1), transparent)',
              transform: 'rotate(45deg)',
            }}
            animate={{
              y: [20, 0, 20],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-20"
          style={{ y: headerY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-[#1C1C1C]/0 via-[#1C1C1C]/20 to-[#1C1C1C]/0" />
              <motion.span 
                className="font-mono text-sm tracking-wider aurora-text-gradient-light"
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
                CORE OFFERINGS
              </motion.span>
              <div className="h-px w-8 bg-gradient-to-r from-[#1C1C1C]/0 via-[#1C1C1C]/20 to-[#1C1C1C]/0" />
            </div>
          </motion.div>

          <motion.h2
            className="font-serif text-4xl lg:text-6xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C1C1C] to-[#1C1C1C]/80">
            Transforming vision into
            </span>
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
                meaningful deliverables
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
                meaningful deliverables
              </motion.span>
              <span className="relative aurora-text-gradient-light">
                meaningful deliverables
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
            <p className="text-xl text-[#1C1C1C]/70 leading-relaxed">
              Whether you&apos;re launching something new or taking your business to its next breakthrough, success depends on three key elements:
            </p>
            
            <div className="space-y-6 text-lg">
              <motion.div 
                className="relative flex items-center gap-3 text-[#1C1C1C]/80 py-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="h-px w-12 bg-[#1C1C1C]/20" />
                <div className="relative font-light">
                  <span className="font-semibold">
                    <span className="relative">
                      Strategic clarity
                      <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-blue-400/5 via-indigo-300/10 to-purple-400/5 rounded-sm overflow-hidden"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false, margin: "-10%" }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        style={{ transformOrigin: 'left' }}
                        key="highlight1"
                      >
                        <motion.div
                          className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(147,197,253,0.2),rgba(165,180,252,0.2),rgba(192,168,249,0.2),transparent)]"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </span>
                  </span>
                  <span className="relative z-10"> that <i>guides</i> decisions</span>
                </div>
                <div className="h-px flex-1 bg-[#1C1C1C]/20" />
              </motion.div>

              <motion.div 
                className="relative flex items-center gap-3 text-[#1C1C1C]/80 py-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="h-px w-12 bg-[#1C1C1C]/20" />
                <div className="relative font-light">
                  <span className="font-semibold">
                    <span className="relative">
                      Design
                      <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-purple-400/5 via-pink-300/10 to-rose-400/5 rounded-sm overflow-hidden"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false, margin: "-10%" }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        style={{ transformOrigin: 'left' }}
                        key="highlight2"
                      >
                        <motion.div
                          className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(192,168,249,0.2),rgba(244,163,235,0.2),rgba(251,146,170,0.2),transparent)]"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.3
                          }}
                        />
                      </motion.div>
                    </span>
                  </span>
                  <span className="relative z-10"> that <i>makes</i> sophistication accessible</span>
                </div>
                <div className="h-px flex-1 bg-[#1C1C1C]/20" />
              </motion.div>

              <motion.div 
                className="relative flex items-center gap-3 text-[#1C1C1C]/80 py-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="h-px w-12 bg-[#1C1C1C]/20" />
                <div className="relative font-light">
                  <span className="font-semibold">
                    <span className="relative">
                      Stories
                      <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-emerald-400/5 via-teal-300/10 to-cyan-400/5 rounded-sm overflow-hidden"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false, margin: "-10%" }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        style={{ transformOrigin: 'left' }}
                        key="highlight3"
                      >
                        <motion.div
                          className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(110,231,183,0.2),rgba(94,234,212,0.2),rgba(103,232,249,0.2),transparent)]"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.6
                          }}
                        />
                      </motion.div>
                    </span>
                  </span>
                  <span className="relative z-10"> that <i>connect</i> and <i>convert</i></span>
                </div>
                <div className="h-px flex-1 bg-[#1C1C1C]/20" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-16">
          <nav className="inline-flex gap-4 p-1.5 rounded-full 
                         bg-gradient-to-r from-[#FFFFF0]/20 via-[#E6E9FF]/30 to-[#FFFFF0]/20 
                         backdrop-blur-sm border border-[#1C1C1C]/5 
                         shadow-[0_2px_10px_-2px_rgba(28,28,28,0.05)]">
            {serviceCategories.map((category) => (
              <motion.button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`relative px-6 py-2 text-sm font-medium rounded-full overflow-hidden
                           ${activeCategory === category.name 
                             ? 'text-[#1C1C1C]' 
                             : 'text-[#1C1C1C]/60 hover:text-[#1C1C1C]/80'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeCategory === category.name && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full shadow-sm overflow-hidden"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  >
                    {/* Base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFF0]/80 via-[#E6E9FF]/90 to-[#FFFFF0]/80" />
                    
                    {/* Aurora effect layers */}
                    <motion.div
                      className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(147,197,253,0.2),rgba(165,180,252,0.2),rgba(192,168,249,0.2),transparent)]"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(192,168,249,0.1),rgba(244,163,235,0.1),rgba(251,146,170,0.1),transparent)]"
                      animate={{
                        x: ['100%', '-100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(110,231,183,0.1),rgba(94,234,212,0.1),rgba(103,232,249,0.1),transparent)]"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                  </motion.div>
                )}
                <span className="relative z-10">{category.name}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          {serviceCategories.map((category) => (
            category.name === activeCategory && (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.p
                  className="text-xl text-[#1C1C1C]/70 text-center max-w-2xl mx-auto mb-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {category.description}
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.services.map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onHoverStart={() => setHoveredService(service.title)}
                      onHoverEnd={() => setHoveredService(null)}
                      className="group relative"
                    >
                      <motion.div
                        className={`relative h-full p-8 rounded-2xl backdrop-blur-sm
                                 border border-[#1C1C1C]/5 overflow-hidden
                                 ${category.name === "Strategy" 
                                   ? "bg-gradient-to-br from-blue-400/5 via-[#FFFFF0]/30 to-indigo-400/5" 
                                   : category.name === "Design"
                                   ? "bg-gradient-to-br from-purple-400/5 via-[#FFFFF0]/30 to-pink-400/5"
                                   : "bg-gradient-to-br from-emerald-400/5 via-[#FFFFF0]/30 to-teal-400/5"
                                 }`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Service Icon with aurora glow */}
                        <motion.div
                          className={`relative z-10 w-12 h-12 rounded-xl
                                   flex items-center justify-center mb-6 group-hover:shadow-lg
                                   overflow-hidden
                                   ${category.name === "Strategy" 
                                     ? "bg-gradient-to-br from-blue-100/80 via-[#FFFFF0]/80 to-indigo-100/80" 
                                     : category.name === "Design"
                                     ? "bg-gradient-to-br from-purple-100/80 via-[#FFFFF0]/80 to-pink-100/80"
                                     : "bg-gradient-to-br from-emerald-100/80 via-[#FFFFF0]/80 to-teal-100/80"
                                   }`}
                          whileHover={{ rotate: 5 }}
                        >
                          <motion.div
                            className={`absolute inset-0 
                                      ${category.name === "Strategy" 
                                        ? "bg-[linear-gradient(to_right,transparent,rgba(147,197,253,0.3),rgba(165,180,252,0.3),rgba(192,168,249,0.3),transparent)]"
                                        : category.name === "Design"
                                        ? "bg-[linear-gradient(to_right,transparent,rgba(192,168,249,0.3),rgba(244,163,235,0.3),rgba(251,146,170,0.3),transparent)]"
                                        : "bg-[linear-gradient(to_right,transparent,rgba(110,231,183,0.3),rgba(94,234,212,0.3),rgba(103,232,249,0.3),transparent)]"
                                      }`}
                            animate={{
                              x: ['-200%', '200%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          <service.icon className="w-6 h-6 text-[#1C1C1C]/70 relative z-10" />
                        </motion.div>

                        {/* Content */}
                        <div className="relative z-10">
                          <h3 className="font-serif text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#1C1C1C] to-[#1C1C1C]/80 mb-2">
                            {service.title}
                          </h3>
                          <p className="text-[#1C1C1C]/70 mb-6">
                            {service.description}
                          </p>

                          {/* Examples with enhanced hover */}
                          <ul className="space-y-2">
                            {service.examples.map((example, i) => (
                              <motion.li
                                key={example}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="flex items-center gap-2 text-sm text-[#1C1C1C]/60 group/item"
                              >
                                <motion.span
                                  className="w-4 h-4 flex items-center justify-center"
                                  whileHover={{ rotate: 90 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <PlusIcon className="w-4 h-4 group-hover/item:text-[#1C1C1C]/80 transition-colors duration-200" />
                                </motion.span>
                                <span className="group-hover/item:text-[#1C1C1C]/80 transition-colors duration-200">
                                {example}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Enhanced hover effects - Northern Lights */}
                        <motion.div
                          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 mix-blend-soft-light
                                    ${category.name === "Strategy" 
                                      ? "bg-[linear-gradient(to_bottom_right,rgba(147,197,253,0.4),rgba(165,180,252,0.4),rgba(192,168,249,0.4))]"
                                      : category.name === "Design"
                                      ? "bg-[linear-gradient(to_bottom_right,rgba(192,168,249,0.4),rgba(244,163,235,0.4),rgba(251,146,170,0.4))]"
                                      : "bg-[linear-gradient(to_bottom_right,rgba(110,231,183,0.4),rgba(94,234,212,0.4),rgba(103,232,249,0.4))]"
                                    }`}
                          animate={{ 
                            opacity: hoveredService === service.title ? 1 : 0,
                            scale: hoveredService === service.title ? 1.1 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Aurora glow effect */}
                        <motion.div
                          className={`absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-[2px]
                                    ${category.name === "Strategy" 
                                      ? "bg-gradient-to-r from-blue-200/50 via-indigo-200/50 to-blue-200/50"
                                      : category.name === "Design"
                                      ? "bg-gradient-to-r from-purple-200/50 via-pink-200/50 to-purple-200/50"
                                      : "bg-gradient-to-r from-emerald-200/50 via-teal-200/50 to-emerald-200/50"
                                    }`}
                          initial={false}
                          animate={{ 
                            opacity: hoveredService === service.title ? 0.5 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Animated accent line */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full overflow-hidden">
                          <motion.div
                            className={`h-px mx-auto
                                      ${category.name === "Strategy" 
                                        ? "bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                                        : category.name === "Design"
                                        ? "bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
                                        : "bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
                                      }`}
                            initial={{ width: "0%" }}
                            animate={{
                              width: hoveredService === service.title ? "66%" : "0%"
                            }}
                            transition={{ duration: 0.7 }}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Add after the services grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative z-10 mt-24 text-center"
        >
          <motion.button
            onClick={handleToggleDeliverables}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full
                       bg-gradient-to-r from-white/30 via-[#FFFFF0]/20 to-white/30
                       hover:bg-gradient-to-r hover:from-white/40 hover:via-[#FFFFF0]/30 hover:to-white/40
                       border border-[#1C1C1C]/5
                       text-[#1C1C1C]/80 text-lg font-medium relative
                       transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-[#FFFFF0]/30 to-white/0"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="relative z-10">{showDeliverables ? 'Hide Deliverables' : 'See Full List of Deliverables'}</span>
            <motion.span
              className="relative z-10"
              animate={{ rotate: showDeliverables ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDownIcon className="w-5 h-5" />
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {showDeliverables && (
              <motion.div
                ref={deliverablesRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mt-16"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                  {visibleDeliverables.map(deliverable => (
                    <motion.div 
                      key={deliverable.id}
                      className={`deliverable-item relative p-6 rounded-2xl backdrop-blur-sm 
                                border border-[#1C1C1C]/5 transition-all duration-300 group
                                bg-gradient-to-br from-white/50 via-[#FFFFF0]/30 to-white/50
                                hover:bg-gradient-to-br hover:from-white/60 hover:via-[#FFFFF0]/40 hover:to-white/60
                                ${FEATURED_DELIVERABLES.includes(deliverable.id) 
                                  ? 'hover:border-transparent' 
                                  : ''}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {FEATURED_DELIVERABLES.includes(deliverable.id) && (
                        <>
                        <div className="absolute inset-0 -z-10">
                            <MovingBorder className="opacity-50" />
                        </div>
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-br from-white/20 via-[#FFFFF0]/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            initial={false}
                            whileHover={{
                              background: [
                                "linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,240,0.2), rgba(255,255,255,0.1))",
                                "linear-gradient(to bottom right, rgba(255,255,240,0.2), rgba(255,255,255,0.2), rgba(255,255,240,0.1))"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div className="absolute -inset-[1px] bg-gradient-to-r from-white via-[#FFFFF0]/50 to-white rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-[2px]" />
                        </>
                      )}
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="p-2 rounded-xl bg-gradient-to-br from-white via-[#FFFFF0]/80 to-white
                                   shadow-[0_2px_10px_-2px_rgba(28,28,28,0.1)] relative overflow-hidden"
                          whileHover={{ rotate: 5 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-[#FFFFF0]/50 to-white/0"
                            animate={{
                              x: ['-200%', '200%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          <deliverable.icon className="w-6 h-6 text-[#1C1C1C]/70 relative z-10" />
                        </motion.div>
                        <div className="flex-1 text-left">
                          <h4 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#1C1C1C] to-[#1C1C1C]/80 mb-1">
                            {deliverable.title}
                          </h4>
                          <p className="text-sm text-[#1C1C1C]/70">
                            {deliverable.description}
                          </p>
                          <div className="mt-2 text-xs text-[#1C1C1C]/50 font-mono">
                            {deliverable.category}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {hasMoreDeliverables && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                  >
                    <motion.button
                      onClick={handleShowMore}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                               bg-gradient-to-r from-white/20 via-[#FFFFF0]/10 to-white/20
                               hover:bg-gradient-to-r hover:from-white/30 hover:via-[#FFFFF0]/20 hover:to-white/30
                               border border-[#1C1C1C]/5
                               text-[#1C1C1C]/70 text-base relative
                               transition-all duration-300 overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-[#FFFFF0]/20 to-white/0"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <span className="relative z-10">See More</span>
                      <PlusIcon className="w-4 h-4 relative z-10" />
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
} 