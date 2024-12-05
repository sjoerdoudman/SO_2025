<template>
    <div :class="[darkMode ? 'bg-dark' : 'bg-light']" class="relative z-10 mb-[100vh] pt-[60px] pb-double-space">
        <ElementsContainer class="w-full pb-single-space">
            <div class="content-column paragraph">
                <h2>
                    Web development &amp; Design with a focus on the <em>creative sector</em>
                </h2>
                <div class="mt-half-space">
                    <ElementsButton :title="'more about SOS'" :url="'/about'"></ElementsButton>
                </div>
            </div>
        </ElementsContainer>
        <ProjectList></ProjectList>
    </div>
    <LayoutFooter></LayoutFooter>
</template>

<script setup lang="ts">
// Import the necessary functions
import type { Page } from '@/types';
import { ref } from 'vue';
import { useCMSStore } from '@/store/cms';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

const store = useCMSStore();
const { pages } = storeToRefs(store);

const ui = useUIStore();
const { darkMode } = storeToRefs(ui);

const currentPage = ref<Page | null | undefined>(null);

const onInit = async () => {
    // filter media_type by route name
    currentPage.value = pages.value.find((page) => page.slug === 'home');
    // const { $meta } = useNuxtApp()
    // //@ts-ignore
    // $meta(currentPage.value)
    // console.log(currentPage.value);
};

onInit();

</script>
