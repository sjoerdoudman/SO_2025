<template>
    <footer>
        <section
            :class="[show ? 'pointer-events-all opacity-1' : 'opacity-0 pointer-events-none', darkMode ? 'text-dark' : 'text-light']"
            class="fixed w-full h-screen left-0 bottom-0 z-[2] pt-single-space overflow-hidden transition-colors duration-[.2s]"
            :style="{ backgroundColor: show ? themeColor : '' }">

            <!-- <div ref="sos" class="absolute left-single-space top-[80px] bottom-0 duration-[.5s] flex items-center">
                <p class="flex flex-col font-bold text-white/25 text-[40vh] leading-none items-center">
                    <span>S</span>
                    <span>O</span>
                </p>
            </div> -->
            <div ref="dialogue" class="absolute left-1/2 md:left-[22vw] top-auto md:top-[25vh] bottom-[25vh] md:bottom-auto -translate-x-1/2 md:-translate-x-0">
                <div :class="[show ? 'translate-y-0 delay-[1s]' : 'translate-y-4 opacity-0']"
                    class="relative bg-yellow-200 p-half-space w-[80vw] md:w-[42vw] duration-300">
                    <p class="h2 font-semibold text-dark">
                        Please... Check out my <nuxt-link class="underline" to="/journal">Journal</nuxt-link>. It’s
                        free!
                    </p>
                    <div class="absolute top-full right-6 skew-x-[10deg]" :style="{
                        width: '0px',
                        height: '0px',
                        borderStyle: 'solid',
                        borderWidth: '0 50px 50px 0',
                        borderColor: ' transparent rgb(254 240 138) transparent transparent'
                    }"></div>
                </div>
                <p :class="[show ? 'translate-y-0 delay-[1.3s]' : 'translate-y-4 opacity-0']"
                    class="mt-half-space duration-200">
                    Or just plain old email me at: <br> <a class="font-semibold hover:underline"
                        href="contact@sjoerdoudman.com">contact@sjoerdoudman.com</a>
                </p>
            </div>
            <div ref="catOne" :class="[show ? '' : 'translate-x-full']"
                class="absolute -right-[5vw] bottom-0 w-[40vw] h-[40vw] duration-[1s]">

                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 600 600"
                    style="enable-background:new 0 0 600 600;" xml:space="preserve"
                    :class="[darkMode ? 'fill-dark' : 'fill-light']">
                    <g>
                        <rect x="161.9" y="438.9" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -154.1589 94.8503)"
                            class="st0" width="10" height="10" />
                        <rect x="173.1" y="466.8" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -163.7607 101.086)"
                            class="st0" width="10" height="10" />
                        <rect x="139.4" y="383.3" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -134.9551 82.3792)"
                            class="st0" width="10" height="10" />
                        <rect x="150.7" y="411.1" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -144.557 88.6147)"
                            class="st0" width="10" height="10" />
                        <rect x="206.8" y="550.2" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -192.5665 119.7931)"
                            class="st0" width="10" height="10" />
                        <rect x="184.4" y="494.6" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -173.3628 107.3217)"
                            class="st0" width="10" height="10" />
                        <rect x="195.6" y="522.4" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -182.9646 113.5574)"
                            class="st0" width="10" height="10" />
                        <rect x="218.1" y="578" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -202.1684 126.0286)"
                            class="st0" width="10" height="10" />
                        <rect x="72" y="216.4" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -77.3437 44.9652)"
                            class="st0" width="10" height="10" />
                        <rect x="83.2" y="244.2" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -86.9457 51.2008)"
                            class="st0" width="10" height="10" />
                        <rect x="60.7" y="188.6" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -67.7418 38.7296)"
                            class="st0" width="10" height="10" />
                        <rect x="105.7" y="299.9" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -106.1494 63.6721)"
                            class="st0" width="10" height="10" />
                        <rect x="116.9" y="327.7" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -115.7512 69.9078)"
                            class="st0" width="10" height="10" />
                        <rect x="94.5" y="272.1" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -96.5475 57.4364)"
                            class="st0" width="10" height="10" />
                        <rect x="128.2" y="355.5" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -125.3531 76.1435)"
                            class="st0" width="10" height="10" />
                        <rect x="520.7" y="261.6" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -61.5976 216.359)"
                            class="st0" width="10" height="10" />
                        <rect x="532" y="289.4" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -71.1995 222.5947)"
                            class="st0" width="10" height="10" />
                        <rect x="543.2" y="317.3" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -80.8014 228.8304)"
                            class="st0" width="10" height="10" />
                        <rect x="430.8" y="39.1" transform="matrix(0.9272 -0.3746 0.3746 0.9272 15.2177 166.4739)"
                            class="st0" width="10" height="10" />
                        <rect x="588.1" y="428.5" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -119.2089 253.7727)"
                            class="st0" width="10" height="10" />
                        <rect x="554.4" y="345.1" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -90.4033 235.066)"
                            class="st0" width="10" height="10" />
                        <rect x="509.5" y="233.8" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -51.9957 210.1233)"
                            class="st0" width="10" height="10" />
                        <rect x="565.7" y="372.9" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -100.0051 241.3017)"
                            class="st0" width="10" height="10" />
                        <rect x="576.9" y="400.7" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -109.6071 247.537)"
                            class="st0" width="10" height="10" />
                        <rect x="464.5" y="122.5" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -13.5881 185.1809)"
                            class="st0" width="10" height="10" />
                        <rect x="453.3" y="94.7" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -3.9861 178.9452)"
                            class="st0" width="10" height="10" />
                        <rect x="442" y="66.9" transform="matrix(0.9272 -0.3746 0.3746 0.9272 5.6158 172.7095)"
                            class="st0" width="10" height="10" />
                        <rect x="475.8" y="150.4" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -23.19 191.4162)"
                            class="st0" width="10" height="10" />
                        <rect x="487" y="178.2" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -32.7919 197.6519)"
                            class="st0" width="10" height="10" />
                        <rect x="498.2" y="206" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -42.3937 203.8876)"
                            class="st0" width="10" height="10" />
                        <rect x="158.3" y="221.4" transform="matrix(0.4871 -0.8733 0.8733 0.4871 -113.9283 258.7266)"
                            class="st0" width="10" height="10" />
                        <rect x="105.9" y="192.1" transform="matrix(0.4871 -0.8733 0.8733 0.4871 -115.2792 197.9731)"
                            class="st0" width="10" height="10" />
                        <rect x="132.1" y="206.7" transform="matrix(0.4871 -0.8733 0.8733 0.4871 -114.6037 228.3498)"
                            class="st0" width="10" height="10" />
                        <polygon class="st0"
                            points="60.4,174.7 65.3,166 58.4,162.1 57.3,159.3 48,163 51.7,172.3 54.3,171.3 	" />
                        <rect x="79.7" y="177.5" transform="matrix(0.4871 -0.8733 0.8733 0.4871 -115.9546 167.5964)"
                            class="st0" width="10" height="10" />
                        <rect x="359.3" y="153.4" transform="matrix(0.3907 -0.9205 0.9205 0.3907 76.1503 431.8141)"
                            class="st0" width="10" height="10" />
                        <rect x="371" y="125.8" transform="matrix(0.3907 -0.9205 0.9205 0.3907 108.7121 425.7787)"
                            class="st0" width="10" height="10" />
                        <rect x="382.7" y="98.2" transform="matrix(0.3907 -0.9205 0.9205 0.3907 141.2735 419.7436)"
                            class="st0" width="10" height="10" />
                        <rect x="406.2" y="42.9" transform="matrix(0.3907 -0.9205 0.9205 0.3907 206.3977 407.6736)"
                            class="st0" width="10" height="10" />
                        <rect x="394.4" y="70.5" transform="matrix(0.3907 -0.9205 0.9205 0.3907 173.8359 413.709)"
                            class="st0" width="10" height="10" />
                        <polygon class="st0"
                            points="425.5,26.9 428.4,20.1 431.1,19 427.3,9.8 418.1,13.5 419.2,16.3 416.3,23 	" />
                        <polygon class="st0" points="359.8,390.7 375.8,384.3 368,365 389.2,356.4 383.6,342.7 362.4,351.2 362.4,351.2 346.5,357.7 
                            346.5,357.7 320.3,368.2 325.9,382 352,371.4 	" />
                        <rect x="199.9" y="391.5" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -129.4714 121.3501)"
                            class="st0" width="95" height="4.5" />
                        <rect x="395.2" y="307.8" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -84.2334 188.1783)"
                            class="st0" width="93.5" height="5.9" />
                        <rect x="399.6" y="318.8" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -88.033 190.6475)"
                            class="st0" width="93.5" height="5.9" />
                        <rect x="205.5" y="400.8" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -132.8782 123.8996)"
                            class="st0" width="93.5" height="5.9" />
                        <polygon class="st0"
                            points="193.2,386.2 228.9,371.7 233.9,384 250.4,377.3 245.4,365 281.2,350.6 278.4,343.7 190.4,379.3 	" />
                        <polygon class="st0"
                            points="474.7,267.1 388,302.1 390.3,307.6 427.4,292.6 432.4,305 447.5,298.9 442.5,286.5 476.9,272.6 	" />
                        <rect x="319.9" y="173.3" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -43.1189 134.6774)"
                            class="st0" width="10" height="10" />
                        <rect x="347.7" y="162" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -36.8849 144.2927)"
                            class="st0" width="10" height="10" />
                        <rect x="180.8" y="229.4" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -74.2988 86.6814)"
                            class="st0" width="10" height="10" />
                        <rect x="264.3" y="195.7" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -55.5918 115.487)"
                            class="st0" width="10" height="10" />
                        <rect x="292.1" y="184.5" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -49.356 125.089)"
                            class="st0" width="10" height="10" />
                        <rect x="236.4" y="207" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -61.8274 105.8851)"
                            class="st0" width="10" height="10" />
                        <rect x="208.6" y="218.2" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -68.0631 96.2833)"
                            class="st0" width="10" height="10" />
                        <rect x="346.9" y="409.9" transform="matrix(0.9272 -0.3746 0.3746 0.9272 -128.5418 172.7495)"
                            class="st0" width="66.5" height="14.2" />
                    </g>
                </svg>
            </div>
            <div ref="catTwo" :class="[show ? '' : 'translate-y-full']"
                class="absolute left-[10vw] bottom-0 md:-bottom-2 w-[8vw] h-[8vw] duration-[1s]">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 200 200"
                    style="enable-background:new 0 0 200 200;" xml:space="preserve">
                    <g id="ClientCat" transform="translate(-151 -606)">
                        <polygon class="fill-yellow-200" points="307.1,613.3 282.7,657.2 221.7,657.2 196.1,613.3 170.5,657.2 170.5,798.7 331.5,798.7 331.5,657.2 	
                            " />
                        <g>
                            <polygon class="st1" points="248.6,725.5 255.9,725.5 255.9,720.6 260.8,720.6 260.8,713.3 255.9,713.3 248.6,713.3 243.7,713.3 
                                243.7,720.6 248.6,720.6 		" />
                            <rect x="202.2" y="703.6" class="st1" width="19.5" height="17.1" />
                            <rect x="285.1" y="703.6" class="st1" width="17.1" height="17.1" />
                            <polygon class="st1" points="252.2,764.5 270.5,737.7 233.9,737.7 		" />
                        </g>
                    </g>
                </svg>
            </div>
        </section>
    </footer>
</template>

<script setup lang="ts">
// Import the necessary functions
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useCMSStore } from '@/store/cms';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

const store = useCMSStore();
const ui = useUIStore();
const { toggleInverseHeader } = ui;
const { themeColor, darkMode } = storeToRefs(ui);

const show = ref(false);

const handleScroll = () => {
    // console.log(window.scrollY, document.body.clientHeight);
    if ((window.scrollY + window.innerHeight) > document.body.clientHeight) {
        show.value = true;
    } else {
        show.value = false;
    }
    if ((window.scrollY + 1) >= document.body.clientHeight) {
        toggleInverseHeader(true);
    } else {
        toggleInverseHeader(false);
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
})

</script>
