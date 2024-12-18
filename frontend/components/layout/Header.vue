<template>
    <div class="relative w-full pt-[60px] z-30">
        <div class="w-screen h-[60px] py-3 fixed left-0 top-0 z-10 border-b-2 border-dotted transition-all ease-in-out duration-300"
            :style="{ borderColor: $hexToRgba(themeColor, '.1') }"
            :class="[darkMode ? 'bg-dark' : 'bg-light', scrolled ? 'lg:py-3 lg:h-[60px]' : 'lg:py-6 lg:h-[80px]']">
            <ElementsContainer class="flex">
                <component :is="isHome ? 'h1' : 'div'" class="flex-1">
                    <nuxt-link :to="'/'" class="text-2xl flex items-end">
                        <span class="mr-2">Sjoerd Oudman</span>
                        <strong class="transition ease-in-out duration-300 hidden lg:block"
                            :class="[scrolled ? 'opacity-0 -translate-y-2' : '']">Studio</strong>
                    </nuxt-link>
                </component>
                <NavigationMenu class="hidden lg:block"></NavigationMenu>
                <div class="relative h-3 mt-3 lg:hidden ease-in-out duration-300" :class="menuOpen ? 'w-6' : 'w-8'"
                    @click="toggleMenuOpen(menuOpen ? false : true)">
                    <div class="absolute left-0 w-full h-[3px] ease-in-out duration-300 rounded-sm"
                        :class="menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'"
                        :style="{ backgroundColor: themeColor }"></div>
                    <div class="absolute left-0 w-full h-[3px] ease-in-out duration-300 rounded-sm"
                        :class="menuOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'"
                        :style="{ backgroundColor: themeColor }"></div>
                </div>
            </ElementsContainer>
        </div>
        <div class="hidden lg:block relative overflow-hidden mt-4 transition-all ease-in-out duration-500"
            :class="showSink ? 'max-h-[100px]' : 'max-h-[2px]', darkMode ? 'bg-dark' : 'bg-light'">
            <div class="py-4">
                <div class="absolute w-full h-full opacity-10 top-0 left-0 pointer-events-none border-b-2 border-dotted"
                    :style="{ borderColor: themeColor }"></div>
                <ElementsContainer>
                    <NavigationSettings></NavigationSettings>
                </ElementsContainer>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from 'nuxt/app';
import { ref, onMounted, onUnmounted } from 'vue'
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

const { $hexToRgba } = useNuxtApp() as any;

const ui = useUIStore();
const { isHome, darkMode, themeColor, menuOpen, showSink } = storeToRefs(ui);
const { toggleMenuOpen } = ui;
const scrolled = ref(false);

const scrollListener = () => {
    scrolled.value = window.scrollY > 0;
};

onMounted(() => {
    window.addEventListener('scroll', scrollListener);
});

onUnmounted(() => {
    window.removeEventListener('scroll', scrollListener);
});

</script>