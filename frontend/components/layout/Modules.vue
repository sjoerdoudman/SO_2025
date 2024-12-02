<template>
    <section v-for="(m, index) in items" :key="index">
        <component :is="componentMap[m.type]" :item="m.item"></component>
    </section>
</template>

<script setup lang="ts">
import type { Module } from '@/types';
import { defineComponent } from 'vue';
import image_module from '../modules/Image.vue';
import paragraphs_module from '../modules/Paragraphs.vue';
const componentMap: { [key: string]: ReturnType<typeof defineComponent> } = {
    image_module,
    paragraphs_module
    // Add other components as needed
};
const props = defineProps({
    items: {
        type: Array as () => Module[],
        required: false
    }
});
</script>