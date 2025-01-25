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

const deliverables = [
  // Strategy & Research
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    icon: DocumentTextIcon
  },
  {
    id: "competitive-analysis",
    title: "Competitive Analysis",
    icon: ChartBarIcon
  },
  {
    id: "business-audit",
    title: "Business Plan Audit",
    icon: MagnifyingGlassCircleIcon
  },
  {
    id: "go-to-market",
    title: "Go-to-Market Strategy",
    icon: RocketLaunchIcon
  },
  {
    id: "audience-development",
    title: "Target Audience Development",
    icon: UserGroupIcon
  },
  {
    id: "user-personas",
    title: "User Personas",
    icon: UserCircleIcon
  },
  {
    id: "messaging-framework",
    title: "Messaging Framework",
    icon: ChatBubbleBottomCenterTextIcon
  },
  {
    id: "brand-voice",
    title: "Brand Voice Guidelines",
    icon: DocumentDuplicateIcon
  },
  {
    id: "content-strategy",
    title: "Content Strategy",
    icon: DocumentTextIcon
  },

  // Design & Experience
  {
    id: "visual-identity",
    title: "Visual Identity",
    icon: SwatchIcon
  },
  {
    id: "website-design",
    title: "Website Design",
    icon: WindowIcon
  },
  {
    id: "landing-pages",
    title: "Landing Pages",
    icon: CursorArrowRaysIcon
  },
  {
    id: "app-design",
    title: "App Design",
    icon: WindowIcon
  },
  {
    id: "ux-ui",
    title: "UX/UI Design",
    icon: RectangleGroupIcon
  },
  {
    id: "design-system",
    title: "Design System",
    icon: ClipboardDocumentCheckIcon
  },
  {
    id: "product-interface",
    title: "Product Interface",
    icon: CircleStackIcon
  },
  {
    id: "interactive-prototype",
    title: "Interactive Prototype",
    icon: CursorArrowRaysIcon
  },
  {
    id: "design-workshop",
    title: "Design Workshop",
    icon: UsersIcon
  },

  // Growth & Communication
  {
    id: "pitch-deck",
    title: "Pitch Deck",
    icon: PresentationChartLineIcon
  },
  {
    id: "investor-materials",
    title: "Investor Materials",
    icon: BriefcaseIcon
  },
  {
    id: "sales-deck",
    title: "Sales Deck",
    icon: PresentationChartBarIcon
  },
  {
    id: "explainer-video",
    title: "Explainer Video",
    icon: PlayIcon
  },
  {
    id: "motion-system",
    title: "Motion Design System",
    icon: PlayIcon
  },
  {
    id: "launch-campaign",
    title: "Launch Campaign",
    icon: RocketLaunchIcon
  },
  {
    id: "email-design",
    title: "Email Design",
    icon: ChatBubbleBottomCenterTextIcon
  },
  {
    id: "social-content",
    title: "Social Content",
    icon: DocumentDuplicateIcon
  },
  {
    id: "brand-guidelines",
    title: "Brand Guidelines",
    icon: ClipboardDocumentCheckIcon
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

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden font-['DM_Sans']">
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

        {/* Deliverables Tags */}
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap justify-center" style={{ gap: "16px 20px", padding: "0 20px" }}>
            {deliverables.map((deliverable) => (
              <motion.div
                key={deliverable.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white 
                              hover:bg-gray-50/80
                              transition-all duration-200
                              border border-gray-200
                              shadow-sm hover:shadow">
                  <deliverable.icon className="w-5 h-5 text-gray-600" />
                  <span className="text-base text-gray-800 whitespace-nowrap font-medium">
                    {deliverable.title}
                                </span>
                </div>
              </motion.div>
            ))}
                        </div>
                      </div>
      </div>
    </section>
  );
} 