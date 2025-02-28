// Gallery Page - Updated for Vercel deployment
"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MenuButton } from '@/components/homepage/MenuButton';
import { Modal } from '@/components/ui/animated-modal';
import { GalleryItem } from '@/components/gallery/GalleryItem';
import { MediaModal } from '@/components/gallery/MediaModal';
import { GalleryHero } from '@/components/gallery/GalleryHero';

type MediaType = 'image' | 'video' | 'audio';
type FilterType = 'all' | MediaType | 'featured' | 'latest';

interface GalleryItem {
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

// Sample data - replace with your actual data
const sampleItems: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    title: 'Ethereal Dreamscape',
    description: 'An AI-generated landscape merging natural and surreal elements, exploring the boundaries between reality and imagination.',
    src: '/images/gallery/ethereal-dreamscape.jpg',
    featured: true,
    date: '2024-03-15',
    tags: ['landscape', 'surreal', 'ethereal', 'featured'],
    dimensions: { width: 4, height: 5 },
    prompt: {
      text: "Create a surreal landscape at golden hour where reality seamlessly blends with imagination. Include floating islands with waterfalls that defy gravity, bioluminescent flora that emits soft ethereal light, and a sky filled with multiple moons of different colors. Maintain photorealistic textures while incorporating impossible architectural elements that seem to grow organically from the terrain. Use a color palette dominated by deep purples, teals, and warm golds.",
      model: 'DALL-E'
    }
  },
  {
    id: '2',
    type: 'video',
    title: 'Digital Evolution',
    description: 'A mesmerizing journey through digital transformation, showcasing the evolution of AI-generated art through motion.',
    src: '/videos/digital-evolution.mp4',
    thumbnail: '/images/gallery/digital-evolution-thumb.jpg',
    date: '2024-03-14',
    tags: ['animation', 'abstract', 'technology'],
    prompt: {
      text: "Generate a 15-second cinematic sequence showing the evolution of digital art. Begin with simple wireframes that gradually transform into complex 3D structures. Incorporate fluid particle systems that morph between organic and geometric forms. Use a dramatic camera movement that starts wide and slowly zooms in to reveal intricate details. Color progression should flow from monochromatic blues to a vibrant spectrum of digital hues.",
      model: 'Sora'
    }
  },
  {
    id: '3',
    type: 'image',
    title: 'Neon Dreams',
    description: 'A hyper-detailed cyberpunk cityscape at night, where neon lights paint the rain-slicked streets in a symphony of colors.',
    src: '/images/gallery/neon-dreams-2.jpg',
    additionalImages: [
      '/images/gallery/neon-dreams-1.jpg',
      '/images/gallery/neon-dreams-3.jpg',
      '/images/gallery/neon-dreams-4.jpg'
    ],
    date: '2024-03-14',
    tags: ['cityscape', 'cyberpunk', 'night'],
    dimensions: { width: 1, height: 1 },
    prompt: {
      text: "Create a hyper-detailed cyberpunk cityscape at night during heavy rain. Massive skyscrapers adorned with holographic advertisements and neon signs in Japanese and English. Rain-slicked streets reflecting the vibrant lights above. Include floating vehicles with red taillights creating light trails. Atmosphere should be moody with volumetric lighting cutting through the rain. Style: cinematic photography with emphasis on reflections and atmospheric effects.",
      model: 'DALL-E'
    }
  },
  {
    id: '4',
    type: 'audio',
    title: 'Neural Symphony',
    description: 'AI-generated musical composition exploring emotional landscapes through algorithmic harmony.',
    src: '/audio/neural-symphony.mp3',
    date: '2024-03-12',
    featured: true,
    tags: ['music', 'experimental', 'ambient'],
    prompt: {
      text: "Compose a 3-minute ambient electronic piece that evolves through distinct emotional states. Start with minimal piano notes over atmospheric pads, gradually introducing generative percussion at 60 BPM. Layer in synthesized textures inspired by neural network patterns, incorporating binaural beats at 432 Hz. Build to a climax using granular synthesis, then deconstruct to ethereal soundscapes. Key signature: A minor. Include subtle field recordings of rain and wind throughout.",
      model: 'Suno'
    }
  },
  {
    id: '5',
    type: 'image',
    title: 'Crystal Gardens',
    description: 'A mesmerizing exploration of light refraction through crystalline structures in an otherworldly garden setting.',
    src: '/images/gallery/crystal-garden-1.jpg',
    additionalImages: [
      '/images/gallery/crystal-garden-2.jpg',
      '/images/gallery/crystal-garden-3.jpg',
      '/images/gallery/crystal-garden-4.jpg'
    ],
    date: '2024-03-11',
    tags: ['abstract', 'nature', 'light'],
    dimensions: { width: 1, height: 1 },
    prompt: {
      text: "Create a macro photograph of an impossible garden where every plant is made of pure crystal. Capture the way light refracts through translucent leaves and petals, creating rainbow prisms and light patterns. Include dewdrops that act as tiny lenses, multiplying the light effects. Use a color palette of clear quartz, amethyst, and rose quartz. Style: photorealistic macro photography with emphasis on light and transparency.",
      model: 'Midjourney'
    }
  },
  {
    id: '6',
    type: 'video',
    title: 'Ocean Dreams',
    description: 'A mesmerizing dance of bioluminescent creatures in the deep ocean, creating natural light shows.',
    src: '/videos/fluid-dynamics.mp4',
    thumbnail: '/images/gallery/fluid-thumb.jpg',
    featured: true,
    date: '2024-03-10',
    tags: ['nature', 'ocean', 'light'],
    prompt: {
      text: "Create a 20-second video of bioluminescent sea creatures performing a mesmerizing dance in the deep ocean. Show various species with different colored bioluminescence - blues, greens, and purples - moving in synchronized patterns. Include gentle currents that make their movements flow naturally. Camera should slowly drift through the scene, revealing new layers of the performance. Add subtle particle effects for plankton and underwater debris.",
      model: 'Sora'
    }
  },
  {
    id: '7',
    type: 'image',
    title: 'Floating Islands',
    description: 'A whimsical series of floating islands inspired by Studio Ghibli, each with its own unique ecosystem.',
    src: '/images/gallery/botanical-ai.jpg',
    date: '2024-03-09',
    tags: ['fantasy', 'nature', 'whimsical'],
    dimensions: { width: 3, height: 4 },
    prompt: {
      text: "Create a series of floating islands in a soft, pastel sky, inspired by Studio Ghibli's art style. Each island should have its own miniature ecosystem - one with cherry blossoms and small streams, another with windmills and tall grass, and a third with tiny cottages and vegetable gardens. Include small flying creatures connecting the islands. Use a warm, inviting color palette with soft shadows and glowing edges. Style: painted animation art with attention to small, charming details.",
      model: 'Midjourney'
    }
  },
  {
    id: '8',
    type: 'audio',
    title: 'Forest Symphony',
    description: 'An ambient musical journey through a magical forest, blending natural sounds with ethereal melodies.',
    src: '/audio/digital-rainforest.mp3',
    date: '2024-03-08',
    tags: ['ambient', 'nature', 'peaceful'],
    prompt: {
      text: "Compose a 5-minute ambient track that takes listeners on a journey through a magical forest. Layer recordings of birdsong, rustling leaves, and distant streams with soft synthesizer pads and gentle piano melodies. Gradually introduce wind chimes and crystal bowl sounds that complement the natural elements. Create a peaceful progression from dawn ambience to midday brightness. Include spatial audio elements that make listeners feel surrounded by the forest.",
      model: 'Suno'
    }
  },
  {
    id: '9',
    type: 'image',
    title: 'Aurora Dreams',
    description: 'A stunning visualization of the northern lights dancing above a crystalline landscape.',
    src: '/images/gallery/cybernetic-sunset.jpg',
    featured: true,
    date: '2024-03-07',
    tags: ['nature', 'night', 'atmospheric'],
    dimensions: { width: 16, height: 9 },
    prompt: {
      text: "Create a wide-angle landscape of the northern lights dancing above a winter scene. Show massive auroral curtains in vibrant greens and purples reflecting off a frozen lake surface. Include crystalline ice formations in the foreground catching and refracting the aurora's light. Add stars visible through the thinner parts of the aurora, and snow-covered pine trees silhouetted against the illuminated sky. Style: photorealistic with emphasis on light and color dynamics.",
      model: 'DALL-E'
    }
  },
  {
    id: '10',
    type: 'video',
    title: 'Blooming Time',
    description: 'A mesmerizing timelapse of impossible flowers blooming in vibrant colors.',
    src: '/videos/pattern-recognition.mp4',
    thumbnail: '/images/gallery/pattern-thumb.jpg',
    date: '2024-03-06',
    tags: ['nature', 'timelapse', 'color'],
    prompt: {
      text: "Generate a 30-second timelapse video of impossible flowers blooming. Show flowers with petals that change color as they open, releasing glowing pollen that dances in the air. Include multiple varieties blooming in sequence, each with unique patterns and color transitions. Use a dark background to make the colors pop, and add subtle light rays filtering through the scene. Camera should smoothly move around the flowers as they bloom.",
      model: 'Sora'
    }
  },
  {
    id: '11',
    type: 'image',
    title: 'Cloud Cities',
    description: 'Imaginative floating cities nestled within and shaped by the clouds themselves.',
    src: '/images/gallery/neural-architecture.jpg',
    date: '2024-03-05',
    tags: ['architecture', 'fantasy', 'clouds'],
    dimensions: { width: 4, height: 3 },
    prompt: {
      text: "Design a city that exists within and is shaped by clouds at sunset. Create buildings that seem to be formed from the clouds themselves, with spires that twist up into the sky and bridges of mist connecting different districts. Include areas where the clouds part to reveal gardens floating in the air. Use a color palette of warm sunset oranges and pinks in the clouds, contrasting with the cooler blue-white of the cloud-buildings. Style: painterly with soft edges and atmospheric perspective.",
      model: 'Midjourney'
    }
  },
  {
    id: '12',
    type: 'image',
    title: 'Sacred Geometry',
    description: 'An exploration of mathematical beauty through natural patterns and sacred geometry.',
    src: '/images/gallery/quantum-garden.jpg',
    featured: true,
    date: '2024-03-04',
    tags: ['abstract', 'geometry', 'nature'],
    dimensions: { width: 1, height: 1 },
    prompt: {
      text: "Create an abstract composition based on sacred geometry found in nature. Center the image on a Fibonacci spiral made of small, intricate mandalas. Have the spiral unfold into patterns inspired by honeycomb structures, nautilus shells, and fern fronds. Use a color palette inspired by mother of pearl and precious metals. Include subtle fractals that emerge as you look closer at the details. Style: precise geometric patterns with organic flowing elements.",
      model: 'DALL-E'
    }
  }
];

