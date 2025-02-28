"use client";

import { motion } from 'framer-motion';

type FilterType = 'all' | 'image' | 'video' | 'audio' | 'featured' | 'latest';

interface GalleryHeaderProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function GalleryHeader({ activeFilter, onFilterChange }: GalleryHeaderProps) {
  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'Discover All' },
    { id: 'featured', label: 'Featured' },
    { id: 'latest', label: 'Latest' },
    { id: 'image', label: 'Images' },
    { id: 'video', label: 'Videos' },
    { id: 'audio', label: 'Audio' },
  ];

  return (
    <>
      {/* Floating Header */}
      <motion.header 
        className="sticky top-0 z-30 bg-surface-50/95 backdrop-blur-xl border-b border-ethereal-glass-border shadow-sm"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="font-serif text-2xl text-ethereal-dark">AI Art Gallery</h1>
            <nav className="hidden md:flex items-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  className={`relative font-mono text-sm px-4 py-2 rounded-full transition-all duration-300 ${
                    activeFilter === filter.id 
                      ? 'text-ethereal-dark font-medium' 
                      : 'text-ethereal-dark/60 hover:text-ethereal-dark hover:bg-ethereal-dark/5'
                  }`}
                >
                  {activeFilter === filter.id && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Mobile Filters */}
      <div className="md:hidden overflow-x-auto scrollbar-hide sticky top-[73px] z-30 bg-surface-50/95 backdrop-blur-xl border-b border-ethereal-glass-border">
        <div className="flex items-center gap-2 px-6 py-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`relative whitespace-nowrap font-mono text-sm px-4 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter.id 
                  ? 'text-ethereal-dark font-medium bg-gradient-to-br from-blue-500/10 to-emerald-500/10' 
                  : 'text-ethereal-dark/60 hover:text-ethereal-dark hover:bg-ethereal-dark/5'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
} 