"use client";

import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6, // Longer duration for more zen-like scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced multiplier for smoother wheel scrolling
      touchMultiplier: 1.5, // Adjusted for touch devices
    });

    // Sync with RAF for smooth rendering
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the animation loop
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
} 