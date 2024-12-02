<template>
  <div :class="[type == 'hide' ? 'hidden opacity-0' : '']"
    class="hidden md:block cursor text-dark fill-dark fixed z-[1000] pointer-events-none"
    :style="{ left: mouseX + 'px', top: mouseY + 'px' }">
    <div
      class="absolute rounded-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 duration-300 ease-in-out border-solid flex items-center justify-center shadow-lg"
      :class="[
        type == '' ? 'p-[3px] border-[4px]' : '',
        type == 'link' ? 'p-[8px] border-[12px] border-white/25' : 'p-2 border-2'
      ]">
      <svg v-if="type == 'arrow-left'" class="icon icon-arrow-left w-8 h-8">
        <use xlink:href="#icon-arrow-left"></use>
      </svg>
      <svg v-if="type == 'arrow-down'" class="icon icon-arrow-down w-6 h-6 m-1">
        <use xlink:href="#icon-arrow-down"></use>
      </svg>
      <svg v-if="type == 'arrow-right'" class="icon icon-arrow-right w-8 h-8">
        <use xlink:href="#icon-arrow-right"></use>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Cursor {
  type?: string,
  title?: string
}

import { useUIStore } from '../../store/ui';
import { storeToRefs } from 'pinia';
import { ref, watch, onBeforeUnmount } from 'vue';

// Pinia store
const uiStore = useUIStore();
const { mouseX, mouseY, cursor } = storeToRefs(uiStore);

// Component state
const left = ref(0);
const top = ref(0);
const type = ref('');  // Will hold cursor.type or fallback
const title = ref('');
const idleTime = ref(0);
const showTitle = ref(false);
let cursorInterval: number | undefined = undefined;

// Watchers for mouseX, mouseY and cursor changes
watch(mouseX, (value) => {
  left.value = value;
  idleTime.value = 0;
});

watch(mouseY, (value) => {
  top.value = value;
  idleTime.value = 0;
});

watch(cursor, (value: Cursor | null) => {
  if (value !== null) {
    type.value = typeof value.type == 'string' ? value.type : '';
    title.value = typeof value.title == 'string' ? value.title : '';
  } else {
    type.value = '';  // Fallback when cursor is null
    title.value = '';
  }

  if (cursorInterval === undefined) {
    cursorInterval = setInterval(() => {
      idleTime.value += 1;
      showTitle.value = idleTime.value > 200;
    }, 10) as unknown as number; // 10 milliseconds
  }
});

// Cleanup the interval when the component is unmounted
onBeforeUnmount(() => {
  if (cursorInterval !== undefined) {
    clearInterval(cursorInterval);
  }
});

</script>

<style>
html {
  cursor: none;
}
</style>
