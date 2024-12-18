<template>
    <article @click="openProject(project)"
        class="cursor-pointer aspect-video relative ease-in-out duration-500 group/project"
        :class="[show ? '' : 'opacity-0 translate-x-2']" :style="{ transitionDelay: `${index * 100}ms` }">
        <div class="absolute left-0 top-0 w-full h-full p-6">
            <div class="flex flex-col h-full pb-8">
                <p class="h-12 text-sm" v-html="project.excerpt"></p>
            </div>
        </div>
        <figure :style="{ backgroundColor: themeColor }" class="hover:!bg-transparent">
            <img :src="project.featured_image.sizes.md"
                class="object-cover grayscale group-hover/project:grayscale-0 mix-blend-multiply group-hover/project:mix-blend-normal duration-300"
                :alt="project.featured_image.alt">
        </figure>
    </article>
</template>

<script setup lang="ts">
import { useRouter } from 'nuxt/app';
import { defineProps } from 'vue';
import { gsap } from 'gsap';
import { useUIStore } from '@/store/ui';
import type { Project } from '@/types';
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const router = useRouter();
const ui = useUIStore();
const { toggleIsTransitioning } = ui;
const { themeColor } = storeToRefs(ui);
const props = defineProps<{
    project: Project;
    index: number;
    show: boolean;
}>();

const openProject = (project: any) => {
    const url = `/projects/${project.slug}`;
    toggleIsTransitioning(true);
    setTimeout(() => {
        router.push(url);
    }, 500);
};
</script>