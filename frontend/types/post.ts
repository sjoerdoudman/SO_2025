import type { Module, Image } from '@/types';

export interface Post {
    id: string,
    title: {
        rendered: string,
    },
    content: {
        rendered: string,
    }
    slug: string,
    featured_media: Image,
    acf: {
        modules?: Module[],
    }
}