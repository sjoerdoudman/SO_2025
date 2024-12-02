<template>
    <button :action="download.url" class="block flex gap-3 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-12" viewBox="0 0 48.167 68">
            <g id="Group_82" data-name="Group 82" transform="translate(-138 -1339)">
                <path id="Rectangle_117" data-name="Rectangle 117"
                    d="M0,0H27.167a21,21,0,0,1,21,21V68a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z"
                    transform="translate(138 1339)" fill="#fff" />
                <line id="Line_207" data-name="Line 207" x2="30" transform="translate(145.353 1365.917)" fill="none"
                    stroke="#707070" stroke-width="2" />
                <line id="Line_209" data-name="Line 209" x2="30" transform="translate(145.353 1384.806)" fill="none"
                    stroke="#707070" stroke-width="2" />
                <line id="Line_208" data-name="Line 208" x2="21" transform="translate(145.697 1375.361)" fill="none"
                    stroke="#707070" stroke-width="2" />
            </g>
        </svg>
        {{ download.title }}
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    download: {
        type: Object,
        required: true
    }
})
</script>