"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import { motion } from "framer-motion";
import Image from "next/image";

interface LinkPreviewProps {
  url: string;
  children: React.ReactNode;
  className?: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  disabled?: boolean;
}

export function LinkPreview({
  url,
  children,
  className = "",
  thumbnailUrl,
  title,
  description,
  disabled = false
}: LinkPreviewProps) {
  return (
    <HoverCard.Root openDelay={0} closeDelay={0}>
      <HoverCard.Trigger asChild>
        {disabled ? (
          <div className={className}>
            {children}
          </div>
        ) : (
          <a
            href={url}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        )}
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content 
          sideOffset={5} 
          className="z-[9999]"
          style={{
            position: 'relative',
            zIndex: 9999
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl border border-ethereal-glass-border p-4 w-80 relative z-[9999]"
          >
            {thumbnailUrl && (
              <div className="w-full aspect-video rounded-lg overflow-hidden mb-3 bg-ethereal-dark/5">
                <Image
                  src={thumbnailUrl}
                  alt={title || "Preview"}
                  width={320}
                  height={180}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="space-y-2">
              <h3 className="font-medium text-ethereal-dark">{title || url}</h3>
              {description && (
                <p className="text-sm text-ethereal-dark/70 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          </motion.div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
} 