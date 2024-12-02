import type { Image } from '@/types'
interface ListItem {
    title: string;
    content?: string;
    url?: string;
}

interface Paragraph {
    type: string;
    content?: string;
    listItems?: ListItem[];
}

export interface Module {
    type: string;
    item: {
        title?: string;
        image?: Image;
        paragraphs?: Paragraph[];
    };
}