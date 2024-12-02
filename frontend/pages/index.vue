<template>
    <LayoutHero :video_id="'1023990474/2a02cff006'"></LayoutHero>
    <div class="relative bg-dark z-10 mb-[100vh]">
        <div class="container-md w-full pb-double-space">
            <div class="content-column paragraph">
                <h2 class="h3">
                    De toekomst in App Ontwikkeling,
                    meeslepende XR- en VR-ervaringen
                    en Datavisualisaties
                </h2>
                <div class="mt-half-space">
                    <p>
                        Een toekomstgerichte carrière om apps te ontwikkelen, meeslepende XR- en VR-ervaringen te
                        creëren,
                        data
                        op een visueel aantrekkelijke manier te presenteren, en fysieke objecten te integreren met
                        digitale
                        technologieën.
                    </p>
                    <nuxt-Link class="inline-block mt-quarter-space" :to="'/'">
                        Lees meer →
                    </nuxt-Link>
                </div>
            </div>
            <div class="grid mt-double-space gap-double-space">
                <article v-for="(specialization, index) in specializations" :key="index">
                    <LayoutGridBlock>
                        <nuxt-Link :to="'/specialisaties/' + specialization.slug"
                            class="grid grid-cols-2 gap-single-space">
                            <figure class="aspect-video overflow-hidden">

                                <NuxtImg class="object-cover min-w-full min-h-full" :src="specialization.image?.url"
                                    :alt="specialization.image?.alt" />
                            </figure>
                            <div>
                                <h3 class="h4">{{ specialization.title }}</h3>
                                <p class="mt-quarter-space">{{ specialization.subtitle }}</p>
                                <span class="inline-block mt-quarter-space">
                                    Lees meer →
                                </span>
                            </div>
                        </nuxt-Link>
                    </LayoutGridBlock>
                </article>
            </div>
        </div>
    </div>
    <ModulesShowCases ref="cases" class="z-1"></ModulesShowCases>
</template>

<script setup lang="ts">
// Import the necessary functions
import type { Page } from '@/types';
import { ref } from 'vue';
import { useCMSStore } from '@/store/cms';
import { storeToRefs } from 'pinia';

const store = useCMSStore();
const { pages, specializations } = storeToRefs(store);

const currentPage = ref<Page | null | undefined>(null);

const onInit = async () => {
    // filter media_type by route name
    currentPage.value = pages.value.find((page) => page.slug === 'home');
    // const { $meta } = useNuxtApp()
    // //@ts-ignore
    // $meta(currentPage.value)
    // console.log(currentPage.value);
};

onInit();

</script>
