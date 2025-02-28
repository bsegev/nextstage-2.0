"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { FilterType, GalleryItem } from '@/components/play/gallery/types';
import { sampleItems } from '@/components/play/gallery/data';

// Dynamic imports for components that use browser APIs
const MenuButton = dynamic(() => import('@/components/homepage/MenuButton').then(mod => ({ default: mod.MenuButton })), { ssr: false });
const Modal = dynamic(() => import('@/components/ui/animated-modal').then(mod => ({ default: mod.Modal })), { ssr: false });
const MediaModal = dynamic(() => import('@/components/gallery/MediaModal').then(mod => ({ default: mod.MediaModal })), { ssr: false });
const GalleryHero = dynamic(() => import('@/components/gallery/GalleryHero').then(mod => ({ default: mod.GalleryHero })), { ssr: false });
const GalleryHeader = dynamic(() => import('@/components/play/gallery/GalleryHeader').then(mod => ({ default: mod.GalleryHeader })), { ssr: false });
const GalleryGrid = dynamic(() => import('@/components/play/gallery/GalleryGrid').then(mod => ({ default: mod.GalleryGrid })), { ssr: false });

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = sampleItems.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return item.featured;
    if (activeFilter === 'latest') {
      // Get the 5 most recent items
      const sortedItems = [...sampleItems].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return sortedItems.slice(0, 5).some(i => i.id === item.id);
    }
    return item.type === activeFilter;
  });

  const currentIndex = selectedItem ? filteredItems.findIndex(item => item.id === selectedItem.id) : -1;

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedItem(filteredItems[currentIndex - 1]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Modal>
        <MenuButton />
      </Modal>
      
      <main className="min-h-screen bg-surface-50">
        <Suspense fallback={<div className="min-h-screen bg-surface-50" />}>
          <GalleryHero />
          <GalleryHeader 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          <GalleryGrid 
            items={filteredItems}
            activeFilter={activeFilter}
            onItemClick={setSelectedItem}
          />
          <MediaModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onNext={currentIndex < filteredItems.length - 1 ? handleNext : undefined}
            onPrevious={currentIndex > 0 ? handlePrevious : undefined}
          />
        </Suspense>
      </main>
    </motion.div>
  );
} 