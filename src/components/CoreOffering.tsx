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
  CameraIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';

const serviceCategories = [
  {
    name: "Strategy",
    description: "Chart the course with clarity",
    services: [
      {
        title: "Strategic Vision",
        shortDesc: "Transform ambition into actionable strategy",
        icon: ChartBarSquareIcon,
        outcomes: ["Market positioning", "Growth roadmap", "Opportunity mapping"]
      },
      {
        title: "Brand Architecture",
        shortDesc: "Build cohesive brand systems",
        icon: CubeTransparentIcon,
        outcomes: ["Brand framework", "Portfolio strategy", "Experience design"]
      },
      {
        title: "Growth Advisory",
        shortDesc: "Navigate complex decisions with confidence",
        icon: BuildingOfficeIcon,
        outcomes: ["Strategic planning", "Decision support", "Market analysis"]
      }
    ]
  },
  {
    name: "Design",
    description: "Craft experiences that resonate",
    services: [
      {
        title: "Brand Identity",
        shortDesc: "Design distinctive visual systems",
        icon: SwatchIcon,
        outcomes: ["Visual identity", "Design system", "Brand guidelines"]
      },
      {
        title: "Digital Experience",
        shortDesc: "Create intuitive digital touchpoints",
        icon: WindowIcon,
        outcomes: ["Website design", "Interface design", "Digital presence"]
      },
      {
        title: "Creative Direction",
        shortDesc: "Guide visual storytelling",
        icon: RectangleGroupIcon,
        outcomes: ["Art direction", "Visual strategy", "Asset creation"]
      }
    ]
  },
  {
    name: "Story",
    description: "Tell stories that move people",
    services: [
      {
        title: "Narrative Design",
        shortDesc: "Craft compelling brand stories",
        icon: DocumentTextIcon,
        outcomes: ["Story architecture", "Content strategy", "Message framework"]
      },
      {
        title: "Pitch Materials",
        shortDesc: "Present vision with impact",
        icon: PresentationChartLineIcon,
        outcomes: ["Pitch decks", "Investor materials", "Sales collateral"]
      },
      {
        title: "Launch Strategy",
        shortDesc: "Orchestrate memorable launches",
        icon: RocketLaunchIcon,
        outcomes: ["Launch planning", "Campaign design", "Go-to-market"]
      }
    ]
  }
];

