<template>
    <div :class="[darkMode ? 'bg-dark' : 'bg-light']" class="relative z-10 pt-[60px] pb-double-space">
        <ElementsContainer class="w-full pb-single-space grid grid-cols-4 gap-single-space">
            <div class="paragraph col-span-3 flex flex-col gap-single-space">
                <header class="grid gap-quarter-space">
                    <div class="flex w-full gap-3">
                        <h1 class="p font-semibold">Journal</h1>
                        <span class="p">-</span>
                        <span class="p">Though of the day:</span>
                    </div>
                    <h2 class="h1">
                        I <em>wish</em> to have a happy <em>client</em>
                    </h2>
                </header>
                <article class="relative grid gap-half-space overflow-y-hidden group/newsitem">
                    <div class="absolute w-3 h-3 rotate-45 top-0 left-6 -translate-y-[150%] group-hover/newsitem:-translate-y-1/2 duration-300"
                        :style="{ background: themeColor }"></div>
                    <div class="absolute w-3 h-3 rotate-45 bottom-0 left-6 translate-y-[150%] group-hover/newsitem:translate-y-1/2 duration-300"
                        :style="{ background: themeColor }"></div>
                    <hr class="border-dotted border-b-2 border-dotted opacity-20" :style="{ borderColor: themeColor }">
                    <nuxt-link to="/" class="flex w-full items-center gap-half-space">
                        <figure class="w-[100px] group-hover/newsitem:scale-[1.05] aspect-square duration-300">
                            <LayoutIconsClientCat></LayoutIconsClientCat>
                        </figure>
                        <div>
                            <p>Hey, can I ask you a simple question?</p>
                            <h3 class="mt-quarter-space font-semibold">Can I have one website? How much will that be
                                please?</h3>
                        </div>
                    </nuxt-link>
                    <hr class="border-dotted border-b-2 border-dotted opacity-20" :style="{ borderColor: themeColor }">
                </article>
                <div class="grid gap-single-space grid-cols-3">
                    <JournalTeaser v-for="(post, index) in posts" :key="index" :post="post"></JournalTeaser>
                </div>
            </div>
        </ElementsContainer>
    </div>
</template>

<script setup lang="ts">
// Import the necessary functions
// import type { Page } from '@/types';
import { onMounted } from 'vue';
// import { useCMSStore } from '@/store/cms';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
import posts from '@/assets/json/posts.json';

// const store = useCMSStore();
// const { pages } = storeToRefs(store);

const ui = useUIStore();
const { toggleJournalCat } = ui;
const { darkMode, themeColor } = storeToRefs(ui);

onMounted(() => {
    toggleJournalCat(true);
});
</script>