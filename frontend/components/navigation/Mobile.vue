<template>
    <div :class="[menuOpen ? 'pointer-events-all opacity-100' : 'pointer-events-none opacity-0']"
        class="fixed z-20 lg:z-10 left-0 top-0 flex items-center bg-white w-full h-full duration-[.6s] text-dark">
        <div ref="target" class="container">
            <NavigationMenu></NavigationMenu>
        </div>
    </div>
</template>

<script setup>
// Import the necessary functions
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
import { gsap } from 'gsap';

// set the variables
const uiStore = useUIStore();
const { menuOpen } = storeToRefs(uiStore);

const target = ref(null);

function AnimateShow() {
    gsap.fromTo(target.value, { yPercent: 20, scale: .8 }, { yPercent: 0, duration: 1.2, scale: 1, delay: 0, ease: 'power4.out' });
    gsap.to(target.value, { opacity: 1, duration: 2, delay: 0, ease: 'power4.out' });
}

function AnimateHide() {
    gsap.fromTo(target.value, { yPercent: 0, scale: 1 }, { yPercent: 10, duration: .6, scale: .8, delay: 0, ease: 'power4.out' });
    gsap.to(target.value, { opacity: 0, duration: .5, delay: 0, ease: 'power4.out' });
}

watch(menuOpen, (value) => {
    value ? AnimateShow() : AnimateHide()
})

</script>