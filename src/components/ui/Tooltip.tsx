import { motion, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export function Tooltip({ children, content, className }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [width, setWidth] = useState(0);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  useEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth * 3);
    }
  }, [children]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div
      className="relative inline-block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Custom cursor */}
      <motion.div
        className={cn(
          "absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none",
          "opacity-0 group-hover:opacity-100 transition-opacity",
          "flex items-center justify-center"
        )}
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ArrowUpIcon className="w-3 h-3 text-primary-500" />
      </motion.div>

      {/* Trigger */}
      <span
        ref={triggerRef}
        className={cn(
          "relative border-b-2 border-dashed border-primary-300/50",
          "hover:border-primary-500 transition-all duration-300",
          className
        )}
      >
        {children}
      </span>
      
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: -20, scale: 0.6 }}
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: "normal",
              width: width || 'auto',
              minWidth: '180px',
              maxWidth: '300px'
            }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center rounded-lg bg-white shadow-xl px-4 py-3 text-xs z-[9999]"
          >
            {/* Arrow */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-white" />
            
            {/* Content */}
            <div className="relative z-30">
              {content}
            </div>

            {/* Decorative elements */}
            <div className="absolute inset-x-6 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-primary-500 to-transparent h-px" />
            <div className="absolute left-6 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-primary-300 to-transparent h-px" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 