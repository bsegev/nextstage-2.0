"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const processSteps = [
  {
    number: "01",
    title: "Listen & Understand",
    theme: "Discovery",
    description: "Every meaningful partnership starts with deep listening. We'll explore your vision, values, and the change you want to create in the world.",
    color: "from-blue-500 to-violet-500",
    details: [
      {
        heading: "Strategic Discovery",
        text: "Understanding your journey, goals, and vision"
      },
      {
        heading: "Market Analysis",
        text: "Identifying opportunities and positioning"
      },
      {
        heading: "Audience Insights",
        text: "Deep understanding of who we're reaching"
      }
    ]
  },
  {
    number: "02",
    title: "Shape the Strategy",
    theme: "Strategy",
    description: "Together, we'll craft a strategic foundation that authentically captures your vision and resonates with your audience.",
    color: "from-violet-500 to-fuchsia-500",
    details: [
      {
        heading: "Brand Architecture",
        text: "Building your strategic foundation"
      },
      {
        heading: "Positioning Strategy",
        text: "Defining your unique market position"
      },
      {
        heading: "Growth Roadmap",
        text: "Planning your path to success"
      }
    ]
  },
  {
    number: "03",
    title: "Design & Develop",
    theme: "Creation",
    description: "We'll bring your strategy to life through thoughtful design that reflects your values and connects with your audience.",
    color: "from-fuchsia-500 to-rose-500",
    details: [
      {
        heading: "Brand Identity",
        text: "Crafting your visual language"
      },
      {
        heading: "Digital Experience",
        text: "Building engaging touchpoints"
      },
      {
        heading: "Content Strategy",
        text: "Telling your story effectively"
      }
    ]
  },
  {
    number: "04",
    title: "Launch & Evolve",
    theme: "Growth",
    description: "Your brand is a living thing. We'll help you launch with impact and evolve based on real-world feedback.",
    color: "from-rose-500 to-orange-500",
    details: [
      {
        heading: "Launch Strategy",
        text: "Making a memorable entrance"
      },
      {
        heading: "Performance Analysis",
        text: "Measuring what matters"
      },
      {
        heading: "Continuous Evolution",
        text: "Growing with purpose"
      }
    ]
  }
];

export function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-24 lg:py-32 bg-surface-950"
    >
      {/* Strategic Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-950/95 to-surface-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary-500/30" />
            <span className="font-mono text-sm tracking-wider text-primary-500/80">
              OUR PROCESS
            </span>
            <div className="h-px w-8 bg-primary-500/30" />
          </div>

          <h2 className="font-serif text-4xl lg:text-6xl text-surface-50 mb-6">
            Strategic Process,
            <span className="block text-primary-500 mt-2">Meaningful Results</span>
          </h2>

          <p className="text-lg text-surface-300">
            A proven approach that transforms vision into reality, 
            combining strategic thinking with creative execution.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Progress Line */}
          <motion.div 
            className="absolute left-12 lg:left-1/2 top-0 bottom-0 w-px bg-primary-500/10"
            style={{
              scaleY: useTransform(scrollYProgress, [0.1, 0.9], [0, 1]),
              originY: 0
            }}
          />

          {/* Steps */}
          <div className="relative space-y-40">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={index}
                isActive={activeStep === index}
                onHover={() => setActiveStep(index)}
                onLeave={() => setActiveStep(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProcessStepProps {
  step: typeof processSteps[0];
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ProcessStep({ step, index, isActive, onHover, onLeave }: ProcessStepProps) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`
        relative flex flex-col lg:flex-row items-start gap-8 lg:gap-16
        ${index % 2 === 0 ? 'lg:pr-[50%]' : 'lg:pl-[50%] lg:flex-row-reverse'}
      `}
    >
      {/* Step Number & Theme */}
      <div className="relative z-20">
        <motion.div
          className="relative w-24 h-24 rounded-full bg-surface-900 
                    border border-primary-500/20 backdrop-blur-sm
                    flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <div 
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: `linear-gradient(135deg, ${step.color})`
            }}
          />
          <span className="font-serif text-4xl text-primary-500">
            {step.number}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute -right-24 top-1/2 -translate-y-1/2
                    px-4 py-1.5 rounded-full border border-primary-500/20"
        >
          <span className="font-mono text-sm text-primary-500/80">
            {step.theme}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="flex-1"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <h3 className="font-serif text-3xl lg:text-4xl text-surface-50 mb-4">
            {step.title}
          </h3>

          <p className="text-lg text-surface-300 mb-8 lg:pr-8">
            {step.description}
          </p>

          {/* Details Grid */}
          <div className="grid gap-4">
            {step.details.map((detail, i) => (
              <motion.div
                key={detail.heading}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group relative p-4 rounded-lg
                         hover:bg-surface-900/50 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500/50 mt-2.5" />
                  <div>
                    <h4 className="font-medium text-surface-50 mb-1">
                      {detail.heading}
                    </h4>
                    <p className="text-surface-300">
                      {detail.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connection Line */}
          <div 
            className={`
              hidden lg:block absolute top-12 h-px bg-primary-500/20
              ${index % 2 === 0 ? '-right-16 w-16' : '-left-16 w-16'}
            `}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 