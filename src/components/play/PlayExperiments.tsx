'use client';

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconBrandYoutubeFilled, IconBrush } from "@tabler/icons-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CodeCompare } from "@/components/ui/code-compare";

const PlayCodeCompare = dynamic(() => import('./PlayCodeCompare').then(mod => ({ default: mod.PlayCodeCompare })), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center">
      <div className="text-ethereal-dark/60 font-mono text-sm">Loading code comparison...</div>
    </div>
  )
});

export function PlayExperiments() {
  const features = [
    {
      title: "AI & Design Systems",
      description:
        "Exploring the intersection of artificial intelligence and design systems. Creating tools and workflows that blend human creativity with machine intelligence.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-3 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Generative AI Art",
      description:
        "Exploring the frontiers of visual creation with Midjourney, DALL-E, and Sora. Transforming concepts into striking images and videos through AI-powered tools.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
    },
    {
      title: "Design Templates",
      description:
        "Crafting reusable design patterns and templates that help teams build better products faster. From components to full design systems.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
    },
    {
      title: "Creative AI",
      description:
        "Generating and exploring new forms of visual expression using AI. Pushing the boundaries of what's possible with machine learning in creative work.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];
  return (
    <>
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
              <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border border-ethereal-dark/10 rounded-3xl dark:border-neutral-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm overflow-hidden">
                {features.map((feature) => (
                  <FeatureCard key={feature.title} className={cn(
                    feature.className,
                    "border-ethereal-dark/10 dark:border-neutral-800"
                  )}>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                    <div className="h-full w-full">{feature.skeleton}</div>
                  </FeatureCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <PlayCodeCompare />
    </>
  );
} 

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
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
    <div className="relative">
      <div className="h-[300px] md:h-[400px] relative">
        <div className="absolute inset-0 mx-2 bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="relative w-full h-full bg-white">
            <Image
              src="/images/ai-x-design.png"
              alt="AI and Design Systems"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={100}
            />
          </div>
        </div>
        <div className="absolute top-0 z-40 inset-x-0 h-40 bg-gradient-to-b from-white via-transparent to-transparent" />
      </div>
      
      {/* CTA Section Below Image */}
      <Link href="/play/paint" className="group block">
        <div className="mt-6 mx-2 p-4 rounded-xl bg-gradient-to-r from-blue-500/[0.05] to-emerald-500/[0.05] border border-ethereal-dark/5 group-hover:border-ethereal-dark/10 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconBrush className="w-5 h-5 text-blue-500/70" />
              <span className="text-ethereal-dark/90 font-medium">Try the Digital Canvas</span>
            </div>
            <span className="flex items-center gap-2 text-blue-500 font-medium">
              Open Paint
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                className="inline-block"
              >
                →
              </motion.span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <Link
      href="/play/paint"
      className="relative flex gap-10 h-full group/image"
    >
      <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <IconBrush className="h-20 w-20 text-ethereal-dark/40" />
          </div>
          <div className="h-full w-full aspect-square rounded-sm bg-gradient-to-br from-blue-500/5 to-emerald-500/5 backdrop-blur-sm border border-ethereal-dark/10 group-hover/image:border-ethereal-dark/20 transition-all duration-200" />
        </div>
      </div>
    </Link>
  );
};

const SkeletonTwo = () => {
  const images = [
    "/images/gen-ai-art/zen-space.png",
    "/images/gen-ai-art/watch-shoot.png",
    "/images/gen-ai-art/tennis-shoot.png",
    "/images/gen-ai-art/pop-model.png",
    "/images/gen-ai-art/perfume-store.png",
    "/images/gen-ai-art/desk-top.png",
    "/images/gen-ai-art/dance-scene.png",
    "/images/gen-ai-art/archi-render.png"
  ];

  const getRandomRotation = (idx: number, isFirstRow: boolean) => {
    if (isFirstRow) {
      // Alternate between positive and negative tilts for top row
      const baseRotation = idx % 2 === 0 ? 12 : -12;
      return baseRotation + (Math.random() * 6 - 3); // Add small random variation
    } else {
      // Opposite pattern for bottom row
      const baseRotation = idx % 2 === 0 ? -10 : 10;
      return baseRotation + (Math.random() * 6 - 3); // Add small random variation
    }
  };

  const imageVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      zIndex: 1,
    },
    whileHover: {
      scale: 1.1,
      rotate: 0, // Straighten out on hover
      zIndex: 100,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };

  // Prevent context menu and dragging
  const preventActions = (e: React.MouseEvent | React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div 
      className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden border-none"
      onContextMenu={preventActions}
    >
      {/* First Row - Shifted left with extra image on right */}
      <div className="flex flex-row -ml-20">
        {[...images.slice(0, 3), images[7]].map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-first" + idx}
            initial={{
              rotate: getRandomRotation(idx, true),
              scale: 1,
              zIndex: idx === 3 ? 1 : 'auto'
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            style={{
              translateY: idx * 10,
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none'
            }}
            className={cn(
              "rounded-xl -mr-4 mt-4 p-1 bg-white/50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700 flex-shrink-0 overflow-hidden",
              idx === 3 && "ml-4"
            )}
            onContextMenu={preventActions}
            onDragStart={preventActions}
          >
            <Image
              src={image}
              alt="AI generated art"
              width={500}
              height={500}
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0 pointer-events-none"
              draggable={false}
              onContextMenu={preventActions}
            />
          </motion.div>
        ))}
      </div>

      {/* Second Row - Shifted right with extra image on left */}
      <div className="flex flex-row -ml-12">
        {[images[4], ...images.slice(5, 7), images[3]].map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-second" + idx}
            initial={{
              rotate: getRandomRotation(idx, false),
              scale: 1,
              zIndex: idx === 0 ? 1 : 'auto'
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            style={{
              translateY: -idx * 5,
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none'
            }}
            className={cn(
              "rounded-xl -mr-4 mt-4 p-1 bg-white/50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700 flex-shrink-0 overflow-hidden",
              idx === 0 && "-ml-8"
            )}
            onContextMenu={preventActions}
            onDragStart={preventActions}
          >
            <Image
              src={image}
              alt="AI generated art"
              width={500}
              height={500}
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0 pointer-events-none"
              draggable={false}
              onContextMenu={preventActions}
            />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60 flex items-center justify-center relative bg-transparent dark:bg-transparent mt-10">
      <div className="relative w-full max-w-[300px] aspect-square rounded-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop"
          alt="Digital Globe"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 mix-blend-overlay" />
      </div>
    </div>
  );
};

const currentExplorations = [
  {
    title: "Digital Canvas",
    description: "A modern painting tool with intuitive controls and a clean interface.",
    link: "/play/paint",
    image: "/images/paint_image.jpg",
    category: "Interactive"
  },
  // ... existing items ...
];
