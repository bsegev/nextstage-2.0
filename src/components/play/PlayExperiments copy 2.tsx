'use client';

import React from "react";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from "next/image";
import Link from "next/link";

const currentExplorations = [
  {
    title: "AI & Design Systems",
    description: "Exploring the intersection of artificial intelligence and design systems. Creating tools and workflows that blend human creativity with machine intelligence.",
    category: "AI + Design",
    image: "/experiments/ai-design.jpg",
    tags: ["AI", "Design Systems", "Automation"],
    status: "Active Research"
  },
  {
    title: "Interactive Prototypes",
    description: "Building high-fidelity prototypes that push the boundaries of web interactions. Experimenting with new ways to create engaging digital experiences.",
    category: "Development",
    image: "/experiments/prototypes.jpg",
    tags: ["Motion", "Interaction", "Web"],
    status: "Ongoing"
  }
];

const petProjects = [
  {
    title: "Design Templates",
    description: "Crafting reusable design patterns and templates that help teams build better products faster. From components to full design systems.",
    category: "Resources",
    image: "/experiments/templates.jpg",
    tags: ["UI", "Templates", "Systems"],
    status: "In Progress"
  },
  {
    title: "Creative AI",
    description: "Generating and exploring new forms of visual expression using AI. Pushing the boundaries of what's possible with machine learning in creative work.",
    category: "AI + Art",
    image: "/experiments/ai-art.jpg",
    tags: ["AI", "Generative", "Art"],
    status: "Experimental"
  }
];

const pushingLimits = [
  {
    title: "AI-Driven Workflows",
    description: "Developing and testing new workflows that leverage AI to enhance creative and technical processes. Exploring the future of human-AI collaboration.",
    category: "Innovation",
    image: "/experiments/ai-workflows.jpg",
    tags: ["AI", "Workflow", "Future"],
    status: "Research"
  },
  {
    title: "Future Design Systems",
    description: "Reimagining design systems for the next generation of digital products. Exploring how AI, automation, and new technologies can transform our approach to design.",
    category: "Systems",
    image: "/experiments/future-systems.jpg",
    tags: ["Design Systems", "Innovation", "Future"],
    status: "Concept"
  }
];

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden group`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-xl md:text-2xl md:leading-snug text-ethereal-dark font-serif">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-sm md:text-base text-ethereal-dark/70 my-2 leading-relaxed">
      {children}
    </p>
  );
};

const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-white/50 dark:bg-neutral-900/50 shadow-2xl group h-full rounded-xl overflow-hidden">
        <div className="flex flex-1 w-full h-full flex-col space-y-2">
          <Image
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
            alt="AI & Design Systems"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-left-top rounded-sm"
          />
        </div>
      </div>
      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

const SkeletonTwo = () => {
  const images = [
    "https://images.unsplash.com/photo-1618788372246-79faff0c3742?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  ];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };

  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="flex flex-row -ml-20">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-first" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white/50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="experiment preview"
              width={500}
              height={500}
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white/50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="experiment preview"
              width={500}
              height={500}
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <Link
      href="#templates"
      className="relative flex gap-10 h-full group/image"
    >
      <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
          <motion.div
            className="absolute z-10 inset-0 m-auto w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-4xl">🎨</span>
          </motion.div>
          <Image
            src="https://images.unsplash.com/photo-1545235617-7a424c1a60cc?q=80&w=2080&auto=format&fit=crop"
            alt="Design Templates"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
          />
        </div>
      </div>
    </Link>
  );
};

const SkeletonFour = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center relative bg-transparent dark:bg-transparent">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-1 gap-4">
        <motion.div
          className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=2187&auto=format&fit=crop"
            alt="Creative AI"
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <motion.div
            className="absolute bottom-4 left-4 text-white text-sm font-mono"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            AI Art
          </motion.div>
        </motion.div>

        <motion.div
          className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1686191128892-3f829f5dba56?q=80&w=2070&auto=format&fit=crop"
            alt="Generative Art"
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <motion.div
            className="absolute bottom-4 left-4 text-white text-sm font-mono"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Generative Art
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "AI & Design Systems",
    description: "Exploring the intersection of artificial intelligence and design systems. Creating tools and workflows that blend human creativity with machine intelligence.",
    skeleton: <SkeletonOne />,
    className: "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
  },
  {
    title: "Creative AI",
    description: "Generating and exploring new forms of visual expression using AI. Pushing the boundaries of what's possible with machine learning in creative work.",
    skeleton: <SkeletonTwo />,
    className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
  },
  {
    title: "Design Templates",
    description: "Crafting reusable design patterns and templates that help teams build better products faster. From components to full design systems.",
    skeleton: <SkeletonThree />,
    className: "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
  },
  {
    title: "Interactive Prototypes",
    description: "Building high-fidelity prototypes that push the boundaries of web interactions. Experimenting with new ways to create engaging digital experiences.",
    skeleton: <SkeletonFour />,
    className: "col-span-1 lg:col-span-3 border-b lg:border-none",
  },
];

export function PlayExperiments() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-50 via-surface-50/95 to-surface-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-emerald-500/[0.02]" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mb-32"
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-ethereal-dark/20" 
              />
              <span className="font-mono text-sm text-ethereal-dark/60 tracking-wider uppercase">
                Experimental Lab
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-ethereal-dark/20" 
              />
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-ethereal-dark mb-8"
            >
              From Curiosity <br className="hidden sm:block" />
              <span className="aurora-text-gradient-light">to Creation</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="text-xl sm:text-2xl text-ethereal-dark/90 font-light leading-relaxed tracking-tight font-sans"
            >
              Pushing the limits of tech, design, and AI—driven by what's possible now.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-3xl dark:border-neutral-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
              {features.map((feature) => (
                <FeatureCard key={feature.title} className={feature.className}>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                  <div className="h-full w-full">{feature.skeleton}</div>
                </FeatureCard>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div 
            className="text-center pt-32"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-serif text-ethereal-dark mb-6">
              Curious? Let's explore together.
            </h3>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 transition-all duration-300 rounded-xl overflow-hidden shadow-lg"
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
              <span className="relative z-10 font-mono text-lg text-[#FFFFF0] flex items-center gap-3">
                <span>Start a Conversation</span>
                <motion.span 
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >→</motion.span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 