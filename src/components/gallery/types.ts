export type MediaType = 'image' | 'video' | 'audio';
export type FilterType = 'all' | MediaType | 'featured' | 'latest';

export interface GalleryItem {
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

export interface GalleryItemProps {
  item: GalleryItem;
  onClick: () => void;
}

export interface MediaModalProps {
  item: GalleryItem;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
} 