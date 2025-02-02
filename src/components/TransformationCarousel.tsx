"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const transformationStages = [
  {
    id: 1,
    title: "Strategic Vision",
    description: "Clarifying the path forward",
    image: "/images/strategic-vision.jpg",
    bgImage: "/images/strategic-vision-bg.jpg",
    category: "SIGNALS"
  },
  {
    id: 2,
    title: "Brand Architecture",
    description: "Building the foundation",
    image: "/images/brand-architecture.jpg",
    bgImage: "/images/brand-architecture-bg.jpg",
    category: "SYSTEMS"
  },
  {
    id: 3,
    title: "Visual Expression",
    description: "Bringing ideas to life",
    image: "/images/visual-expression.jpg",
    bgImage: "/images/visual-expression-bg.jpg",
    category: "STEPS"
  },
  {
    id: 4,
    title: "Digital Presence",
    description: "Extending your reach",
    image: "/images/digital-presence.jpg",
    bgImage: "/images/digital-presence-bg.jpg",
    category: "STAGE"
  }
];

export function TransformationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true
  });

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % transformationStages.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + transformationStages.length) % transformationStages.length);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white to-[#FFFFF0]/10 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <motion.div 
            className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(28,28,28,0.03)_50%,transparent_100%)]"
            animate={{
              backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 100%"
            }}
          />
          {/* Aurora accent */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white via-[#FFFFF0] to-white"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-[#1C1C1C]/0 via-[#1C1C1C]/20 to-[#1C1C1C]/0" />
              <motion.span 
                className="font-mono text-sm tracking-wider aurora-text-gradient-light"
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
                TRANSFORMATION
              </motion.span>
              <div className="h-px w-8 bg-gradient-to-r from-[#1C1C1C]/0 via-[#1C1C1C]/20 to-[#1C1C1C]/0" />
            </div>
          </motion.div>

          <motion.h2
            className="font-serif text-4xl lg:text-6xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C1C1C] to-[#1C1C1C]/80">
              Identity
            </span>
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
                in Motion
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
                in Motion
              </motion.span>
              <span className="relative aurora-text-gradient-light">
                in Motion
              </span>
            </motion.span>
          </motion.h2>

          <motion.div
            className="max-w-2xl mx-auto mt-12 text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xl text-[#1C1C1C]/70 leading-relaxed">
              Turning foundational truth into business growth through unified brand expression
            </p>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto" {...handlers}>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -1000 : 1000 }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                {/* Background Image with Parallax */}
                <motion.div 
                  className="absolute inset-0 scale-110"
                  initial={{ x: direction > 0 ? '100%' : '-100%' }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${transformationStages[currentIndex].bgImage})`,
                      filter: 'brightness(0.9) saturate(1.1)'
                    }}
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/50 via-transparent to-[#1C1C1C]/50" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm font-mono tracking-wider aurora-text-gradient-light mb-4"
                    >
                      {transformationStages[currentIndex].category}
                    </motion.div>
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-5xl font-serif text-white mb-4"
                    >
                      {transformationStages[currentIndex].title}
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl text-white/90"
                    >
                      {transformationStages[currentIndex].description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-[#FFFFF0]/60 font-mono">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-[#FFFFF0]/40">/</span>
              <span className="text-[#FFFFF0]/40 font-mono">
                {String(transformationStages.length).padStart(2, '0')}
              </span>
            </div>
            <div className="flex gap-2">
              {transformationStages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-[#FFFFF0]/60 w-8' 
                      : 'bg-[#FFFFF0]/20 hover:bg-[#FFFFF0]/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 