export default function GalleryPage() {
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
    <>
      <Modal>
        <MenuButton />
      </Modal>
      
      <main className="min-h-screen bg-surface-50">
        <GalleryHero />

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
                    onClick={() => setActiveFilter(filter.id)}
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
                onClick={() => setActiveFilter(filter.id)}
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

        {/* Main Gallery Section */}
        <section className="py-24 px-4 md:px-6" ref={containerRef}>
          <div className="max-w-[2000px] mx-auto">
            {/* Featured Section - Only shown in 'all' or 'featured' filter */}
            {(activeFilter === 'all' || activeFilter === 'featured') && (
              <div className="mb-16">
                <h2 className="text-2xl font-serif mb-8">Featured Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sampleItems
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
                          onClick={() => setSelectedItem(item)}
                          featured={item.featured}
                          dimensions={item.dimensions}
                          prompt={item.prompt}
                        />
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

            {/* Main Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px]">
              {filteredItems
                .filter(item => {
                  // Don't show featured items in main grid when in 'all' view to avoid duplicates
                  if (activeFilter === 'all' && item.featured) return false;
                  // Show all items when in featured view
                  if (activeFilter === 'featured') return item.featured;
                  // Show all filtered items for other views
                  return true;
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
                        onClick={() => setSelectedItem(item)}
                        featured={item.featured}
                        dimensions={item.dimensions}
                        prompt={item.prompt}
                      />
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </section>

        {/* Media Modal */}
        <MediaModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onNext={currentIndex < filteredItems.length - 1 ? handleNext : undefined}
          onPrevious={currentIndex > 0 ? handlePrevious : undefined}
        />
      </main>
    </>
  );
} 