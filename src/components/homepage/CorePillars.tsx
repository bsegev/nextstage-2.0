'use client';

import { motion } from 'framer-motion';
import { 
  LightBulbIcon,
  PaintBrushIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const pillars = [
  {
    icon: LightBulbIcon,
    title: "Strategy",
    description: "Positioning, business alignment, and execution plans that make sense in the real world.",
    colorClass: "border-blue-200/40 hover:border-blue-400/60 text-blue-500/80",
    deliverables: [
      "Market Analysis",
      "Positioning Strategy",
      "Growth Roadmap",
      "Revenue Model",
      "KPI Framework",
      "Competitive Analysis",
      "Target Audience",
      "Value Proposition"
    ]
  },
  {
    icon: PaintBrushIcon,
    title: "Design",
    description: "Brand identity, websites, and sales materials that don't just look good—they perform.",
    colorClass: "border-purple-200/40 hover:border-purple-400/60 text-purple-500/80",
    deliverables: [
      "Brand Identity",
      "Website Design",
      "Sales Materials",
      "UI/UX Design",
      "Style Guide",
      "Design System",
      "Marketing Assets",
      "Brand Guidelines"
    ]
  },
  {
    icon: CommandLineIcon,
    title: "Technology",
    description: "AI-driven efficiency, automation, and workflows that support growth without friction.",
    colorClass: "border-emerald-200/40 hover:border-emerald-400/60 text-emerald-500/80",
    deliverables: [
      "AI Integration",
      "Automation",
      "Tech Stack",
      "Workflows",
      "Analytics",
      "API Integration",
      "Performance",
      "Security"
    ]
  }
];

// Helper function to scroll to service overview
const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

export function CorePillars() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden font-sans bg-white">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(147,51,234,0.03),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12 sm:mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-ethereal-dark/20" 
              />
              <span className="font-mono text-sm text-ethereal-dark/60 tracking-wider uppercase">
                Three Ways I Can Help
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-ethereal-dark/20" 
              />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ethereal-dark mb-4 sm:mb-6">
              Three Core Pillars of
              <motion.span
                className="block mt-2"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="aurora-text-gradient-light">NextStage</span>
              </motion.span>
            </h2>

            <p className="text-base sm:text-lg text-ethereal-dark/70 max-w-2xl mx-auto">
              Every great business needs a balance of strategy, design, and technology. I ensure these elements work together to help you launch, scale, pivot, and optimize efficiently.
            </p>
          </motion.div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-16">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[400px] perspective-1000"
                onClick={() => toggleCard(i)}
              >
                <motion.div
                  className="relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer"
                  style={{
                    transform: flippedCards.includes(i) ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of card */}
                  <div className={`absolute inset-0 backface-hidden ${pillar.colorClass} transition-all duration-500 bg-white/50 p-6 sm:p-8 rounded-xl border-2`}>
                    {/* Icon */}
                    <div className="w-12 h-12 mb-6">
                      <pillar.icon className="w-full h-full stroke-[1.5]" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-serif mb-3 text-ethereal-dark">
                      {pillar.title}
                    </h3>
                    <p className="text-ethereal-dark/70 mb-8">
                      {pillar.description}
                    </p>

                    {/* Click to flip CTA */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className={`
                        flex items-center justify-between
                        py-2 px-3 rounded-lg
                        ${pillar.colorClass.replace('border-', 'bg-').replace('/40', '/5')}
                        ${pillar.colorClass.replace('border-', 'text-').replace('/40', '/60')}
                        font-mono text-xs tracking-wide
                      `}>
                        <span>Click to see deliverables</span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 7l4-4m0 0l4 4m-4-4v18" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className={`absolute inset-0 backface-hidden [transform:rotateY(180deg)] ${pillar.colorClass} transition-all duration-500 bg-white/50 p-6 sm:p-8 rounded-xl border-2 overflow-hidden`}>
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${pillar.colorClass.replace('border-', 'from-').replace('hover:border-', 'to-').replace('/40', '/5').replace('/60', '/10')} opacity-50`} />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-10 h-px ${pillar.colorClass.replace('border-', 'bg-').replace('/40', '/30')}`} />
                        <h3 className={`font-mono text-sm tracking-wider uppercase ${pillar.colorClass.replace('border-', 'text-').replace('/40', '/70')}`}>
                          Expertise
                        </h3>
                      </div>

                      <h4 className="text-2xl font-serif text-ethereal-dark mb-6">
                        {pillar.title} <span className="text-ethereal-dark/50">Deliverables</span>
                      </h4>

                      {/* Modern tag design */}
                      <div className="grid grid-cols-2 gap-2">
                        {pillar.deliverables.map((deliverable, index) => (
                          <motion.div
                            key={deliverable}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                              relative overflow-hidden
                              px-3 py-2 rounded-lg
                              ${pillar.colorClass.replace('border-', 'bg-').replace('/40', '/5')}
                              backdrop-blur-sm
                              border border-white/20
                              group
                              hover:scale-[1.02] hover:-translate-y-0.5
                              transition-all duration-300
                            `}
                          >
                            {/* Gradient overlay */}
                            <div className={`
                              absolute inset-0 opacity-0 group-hover:opacity-100
                              transition-opacity duration-300
                              bg-gradient-to-r
                              ${pillar.colorClass.replace('border-', 'from-').replace('/40', '/10')}
                              to-transparent
                            `} />
                            
                            {/* Tag content */}
                            <div className="relative flex items-center gap-2">
                              <div className={`
                                flex-shrink-0 w-6 h-6 rounded-full
                                ${pillar.colorClass.replace('border-', 'bg-').replace('/40', '/10')}
                                ${pillar.colorClass.replace('border-', 'text-').replace('/40', '/70')}
                                flex items-center justify-center
                                group-hover:scale-110 transition-transform duration-300
                              `}>
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className={`
                                text-sm font-medium
                                ${pillar.colorClass.replace('border-', 'text-').replace('/40', '/80')}
                              `}>
                                {deliverable}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.button
              onClick={() => scrollToElement('service-overview')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 transition-all duration-300 rounded-xl overflow-hidden shadow-lg"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#34D399] opacity-10"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              />
              <span className="relative z-10 font-mono text-lg text-[#FFFFF0] flex items-center gap-2">
                Find the Right Service for You
                <svg 
                  className="w-4 h-4 transition-transform group-hover:translate-y-0.5" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 