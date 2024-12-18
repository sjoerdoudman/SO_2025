<template>
    <main v-if="currentPost" class="pb-double-space">
        <div 
            ref="readthrough"  
            class="fixed z-[40] w-full left-0 top-[60px] md:top-[60px]"
            :style="{ borderColor: themeColor }" 
        >
            <ElementsContainer>
                <div class="border-b-2 border-dashed duration-100" :style="{ borderColor : themeColor, width : `${scrollPercentage}%` }"></div>
            </ElementsContainer>
        </div>
        <div ref="dialogue"
            :class="[showSink ? 'top-[calc(144px+2vw+.8vh+.8rem)] duration-[.5s]' : 'top-[calc(80px+2vw+.8vh+.8rem)] duration-[.6s]']"
            class="hidden md:block fixed w-screen left-0 z-20">
            <ElementsContainer class="flex justify-between">
                <LayoutIconsClientCat class="w-10 -left-full md:left-0"></LayoutIconsClientCat>
                <LayoutIconsDeveloperCat class="w-10"></LayoutIconsDeveloperCat>
            </ElementsContainer>
        </div>
        <ElementsContainer size="small" class="mt-single-space w-full grid gap-half-space mb-single-space">
            <p v-scroll="onScroll" class="client"><em>Hey, can I ask you a simple question?</em></p>
            <figure class="aspect-video w-full">
                <img :src="currentPost.featured_media.sizes.lg" :srcset="currentPost.featured_media.srcset" :alt="currentPost.title.rendered" class="w-full h-auto" />
            </figure>
            <h1 v-scroll="onScroll" class="h2 client"><em v-html="currentPost.title.rendered"></em></h1>
            <div v-scroll="onScroll" class="intro developer"
                v-html="currentPost.content.rendered">
            </div>
            <hr class="border-dotted border-b-2 border-dotted opacity-20 mt-half-space" :style="{ borderColor: themeColor }">
        </ElementsContainer>
        <div class="grid gap-single-space">
            <LayoutModules v-if="currentPost.acf" :items="currentPost.acf.modules"></LayoutModules>
        </div>
        <ElementsContainer size="small" class="mt-single-space w-full grid gap-half-space mb-single-space">
            <div class="flex items-center cursor-pointer" @click="backToOverview">
                <svg class="icon icon-arrow-left fill-current w-4 h-4 ease-in-out duration-300 mr-2" style="transition-property: transform, opacity" :class="[ !isTransitioning ? '' : 'opacity-0 translate-x-2' ]"><use xlink:href="#icon-arrow-left"></use></svg>
                <p class="ease-in-out duration-300 delay-100" style="transition-property: transform, opacity" :class="[ !isTransitioning ? '' : 'opacity-0 translate-x-2' ]">back to overview</p>
            </div>
        </ElementsContainer>
        <!-- Here will be suggeted posts -->
        <!-- <div class="mt-double-space">
            <ElementsContainer size="small" class="paragraph">
                <h2 class="p font-400">You can handle some more right?</h2>
                <ul class="mt-half-space grid gap-half-space">
                    <li>
                        <article class="relative grid gap-half-space overflow-y-hidden group/newsitem">
                            <div class="absolute w-3 h-3 rotate-45 top-0 left-6 -translate-y-[150%] group-hover/newsitem:-translate-y-1/2 duration-300"
                                :style="{ background: themeColor }"></div>
                            <div class="absolute w-3 h-3 rotate-45 bottom-0 left-6 translate-y-[150%] group-hover/newsitem:translate-y-1/2 duration-300"
                                :style="{ background: themeColor }"></div>
                            <hr class="border-dotted border-b-2 border-dotted opacity-20"
                                :style="{ borderColor: themeColor }">
                            <nuxt-link to="/" class="flex w-full items-center gap-half-space">
                                <figure class="w-[100px] group-hover/newsitem:scale-[1.05] aspect-square duration-300">
                                    <LayoutIconsClientCat></LayoutIconsClientCat>
                                </figure>
                                <div>
                                    <p>Hey, can I ask you a simple question?</p>
                                    <h3 class="mt-quarter-space font-semibold">Can I have one website? How much will
                                        that be
                                        please?</h3>
                                </div>
                            </nuxt-link>
                            <hr class="border-dotted border-b-2 border-dotted opacity-20"
                                :style="{ borderColor: themeColor }">
                        </article>
                    </li>
                </ul>
            </ElementsContainer>
        </div> -->
    </main>
</template>

<script setup lang="ts">
// import posts from '@/assets/json/posts.json';
import { useScrollWatcher } from '@/composables/dialogueScrollWatcher';
import type { Post } from '@/types';
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'nuxt/app';
import { useCMSStore } from '@/store/cms';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

// import { ref, DirectiveBinding, defineComponent } from 'vue';
const store = useCMSStore();
const ui = useUIStore();
const { posts } = storeToRefs(store);
const { updateCatDialogue } = ui;
const { showSink, themeColor, isTransitioning } = storeToRefs(ui);
const route = useRoute();
const router = useRouter();
const dialogue = ref<HTMLElement | null>(null);
const currentPost = ref<Post | null | undefined>(null);
// const currenScrollListener = ref<HTMLElement | null>(null);
const { onScroll } = useScrollWatcher();
const scrollPercentage = ref(0);

const onInit = async () => {
    if (posts.value.length) {
        currentPost.value = posts.value.find((post) => post.slug === route.params.slug);
    }
};

const scrollThrough = () => {
    // get the percatage of the scroll
    const scroll = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    scrollPercentage.value = Math.round((scroll / height) * 100);
};

const backToOverview = () => {
    setTimeout(() => {
        router.push('/journal');
    }, 300);
};

onMounted(() => {
    updateCatDialogue(dialogue.value);
    addEventListener('scroll', scrollThrough);
});

onUnmounted(() => {
    updateCatDialogue(null);
    removeEventListener('scroll', scrollThrough);
});

onInit();

</script>