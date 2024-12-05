import type { Image } from '@/types';

export interface Slide {
    id: number,
    caption: string,
    url: string,
    img: Image
}