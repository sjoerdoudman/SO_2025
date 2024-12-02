import type { Hero, Module } from '@/types';

export interface Page {
    id: string,
    title: string,
    slug: string,
    intro?: string
    hero?: Hero | null,
    modules?: Module[]
}