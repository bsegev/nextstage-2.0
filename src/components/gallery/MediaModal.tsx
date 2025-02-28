"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { XMarkIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface MediaModalProps {
  item: {
    type: 'image' | 'video' | 'audio';
    src: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    additionalImages?: string[];
    prompt: {
      text: string;
      model: 'DALL-E' | 'Midjourney' | 'Sora' | 'Suno';
      version?: string;
    };
  } | null;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function MediaModal({ item, onClose, onNext, onPrevious }: MediaModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrevious) onPrevious();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, onNext, onPrevious]);

  if (!item) return null;

  const mediaContent = () => {
    switch (item.type) {
      case 'image':
        return (
          <div className="relative w-full h-full">
            {item.additionalImages ? (
              <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
                <div className="relative aspect-square">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                    onLoadingComplete={() => setIsLoading(false)}
                    quality={100}
                    priority
                  />
                </div>
                {item.additionalImages.map((imgSrc, index) => (
                  <div key={imgSrc} className="relative aspect-square">
                    <Image
                      src={imgSrc}
                      alt={`${item.title} ${index + 2}`}
                      fill
                      className="object-cover rounded-lg"
                      onLoadingComplete={() => setIsLoading(false)}
                      quality={100}
                      priority
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-contain"
                onLoadingComplete={() => setIsLoading(false)}
                quality={100}
                priority
              />
            )}
          </div>
        );
      case 'video':
        return (
          <video
            src={item.src}
            controls
            className="max-h-full w-auto"
            onLoadedData={() => setIsLoading(false)}
            autoPlay
          />
        );
      case 'audio':
        return (
          <div className="w-full max-w-2xl mx-auto p-8 bg-white/5 backdrop-blur-xl rounded-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-serif text-white mb-4">{item.title}</h2>
              <p className="text-white/80">{item.description}</p>
            </div>
            <audio
              src={item.src}
              controls
              className="w-full"
              onLoadedData={() => setIsLoading(false)}
              autoPlay
            />
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <XMarkIcon className="w-6 h-6 text-white" />
        </button>

        {/* Navigation buttons */}
        {onPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6 text-white" />
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowRightIcon className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Loading state */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white/80 rounded-full animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Media content */}
            <div className="relative w-full h-full flex items-center justify-center">
              {mediaContent()}
            </div>
          </div>
        </div>

        {/* Info panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-24 pb-8 px-6"
        >
          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl font-serif text-white">{item.title}</h2>
            <p className="text-white/80">{item.description}</p>
            
            {/* Prompt Information */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-white/60 font-mono text-sm">Generated using</span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white font-mono text-sm">
                  {item.prompt.model}
                </span>
              </div>
              <p className="text-white/90 font-mono text-sm italic">
                "{item.prompt.text}"
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full bg-white/10 text-white/80 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 