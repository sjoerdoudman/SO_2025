<template>
     <ElementsContainer size="small" class="grid gap-quarter-space">
        <h3 v-scroll="onScroll" :class="[ line.acf_fc_layout == 'question' ? 'client' : 'developer' ]" class="font-bold" v-for="(line, index) in item.items">
            <em v-if="line.acf_fc_layout == 'question'" v-html="line.text"></em>
            <span v-else v-html="line.text"></span>
        </h3>
    </ElementsContainer>
</template>

<script setup lang="ts">
import { useScrollWatcher } from '@/composables/dialogueScrollWatcher';
const { onScroll } = useScrollWatcher();
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
</script>