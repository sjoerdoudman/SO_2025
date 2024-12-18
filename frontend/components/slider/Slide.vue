<template>
    <div class="relative w-full h-full">
        <figure v-if="type == 'media'" class="relative w-full h-full overflow-hidden px-[1rem]">
            <img class="w-full" :src="slide.img.sizes.xl" alt="">
            <figcaption v-if="slide.caption !== undefined" class="absolute left-0 bottom-0 py-2 px-3" :class="[ darkMode ? 'bg-dark' : 'bg-light' ]">
                <p class="text-xs" v-html="slide.caption"></p>
            </figcaption>
        </figure>
        <div v-else class="border w-full h-full" :style="{ borderColor : themeColor }">
            <!-- <ProjectTeaser :project="slide"></ProjectTeaser> -->
        </div>
        <a v-if="slide.url && isActive" class="absolute w-full h-full left-0 top-0 cursor-none" :href="slide.url" target="_blank"></a>
    </div>
</template>

<script setup lang="ts">
    import type { Slide } from '@/types';
    import { useUIStore } from '@/store/ui';
    import { storeToRefs } from 'pinia';
    
    const ui = useUIStore();
    const { themeColor, darkMode } = storeToRefs(ui);
    const props = defineProps<{
        slide: Slide;
        type: string;
        isActive: boolean;
    }>();
</script>