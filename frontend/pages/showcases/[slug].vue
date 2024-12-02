<template>
    <main v-if="currentShowcase">
        <div ref="hero" class="relative z-10 bg-dark">
            <div v-if="currentShowcase.video_id">
                <ElementsVideoPlayer :controls="true" :autoplay="false" :set_play="false" :set_muted="false"
                    :video_id="currentShowcase.video_id">
                    <template #navigation>
                        <ShowCaseNav :showCase="currentShowcase"></ShowCaseNav>
                    </template>
                    <template #fullscreen>
                        <button @click="updateActiveShowCase(currentShowcase)">
                            <svg class="icon icon-fullscreen fill-white w-8 h-8">
                                <use xlink:href="#icon-fullscreen"></use>
                            </svg>
                        </button>
                    </template>
                </ElementsVideoPlayer>
            </div>
            <div v-else>
                <figure v-if="currentShowcase.image && !currentShowcase.video_id" class="aspect-video overflow-hidden">
                    <img class="object-cover object-center min-w-full min-h-full" :src="currentShowcase.image.url"
                        :alt="currentShowcase.image.alt">
                </figure>
                <div ref="controls">
                    <div class="container-md mt-half-space flex gap-single-space items-start">
                        <div class="flex-1 gap-half-space flex items-center">
                            <ShowCaseNav :showCase="currentShowcase"></ShowCaseNav>
                        </div>
                        <button @click="updateActiveShowCase(currentShowcase)">
                            <svg class="icon icon-fullscreen fill-white w-8 h-8">
                                <use xlink:href="#icon-fullscreen"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative bg-dark z-10 py-single-space mb-[100vh]">
            <div class="container-md text-white italic">
                <header class="flex">
                    <div class="flex-1">
                        <p class="h2" v-html="currentShowcase.author"></p>
                        <p v-if="currentShowcase.lesson" v-html="listTitles(currentShowcase.lesson.specialization)"></p>
                        <p v-html="listTitles(currentShowcase.years)"></p>
                    </div>
                    <div v-if="currentShowcase.live">
                        <button class="px-4 py-2 bg-glr text-dark mt-1 animation--blink text-sm">
                            ON AIR
                        </button>
                    </div>
                </header>
                <div v-if="currentShowcase.intro" class="content-column paragraph mt-half-space">
                    <p v-html="currentShowcase.intro"></p>
                </div>
            </div>
            <LayoutModules v-if="currentShowcase.modules" :items="currentShowcase.modules"></LayoutModules>
        </div>
        <ModulesShowCases></ModulesShowCases>
    </main>
</template>

<script setup lang="ts">
import type { showCase } from '@/types';
import { ref } from 'vue';
import { useRoute } from 'nuxt/app';
import { useCMSStore } from '@/store/cms';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

const route = useRoute();
const store = useCMSStore();
const { showCases } = storeToRefs(store);
const ui = useUIStore();
const { updateActiveShowCase } = ui;
const currentShowcase = ref<showCase | null>(null);

const init = async () => {
    const showcase = showCases.value.find((showCase: showCase) => showCase.slug === route.params.slug);
    if (showcase) {
        currentShowcase.value = showcase;
    }
}

const listTitles = (terms: any[]) => {
    const titles = terms.map(item => item.title);
    return titles.join()
}

init();
</script>