<template>
    <section class="grid gap-single-space my-single-space">
        <div v-for="(paragraph, index) in item.paragraphs" :key="index">
            <div v-if="paragraph.type == 'text'" class="container-md w-full">
                <div class="content-column paragraph" v-html="paragraph.content"></div>
            </div>
            <ElementsAccordeon v-if="paragraph.type == 'accordeon'" :listItems="paragraph.listItems">
            </ElementsAccordeon>
            <div v-if="paragraph.type == 'downloads'" class="container-md w-full">
                <h3 class="h4">
                    Downloads
                </h3>
                <ul class="flex flex-wrap gap-single-space mt-quarter-space">
                    <li v-for="(listItem, index) in paragraph.listItems" :key="index">
                        <ElementsDownload :download="listItem"></ElementsDownload>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
</script>