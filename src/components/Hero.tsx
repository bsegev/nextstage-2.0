"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ArrowDownIcon } from '@heroicons/react/24/outline';

export function Hero() {
  // Enhanced state management
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Scroll and motion values
  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, 500], [0, 1]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 400 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Gradient movement based on mouse
  const gradientX = useTransform(mouseXSpring, [-1000, 1000], [-100, 100]);
  const gradientY = useTransform(mouseYSpring, [-1000, 1000], [-100, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = 
        containerRef.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: 0, height: 0 };
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mouseX, mouseY]);

  // Text reveal animation variants
  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-surface-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.3] }}
          transition={{ duration: 2, times: [0, 0.7, 1], ease: "easeOut" }}
          className="absolute inset-0 bg-[url('/grid.svg')] opacity-30"
          style={{
            x: useTransform(scrollY, [0, 1000], [0, -50]),
            scale: useTransform(scrollY, [0, 1000], [1, 1.1])
          }}
        />
        <motion.div
          style={{ x: gradientX, y: gradientY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.8, 0.6], scale: [0.8, 1.1, 1] }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary-100/30 via-primary-200/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: useTransform(gradientX, x => -x), y: useTransform(gradientY, y => -y) }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.8, 0.6], scale: [0.8, 1.1, 1] }}
          transition={{ duration: 2.5, delay: 0.2, ease: "easeOut" }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-primary-100/30 via-primary-200/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Enhanced content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl">
          {/* Enhanced eyebrow */}
          <motion.div
            custom={0}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <div className="flex items-center gap-4">
              <motion.div 
                className="h-px w-8 bg-primary-300"
                animate={{ width: [0, 32] }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.span 
                className="font-mono text-sm text-primary-600"
                animate={{ opacity: [0, 1], x: [-20, 0] }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Strategic Design Partner
              </motion.span>
            </div>
          </motion.div>

          {/* Enhanced headline */}
          <motion.div
            custom={1}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary-900 leading-tight">
              <motion.span 
                className="text-primary-600 inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                Vision
              </motion.span>{" "}
              becomes<br />
              reality through{" "}
              <motion.span 
                className="text-primary-700 inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                design
              </motion.span>
            </h1>
          </motion.div>

          {/* Enhanced subheadline */}
          <motion.div
            custom={2}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="mb-12 max-w-2xl"
          >
            <p className="text-lg md:text-xl text-secondary-600 leading-relaxed">
              Transform your ideas into compelling experiences that captivate, 
              engage, and drive meaningful outcomes.
            </p>
          </motion.div>

          {/* Enhanced CTA group */}
          <motion.div
            custom={3}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <motion.button
              ref={buttonRef}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-primary-600 text-white rounded-lg 
                       font-medium hover:bg-primary-700 transition-all duration-300
                       overflow-hidden"
            >
              <span className="relative z-10">Start Your Journey</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent 
                         via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </motion.button>
            
            <motion.a
              href="#process"
              className="group flex items-center gap-2 text-secondary-600 
                      hover:text-primary-600 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              <span>See our process</span>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDownIcon className="w-4 h-4" />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ 
            y: [0, 8, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div 
            className="w-px h-12 bg-gradient-to-b from-transparent via-primary-300 to-primary-400"
            style={{
              scaleY: useTransform(scrollProgress, [0, 0.2], [1, 0])
            }}
          />
          <span className="font-mono text-xs text-secondary-500">Scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  );
} 