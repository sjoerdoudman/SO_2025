import type { Specialization, Year, Image, Module, Lesson } from '@/types';
export interface showCase {
    id: string,
    live: boolean,
    image: Image,
    live_image?: Image,
    thumbnail?: Image,
    video_id?: string,
    live_video_id?: string,
    title: string,
    slug: string,
    intro?: string,
    author: string,
    years: Year[],
    modules?: Module[],
    lesson: Lesson
}