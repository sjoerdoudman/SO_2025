<template>
    <div :class="journalCat ? 'opacity-100 duration-[1s]' : 'opacity-0 translate-y-full duration-300'"
        class="fixed z-30 w-[20vw] bottom-0 right-single-space pointer-events-none">
        <div ref="cloud" class="relative w-full aspect-square duration-200 translate-y-10">
            <svg v-for="(item, index) in randomArray" :key="index" :style="{
                left: `${item.left}%`,
                width: `${item.size}rem`,
                height: `${item.size}rem`,
                animationDelay: `${item.delay}ms`,
                animationDuration: `${item.speed}ms`,
                fill: `${item.color}`
            }" class="icon icon-command absolute left-[10%] opacity-0 animation--emit">
                <use :style="{ opacity: `${item.opacity}` }" xlink:href="#icon-command"></use>
            </svg>
        </div>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px" y="0px" viewBox="0 0 400 420" xml:space="preserve" :style="{ fill: themeColor }" class="w-full">
            <g>
                <rect x="27.8" y="133.6" width="10" height="10" />
                <rect x="27.8" y="163.6" width="10" height="10" />
                <rect x="27.8" y="223.6" width="10" height="10" />
                <rect x="27.8" y="193.6" width="10" height="10" />
                <rect x="27.8" y="73.6" width="10" height="10" />
                <rect x="27.8" y="43.6" width="10" height="10" />
                <rect x="27.8" y="313.6" width="10" height="10" />
                <rect x="27.8" y="373.6" width="10" height="10" />
                <rect x="27.8" y="343.6" width="10" height="10" />
                <rect x="27.8" y="403.6" width="10" height="10" />
                <rect x="27.8" y="253.6" width="10" height="10" />
                <polygon points="37.8,13.6 27.8,13.6 27.8,23.6 30.5,23.6 34.9,29.1 42.7,22.8 37.8,16.7 	" />
                <rect x="27.8" y="283.6" width="10" height="10" />
                <rect x="27.8" y="103.6" width="10" height="10" />
                <rect x="372.8" y="73.6" transform="matrix(1 -3.124985e-03 3.124985e-03 1 -0.2438 1.181)" width="10"
                    height="10" />
                <rect x="373.5" y="313.6" transform="matrix(1 -3.027330e-03 3.027330e-03 1 -0.9628 1.1474)" width="10"
                    height="10" />
                <rect x="372.7" y="43.6" transform="matrix(1 -3.027330e-03 3.027330e-03 1 -0.1454 1.1437)" width="10"
                    height="10" />
                <rect x="373.4" y="283.6" transform="matrix(1 -3.124985e-03 3.124985e-03 1 -0.9001 1.184)" width="10"
                    height="10" />
                <rect x="372.9" y="103.6" transform="matrix(1 -3.027330e-03 3.027330e-03 1 -0.3271 1.1445)" width="10"
                    height="10" />
                <rect x="373" y="133.6" transform="matrix(1 -2.929675e-03 2.929675e-03 1 -0.4045 1.108)" width="10"
                    height="10" />
                <rect x="373.3" y="223.6" transform="matrix(1 -2.929675e-03 2.929675e-03 1 -0.6681 1.1092)" width="10"
                    height="10" />
                <rect x="373.4" y="253.6" transform="matrix(1 -3.027330e-03 3.027330e-03 1 -0.7812 1.1466)" width="10"
                    height="10" />
                <rect x="373.1" y="163.6" transform="matrix(1 -3.124985e-03 3.124985e-03 1 -0.5251 1.1823)" width="10"
                    height="10" />
                <rect x="373.2" y="193.6" transform="matrix(1 -2.929675e-03 2.929675e-03 1 -0.5802 1.1088)" width="10"
                    height="10" />
                <rect x="373.6" y="343.6" transform="matrix(1 -3.027330e-03 3.027330e-03 1 -1.0536 1.1478)" width="10"
                    height="10" />
                <rect x="373.8" y="403.6" transform="matrix(1 -3.027330e-03 3.027330e-03 1 -1.2353 1.1487)" width="10"
                    height="10" />
                <rect x="373.7" y="373.6" transform="matrix(1 -3.124985e-03 3.124985e-03 1 -1.1813 1.1853)" width="10"
                    height="10" />
                <polygon
                    points="111.5,116.2 111.5,121.2 121.5,121.2 121.5,111.2 113.9,111.2 111.7,108.5 103.9,114.7 107.6,119.3 	" />
                <rect x="49.5" y="40.4" transform="matrix(0.7788 -0.6273 0.6273 0.7788 -16.4289 44.1993)" width="10"
                    height="10" />
                <rect x="87.1" y="87.1" transform="matrix(0.7788 -0.6273 0.6273 0.7788 -37.4152 78.1423)" width="10"
                    height="10" />
                <rect x="68.3" y="63.8" transform="matrix(0.7788 -0.6273 0.6273 0.7788 -26.9217 61.1659)" width="10"
                    height="10" />
                <rect x="306.5" y="80.3" transform="matrix(0.7071 -0.7072 0.7072 0.7071 30.9125 245.2418)" width="10"
                    height="10" />
                <polygon points="375.1,28.7 380.2,23.6 382.6,23.6 382.6,13.6 372.6,13.6 372.6,17.1 368,21.7 	" />
                <rect x="327.7" y="59.1" transform="matrix(0.7072 -0.7071 0.7071 0.7072 52.1017 253.9899)" width="10"
                    height="10" />
                <rect x="348.9" y="37.9" transform="matrix(0.7072 -0.7071 0.7071 0.7072 73.3129 262.7764)" width="10"
                    height="10" />
                <rect x="285.2" y="101.5" transform="matrix(0.7072 -0.7071 0.7071 0.7072 9.6793 236.4161)" width="10"
                    height="10" />
                <polygon
                    points="240.2,267.3 240.2,279.8 212.7,279.8 212.7,298.5 205.2,298.5 205.2,279.8 180.2,279.8 180.2,267.3 	" />
                <rect x="72.7" y="252.3" width="81.2" height="5" />
                <rect x="72.7" y="262.3" width="81.2" height="3.7" />
                <rect x="256.4" y="252.3" width="81.2" height="5" />
                <rect x="256.4" y="262.3" width="81.2" height="5" />
                <polygon
                    points="72.7,234.8 106.5,234.8 106.5,247.3 121.5,247.3 121.5,234.8 154,234.8 154,229.8 72.7,229.8 	" />
                <polygon
                    points="256.4,234.8 290.1,234.8 290.1,247.3 305.1,247.3 305.1,234.8 337.6,234.8 337.6,229.8 256.4,229.8 	" />
                <polygon points="227.7,319.7 191.4,319.7 190.2,319.7 188.9,319.7 188.9,329.7 191.4,329.7 191.4,323.5 227.7,323.5 227.7,329.7 
                    230.2,329.7 230.2,319.7 230.2,319.7 	" />
                <rect x="231.5" y="111.2" width="10" height="10" />
                <rect x="171.5" y="111.2" width="10" height="10" />
                <rect x="141.5" y="111.2" width="10" height="10" />
                <rect x="201.5" y="111.2" width="10" height="10" />
                <rect x="261.5" y="111.2" width="10" height="10" />
            </g>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';
import { random } from 'lodash';

type randomItem = {
    left: number,
    size: number,
    delay: number,
    color: string,
    speed: number,
    opacity: number
}

const ui = useUIStore();
const { themeColor, darkMode, journalCat } = storeToRefs(ui);

const createRandomArray = () => {
    const colors = darkMode.value ? [
        '#FFFEAD', '#F78E8E', '#BF8EF7'
    ] : [
        '#9fa45f', '#183A6A', '#1F674A'
    ];

    const arr: randomItem[] = []
    for (let i = 0; i < 5; i++) {
        let obj: randomItem = {
            left: random(35, 50),
            size: random(1.5, 3),
            delay: (random(0, 100) * 100),
            color: colors[random(0, (colors.length - 1))],
            speed: random(3000, 6000),
            opacity: (random(0, 100)) / 100
        }
        arr.push(obj)
    }
    return arr
}

const randomArray = createRandomArray()
</script>