'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowsPointingInIcon, 
  ArrowsPointingOutIcon, 
  ArrowsRightLeftIcon,
  SparklesIcon,
  DocumentIcon,
  GlobeAltIcon,
  CubeIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  ShoppingCartIcon,
  SwatchIcon,
  PresentationChartLineIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-2 overflow-hidden bg-white border border-[#1C1C1C]/10 group-hover:border-[#1C1C1C]/20 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-[#1C1C1C] font-['Caveat'] text-xl tracking-wide", className)}>
      {children}
    </h4>
  );
};

const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-[#1C1C1C]/70 tracking-tight leading-relaxed text-sm font-sans",
        className
      )}
    >
      {children}
    </p>
  );
};

const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon: any;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Background Circles */}
      <div className="absolute inset-0 -z-10 -translate-y-[175px]">
        {/* External Presence Circle */}
        <div className="absolute -left-[10%] -top-[10%] w-[55%] aspect-square rounded-full bg-gradient-to-br from-[#38BDF8]/[0.07] via-[#818CF8]/[0.07] to-transparent" />
        {/* Connection Layer Circle */}
        <div className="absolute left-[22%] -top-[10%] w-[55%] aspect-square rounded-full bg-gradient-to-br from-[#818CF8]/[0.07] via-[#34D399]/[0.07] to-transparent" />
        {/* Internal Systems Circle */}
        <div className="absolute right-[-10%] -top-[10%] w-[55%] aspect-square rounded-full bg-gradient-to-br from-[#34D399]/[0.07] via-[#38BDF8]/[0.07] to-transparent" />
      </div>

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2",
          className
        )}
      >
        {items.map((item, idx) => (
          <Link
            href={item.link}
            key={item.link}
            className="relative group block p-1.5 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full block rounded-2xl bg-gradient-to-br from-[#38BDF8]/20 via-[#818CF8]/20 to-[#34D399]/20"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, ease: "easeIn" },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

const MobileCard = ({ title, description, icon: Icon }: { title: string; description: string; icon: any }) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-[#1C1C1C]/10 relative overflow-hidden">
      {/* Gradient background similar to desktop */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/[0.07] via-[#818CF8]/[0.07] to-[#34D399]/[0.07] opacity-50" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#1C1C1C]/40" />
          <h4 className="text-lg sm:text-xl font-serif text-[#1C1C1C]">{title}</h4>
        </div>
        <p className="text-xs sm:text-sm text-[#1C1C1C]/70 font-sans">{description}</p>
      </div>
    </div>
  );
};

const MobilePill = ({ 
  title, 
  description, 
  icon: Icon,
  isOpen,
  onClick
}: { 
  title: string; 
  description: string; 
  icon: any;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="group" onClick={onClick}>
      <div 
        className={cn(
          "bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 border border-[#1C1C1C]/10 flex items-center gap-2 sm:gap-3 relative overflow-hidden hover:border-[#1C1C1C]/20 transition-all duration-300",
          isOpen && "rounded-b-none border-b-0"
        )}
      >
        {/* Gradient background on hover */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br from-[#38BDF8]/[0.03] via-[#818CF8]/[0.03] to-[#34D399]/[0.03] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )} />
        <Icon className={cn(
          "w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-colors duration-300",
          isOpen ? "text-[#38BDF8]" : "text-[#1C1C1C]/40 group-hover:text-[#38BDF8]"
        )} />
        <span className="font-['Caveat'] text-base sm:text-lg text-[#1C1C1C] relative z-10 flex-1">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C1C1C]/40"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <div className="px-3 sm:px-4 py-2 sm:py-3 bg-white border border-t-0 border-[#1C1C1C]/10 rounded-b-xl sm:rounded-b-2xl">
              <p className="text-xs sm:text-sm text-[#1C1C1C]/70 font-sans">{description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function BrandAnatomy() {
  const [openPillIndex, setOpenPillIndex] = useState<number | null>(null);
  
  const columnTitles = [
    {
      title: 'External Layer',
      description: 'First impressions & awareness',
      icon: ArrowsPointingOutIcon,
    },
    {
      title: 'Connection Layer',
      description: 'Converting interest into engagement',
      icon: ArrowsRightLeftIcon,
    },
    {
      title: 'Internal Layer',
      description: 'Growth & retention systems',
      icon: ArrowsPointingInIcon,
    }
  ];

  const items = [
    // External Layer Row 1
    {
      title: "Brand Identity",
      description: "Your distinctive visual and verbal signature",
      link: "#brand-identity",
      icon: SparklesIcon
    },
    {
      title: "Marketing Assets",
      description: "Videos, social, and content that tell your story",
      link: "#marketing",
      icon: DocumentIcon
    },

    // Connection Layer Row 1
    {
      title: "Website Design",
      description: "Your digital home and conversion hub",
      link: "#website",
      icon: GlobeAltIcon
    },
    {
      title: "Marketing Funnels",
      description: "Guided pathways to engagement",
      link: "#funnels",
      icon: ChartBarIcon
    },

     // Internal Layer Row 1
     {
      title: "Growth Strategy",
      description: "Your roadmap for sustainable scaling",
      link: "#growth",
      icon: RocketLaunchIcon
    },
    {
      title: "Go-to-Market",
      description: "Strategic launch and expansion plans",
      link: "#gtm",
      icon: PresentationChartLineIcon
    },

       // External Layer Row 2
    {
      title: "Social Presence",
      description: "How you show up across platforms",
      link: "#social",
      icon: ChatBubbleBottomCenterTextIcon
    },
    {
      title: "Content Strategy",
      description: "Consistent storytelling that attracts your audience",
      link: "#content",
      icon: DocumentTextIcon
    },
    // Connection Layer Row 2
    {
      title: "Sales Enablement",
      description: "Tools to nurture relationships",
      link: "#sales",
      icon: ShoppingCartIcon
    },
    {
      title: "Lead Nurture",
      description: "Moving from interest to commitment",
      link: "#nurture",
      icon: SwatchIcon
    },
   // Internal Layer Row 2
    {
      title: "Team Resources",
      description: "Internal processes and documentation",
      link: "#resources",
      icon: UserGroupIcon
    },
    {
      title: "Operational Systems",
      description: "How you deliver and retain value",
      link: "#operations",
      icon: CubeIcon
    }
  ];

  return (
    <section id="brand-anatomy" className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16 sm:mb-24"
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
                Brand Anatomy
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
              The Complete
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
                  Digital Picture
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
                  Digital Picture
                </motion.span>
                <span className="relative aurora-text-gradient-light">
                  Digital Picture
                </span>
              </motion.span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-6 text-center text-ethereal-dark/70 max-w-2xl mx-auto text-base sm:text-lg font-sans px-4 sm:px-0">
              Every brand needs these three interconnected layers to thrive digitally
            </p>
          </motion.div>

          {/* Mobile and Tablet Layout */}
          <div className="lg:hidden space-y-8 sm:space-y-16">
            {columnTitles.map((column, columnIndex) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: columnIndex * 0.1 }}
                className="px-2 sm:px-0"
              >
                <MobileCard 
                  title={column.title}
                  description={column.description}
                  icon={column.icon}
                />
                <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {/* External Presence */}
                  {columnIndex === 0 && [
                    items[0], // Brand Identity
                    items[1], // Marketing Materials
                    items[6], // Content Strategy
                    items[7], // Social Presence
                  ].map((item, idx) => {
                    const itemIndex = columnIndex * 4 + idx;
                    return (
                      <MobilePill
                        key={item.title}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                        isOpen={openPillIndex === itemIndex}
                        onClick={() => {
                          setOpenPillIndex(openPillIndex === itemIndex ? null : itemIndex);
                        }}
                      />
                    );
                  })}
                  {/* Connection Layer */}
                  {columnIndex === 1 && [
                    items[2], // Website Design
                    items[3], // Digital Products
                    items[8], // Sales Enablement
                    items[9], // Brand Guidelines
                  ].map((item, idx) => {
                    const itemIndex = columnIndex * 4 + idx;
                    return (
                      <MobilePill
                        key={item.title}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                        isOpen={openPillIndex === itemIndex}
                        onClick={() => {
                          setOpenPillIndex(openPillIndex === itemIndex ? null : itemIndex);
                        }}
                      />
                    );
                  })}
                  {/* Internal Systems */}
                  {columnIndex === 2 && [
                    items[4], // Growth Strategy
                    items[5], // Launch Strategy
                    items[10], // Pitch Decks
                    items[11], // Team Resources
                  ].map((item, idx) => {
                    const itemIndex = columnIndex * 4 + idx;
                    return (
                      <MobilePill
                        key={item.title}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                        isOpen={openPillIndex === itemIndex}
                        onClick={() => {
                          setOpenPillIndex(openPillIndex === itemIndex ? null : itemIndex);
                        }}
                      />
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Layout Only */}
          <div className="hidden lg:block">
            {/* Column Titles */}
            <div className="grid grid-cols-3 gap-8 lg:gap-12 mb-12">
              {columnTitles.map((column, columnIndex) => (
                <motion.div
                  key={column.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: columnIndex * 0.1 }}
                  className="relative"
                >
                  {columnIndex < columnTitles.length - 1 && (
                    <motion.div 
                      className="absolute right-0 top-1/2 w-8 h-px bg-gradient-to-r from-[#1C1C1C]/10 to-transparent -mr-4"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <column.icon className="w-6 h-6 text-[#1C1C1C]/40" />
                      <h3 className="text-2xl font-serif text-[#1C1C1C]">
                        {column.title}
                      </h3>
                    </div>
                    <p className="text-lg text-[#1C1C1C]/70 font-sans">
                      {column.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Grid with Hover Effect */}
            <HoverEffect items={items} />
          </div>

          {/* Journey Message */}
          <motion.div 
            className="relative mt-32 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-r from-[#38BDF8]/5 via-[#818CF8]/5 to-[#34D399]/5 blur-3xl" />
            </div>
            <p className="relative text-xl text-[#1C1C1C]/70 font-serif">
              Start anywhere—each piece naturally leads to the others as your needs evolve.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 