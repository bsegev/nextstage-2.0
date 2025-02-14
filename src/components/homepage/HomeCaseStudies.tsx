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
    <section id="case-studies" className="relative py-16 overflow-hidden font-sans bg-white">
      {/* Sophisticated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(147,51,234,0.03),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-[90rem] mx-auto">
          {/* Header */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-8"
          >
            {/* Label with lines */}
            <motion.div 
              className="inline-flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="h-px w-8 bg-ethereal-dark/20"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8 }}
              />
              <span className="font-mono text-sm tracking-wider text-ethereal-dark/60 uppercase">
                FEATURED WORK
              </span>
              <motion.div 
                className="h-px w-8 bg-ethereal-dark/20"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>

            {/* Main title with animated gradient */}
            <h2 className="font-serif text-4xl lg:text-6xl text-center text-ethereal-dark">
              Case Studies
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
            <p className="mt-6 text-center text-ethereal-dark/70 max-w-2xl mx-auto text-lg font-sans">
              Real transformations that showcase how strategic thinking and focused execution create lasting business impact.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-3 md:gap-6">
            {caseStudies.map((study, index) => (
              <div key={study.category} className="h-[42rem] w-full flex items-center justify-center">
                <CardContainer className="inter-var w-full">
                  <CardBody className="relative h-auto w-[450px] bg-gray-50 dark:bg-black border border-black/[0.1] dark:border-white/[0.1] rounded-xl p-8 flex flex-col bg-dot-black/[0.2] dark:bg-dot-white/[0.2] hover:border-black/20 dark:hover:border-white/20 transition-colors group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
                    {/* Radial gradient for the container to give a faded look */}
                    <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] rounded-xl" />
                    
                    <CardItem
                      translateZ="50"
                      className="text-xs font-mono tracking-wider text-blue-600/80 mb-2"
                    >
                      {study.category}
                    </CardItem>
                    <CardItem
                      translateZ="100"
                      className="text-xl font-serif text-neutral-600 dark:text-white mt-2"
                    >
                      {study.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                      {study.description}
                    </CardItem>
                    <CardItem 
                      translateZ="120" 
                      className="w-full mt-4"
                    >
                      <Image
                        src={study.image}
                        height="1000"
                        width="2000"
                        className="h-[200px] w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt={study.title}
                      />
                    </CardItem>
                    <div className="flex justify-between items-center mt-10">
                      <CardItem
                        translateZ={20}
                        as={Link}
                        href="#"
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                      >
                        View Case Study →
                      </CardItem>
                      <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
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
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-[#1C1C1C] hover:bg-[#1C1C1C]/90 transition-all duration-300 rounded-xl overflow-hidden shadow-lg"
            >
              <Link href="/work" className="relative z-10">
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
                <span className="relative z-10 font-mono text-lg text-[#FFFFF0]">View All Case Studies</span>
              </Link>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
