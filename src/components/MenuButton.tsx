"use client";

import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal, ModalBody, ModalContent, ModalTrigger, useModal } from './ui/animated-modal';

const MenuContent = ({ triggerLottieRef, isScrolling }: { triggerLottieRef: React.RefObject<HTMLDivElement>, isScrolling: boolean }) => {
  const { open, setOpen } = useModal();

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <div onClick={toggleMenu} className="fixed bottom-8 right-8 z-[100] group">
        <div className="relative">
          <AnimatePresence>
            {!isScrolling && (
              <motion.div 
                className="absolute bottom-[30px] -right-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-[60px] h-24 bg-white rounded-lg shadow-lg flex flex-col items-center pt-2">
                  <span className="font-['Caveat'] text-base sm:text-lg text-secondary-600">menu</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="relative z-10 w-[60px] h-[60px] rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer">
            <div ref={triggerLottieRef} className="w-[25px] h-[25px] scale-[2]" />
          </div>
        </div>
      </div>
      <ModalBody>
        <ModalContent className="pl-12 pr-[72px]">
          <motion.nav 
            className="flex items-center gap-8 sm:gap-16 text-base sm:text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <a href="#hero" className="hover:text-primary-500 transition-colors">Home</a>
            <a href="#process" className="hover:text-primary-500 transition-colors">Process</a>
            <a href="#services" className="hover:text-primary-500 transition-colors">Services</a>
            <a href="#contact" className="hover:text-primary-500 transition-colors">Contact</a>
          </motion.nav>
        </ModalContent>
      </ModalBody>
    </>
  );
};

export const MenuButton = () => {
  const triggerLottieRef = useRef<HTMLDivElement>(null);
  const lottieInstanceRef = useRef<any>(null);
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const [isScrolling, setIsScrolling] = useState(false);

  const initLottie = (container: HTMLDivElement) => {
    if (lottieInstanceRef.current) {
      lottieInstanceRef.current.destroy();
    }
    
    lottieInstanceRef.current = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: false,  // Start paused
      path: '/lotties/meta-loading (1).json',
    });

    // Start paused at first frame
    lottieInstanceRef.current.goToAndStop(0, true);
    return lottieInstanceRef.current;
  };

  useEffect(() => {
    if (triggerLottieRef.current) {
      initLottie(triggerLottieRef.current);
    }

    return () => {
      lottieInstanceRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      if (lottieInstanceRef.current) {
        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Make sure animation is playing
        if (lottieInstanceRef.current.isPaused) {
          lottieInstanceRef.current.play();
        }

        const scrollVelocity = Math.abs(window.scrollY - lastScrollYRef.current);
        const speed = Math.min(3, Math.max(1, scrollVelocity / 30));
        lottieInstanceRef.current.setSpeed(speed);

        // Pause animation and show menu text after scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          if (lottieInstanceRef.current) {
            lottieInstanceRef.current.pause();
            setIsScrolling(false);
          }
        }, 150);
      }
      lastScrollYRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Modal>
      <MenuContent triggerLottieRef={triggerLottieRef} isScrolling={isScrolling} />
    </Modal>
  );
}; 