<template>
    <main v-if="currentProject" class="pb-double-space overflow-x-hidden">
        <div class="relative mt-single-space">
            <ElementsContainer>
                <div class="flex items-center cursor-pointer" @click="backToOverview">
                    <svg class="icon icon-arrow-left fill-current w-4 h-4 ease-in-out duration-300 mr-2" style="transition-property: transform, opacity" :class="[ !isTransitioning ? '' : 'opacity-0 translate-x-2' ]"><use xlink:href="#icon-arrow-left"></use></svg>
                    <p class="ease-in-out duration-300 delay-100" style="transition-property: transform, opacity" :class="[ !isTransitioning ? '' : 'opacity-0 translate-x-2' ]">back to overview</p>
                </div>
            </ElementsContainer>
            <ElementsContainer class="flex flex-col md:flex-row gap-half-space mt-half-space">
                <figure class="w-[120px] md:w-[160px] aspect-video md:aspect-none py-3 px-half-space border border-solid border-current flex items-center justify-center">
                    <svg v-if="currentProject.svg" class="fill-current" :viewBox="currentProject.svg.viewbox" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" v-html="currentProject.svg.contents">
                    </svg>
                </figure>
                <div class="ease-in-out duration-300 delay-300" style="transition-property: transform, opacity" :class="[ !isTransitioning ? '' : 'opacity-0 translate-x-2' ]">
                    <h1 class="text-4xl max-w-[90%]" v-html="currentProject.excerpt"></h1>
                </div>
            </ElementsContainer>
            <ElementsContainer class="mt-12 ease-in-out duration-300 delay-400" style="transition-property: transform, opacity" :class="[ !isTransitioning ? '' : 'opacity-0 translate-x-2' ]">
                <SliderContainer type="media" :slides="currentProject.slides"></SliderContainer>
            </ElementsContainer>
            <ElementsContainer class="mt-12 ease-in-out duration-300 delay-500" style="transition-property: transform, opacity" size="small" :class="[ !isTransitioning ? '' : 'opacity-0 translate-x-2' ]">
                <p v-for="(paragraph, index) in currentProject.paragraphs" :key="index" v-html="paragraph.text" :class="index > 0 ? 'mt-6' : ''"></p>
            </ElementsContainer>
            <ElementsContainer class="mt-12 ease-in-out duration-300 delay-[600ms]" style="transition-property: transform, opacity" size="small" :class="[ !isTransitioning ? '' : 'opacity-0 translate-x-2' ]">
                <div class="-mx-6 flex flex-wrap md:flex-nowrap justify-between divide-x divide-gray-500/50">
                    <div class="w-full md:w-[50%] lg:w-auto mb-6 px-6">
                        <h3 class="h5">Client:</h3>
                        <p class="mt-2" v-html="currentProject.client"></p>
                    </div>
                    <div class="w-full md:w-[50%] lg:w-auto mb-6 px-6">
                        <h3 class="h5">Year:</h3>
                        <p class="mt-2" v-html="currentProject.year"></p>
                    </div>
                    <div class="w-full md:w-[50%] lg:w-auto mb-6 px-6">
                        <h3 class="h5">Type:</h3>
                        <p class="mt-2" v-html="currentProject.type"></p>
                    </div>
                    <div class="w-full md:w-[50%] lg:w-auto mb-6 px-6">
                        <h3 class="h5">Stack:</h3>
                        <p class="mt-2" v-html="currentProject.stack"></p>
                    </div>
                </div>
                <hr class="mt-12" :style="{ borderColor: themeColor }">
            </ElementsContainer>
            <!-- <div class="mt-12 ease-in-out duration-300 delay-[700ms]" style="transition-property: transform, opacity" size="small" :class="[ isTransitioning ? '' : 'opacity-0 translate-x-2' ]">
                <Container size="small">
                    <p class="text-sm">Andere projecten</p>
                    <Slider class="mt-6" :type="'related'" :slides="related"></Slider>
                </Container>
            </div> -->
        </div>
    </main>
</template>

<script setup lang="ts">
// import posts from '@/assets/json/posts.json';
import projects from '@/assets/json/projects.json';
import type { Project } from '@/types';
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'nuxt/app';
import { useCMSStore } from '@/store/cms';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

// import { ref, DirectiveBinding, defineComponent } from 'vue';
const store = useCMSStore();
const ui = useUIStore();
const { themeColor, isTransitioning, showSink } = storeToRefs(ui);
const route = useRoute();
const router = useRouter();
const currentProject = ref<Project | null | undefined>(null);

const onInit = async () => {
    if (projects.length) {
        currentProject.value = projects.find((project) => project.slug === route.params.slug);
    }
};

const backToOverview = () => {
    setTimeout(() => {
        router.push('/');
    }, 300);
};

onInit();

</script>

