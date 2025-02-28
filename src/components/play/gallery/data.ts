import { GalleryItem } from './types';

export const sampleItems: GalleryItem[] = [
  {
    id: '2',
    type: 'image',
    title: 'Crystal Gardens',
    description: 'Ethereal crystalline formations with iridescent light refractions.',
    src: '/images/gen-ai-art/crystal-garden-3.jpg',
    thumbnail: '/images/gen-ai-art/crystal-garden-3.jpg',
    featured: true,
    date: '2024-03-15',
    tags: ['abstract', 'crystal', 'ethereal', 'featured'],
    dimensions: { width: 4, height: 4 },
    prompt: {
      text: "Macro photograph of crystal formations with ethereal lighting and iridescent reflections.",
      model: 'DALL-E'
    }
  },
  {
    id: '3',
    type: 'image',
    title: 'Neon Dreams',
    description: 'A cinematic view of a rain-soaked cyberpunk street at night.',
    src: '/images/gen-ai-art/neon-dreams-2.jpg',
    thumbnail: '/images/gen-ai-art/neon-dreams-2.jpg',
    date: '2024-03-15',
    tags: ['cityscape', 'cyberpunk', 'neon', 'night'],
    dimensions: { width: 4, height: 4 },
    prompt: {
      text: "Cinematic cyberpunk street scene at night with neon signs, rain, and reflective surfaces.",
      model: 'DALL-E'
    }
  },
  {
    id: '4',
    type: 'image',
    title: 'Zen Space',
    description: 'A minimalist meditation space that blends natural elements with modern design.',
    src: '/images/gen-ai-art/zen-space.png',
    featured: true,
    date: '2024-03-15',
    tags: ['interior', 'minimalist', 'featured'],
    dimensions: { width: 4, height: 5 },
    prompt: {
      text: "A minimalist zen meditation space with natural light streaming through large windows, featuring bamboo elements and a water feature.",
      model: 'DALL-E'
    }
  },
  {
    id: '5',
    type: 'image',
    title: 'Luxury Watch Editorial',
    description: 'High-end product photography capturing the essence of luxury timepieces.',
    src: '/images/gen-ai-art/watch-shoot.png',
    featured: true,
    date: '2024-03-14',
    tags: ['product', 'luxury', 'featured'],
    dimensions: { width: 4, height: 3 },
    prompt: {
      text: "Ultra-detailed luxury watch photography on marble surface with dramatic lighting and reflections.",
      model: 'DALL-E'
    }
  },
  {
    id: '6',
    type: 'image',
    title: 'Tennis in Motion',
    description: 'Dynamic sports photography capturing the intensity of tennis.',
    src: '/images/gen-ai-art/tennis-shoot.png',
    date: '2024-03-13',
    tags: ['sports', 'action'],
    dimensions: { width: 3, height: 4 },
    prompt: {
      text: "Professional tennis player mid-serve at golden hour, capturing the dynamic motion and intensity.",
      model: 'DALL-E'
    }
  },
  {
    id: '7',
    type: 'image',
    title: 'Pop Art Portrait',
    description: 'Contemporary pop art style portrait with vibrant colors.',
    src: '/images/gen-ai-art/pop-model.png',
    featured: true,
    date: '2024-03-12',
    tags: ['portrait', 'art', 'featured'],
    dimensions: { width: 4, height: 5 },
    prompt: {
      text: "Pop art style portrait with bold colors and graphic elements, inspired by contemporary fashion.",
      model: 'DALL-E'
    }
  },
  {
    id: '8',
    type: 'image',
    title: 'Luxury Perfume Store',
    description: 'High-end retail space design for luxury fragrances.',
    src: '/images/gen-ai-art/perfume-store.png',
    date: '2024-03-11',
    tags: ['interior', 'retail', 'luxury'],
    dimensions: { width: 16, height: 9 },
    prompt: {
      text: "Luxurious perfume store interior with glass displays, mood lighting, and premium finishes.",
      model: 'DALL-E'
    }
  },
  {
    id: '9',
    type: 'image',
    title: 'Modern Workspace',
    description: 'Contemporary desk setup with a focus on minimalism and productivity.',
    src: '/images/gen-ai-art/desk-top.png',
    date: '2024-03-10',
    tags: ['workspace', 'minimal'],
    dimensions: { width: 16, height: 9 },
    prompt: {
      text: "Modern minimalist desk setup with premium accessories and natural lighting.",
      model: 'DALL-E'
    }
  },
  {
    id: '10',
    type: 'image',
    title: 'Dance in Motion',
    description: 'Capturing the fluid movement and grace of contemporary dance.',
    src: '/images/gen-ai-art/dance-scene.png',
    date: '2024-03-09',
    tags: ['dance', 'motion', 'art'],
    dimensions: { width: 4, height: 5 },
    prompt: {
      text: "Contemporary dancer in motion, capturing the fluidity and grace of movement with fabric flow.",
      model: 'DALL-E'
    }
  },
  {
    id: '11',
    type: 'image',
    title: 'Architectural Vision',
    description: 'Modern architectural rendering with bold geometric forms.',
    src: '/images/gen-ai-art/archi-render.png',
    date: '2024-03-08',
    tags: ['architecture', 'modern'],
    dimensions: { width: 16, height: 9 },
    prompt: {
      text: "Modern architectural design with bold geometric forms, glass facades, and integrated greenery.",
      model: 'DALL-E'
    }
  }
]; 