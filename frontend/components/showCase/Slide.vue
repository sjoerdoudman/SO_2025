<template>
    <nuxt-link :to="`/showcases/${showCase.slug}`" class="flex-1 h-full justify-center overflow-hidden">
        <figure :class="[active ? 'border-opacity-100' : 'border-opacity-0']"
            class="aspect-square relative overflow-hidden group/slide">
            <NuxtImg v-if="showCase.thumbnail" :class="[active ? 'opacity-100' : 'opacity-70']"
                class="min-w-full min-h-full object-cover group-hover/slide:opacity-100 duration-300"
                :srcset="showCase.thumbnail.url">
            </NuxtImg>
        </figure>
        <div class="mt-quarter-space" ref="description">
            <p class="h5 text-dark">{{ showCase.author }}</p>
            <p class="text-sm">
                <span v-if="showCase.lesson" v-html="listTitles(showCase.lesson.specialization)"></span><br>
                <span v-html="listTitles(showCase.years)"></span>
            </p>
        </div>
    </nuxt-link>
</template>

<script setup lang="ts">
// Define props directly
const props = defineProps({
    active: {
        type: Boolean,
        required: true
    },
    showCase: {
        type: Object,
        required: true
    }
});
const listTitles = (terms: any[]) => {
    const titles = terms.map(item => item.title);
    return titles.join()
}
</script>
