<template>
    <section v-for="(m, index) in items" :key="index">
        <component :is="componentMap[m.acf_fc_layout]" :item="m"></component>
    </section>
</template>

<script setup lang="ts">
import type { Module } from '@/types';
import { defineComponent } from 'vue';
import media from '../modules/Media.vue';
import paragraph from '../modules/Paragraph.vue';
import conversation from '../modules/Conversation.vue';
const componentMap: { [key: string]: ReturnType<typeof defineComponent> } = {
    media,
    paragraph,
    conversation
    // Add other components as needed
};
const props = defineProps({
    items: {
        type: Array as () => Module[],
        required: false
    }
});
</script>