<template>
    <div class="wiper fixed w-screen h-full left-0 top-0 z-30 flex pointer-events-none"
        :class="[animateOut ? 'items-start' : 'items-end']">
        <ClientOnly>
            <div v-if="arr" v-for="(col, index) in arr" :key="index"
                :class="[`delay-[${300 + (100 * index)}ms]`, animateIn ? 'max-h-full' : 'max-h-0']"
                class="bg-black h-full flex-1 ease-in-out duration-[.6s]">
            </div>
        </ClientOnly>
    </div>
</template>

<script setup>
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
import { watch, ref } from 'vue';
const ui = useUIStore();
const { pageWipe, cols } = storeToRefs(ui)

const arr = ref(Array.from({ length: cols.value }, (_, i) => i));
const animateIn = ref(false)
const animateOut = ref(false)

watch(pageWipe, (val) => {
    if (val) {
        animateIn.value = true
    } else {
        setTimeout(() => {
            animateOut.value = true
            animateIn.value = false
            setTimeout(() => {
                animateOut.value = false
            }, 1200)
        }, 500);
    }
});

watch(cols, (val) => {
    // console.log(val)
    arr.value = Array.from({ length: val }, (_, i) => i)
});

</script>