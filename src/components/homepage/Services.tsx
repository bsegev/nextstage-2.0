'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Lightbulb, 
  Palette, 
  Code2, 
  ArrowRight,
  Target,
  BarChart3,
  Briefcase,
  Layers,
  ShoppingCart,
  Bot,
  Workflow,
  Cpu
} from 'lucide-react';

const services = [
  {
    title: "Strategy",
    subtitle: "Clarity & Direction",
    icon: Lightbulb,
    color: "from-blue-500 to-blue-600",
    hoverColor: "group-hover:from-blue-400 group-hover:to-blue-700",
    items: [
      { icon: Target, text: "Brand positioning, storytelling & go-to-market strategy" },
      { icon: Briefcase, text: "Investor & sales materials that convert" },
      { icon: BarChart3, text: "Advisory for scaling and optimizing" }
    ]
  },
  {
    title: "Design",
    subtitle: "High-Impact Digital Presence",
    icon: Palette,
    color: "from-purple-500 to-purple-600",
    hoverColor: "group-hover:from-purple-400 group-hover:to-purple-700",
    items: [
      { icon: Layers, text: "Branding, websites & marketing assets" },
      { icon: Target, text: "UX/UI for customer conversion" },
      { icon: ShoppingCart, text: "E-commerce & growth-driven digital experiences" }
    ]
  },
  {
    title: "Technology",
    subtitle: "AI, Automation & Scalable Systems",
    icon: Code2,
    color: "from-emerald-500 to-emerald-600",
    hoverColor: "group-hover:from-emerald-400 group-hover:to-emerald-700",
    items: [
      { icon: Bot, text: "AI-driven content & workflow automation" },
      { icon: Workflow, text: "Custom GPTs & chatbot integration" },
      { icon: Cpu, text: "MVP development & product strategy" }
    ]
  }
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentAnimatedIndex, setCurrentAnimatedIndex] = useState<number>(0);
  const [animationActive, setAnimationActive] = useState<boolean>(true);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // Animation cycle for the service icons
  useEffect(() => {
    if (!isInView || !animationActive) return;
    
    const interval = setInterval(() => {
      setCurrentAnimatedIndex(prev => (prev + 1) % services.length);
    }, 7000); // Longer interval for a more relaxed pace
    
    return () => clearInterval(interval);
  }, [isInView, animationActive]);

  // Handle tab click
  const handleTabClick = (index: number) => {
    if (activeIndex === index) {
      // If closing the active tab, restart animation from the next index
      setActiveIndex(null);
      setCurrentAnimatedIndex((index + 1) % services.length);
      setAnimationActive(true);
    } else {
      // If opening a tab, stop animation and set active
      setActiveIndex(index);
      setAnimationActive(false);
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.03),transparent_70%)]" />
        <svg
          className="absolute left-full -translate-x-1/2 -translate-y-1/4 transform lg:left-auto lg:right-full lg:translate-x-1/2"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="services-grid"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-100" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={784} fill="url(#services-grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={containerRef}>
        <motion.div 
          className="mx-auto max-w-2xl text-center"
          style={{ opacity, y }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Label */}
            <motion.div 
              className="inline-flex items-center gap-2 sm:gap-3 mb-6"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div 
                className="h-px w-6 sm:w-8 bg-gradient-to-r from-blue-500/80 to-purple-500/80"
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                transition={{ duration: 0.8 }}
              />
              <span className="font-mono text-xs sm:text-sm tracking-wider text-ethereal-dark uppercase">
                How I Help
              </span>
              <motion.div 
                className="h-px w-6 sm:w-8 bg-gradient-to-r from-purple-500/80 to-emerald-500/80"
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>

            {/* Main Heading with Gradient */}
            <div className="relative mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ethereal-dark">
                3 Ways I Help You Get To{' '}
                <span className="block mt-2 sm:mt-3">
                  <span className="aurora-text-gradient-light relative">
                    The NextStage & Beyond
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </span>
                </span>
              </h2>
            </div>

            {/* Subheading */}
            <p className="font-sans text-lg sm:text-xl text-ethereal-dark/70 max-w-3xl mx-auto mb-12 sm:mb-16 leading-relaxed">
              I blend design, strategy, and technology seamlessly to build what's needed at every stage. From the ground, to the moon.
            </p>
          </motion.div>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div 
          className="mx-auto mt-16 max-w-7xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column - Service Cards */}
            <div className="grid grid-cols-1 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 ${activeIndex === index ? 'shadow-xl' : ''}`}
              >
                {/* Service Card Background */}
                <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} ${service.hoverColor} opacity-[0.08]`} />
                </div>

                  {/* Header - Always Visible */}
                  <motion.button
                    onClick={() => handleTabClick(index)}
                    className="w-full flex items-center justify-between p-8 cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`relative inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${service.color}`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                      <div className="text-left">
                        <h3 className="text-xl font-serif text-gray-900">
                    {service.title}
                  </h3>
                        <p className="font-sans text-sm text-gray-500">
                    {service.subtitle}
                  </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none"
                      >
                        <motion.path
                          d="M9 6L15 12L9 18"
                          stroke={activeIndex === index ? 
                            (index === 0 ? '#3B82F6' : index === 1 ? '#8B5CF6' : '#10B981') : 
                            'currentColor'
                          }
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-colors duration-300 ${
                            activeIndex !== index && 'text-gray-400 group-hover:' + 
                            (index === 0 ? 'text-blue-400' : 
                             index === 1 ? 'text-purple-400' : 
                             'text-emerald-400')
                          }`}
                        />
                      </svg>
                    </motion.div>
                  </motion.button>

                  {/* Expandable Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeIndex === index ? "auto" : 0,
                      opacity: activeIndex === index ? 1 : 0
                    }}
                    transition={{
                      height: { duration: 0.3, ease: "easeInOut" },
                      opacity: { duration: 0.2, ease: "easeInOut" }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0">
                      <ul className="space-y-4 border-t border-gray-100 pt-6">
                    {service.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <item.icon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="font-sans text-sm text-gray-600">{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Right Column - Triangle Animation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <style jsx global>{`
                .service-icon {
                  transform: scale(1) translate(-50%, -50%);
                  transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .active {
                  transform: scale(1.15) translate(-43%, -43%);
                  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .featured {
                  transform: scale(1.15) translate(-43%, -43%);
                  transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1);
                }
              `}</style>

              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100/50 to-purple-100/50 p-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[400px] h-[400px]">
                    {/* Triangle */}
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <motion.path
                        d="M50,20 L80,80 L20,80 Z"
                        fill="none"
                        stroke="url(#triangleGradient)"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                      <defs>
                        <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="50%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Icons */}
                    <div className={`absolute left-1/2 top-[20%] service-icon z-10 
                      ${activeIndex === 0 ? 'active' : 
                       animationActive && currentAnimatedIndex === 0 && !activeIndex ? 'featured' : ''}`}>
                      <motion.div 
                        onClick={() => handleTabClick(0)}
                        className={`p-6 rounded-2xl bg-white shadow-lg ring-1 cursor-pointer transition-all duration-700
                          ${activeIndex === 0 
                            ? 'ring-blue-500 shadow-blue-100/50' 
                            : animationActive && currentAnimatedIndex === 0 && !activeIndex
                              ? 'ring-blue-400 shadow-blue-100/40'
                              : 'ring-gray-200/50 hover:ring-blue-200/50'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Lightbulb className={`w-8 h-8 ${
                          activeIndex === 0 ? 'text-blue-500' : 
                          animationActive && currentAnimatedIndex === 0 && !activeIndex ? 'text-blue-400' : 
                          'text-blue-300'
                        }`} />
                      </motion.div>
                    </div>
                    <div className={`absolute left-[80%] top-[80%] service-icon z-10 
                      ${activeIndex === 1 ? 'active' : 
                       animationActive && currentAnimatedIndex === 1 && !activeIndex ? 'featured' : ''}`}>
                      <motion.div 
                        onClick={() => handleTabClick(1)}
                        className={`p-6 rounded-2xl bg-white shadow-lg ring-1 cursor-pointer transition-all duration-700
                          ${activeIndex === 1 
                            ? 'ring-purple-500 shadow-purple-100/50' 
                            : animationActive && currentAnimatedIndex === 1 && !activeIndex
                              ? 'ring-purple-400 shadow-purple-100/40'
                              : 'ring-gray-200/50 hover:ring-purple-200/50'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Palette className={`w-8 h-8 ${
                          activeIndex === 1 ? 'text-purple-500' : 
                          animationActive && currentAnimatedIndex === 1 && !activeIndex ? 'text-purple-400' : 
                          'text-purple-300'
                        }`} />
                      </motion.div>
                    </div>
                    <div className={`absolute left-[20%] top-[80%] service-icon z-10 
                      ${activeIndex === 2 ? 'active' : 
                       animationActive && currentAnimatedIndex === 2 && !activeIndex ? 'featured' : ''}`}>
                      <motion.div 
                        onClick={() => handleTabClick(2)}
                        className={`p-6 rounded-2xl bg-white shadow-lg ring-1 cursor-pointer transition-all duration-700
                          ${activeIndex === 2 
                            ? 'ring-emerald-500 shadow-emerald-100/50' 
                            : animationActive && currentAnimatedIndex === 2 && !activeIndex
                              ? 'ring-emerald-400 shadow-emerald-100/40'
                              : 'ring-gray-200/50 hover:ring-emerald-200/50'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Code2 className={`w-8 h-8 ${
                          activeIndex === 2 ? 'text-emerald-500' : 
                          animationActive && currentAnimatedIndex === 2 && !activeIndex ? 'text-emerald-400' : 
                          'text-emerald-300'
                        }`} />
                      </motion.div>
                    </div>

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <motion.path
                        d={`M50,20 L${activeIndex === 0 ? '50,20' : '50,20'}`}
                        stroke="url(#triangleGradient)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: activeIndex === 0 ? 1 : 0,
                          opacity: activeIndex === 0 ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.path
                        d={`M80,80 L${activeIndex === 1 ? '80,80' : '80,80'}`}
                        stroke="url(#triangleGradient)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: activeIndex === 1 ? 1 : 0,
                          opacity: activeIndex === 1 ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.path
                        d={`M20,80 L${activeIndex === 2 ? '20,80' : '20,80'}`}
                        stroke="url(#triangleGradient)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: activeIndex === 2 ? 1 : 0,
                          opacity: activeIndex === 2 ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </svg>
                  </div>
                </div>
                </div>
              </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="/work"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-mono text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors duration-300"
          >
            See Work
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 