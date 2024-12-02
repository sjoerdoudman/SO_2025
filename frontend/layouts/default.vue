<template>
    <div class="bg-dark min-h-screen w-screen text-white">
        <ShowCaseFullscreen></ShowCaseFullscreen>
        <LayoutIcons></LayoutIcons>
        <LayoutHeader></LayoutHeader>
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

const store = useCMSStore();
const ui = useUIStore();

const { fetchPages } = store;
const { toggleShowLoader, updateMouseX, updateMouseY } = ui;
const { firstLoad, searchOpen, menuOpen, isTransitioning } = storeToRefs(ui);

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

onMounted(() => {
    if (firstLoad.value) {
        toggleShowLoader(true);
    }
    if (process.client) {
        window.addEventListener('mousemove', followCursor);
    }
});

onUnmounted(() => {
    if (process.client) {
        window.removeEventListener('mousemove', followCursor)
    }
});

// Call the onInit function
onInit();

</script>