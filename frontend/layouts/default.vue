<template>
    <div class="min-h-screen w-screen" :style="{ color: themeColor }"
        :class="[darkMode ? 'theme--dark bg-dark' : 'theme--light bg-light']">
        <div class="fixed left-0 h-screen w-full pointer-events-none flex z-[100]">
            <div class="h-full w-full border-x-2 border-dotted mx-10 opacity-10" :style="{ borderColor: themeColor }">
            </div>
        </div>
        <ShowCaseFullscreen></ShowCaseFullscreen>
        <LayoutIcons></LayoutIcons>
        <LayoutHeader></LayoutHeader>
        <JournalCat></JournalCat>
        <div ref="content" class="relative">
            <slot class="min-h-full" />
        </div>
    </div>
</template>

<script setup lang="ts">
// Import the necessary functions
import { gsap } from 'gsap';
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useCMSStore } from '@/store/cms';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
import { useActivity } from '@/composables/useActivity';
import { useCookies } from '@vueuse/integrations/useCookies';

const store = useCMSStore();
const ui = useUIStore();
const cookies = useCookies();

const { fetchPages } = store;
const { toggleShowLoader, updateMouseX, updateMouseY, updateThemeColor, toggleDarkMode, toggleShowSink } = ui;
const { firstLoad, isTransitioning, themeColor, darkMode } = storeToRefs(ui);

const content = ref<HTMLDivElement | null>(null);

const onInit = async () => {
    // Fetch the data
    await Promise.all([
        fetchPages({}),
    ]).then(() => {
        // console.log(store.pages);
    });

};

useActivity();
const followCursor = (e: any) => {
    updateMouseX(e.pageX);
    updateMouseY(e.pageY - window.scrollY);
}

function AnimateShow() {
    gsap.fromTo(content.value, { left: 10, opacity: 0 }, { left: 0, opacity: 1, duration: .6, delay: .2, ease: 'power4.out' });
}

function AnimateHide() {
    gsap.fromTo(content.value, { left: 0, opacity: 1 }, { left: -10, opacity: 0, duration: .6, ease: 'power4.out' });
}

watch(isTransitioning, (value) => {
    value ? AnimateHide() : AnimateShow()
})

const setThemeFromCookies = () => {
    if (cookies.get('theme-color') !== undefined && cookies.get('theme-color') !== themeColor.value) {
        updateThemeColor(cookies.get('theme-color'))
    }
    if (cookies.get('dark-mode') !== undefined) {
        toggleDarkMode(cookies.get('dark-mode'))
    }
    if (cookies.get('show-sink') !== undefined) {
        toggleShowSink(cookies.get('show-sink'))
    }
}

onMounted(() => {
    setThemeFromCookies();
    if (firstLoad.value) {
        toggleShowLoader(true);
    }
    if (process.client) {
        window.addEventListener('mousemove', followCursor);
    }
    // set the background of the html element
    document.documentElement.classList.add(darkMode.value ? 'bg-dark' : 'bg-light');
});

onUnmounted(() => {
    if (process.client) {
        window.removeEventListener('mousemove', followCursor)
    }
});

// Call the onInit function
onInit();

</script>