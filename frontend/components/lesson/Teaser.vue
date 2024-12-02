<template>
    <nuxt-link :to="`/lessen/${lesson.slug}`" class="bg-white hover:bg-glr p-6 aspect-video flex flex-col duration-200">
        <h4 class="h3 !text-dark" v-text="lesson.title"></h4>
        <div class="mt-auto">
            <p class="text-dark">
                <span v-html="listTitles(lesson.year)"></span><br>
                <span v-html="listTitles(lesson.specialization)"></span>
            </p>
        </div>
    </nuxt-link>
</template>

<script setup lang="ts">
import type { Lesson } from '@/types';

const props = defineProps<{
    lesson: Lesson;
}>();

const listTitles = (terms: any[]) => {
    const titles = terms.map(item => item.title);
    return titles.join()
}
</script>