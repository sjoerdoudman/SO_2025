import { useRuntimeConfig } from 'nuxt/app';
import { defineStore } from 'pinia';
// @ts-ignore
import { useFetch } from '#app'; //ignoring because it's not recognized while it works
import type { Page, Post } from '@/types';

// Define a cache map to store fetched data
const cache = new Map();

// Cache expiration time in milliseconds (e.g., 1 hour)
const CACHE_EXPIRATION_TIME = 3600000;


interface StoreState {
    api: any;
    timeOut: number;
    pages: Page[];
    posts: Post[];
}

export const useCMSStore = defineStore({
    id: 'cms-store',
    state: (): StoreState => {
        const api = useRuntimeConfig().public.apiBase;
        return {
            api: api,
            timeOut: 5000,
            pages: [
                {
                    id: '1',
                    title: 'Home',
                    slug: 'home',
                    intro: 'This is the intro for Home',
                    hero: null
                }
            ],
            posts: []    
        }
    },
    actions: {
        async fetchPages(params: object) {
            // const url = `${this.api}/collections/pages/entries?fields=id,title,slug,image,video_id,url,permalink,api_url,intro,rows,general,contacts,socials,address,seo_title,seo_description,og_data`;
            // await this.fetchListWithCache('pages', url)
        },
        async fetchPosts(params: object) {
            const url = `${this.api}/wp/v2/posts?per_page=10`;
            console.log(url);
            await this.fetchListWithCache('posts', url)
        },

        // Cache handling methods
        async fetchListWithCache(listKey: keyof StoreState, url: string) {
            // console.log(listKey);
            // console.log(this[listKey] + 'and' + this[listKey].length);
            const { data }: any = await useFetch(url, {
                timeout: this.timeOut
            });
            if (data.value) {
                this[listKey] = data.value;
            }
            return;


            if (this[listKey] == undefined || this[listKey].length === 0) {
                const cachedData = this.getCache(url);
                if (cachedData) {
                    this[listKey] = cachedData;
                } else {
                    // console.log(url);
                    try {
                        const { data }: any = await useFetch(url, {
                            timeout: this.timeOut
                        });
                        if (data.value) {
                            this[listKey] = data.value.data;
                            this.setCache(url, this[listKey]);
                        }
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
            }
        },
        setCache(key: string, value: Page[]) {
            cache.set(key, { value, timestamp: Date.now() });
        },
        getCache(key: string) {
            const cached = cache.get(key);
            if (cached) {
                const isExpired = (Date.now() - cached.timestamp) > CACHE_EXPIRATION_TIME;
                if (!isExpired) {
                    return cached.value;
                } else {
                    cache.delete(key);
                }
            }
            return null;
        },
        clearExpiredCache() {
            const now = Date.now();
            cache.forEach((value, key) => {
                if ((now - value.timestamp) > CACHE_EXPIRATION_TIME) {
                    cache.delete(key);
                }
            });
        }
    }
})