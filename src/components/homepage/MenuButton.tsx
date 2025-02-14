"use client";

import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal, ModalBody, ModalContent, useModal } from '@/components/ui/animated-modal';
import Lottie from 'lottie-react';
import loadingLine from '/public/lotties/loading-line.json';
import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const NavItem = ({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon?: React.ComponentType<any> }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isExternal = href.startsWith('#');
  
  const content = (
    <>
      {Icon && <Icon className="w-4 h-4 text-ethereal-dark" />}
      <span className="text-ethereal-dark">{children}</span>
      <motion.div
        className="absolute -bottom-1 left-0 w-full h-[45px] -translate-y-[10px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Lottie
          animationData={loadingLine}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%', transform: 'scale(1, 0.5)' }}
        />
      </motion.div>
    </>
  );
  
  if (isExternal) {
    return (
      <motion.a 
        href={href}
        className="relative group flex items-center gap-2"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <Link href={href} passHref>
      <motion.div 
        className="relative group flex items-center gap-2 cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {content}
      </motion.div>
    </Link>
  );
};

const MenuContent = ({ triggerLottieRef, isScrolling }: { triggerLottieRef: React.RefObject<HTMLDivElement>, isScrolling: boolean }) => {
  const { open, setOpen } = useModal();

  // Single state transition based on scroll
  useEffect(() => {
    setOpen(!isScrolling);
  }, [isScrolling, setOpen]);

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[100] group">
        <div className="relative">
          <AnimatePresence>
            {!isScrolling && (
              <motion.div 
                className="absolute bottom-[30px] -right-0"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="w-[60px] h-24 bg-white rounded-lg shadow-lg flex flex-col items-center pt-2">
                  <span className="font-['Caveat'] text-base sm:text-lg text-secondary-600">menu</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="relative z-10 w-[60px] h-[60px] rounded-full bg-white shadow-lg flex items-center justify-center">
            <div ref={triggerLottieRef} className="w-[25px] h-[25px] scale-[2]" />
          </div>
        </div>
      </div>
      <ModalBody>
        <ModalContent className="pl-12 pr-[72px]">
          <motion.nav 
            className="flex items-center gap-6 sm:gap-8 text-sm sm:text-base font-sans"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: open ? 1 : 0, x: open ? 0 : -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <NavItem href="/" icon={HomeIcon}>home</NavItem>
            <NavItem href="/about">about</NavItem>
            <NavItem href="/work">work</NavItem>
            <NavItem href="#play">play</NavItem>
            <NavItem href="#library">library</NavItem>
            <NavItem href="#contact">let's talk</NavItem>
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
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollEndTimeoutRef = useRef<NodeJS.Timeout>();
  const rafIdRef = useRef<number>();
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  const initLottie = (container: HTMLDivElement) => {
    if (lottieInstanceRef.current) {
      lottieInstanceRef.current.destroy();
    }
    
    lottieInstanceRef.current = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: '/lotties/meta-loading (1).json',
    });

    lottieInstanceRef.current.goToAndStop(0, true);
    return lottieInstanceRef.current;
  };

  useEffect(() => {
    if (triggerLottieRef.current) {
      initLottie(triggerLottieRef.current);
    }

    return () => {
      lottieInstanceRef.current?.destroy();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkScrollEnd = () => {
      const currentVelocity = Math.abs(velocityRef.current);
      
      if (currentVelocity < 0.1) {
        if (lottieInstanceRef.current) {
          lottieInstanceRef.current.pause();
        }
        setIsScrolling(false);
        return;
      }
      
      rafIdRef.current = requestAnimationFrame(checkScrollEnd);
    };

    const handleScroll = () => {
      const now = Date.now();
      const deltaTime = now - lastTimeRef.current;
      const deltaY = window.scrollY - lastScrollYRef.current;
      
      velocityRef.current = Math.abs(deltaY) / deltaTime;
      
      if (!isScrolling) {
        setIsScrolling(true);
        if (lottieInstanceRef.current?.isPaused) {
          lottieInstanceRef.current.play();
        }
      }

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      
      rafIdRef.current = requestAnimationFrame(checkScrollEnd);

      lastScrollYRef.current = window.scrollY;
      lastTimeRef.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isScrolling]);

  return (
    <Modal>
      <MenuContent triggerLottieRef={triggerLottieRef} isScrolling={isScrolling} />
    </Modal>
  );
}; 