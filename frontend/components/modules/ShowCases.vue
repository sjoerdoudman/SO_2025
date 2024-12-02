<template>
    <section :class="[show ? 'bg-glr pointer-events-all opacity-1' : 'opacity-0 pointer-events-none bg-dark']"
        class="fixed w-full left-0 bottom-0 z-[2] text-dark pt-single-space overflow-hidden transition-colors duration-[2s]">
        <div class="container-md">
            <div class="relative w-full text-dark h-screen flex items-center">
                <div class="relative w-full z-10">
                    <h2 class="text-dark">Student showcases</h2>
                    <div class="mt-half-space h-full gap-half-space">
                        <div class="flex justify-between">
                            <button
                                class="h2 text-dark cursor-pointer outline-none opacity-80 hover:opacity-100 duration-200"
                                @click="navigate(-1)">←</button>
                            <button
                                class="h2 text-dark cursor-pointer outline-none opacity-80 hover:opacity-100 duration-200"
                                @click="navigate(+1)">→</button>
                        </div>
                        <div ref="outer" :style="{ height: `${sliderHeight}px` }"
                            :class="[show ? 'opacity-1 translate-x-0 delay-[.3s] duration-[1s]' : 'opacity-0 translate-x-[5vw]']"
                            class="relative w-full mt-quarter-space">
                            <div ref="slider" class="relative w-full h-full">
                                <div ref="track" class="absolute h-auto flex -left-1"
                                    :style="{ width: `${trackWidth}px`, transform: `translateX(${trackPosition})` }">
                                    <ShowCaseSlide class="px-1" :showCase="showCase"
                                        v-for="(showCase, index) in showCases" :key="index"
                                        @mouseenter="[!transforming ? activeId = index : activeId]"
                                        :active="index == activeId" :image="showCase.image?.url">
                                    </ShowCaseSlide>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="[show ? 'opacity-10 duration-[1s]' : 'opacity-100']"
                    class="absolute left-0 bottom-0 w-full opacity-10 overflow-hidden duration-[.5s]">
                    <p class="relative -left-[2vw] block text-[41.25vw] italic font-bold leading-none">
                        CSD
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// Import the necessary functions
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useCMSStore } from '@/store/cms';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

const store = useCMSStore();
const ui = useUIStore();
const { showCases } = storeToRefs(store);
const { toggleInverseHeader } = ui;

const track = ref<HTMLDivElement | null>(null);
const slider = ref<HTMLDivElement | null>(null);
const outer = ref<HTMLDivElement | null>(null);

const shift = ref(0);
const trackWidth = ref(0);
const trackPosition = ref('');
const sliderHeight = ref(0);
const slideCols = ref(4);
const activeId = ref(0);
const transforming = ref(false);
const show = ref(false);

function handleKeyDown(e: any) {
    if (e.key === 'ArrowRight') {
        if (activeId.value < showCases.value.length - 1) {
            activeId.value++;
        }
    } else if (e.key === 'ArrowLeft') {
        if (activeId.value > 0) {
            activeId.value--;
        }
    }
}

const handleScroll = () => {
    // console.log(window.scrollY, document.body.clientHeight);
    if ((window.scrollY + window.innerHeight) > document.body.clientHeight) {
        show.value = true;
    } else {
        show.value = false;
    }
    if ((window.scrollY + 1) >= document.body.clientHeight) {
        toggleInverseHeader(true);
    } else {
        toggleInverseHeader(false);
    }
}

const moveTrack = (direction: number) => {
    if (track.value == null || slider.value == null) return;
    transforming.value = true;
    track.value.style.transition = '.3s ease-in-out'
    if (direction === -1) {
        trackPosition.value = `-${(slider.value.clientWidth / slideCols.value) * (shift.value - 1)}px`;
        shift.value--;
    } else {
        trackPosition.value = `-${(slider.value.clientWidth / slideCols.value) * (shift.value + 1)}px`;
        shift.value++;
    }
    setTimeout(() => {
        if (track.value == null || slider.value == null) return;
        transforming.value = false;
        track.value.style.transition = 'none'
    }, 300);
}

const navigate = (direction: number) => {
    if (track.value == null || slider.value == null) return;
    if (direction === -1) {
        if (shift.value > 0) {
            moveTrack(direction);
        }
    } else if (direction === 1) {
        if (shift.value < ((showCases.value.length / slideCols.value) - 1) * slideCols.value) {
            moveTrack(direction);
        }
    }
}

watch(activeId, (newValue, oldValue) => {
    // change track position
    if (track.value == null || slider.value == null) return;
    if (newValue > oldValue && (newValue - shift.value) > slideCols.value - 1) {
        moveTrack(1);
    }
    if (newValue < (0 + shift.value)) {
        trackPosition.value = `-${(slider.value.clientWidth / slideCols.value) * (shift.value - 1)}px`;
        moveTrack(-1);
    }
});

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    if (slider.value !== null) trackWidth.value = (slider.value.clientWidth / slideCols.value) * (showCases.value.length);
    setTimeout(() => {
        if (track.value !== null) sliderHeight.value = track.value.clientHeight;
    }, 100);
    trackPosition.value = `0px`;
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('scroll', handleScroll);
})

</script>
