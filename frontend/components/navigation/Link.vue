<template>
    <nuxt-link :to="item.url" :class="inverseHeader ? 'after:bg-dark' : 'after:bg-white'"
        class="text-[calc(1vw+1vh+1rem)] lg:text-lg font-medium" @mouseenter="updateCursor({ type: 'link', title: '' })"
        @mouseleave="updateCursor(null)">
        {{ item.title }}
    </nuxt-link>
</template>

<script setup>
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
const uiStore = useUIStore();
const { inverseHeader } = storeToRefs(uiStore);
const { updateCursor } = uiStore;

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

</script>