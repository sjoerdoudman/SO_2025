<template>
    <div :class="[menuOpen ? 'pointer-events-all opacity-100' : 'pointer-events-none opacity-0', darkMode ? 'theme--dark bg-dark' : 'theme--light bg-light']"
        class="fixed z-20 lg:z-10 left-0 top-0 pt-[calc(60px+1.5rem+1.5vw+1.5vh)] flex w-full h-full duration-[.6s]">
        <div ref="target" class="container">
            <NavigationMenu></NavigationMenu>
            <div class="relative overflow-hidden mt-4 transition-all ease-in-out duration-500"
            :class="darkMode ? 'bg-dark' : 'bg-light'">
                <div class="py-4">
                    <div class="absolute w-full h-full opacity-10 top-0 left-0 pointer-events-none border-b-2 border-dotted"
                        :style="{ borderColor: themeColor }">
                    </div>
                    <NavigationSettings></NavigationSettings>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Import the necessary functions
import { ref, watch } from 'vue';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
import { gsap } from 'gsap';

// set the variables
const ui = useUIStore();
const { menuOpen, darkMode, themeColor } = storeToRefs(ui);

const target = ref(null);

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

function AnimateShow() {
    gsap.fromTo(target.value, { yPercent: 10, scale: .8 }, { yPercent: 0, duration: 1, scale: 1, delay: 0, ease: 'power4.out' });
    gsap.to(target.value, { opacity: 1, duration: 2, delay: 0, ease: 'power4.out' });
}

function AnimateHide() {
    gsap.fromTo(target.value, { yPercent: 0, scale: 1 }, { yPercent: 10, duration: .6, scale: .8, delay: 0, ease: 'power4.out' });
    gsap.to(target.value, { opacity: 0, duration: .5, delay: 0, ease: 'power4.out' });
}

watch(menuOpen, (value) => {
    value ? AnimateShow() : AnimateHide()
    lockScroll(value)
})

</script>