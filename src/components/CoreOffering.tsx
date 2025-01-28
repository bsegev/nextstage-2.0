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
  ChevronLeftIcon,
  AcademicCapIcon,
  SparklesIcon,
  LightBulbIcon
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
    name: "FOUNDATION",
    description: "What you need to build on",
    color: "blue",
    borderColor: "border-blue-400/40",
    hoverBorderColor: "hover:border-blue-400/60",
    items: [
      { id: "brand-strategy", title: "Brand Strategy", icon: DocumentTextIcon },
      { id: "brand-identity", title: "Brand Identity", icon: SwatchIcon },
      { id: "business-plan", title: "Business Plan", icon: ClipboardDocumentCheckIcon },
      { id: "market-positioning", title: "Market Positioning", icon: ChartBarIcon },
      { id: "audience-research", title: "Audience Research", icon: UserGroupIcon },
      { id: "brand-voice", title: "Brand Voice", icon: ChatBubbleBottomCenterTextIcon }
    ]
  },
  {
    id: "communication",
    name: "COMMUNICATION",
    description: "What you need to connect",
    color: "purple",
    borderColor: "border-purple-400/40",
    hoverBorderColor: "hover:border-purple-400/60",
    items: [
      { id: "storytelling", title: "Storytelling", icon: DocumentTextIcon },
      { id: "messaging-framework", title: "Messaging Framework", icon: ChatBubbleBottomCenterTextIcon },
      { id: "website-copy", title: "Website Copy", icon: WindowIcon },
      { id: "brand-language", title: "Brand Language", icon: ChatBubbleBottomCenterTextIcon },
      { id: "ghostwriting", title: "Ghostwriting", icon: DocumentDuplicateIcon },
      { id: "email-campaigns", title: "Email Campaigns", icon: SignalIcon },
      { id: "pitch-decks", title: "Pitch Decks", icon: PresentationChartLineIcon },
      { id: "sales-decks", title: "Sales Decks", icon: PresentationChartBarIcon }
    ]
  },
  {
    id: "visual",
    name: "VISUAL",
    description: "What you need to show",
    color: "rose",
    borderColor: "border-rose-400/40",
    hoverBorderColor: "hover:border-rose-400/60",
    items: [
      { id: "logo-design", title: "Logo Design", icon: PaintBrushIcon },
      { id: "website-design", title: "Website Design", icon: WindowIcon },
      { id: "ux-ui", title: "UX/UI", icon: RectangleGroupIcon },
      { id: "marketing-assets", title: "Marketing Assets", icon: DocumentDuplicateIcon },
      { id: "explainer-video", title: "Explainer Video", icon: PlayIcon }
    ]
  },
  {
    id: "activation",
    name: "ACTIVATION",
    description: "What you need to launch",
    color: "amber",
    borderColor: "border-amber-400/40",
    hoverBorderColor: "hover:border-amber-400/60",
    items: [
      { id: "go-to-market", title: "Go-To-Market", icon: RocketLaunchIcon },
      { id: "launch-strategy", title: "Launch Strategy", icon: RocketLaunchIcon },
      { id: "content-strategy", title: "Content Strategy", icon: DocumentTextIcon },
      { id: "content-calendar", title: "Content Calendar", icon: DocumentDuplicateIcon },
      { id: "campaign-strategy", title: "Campaign Strategy", icon: SignalIcon },
      { id: "team-playbooks", title: "Team Playbooks", icon: DocumentDuplicateIcon }
    ]
  },
  {
    id: "growth",
    name: "GROWTH",
    description: "What you need to scale",
    color: "emerald",
    borderColor: "border-emerald-400/40",
    hoverBorderColor: "hover:border-emerald-400/60",
    items: [
      { id: "growth-strategy", title: "Growth Strategy", icon: ChartBarIcon },
      { id: "marketing-roadmap", title: "Marketing Roadmap", icon: SignalIcon },
      { id: "organic-lead-generation", title: "Organic Lead Generation", icon: UsersIcon },
      { id: "conversion-optimization", title: "Conversion Optimization", icon: ChartBarSquareIcon }
    ]
  },
  {
    id: "learning",
    name: "LEARNING",
    description: "What you need to master",
    color: "indigo",
    borderColor: "border-indigo-400/40",
    hoverBorderColor: "hover:border-indigo-400/60",
    items: [
      { id: "brand-coaching", title: "Brand Coaching", icon: AcademicCapIcon },
      { id: "pitch-training", title: "Pitch Training", icon: SparklesIcon },
      { id: "sales-enablement", title: "Sales Enablement", icon: LightBulbIcon },
      { id: "mindset-coaching", title: "Mindset Coaching", icon: UserCircleIcon },
      { id: "alignment-audit", title: "Alignment Audit", icon: MagnifyingGlassCircleIcon },
      { id: "employee-handbooks", title: "Employee Handbooks", icon: DocumentDuplicateIcon },
      { id: "onboarding-docs", title: "Onboarding Docs", icon: ClipboardDocumentCheckIcon }
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
      setTimeout(() => {
        setIsHovering(true);
        setActiveCategory(categoryId === "all" ? null : categoryId);
      }, 100); // Add a slight delay before changing category
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
            <span className="text-ethereal-dark">Brand System</span>
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
                Architecture
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
                Architecture
              </motion.span>
              <span className="relative aurora-text-gradient-light">
                Architecture
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
            Building brands from the inside out through connected systems
          </motion.p>
        </div>

        {/* Mobile Filter Bar - Sticky */}
        <div className="md:hidden sticky top-4 z-40 bg-white/80 backdrop-blur-lg shadow-sm">
          <div className="relative">
            {/* Scroll Container */}
            <div 
              ref={filterScrollRef}
              className="overflow-x-auto hide-scrollbar"
            >
              {/* Content Container with padding */}
              <div className="flex gap-2 py-3" style={{ 
                minWidth: "min-content",
                paddingLeft: "16px",
                paddingRight: "16px" // Match left side exactly
              }}>
                <motion.button
                  key="full-experience"
                  className={`flex-none inline-flex items-center gap-2 px-4 py-2 rounded-full 
                            ${fullExperience.borderColor} border
                            transition-all duration-300
                            ${!activeCategory ? 
                              'bg-white shadow-lg border-gray-300 ring-2 ring-gray-200 ring-offset-2 ring-offset-white' +
                              ' after:absolute after:inset-0 after:rounded-full after:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.05)] after:z-[-1]' : 
                              'bg-white/50'}`}
                  onClick={() => handleClick("all")}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={`text-sm font-medium transition-colors duration-200
                                ${!activeCategory ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
                    {fullExperience.name}
                  </span>
                </motion.button>

                {systemCategories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    className={`flex-none inline-flex items-center gap-2 px-4 py-2 rounded-full 
                              ${category.borderColor} border
                              transition-all duration-300
                              ${activeCategory === category.id ? 
                                `bg-white shadow-lg border-${category.color}-300 ring-2 ring-${category.color}-200 ring-offset-2 ring-offset-white` +
                                ' after:absolute after:inset-0 after:rounded-full after:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.05)] after:z-[-1]' : 
                                'bg-white/50'}`}
                    onClick={() => handleClick(category.id)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={`text-sm font-medium transition-colors duration-200
                                  ${activeCategory === category.id ? `text-${category.color}-900 font-semibold` : 'text-gray-600'}`}>
                      {category.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Scroll Indicators */}
            <AnimatePresence>
              {showLeftArrow && (
                <motion.div
                  key="left-arrow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-white/95 via-white/95 to-transparent w-12 flex items-center justify-start pl-4 pointer-events-none"
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-white/95 via-white/95 to-transparent w-12 flex items-center justify-end pr-4 pointer-events-none"
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

        {/* Mobile Deliverables Container */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory || 'all'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap justify-center gap-3 px-4 mt-6"
            >
              {systemCategories.map((category) => (
                category.items.map((item) => (
                  (!activeCategory || activeCategory === category.id) && (
                    <motion.div
                      key={item.id}
                      layout
                      className="w-full"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white 
                                  transition-all duration-300
                                  ${category.borderColor} border shadow-sm`}
                      >
                        <item.icon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-800">
                          {item.title}
                        </span>
                      </motion.div>
                    </motion.div>
                  )
                ))
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Content - Hide on Mobile */}
        <div className="hidden md:block">
          {/* Desktop Legend - Hide on Mobile */}
          <div className="max-w-[1200px] mx-auto mb-12">
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
                        filter: (!isHovering || activeCategory === category.id || activeCategory === null) ? 'blur(0px)' : 'blur(1px)',
                        transition: {
                          duration: 0.4,
                          delay: 0.2
                        }
                      }}
                      whileHover={{
                        scale: (activeCategory === category.id || !isFocused) && !isMobile ? 1.05 : 1,
                        transition: {
                          duration: 0.3,
                          delay: 0.15
                        }
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
      </div>

      {/* Add styles for gradients and shadows */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .text-blue-900 { color: rgb(30, 58, 138); }
        .text-purple-900 { color: rgb(88, 28, 135); }
        .text-rose-900 { color: rgb(136, 19, 55); }
        .text-amber-900 { color: rgb(120, 53, 15); }
        .text-emerald-900 { color: rgb(6, 78, 59); }
        .text-indigo-900 { color: rgb(49, 46, 129); }
        .border-blue-300 { border-color: rgb(147, 197, 253); }
        .border-purple-300 { border-color: rgb(216, 180, 254); }
        .border-rose-300 { border-color: rgb(253, 164, 175); }
        .border-amber-300 { border-color: rgb(252, 211, 77); }
        .border-emerald-300 { border-color: rgb(110, 231, 183); }
        .border-indigo-300 { border-color: rgb(165, 180, 252); }
        .ring-blue-200 { --tw-ring-color: rgb(191, 219, 254); }
        .ring-purple-200 { --tw-ring-color: rgb(233, 213, 255); }
        .ring-rose-200 { --tw-ring-color: rgb(254, 205, 211); }
        .ring-amber-200 { --tw-ring-color: rgb(253, 230, 138); }
        .ring-emerald-200 { --tw-ring-color: rgb(167, 243, 208); }
        .ring-indigo-200 { --tw-ring-color: rgb(199, 210, 254); }
      `}</style>
    </section>
  );
} 