"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: 'We went from concept to our first major investment in under three months. The brand synergy and pitch deck just clicked with investors.',
    author: 'Early-Stage Founder',
  },
  {
    quote: 'Our pivot soared once we had the right narrative and design. Clients finally got what we offered—and how it mattered.',
    author: 'Growth-Stage Startup',
  },
  {
    quote: 'The attention to detail and strategic insight transformed our brand. Every touchpoint now tells our story perfectly.',
    author: 'Enterprise Client',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-ivory relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-4 mb-16">
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 bg-olive-600 opacity-30"
            />
            <h2 className="text-4xl font-serif text-olive-700">
              Client Stories
            </h2>
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-0.5 bg-olive-600 opacity-30"
            />
          </div>

          <div className="relative h-64 max-w-3xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: currentIndex === index ? 1 : 0,
                  x: currentIndex === index ? 0 : -100,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 text-8xl text-olive-600 font-serif"
                  >
                    "
                  </motion.div>
                  <blockquote className="text-xl text-gray-700 italic mb-6 relative z-10">
                    {testimonial.quote}
                  </blockquote>
                  <cite className="text-olive-600 font-medium not-italic">
                    — {testimonial.author}
                  </cite>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center space-x-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'w-8 bg-olive-600' 
                    : 'bg-olive-200 hover:bg-olive-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-beige-200 opacity-20" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-olive-200 opacity-20" />
    </section>
  );
} 