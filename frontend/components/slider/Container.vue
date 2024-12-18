<template>
    <div ref="slider" class="cursor-none -mx-[1rem]" @mouseleave="showCursor(false, '')">
      <!-- Cursor -->
      <div
        class="fixed z-[100] w-[1px] h-[1px] pointer-events-none transition ease-in-out duration-200 hidden md:block"
        :class="[showCursorState ? '' : 'opacity-0']"
        :style="{ left: `${mouseX}px`, top: `${mouseY}px` }"
      >
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center ease-in-out duration-300 border border-solid border-current"
          :class="[
            darkMode ? 'bg-black/75' : 'bg-white/75',
            cursorType === 'show_site' ? 'w-16 h-16' : cursorType === 'prev' || cursorType === 'next' ? 'w-12 h-12' : 'w-4 h-4',
          ]"
        >
          <svg
            v-if="cursorType === 'prev'"
            :style="{ fill: themeColor }"
            class="icon icon-arrow-left w-6 h-6"
          >
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
          <svg
            v-if="cursorType === 'next'"
            :style="{ fill: themeColor }"
            class="icon icon-arrow-right w-6 h-6"
          >
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
          <p
            class="absolute block text-center text-xs mt-1 ease-in-out duration-300"
            :class="[
              cursorType === 'show_site' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1',
            ]"
          >
            View<br />site
          </p>
        </div>
      </div>
  
      <!-- Slider container -->
      <div
        class="slider aspect-video ease-in-out duration-500 delay-200"
        :class="{ opacity: hasLoaded  }"
      >
        <div ref="inner" class="slider__inner h-full" :class="{ 'overflow-hidden': slides.length === 1 }">
          <!-- Slides -->
          <div
            v-if="hasLoaded && slides.length > 0"
            ref="track"
            class="slider__track flex h-full"
            :class="[ isTransitioning ? 'transition-transform duration-[.5s]' : '' ]"
            :style="{ width: trackWidth, transform: trackTransform }"
          >
            <!-- Render slides dynamically -->
            <SliderSlide
              v-for="(slide, index) in slides"
              @mouseenter="slide.url && slide.id === activeSlide.id ? showCursor(true, 'show_site') : showCursor(true, slide.id === activeSlide.id ? '' : mouseX < 400 ? 'prev' : 'next') "
              @mouseleave="showCursor(false, '')"
              :type="type"
              :key="index"
              :slide="slide"
              :isActive="slide.id === activeSlide.id"
              @click="slide.id !== activeSlide.id ? navigateTo(slide) : null"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Slide } from '@/types';
  import { ref, watch, onMounted, computed } from 'vue';
  import { useUIStore } from '@/store/ui';
  import { storeToRefs } from 'pinia';
  
  const ui = useUIStore();
  const { themeColor, darkMode } = storeToRefs(ui);
  
  // Props
  const props = defineProps({
    home: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'media',
      required: false
    },
    slides: {
      type: Array as () => Array<Slide>,
      default: () => [],
    },
  });
  
  // State
  const mouseX = ref(0);
  const mouseY = ref(0);
  const showCursorState = ref(false);
  const cursorType = ref('');
  const hasLoaded = ref(false);
  const activeSlide = ref(props.slides[0]);
  const isTransitioning = ref(false);
  const xDown = ref<number | null>(null);
  const yDown = ref<number | null>(null);
  const slider = ref<HTMLElement | null>(null);
  
  // Computed
  const trackWidth = computed(() => `${props.slides.length * 100}%`);
  const trackTransform = computed(() => `translateX(-${activeSlide.value.id * (100 / props.slides.length)}%)`);
  const sliderWidth = computed(() => slider.value?.getBoundingClientRect().width);
  
  // Methods
  function navigateTo(slide: Slide) {
    isTransitioning.value = true;
    activeSlide.value = slide;
    cursorType.value == 'next' || cursorType.value == 'prev' ? cursorType.value = '' : null;
    if (slide.url) cursorType.value = 'show_site';
    setTimeout(() => {
      isTransitioning.value = false;
    }, 500);
  }
  
  function showCursor(show: boolean, type: string) {
    showCursorState.value = show;
    cursorType.value = type;
  }
  
  function handleSlideNavigation(direction: 'next' | 'prev') {
    const currentIndex = activeSlide.value.id;
    isTransitioning.value = true;
    if (direction === 'next') {
      activeSlide.value = props.slides[(currentIndex + 1) % props.slides.length];
    } else {
      activeSlide.value =
        props.slides[(currentIndex - 1 + props.slides.length) % props.slides.length];
    }
    setTimeout(() => {
      isTransitioning.value = false;
    }, 500);
  }
  
  // Watchers
  watch(
    () => hasLoaded.value,
    (loaded) => {
      if (loaded && props.slides.length > 1) {
        setTimeout(() => {
          const track = document.querySelector('.slider__track');
          track?.addEventListener('touchstart', handleTouchStart, false);
          track?.addEventListener('touchmove', handleTouchMove, false);
        }, 100);
      }
    }
  );

  const updateMouse = (event:any) => {
    if (slider.value) {
      let l = slider.value.getBoundingClientRect().left
      let t = slider.value.getBoundingClientRect().top
      mouseX.value = event.pageX - (window.scrollX)
      mouseY.value = event.pageY - (window.scrollY)
    } else {
      return
    }
  }
  
  // Touch Handlers (Placeholder for actual implementation)
  function handleTouchStart(event: TouchEvent) {
    const firstTouch = event.touches[0];
    xDown.value = firstTouch.clientX;
    yDown.value = firstTouch.clientY;
  }
  
  function handleTouchMove(event: TouchEvent) {
    if (!xDown.value || !yDown.value) return;
  
    const xDiff = xDown.value - event.touches[0].clientX;
    const yDiff = yDown.value - event.touches[0].clientY;
  
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) handleSlideNavigation('next');
      else handleSlideNavigation('prev');
    }
  
    xDown.value = null;
    yDown.value = null;
  }

  // Lifecycle
  onMounted(() => {
    props.slides.forEach((slide, index) => {
      slide.id = index;
    });
    hasLoaded.value = true;
    if (process.browser) { 
      window.addEventListener("mousemove", function(e) {
        updateMouse(e);
      });
      showCursorState.value = true;
    }
  });

  </script>
  