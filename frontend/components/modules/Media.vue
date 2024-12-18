<template>
    <ElementsContainer v-if="item" size="medium" :class="[ item.items.length > 1 ? 'md:grid-cols-2' : '' ]" class="paragraph grid gap-half-space">
        <figure v-for="(media, index) in item.items" :key="index" :class="[ item.items.length > 1 ? 'aspect-video' : '' ]" class="bg-red-200 overflow-hidden">
            <img class="object-cover min-w-full min-h-full" v-if="media.image" :src="media.image.sizes.md" :alt="media.image.alt" :srcset="media.image.srcset">
        </figure>
    </ElementsContainer>
</template>

<script setup lang="ts">
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
</script>