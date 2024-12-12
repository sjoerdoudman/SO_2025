<template>
    <main v-if="currentPost" class="pb-double-space">
        <div ref="dialogue"
            :class="[showSink ? 'top-[calc(144px+2vw+.8vh+.8rem)] duration-[.5s]' : 'top-[calc(80px+2vw+.8vh+.8rem)] duration-[.6s]']"
            class="fixed w-screen left-0 z-20">
            <ElementsContainer class="flex justify-between">
                <LayoutIconsClientCat class="w-10"></LayoutIconsClientCat>
                <LayoutIconsDeveloperCat class="w-10"></LayoutIconsDeveloperCat>
            </ElementsContainer>
        </div>
        <ElementsContainer size="small" class="mt-single-space w-full grid gap-half-space mb-double-space">
            <p>Hey, can I ask you a simple question?</p>
            <figure class="aspect-video w-full">
                <img :src="currentPost.featured_image.sizes.xl" :alt="currentPost.title" class="w-full h-auto" />
            </figure>
            <h1 v-scroll="onScroll" class="h2 client"><em v-html="currentPost.title"></em></h1>
            <p class="intro"
                v-html="'Creating a new digital application can be obstructed by many things, but not knowing what the budget has to be might be the biggest hurdle in getting a project going. The following article is going through the most frequently asked questions and aims to provide some context for getting anything on the web'">
            </p>
        </ElementsContainer>
        <div class="grid gap-single-space">
            <section>
                <ElementsContainer size="small" class="paragraph">
                    <h3 v-scroll="onScroll" class="client"><em>What is headless exactly?</em></h3>
                    <p v-scroll="onScroll" class="h3 !mt-2">The classic CMS is your all-in-one computer.</p>
                </ElementsContainer>
            </section>
            <section>
                <ElementsContainer size="medium" class="paragraph grid grid-cols-2 gap-half-space">
                    <figure class="aspect-video bg-red-200">

                    </figure>
                    <figure class="aspect-video bg-red-200">

                    </figure>
                </ElementsContainer>
            </section>
            <section>
                <ElementsContainer size="small" class="paragraph" v-scroll="onScroll">
                    <p>The headless content management system is your desktop set up where the computer case and display
                        are
                        separate. There’s more to think about when making the purchase, as you need to choose a computer
                        and
                        display separately, and there’s a ton of options for each, and near limitless combinations. But
                        this
                        also means you can tailor your purchase more closely to your exact need.</p>
                    <p>A powerful gaming PC with a high refresh rate ultra-wide display? A Mac mini with a rich 5K
                        display
                        for art production? There’s no limit to how you assemble your set up, but there’s also a little
                        more
                        effort required need to wire up the two devices to each other: is it an HDMI cable or a USB-C
                        thunderbolt cable between the computer and display? These are considerations you won’t be making
                        with an all-in-one computer.</p>
                </ElementsContainer>
            </section>
        </div>
        <div class="mt-double-space">
            <ElementsContainer size="small" class="paragraph">
                <h2 class="p font-400">You can handle some more right?</h2>
                <ul class="mt-half-space grid gap-half-space">
                    <li>
                        <article class="relative grid gap-half-space overflow-y-hidden group/newsitem">
                            <div class="absolute w-3 h-3 rotate-45 top-0 left-6 -translate-y-[150%] group-hover/newsitem:-translate-y-1/2 duration-300"
                                :style="{ background: themeColor }"></div>
                            <div class="absolute w-3 h-3 rotate-45 bottom-0 left-6 translate-y-[150%] group-hover/newsitem:translate-y-1/2 duration-300"
                                :style="{ background: themeColor }"></div>
                            <hr class="border-dotted border-b-2 border-dotted opacity-20"
                                :style="{ borderColor: themeColor }">
                            <nuxt-link to="/" class="flex w-full items-center gap-half-space">
                                <figure class="w-[100px] group-hover/newsitem:scale-[1.05] aspect-square duration-300">
                                    <LayoutIconsClientCat></LayoutIconsClientCat>
                                </figure>
                                <div>
                                    <p>Hey, can I ask you a simple question?</p>
                                    <h3 class="mt-quarter-space font-semibold">Can I have one website? How much will
                                        that be
                                        please?</h3>
                                </div>
                            </nuxt-link>
                            <hr class="border-dotted border-b-2 border-dotted opacity-20"
                                :style="{ borderColor: themeColor }">
                        </article>
                    </li>
                </ul>
            </ElementsContainer>
        </div>
    </main>
</template>

<script setup lang="ts">
import posts from '@/assets/json/posts.json';
import { ref, onMounted, defineComponent } from 'vue';
import type { Directive } from 'vue'; // Import Directive as a type-only import
import { useRoute } from 'nuxt/app';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

// import { ref, DirectiveBinding, defineComponent } from 'vue';

const ui = useUIStore();
const { addClientSpeaks, addDeveloperSpeaks } = ui;
const { showSink, themeColor } = storeToRefs(ui);
const route = useRoute();
const currentPost = posts.find((post) => post.slug === route.params.slug);
const dialogue = ref<HTMLElement | null>(null);

// Scroll callback function
const onScroll = (el: HTMLElement) => {
    if (!dialogue.value) return;
    const rect = el.getBoundingClientRect();
    const h = el.clientHeight;
    const diaRect = dialogue.value.getBoundingClientRect().top;
    if (rect.top <= diaRect && rect.top + h >= diaRect) {
        if (el.classList.contains('client')) {
            addClientSpeaks();
        } else {
            addDeveloperSpeaks();
        }
    }
};

onMounted(() => {
    setTimeout(() => {
        addClientSpeaks()
    }, 100);
})

// Define the scroll directive
const vScroll: Directive<HTMLElement, (el: HTMLElement) => void> = {
    mounted(el, binding) {
        const callback = binding.value;

        const onScrollHandler = () => {
            if (callback) {
                callback(el);
            }
        };

        // Attach scroll event to the window
        window.addEventListener('scroll', onScrollHandler);

        // Store the handler on the element for cleanup
        (el as any)._onScrollHandler = onScrollHandler;
    },
    unmounted(el) {
        const handler = (el as any)._onScrollHandler;
        if (handler) {
            window.removeEventListener('scroll', handler);
            delete (el as any)._onScrollHandler;
        }
    },
};

// Register the directive globally within this component
defineExpose({
    directives: {
        scroll: vScroll,
    },
});
</script>