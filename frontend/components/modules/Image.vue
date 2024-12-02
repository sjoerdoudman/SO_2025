<template>
    <div v-if="item" class="container-md w-full my-single-space">
        <h2 class="h4" v-text="item.title"></h2>
        <figure v-if="item.image" class="mt-half-space">
            <NuxtImg class="w-full h-auto" :src="item.image.url" :alt="item.image.alt"></NuxtImg>
        </figure>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
</script>