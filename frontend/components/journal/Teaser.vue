<template>
    <article class="cursor-pointer relative border-b-2 border-dotted border-opacity-10 pb-half-space group/newsitem overflow-hidden"
        :style="{ borderColor: $hexToRgba(themeColor, .2) }">
        <figure class="aspect-video bg-yellow-200 overflow-hidden">
            
            <img :src="post.featured_media.sizes.md" :alt="post.featured_media.alt" :srcset="post.featured_media.srcset"
                class="object-center object-cover min-w-full min-h-full duration-200 group-hover/newsitem:duration-[2s] group-hover/newsitem:scale-[1.1]"/>
        </figure>
        <h3 class="h5 font-semibold mt-quarter-space" v-text="post.title?.rendered"></h3>
        <div class="absolute w-3 h-3 rotate-45 bottom-0 left-1/2 -translate-y-1/2 translate-y-[150%] group-hover/newsitem:translate-y-1/2 duration-300"
            :style="{ background: themeColor }"></div>
    </article>
</template>

<script setup lang="ts">
import { useUIStore } from '@/store/ui';
import { useNuxtApp } from 'nuxt/app';
import type { Post } from '@/types';
import { storeToRefs } from 'pinia';
const { $hexToRgba } = useNuxtApp() as any;
const ui = useUIStore();
const { themeColor } = storeToRefs(ui);

const props = defineProps<{
    post: Post;
}>();
</script>