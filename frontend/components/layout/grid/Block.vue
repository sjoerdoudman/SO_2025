<template>
    <div ref="target" v-element-visibility="onElementVisibility" class="relative opacity-0 group/still">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { vElementVisibility } from '@vueuse/components';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
import { gsap } from 'gsap';
import { ref, watch } from 'vue';

const ui = useUIStore();

const { isTransitioning } = storeToRefs(ui);

const isVisible = ref(false);
const target = ref<HTMLDivElement | null>(null);

function onElementVisibility(visible: boolean) {
    if (visible && !isVisible.value) {
        AnimateShow()
        isVisible.value = true;
    }
}

function AnimateShow() {
    gsap.fromTo(target.value, { yPercent: 20, scale: .8 }, { yPercent: 0, duration: 2, scale: 1, delay: 0.3, ease: 'power4.out' });
    gsap.to(target.value, { opacity: 1, duration: 2, delay: 0.6, ease: 'power4.out' });
}

function AnimateHide() {
    gsap.fromTo(target.value, { yPercent: 0, scale: 1 }, { yPercent: 10, duration: .6, scale: .95, delay: .5, ease: 'power4.out' });
    gsap.to(target.value, { opacity: 0, duration: .5, delay: .5, ease: 'power4.out' });
}

watch(isTransitioning, (value) => {
    value ? AnimateHide() : AnimateShow()
})
</script>