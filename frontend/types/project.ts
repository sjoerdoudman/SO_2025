import type { Image, Slide } from '@/types';

interface Paragraph {
    type: string,
    text: string
}

export interface Project {
    client: string,
    url?: string,
    year: string,
    type: string
    stack?: string,
    title: string,
    slug: string,
    excerpt?: string,
    featured_image: Image,
    paragraphs?: Paragraph[],
    slides?: Slide[],
    svg?: {
        viewbox: string,
        contents: string
    }
}