"use client";

import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal, ModalBody, ModalContent, useModal } from '@/components/ui/animated-modal';
import Lottie from 'lottie-react';
import loadingLine from '/public/lotties/loading-line.json';
import { HomeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Desktop Navigation Item
const DesktopNavItem = ({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon?: React.ComponentType<any> }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const isExternal = href.startsWith('#');
  
  const handleClick = (e: React.MouseEvent) => {
    if (!isExternal) {
      e.preventDefault();
      router.push(href);
    }
  };
  
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
    <motion.a 
      href={href}
      onClick={handleClick}
      className="relative group flex items-center gap-2 cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {content}
    </motion.a>
  );
};

// Mobile Navigation Item
const MobileNavItem = ({ href, children, index, onNavigate }: { href: string; children: React.ReactNode; index: number; onNavigate: () => void }) => {
  const router = useRouter();
  const isExternal = href.startsWith('#');
  
  const handleClick = (e: React.MouseEvent) => {
    if (!isExternal) {
      e.preventDefault();
      onNavigate();
      router.push(href);
    }
  };
  
  const content = (
    <motion.div 
      className="relative overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 + 0.3 }}
    >
      <motion.div 
        className="w-full px-8 py-5 text-xl font-light text-ethereal-dark/90 flex items-center justify-between group"
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative">
          {children}
          <motion.div 
            className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-blue-500/40 to-emerald-500/40"
            initial={{ scaleX: 0, originX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </span>
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-4 h-4 text-ethereal-dark/40 group-hover:text-ethereal-dark/70 transition-colors"
          initial={{ x: -4, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
  
  return (
    <motion.a href={href} onClick={handleClick}>
      {content}
    </motion.a>
  );
};

// Desktop Menu Content
const DesktopMenuContent = ({ triggerLottieRef, isScrolling }: { triggerLottieRef: React.RefObject<HTMLDivElement>, isScrolling: boolean }) => {
  const { open, setOpen } = useModal();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is our md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setOpen(!isScrolling);
    }
  }, [isScrolling, setOpen, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[100] group hidden md:block">
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
                  <span className="font-['Caveat'] text-lg text-secondary-600">menu</span>
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
            className="flex items-center gap-8 text-base font-sans"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: open ? 1 : 0, x: open ? 0 : -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <DesktopNavItem href="/" icon={HomeIcon}>home</DesktopNavItem>
            <DesktopNavItem href="/about">about</DesktopNavItem>
            <DesktopNavItem href="/work">work</DesktopNavItem>
            <DesktopNavItem href="/play">play</DesktopNavItem>
            <DesktopNavItem href="/learn">learn</DesktopNavItem>
            <DesktopNavItem href="#contact">let's talk</DesktopNavItem>
          </motion.nav>
        </ModalContent>
      </ModalBody>
    </>
  );
};

// Mobile Menu Content
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is our md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      const deltaY = window.scrollY - lastScrollYRef.current;
      const isScrollingDown = deltaY > 0;

      // Update visibility based on scroll direction and menu state
      if (!isOpen) {
        if (isScrollingDown) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      lastScrollYRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Mobile Trigger Button */}
      <motion.button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-[100] w-[50px] h-[50px] bg-white rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div className="w-6 h-6 flex flex-col items-center justify-center gap-1.5">
          <motion.span className="w-5 h-px bg-ethereal-dark/70 block" />
          <motion.span className="w-4 h-px bg-ethereal-dark/70 block" />
          <motion.span className="w-3 h-px bg-ethereal-dark/70 block" />
        </motion.div>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-white"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("/grid.svg")' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-emerald-500/[0.02]" />
            </motion.div>

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[201] flex flex-col"
            >
              {/* Header */}
              <motion.div 
                className="flex items-center justify-between px-6 py-4 border-b border-ethereal-dark/5"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.span 
                  className="font-serif text-lg text-ethereal-dark/90"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Navigation
                </motion.span>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-[50px] h-[50px] rounded-full bg-white shadow-lg flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <XMarkIcon className="w-6 h-6 text-ethereal-dark/70" />
                </motion.button>
              </motion.div>

              {/* Navigation */}
              <motion.nav
                className="flex-1 overflow-auto py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <MobileNavItem href="/" index={0} onNavigate={() => setIsOpen(false)}>Home</MobileNavItem>
                <MobileNavItem href="/about" index={1} onNavigate={() => setIsOpen(false)}>About</MobileNavItem>
                <MobileNavItem href="/work" index={2} onNavigate={() => setIsOpen(false)}>Work</MobileNavItem>
                <MobileNavItem href="/play" index={3} onNavigate={() => setIsOpen(false)}>Play</MobileNavItem>
                <MobileNavItem href="/learn" index={4} onNavigate={() => setIsOpen(false)}>Learn</MobileNavItem>
                <MobileNavItem href="#contact" index={5} onNavigate={() => setIsOpen(false)}>Let's Talk</MobileNavItem>
              </motion.nav>

              {/* Footer */}
              <motion.div 
                className="px-8 py-6 border-t border-ethereal-dark/5"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div 
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-sm text-ethereal-dark/40 font-mono">Get in touch</span>
                  <a 
                    href="mailto:hello@example.com" 
                    className="text-ethereal-dark/90 hover:text-ethereal-dark transition-colors"
                  >
                    hello@example.com
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is our md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const initLottie = (container: HTMLDivElement) => {
    if (lottieInstanceRef.current) {
      lottieInstanceRef.current.destroy();
    }
    
    if (!isMobile) {
      lottieInstanceRef.current = lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '/lotties/meta-loading (1).json',
      });

      lottieInstanceRef.current.goToAndStop(0, true);
      return lottieInstanceRef.current;
    }
  };

  useEffect(() => {
    if (triggerLottieRef.current && !isMobile) {
      initLottie(triggerLottieRef.current);
    }

    return () => {
      lottieInstanceRef.current?.destroy();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

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
  }, [isScrolling, isMobile]);

  return (
    <>
      <Modal>
        <DesktopMenuContent triggerLottieRef={triggerLottieRef} isScrolling={isScrolling} />
      </Modal>
      <MobileMenu />
    </>
  );
}; 