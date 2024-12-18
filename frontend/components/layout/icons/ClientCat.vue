<template>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" viewBox="0 0 200 200" style="enable-background:new 0 0 200 200;" xml:space="preserve">
        <g id="ClientCat" transform="translate(-151 -606)">
            <polygon :class="[darkMode ? 'fill-accent-dark' : 'fill-accent-light']" points="307.1,613.3 282.7,657.2 221.7,657.2 196.1,613.3 170.5,657.2 170.5,798.7 331.5,798.7 331.5,657.2 	
                " />
            <polygon class="st1" points="248.6,725.5 255.9,725.5 255.9,720.6 260.8,720.6 260.8,713.3 255.9,713.3 248.6,713.3 243.7,713.3 
                243.7,720.6 248.6,720.6 		" />
            <rect x="202.2" y="703.6" class="st1" width="19.5" height="17.1" />
            <rect x="285.1" y="703.6" class="st1" width="17.1" height="17.1" />
            <polygon v-show="mouthOpen" class="st1" points="252.2,764.5 270.5,737.7 233.9,737.7" />
        </g>
        <rect v-show="!mouthOpen" x="82.9" y="131.7" class="st1" width="36.6" height="8" />
    </svg>
</template>

<script setup lang="ts">
type Timeout = any
import { ref, watch } from 'vue'
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
const ui = useUIStore();
const { darkMode, clientSpeaks } = storeToRefs(ui);
const mouthOpen = ref<boolean>(false)
const isSpeaking = ref<boolean>(false)
let speakInterval: Timeout | number | undefined = undefined;

const startTalking = () => {
    if (isSpeaking.value) return;
    isSpeaking.value = true;

    if (speakInterval === undefined) {
        speakInterval = setInterval(() => {
            mouthOpen.value = !mouthOpen.value; // Toggle mouthOpen
        }, 300); // Toggle every 300ms
    }
};

const stopTalking = () => {
    clearInterval(speakInterval);
    speakInterval = undefined;
    mouthOpen.value = false;
    isSpeaking.value = false;
};

watch(clientSpeaks, (val) => {
    val ? startTalking() : stopTalking();
})
</script>