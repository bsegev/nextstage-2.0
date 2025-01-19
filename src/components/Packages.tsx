"use client";

import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';

const journeys = [
  {
    name: 'Vision Clarity',
    narrative: "When your idea needs form. Together, we'll uncover the strategic and visual foundations that make your vision real and resonant.",
    duration: 'Two weeks of focused collaboration',
    resonance: 'Founders with clarity seeking impact',
    essence: [
      'Uncover your market opportunity',
      'Articulate your core truth',
      'Design your visual voice',
      'Create foundational touchpoints',
      'Map your growth trajectory'
    ]
  },
  {
    name: 'Strategic Design',
    narrative: "When your story needs depth. We'll weave strategy and design to create a presence that captures attention and drives engagement.",
    duration: 'Three weeks of strategic partnership',
    resonance: 'Growing ventures ready for expansion',
    essence: [
      'Refine market positioning',
      'Craft compelling narratives',
      'Build design frameworks',
      'Create key presentations',
      'Define growth strategies'
    ]
  },
  {
    name: 'Market Transformation',
    narrative: "When your moment demands excellence. We'll create the comprehensive strategy and design system that elevates your market presence.",
    duration: 'Six weeks of deep collaboration',
    resonance: 'Ventures pursuing significant growth',
    featured: true,
    essence: [
      'Define market leadership',
      'Create brand ecosystems',
      'Design scalable systems',
      'Craft premium materials',
      'Guide team alignment',
      'Enable lasting impact',
      'Shape future narratives'
    ]
  },
  {
    name: 'Vision Partnership',
    narrative: "When your evolution never stops. A dedicated partnership that grows with your ambitions, ensuring excellence at every step.",
    duration: 'Flexible engagement',
    resonance: 'Visionary leaders and teams',
    essence: [
      'Guide strategic evolution',
      'Lead design excellence',
      'Drive market innovation',
      'Enable team mastery',
      'Create lasting value',
      'Shape future possibilities'
    ]
  }
];

export function Packages() {
  return (
    <section className="relative py-32 bg-surface-100 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.15]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #526D82 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="relative max-w-[90vw] xl:max-w-[95vw] mx-auto px-4">
        <div className="max-w-3xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-primary-900 mb-6"
          >
            Choose your path to
            <span className="block text-primary-600 mt-2">
              lasting impact
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-secondary-600"
          >
            Every transformation begins with a conversation. Let's explore how we can 
            bring your vision to life with strategy and design that resonates.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {journeys.map((journey, index) => (
            <motion.div
              key={journey.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative ${journey.featured ? 'lg:-mt-4 lg:-mb-4' : ''}`}
            >
              <div className={`h-full bg-white rounded-xl p-7 lg:p-8 shadow-lg relative 
                    transition-all duration-300 
                    ${journey.featured ? 'ring-1 ring-primary-500/20' : ''}`}>
                {journey.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 
                       bg-primary-500 text-white text-xs font-medium rounded-full 
                       shadow-lg shadow-primary-500/20">
                    Transformative Impact
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-serif text-xl text-primary-900 mb-3">{journey.name}</h3>
                  <p className="text-secondary-600 text-sm mb-6">{journey.narrative}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="font-mono text-xs text-primary-600 mb-1">ENGAGEMENT</div>
                      <div className="text-primary-900 text-sm">{journey.duration}</div>
                    </div>
                    <div>
                      <div className="font-mono text-xs text-primary-600 mb-1">RESONATES WITH</div>
                      <div className="text-primary-900 text-sm">{journey.resonance}</div>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {journey.essence.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-50 
                                    flex items-center justify-center mt-0.5">
                        <SparklesIcon className="w-2.5 h-2.5 text-primary-600" />
                      </div>
                      <span className="text-secondary-600 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-lg font-medium text-sm relative overflow-hidden group
                   ${journey.featured 
                     ? 'bg-primary-600 text-white hover:bg-primary-700' 
                     : 'bg-primary-50 text-primary-600 hover:bg-primary-100'} 
                   transition-colors`}
                >
                  <span className="relative z-10">Start the Conversation</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-700 bg-gradient-to-r 
                       from-transparent via-white/10 to-transparent 
                       -translate-x-full group-hover:translate-x-full 
                       transform transition-transform duration-1000" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 