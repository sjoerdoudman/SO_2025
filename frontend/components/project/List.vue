<template>
    <div class="py-6 min-h-[72px] grid gap-half-space">
        <ElementsContainer class="flex items-center">
            <h2 class="p flex-1 mr-4 ease-in-out duration-300 delay-100"
                :class="[showContent ? '' : 'opacity-0 translate-x-2']">
                projects
            </h2>
            <div class="flex items-center">
                <span class="mr-2 duration-300 delay-200 hidden md:block"
                    :class="[showContent ? '' : 'opacity-0 translate-x-2']">
                    display mode
                </span>
                <div @click="changeViewMode('col')" class="cursor-pointer ease-in-out duration-300 delay-300"
                    :class="[showContent ? '' : 'opacity-0 translate-x-2']">
                    <svg class="w-5 h-5 mx-2 hover:opacity-100"
                        :class="[viewMode == 'col' ? 'opacity-100' : 'opacity-50']" :style="{ fill: themeColor }"
                        viewBox="0 0 23 21" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect id="Rectangle" x="0" y="0" width="4" height="21"></rect>
                        <rect id="Rectangle-Copy" x="9" y="0" width="4" height="21"></rect>
                        <rect id="Rectangle-Copy-2" x="19" y="0" width="4" height="21"></rect>
                    </svg>
                </div>
                <div @click="changeViewMode('slideshow')" class="cursor-pointer ease-in-out duration-[.4s] delay-200"
                    :class="[showContent ? '' : 'opacity-0 translate-x-2']">
                    <svg class="w-5 h-5 mx-2 mt-[1px] hover:opacity-100"
                        :class="[viewMode == 'slideshow' ? 'opacity-100' : 'opacity-50']" viewBox="0 0 28 25"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <polygon id="Triangle" :style="{ fill: themeColor }"
                            transform="translate(14.500000, 11.500000) rotate(90.000000) translate(-12.500000, -11.500000) "
                            points="12.5 8 17 15 8 15"></polygon>
                        <rect id="Rectangle" :style="{ fill: 'transparent', stroke: themeColor }" stroke-width="3" x="2"
                            y="0" width="25" height="22"></rect>
                    </svg>
                </div>
            </div>
        </ElementsContainer>
        <ElementsContainer>
            <TransitionGroup @enter="onEnter" @leave="onLeave">
                <ul class="md:grid md:grid-cols-2 md:gap-6" v-if="viewMode == 'col'" :key="'row'">

                    <li v-for="(project, index) in projects" :key="index"
                        class="duration-200 ease-in-out hover:scale-[1.01] first:mt-0 mt-6 md:mt-0">
                        <ProjectTeaser :project="project" :show="showContent" :index="index"></ProjectTeaser>
                    </li>
                </ul>
            </TransitionGroup>
        </ElementsContainer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
import { gsap } from 'gsap';
import projects from '@/assets/json/projects.json';

const ui = useUIStore();
const { themeColor } = storeToRefs(ui);
const showContent = ref(false);
const viewMode = ref('col');
const changeViewMode = (mode: string) => {
    viewMode.value = mode
}

onMounted(() => {
    showContent.value = true;
})

const onEnter = (el: Element, done: () => void) => {
    const htmlElement = el as HTMLElement;
    gsap.to(htmlElement, {
        duration: 1,
        opacity: 1,
        y: 0
    })
}
const onLeave = (el: Element, done: () => void) => {
    const htmlElement = el as HTMLElement;
    gsap.to(htmlElement, {
        duration: 1,
        opacity: 0,
        y: 20
    })
}

</script>