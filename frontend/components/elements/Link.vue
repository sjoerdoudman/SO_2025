<template>
    <a @mouseenter="[updateCursor({ type: 'link', title: '' })]" @mouseleave="[updateCursor(null)]"
        :class="[icon !== '' ? 'pr-5' : '']" class="inline-block relative group/link" :href="url" :target="target">
        <span v-text="title"></span>
        <svg v-if="icon == 'email'"
            class="icon absolute w-4 h-4 right-0 fill-white top-1/2 -translate-y-1/4 group-hover/link:-translate-y-1/2  -translate-x-2 group-hover/link:translate-x-0 opacity-0 group-hover/link:opacity-100 duration-300">
            <use xlink:href="#icon-paperplane"></use>
        </svg>
        <svg v-if="icon == 'map'"
            class="icon absolute w-4 h-4 right-0 fill-white top-1/2 -translate-y-3/4 group-hover/link:-translate-y-1/2  opacity-0 group-hover/link:opacity-100 duration-300">
            <use xlink:href="#icon-map-marker"></use>
        </svg>
    </a>
</template>

<script setup lang="ts">
import { useUIStore } from '@/store/ui';
const ui = useUIStore();
const { updateCursor } = ui;

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: false,
        default: '_self'
    },
    icon: {
        type: String,
        required: false,
        default: ''
    }
})
</script>