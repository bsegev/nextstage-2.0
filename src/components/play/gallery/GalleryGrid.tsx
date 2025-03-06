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
  // Filter items based on active filter
  const filteredItems = items.filter(item => {
    if (activeFilter === 'featured') return item.featured;
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  // Check if there are no items for the current filter
  const noContent = filteredItems.length === 0;

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

        {/* Empty State Message */}
        {noContent && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 px-4 text-center"
          >
            <div className="w-32 h-32 mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-full animate-pulse" />
              <div className="absolute inset-2 bg-gradient-to-br from-blue-500/30 to-emerald-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-4 bg-gradient-to-br from-blue-500/40 to-emerald-500/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <h3 className="text-2xl font-serif mb-4 aurora-text-gradient-light">Coming Soon!</h3>
            
            <p className="text-lg text-ethereal-dark/70 max-w-md mb-6">
              {activeFilter === 'video' 
                ? "We're crafting mesmerizing videos that will blow your mind. Our creative team is hard at work!"
                : activeFilter === 'audio'
                ? "Our audio experiences are being composed and fine-tuned. Get ready for some ear candy!"
                : "We're busy creating amazing content for this category. Check back soon for fresh inspiration!"}
            </p>
            
            <div className="font-mono text-sm text-ethereal-dark/60">
              Want to see more? <a href="mailto:hello@nextstage.com" className="text-blue-500 hover:text-blue-600 underline transition-colors">Reach out to learn more</a>
            </div>
          </motion.div>
        )}

        {/* Main Grid - Only shown when there is content */}
        {!noContent && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px]">
            {filteredItems.map((item, index) => {
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
        )}
      </div>
    </section>
  );
} 