import type { Paragraph, Image, Slide } from '@/types';

export interface Project {
    id: string,
    title: string,
    slug: string,
    excerpt?: string,
    paragraphs?: Paragraph[],
    stack?: string,
    featured_image: Image,
    slides?: Slide[],
    svg?: {
        viewbox: string,
        contents: string
    }
}