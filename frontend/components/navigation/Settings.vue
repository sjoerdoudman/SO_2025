<template>
    <div class="flex flex-col lg:flex-row lg:items-center justify-between w-full transition ease-in-out duration-300">
        <!-- Mode -->
        <label ref="modeLabel" for="mode"
            class="group flex items-center justify-between cursor-pointer mt-4 lg:mt-0 lg:mr-6 py-4 lg:py-0 border-t-2 lg:border-t-0 border-dotted"
            :style="{ borderColor: $hexToRgba(themeColor, '.3') }">
            <div class="mr-3 font-medium">
                <p>dark mode</p>
            </div>
            <div ref="toggle" class="relative group-hover:opacity-75 ease-in-out duration-200">
                <input type="checkbox" v-model="mode" id="mode" class="sr-only">
                <div :style="{ backgroundColor: themeColor }"
                    class="block w-12 h-7 rounded-full transition ease-in-out duration-300"></div>
                <div :class="darkMode ? 'transform translate-x-full bg-dark' : 'bg-gray-200'"
                    class="dot absolute left-1 top-1 w-5 h-5 rounded-full transition ease-in-out duration-300"></div>
            </div>
        </label>
        <!-- Theme -->
        <div class="flex items-center justify-between mr-0 lg:mr-6 py-4 lg:py-0 border-t-2 lg:border-t-0 border-dotted"
            :style="{ borderColor: $hexToRgba(themeColor, '.3') }">
            <p class="mr-3 relative">
                <span class="relative opacity-0 whitespace-nowrap" v-html="'try a theme'"></span>
                <span :class="blink ? 'opacity-1' : 'opacity-0 -translate-y-6'"
                    class="absolute left-0 top-0 whitespace-nowrap duration-[.5s]" v-html="'try a theme'"></span>
                <span :class="blink ? 'opacity-0 translate-y-6' : 'opacity-1'"
                    class="absolute left-0 top-0 whitespace-nowrap duration-[.5s]" v-html="'just for fun'"></span>
            </p>
            <div class="relative mr-1" v-for="(coloroption, index) in colors" :key="index">
                <label class="block rounded-full p-1 border-2 cursor-pointer hover:opacity-75" :for="coloroption.name"
                    :style="{ borderColor: (darkMode ? coloroption.lightValue : coloroption.darkValue) == themeColor ? (darkMode ? coloroption.lightValue : coloroption.darkValue) : 'transparent' }">
                    <div class="w-4 h-4 rounded-full"
                        :style="{ backgroundColor: (darkMode ? coloroption.lightValue : coloroption.darkValue) }">
                    </div>
                </label>
                <input class="absolute opacity-0 left-0 top-0" type="radio" :id="coloroption.name"
                    :name="coloroption.name" :value="(darkMode ? coloroption.lightValue : coloroption.darkValue)"
                    v-model="color">
            </div>
        </div>
        <!-- Music -->
        <ElementsSCPlayer></ElementsSCPlayer>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from 'nuxt/app';
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';

const ui = useUIStore();
const { updateThemeColor, toggleDarkMode } = ui;
const { darkMode, themeColor } = storeToRefs(ui);
const cookies = useCookies();

interface ColorOption {
    name: string;
    lightValue: string;
    darkValue: string;
}

const colors: ColorOption[] = [
    { name: 'purple', lightValue: '#BF8EF7', darkValue: '#612D9D' },
    { name: 'ocean', lightValue: '#8EF7CD', darkValue: '#1F674A' },
    { name: 'pink', lightValue: '#FFD9EE', darkValue: '#841B41' },
    { name: 'blue', lightValue: '#8EECF7', darkValue: '#183A6A' },
];

const color = ref<string | null>(null);
const modeLabel = ref<HTMLElement | null>(null);
const mode = ref<boolean>(darkMode.value);

let blinkInterval: number | undefined = undefined;
const blink = ref<boolean>(false);

const { $hexToRgba } = useNuxtApp() as any;

// a function that switches a boolean value every 3 seconds
const startBlinking = () => {
    if (blinkInterval === undefined) {
        blinkInterval = setInterval(() => {
            blink.value = blink.value ? false : true
        }, 5000) as unknown as number; // 10 milliseconds
    }
}

watch(mode, (val) => {
    const currentColor = colors.find(
        (color) => (val ? color.darkValue : color.lightValue) === themeColor.value
    );

    if (currentColor) {
        const switchColor = val ? currentColor.lightValue : currentColor.darkValue;
        updateThemeColor(switchColor);
        cookies.set('theme-color', switchColor, { path: '/', maxAge: 60 * 60 * 24 * 7 });
    }
    toggleDarkMode(val);
    cookies.set('dark-mode', val, { path: '/', maxAge: 60 * 60 * 24 * 7 });
});

watch(color, (val) => {
    if (val) {
        updateThemeColor(val);
        cookies.set('theme-color', val, { path: '/', maxAge: 60 * 60 * 24 * 7 });
    }
});

onMounted(() => {
    startBlinking();
});

// Cleanup the interval when the component is unmounted
onBeforeUnmount(() => {
    if (blinkInterval !== undefined) {
        clearInterval(blinkInterval);
    }
});
</script>