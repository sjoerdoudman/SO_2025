<template>
  <div :class="[isHome ? '' : 'pointer-events-none', showLoader ? '!opacity-100' : '!opacity-0']"
    class="z-[2] opacity-0 fixed w-full h-full top-0 bottom-0 left-0 right-0 flex items-center justify-center duration-[.5s]">
    <h1 v-if="isHome" aria-label="Welcome to Plomp"></h1>
    <div class="relative pb-[2em]">
      <div class="items flex justify-center h-[12vh] lg:h-[15vw]">
        <svg version="1.1" ref="p1" class="l" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15.609px" height="26.465px"
          viewBox="15.77 15.103 15.609 26.465">
          <path
            d="M31.379,28.589c0,2.251-0.713,4.075-2.144,5.475c-1.434,1.397-3.201,2.104-5.311,2.104c-1.582,0-2.859-0.418-3.834-1.25
            v6.65H15.77V21.349h4.26v1.03c0.994-0.927,2.294-1.388,3.896-1.388c2.109,0,3.876,0.689,5.311,2.083
            C30.666,24.468,31.379,26.306,31.379,28.589z M21.02,25.87c-0.66,0.71-0.99,1.611-0.99,2.719c0,1.108,0.33,2.005,0.99,2.721
            c0.658,0.711,1.484,1.065,2.479,1.065c0.996,0,1.819-0.354,2.479-1.065c0.66-0.716,0.99-1.612,0.99-2.721
            c0-1.107-0.33-2.009-0.99-2.719c-0.66-0.714-1.483-1.071-2.479-1.071C22.504,24.799,21.678,25.156,21.02,25.87z" />
        </svg>
        <svg version="1.1" ref="l" class="l" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="4.322px" height="26.465px"
          viewBox="43.107 15.103 4.322 26.465">
          <path d="M43.107,35.832V15.103h4.322v20.729H43.107z" />
        </svg>
        <svg version="1.1" ref="o" class="l" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15.762px" height="26.465px"
          viewBox="59.169 15.103 15.762 26.465">
          <path d="M61.425,34.004c-1.5-1.434-2.256-3.25-2.256-5.415c0-2.166,0.758-3.981,2.268-5.432c1.508-1.443,3.381-2.166,5.615-2.166
            c2.232,0,4.102,0.722,5.611,2.166c1.51,1.449,2.268,3.266,2.268,5.432c0,2.165-0.752,3.981-2.256,5.415
            c-1.492,1.441-3.377,2.164-5.623,2.164C64.802,36.168,62.919,35.445,61.425,34.004z M64.554,25.96
            c-0.646,0.686-0.977,1.56-0.977,2.629c0,1.066,0.33,1.942,0.977,2.626c0.652,0.699,1.484,1.048,2.498,1.048
            c1.01,0,1.844-0.349,2.497-1.048c0.646-0.684,0.975-1.56,0.975-2.626c0-1.069-0.328-1.943-0.975-2.629
            c-0.653-0.694-1.487-1.033-2.497-1.033C66.039,24.927,65.207,25.265,64.554,25.96z" />
        </svg>
        <svg version="1.1" ref="m" class="l" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22.698px" height="26.465px"
          viewBox="86.635 15.103 22.698 26.465">
          <path d="M90.957,28.419v7.413h-4.322V21.349h4.258v0.998c0.978-0.897,2.174-1.355,3.599-1.355c1.719,0,3.098,0.576,4.133,1.745
            c1.196-1.169,2.684-1.745,4.471-1.745c1.988,0,3.527,0.559,4.611,1.665c1.082,1.116,1.627,2.7,1.627,4.747v8.429h-4.316v-8.257
            c0-0.797-0.197-1.449-0.582-1.948c-0.387-0.483-0.953-0.732-1.707-0.732c-0.809,0-1.444,0.29-1.897,0.86
            c-0.455,0.57-0.685,1.352-0.685,2.364v7.713h-4.321v-8.257c0-0.797-0.191-1.449-0.578-1.948c-0.384-0.483-0.953-0.732-1.699-0.732
            c-0.859,0-1.5,0.306-1.937,0.92C91.174,26.423,90.957,27.288,90.957,28.419z" />
        </svg>
        <svg version="1.1" ref="p2" class="l" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15.609px" height="26.465px"
          viewBox="15.77 15.103 15.609 26.465">
          <path
            d="M31.379,28.589c0,2.251-0.713,4.075-2.144,5.475c-1.434,1.397-3.201,2.104-5.311,2.104c-1.582,0-2.859-0.418-3.834-1.25
            v6.65H15.77V21.349h4.26v1.03c0.994-0.927,2.294-1.388,3.896-1.388c2.109,0,3.876,0.689,5.311,2.083
            C30.666,24.468,31.379,26.306,31.379,28.589z M21.02,25.87c-0.66,0.71-0.99,1.611-0.99,2.719c0,1.108,0.33,2.005,0.99,2.721
            c0.658,0.711,1.484,1.065,2.479,1.065c0.996,0,1.819-0.354,2.479-1.065c0.66-0.716,0.99-1.612,0.99-2.721
            c0-1.107-0.33-2.009-0.99-2.719c-0.66-0.714-1.483-1.071-2.479-1.071C22.504,24.799,21.678,25.156,21.02,25.87z" />
        </svg>
      </div>
      <div :class="[showMenu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2']"
        class="hidden lg:flex absolute bottom-0 left-1/2 -translate-x-1/2 w-full min-w-[680px] h-10 justify-center overflow-hidden duration-[.5s] text-white">
        <NavigationMenu class="gap-single-space" v-if="hasMenu"></NavigationMenu>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import the necessary functions
