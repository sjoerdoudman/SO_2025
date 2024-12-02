<template>
    <main v-if="currentSpecialization">
        <LayoutHero :image="{ url: '' }" :video_id="'776811579'"></LayoutHero>
        <div class="relative bg-dark z-10 mb-[100vh]">
            <div class="container-md w-full pb-double-space">
                <section class="content-column paragraph">
                    <h1 class="h2" v-html="currentSpecialization.title"></h1>
                    <div class="mt-single-space editor">
                        <h3 class="h4" v-html="currentSpecialization.subtitle"></h3>
                        <p>
                            Deze leerweg richt zich op het creëren van meeslepende
                            en boeiende ervaringen voor de gebruiker, waarbij deze
                            volledig ondergedompeld wordt in een virtuele omgeving.
                            Dit wordt o.a. bereikt door VR (Virtual Reality) en/of AR
                            (Augmented Reality) technologieën.
                        </p>
                    </div>
                    <div class="mt-single-space">
                        <h3 class="h4">
                            Skills &amp; Software
                        </h3>
                        <ul class="flex flex-wrap gap-3 mt-quarter-space">
                            <li v-for="(skill, index) in skills" :key="index">
                                <span class="block tag px-6 py-3 bg-glr-grey" v-html="skill.name"></span>
                            </li>
                        </ul>
                    </div>
                </section>
                <section class="mt-single-space">
                    <h3 class="h2">Lessen</h3>
                    <div class="mt-half-space">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <LayoutGridBlock v-for="(lesson, index) in lessons" :key="index">
                                <LessonTeaser :lesson="lesson"></LessonTeaser>
                            </LayoutGridBlock>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <ModulesShowCases></ModulesShowCases>
    </main>
</template>

<script setup lang="ts">
import type { Specialization } from '@/types';
import { ref } from 'vue';
import { useRoute } from 'nuxt/app';
import { useCMSStore } from '@/store/cms';
import { storeToRefs } from 'pinia';

const route = useRoute();
const store = useCMSStore();
const { specializations, lessons } = storeToRefs(store);
const currentSpecialization = ref<Specialization | null>(null);

const init = async () => {
    const specialization = specializations.value.find((specialization: Specialization) => specialization.slug === route.params.slug);
    if (specialization) {
        currentSpecialization.value = specialization;
    }
}

const skills: any[] = [
    { name: 'Unity', icon: 'unity' },
    { name: 'Unreal Engine', icon: 'unreal-engine' },
    { name: 'Blender', icon: 'blender' },
    { name: 'Maya', icon: 'maya' },
    { name: '3ds Max', icon: '3ds-max' },
    { name: 'Substance Painter', icon: 'substance-painter' },
    { name: 'ZBrush', icon: 'zbrush' },
    { name: 'Photoshop', icon: 'photoshop' },
    { name: 'Illustrator', icon: 'illustrator' },
    { name: 'After Effects', icon: 'after-effects' },
    { name: 'Premiere Pro', icon: 'premiere-pro' },
    { name: 'Audition', icon: 'audition' },
    { name: 'DaVinci Resolve', icon: 'davinci-resolve' },
    { name: 'Cinema 4D', icon: 'cinema-4d' },
]

init();
</script>