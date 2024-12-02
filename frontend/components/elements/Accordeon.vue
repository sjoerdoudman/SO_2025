<template>
    <ul v-if="listItems" class="mt-half-space">
        <li @click="activeId !== index ? activeId = index : activeId = null"
            :class="[activeId == index ? 'bg-white' : '']" v-for="(item, index) in listItems" :key="index"
            class="duration-300">
            <div class="container-md py-quarter-space">
                <h4 :class="[activeId == index ? '!text-black' : '']" class="p flex justify-between cursor-pointer">
                    <span v-text="item.title"></span>
                    <span v-if="activeId !== index">+</span>
                    <span v-else>-</span>
                </h4>
                <div :class="[activeId == index ? 'max-h-[500px] duration-[.5s] delay-[.5s]' : 'max-h-0 duration-300']"
                    class="overflow-hidden">
                    <div class="content-column">
                        <p class="text-[#696969]" v-html="item.content"></p>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const activeId = ref<number | null>(null);
const props = defineProps<{
    listItems: Array<{ title: string; content: string }>;
}>();

</script>