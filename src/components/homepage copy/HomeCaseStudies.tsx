"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const caseStudies = [
  {
    category: "DIGITAL PRIVATE BANK",
    title: "Process Optimization",
    description: "Evolution from process optimization to comprehensive digital transformation and brand development for a private banking institution.",
    image: "/images/transformation/bank-comparison.png",
  },
  {
    category: "HOLISTIC RECOVERY CENTER",
    title: "Global Brand Strategy",
    description: "Evolution from clinical recovery center to authentic holistic healing sanctuary, beginning with internal alignment before global expansion.",
    image: "/images/transformation/recovery-comparison.jpg",
  },
  {
    category: "VETERAN PHOTOGRAPHER",
    title: "Website Development",
    description: "Transforming 30 years of photographic mastery into an engaging digital experience that honors artistic authenticity while enabling business growth.",
    image: "/images/transformation/photographer-portfolio.png",
  }
];

export function HomeCaseStudies() {
  return (
    <section id="case-studies" className="relative py-12 sm:py-16 overflow-hidden font-sans bg-white">
      {/* Sophisticated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(147,51,234,0.03),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-[90rem] mx-auto">
          {/* Header */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-6 sm:mb-8"
          >
            {/* Label with lines */}
            <motion.div 
              className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="h-px w-6 sm:w-8 bg-ethereal-dark/20"
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                transition={{ duration: 0.8 }}
              />
              <span className="font-mono text-xs sm:text-sm tracking-wider text-ethereal-dark/60 uppercase">
                FEATURED WORK
              </span>
              <motion.div 
                className="h-px w-6 sm:w-8 bg-ethereal-dark/20"
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>

            {/* Main title with animated gradient */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-center text-ethereal-dark">
              Case Studies
              <motion.span
                className="block mt-1 sm:mt-2 relative"
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
                  & Transformations
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
                  & Transformations
                </motion.span>
                <span className="relative aurora-text-gradient-light">
                  & Transformations
                </span>
              </motion.span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-6 text-center text-ethereal-dark/70 max-w-2xl mx-auto text-base sm:text-lg font-sans px-4 sm:px-0">
              Real transformations that showcase how strategic thinking and focused execution create lasting business impact.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-3">
            {caseStudies.map((study, index) => (
              <div key={study.category} className="w-full">
                <CardContainer className="inter-var w-full">
                  <CardBody className="relative h-auto w-full bg-gray-50 dark:bg-black border border-black/[0.1] dark:border-white/[0.1] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 flex flex-col bg-dot-black/[0.2] dark:bg-dot-white/[0.2] hover:border-black/20 dark:hover:border-white/20 transition-colors group/card md:hover:shadow-2xl md:hover:shadow-emerald-500/[0.1] dark:md:hover:shadow-2xl dark:md:hover:shadow-emerald-500/[0.1]">
                    {/* Radial gradient for the container to give a faded look */}
                    <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] rounded-lg sm:rounded-xl" />
                    
                    <CardItem
                      translateZ="50"
                      className="text-[10px] sm:text-xs font-mono tracking-wider text-blue-600/80 mb-1 sm:mb-2"
                    >
                      {study.category}
                    </CardItem>
                    <CardItem
                      translateZ="100"
                      className="text-lg sm:text-xl font-serif text-neutral-600 dark:text-white mt-1 sm:mt-2"
                    >
                      {study.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-neutral-500 text-xs sm:text-sm max-w-sm mt-1 sm:mt-2 dark:text-neutral-300"
                    >
                      {study.description}
                    </CardItem>
                    <CardItem 
                      translateZ="120" 
                      className="w-full mt-3 sm:mt-4"
                    >
                      <div className="aspect-[16/9] w-full relative">
                        <Image
                          src={study.image}
                          fill
                          className="object-cover rounded-lg sm:rounded-xl md:group-hover/card:shadow-xl"
                          alt={study.title}
                        />
                      </div>
                    </CardItem>
                    <div className="flex justify-between items-center mt-4 sm:mt-6 md:mt-8">
                      <CardItem
                        translateZ={20}
                        as={Link}
                        href="#"
                        className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-normal dark:text-white"
                      >
                        View Case Study →
                      </CardItem>
                      <CardItem
                        translateZ={20}
                        as="button"
                        className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-black dark:bg-white dark:text-black text-white text-[10px] sm:text-xs font-bold"
                      >
                        Watch Video
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </div>
            ))}
          </div>
          
          {/* CTA to work page */}
          <motion.div 
            className="mt-8 sm:mt-12 text-center px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 transition-all duration-300 rounded-lg sm:rounded-xl overflow-hidden shadow-lg"
            >
              <Link href="/work" className="relative z-10 w-full sm:w-auto">
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
                <span className="relative z-10 font-mono text-base sm:text-lg text-[#FFFFF0] block w-full text-center">View More Work</span>
              </Link>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
