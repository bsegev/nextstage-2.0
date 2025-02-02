'use client';

import { motion } from 'framer-motion';
import { EyeIcon, PuzzlePieceIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export function AboutIntro() {
  const cards = [
    {
      title: "Vision & Direction",
      description: "I believe in understanding the whole system before making any moves. Strategy isn't just planning—it's about creating a clear path forward that everyone can follow.",
      icon: EyeIcon,
      color: "blue",
      borderColor: "border-blue-200/30",
      hoverBorderColor: "hover:border-blue-300/40",
      iconGradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Craft & Alignment",
      description: "The magic happens at intersections. Whether it's design meeting technology or strategy meeting storytelling, I create systems that connect purposefully.",
      icon: PuzzlePieceIcon,
      color: "purple",
      borderColor: "border-purple-200/30",
      hoverBorderColor: "hover:border-purple-300/40",
      iconGradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Sustainability & Consistency",
      description: "Instead of creating dependency, I build systems you can own and operate. Your brand should work for you, not the other way around.",
      icon: ArrowPathIcon,
      color: "emerald",
      borderColor: "border-emerald-200/30",
      hoverBorderColor: "hover:border-emerald-300/40",
      iconGradient: "from-emerald-400 to-emerald-500",
    }
  ];

  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-50 via-surface-50/95 to-surface-50" />
        {/* Ambient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            {/* Personal statement */}
            <div className="space-y-6">
              <motion.p 
                className="text-2xl sm:text-3xl font-light text-ethereal-dark/90 leading-relaxed tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                My work is guided by three core principles: clear vision that drives direction, thoughtful craft that ensures alignment, and sustainable systems that maintain consistency over time.
              </motion.p>
            </div>

            {/* Approach cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className={`group relative p-6 rounded-xl backdrop-blur-[1px] border ${card.borderColor} ${card.hoverBorderColor} transition-all duration-300 bg-white/5`}
                >
                  <div className="relative space-y-4">
                    <div className={`bg-gradient-to-r ${card.iconGradient} rounded-lg p-1.5 w-fit`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-light text-ethereal-dark">
                      {card.title}
                    </h3>
                    <p className="text-ethereal-dark/70 font-light">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Personal philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative mt-8 space-y-6"
            >
              <p className="text-lg text-ethereal-dark/80 font-light leading-relaxed">
                These principles guide every decision, from high-level strategy to the smallest design detail. My unique value comes from the ability to move fluidly between strategic vision and hands-on implementation.
              </p>
              <p className="text-lg text-ethereal-dark/80 font-light leading-relaxed">
                This means faster iteration, better alignment, and solutions that continue to serve your business as it grows and evolves—all through one consistent point of contact.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 