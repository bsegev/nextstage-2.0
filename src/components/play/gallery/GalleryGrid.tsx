"use client";

import { motion } from 'framer-motion';
import { GalleryItem } from '@/components/gallery/GalleryItem';

type MediaType = 'image' | 'video' | 'audio';
type FilterType = 'all' | MediaType | 'featured' | 'latest';

interface GalleryItemType {
  id: string;
  type: MediaType;
  title: string;
  description: string;
  src: string;
  thumbnail?: string;
  featured?: boolean;
  date: string;
  tags: string[];
  dimensions?: { width: number; height: number };
  prompt: {
    text: string;
    model: 'DALL-E' | 'Midjourney' | 'Sora' | 'Suno';
    version?: string;
  };
  additionalImages?: string[];
}

interface GalleryGridProps {
  items: GalleryItemType[];
  activeFilter: FilterType;
  onItemClick: (item: GalleryItemType) => void;
}

export function GalleryGrid({ items, activeFilter, onItemClick }: GalleryGridProps) {
  return (
    <section className="py-24 px-4 md:px-6">
      <div className="max-w-[2000px] mx-auto">
        {/* Featured Section - Only shown in 'all' or 'featured' filter */}
        {(activeFilter === 'all' || activeFilter === 'featured') && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif mb-8">Featured Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items
                .filter(item => item.featured)
                .slice(0, 3)
                .map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GalleryItem
                      type={item.type}
                      src={item.src}
                      thumbnail={item.thumbnail}
                      title={item.title}
                      description={item.description}
                      onClick={() => onItemClick(item)}
                      featured={item.featured}
                      dimensions={item.dimensions}
                      prompt={item.prompt}
                      additionalImages={item.additionalImages}
                    />
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px]">
          {items
            .filter(item => {
              if (activeFilter === 'featured') return item.featured;
              if (activeFilter === 'all') return true;
              return item.type === activeFilter;
            })
            .map((item, index) => {
              // Calculate span based on aspect ratio
              const span = item.dimensions 
                ? Math.ceil((item.dimensions.height / item.dimensions.width) * 2)
                : 1;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative w-full h-full`}
                  style={{ 
                    gridRow: `span ${span}`,
                  }}
                >
                  <GalleryItem
                    type={item.type}
                    src={item.src}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    description={item.description}
                    onClick={() => onItemClick(item)}
                    featured={item.featured}
                    dimensions={item.dimensions}
                    prompt={item.prompt}
                    additionalImages={item.additionalImages}
                  />
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
} 