const systemCategories = [
  {
    id: "foundation",
    name: "FOUNDATION SYSTEMS",
    description: "What you need to build on",
    color: "blue",
    borderColor: "border-blue-400/40",
    hoverBorderColor: "hover:border-blue-400/60",
    items: [
      { id: "brand-strategy", title: "Brand Strategy", icon: DocumentTextIcon },
      { id: "market-analysis", title: "Market Analysis", icon: ChartBarIcon },
      { id: "business-plan", title: "Business Plan Review", icon: ClipboardDocumentCheckIcon },
      { id: "audience-research", title: "Target Audience Research", icon: UserGroupIcon },
      { id: "value-prop", title: "Value Proposition", icon: RocketLaunchIcon },
      { id: "decision-framework", title: "Decision Framework", icon: CircleStackIcon },
      { id: "brand-architecture", title: "Brand Architecture", icon: CubeTransparentIcon }
    ]
  },
  {
    id: "communication",
    name: "COMMUNICATION SYSTEMS",
    description: "What you need to connect",
    color: "purple",
    borderColor: "border-purple-400/40",
    hoverBorderColor: "hover:border-purple-400/60",
    items: [
      { id: "brand-voice", title: "Brand Voice Guidelines", icon: ChatBubbleBottomCenterTextIcon },
      { id: "content-strategy", title: "Content Strategy", icon: DocumentTextIcon },
      { id: "messaging", title: "Messaging Framework", icon: ChatBubbleBottomCenterTextIcon },
      { id: "sales-deck", title: "Sales Deck", icon: PresentationChartBarIcon },
      { id: "playbooks", title: "Team Playbooks", icon: DocumentDuplicateIcon },
      { id: "training", title: "Training Programs", icon: UsersIcon },
      { id: "internal-comms", title: "Internal Communications", icon: ChatBubbleBottomCenterTextIcon }
    ]
  },
  {
    id: "visual",
    name: "VISUAL SYSTEMS",
    description: "What you need to show",
    color: "rose",
    borderColor: "border-rose-400/40",
    hoverBorderColor: "hover:border-rose-400/60",
    items: [
      { id: "visual-identity", title: "Visual Identity", icon: SwatchIcon },
      { id: "logo-design", title: "Logo Design", icon: PaintBrushIcon },
      { id: "design-system", title: "Design System", icon: RectangleGroupIcon },
      { id: "brand-guidelines", title: "Brand Guidelines", icon: ClipboardDocumentCheckIcon },
      { id: "motion-design", title: "Motion Design", icon: PlayIcon },
      { id: "digital-components", title: "Digital Components", icon: WindowIcon },
      { id: "marketing-materials", title: "Marketing Materials", icon: DocumentDuplicateIcon }
    ]
  },
  {
    id: "activation",
    name: "ACTIVATION SYSTEMS",
    description: "What you need to launch",
    color: "amber",
    borderColor: "border-amber-400/40",
    hoverBorderColor: "hover:border-amber-400/60",
    items: [
      { id: "website-design", title: "Website Design", icon: WindowIcon },
      { id: "product-interface", title: "Product Interface", icon: RectangleGroupIcon },
      { id: "campaign-design", title: "Campaign Design", icon: RocketLaunchIcon },
      { id: "digital-marketing", title: "Digital Marketing", icon: SignalIcon },
      { id: "social-media", title: "Social Media Strategy", icon: UsersIcon },
      { id: "launch-programs", title: "Launch Programs", icon: RocketLaunchIcon },
      { id: "content-calendar", title: "Content Calendar", icon: DocumentDuplicateIcon }
    ]
  },
  {
    id: "growth",
    name: "GROWTH SYSTEMS",
    description: "What you need to scale",
    color: "emerald",
    borderColor: "border-emerald-400/40",
    hoverBorderColor: "hover:border-emerald-400/60",
    items: [
      { id: "pitch-deck", title: "Pitch Deck", icon: PresentationChartLineIcon },
      { id: "investor-materials", title: "Investor Materials", icon: DocumentTextIcon },
      { id: "go-to-market", title: "Go-to-Market Strategy", icon: RocketLaunchIcon },
      { id: "growth-plan", title: "Growth Plan", icon: ChartBarIcon },
      { id: "marketing-roadmap", title: "Marketing Roadmap", icon: SignalIcon },
      { id: "performance-metrics", title: "Performance Metrics", icon: ChartBarSquareIcon },
      { id: "scale-strategy", title: "Scale Strategy", icon: RocketLaunchIcon }
    ]
  }
];

// Strategic story through deliverables:
// Strategy → Identity → Digital → Growth → Motion
const FEATURED_DELIVERABLES = [
  "strategic-blueprint",  // Shows strategic foundation
  "brand-identity",       // Shows design capability
  "marketing-website",    // Shows digital expertise
  "pitch-deck",          // Shows growth focus
  "onboarding-flows",    // Shows UX/product thinking
  "animated-explainers"   // Shows motion/technical capability
];

