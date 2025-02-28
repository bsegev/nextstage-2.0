"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlayIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';

interface GalleryItemProps {
  type: 'image' | 'video' | 'audio';
  src: string;
  thumbnail?: string;
  title: string;
  description: string;
  onClick: () => void;
  featured?: boolean;
  dimensions?: { width: number; height: number };
  additionalImages?: string[];
  prompt: {
    text: string;
    model: 'DALL-E' | 'Midjourney' | 'Sora' | 'Suno';
    version?: string;
  };
}

export function GalleryItem({
  type,
  src,
  thumbnail,
  title,
  description,
  onClick,
  featured,
  dimensions,
  additionalImages,
  prompt
}: GalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const mediaContent = () => {
    switch (type) {
      case 'image':
        return (
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        );
      case 'video':
        return (
          <>
            <Image
              src={thumbnail || src}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <PlayIcon className="w-12 h-12 text-white" />
            </div>
          </>
        );
      case 'audio':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 flex items-center justify-center">
            <SpeakerWaveIcon className="w-12 h-12 text-ethereal-dark/40" />
          </div>
        );
    }
  };

  return (
    <motion.div
      layoutId={`gallery-item-${src}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative w-full h-full"
    >
      <div className="relative overflow-hidden rounded-xl bg-ethereal-dark/5 h-full">
        {/* Media Content */}
        <div className="absolute inset-0">
          {mediaContent()}
        </div>

        {/* Hover Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <h3 className="text-white font-medium">{title}</h3>
              <p className="text-white/80 text-sm line-clamp-2">{description}</p>
              <div className="pt-2 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white/60">Generated with</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs font-mono">
                    {prompt.model}
                  </span>
                </div>
                <p className="text-white/70 text-xs font-mono mt-1 line-clamp-2 italic">
                  "{prompt.text}"
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full">
            <span className="text-xs font-mono text-ethereal-dark">Featured</span>
          </div>
        )}

        {/* Media Type Badge */}
        <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full">
          <span className="text-xs font-mono text-ethereal-dark capitalize">{type}</span>
        </div>
      </div>
    </motion.div>
  );
} 