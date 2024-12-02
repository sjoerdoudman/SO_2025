<template>
    <div ref="screen" @dblclick="toggleFullscreen()"
        :class="[activeShowCase ? 'pointer-events-all opacity-100' : 'pointer-events-none opacity-0']"
        class="fixed z-[60] w-screen h-screen left-0 top-0 bg-yellow-200 duration-[.5s]">
        <div v-if="route.path !== '/livestream'">
            <div :class="[viewportActive ? 'opacity-100' : 'opacity-0']"
                class="z-[2] pointer-events-none absolute w-full h-full bg-gradient-to-bl from-black/30 right-0 top-0 duration-300">
            </div>
            <button v-if="!isFullscreen"
                :class="[viewportActive ? 'opacity-100 pointer-events-all translate-y-0' : 'opacity-0 pointer-events-none translate-y-3']"
                @click="updateActiveShowCase(null)"
                class="absolute z-[3] right-double-space bottom-double-space duration-300">
                <svg class="icon icon-fullscreen_exit w-8 h-8 fill-white">
                    <use xlink:href="#icon-fullscreen_exit"></use>
                </svg>
            </button>
        </div>
        <div :class="[viewportActive ? 'opacity-100' : 'opacity-0']"
            class="z-[2] pointer-events-none absolute w-full h-full bg-gradient-to-tr from-black/30 right-0 top-0 duration-300">
        </div>
        <div v-if="activeShowCase" :class="[viewportActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3']"
            class="absolute z-[3] left-0 bottom-0 p-double-space duration-300">
            <p class="h2" v-html="activeShowCase.author"></p>
            <p v-if="activeShowCase.lesson" v-html="listTitles(activeShowCase.lesson.specialization)"></p>
            <p v-html="listTitles(activeShowCase.years)"></p>
        </div>
        <div ref="visual" class="relative w-full h-full bg-dark flex items-center justify-center">
            <div v-if="video_id" :class="[orientation == 'portrait' ? 'aspect-portrait h-full' : 'aspect-video w-full']"
                class="w-full">
                <ElementsVideoPlayer :controls="false" :autoplay="true" :set_play="true" :set_muted="true"
                    :video_id="video_id">
                </ElementsVideoPlayer>
            </div>
            <figure v-else class="w-full h-full">
                <img v-if="image && !video_id" class="w-full h-full object-contain" :src="image.url" :alt="image.alt">
            </figure>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Image } from '@/types';
import { watch, ref, onMounted, onUnmounted } from 'vue';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const ui = useUIStore();
const { updateActiveShowCase } = ui;
const { activeShowCase, viewportActive } = storeToRefs(ui);
const video_id = ref<string | null | undefined>(null);
const image = ref<Image | null>(null);
const orientation = ref<string>('landscape');
const screen = ref<HTMLDivElement | null>(null);
const isFullscreen = ref<boolean>(false);

const windowOrientation = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const o = height > width ? 'portrait' : 'landscape';
    orientation.value = o
    return o;
}

const lockScroll = (lock: boolean) => {
    if (lock) {
        document.body.style.top = '-' + window.scrollY + 'px';
        document.body.style.position = 'fixed';
    } else {
        let scrollY = document.body.style.top;
        document.body.style.top = '';
        document.body.style.position = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
}

// Fullscreen toggle handler
const toggleFullscreen = () => {
    if (!screen.value) return;
    isFullscreen.value ? document.exitFullscreen() : screen.value.requestFullscreen()
};

watch(activeShowCase, (val) => {
    lockScroll(val !== null)
    if (!val) return
    windowOrientation()
    video_id.value = val.live_video_id && orientation.value == 'portrait' ? val.live_video_id : val.video_id
    image.value = val.live_image && orientation.value == 'portrait' ? val.live_image : val.image
})

const listTitles = (terms: any[]) => {
    const titles = terms.map(item => item.title);
    return titles.join()
}

const handleFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement;
};

onMounted(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
});

onUnmounted(() => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
});

</script>