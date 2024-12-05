<template>
    <div class="px-6 md:px-20 mx-auto w-full" :class="[sizeClass]">
        <slot />
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
    size: {
        type: String,
        default: 'large'
    }
})
const sizeClass = computed(() => {
    let size = 'max-w-7xl xl:max-w-8xl'
    switch (props.size) {
        case 'medium':
            size = 'max-w-5xl xl:max-w-6xl'
            break;
        case 'small':
            size = 'max-w-4xl'
            break;
    }
    return size
})
</script>
