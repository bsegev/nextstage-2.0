"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, createContext, useContext, useRef, useState } from "react";

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { setOpen } = useModal();
  return (
    <motion.button
      className={cn("relative", className)}
      onClick={() => setOpen(true)}
    >
      {children}
    </motion.button>
  );
};

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { open, setOpen } = useModal();
  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => setOpen(false));

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          ref={menuRef}
          className={cn(
            "fixed bottom-8 right-8 z-[200] h-[60px] bg-white dark:bg-neutral-950 rounded-[30px] shadow-lg border border-neutral-200 dark:border-neutral-800 flex items-center overflow-hidden",
            className
          )}
          initial={{ width: "60px" }}
          animate={{ 
            width: "min(700px, calc(100vw - 64px))",
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.8,
              restDelta: 0.001
            }
          }}
          exit={{ 
            width: "60px",
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 25,
            }
          }}
        >
          <div className="flex items-center w-full">
            {children}
          </div>
          <motion.button
            onClick={() => setOpen(false)}
            className="absolute right-0 w-[60px] h-[60px] hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-600 dark:text-neutral-400"
            >
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {children}
    </div>
  );
};

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) => {
  React.useEffect(() => {
    // Skip if we're not in the browser
    if (typeof window === "undefined") return;

    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
}; 