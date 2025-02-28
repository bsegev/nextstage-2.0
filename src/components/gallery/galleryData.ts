import type { GalleryItem } from './types';

export const sampleItems: GalleryItem[] = [
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
  }
]; 