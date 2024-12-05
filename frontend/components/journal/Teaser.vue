<template>
    <nuxt-link :to="`/journal/${post.slug}`"
        class="relative border-b-2 border-dotted border-opacity-10 pb-half-space group/newsitem overflow-hidden"
        :style="{ borderColor: $hexToRgba(themeColor, .2) }">
        <figure class="aspect-video bg-yellow-200 overflow-hidden">
            <img :src="post.featured_image.sizes.md" :alt="post.featured_image.alt"
                class="object-center object-cover duration-200 group-hover/newsitem:duration-[2s] group-hover/newsitem:scale-[1.1]">
        </figure>
        <h3 class="h5 font-semibold mt-quarter-space" v-text="post.title"></h3>
        <div class="absolute w-3 h-3 rotate-45 bottom-0 left-1/2 -translate-y-1/2 translate-y-[150%] group-hover/newsitem:translate-y-1/2 duration-300"
            :style="{ background: themeColor }"></div>
    </nuxt-link>
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