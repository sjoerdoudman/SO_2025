<template>
    <div>
        <div :class="['pt-[calc(80px+5vw+5vh)]']"
            class="relative bg-dark grid gap-double-space pb-double-space min-h-screen">
            <section>
                <div class="container-md w-full">
                    <div class="content-column paragraph">
                        <h1 class="h2" v-text="`Lessen`"></h1>
                    </div>
                    <div class="relative z-[2] flex mt-half-space items-center gap-half-space">
                        <span class="block">Filter:</span>
                        <div v-for="(filter, filterIndex) in filters" :key="filterIndex" class="relative group/filter">
                            <button
                                class="tag px-6 py-3 bg-glr-grey hover:bg-glr focus:bg-glr hover:!text-black focus:text-black flex items-center group/button">
                                <span
                                    v-text="filter.activeId == null ? `${filter.name}  ↓` : `${filter.options[filter.activeId].title}`"></span>
                                <a href="#" v-if="filter.activeId !== null" class="relative w-4 h-4 ml-2"
                                    @click="setOption($event, filterIndex, null)"
                                    :aria-label="`Verwijder filter ${filter.name}`">
                                    <div
                                        class="absolute w-full h-[2px] bg-white group-hover/button:bg-dark top-1/2 -translate-y-1/2 rotate-45">
                                    </div>
                                    <div
                                        class="absolute w-full h-[2px] bg-white group-hover/button:bg-dark top-1/2 -translate-y-1/2 -rotate-45">
                                    </div>
                                </a>
                            </button>
                            <div
                                class="absolute top-full left-0 overflow-hidden max-h-0 group-hover/filter:max-h-[300px] duration-300 group-hover/filter:duration-[.6s]">
                                <ul class="flex flex-col gap-[3px] mt-[3px]">
                                    <li @click="setOption($event, filterIndex, optionIndex)"
                                        v-for="(option, optionIndex) in filter.options" :key="option.slug"
                                        class="block">
                                        <a :class="[optionIndex == filter.activeId ? 'bg-glr text-dark' : 'bg-glr-grey']"
                                            class="tag block px-6 py-3 hover:bg-glr focus:bg-glr hover:!text-black text-nowrap"
                                            v-text="option.title"></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="mt-single-space">
                        <div v-if="maxedLessons.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimationAppear v-for="(lesson, index) in maxedLessons" :key="index">
                                <LessonTeaser :lesson="lesson"></LessonTeaser>
                            </AnimationAppear>
                        </div>
                        <div v-else>
                            <AnimationAppear>
                                <p>Ik heb nix bro</p>
                            </AnimationAppear>
                        </div>
                        <div v-if="max < maxedLessons.length && filteredLessons.length > 4" ref="loader"
                            class="flex w-full justify-center mt-single-space">
                            <div class="flex gap-2">
                                <div class="w-5 h-5 bg-glr rounded-full animation--pulse"></div>
                                <div class="w-5 h-5 bg-glr rounded-full animation--pulse" style="animation-delay:.15s">
                                </div>
                                <div class="w-5 h-5 bg-glr rounded-full animation--pulse" style="animation-delay:.3s">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Filter {
    name: string;
    taxonomy: string;
    activeId: number | null;
    options: { title: string, slug: string }[];
}
import type { Lesson, Year, Specialization } from '@/types';
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useCMSStore } from '@/store/cms';
import { storeToRefs } from 'pinia';

const store = useCMSStore();
const { lessons, years, specializations } = storeToRefs(store);

const filteredLessons = ref<Lesson[]>([])
const maxedLessons = ref<Lesson[]>([]);
const max = ref(4);
const loader = ref<HTMLDivElement | null>(null);
const filters = ref<Filter[]>([]);

const CreateFilter = (title: string, taxonomy: string, options: any[]) => {
    const newFilter = {
        name: title,
        taxonomy: taxonomy,
        activeId: null,
        options: options
    }
    return newFilter;
}

const YearFilter = CreateFilter('Leerjaar', 'year', years.value);
filters.value.push(YearFilter)

const SpecializationFilter = CreateFilter('Specializatie', 'specialization', specializations.value);
filters.value.push(SpecializationFilter)


const handleScroll = () => {
    if (loader.value == null || max.value >= lessons.value.length) return;
    if (loader.value.getBoundingClientRect().top - window.innerHeight < 0) {
        setTimeout(() => {
            max.value += 4;
        }, 1000);
    }
};

const setOption = (event: Event, filterIndex: number, optionIndex: number | null) => {
    event.preventDefault();
    if (filterIndex === null) return;
    filters.value[filterIndex].activeId = optionIndex;
};

const filterLessons = () => {
    let filtered = lessons.value;
    for (let i = 0; i < filters.value.length; i++) {
        let filter = filters.value[i];
        if (filter.activeId !== null) {
            const slug = filter.options[filter.activeId].slug
            const key = filter.taxonomy

            filtered = filtered.filter(item => {
                const value = item[key as keyof Lesson]; // Extract the value once for clarity

                // Check if the value is an array and has the correct type
                if (Array.isArray(value) && value.every(subItem => 'slug' in subItem)) {
                    // Now you are sure `value` is an array of objects with a `slug` property
                    return value.some((subItem: Year | Specialization) => subItem.slug === slug);
                }

                return false;
            });
        }
    }
    filteredLessons.value = filtered;
};
filterLessons();

const maxLessons = () => {
    if (filteredLessons.value.length > max.value) {
        maxedLessons.value = filteredLessons.value.slice(0, max.value)
    }
    maxedLessons.value = filteredLessons.value;
}
maxLessons();

watch(() => filters, (newValue, oldValue) => {
    max.value = 4
    filterLessons()
    maxLessons()
},
    { deep: true }
);

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
})

</script>