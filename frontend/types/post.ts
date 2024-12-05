import type { Paragraph, Image } from '@/types';

export interface Post {
    id: string,
    title: string,
    slug: string,
    featured_image: Image,
    paragraphs?: Paragraph[],
}