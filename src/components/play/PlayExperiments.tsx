'use client';

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconBrush, IconArrowRight, IconFolderPlus, IconX } from "@tabler/icons-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { LinkPreview } from "@/components/ui/link-preview";

const PlayCodeCompare = dynamic(() => import('./PlayCodeCompare').then(mod => ({ default: mod.PlayCodeCompare })), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center">
      <div className="text-ethereal-dark/60 font-mono text-sm">Loading code comparison...</div>
    </div>
  )
});

interface FeatureCardProps {
  title: string;
  description: string;
  featuredLink: string;
  allLink: string;
  thumbnails?: string[];
  children: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, featuredLink, allLink, thumbnails = [], children }) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-ethereal-glass-border overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl md:leading-snug text-ethereal-dark font-serif mb-3">
            {title}
          </h3>
          <p className="text-sm md:text-base text-ethereal-dark/70 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Content Area */}
        <div className="relative mb-6 bg-gradient-to-br from-blue-500/[0.02] to-emerald-500/[0.02] rounded-xl overflow-hidden">
          {children}
        </div>

        {/* Enhanced CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <LinkPreview
            url={featuredLink}
            title={title === "Better LLM Prompting" ? "The Art of the Prompt" : 
                  title === "Micro Projects & MVPs" ? "Digital Paint: Interactive Canvas" :
                  title === "Generative AI Art" ? "AI Art Gallery: Latest Works" :
                  title === "One Day Brand Builds" ? "Featured Brand: Ethereal" :
                  `Featured ${title}`}
            description={title === "Better LLM Prompting" 
              ? "A step-by-step guide to crafting effective prompts and unlocking the full potential of large language models."
              : title === "Micro Projects & MVPs"
              ? "Experiment with our interactive digital canvas. Create, blend, and explore with intuitive drawing tools."
              : title === "Generative AI Art"
              ? "Explore our latest AI-generated artworks, from abstract concepts to photorealistic scenes."
              : title === "One Day Brand Builds"
              ? "See how we transformed Ethereal's vision into a complete brand identity in 24 hours."
              : "View featured projects and experiments in this category."}
            thumbnailUrl={thumbnails?.[0]}
          >
            <div className="group relative px-6 py-4 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 transition-all duration-300 rounded-xl overflow-hidden shadow-lg text-center cursor-pointer">
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
              <span className="relative z-10 font-mono text-base text-[#FFFFF0] flex items-center justify-center gap-2">
                <span>
                  {title === "Better LLM Prompting" ? "Get the Book" :
                   title === "Micro Projects & MVPs" ? "Try Digital Paint" :
                   title === "Generative AI Art" ? "View Gallery" :
                   title === "One Day Brand Builds" ? "See Case Study" :
                   "View Featured"}
                </span>
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </LinkPreview>
          
          <LinkPreview
            url="#coming-soon"
            disabled={true}
            title={title === "Better LLM Prompting" ? "Prompt Engineering Resources" :
                  title === "Micro Projects & MVPs" ? "Explore All Experiments" :
                  title === "Generative AI Art" ? "Digital Art Museum" :
                  title === "One Day Brand Builds" ? "Brand Build Process" :
                  `All ${title} Projects`}
            description={title === "Better LLM Prompting"
              ? "Explore additional resources, examples, and advanced techniques for prompt engineering."
              : title === "Micro Projects & MVPs"
              ? "Discover our collection of experimental tools, prototypes, and interactive demos."
              : title === "Generative AI Art"
              ? "Experience our full collection across different AI tools, styles, and mediums."
              : title === "One Day Brand Builds"
              ? "Learn about our rapid brand development process and explore other brand transformations."
              : "Explore the complete collection of projects in this category."}
            thumbnailUrl="/images/coming-soon.jpg"
          >
            <div className="group relative px-6 py-4 bg-white hover:bg-white/90 transition-all duration-300 rounded-xl overflow-hidden shadow-sm border border-ethereal-dark/10 text-center cursor-not-allowed">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] to-emerald-500/[0.02] opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 font-mono text-base text-ethereal-dark flex items-center justify-center gap-2">
                <span>
                  {title === "Better LLM Prompting" ? "Explore Resources" :
                   title === "Micro Projects & MVPs" ? "All Experiments" :
                   title === "Generative AI Art" ? "Visit Museum" :
                   title === "One Day Brand Builds" ? "See Process" :
                   "View All"}
                </span>
                <IconFolderPlus className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </LinkPreview>
        </div>
      </div>
    </div>
  );
};

export function PlayExperiments() {
  const features = [
    {
      title: "Micro Projects & MVPs",
      description: "Quick, impactful experiments that push the boundaries of what's possible. Building small but meaningful tools that solve real problems.",
      featuredLink: "/play/paint",
      allLink: "/play/micro-projects",
      thumbnails: [
        "/images/micro-projects/project1.png",
        "/images/micro-projects/project2.png",
        "/images/micro-projects/project3.png",
        "/images/micro-projects/project4.png",
        // Add more thumbnails
      ],
      content: (
        <div className="relative h-[300px] md:h-[400px]">
          <div className="absolute inset-0 mx-2">
            <div className="relative w-full h-full bg-white shadow-2xl rounded-xl overflow-hidden">
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
        </div>
      )
    },
    {
      title: "Generative AI Art",
      description: "Exploring the frontiers of visual creation with Midjourney, DALL-E, and Sora. Transforming concepts into striking images and videos through AI-powered tools.",
      featuredLink: "/play/gallery",
      allLink: "/play/ai-art/gallery",
      thumbnails: [
        "/images/gen-ai-art/zen-space.png",
        "/images/gen-ai-art/watch-shoot.png",
        "/images/gen-ai-art/tennis-shoot.png",
        "/images/gen-ai-art/pop-model.png",
        "/images/gen-ai-art/perfume-store.png",
        "/images/gen-ai-art/desk-top.png",
        "/images/gen-ai-art/dance-scene.png",
        "/images/gen-ai-art/archi-render.png"
      ],
      content: (
        <div id="gallery" className="relative h-[300px] md:h-[400px] overflow-hidden">
          <div className="relative w-full h-full p-4">
            {/* First Row */}
            <div className="flex flex-row -ml-4 sm:-ml-20">
              {[
                "/images/gen-ai-art/zen-space.png",
                "/images/gen-ai-art/watch-shoot.png",
                "/images/gen-ai-art/tennis-shoot.png",
                "/images/gen-ai-art/pop-model.png"
              ].map((src, idx) => (
                <motion.div
                  key={`first-${src}`}
                  className="rounded-xl -mr-1 sm:-mr-4 mt-4 p-1 bg-white/50 border border-neutral-100 flex-shrink-0 overflow-hidden"
                  initial={{
                    rotate: idx % 2 === 0 ? 12 : -12,
                    translateY: idx * 10,
                    scale: 1,
                    zIndex: idx === 3 ? 1 : 'auto'
                  }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.1,
                    zIndex: 10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  style={{
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none'
                  }}
                >
                  <Image
                    src={src}
                    alt="AI generated art"
                    width={100}
                    height={100}
                    sizes="(max-width: 640px) 100px, 160px"
                    className="rounded-lg object-cover pointer-events-none w-[100px] h-[100px] sm:w-[160px] sm:h-[160px]"
                    draggable={false}
                  />
                </motion.div>
              ))}
            </div>

            {/* Second Row */}
            <div className="flex flex-row -ml-2 sm:-ml-12 mt-4">
              {[
                "/images/gen-ai-art/perfume-store.png",
                "/images/gen-ai-art/desk-top.png",
                "/images/gen-ai-art/dance-scene.png",
                "/images/gen-ai-art/archi-render.png"
              ].map((src, idx) => (
                <motion.div
                  key={`second-${src}`}
                  className="rounded-xl -mr-1 sm:-mr-4 mt-4 p-1 bg-white/50 border border-neutral-100 flex-shrink-0 overflow-hidden"
                  initial={{
                    rotate: idx % 2 === 0 ? -10 : 10,
                    translateY: -idx * 5,
                    scale: 1,
                    zIndex: idx === 0 ? 1 : 'auto'
                  }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.1,
                    zIndex: 10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  style={{
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none'
                  }}
                >
                  <Image
                    src={src}
                    alt="AI generated art"
                    width={100}
                    height={100}
                    sizes="(max-width: 640px) 100px, 160px"
                    className="rounded-lg object-cover pointer-events-none w-[100px] h-[100px] sm:w-[160px] sm:h-[160px]"
                    draggable={false}
                  />
                </motion.div>
              ))}
            </div>

            {/* Gradient overlays */}
            <div className="absolute left-0 z-[100] inset-y-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent h-full pointer-events-none" />
            <div className="absolute right-0 z-[100] inset-y-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent h-full pointer-events-none" />
          </div>
        </div>
      )
    },
    {
      title: "One Day Brand Builds",
      description: "Rapid brand development experiments. Creating complete brand identities, from logo to design system, in just 24 hours.",
      featuredLink: "/play/brand-builds/featured",
      allLink: "/play/brand-builds",
      content: (
        <div className="relative h-[300px] md:h-[400px] flex items-center justify-center bg-gradient-to-br from-blue-500/[0.02] to-emerald-500/[0.02] overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center transform hover:scale-[1.02] transition-all duration-700">
            {/* Glow Platform Effect */}
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[90%] h-[2px] bg-blue-400/50 blur-sm transition-all duration-500 group-hover:w-[95%] group-hover:blur-md" />
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-blue-300 shadow-glow transition-all duration-500 group-hover:w-[85%]" />
            
            {/* Image Container */}
            <div className="relative w-full h-full transform perspective-1000 transition-all duration-700 hover:scale-[1.4] hover:rotate-[15deg] hover:rotate-y-[15deg] hover:translate-y-4">
              <div className="w-full h-full overflow-hidden rounded-xl">
                <Image
                  src="/images/branding-sprint.jpg"
                  alt="Brand Sprint Process"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover drop-shadow-[0_20px_50px_rgba(0,170,255,0.25)] transition-all duration-700 hover:drop-shadow-[0_40px_80px_rgba(0,170,255,0.4)]"
                  priority
                  quality={100}
                />
                
                {/* Premium Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-emerald-500/10 mix-blend-overlay transition-opacity duration-700 hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-blue-500/10 mix-blend-overlay transition-opacity duration-700 hover:opacity-90" />
              </div>
            </div>

            {/* Background Circuit Pattern */}
            <div className="absolute inset-[-100%] bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
          </div>
        </div>
      )
    },
    {
      title: "Better LLM Prompting",
      description: "Experimenting with advanced prompt engineering techniques. Developing frameworks for more effective AI interactions and automation workflows.",
      featuredLink: "/play/prompting/featured",
      allLink: "/play/prompting",
      thumbnails: [
        "/images/artoftheprompt_book.png",
        "/images/artoftheprompt_book.png"
      ],
      content: (
        <div className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center bg-gradient-to-br from-blue-500/[0.02] to-emerald-500/[0.02]">
          <div className="relative w-full h-full flex items-center justify-center transform hover:scale-[1.05] hover:-translate-y-2 transition-all duration-500">
            {/* Glow Platform Effect */}
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[90%] h-[2px] bg-blue-400/50 blur-sm transition-all duration-500 group-hover:w-[95%] group-hover:blur-md" />
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-blue-300 shadow-glow transition-all duration-500 group-hover:w-[85%]" />
            
            {/* Book with Enhanced Shadow */}
            <div className="relative w-full max-w-[600px] transform rotate-y-[-5deg] perspective-1000 transition-all duration-500 hover:rotate-y-[-8deg]">
              <Image
                src="/images/artoftheprompt_book.png"
                alt="The Art of the Prompt Book"
                width={800}
                height={1000}
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,170,255,0.25)] transition-all duration-500 hover:drop-shadow-[0_30px_60px_rgba(0,170,255,0.35)]"
                priority
                quality={100}
              />
              
              {/* Premium Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-emerald-500/10 mix-blend-overlay transition-opacity duration-500 hover:opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-blue-500/10 mix-blend-overlay transition-opacity duration-500 hover:opacity-75" />
            </div>

            {/* Background Circuit Pattern */}
            <div className="absolute inset-[-100%] bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
          </div>
        </div>
      )
    }
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    featuredLink={feature.featuredLink}
                    allLink={feature.allLink}
                    thumbnails={feature.thumbnails}
                  >
                    {feature.content}
                  </FeatureCard>
                </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <PlayCodeCompare />
    </>
  );
} 
