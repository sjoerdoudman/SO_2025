<template>
    <div v-if="currentProject && projectSlider.show"
        class="slider fixed z-10 w-screen h-screen top-0 left-0 max-h-screen overflow-hidden flex items-center justify-center duration-[.6s] delay-[1s] bg-black">
        <div :class="[viewportActive && !isTransitioning ? 'opacity-100' : 'opacity-0']"
            class="gradient absolute w-1/2 h-full left-0 top-0 pointer-events-none bg-gradient-to-r from-black/50 duration-300">
        </div>
        <div ref="details"
            :class="[viewportActive && !isTransitioning ? 'opacity-100 pointer-events-all' : 'opacity-0 pointer-events-none']"
            class="z-10 absolute top-0 w-full left-0 flex duration-[.6s] group/details">
            <div ref="description" class="container mt-[calc(17vh+80px)] lg:mt-[calc(25vh+80px)]">
                <div class="relative">
                    <transition name="fade-slide" mode="out-in">
                        <div>
                            <button @click="backToOverview()" v-if="lastRoute == '/stills'"
                                @mouseenter="[hover = true, updateCursor({ type: 'link', title: '' })]"
                                @mouseleave="[hover = false, updateCursor(null)]" :key="lastRoute"
                                :class="[viewportActive && !isTransitioning ? 'opacity-100' : 'opacity-0 translate-x-5']"
                                class="flex items-center gap-2 duration-300 mb-quarter-space">
                                <svg class="icon icon-arrow-left w-4 h-4 fill-white">
                                    <use xlink:href="#icon-arrow-left"></use>
                                </svg>
                            </button>
                            <nuxt-link v-if="lastRoute == '/search' || lastRoute == '/animations'" :to="lastRoute"
                                @mouseenter="[hover = true, updateCursor({ type: 'link', title: '' })]"
                                @mouseleave="[hover = false, updateCursor(null)]"
                                :class="[viewportActive && !isTransitioning ? 'opacity-100' : 'opacity-0 translate-x-5']"
                                class="flex items-center gap-2 duration-300 mb-quarter-space">
                                <svg class="icon icon-arrow-left w-4 h-4 fill-white">
                                    <use xlink:href="#icon-arrow-left"></use>
                                </svg>
                            </nuxt-link>
                        </div>
                    </transition>
                    <transition name="fade-slide" mode="out-in">
                        <div :key="currentProject" class="flex items-center gap-half-space">
                            <div>
                                <h1 :class="[viewportActive && !isTransitioning ? 'opacity-100' : 'opacity-0 translate-x-4']"
                                    class="h4 duration-300" v-text="currentProject.title"></h1>
                                <div :class="[viewportActive && !isTransitioning ? 'opacity-100' : 'opacity-0 translate-x-2']"
                                    class="mt-quarter-space duration-300">
                                    <p>
                                        <strong>In:</strong>
                                        {{ currentProject.location }}
                                    </p>
                                    <p>
                                        <strong>With:</strong>
                                        {{ currentProject.client }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <div v-if="currentProject.media.length > 1"
                        :class="viewportActive && !isTransitioning ? 'translate-x-0' : 'translate-x-full'"
                        class="absolute right-0 top-1/2 -translate-y-1/2 w-[6px] flex flex-col gap-6 items-center duration-[.6s]">
                        <button @mouseenter="[hover = true, updateCursor({ type: 'link', title: '' })]"
                            @mouseleave="[hover = false, updateCursor(null)]"
                            v-for="(slide, index) in currentProject.media"
                            :class="[index == activeSlide ? 'scale-[1.3] opacity-100' : 'scale-100 opacity-70']"
                            class="aspect-square bg-white rounded-full duration-300 w-full focus:outline-none focus:scale[1.4] shadow-lg"
                            @click="activeSlide = index" :key="index"></button>
                    </div>
                </div>
            </div>
        </div>
        <figure v-if="projectSlider.show && currentProject.media[activeSlide]" class="w-full h-full flex items-center">
            <NuxtImg v-if="!currentProject.media[activeSlide].video_id" class="object-contain w-full h-full"
                :srcset="currentProject.media[activeSlide].image.srcset"></NuxtImg>
            <ElementsVideoPlayer v-else class="max-h-full" :controls="true" :autoplay="true" :set_muted="muted"
                :set_play="play" :video_id="currentProject.media[activeSlide].video_id"></ElementsVideoPlayer>
        </figure>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useCMSStore } from '@/store/cms';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
