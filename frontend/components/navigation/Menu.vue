<template>
    <nav class="flex items-center main-nav">
        <ul class="flex gap-5 justify-between items-center w-full">
            <li>
                <nuxt-link class="relative" :to="'/about'">about SO</nuxt-link>
            </li>
            <li>
                <nuxt-link class="relative" :to="'/journal'">Journal</nuxt-link>
            </li>
            <li>
                <ElementsButton class="!py-1 !px-3 after:opacity-0" :url="'mailto:contact@sjoerdoudman.com'"
                    :title="'contact'">
                </ElementsButton>
            </li>
            <li class="hidden lg:block">
                <div @click="toggleSink(showSink ? false : true)" class="cursor-pointer p-2 rounded-md"
                    :class="[darkMode ? showSink ? 'bg-black/50' : 'bg-black/0' : showSink ? 'bg-white/50' : 'bg-white/0']">
                    <svg class="icon icon-cog w-5 h-5 ease-in-out duration-200" :class="[showSink ? '' : 'rotate-90']"
                        :style="{ fill: themeColor }">
                        <use xlink:href="#icon-cog"></use>
                    </svg>
                </div>
            </li>
        </ul>
    </nav>
</template>
<script setup lang="ts">
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';
const ui = useUIStore();
const { toggleShowSink } = ui;
const { darkMode, themeColor, showSink } = storeToRefs(ui);
const cookies = useCookies();
const toggleSink = (val: boolean) => {
    cookies.set('show-sink', val, { path: '/', maxAge: 60 * 60 * 24 * 7 });
    toggleShowSink(val);
}
</script>