const fullExperience = {
  id: "all",
  name: "FULL EXPERIENCE",
  description: "View all capabilities",
  color: "gray",
  borderColor: "border-gray-400/40",
  hoverBorderColor: "hover:border-gray-400/60",
};

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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = (categoryId: string) => {
    if (!isMobile) {
      setIsHovering(true);
      setActiveCategory(categoryId === "all" ? null : categoryId);
    }
  };

  const handleSectionMouseLeave = (event: React.MouseEvent) => {
    if (!isMobile) {
      const rect = event.currentTarget.getBoundingClientRect();
      const { clientX, clientY } = event;
      
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        setIsHovering(false);
        setActiveCategory(null);
      }
    }
  };

  const handleItemMouseLeave = (event: React.MouseEvent) => {
    if (!isMobile) {
      const relatedTarget = event.relatedTarget as HTMLElement | null;
      if (!relatedTarget?.closest?.('.deliverable-item') && !relatedTarget?.closest?.('.filter-item')) {
        setIsHovering(false);
        setActiveCategory(null);
      }
    }
  };

  const handleBackgroundClick = (event: React.MouseEvent) => {
    if (!isMobile && event.target === event.currentTarget) {
      setIsHovering(false);
      setActiveCategory(null);
    }
  };

  const handleClick = (categoryId: string) => {
    if (categoryId === "all") {
      setActiveCategory(null);
      setIsHovering(false);
    } else if (activeCategory === categoryId) {
      setActiveCategory(null);
      setIsHovering(false);
    } else {
      setActiveCategory(categoryId);
      setIsHovering(true);
    }
  };

  const isFocused = isHovering || activeCategory !== null;

  // Add scroll position check
  const checkScrollPosition = useCallback(() => {
    const scrollContainer = filterScrollRef.current;
    if (scrollContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = filterScrollRef.current;
    if (scrollContainer) {
      checkScrollPosition();
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      return () => scrollContainer.removeEventListener('scroll', checkScrollPosition);
    }
  }, [checkScrollPosition]);

  // Check on resize
  useEffect(() => {
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [checkScrollPosition]);

  return (
    <section 
      className="py-24 sm:py-32 bg-white relative overflow-hidden font-['DM_Sans']"
      onMouseLeave={handleSectionMouseLeave}
      onClick={handleBackgroundClick}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-8 bg-ethereal-dark/20" />
              <span className="font-mono text-sm text-ethereal-dark/60 tracking-wider uppercase">
                Deliverables
              </span>
              <div className="h-px w-8 bg-ethereal-dark/20" />
            </div>
          </motion.div>

          <motion.h2
            className="font-serif text-4xl lg:text-6xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-ethereal-dark">End-to-End</span>
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
                Capabilities
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
                Capabilities
              </motion.span>
              <span className="relative aurora-text-gradient-light">
                Capabilities
              </span>
            </motion.span>
          </motion.h2>

          <motion.p 
            className="text-lg text-ethereal-dark/70 mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Transforming strategic vision into tangible outcomes through unified design systems
          </motion.p>
        </div>

        {/* Mobile Filter Bar - Sticky */}
        <div className="md:hidden sticky top-4 z-50 bg-white/80 backdrop-blur-lg py-3 shadow-sm relative">
          <div className="px-4 relative">
            <div 
              ref={filterScrollRef}
              className="flex overflow-x-auto gap-2 hide-scrollbar relative"
              style={{ paddingLeft: "calc(env(safe-area-inset-left) + 12px)", paddingRight: "calc(env(safe-area-inset-right) + 12px)" }}
            >
              <motion.button
                key="full-experience"
                className={`flex-none inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                          ${fullExperience.borderColor} border bg-white/50
                          transition-all duration-200
                          ${!activeCategory ? 'bg-white shadow-md ' + fullExperience.hoverBorderColor : ''}`}
                onClick={() => handleClick("all")}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: !activeCategory ? 1.05 : 1,
                  opacity: 1
                }}
              >
                <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{fullExperience.name}</span>
              </motion.button>

              {systemCategories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`flex-none inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                            ${category.borderColor} border bg-white/50
                            transition-all duration-200
                            ${activeCategory === category.id ? 'bg-white shadow-md ' + category.hoverBorderColor : ''}`}
                  onClick={() => handleClick(category.id)}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{category.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Scroll Indicators */}
            <AnimatePresence>
              {showLeftArrow && (
                <motion.div
                  key="left-arrow"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute left-0 top-[14px] bg-gradient-to-r from-white/80 via-white/80 to-transparent pl-1 pr-3 flex items-center pointer-events-none"
                  style={{ height: '24px' }}
                >
                  <motion.div
                    animate={{ x: [-3, 0, -3] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                  </motion.div>
                </motion.div>
              )}

              {showRightArrow && (
                <motion.div
                  key="right-arrow"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute right-0 top-[14px] bg-gradient-to-l from-white/80 via-white/80 to-transparent pr-1 pl-3 flex items-center pointer-events-none"
                  style={{ height: '24px' }}
                >
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Legend - Hide on Mobile */}
        <div className="max-w-[1200px] mx-auto mb-12 hidden md:block">
          <div className="flex flex-wrap justify-center gap-6">
            {/* Full Experience Filter */}
            <motion.div
              className="text-center w-full md:w-auto mb-4 md:mb-0 filter-item"
              onMouseEnter={() => handleMouseEnter("all")}
              onMouseLeave={handleItemMouseLeave}
            >
              <motion.div 
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                          ${fullExperience.borderColor} border bg-white/50 backdrop-blur-sm
                          transition-all duration-200 cursor-pointer
                          ${!activeCategory ? 'bg-white shadow-md ' + fullExperience.hoverBorderColor : ''}
                          hover:bg-white hover:shadow-md hover:${fullExperience.hoverBorderColor}`}
                onClick={() => handleClick("all")}
                whileHover={{ scale: !isFocused ? 1.05 : 1 }}
                animate={{
                  scale: !activeCategory ? 1.05 : 1,
                  opacity: 1
                }}
              >
                <span className={`text-sm font-medium transition-colors duration-200
                              ${!activeCategory ? 'text-gray-900' : 'text-gray-800'}`}>
                  {fullExperience.name}
                </span>
              </motion.div>
              <p className="text-xs text-gray-500 mt-1 hidden md:block">{fullExperience.description}</p>
            </motion.div>

            {/* System Categories */}
            {systemCategories.map((category) => (
              <motion.div
                key={category.id}
                className="text-center filter-item"
                onClick={() => handleClick(category.id)}
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleItemMouseLeave}
              >
                <motion.div 
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                            ${category.borderColor} border bg-white/50 backdrop-blur-sm
                            transition-all duration-200 cursor-pointer
                            ${activeCategory === category.id ? 'bg-white shadow-md ' + category.hoverBorderColor : ''}
                            hover:bg-white hover:shadow-md hover:${category.hoverBorderColor}`}
                  animate={{
                    scale: activeCategory === category.id ? 1.05 : 1,
                    opacity: !isFocused || activeCategory === category.id ? 1 : 0.3,
                  }}
                >
                  <span className="text-sm font-medium text-gray-800">{category.name}</span>
                </motion.div>
                <p className="text-xs text-gray-500 mt-1 hidden md:block">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Deliverables Tags */}
        <div className="max-w-[1200px] mx-auto" onClick={handleBackgroundClick}>
          <div className="flex flex-wrap justify-center md:mt-0 mt-16 deliverables-container" style={{ gap: "12px 16px", padding: "0 16px" }}>
            {systemCategories.map((category) => (
              category.items.map((item) => (
                <motion.div
                  key={item.id}
                  className={`group deliverable-item ${isMobile && activeCategory && activeCategory !== category.id ? 'hidden' : ''}`}
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleItemMouseLeave}
                >
                  <motion.div 
                    className={`flex items-center gap-2 md:gap-3 
                              px-4 py-2 md:px-6 md:py-3 rounded-full bg-white 
                              transition-all duration-300 cursor-pointer
                              ${category.borderColor} ${category.hoverBorderColor} border
                              shadow-sm hover:shadow`}
                    animate={{
                      scale: activeCategory === category.id ? 1.05 : 1,
                      opacity: (!isHovering || activeCategory === category.id || activeCategory === null) ? 1 : 0.3,
                      filter: (!isHovering || activeCategory === category.id || activeCategory === null) ? 'blur(0px)' : 'blur(1px)'
                    }}
                    whileHover={{
                      scale: (activeCategory === category.id || !isFocused) && !isMobile ? 1.05 : 1,
                    }}
                    onClick={() => !isMobile && handleClick(category.id)}
                  >
                    <item.icon className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-200
                                      ${activeCategory === category.id ? 'text-gray-800' : 'text-gray-600'}`} />
                    <span className={`text-sm md:text-base whitespace-nowrap font-medium transition-colors duration-200
                                  ${activeCategory === category.id ? 'text-gray-900' : 'text-gray-800'}`}>
                      {item.title}
                    </span>
                  </motion.div>
                </motion.div>
              ))
            ))}
          </div>
        </div>
      </div>

      {/* Add styles for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
} 