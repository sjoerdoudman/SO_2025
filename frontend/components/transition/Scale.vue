<template>
    <figure ref="scaler"
        class="scaler z-[50] overflow-hidden flex items-center justify-center ease-[cubic-bezier(1,0.14,0.48,1)]"
        :class="[
            fixed ? 'fixed' : 'absolute',
            show ? 'opacity-100 bg-black' : 'opacity-0',
            show && !animate ? 'transition-opacity duration-[0s]' : show && animate ? '!transition-all !duration-[.8s]' : 'pointer-events-none duration-0'
        ]" :style="{
            left: `${coords.left}px`, top: `${coords.top}px`, width: `${coords.width}px`, height: `${coords.height}px`
        }">
        <img v-if="image"
            :class="[cover ? 'object-cover min-w-full min-h-full' : 'object-contain max-w-full max-h-full']"
            :srcset="image.srcset" />
    </figure>
</template>

<script setup lang="ts">
import { useUIStore } from '../../store/ui';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { watch, ref } from 'vue';
// import { gsap } from 'gsap';

interface Scaler {
    scroll: number,
    coords: {
        left: number, top: number, width: number, height: number
    },
    cover: boolean,
}

interface Image {
    id: string,
    alt: string,
    preload: string,
    srcset: string,
    url: string
}

const ui = useUIStore();
const { toggleIsTransitioning } = ui;
const { scaleTransition, projectSlider, personSlider } = storeToRefs(ui);
const router = useRouter();

const scaler = ref(null)

const fixed = ref(false)
const show = ref(false)
const animate = ref(false)
const coords = ref({ width: 0, height: 0, top: 0, left: 0 })
const image = ref<null | undefined | Image>(null)
const cover = ref(scaleTransition.value.cover)

const animateIn = (val: Scaler) => {
    coords.value = val.coords
    setTimeout(() => {
        show.value = true
        toggleIsTransitioning(true)
        setTimeout(() => {
            animate.value = true

            coords.value = {
                width: window.innerWidth,
                height: window.innerHeight,
                left: 0,
                top: val.scroll
            }

            setTimeout(() => {
                animate.value = false
                fixed.value = true
                coords.value = {
                    ...coords.value,
                    top: 0
                }
            }, 700);
        }, 400);
    }, 500);
}

const animateOut = (val: Scaler) => {
    fixed.value = true
    show.value = true
}

watch(scaleTransition, (val) => {
    if (val) {
        router.options.scrollBehavior = () => {
            return false
        }
        image.value = val.image
        cover.value = val.cover
        val.reverse ? animateOut(val) : animateIn(val);
    }
});
watch([projectSlider, personSlider], (val) => {
    if (scaleTransition.value.reverse) {
        animate.value = false
        fixed.value = false
        coords.value = {
            ...coords.value,
            top: scaleTransition.value.scroll
        }
        setTimeout(() => {
            animate.value = true
            coords.value = scaleTransition.value.coords
            setTimeout(() => {
                show.value = false
                scaleTransition.value.show = false
            }, 700);
        }, 500);
    } else {
        setTimeout(() => {
            show.value = false
            fixed.value = false
            setTimeout(() => {
                toggleIsTransitioning(false)
            }, 1000);
        }, 500);
    }
});
</script>
