<template>
    <header
        :class="[inverseHeader ? 'text-dark' : 'text-white', showHeader ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full']"
        class="z-50 fixed top-0 left-0 w-full max-w-screen h-[80px] flex items-center duration-[.5s]">
        <div :class="[inverseHeader || menuOpen ? 'opacity-0' : 'opacity-100']"
            class="absolute left-0 top-0 w-full h-[25vh] z-1 pointer-events-none bg-gradient-to-b from-black/50 duration-[.5s]">
        </div>
        <div class="relative z-4 container flex items-center">
            <nuxt-link @mouseenter="updateCursor({ type: 'link', title: '' })" @mouseleave="updateCursor(null)"
                class="mr-auto text-xl" to="/" aria-label="To the homepage">
                GLR — CSD
            </nuxt-link>
            <NavigationMenu class="hidden lg:flex items-center justify-center gap-single-space"></NavigationMenu>
            <div ref="toggler" class="w-7 h-5 lg:hidden relative" @click="toggleMenuOpen(!menuOpen)">
                <div :class="[menuOpen ? 'bg-dark top-1/2 -translate-y-1/2 rotate-45' : 'bg-white']"
                    class="absolute w-full h-[2px] left-0 top-0 rounded-lg duration-300"></div>
                <div :class="[menuOpen ? 'bg-dark rotate-45' : 'bg-white']"
                    class="absolute w-full h-[2px] left-0 top-1/2 -translate-y-1/2 rounded-lg duration-300">
                </div>
                <div :class="[menuOpen ? 'bg-dark bottom-1/2 translate-y-1/2 -rotate-45' : 'bg-white']"
                    class="absolute w-full h-[2px] left-0 bottom-0 rounded-lg duration-300"></div>
            </div>
        </div>
    </header>
</template>

<script setup>
// Import the necessary functions
import { onMounted, ref } from "vue";
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

// set the variables
const uiStore = useUIStore();
const { toggleShowHeader, updateCursor, toggleMenuOpen } = uiStore;
const { menuOpen, inverseHeader, showHeader } = storeToRefs(uiStore);

const isMobile = ref(false);

onMounted(() => {
    isMobile.value = window.innerWidth < 1024;
    setTimeout(() => {
        toggleShowHeader(true)
    }, 1000);
});
</script>