<template>
    <div ref="timer" class="fixed bottom-0 left-0 w-full h-[5px] z-[70]">
        <div class="h-full bg-glr duration-200" :style="{ width: `${time / 2}%` }"></div>
    </div>
</template>

<script setup lang="ts">
import type { showCase } from '@/types';
import { ref, onMounted } from 'vue';
import { useRoute } from 'nuxt/app';
import { useCMSStore } from '@/store/cms';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

const route = useRoute();
const store = useCMSStore();
const ui = useUIStore();

const { showCases } = storeToRefs(store);
const { updateActiveShowCase, addKeystroke } = ui;

const currentShowcase = ref<showCase | null>(null);
const liveShowcases = ref<showCase[] | []>([]);
const timer = ref<number | null>(null);
const time = ref<number>(0);
const slideIndex = ref<number>(0);
const reset = ref<boolean>(false);

const startTimer = () => {
    // @ts-ignore
    timer.value = setInterval(() => {
        if (time.value >= 200) {
            reset.value = true;
            slideIndex.value = slideIndex.value == liveShowcases.value.length - 1 ? 0 : slideIndex.value + 1;
            updateActiveShowCase(liveShowcases.value[slideIndex.value]);
            addKeystroke();
            time.value = 0;
            reset.value = false;
            return;
        }
        time.value += 1;
    }, 100);
}

const init = async () => {
    liveShowcases.value = showCases.value.filter(item => item.live);
    if (liveShowcases.value.length > 0) {
        currentShowcase.value = liveShowcases.value[slideIndex.value];
    }
    updateActiveShowCase(currentShowcase.value);
    startTimer();
}
onMounted(() => {
    init();
})
</script>