import { watch, ref, onMounted, onUnmounted } from 'vue';

const store = useCMSStore();
const ui = useUIStore();
const route = useRoute();
const router = useRouter();

const { currentProject, projects } = storeToRefs(store);
const { addKeystroke, updateCursor, updateScaleTransition, updateProjectSlider, updateCols } = ui;
const { firstLoad, viewportActive, isTransitioning, lastRoute, projectSlider, scaleTransition } = storeToRefs(ui);

const muted = ref(true);
const play = ref(false)
const activeSlide = ref(route.query && route.query.id ? getSlideIndexFromId(route.query.id) : 0);

function backToOverview() {
    // console.log(scaleTransition.value.image.srcset)
    if (scaleTransition.value.image.id == currentProject.value.media[activeSlide.value].image.id) {
        updateScaleTransition({
            ...scaleTransition.value,
            reverse: true
        })
        setTimeout(() => {
            updateProjectSlider({
                ...projectSlider.value,
                show: false
            })
            let url = new URL('stills', window.location.origin);
            history.pushState({}, "", url);
        }, 300);
    } else {
        play.value = false;
        let url = currentProject.value.media[activeSlide.value].video_id ? '/animation' : '/stills'
        router.push(url);
        if (url == route.path) {
            history.pushState({}, "", url);
        }
        setTimeout(() => {
            updateProjectSlider({
                ...projectSlider.value,
                show: false
            })
        }, 100);
    }
}

function handleKeyDown(event) {
    addKeystroke();
    // only listen to key events if the project slider is open
    if (!projectSlider.value.show) return;
    // get the index of the current project in the projects array
    const index = projects.value.findIndex(project => project.slug === currentProject.value.slug)
    switch (event.key) {
        case 'ArrowUp':
            activeSlide.value = activeSlide.value > 0 ? activeSlide.value - 1 : currentProject.value.media.length - 1
            break
        case 'ArrowDown':
            activeSlide.value = activeSlide.value < currentProject.value.media.length - 1 ? activeSlide.value + 1 : 0
            break
        case 'ArrowLeft':
            // get the previous project
            const previousProject = index > 0 ? projects.value[index - 1] : projects.value[projects.value.length - 1];
            // navigate to the previous project
            router.push(`/projects/${previousProject.slug}`);
            activeSlide.value = 0
            updateScaleTransition({
                ...scaleTransition.value,
                image: ''
            })
            break
        case 'ArrowRight':
            // get the next project
            const nextProject = index < projects.value.length - 1 ? projects.value[index + 1] : projects.value[0];
            // navigate to the next project
            router.push(`/projects/${nextProject.slug}`);
            activeSlide.value = 0
            updateScaleTransition({
                ...scaleTransition.value,
                image: ''
            })
            break
    }
}

function lockScroll(lock) {
    if (lock) {
        document.body.style.top = '-' + window.scrollY + 'px';
        document.body.style.position = 'fixed';
    } else {
        let scrollY = document.body.style.top;
        document.body.style.top = '';
        document.body.style.position = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
}

function getSlideIndexFromId(id) {
    if (currentProject.value.media) {
        const slideIndex = currentProject.value.media.findIndex(slide => slide.id == id);
        return slideIndex !== -1 ? slideIndex : 0
    }
    return 0
}

watch(projectSlider, (val) => {
    if (projectSlider.value.show) {
        activeSlide.value = getSlideIndexFromId(val.activeSlide)
    }
    updateCols(1)
    // console.log(currentProject.value.media[activeSlide.value])
    lockScroll(val.show)
});

watch(activeSlide, (val) => {
    if (projectSlider.value.show) {
        if (currentProject.value.media[val].video_id) {
            muted.value = false
        } else {
            muted.value = true
        }
    }
});

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    // console.log('hide')
    window.removeEventListener('keydown', handleKeyDown)
})
</script>
