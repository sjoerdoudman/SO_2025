<template>
    <main v-if="currentLesson">
        <LayoutHero :image="currentLesson.image" :video_id="currentLesson.video_id"></LayoutHero>
        <div class="relative bg-dark z-10 mb-[100vh] min-h-screen">
            <div class="container-md w-full pb-double-space">
                <section class="content-column paragraph">
                    <p v-html="listTitles(currentLesson.specialization)"></p>
                    <h1 class="h2 mt-quarter-space" v-text="currentLesson.title"></h1>
                    <p v-html="listTitles(currentLesson.year)"></p>
                    <div class="mt-single-space">
                        <p v-html="currentLesson.intro"></p>
                    </div>
                    <div v-if="currentLesson.downloads" class="mt-single-space">
                        <h3 class="h4">
                            Downloads
                        </h3>
                        <ul class="flex flex-wrap gap-single-space mt-quarter-space">
                            <li v-for="(download, index) in currentLesson.downloads" :key="index">
                                <ElementsDownload :download="download"></ElementsDownload>
                            </li>
                        </ul>
                    </div>
                    <div class="mt-single-space">
                        <h3 class="h4">
                            Skills &amp; Software
                        </h3>
                        <ul class="flex flex-wrap gap-3 mt-quarter-space">
                            <li v-for="(skill, index) in currentLesson.skill" :key="index">
                                <span class="block tag px-6 py-3 bg-glr-grey" v-html="skill.title"></span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
        <ModulesShowCases></ModulesShowCases>
    </main>
</template>

<script setup lang="ts">
import type { Lesson } from '@/types';
import { ref } from 'vue';
import { useRoute } from 'nuxt/app';
import { useCMSStore } from '@/store/cms';
import { storeToRefs } from 'pinia';

const route = useRoute();
const store = useCMSStore();
const { lessons } = storeToRefs(store);
const currentLesson = ref<Lesson | null>(null);

const init = async () => {
    const lesson = lessons.value.find((lesson: Lesson) => lesson.slug === route.params.slug);
    if (lesson) {
        currentLesson.value = lesson;
    }
}

const listTitles = (terms: any[]) => {
    const titles = terms.map(item => item.title);
    return titles.join()
}

init();
</script>