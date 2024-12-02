<template>
    <div :class="[show ? 'opacity-100' : 'opacity-0']"
        class="bg-dark pointer-events-none relative w-screen aspect-video flex items-center justify-center z-1 overflow-hidden">
        <div ref="visual" class="fixed left-0 top-0 w-full aspect-video" :style="{ opacity: visualOpacity }">
            <div v-if="video_id" class="z-[2] absolute aspect-video left-1/2 -translate-x-1/2 min-w-full">
                <ElementsVideoPlayer :controls="false" :autoplay="true" :video_id="video_id"></ElementsVideoPlayer>
            </div>
            <div v-if="image && image.url !== ''" class="z-[1] absolute left-1/2 -translate-x-1/2 min-w-full">
                <img :src="image.url" :alt="image.alt" class="object-cover w-full h-full">
                {{ image.url }}
            </div>
        </div>
        <div class="absolute bottom-0 w-full h-[25%] bg-gradient-to-t from-dark"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
// props
const props = defineProps({
    image: {
        type: Object,
        required: false
    },
    video_id: {
        type: String,
        required: false
    }
});

// Calculate opacity based on scroll position
const calculateOpacity = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Adjust the opacity based on scroll progress (0 at top, decreasing to 0 at the height of the window)
    const progress = Math.min(scrollY / (windowHeight / 1.5), 1);
    visualOpacity.value = 1 - (Math.round(progress * 100) / 100);
};

const show = ref(false);
const visualOpacity = ref(1);
const ticking = ref(false);

const handleScroll = () => {
    if (!ticking.value) {
        window.requestAnimationFrame(() => {
            calculateOpacity();
            ticking.value = false;
        });
        ticking.value = true;
    }
    show.value = window.scrollY <= window.innerHeight;
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    setTimeout(() => {
        show.value = true;
    }, 1000);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
})
</script>