import { ref } from 'vue';
import { useUIStore } from '../../store/ui';
import { storeToRefs } from 'pinia';
import { gsap } from 'gsap';

// set the variables
const uiStore = useUIStore();
const { toggleFirstLoad } = uiStore;
const { showLoader, isHome } = storeToRefs(uiStore);
const hasMenu = ref(false);
const showMenu = ref(false);

// set the refs
const p1 = ref(null);
const l = ref(null);
const o = ref(null);
const m = ref(null);
const p2 = ref(null);

watch(showLoader, (newValue, oldValue) => {
  if (!newValue && oldValue) {
    animateOut();
  } else if (newValue && !oldValue) {
    animateIn();
    if (isHome && !hasMenu.value) {
      hasMenu.value = true
    }
  }
});

watch(isHome, (val) => {
  if (val) {
    hasMenu.value = true
    setTimeout(() => {
      animateIn();
    }, 1000);
  } else {
    showMenu.value = false;
    animateOut();
  }
});

function animateIn() {
  gsap.fromTo(
    [p1.value, l.value, o.value, m.value, p2.value],
    {
      yPercent: 130,
    }, {
    duration: 2.5,
    ease: 'power4.out',
    yPercent: 0,
    onComplete: () => {
      if (isHome.value) {
        showMenu.value = true
        toggleFirstLoad(false);
      } else {
        showMenu.value = false
        animateOut(); // Call the animation out function
      }
    }
  }
  );

  // ------------------------------------ P1
  gsap.fromTo(p1.value, {
    xPercent: -900,
    scale: 0.55
  },
    {
      duration: 2.5,
      delay: 0.2,
      ease: 'power4.out',
      xPercent: 0,
      scale: 1,
    });

  gsap.fromTo(p1.value, {
    opacity: 0
  }, {
    duration: 2.1,
    ease: 'power4.inOut',
    delay: 0.6,
    opacity: 1
  });

  // ------------------------------------ L
  gsap.fromTo(l.value, {
    xPercent: -2500,
    scale: 0.55,
  }, {
    duration: 2.5,
    delay: 0.1,
    ease: 'power4.out',
    xPercent: 0,
    scale: 1,
  });

  gsap.fromTo(l.value, {
    opacity: 0
  }, {
    duration: 2.1,
    ease: 'power4.inOut',
    delay: 0.3,
    opacity: 1
  });

  // ------------------------------------ O
  gsap.fromTo(o.value, {
    scale: 0.55,
  },
    {
      duration: 2.5,
      ease: 'power4.out',
      scale: 1,
    });

  gsap.fromTo(o.value, {
    opacity: 0
  }, {
    duration: 2.4,
    ease: 'power4.inOut',
    opacity: 1
  });

  // ------------------------------------ M
  gsap.fromTo(m.value, {
    xPercent: 400,
    scale: 0.55,
  }, {
    duration: 2.5,
    delay: 0.1,
    ease: 'power4.out',
    force3D: true,
    xPercent: 0,
    scale: 1,
  });

  gsap.fromTo(m.value, {
    opacity: 0
  }, {
    duration: 2.1,
    ease: 'power4.inOut',
    delay: 0.3,
    opacity: 1
  });

  // ------------------------------------ P2
  gsap.fromTo(p2.value, {
    xPercent: 900,
    scale: 0.55,
  }, {
    duration: 2.5,
    delay: 0.2,
    ease: 'power4.out',
    xPercent: 0,
    scale: 1
  });

  gsap.fromTo(p2.value, {
    opacity: 0
  }, {
    duration: 2.1,
    ease: 'power4.inOut',
    delay: 0.6,
    opacity: 1
  });
};

function animateOut() {
  toggleFirstLoad(false);

  gsap.to(
    [p1.value, l.value, o.value, m.value, p2.value],
    {
      duration: .7,
      ease: 'power2.inOut',
      delay: 0,
      opacity: 0,
      yPercent: 10,
      scale: 0.9,
      complete: () => {
        hasMenu.value = false
      }
    }
  );
}
</script>

<style lang="css" scoped>
svg {
  width: auto;
  height: 100%;
  fill: white;
  margin: 0 4%;
}
</style>
