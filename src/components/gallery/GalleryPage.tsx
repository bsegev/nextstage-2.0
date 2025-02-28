import { useState, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { sampleItems } from './galleryData';
import type { GalleryItem, FilterType } from './types';

// Dynamic imports for components that use browser APIs
const GalleryHero = dynamic(() => import('./GalleryHero').then(mod => ({ default: mod.GalleryHero })), { ssr: false });
const GalleryItem = dynamic(() => import('./GalleryItem').then(mod => ({ default: mod.GalleryItem })), { ssr: false });
const MediaModal = dynamic(() => import('./MediaModal').then(mod => ({ default: mod.MediaModal })), { ssr: false });
const MenuButton = dynamic(() => import('../homepage/MenuButton').then(mod => ({ default: mod.MenuButton })), { ssr: false });
const Modal = dynamic(() => import('../ui/animated-modal').then(mod => ({ default: mod.Modal })), { ssr: false });

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'Discover All' },
    { id: 'featured', label: 'Featured' },
    { id: 'latest', label: 'Latest' },
    { id: 'image', label: 'Images' },
    { id: 'video', label: 'Videos' },
    { id: 'audio', label: 'Audio' },
  ];

  const filteredItems = sampleItems.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return item.featured;
    if (activeFilter === 'latest') {
      const sortedItems = [...sampleItems].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return sortedItems.slice(0, 5).includes(item);
    }
    return item.type === activeFilter;
  });

  const handleNext = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const previousIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[previousIndex]);
  };

  return (
    <div className="relative min-h-screen bg-surface-50" ref={containerRef}>
      <Modal>
        <MenuButton />
      </Modal>
      
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className="sticky top-0 z-10"
      >
        <GalleryHero />
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === filter.id
                  ? 'bg-primary text-white'
                  : 'bg-surface-100 hover:bg-surface-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <GalleryItem
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>

      {selectedItem && (
        <MediaModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
} 