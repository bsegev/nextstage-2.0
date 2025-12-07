"use client";

import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal, ModalBody, ModalContent, useModal } from '@/components/ui/animated-modal';
import Lottie from 'lottie-react';
import loadingLine from '../../../public/lotties/loading-line.json';
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
      // Force a hard navigation to ensure proper page loading
      window.location.href = href;
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
      // Force a hard navigation to ensure proper page loading
      window.location.href = href;
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
  const menuIconRef = useRef<HTMLDivElement>(null);
  const menuLottieRef = useRef<any>(null);

  useEffect(() => {
    if (menuIconRef.current) {
      menuLottieRef.current = lottie.loadAnimation({
        container: menuIconRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: require('../../../public/lotties/menu.json'),
      });

      menuLottieRef.current.goToAndStop(0, true);
    }

    return () => {
      if (menuLottieRef.current) {
        menuLottieRef.current.destroy();
      }
    };
  }, []);

  const toggleMenu = () => {
    if (!menuLottieRef.current) return;

    if (isOpen) {
      // X to hamburger (frames 30-50)
      menuLottieRef.current.playSegments([30, 50], true);
    } else {
      // Hamburger to X (frames 0-20)
      menuLottieRef.current.playSegments([0, 20], true);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      {/* Floating Menu Button */}
      <motion.button 
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-[202] w-14 h-14 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
        whileTap={{ scale: 0.98 }}
      >
        <div ref={menuIconRef} className="w-7 h-7 relative z-10" style={{ pointerEvents: 'none' }} />
      </motion.button>

      {/* Refined Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Elegant Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-0 z-[200] bg-white/90 backdrop-blur-2xl"
            />

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-0 z-[201] flex flex-col pt-28 pb-12 px-8"
            >
              {/* Navigation Links */}
              <motion.nav className="flex-1">
                <div className="max-w-md mx-auto space-y-6">
                  {[
                    { href: "/", label: "home", index: 0 },
                    { href: "/about", label: "about", index: 1 },
                    { href: "/work", label: "work", index: 2 },
                    { href: "/play", label: "play", index: 3 },
                    { href: "/learn", label: "learn", index: 4 },
                    { href: "#contact", label: "let's talk", index: 5 }
                  ].map(({ href, label, index }) => (
                    <MobileNavItem 
                      key={href} 
                      href={href} 
                      index={index} 
                      onNavigate={() => setIsOpen(false)}
                    >
                      {label}
                    </MobileNavItem>
                  ))}
                </div>
              </motion.nav>

              {/* Minimalist Footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pt-12 max-w-md mx-auto w-full"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <span className="text-sm text-ethereal-dark/50 tracking-wide">get in touch</span>
                  <a 
                    href="mailto:hello@example.com" 
                    className="text-ethereal-dark/90 hover:text-ethereal-dark transition-colors text-lg"
                  >
                    hello@example.com
                  </a>
                </div>
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