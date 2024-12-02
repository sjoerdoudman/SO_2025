<template>
    <nav>
        <div class="flex items-center gap-half-space translate-y-[4px] mr-single-space">
            <nuxt-link :to="`/showcases/${prevSlug}`"
                class="h4 text-white cursor-pointer outline-none opacity-80 hover:opacity-100 duration-200" @click="">
                ←
            </nuxt-link>
            <h1 class="p" v-if="showCase.lesson" v-html="showCase.lesson.title"></h1>
            <nuxt-link :to="`/showcases/${nextSlug}`"
                class="h4 text-white cursor-pointer outline-none opacity-80 hover:opacity-100 duration-200" @click="">
                →
            </nuxt-link>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useCMSStore } from '@/store/cms';
import { storeToRefs } from 'pinia';
import type { showCase } from '@types';
const store = useCMSStore();
const { showCases } = storeToRefs(store);
const prevSlug = ref<string>('');
const nextSlug = ref<string>('');

const props = defineProps({
    showCase: {
        type: Object,
        required: true
    }
})

const prevShowCase = (showCase: any) => {
    if (!showCase) return
    let index = 0;
    for (let i = 0; i < showCases.value.length; i++) {
        const c = showCases.value[i];
        if (c.slug === showCase.slug) {
            index = i
        }
    }
    prevSlug.value = index == 0 ? showCases.value[showCases.value.length - 1].slug : showCases.value[index - 1].slug
}

const setPrevNextSlugs = (showCase: any) => {
    if (!showCase) return
    let index = 0;
    for (let i = 0; i < showCases.value.length; i++) {
        const c = showCases.value[i];
        if (c.slug === showCase.slug) {
            index = i
        }
    }
    prevSlug.value = index == 0 ? showCases.value[showCases.value.length - 1].slug : showCases.value[index - 1].slug
    nextSlug.value = index < (showCases.value.length - 1) ? showCases.value[index + 1].slug : showCases.value[0].slug
}

onMounted(() => {
    setPrevNextSlugs(props.showCase)
}) 
</script>