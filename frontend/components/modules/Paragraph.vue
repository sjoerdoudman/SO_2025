<template>
    <ElementsContainer size="small">
        <div v-scroll="onScroll" :class="[ item.role ]" class="paragraph" v-html="item.text"></div>
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