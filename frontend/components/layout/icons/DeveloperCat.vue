<template>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" viewBox="0 0 200 200" style="enable-background:new 0 0 200 200;" xml:space="preserve">
        <g id="developerCat" transform="translate(-1192 -231)">
            <polygon :style="{ fill: themeColor }"
                points="1331,288.8 1253,288.8 1213,242.8 1213,288.8 1213,422.9 1371,422.9 1371,288.8 1371,242.8 	" />
            <rect :class="[darkMode ? 'fill-dark' : 'fill-light']" id="Rectangle_74" x="1239" y="332.9" class="st1"
                width="30" height="10" />
            <rect :class="[darkMode ? 'fill-dark' : 'fill-light']" id="Rectangle_75" x="1321" y="332.9" class="st1"
                width="30" height="10" />
            <polygon :class="[darkMode ? 'fill-dark' : 'fill-light']" class="st1"
                points="1307,346.9 1285,346.9 1285,356.9 1292,356.9 1292,362.9 1300,362.9 1300,356.9 1307,356.9 	" />
            <rect :class="[darkMode ? 'fill-dark' : 'fill-light']" x="1284.6" y="374.4" class="st1" width="22"
                height="8.8" />
        </g>
        <rect v-show="mouthOpen" x="86.2" y="143.4" class="st1" width="34.8" height="30.7" />
    </svg>
</template>

<script setup lang="ts">
type Timeout = any
import { ref, watch } from 'vue'
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
const ui = useUIStore();
const { themeColor, darkMode, developerSpeaks } = storeToRefs(ui);
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

watch(developerSpeaks, (val) => {
    val ? startTalking() : stopTalking();
})
</script>