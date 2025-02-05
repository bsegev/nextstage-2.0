"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Plate {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  speed: number;
  direction: number;
}

export function BackgroundEffect() {
  const [plates, setPlates] = useState<Plate[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Initialize plates with more dynamic properties
  useEffect(() => {
    const initialPlates: Plate[] = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: 25 + (Math.random() * 50), // Keep plates more centered
      y: 25 + (Math.random() * 50),
      rotation: Math.random() * 45 - 22.5,
      scale: 0.8 + Math.random() * 0.4,
      opacity: 0.3 + Math.random() * 0.2,
      speed: 0.8 + Math.random() * 0.4, // Random speed for each plate
      direction: Math.random() > 0.5 ? 1 : -1 // Random direction
    }));
    setPlates(initialPlates);
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {plates.map((plate) => (
        <motion.div
          key={plate.id}
          className="absolute bg-primary-100/10 rounded-3xl backdrop-blur-sm"
          style={{
            width: '45%',
            height: '45%',
            x: `${plate.x}%`,
            y: `${plate.y}%`,
            rotate: plate.rotation,
            scale: plate.scale,
            opacity: plate.opacity,
          }}
          animate={{
            x: [
              `${plate.x}%`,
              `${plate.x + 10 * plate.direction}%`,
              `${plate.x}%`
            ],
            y: [
              `${plate.y}%`,
              `${plate.y + 5 * plate.direction}%`,
              `${plate.y}%`
            ],
            rotate: [
              plate.rotation,
              plate.rotation + 15 * plate.direction,
              plate.rotation
            ],
            scale: [
              plate.scale,
              plate.scale * 1.1,
              plate.scale
            ],
            opacity: [
              plate.opacity,
              plate.opacity * 1.2,
              plate.opacity
            ]
          }}
          transition={{
            duration: 20 * plate.speed,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        >
          {/* Inner gradient effect */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `
                linear-gradient(
                  ${45 + plate.rotation}deg, 
                  transparent, 
                  rgba(var(--primary-rgb), 0.08) 45%, 
                  rgba(var(--primary-rgb), 0.02) 55%, 
                  transparent
                )
              `
            }}
          />
          
          {/* Animated border */}
          <motion.div 
            className="absolute inset-0 rounded-2xl border border-primary-200/20"
            animate={{
              boxShadow: [
                'inset 0 0 0 0 rgba(var(--primary-rgb), 0.1)',
                'inset 0 0 20px 2px rgba(var(--primary-rgb), 0.05)',
                'inset 0 0 0 0 rgba(var(--primary-rgb), 0.1)'
              ]
            }}
            transition={{
              duration: 15 * plate.speed,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />

          {/* Moving highlight */}
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            animate={{
              background: [
                'linear-gradient(45deg, transparent 0%, rgba(var(--primary-rgb), 0.03) 45%, transparent 100%)',
                'linear-gradient(45deg, transparent 100%, rgba(var(--primary-rgb), 0.03) 145%, transparent 200%)'
              ]
            }}
            transition={{
              duration: 10 * plate.speed,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear"
            }}
          />
        </motion.div>
      ))}
    </div>
  );
} 