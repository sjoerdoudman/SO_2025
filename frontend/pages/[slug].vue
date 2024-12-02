<template>
    <main v-if="currentPage">
        <div :class="['pt-[calc(80px+5vw+5vh)]']"
            class="relative z-10 bg-dark grid gap-half-space pb-double-space mb-[100vh]">
            <section>
                <div class="container-md w-full">
                    <div class="content-column paragraph">
                        <h1 class="h2" v-text="currentPage.title"></h1>
                        <div v-if="currentPage.intro" class="mt-half-space" v-html="currentPage.intro"></div>
                    </div>
                </div>
            </section>
            <LayoutModules :items="currentPage.modules"></LayoutModules>
        </div>
        <ModulesShowCases></ModulesShowCases>
    </main>
</template>

<script setup lang="ts">
import type { Page } from '@/types';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCMSStore } from '@/store/cms';
import { storeToRefs } from 'pinia';

const $route = useRoute();
const store = useCMSStore();
const { pages } = storeToRefs(store);
const currentPage = ref<Page | null | undefined>(null);
const onInit = () => {
    currentPage.value = pages.value.find((page: Page) => page.slug === $route.params.slug);
}

onInit();
</script>