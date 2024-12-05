<template>
    <NuxtLink @mouseenter="backgroundColor = themeColor" @mouseleave="backgroundColor = 'transparent'" v-if="url"
        :to="url" :class="[classes, darkMode ? 'hover:text-dark' : 'hover:text-light']"
        :style="{ borderColor: themeColor, background: backgroundColor }">
        <span v-html="title"></span>
    </NuxtLink>
    <button @mouseenter="backgroundColor = themeColor" @mouseleave="backgroundColor = 'transparent'" v-else
        :class="classes" :style="{ borderColor: themeColor }">
        <span v-html="title"></span>
    </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
const ui = useUIStore();
const { themeColor, darkMode } = storeToRefs(ui);
const props = defineProps<{
    url: string;
    title: string;
}>();
const backgroundColor = ref('transparent');
const classes = 'inline-block border-2 border-solid px-5 py-2 duration-300 ease-in-out';
</script>