import type { Image, Specialization, Year, Skill, Download } from '@/types';
export interface Lesson {
    id: string,
    title: string,
    slug: string,
    intro?: string,
    image?: Image,
    video_id?: string,
    year: Year[],
    specialization: Specialization[],
    skill: Skill[],
    downloads?: Download[]
}