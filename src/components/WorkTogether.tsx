'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  PresentationChartLineIcon,
  ClockIcon,
  SwatchIcon,
  PaintBrushIcon,
  EyeIcon,
  WrenchScrewdriverIcon,
  RocketLaunchIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';

const services = [
  {
    title: "Strategic Advisory",
    description: "Ensure every action today aligns with your vision for tomorrow. Perfect for founders who need clarity and direction.",
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    textGradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50/5 via-indigo-50/3 to-transparent",
    borderGradient: "from-blue-200/30 via-blue-300/20 to-indigo-200/10",
    dotColor: "bg-blue-400/70",
    graphPaper: "rgba(59, 130, 246, 0.1)",
    icon: ChartBarIcon,
    options: [
      {
        title: "Vision Alignment",
        description: "Clarify goals and define actionable next steps",
        icon: ClockIcon
      },
      {
        title: "Strategy Development",
        description: "Build your roadmap and growth framework",
        icon: PresentationChartLineIcon
      },
      {
        title: "Ongoing Advisory",
        description: "Regular guidance to keep you on track (30-90min sessions)",
        icon: ChartBarIcon
      }
    ],
    pricing: "Starting at $X per session"
  },
  {
    title: "Creative Direction",
    description: "Keep your brand consistent and compelling across every touchpoint through strategic design and messaging.",
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    textGradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50/5 via-pink-50/3 to-transparent",
    borderGradient: "from-purple-200/30 via-pink-300/20 to-purple-200/10",
    dotColor: "bg-purple-400/70",
    icon: PaintBrushIcon,
    options: [
      {
        title: "Brand Systems",
        description: "Establish your visual identity and messaging framework",
        icon: SwatchIcon
      },
      {
        title: "Design Direction",
        description: "Guide the execution of campaigns and launches",
        icon: EyeIcon
      },
      {
        title: "Design Language",
        description: "Build and maintain a cohesive brand experience",
        icon: PaintBrushIcon
      }
    ],
    pricing: "Custom packages available"
  },
  {
    title: "Tactical Execution",
    description: "Turn strategies into reality with hands-on implementation. For when you need solutions crafted and deployed.",
    color: "emerald",
    gradient: "from-emerald-400 to-emerald-500",
    textGradient: "from-emerald-400 to-emerald-500",
    bgGradient: "from-emerald-50/5 via-teal-50/3 to-transparent",
    borderGradient: "from-emerald-200/30 via-teal-300/20 to-emerald-200/10",
    dotColor: "bg-emerald-400/70",
    icon: WrenchScrewdriverIcon,
    options: [
      {
        title: "Full Implementation",
        description: "End-to-end execution of defined projects",
        icon: RocketLaunchIcon
      },
      {
        title: "System Building",
        description: "Create scalable technical foundations",
        icon: WrenchScrewdriverIcon
      },
      {
        title: "View All Services →",
        description: "Explore the complete service catalog",
        icon: ListBulletIcon
      }
    ],
    pricing: "Custom quoted based on scope"
  }
];

export function WorkTogether() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-50 via-surface-50/95 to-surface-50" />
        {/* Ambient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-40 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-32 sm:py-40">
        <div className="max-w-8xl mx-auto">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 mb-24"
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
                SERVICES
              </span>
              <motion.div 
                className="h-px w-8 bg-ethereal-dark/20"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>

            <h2 className="font-serif text-4xl lg:text-6xl text-center text-ethereal-dark">
              How We Can Work
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
                  Together
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
                  Together
                </motion.span>
                <span className="relative aurora-text-gradient-light">
                  Together
                </span>
              </motion.span>
            </h2>
            <p className="mt-6 text-center text-ethereal-dark/70 max-w-2xl mx-auto text-lg">
              Whether you need a sounding board for ideas or hands-on execution, I offer flexible ways to tap into strategic thinking and technical expertise.
            </p>
          </motion.div>

          {/* Enhanced Service Cards */}
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                {/* Refined gradient border */}
                <div 
                  className={`
                    absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100
                    transition-all duration-700 ease-out overflow-hidden
                  `}
                >
                  <div className={`
                    absolute inset-0 bg-gradient-to-r ${service.borderGradient}
                    animate-shimmer
                  `} />
                </div>
                
                <div className={`
                  relative p-8 rounded-2xl overflow-hidden 
                  backdrop-blur-[1px] transition-all duration-700
                  border border-[#ffffff15]
                  bg-white/10
                `}>
                  {/* Super subtle hover glow */}
                  <div className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    transition-opacity duration-1000 ease-out
                    bg-gradient-to-br ${service.bgGradient}
                  `} />

                  {/* Enhanced graph paper background for Strategic Advisory */}
                  {service.graphPaper && (
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-10"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, ${service.graphPaper} 1px, transparent 1px),
                          linear-gradient(to bottom, ${service.graphPaper} 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                        backgroundPosition: 'center center'
                      }}
                    />
                  )}

                  {/* Enhanced content */}
                  <div className="relative space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`bg-gradient-to-r ${service.gradient} rounded-lg p-1.5`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <motion.h3 
                          className={`text-2xl font-light bg-gradient-to-r ${service.textGradient} bg-clip-text text-transparent`}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {service.title}
                        </motion.h3>
                      </div>
                      <p className="text-ethereal-dark/70">
                        {service.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <motion.h4 
                        className={`text-sm font-medium text-${service.color}-500/80 tracking-wide uppercase`}
                        whileHover={{ letterSpacing: "0.1em" }}
                        transition={{ duration: 0.3 }}
                      >
                        Options Include:
                      </motion.h4>
                      <ul className="space-y-4">
                        {service.options.map((option, optionIndex) => (
                          <motion.li 
                            key={optionIndex} 
                            className="flex items-start gap-4 group/item"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="relative mt-1">
                              <option.icon className={`w-5 h-5 text-${service.color}-500/70`} />
                            </div>
                            <div>
                              <div className="font-medium text-ethereal-dark/80 group-hover/item:text-ethereal-dark transition-colors duration-300">
                                {option.title}
                              </div>
                              <div className="text-sm text-ethereal-dark/60 group-hover/item:text-ethereal-dark/70 transition-colors duration-300">
                                {option.description}
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <motion.div 
                      className="pt-4"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className={`text-sm font-medium bg-gradient-to-r ${service.textGradient} bg-clip-text text-transparent`}>
                        {service.pricing}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-shimmer {
    animation: shimmer 3s ease-in-out infinite;
  }
`; 